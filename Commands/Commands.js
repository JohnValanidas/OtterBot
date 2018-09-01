var Command = require ('./Command.js');

class Commands extends Command {

    run(input) {
      this.sendQuote(this.buildCommandList());
    }
    
    // Format commands so there is equal spacing after the command name. descriptions should all start on their own column.
    buildCommandList() {
        let list = "";
        for (let index = 0; index < this.commands.length; index++) {
            let command = this.commands[index];
            list += this.prefix + command.id + " --- " + command.description + '\n';
        }
        return list;
    }
}

module.exports = Commands;