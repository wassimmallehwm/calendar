const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    textColor: {
        type: String,
        required: false,
        unique: false,
        default: "#ffffff",
    },
    backgroundColor: {
        type: String,
        required: false,
        unique: false,
        default: "#025174",
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);