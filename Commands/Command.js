  class Command {
  // TODO: Param atize input
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

  isValid() {
     let message =  this.input.content.toLowerCase();
     return message.startsWith(this.id.toLowerCase());
  }

  logCommand(user) {
    console.log(user + " used the " + this.id + " command");
  }

  getParamaters() {
    let words = this.input.content.split(" ");
    return words.slice(1, words.length);
  }

  sendQuote(text) {
    this.channel.send('`'+text+'`');
  }
  // Default run command 
  run(input) {
    console.log("Warning - No run method has been defined in the " + this.id + " command.");
  }

  call(input) {
    this.channel = input.channel;
    this.input = input;
    if (this.isValid()) {
      this.run(this.input);
      this.logCommand(this.input.author.username);
    }
  }

}

module.exports = Command;