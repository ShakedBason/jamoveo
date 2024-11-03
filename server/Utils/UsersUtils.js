const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDB = require("../DB/entities/user_entity");
const RoleDB = require("../DB/entities/role_entity");
// Import JSON files
const heyJudeLyrics = require('../lyrics/hey_jude.json');
const veechSheloLyrics = require('../lyrics/veech_shelo.json');

const songs = [
  { id: 1, title: 'Hey jude', artist: 'The Beatles', image: 'heyJude.png', lyrics: heyJudeLyrics },
  { id: 2, title: 'ואיך שלא', artist: 'אריאל זילבר', image: 'veechShelo.png', lyrics: veechSheloLyrics },
  { id: 3, title: 'Hey brother ', artist: 'Avicii ', image: 'Avicii.jpg', lyrics: null }
];
const secretKey = 'mySecretKey123';

// Check if a user already exists
async function checkIfUserExists(username) {
  try {
    const user = await UserDB.findOne({ username }).lean(); // Lean improves memory usage and performance
    return !!user;
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
}

// Register a new user
async function registerUser(username, password, instrument, isAdmin) {
  try {
    const role = await findOrCreateRole(instrument);

    const userExists = await checkIfUserExists(username);
    if (userExists) {
      return { success: false, error: 'Username already exists, please try again' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserDB({
      username,
      password: hashedPassword,
      role: role._id,
      isAdmin,
      instrument: instrument,
    });

    await user.save();
    return { success: true };
  } catch (error) {
    console.error('Error saving user:', error);
    return { success: false, error: 'An error occurred during registration' };
  }
}

const getSongsSearchResults = async (searchTerm) => {
  // Filter songs based on the given searchTerm
  const filteredSongs = songs.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredSongs;
};

// Verify login details and generate a JWT token if valid
const checkLoginDetails = async (username, password) => {
  try {
    const user = await UserDB.findOne({ username }).populate('role');
    if (!user) {
      return { success: false, error: 'Username does not exist. Please double-check your username.' };
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ data: { username: user.username, instrument:user.role.instrument, isAdmin: user.isAdmin } }, secretKey, { expiresIn: '10h' });
      return {
        success: true,
        token,
        user: { username: user.username, role:user.role.name, isAdmin: user.isAdmin }
      };
    } else {
      return { success: false, error: 'Incorrect password. Please double-check your password.' };
    }
  } catch (error) {
    console.error('Error in checkLoginDetails:', error);
    return { success: false, error: 'Unknown server error - login' };
  }
}

// Find or create a role if it doesn't already exist
const findOrCreateRole = async (roleInstrument) => {
  try {
    const roleName = roleInstrument.toLowerCase() == 'vocals'? 'singer':'player';
    let role = await RoleDB.findOne({ name: roleName,instrument:roleInstrument});
    if (!role) {
      role = new RoleDB({ name: roleName, instrument:  roleInstrument});
      await role.save();
    }
    return role;
  } catch (error) {
    console.error('Error in findOrCreateRole:', error);
    throw error;
  }
}

module.exports = { 
  registerUser, 
  checkLoginDetails, 
  getSongsSearchResults 
};
