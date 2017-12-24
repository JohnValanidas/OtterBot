const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
let secretToken = "";


// The secret token sould be posted into the .key in Otter bot's main folder.
fs.readFile(".key", "utf8", function(error, data) {
  client.login(data);
});


// Ready function
client.on("ready", () => {
    console.log("The Otters have synced up.");
    console.log("They are ready for commands!");
});

let Ping = require('./Commands/Ping.js');

//let Ping = PingCommand.Ping
// TODO: Make way of creating command objects and then add the objects to the array.
let test = new Ping("Ping", "");
let commands = [test];

client.on("message", function (message){
    for(let index = 0; index < commands.length; index++) {
      commands[index].isValid(message);
      }
});
  
