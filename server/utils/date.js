const moment = require("moment");

module.exports.formateDate = (date) => {
    return moment(date).format("YYYY-MM-DD")
}