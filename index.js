var env = require('./config.json'),
    InsomBot = require('insombot'),
    Discord = require('discord.js');

var ins = new InsomBot;
var insBot = new Discord.Client();

insBot.on("message", function(msg)
{
    if(typeof ins.loadKeywords() !== 'undefined' && ins.loadKeywords().length > 0) {
        ins.checkMessageForKeywords(msg.content, ins.loadKeywords(), function(keyword)
        {
            if(keyword != 0) {
                ins.runKeywordFunction(ins.getKeyByValue(ins.keywords, keyword), keyword, msg, function(reply)
                {
                    insBot.reply(msg, reply);
                });
            }
        });
    }
});

insBot.on("disconnected", function () {
    console.log("Disconnected, reconnecting in 1 minute");
    setTimeout(function () {
        insBot.login(env.discord.email, env.discord.password)
            .then(function (token) {
                console.log("Login successful.", token);
            }).catch(function (err) {
                console.log("Login failed.", err);
            });
    }, 60000);
});

insBot.login(env.discord.email, env.discord.password);