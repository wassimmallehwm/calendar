const moment = require("moment");
const { UserDto } = require("../users");

const formatEventDate = (date, time) => {
    if (time && time.trim() != "") {
        return moment(date).format("YYYY-MM-DD") + "T" + time + ":00"
    }
    return moment(date).format("YYYY-MM-DD")
}

module.exports = class EventDto {
    constructor({
        _id,
        title,
        description,
        backgroundColor,
        textColor,
        startDate,
        startTime,
        endDate,
        endTime,
        eventUrl,
        createdBy,
        createdAt
    }) {
        this.id = _id;
        this.title = title
        this.description = description
        this.backgroundColor = backgroundColor
        this.textColor = textColor
        // this.startDate = startDate
        // this.startTime = startTime
        // this.endDate = endDate
        // this.endTime = endTime
        this.start = formatEventDate(startDate, startTime);
        this.end = formatEventDate(endDate, endTime);
        this.eventUrl = eventUrl
        this.createdBy = createdBy ? new UserDto(createdBy) : null
        this.createdAt = createdAt
    }
}