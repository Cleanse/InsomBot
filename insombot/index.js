var env = require('../../env.json'),
    Giphy = require('giphy-wrapper')(env["giphy_key"]),
    Imgur = require("imgur-search"),
    Urban = require('urban');

var isearch = new Imgur(env["imgur_key"]);

var InsomBot = function() {
    this.triggers = {
        "!giphy": "Giphy",
        "!img": "Imgur",
        "!define": "Urban",
        "!commands": "Commands"
    }
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

InsomBot.prototype.checkMessageForKeywords = function(message, triggers, callback)
{
    for(var i = 0; i != triggers.length; i++) {
        var substring = triggers[i];
        if (message.indexOf(substring) == 0) {
            return callback(substring);
        }
    }
    return callback(0);
}

InsomBot.prototype.runKeywordFunction = function(keywordFunction, keyword, message, callback)
{
    this[keywordFunction](keyword, message, callback);
}

InsomBot.prototype.Commands = function(keyword, message, callback)
{
    var commandsAvailable = this.getKeywords(this.triggers);

    return callback("Commands available: " + commandsAvailable);
};

InsomBot.prototype.Giphy = function(keyword, message, callback)
{
    var giphyIndex = message.content.indexOf(keyword);
    var term = message.content.substring(giphyIndex + keyword.length).trim().replace(/\s/g, "+");

    Giphy.random(term, function (err, data) {
        if(err) {
            return;
        }

        if(data.data.length != 0) {
            return callback(data.data.url);
        }
        return callback(message.content.substring(giphyIndex + keyword.length).trim()+" not found");
    });
}

InsomBot.prototype.Imgur = function(keyword, message, callback)
{
    var imgurIndex = message.content.indexOf(keyword);
    var term = message.content.substring(imgurIndex + keyword.length).trim().replace(/\s/g, "+");

    if (imgurIndex > -1) {
        isearch.search(term).then(function(results) {
            if (results === undefined || results.length === 0) {
                return callback("Sorry, I couldn't find any imgurs for the term: " + message.content.substring(imgurIndex + keyword.length).trim());
            }
            var image = results[Math.floor(Math.random() * results.length)];
            return callback(image.link);
        });
    }
}

InsomBot.prototype.Urban = function(keyword, message, callback)
{
    var urbanIndex = message.content.indexOf(keyword);
    var term = message.content.substring(urbanIndex + keyword.length).trim().replace(/\s/g, "+");

    if (urbanIndex > -1) {
        Urban(term).first(function(json) {
            if (json !== undefined) {
                var definition = "" + json.word + ": " + json.definition + "\nupvotes: " + json.thumbs_up + "   downvotes: " + json.thumbs_down + "\n\nExample: " + json.example;
                return callback(definition);
            }
            return callback("Sorry, I couldn't find a definition for: " + term);
        });
    }
}

module.exports = InsomBot;