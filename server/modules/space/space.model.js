const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const SpaceSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        unique: false,
        ref: "User",
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    imagePath: {
        type: String,
        required: false,
        unique: false,
    },
    
}, {
    timestamps: true
});

SpaceSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Space', SpaceSchema);