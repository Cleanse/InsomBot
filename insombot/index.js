var InsomBot = function() {
    //WTF no classes in JS???!
    this.events = new Map();
};

InsomBot.prototype.getKeywords = function(model) {
    var result = [];

    for (var i in model) {
        if (model.hasOwnProperty(i)) {
            result.push(i);
        }
    }
    return result;
}

InsomBot.prototype.checkMessageForKeywords = function(message, triggers)
{
    for(var i = 0; i != triggers.length; i++) {
        var substring = triggers[i];
        if (message.indexOf(substring) != - 1) {
            return substring;
        }
    }

    return 0;
}

InsomBot.prototype.runKeywordFunction = function(keywordFunction, message)
{
    return keywordFunction(message);
}

InsomBot.prototype.Test = function(message)
{
    return "Oh yea?" + message.channel.name;
}

InsomBot.prototype.Giphy = function()
{
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
}

module.exports = function()
{
    return new InsomBot();
}