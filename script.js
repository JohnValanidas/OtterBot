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
    this.channel = input.channel;
    this.input = input;
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

  sendQuote(text) {
    this.channel.send('`'+text+'`');
  }
}

class Roll extends Command {
  constructor(id, description, defaultNum=6) {
    super(id, description);
    this.defaultNum = defaultNum;
  }

  roll(sides=this.defaultNum) {
    return Math.floor(Math.random() * sides) + 1;
  }

  run(input) {
    if(parseInt(this.getParamaters(input)[0], 10)) {
      this.sendQuote(this.roll(parseInt(this.getParamaters(input)[0], 10)));
    }
    else {
      this.sendQuote(this.roll());
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
  constructor(id, description) {
    super(id, description);
    this.factNum = 0;
    var data = fs.readFileSync("Static/OtterFacts.json");
    this.facts = JSON.parse(data);
  }

  // by default should return index of from factNum
  getFact(index = this.factNum) {
    return this.facts[index].fact;
  }

  getDescription(index = this.factNum) {
    return this.facts[index].description;
  }

  run(input) {
    input.channel.send(this.getFact());
    this.factNum++;
  }
}

class TopReddit extends Command {
  
}


let test1 = new Ping("ping", "");
let test2 = new Roll("roll", "");
let test3 = new ClearChannel("ClearChannel", "");
let test5 = new OtterFacts("OtterFacts", "");

let commands = [test1,test2,test3,test5];


client.on("ready", () => {
  console.log("The Otters have synced up.");
  console.log("They are ready for commands!");
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
