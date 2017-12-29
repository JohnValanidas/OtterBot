var Command = require('./Command.js');

class Help extends Command {
    // Help needs access to the commands array so it can iterate through it and call help on each command

    // TODO: refactor help so it only works on single commands
    // TODO: create commands to list commands and their descriptions

    constructor(id, description) {
        super(id, description);
        this.index = -1;
    }

    run() {
        if(this.getParamaters().length === 1) {
            this.sendQuote("Please specify a command!\n"+this.help());
        }
        else if(this.commandExists(this.getParamaters()[1])) {
            this.validCommand();
        }
        else {
            this.sendQuote("That command does not exist! Type " + this.prefix + "commands for a list of commands");
        }
    }
    help() {
        return "Type " + this.prefix + this.id + " (command) for information about that command";
    }

    // check if the command is useable within the this.commands array
    // checks against aliases as well
    commandExists(input) {
        let exists = false;
        for(let index = 0; index < this.commands.length; index++) {
           let command = this.commands[index];
           // just adding the prefix here lets you use the build in command
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
