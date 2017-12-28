var Command = require('./Command.js');

class Help extends Command {
    // Help needs access to the commands array so it can iterate through it and call help on each command

    // TODO: refactor help so it only works on single commands
    // TODO: create commands to list commands and their descriptions

    constructor(id, description, commands) {
        super(id, description);
        this.commands = commands;
    }
    run() {
        this.sendQuote(this.buildHelp());
    }

    buildHelp() {
        let info = "";
        for (let index = 0; index < this.commands.length; index++) {
            info += this.commands[index].help() + "\n";
        }
        return info;
    }
}

module.exports = Help;
