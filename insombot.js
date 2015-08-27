var env = require('./env.json'),
    Discord = require("discord.js"),
    Giphy = require('giphy-wrapper')(env["giphy_key"]);

var mybot = new Discord.Client();

mybot.on("message", function(msg){

    var message = msg.content;

    //keywords
    var hello = "hello";
    var giphy = "gif:";
    var jaraxxus = "bitch, i aint gat no ";

    //Hello
    if(message === hello) {
        mybot.reply(msg, "hi QT");

        return;
    }

    //Giphy
    if(message.indexOf(giphy) > -1) {
        var term = message.substring(message.indexOf(":")+1).trim().replace(/\s/g, "+");

        Giphy.random(term, function (err, data) {
            if (err) {
                return;
            }

            if(data.data.length != 0) {
                mybot.reply(msg, data.data.url);
            }else{
                mybot.reply(msg, jaraxxus+" "+message.substring(message.indexOf(":")+1).trim());
            }
        });

        return;
    }
});

mybot.login(env["discord_email"], env["discord_pass"]);