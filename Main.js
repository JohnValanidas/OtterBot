const Discord = require("discord.js");
const client  = new Discord.Client();
const fs = require("fs");


// The secret token sould be posted into the .key file in Otter bot's main folder.
fs.readFile(".key", "utf8", function(error, data) {
  client.login(data);
});


// Ready function
client.on("ready", () => {
    console.log("The Otters have synced up.");
    console.log("They are ready for commands!");
});

// CREATE A GOD DAMN CONFIG FILE FOR THIS
// bot commands
let Ping          = require('./Commands/Ping.js');
let OtterFacts    = require('./Commands/OtterFacts.js');
let TopReddit     = require('./Commands/TopReddit.js');
let Roll          = require('./Commands/Roll.js');
let Information   = require('./Commands/Information.js');
let Help          = require('./Commands/Help.js');
let Commands      = require('./Commands/Commands.js');
let SteamTogether = require('./Commands/SteamTogether.js');
let ClearChannel  = require('./Commands/ClearChannel.js');
let SoundBoard    = require('./Commands/Soundboard.js');

//aux bot functions
let ChatLogging   = require('./ChatLogging.js');


let commands = [];
// TODO: Make way of creating command objects and then add the objects to the array.
let test  = new Ping("Ping", "Checks if the bot is working at all");
let test1 = new OtterFacts("OtterFacts", "Gives a random otter fact with an optional description");
let test2 = new TopReddit("TopReddit", "Returns the top posts from either the front page or a subreddit");
let test3 = new Roll("Roll", "Rolls a die of a specified size");
let test4 = new Help("Help", "Gives information on each command.");
let test5 = new Information("Information", "Information about the bot")
let test6 = new Commands("Commands", "Gives a list of commands");
let test7 = new SteamTogether("SteamTogether","Checks and prints what games two users have");
let test8 = new ClearChannel("ClearChannel","Give you control over the messages in any channel");
let test9 = new SoundBoard("SoundBoard", "TODO: add soundboard desc");
channelCommands = [test, test1, test2, test3, test4, test5, test6, test7, test8, test9];

// Help and Commands need to refrence to all of the commands so they can 
// loop through them.
test4.linkCommands(channelCommands);
test6.linkCommands(channelCommands);

//Auxillary bot functions
let logger = new ChatLogging();

// Main loop
// Interaction with messages from clint
client.on("message", function (message){
  // Messages need to be logged first in order to check if a command crashes
  // the bot
  logger.log(message);


  // Command Loop
  // Create ability for config to only do command loop on specified channels
  // don't check in the commands, only call commands on working channels.
  for(let index = 0; index < channelCommands.length; index++) {
    channelCommands[index].call(message);
  }

  
  // Other message functions

});
  
