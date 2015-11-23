var env = require('./config.json'),
    InsomBot = require('./insombot/index.js'),
    Discord = require('discord.js');

var ins = new InsomBot;
var discordjs = new Discord.Client();

discordjs.on("ready", function () {
    console.log("Ready to begin! Serving in " + discordjs.channels.length + " channels");
});

discordjs.on('message', function(msg)
{
    if (typeof ins.loadKeywords() !== 'undefined' && ins.loadKeywords().length > 0) {
        ins.checkMessageForKeywords(msg.content, ins.loadKeywords(), function(keyword)
        {
            if (keyword != 0) {
                ins.runKeywordFunction(ins.getKeyByValue(ins.keywords, keyword), keyword, msg, function(reply)
                {
                    discordjs.reply(msg, reply);
                });
            }
        });
    }
});

discordjs.on('disconnected', function () {
    console.log('Disconnected.');
    process.exit(1);
});

discordjs.login(env.discord.email, env.discord.password);