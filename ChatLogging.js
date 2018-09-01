class ChatLogging {
    constructor() {
        this.fs = require('fs');
    }
   
    // logs message to a file called called: channel_"channel name".txt in the Logs folder
    // each line is "timespatmp : (channelname) author: content

    /*
    Make it so on start up the bot checks which channels it is in and makes corrisponding folders for each channel.
    Make it only make folders on the fly if there is a private message from a user
    This stackoverflow post for refrence
    https://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist
   
    */

    log(message) { 
        let line = " ";
        let date = new Date()
        let channelName = message.channel.name
        //let guildName = message.guild.name
        let author = message.author.username
        line += date.toString() + ": "+ message.author.username + ": " + message.content + '\n';

        if (channelName) {
            let dir = './Logs/Channels/' + message.channel.name +'/'
            this.logTextChannel(line, dir)
        }
        else {
            let dir = './Logs/Messages/'
            this.logPrivateMessage(line, dir, author);
        }
    }

    logTextChannel(line, dir) {
        if(!this.fs.existsSync(dir) ) {
            this.fs.mkdirSync(dir);
        }
        this.logToDirectory(line, dir, 'chatlog')
    }

    logPrivateMessage(line, dir, author) {
        if(!this.fs.existsSync(dir) ) {
            this.fs.mkdirSync(dir);
        }
        this.logToDirectory(line, dir, author)
    }

    logToFile(line, folder, filename) {

    }

    logCommand(line, commandID) {
        
    }


    // Always the command for a message to be logged to a directory
    logToDirectory(line, dir, name = 'log') {
        this.fs.appendFile(dir + name +'.txt', line, function (err) {
            if (err) throw err;
          });
    }
}

module.exports = ChatLogging;