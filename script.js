const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
let secretToken = "";
// The secret token sould be posted into the .key in Otter bot's main folder.


fs.readFile(".key", "utf8", function(error, data) {
  client.login(data);
});



class Command {
  // TODO: Paramatize input
  // Validate whole word instead of noting what it "starts" with
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
       this.logCommand(input.author.username);
     }
  }

  logCommand(user) {
    console.log(user + " used the " + this.id + " command");
  }

  getParamaters(input) {
    let words = input.content.split(" ");
    return words.slice(1, words.length);
  }
}

class Roll extends Command {
  constructor(id, description, defaultNum=6) {
    super(id, description);
    this.defaultNum = defaultNum;
  }

  run(input) {
    if(parseInt(this.getParamaters(input)[0], 10)) {
       input.channel.send(Math.floor(Math.random()*parseInt(this.getParamaters(input)[0], 10)) + 1);
    }
    else {
      input.channel.send(Math.floor(Math.random()*this.defaultNum) + 1);
    }
  }   
}


class Ping extends Command {  
  run(input) {
    input.channel.send("Pong");
  }
}

class ClearChannel extends Command {
  run(input) {
    //TODO
  }
}

class OtterFacts extends Command {
  run(input) {

  }
}

class Test extends Command {
  run(input) {
    input.channel.send(this.getParamaters(input));
  }
}
let test1 = new Ping("ping", "");
let test2 = new Roll("roll", "");
let test3 = new ClearChannel("ClearChannel", "");
let test4 = new Test("tester", "");

let commands = [test1,test2,test3,test4];


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
