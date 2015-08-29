var env = require('../../env.json'),
    Giphy = require('giphy-wrapper')(env["giphy_key"]);

var InsomBot = function() {
    //WTF no classes in JS???!
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

InsomBot.prototype.runKeywordFunction = function(keywordFunction, keyword, message)
{
    var reply = this[keywordFunction](keyword, message);

    return reply;
}

InsomBot.prototype.Test = function(keyword, message)
{
    return "Oh yea? " + message.channel.name;
}

InsomBot.prototype.Giphy = function(keyword, message)
{
    var giphyIndex = message.content.indexOf(keyword);

    var term = message.content.substring(giphyIndex + keyword.length).trim().replace(/\s/g, "+");

    return Giphy.random(term, function (err, data) {
        if(err) {
            return;
        }

        if(data.data.length != 0) {
            console.log("comes second?>> "+data.data.url);
            return data.data.url;
        }else{
            return message.content+" not found";
        }
    });
}

module.exports = InsomBot;