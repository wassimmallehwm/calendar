const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const EventSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        required: true,
        unique: false,
    },
    startTime: {
        type: String,
        required: false,
        unique: false,
    },
    endDate: {
        type: Date,
        required: false,
        unique: false,
    },
    endTime: {
        type: String,
        required: false,
        unique: false,
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
    },
    eventUrl: {
        type: String,
        required: false,
        unique: false,
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    allowedMaintainers: {
        type: [Object],
        default: []
    },
    allowedView: {
        type: [Object],
        default: []
    }
}, {
    timestamps: true
});

EventSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Event', EventSchema);