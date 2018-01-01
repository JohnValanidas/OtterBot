  class Command {
  // TODO: Paramatize input
  constructor (id, description) {
    this.id = id;
    this.aliases = [this.id];
    this.description = description;
    this.setprefix();
  }
  toString() {
    return this.id;
  }

  addAlias(name) {
    this.aliases.push(name);
  }

  removeAlias(name) {
    index = this.aliases.indexOf(name);
    if(index != -1) {
      this.aliases.splice(index, 1);
    }
    else {
      // Should something happen?
    }
  }

  // checks if the message from chat is the command.
  isValid(message) {
    // dirty fix for the .this in the return statement inside the some method
    // Don't know to much about .this
    let prefix = this.prefix;
    return this.aliases.some(function(val){
       return message.toLowerCase() === (prefix + val.toLowerCase());
    });
 }

  // logs command from the user to the console and each commmand with a timestamp to the Logs/CommandLog.txt
  // Log files are gitignored.
  logCommand(user) {
    let command = user + " used the " + this.id + " command";
    console.log(command);
    let date = new Date();
    let fs = require('fs');
    let logLine = date.toString() + ": " + command + " \n"
    fs.appendFile('Logs/CommandLog.txt', logLine, function (err) {
      if (err) throw err;
    });
  }

  // Get paramaters after a command has been called and returns them.
  getParamaters() {
    let words = this.input.content.split(" ");
    return words
  }

  // sends a message to the text channel in a code block to represent a quote
  sendQuote(text) {
    this.channel.send('`'+text+'`');
  }

  // Default run command that is called to run when the command is used.
  // All of the command classes haeve to put there code here.
  run() {
    // Default response that gets printed to console if a command has been created but a run command has not been added.
    console.log("Warning - No run method has been defined in the " + this.id + " command.");
    this.sendQuote(this.id + " has not yet been implimented");
  }

  //sets the prefix for  commands being used.
  //TODO: Create a json/config file for specification to include things like this
  setprefix(prefix = "!") {
    this.prefix = prefix;
  }

  // Function that is called on each message to check for message validation

  call(input) {
    this.input = input;
    if (this.isValid(this.getParamaters()[0])) {
      // Only want to create channel and input conditions once a valid message has been passed. 
      this.channel = input.channel;
      this.run();
      // logs command to the console -- will add message logging to files later ~ timestamps included
      this.logCommand(this.input.author.username);
    }
  }
  // Each method should impliment a help method and return relevent information for command
  // The help method itself will give an overview and will either list through the command list
  // or it will print the help of the command for more information.
  help() {
    return "Help for " + this.id + " not yet implemented.";
  }


  // Auxilliary command to link the command array to each/specific commands
  linkCommands(commands) {
    this.commands = commands;
  }
}

module.exports = Command;