const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const SettingsSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
        default: "Calendar",
    },
    version: {
        type: String,
        required: true,
        unique: true,
        default: "1.0.0",
    },
    
}, {
    timestamps: true
});

SettingsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Settings', SettingsSchema);