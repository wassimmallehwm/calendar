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
        default: "#000000",
    },
    backgroundColor: {
        type: String,
        required: false,
        unique: false,
        default: "#81c7e5",
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);