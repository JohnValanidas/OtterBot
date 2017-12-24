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
  run(input) {
  }

  call(input) {
    this.input = input
  }

}

module.exports = Command;