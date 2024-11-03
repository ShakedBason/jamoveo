const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    isAdmin: { type: Boolean, default: false }
});

const UserDB = mongoose.model('User', userSchema);
module.exports=UserDB;
