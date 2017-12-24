class OtterFacts extends Command {
    constructor(id, description) {
      super(id, description);
      this.factNum = 0;
      var data = fs.readFileSync("Static/OtterFacts.json");
      this.facts = JSON.parse(data);
      console.log(this.facts);
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