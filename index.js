var env = require('./env.json'),
    InsomBot = require('insombot'),
    Discord = require("discord.js");

var mybot = new Discord.Client();
var ins = new InsomBot();

var triggers = {
    "/giphy": "Giphy",
    "/img": "Imgur",
    "/define": "Urban",
    "/test": "Test"
}

var keywords = ins.getKeywords(triggers);

mybot.on("message", function(msg)
{
    if (typeof keywords !== 'undefined' && keywords.length > 0) {
        var keyword = ins.checkMessageForKeywords(msg.content, keywords);

        if(keyword != 0) {
            var reply = ins.runKeywordFunction(triggers[keyword], keyword, msg);

            console.log("Fires first?>> "+reply);

            mybot.reply(msg, reply);
        }
    }
});

mybot.login(env["discord_email"], env["discord_pass"]);