var env = require('../config.json');

var HelpModule = function () {
    this.keywords = env.keywords;
};

HelpModule.prototype.getKeywords = function()
{
    var result = [];
    for (var i in this.keywords) {
        if (this.keywords.hasOwnProperty(i)) {
            result.push(this.keywords[i]);
        }
    }
    return result;
}

HelpModule.prototype.Message = function(keywords, message, callback)
{
    var words = this.getKeywords() + '';
    return callback("InsomBot Commands: " + words.split(',').join(', '));
}

module.exports = HelpModule;