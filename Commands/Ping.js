var Command = require ('./Command.js');

class Ping extends Command {  
    run() {
      this.input.channel.send("Pong");
    }
}

module.exports = Ping;
