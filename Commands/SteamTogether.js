let Command = require ('./Command.js');
// let express = require('express');
// let app = express();

class SteamTogether extends Command {
    constructor(id, description, apiKey) {
        super(id, description);
        this.apiKey = apiKey;
    }

    run() {
        
    }   
}

module.exports = SteamTogether;


