class ChatLogging {
    constructor() {

    }

    log(message) {
        let fs = require('fs');
        let logLine = "";
        let date = new Date();
        let channelName = message.channel.name;
        logLine += date.toString() + ": ("+ channelName + ") "+ message.author.username + ": " + message.content + '\n';
        fs.appendFile('Logs/Channel_' + channelName + '.txt', logLine, function (err) {
            if (err) throw err;
          });
    }
}

module.exports = ChatLogging;