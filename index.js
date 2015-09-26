var env = require('./env.json'),
    InsomBot = require('insombot'),
    Discord = require("discord.js");

var mybot = new Discord.Client();
var ins = new InsomBot();

var triggers = ins.triggers;

var keywords = ins.getKeywords(triggers);

mybot.on("message", function(msg)
{
    if (typeof keywords !== 'undefined' && keywords.length > 0) {
        ins.checkMessageForKeywords(msg.content, keywords, function(keyword) {
            if(keyword != 0) {
                ins.runKeywordFunction(triggers[keyword], keyword, msg, function(reply) {
                    mybot.reply(msg, reply);
                });
            }
        });
    }
});

mybot.on("disconnected", function () {
    console.log("Disconnected, reconnecting in 1 minute");
    setTimeout(function () {
        mybot.login(env["discord_email"], env["discord_pass"])
            .then(function (token) {
                loggedIn();
            }).catch(function (err) {
                console.log("Login failed");
            });
    }, 60000);
});

mybot.login(env["discord_email"], env["discord_pass"]);