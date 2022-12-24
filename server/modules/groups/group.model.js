const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);