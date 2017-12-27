  class Command {
  // TODO: Param atize input
  // Validate whole word instead of noting what it "starts" with
  // TODO add optional names for commands and incorperate them into
  //      the validation checks. Also place everything into a config file
  
  constructor (id, description) {
    this.id = id;
    this.description = description;
    this.setprefix();
  }


  toString() {
    return this.id;
  }

  // checks if the message from chat is the command.
  isValid(message) {
     return message.startsWith(this.prefix + this.id.toLowerCase());
  }

  // logs command from the user to the console.
  logCommand(user) {
    console.log(user + " used the " + this.id + " command");
  }

  // Get paramaters after a command has been called and returns them.
  getParamaters() {
    let words = this.input.content.split(" ");
    return words.slice(1, words.length);
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
  }

  //sets the prefix for  commands being used.
  //TODO: Create a json/config file for specification to include things like this
  setprefix(prefix = "!") {
    this.prefix = prefix;
  }

  // Function that is called on each message to check for message validation

  call(input) {
    if (this.isValid(input.content.toLowerCase())) {
      // Only want to create channel and input conditions once a valid message has been passed. 
      this.channel = input.channel;
      this.input = input;
      this.run();
      // logs command to the console -- will add message logging to files later ~ timestamps included
      this.logCommand(this.input.author.username);
    }
  }

}

module.exports = Command;