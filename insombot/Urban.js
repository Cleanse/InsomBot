var env = require('../config.json'),
    Urban = require('urban');

var UrbanModule = function () {};

UrbanModule.prototype.Message = function(keyword, message, callback)
{
    var urbanIndex = message.content.indexOf(keyword);
    var term = message.content.substring(urbanIndex + keyword.length).trim().replace(/\s/g, "+");

    if (urbanIndex > -1) {
        Urban(term).first(function(json) {
            if (json !== undefined) {
                var definition = "\n**" + json.word + "**\n" +
                    json.definition + "\n\n" +
                    "Example: " + json.example;
                return callback(definition);
            }
            return callback("Sorry, I couldn't find a definition for: " + term);
        });
    }
}

module.exports = UrbanModule;