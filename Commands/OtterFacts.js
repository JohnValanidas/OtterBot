var Command = require ('./Command.js');

class OtterFacts extends Command {
  constructor(id, description) {
    super(id, description);
    this.factNum = 0;
    var data = fs.readFileSync("../Static/OtterFacts.json");
    this.facts = JSON.parse(data);
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

module.exports = OtterFacts;