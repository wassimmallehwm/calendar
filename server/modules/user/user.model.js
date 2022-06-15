const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: false,
        unique: false,
    },
    lastname: {
        type: String,
        required: false,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    
}, {
    timestamps: true
});

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);