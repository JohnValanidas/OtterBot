var Command = require('./Command.js');
var fs = require("fs");


class Soundboard extends Command {

    constructor(id, description) {
        super(id, description);
        var data = fs.readFileSync("./Static/SoundBoardFiles.json");
        this.soundFiles = JSON.parse(data);
        //this.playing = false;
    }

    run() {
        this.parseCommand();
    }

    parseCommand() {
        let args = this.getParamaters();
        if (args.length == 1){
            this.sendQuote("Please specify a command!\n"+this.help())
            return;
        }
        let voiceChannel = this.input.member.voiceChannel;
        switch (args[1]) {
            case "test":
                this.sendQuote("TEST");
                break;
            case "play":
                this.playSound(args[2], voiceChannel)
                break;
            default:
                // TODO: create case for default is to play the first peram. 
                this.playSound(args[1], voiceChannel)
                break;
        }
    }

    loadSoundFiles() {
        var data = fs.readFileSync("./Static/SoundBoardFiles.json");
        this.soundFiles = JSON.parse(data);
    }

    playSound(song, voiceChannel) {
        let songLocation = this.findSong(song)
        if (voiceChannel && songLocation) {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile(songLocation);
                dispatcher.on("end", end => {voiceChannel.leave()})
            }).catch(console.error)
            this.sendQuote("FOUND");
        }
        if (songLocation === undefined)  {
            this.sendQuote(song + " was not found");
        }
    }

    findSong(song) {
        let found = undefined
        for (let index = 0; index < this.soundFiles.length; index++ ) {
            if (this.soundFiles[index].name === song) {
                found = this.soundFiles[index].fileLocation;
                break;
            }
        }
    
        return found;
    }
}


module.exports = Soundboard;