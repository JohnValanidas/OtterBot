class Ping extends Command {  
    run(input) {
      input.channel.send("Pong");
    }
}

/*
var { Animal } = require('./Animal');

class Cat extends Animal {
    ...
}
*/