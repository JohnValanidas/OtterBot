var Command = require('./Command.js');

class Roll extends Command {
    constructor(id, description, defaultNum = 6) {
        super(id, description);
        this.defaultNum = defaultNum;
    }

    roll(sides = this.defaultNum) {
        return Math.floor(Math.random() * sides) + 1;
    }

    run(input) {
        if (parseInt(this.getParamaters(input)[0], 10)) {
            this.sendQuote(this.roll(parseInt(this.getParamaters(input)[0], 10)));
        }
        else {
            this.sendQuote(this.roll());
        }
    }
}

module.exports = Roll;

