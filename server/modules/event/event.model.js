const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const { formateDate } = require('../../utils/date');

const transform = (doc, ret) => {
    ret.id = ret._id;
    ret.start = formateDate(ret.startDate) + "T" + ret.startTime + ":00";
    ret.end = formateDate(ret.endDate) + "T" + ret.endTime + ":00";
    ret.url = ret.eventUrl
    delete ret.startDate;
    delete ret.startTime;
    delete ret.endDate;
    delete ret.endTime;
    delete ret.eventUrl;
    delete ret._id;
}

const EventSchema = new mongoose.Schema({
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

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform
    }
});

EventSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Event', EventSchema);