var Command = require('./Command.js');

class Help extends Command {
    constructor(id, description) {
        super(id, description);
        this.index = -1; // hack to link index of the "found command"
    }

    run() {
        if(this.getArguments().length === 1) {
            this.sendQuote("Please specify a command!\n"+this.help());
        }
        else if(this.commandExists(this.getArguments()[1])) {
            this.validCommand();
        }
        else {
            this.sendQuote("That command does not exist! Type " + this.prefix + "commands for a list of commands");
        }
    }
    help() {
        return "Type " + this.prefix + this.id + " (command) for information about that command";
    }

    // check if the command is usable within the this.commands array
    commandExists(input) {
        let exists = false;
        for(let index = 0; index < this.commands.length; index++) {
           let command = this.commands[index];
           // just adding the prefix here lets you use the built in command that also
           // checks for alases
            if (command.isValid(this.prefix + input)) {
                this.index = index;
                return true;
            }
        }
        return exists;
    }

    validCommand() {
        this.sendQuote(this.commands[this.index].help());
    }
}

module.exports = Help;
