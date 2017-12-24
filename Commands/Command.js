class Command {
    // TODO: Paramatize input
    // Validate whole word instead of noting what it "starts" with
    constructor (id, description) {
      this.id = id;
      this.description = "Empty";
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