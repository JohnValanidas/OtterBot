// Discord set up
const Discord = require("discord.js");
const client  = new Discord.Client();

// Aux Library for files
const fs = require("fs");


// Bot object that will house commands
let Bot = require('./Bot.js');

// bot commands
const Ping          = require('./Commands/Ping.js');
const OtterFacts    = require('./Commands/OtterFacts.js');
const TopReddit     = require('./Commands/TopReddit.js');
const Roll          = require('./Commands/Roll.js');
const Information   = require('./Commands/Information.js');
const Help          = require('./Commands/Help.js');
const Commands      = require('./Commands/Commands.js');
const SteamTogether = require('./Commands/SteamTogether.js');
const ClearChannel  = require('./Commands/ClearChannel.js');
const SoundBoard    = require('./Commands/Soundboard.js');

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


let connectedGuilds = {};
//Auxillary bot functions
let logger = new ChatLogging();

// Main loop
// Interaction with messages from client
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
 * Updates a specific guild with it's corresponding config. If it is not found it loads the default one.
 * @param guild
 */
function updateGuildBot(guild) {
    let mBot =  new Bot(guild);
    // data contains the raw data from either a database or a default value
    let data = getGuildConfig(guild.id);
    let json = JSON.parse(data);
    // grab top level property names that indicate a command name.
    // Their associated properties are a  js object that will be parsed
    let commands = Object.getOwnPropertyNames(json)
    for (let command of commands.values()) {
        // must create a ref from the botCommands object since it holds the import.
        // from there an actual object can be instantiated.

        //debug statement for showing the linking commands.
        console.log(guild.name + ": Linking command - " + command);
        try {
            let ref  = botCommands[command];
            refCommand = new ref(json[command].name, json[command].description);
            mBot.addCommand(refCommand);
            if (json[command].link) {
                refCommand.linkCommands(mBot.commands);
            }
        }
        catch(error) {
            console.error(error);
        }
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


