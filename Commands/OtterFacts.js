var Command = require ('./Command.js');
var fs = require("fs");


class OtterFacts extends Command {
  constructor(id, description) {
    super(id, description);
    this.factNum = 0;
    var data = fs.readFileSync("./Static/OtterFacts.json");
    this.facts = JSON.parse(data);
    this.lastFact = 0;
  }

  // by default should return index of from factNum
  getFact(index = this.factNum) {
    if(index == this.facts.length) {
      index = 0;
    }
    return this.facts[index].fact;
  }

  getDescription(index = this.factNum) {
    return this.facts[index].description;
  }
  // TODO: command parser so code can be DRY
  // TODO: Add method for lastfact and factnum++
  run() {
    if ((this.getParamaters()[0] != null) && this.getParamaters()[0].toString().toLowerCase() === "description") {
      // send fact + description in quote form
      this.sendQuote(this.getFact() + "\n\n" + this.getDescription());
      this.lastFact = this.factNum;
      this.factNum++;
    }
    else if((this.getParamaters()[0] != null) && this.getParamaters()[0].toString().toLowerCase() === "last") {
      this.sendQuote(this.getFact(this.lastFact) + "\n\n" + this.getDescription(this.lastFact));
    }
    // default command with no parameters is used.
    else {
      this.sendQuote(this.getFact());
      this.lastFact = this.factNum;
      this.factNum++;
    }
  }
}

module.exports = OtterFacts;