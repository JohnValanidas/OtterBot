# Otter Bot ~ An Aquatic pal for your discord server!

add some kind of iteligible description

## Contents

(Usage)[#Usage]

### Usage

Create a .key file inside of the main directory and place your discord bot's api key here. Main.js will pick up the key and log your bot into discord.

### Adding Commands


```Js
// command file is located inside the command folder.
var Command = require('./Command.js');

class CommandName extends Command {

    run(input) {
        // Your code goes here....
    }
}
```
