## Insomnia DiscordApp Bot

### Installation
`npm install`
Rename `env.json.example` to `env.json` and fill in your credentials.

Use `node index.js` to run, or set up something like https://github.com/foreverjs/forever

Default commands: `!img`, `!giphy`, `!define`, `!commands`. These can be edited in Insombot/index.js (https://github.com/Cleanse/InsomBot/wiki/Adding-Commands):
```javascript
this.triggers = {
        "!giphy": "Giphy",
        "!img": "Imgur",
        "!define": "Urban",
        "!commands": "Commands"
    }
```