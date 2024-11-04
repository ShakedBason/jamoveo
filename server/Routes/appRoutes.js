const express = require('express');
const router = express.Router();
const { registerUser, checkLoginDetails, getSongsSearchResults, getSongLyrics } = require('../Utils/UsersUtils');
const verifyToken = require('../middlewear/auth');


// Register API call
router.post('/register', async (req, res) => {
    const { username, password, instrument, isAdmin } = req.body;
    try {
        const result = await registerUser(username, password, instrument, isAdmin);

        if (result.success) {
            return res.status(201).json({ message: 'User registered successfully!' });
        } else {
            return res.status(400).json({ message: result.error });
        }
    } catch (error) {
        console.error('Error in /register route:', error);
        return res.status(500).json({ error: 'An error occurred during registration. Please try again later.' });
    }
});

// Login API call
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await checkLoginDetails(username, password);
        if (result.success) {
            return res.status(200).json({ token: result.token, user: result.user });
        } else {
            console.log(result.error);
            return res.status(400).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error in /login route:', error);
        return res.status(500).json({ error: 'An error occurred during logging in. Please try again later.' });
    }
});


router.get('/getSongByFileName', verifyToken, async (req, res) => {
    console.log('reached api');
    const { fileName } = req.query;

    if (!fileName) {
        return res.status(400).json({ success: false, error: 'File name is required' });
    }

    try {
        const reqSongLyrics = await getSongLyrics(fileName);
        return res.json({ success: true, lyrics: reqSongLyrics.lyrics });
    } catch (error) {
        console.error('Error fetching song:', error);
        return res.status(500).json({ success: false, error: 'An error occurred while fetching song' });
    }
});

router.get('/songs/search', verifyToken,async (req, res) => {
    const {searchTerm} = req.query;

    if (!searchTerm) {
        return res.status(400).json({ success: false, error: 'Search term is required' });
    }

    try {
        const filteredSongs = await getSongsSearchResults(searchTerm);
        return res.json({ success: true, songs: filteredSongs });
    } catch (error) {
        console.error('Error fetching songs:', error);
        return res.status(500).json({ success: false, error: 'An error occurred while fetching songs' });
    }
});

module.exports = router;
