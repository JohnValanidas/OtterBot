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
    updateGuilds();
});

let Bot = require('./Bot.js');

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

let botCommands = {
    'Ping': Ping,
    'OtterFacts': OtterFacts,
    'TopReddit': TopReddit,
    'Roll': Roll,
    'Information': Information,
    'Help': Help,
    'Commands': Commands,
    'SteamTogether': SteamTogether,
    'SoundBoard': SoundBoard
};

let commands = [];
// TODO: Make way of creating command objects and then add the objects to the array.
let test  = new Ping("Ping", "Checks if the bot is working at all");
let test1 = new OtterFacts("OtterFacts", "Gives a random otter fact with an optional description");
let test2 = new TopReddit("TopReddit", "Returns the top posts from either the front page or a subreddit");
let test3 = new Roll("Roll", "Rolls a die of a specified size");
let test4 = new Help("Help", "Gives information on each command.");
let test5 = new Information("Information", "Information about the bot");
let test6 = new Commands("Commands", "Gives a list of commands");
let test7 = new SteamTogether("SteamTogether","Checks and prints what games two users have");
let test8 = new ClearChannel("ClearChannel","Give you control over the messages in any channel");
let test9 = new SoundBoard("SoundBoard", "TODO: add soundboard desc");
channelCommands = [test, test1, test2, test3, test4, test5, test6, test7, test8, test9];

// Help and Commands need to reference to all of the commands so they can
// loop through them.
test4.linkCommands(channelCommands);
test6.linkCommands(channelCommands);

let connectedGuilds = {};
//Auxillary bot functions
let logger = new ChatLogging();

// Main loop
// Interaction with messages from clint
client.on("message", function (message){
  // Messages need to be logged first in order to check if a command crashes
  // the bot
    console.log("Massage: " + message);
    logger.log(message);
    let guildname = message.guild.id;
    console.log("Guildname: "+guildname);
    let guildBot = connectedGuilds[guildname];
    if (guildBot) {
        for(let index = 0; index < guildBot.commands.length; index++) {
            guildBot.commands[index].call(message);
            }
    }

  // Command Loop
  // Create ability for config to only do command loop on specified channels
  // don't check in the commands, only call commands on working channels.
  // for(let index = 0; index < channelCommands.length; index++) {
  //   channelCommands[index].call(message);
  // }


  // Other message functions

});

client.on("guildCreate", function(guild) {
   console.log("JOINED GUILD " + guild.name);
   // create a cluster bot
});

function updateGuilds() {
    client.guilds.forEach(function(guild) {
    updateGuildBot(guild)
    });
}

/**
 * Updates a specific guild with it's corrisonding config. If it is not found it loads the default one.
 * @param guild
 */
function updateGuildBot(guild) {
    let mBot =  new Bot(guild);
    let data = getGuildConfig(guild.id);
    let json = JSON.parse(data);
    let commands = Object.getOwnPropertyNames(json)
    for (let command of commands.values()) {
        // must create a ref from the botCommands object since it holds the import.
        // from there an actual object can be instantiated.
        let ref  = botCommands[command];
        mBot.addCommand(new ref(json[command].name, json[command].description))
    }
    connectedGuilds[guild.id] = mBot;
}

/**
 * Returns a config if a guild has one. Otherwise it returns the default one.
 * Curently returns a default config for everything. In the future it will quary a database.
 * @param guildID
 * @returns {*}
 */
function getGuildConfig(guildID) {
    // TODO: Create a database to associate config files with.
    //  - Add a Guild IP option such that it gets assocaited with the guild
    return fs.readFileSync('default.json');
}


