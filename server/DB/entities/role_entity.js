const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        enum: ['singer', 'player'], 
        required: true 
    },
    instrument: { 
        type: String, 
        enum: ['drums', 'guitar', 'bass', 'saxophone', 'keyboards','vocals'],
        required: true
    }
});
roleSchema.index({ name: 1, instrument: 1 }, { unique: true }); 

const RoleDB = mongoose.model('Role', roleSchema);
module.exports = RoleDB;