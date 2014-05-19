/**
 * Created by VadShaytReth on 2014-05-18.
 */

var my = {}; // object to export
var less = require('less');
var autop = require('autoprefixer');

var inputLess = '/* comment here */\n.testclass{display:flex;}\n';

var lessParser = new (less.Parser)({
    // put options here - but where are they doc'd?
});

/**
 * Convert less to css to prefixed css. No minification or file writing.
 * @param {string} input css
 * @param callback
 */
my.basicChain = function (input, callback) {
    lessParser.parse(input, function (err, tree) {
        if (err) {
            return callback(err, null)
        }
        var css = tree.toCSS();
        return callback(null, autop.process(css).css);
    })
};


if (require.main === module) { // Don't run this if require()'d.
    my.basicChain(inputLess, function (err, data) {
        if (err) {
            throw(err);
        }
        console.log(data);
    });
}


module.exports = my;