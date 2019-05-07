class Bot {
    constructor(guild) {
        this.guild = guild
        this.commands = [];
        this.currentChannel = null;
    }

    linkCommands(commands) {

    }

    addCommand(command) {
        this.commands.push(command);
    }

}

module.exports = Bot;