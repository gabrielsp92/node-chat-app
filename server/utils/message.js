const moment = require('moment');

const generateMessage = (from,text) => {
    let date = moment()
    return {
        from,
        text,
        createdAt: date.format('h:mm a')
    }
}

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().format('h:mm a')
    };
}

module.exports = {generateMessage, generateLocationMessage};