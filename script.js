const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
// SECRET TOKEN FOR BOT API

fs.readFile(".key", "utf8", function(error, data) {
  const secretToken = data;
});



const secretToken = "MzkyNzk4MDcwODg4MzMzMzIz.DRsiDQ.xWl5SPUHAurUnJNHkBH4QpKv3RU";

client.login(secretToken);


class Command {
  constructor (id, description) {
    this.id = id;
    this.description = description;
  }

  run(input) {
  }

  toString() {
    return this.id;
  }

  isValid(input) {
     if (input.content.startsWith(this.id)) {
       this.run(input);
       this.log(input.author.username);
     }
  }

  log(user) {
    console.log(user + " used the " + this.id + " command");
  }
}

class Roll extends Command {
  run(input) {
    input.channel.send(Math.floor(Math.random()*6) + 1);
  }
}

class Ping extends Command {
  run(input) {
    input.channel.send("Pong");
  }
}
let test1 = new Ping("ping", "");
let test2 = new Roll("roll", "");

let commands = [test1,test2];


client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", function (message){
  for(let index = 0; index < commands.length; index++) {
    commands[index].isValid(message);
    }
});


// Create a better structure for calling commands.
function callCommands(message) {
  for(let index = 0; index < commands.length; index++) {
    commands[index].isValid(message);
    }
}


// client.on("message", (message) => {
//   if (message.content.startsWith("ping")) {
//     console.log(message.author.username + " used the Ping command");
//     message.channel.send("pong!");
//   }
// });

// client.on("message", (message) => {
//     if (message.content.startsWith("roll")) {
//       message.channel.send(Math.floor(Math.random()*6) + 1);
//     }
// });
