var env = require('../../config.json'),
    Giphy = require('giphy-wrapper')(env.giphy_key);

var GiphyModule = function () {};

GiphyModule.prototype.Message = function(keyword, message, callback)
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

module.exports = GiphyModule;