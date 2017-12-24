var Command = require ('./Command.js');

class Ping extends Command {  
    run(input) {
      input.channel.send("Pong");
    }
}

module.exports = Ping;
