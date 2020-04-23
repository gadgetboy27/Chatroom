const moment = require('moment')

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('dd:h:mm a')
    }
}

module.exports = formatMessage