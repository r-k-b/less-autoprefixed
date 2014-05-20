/**
 * Created by VadShaytReth on 2014-05-18.
 */

var my = {}; // object to export
var less = require('less');
var autop = require('autoprefixer');


/**
 * Convert less to css to prefixed css. No minification or file writing.
 * @param {string} input css
 * @param callback
 */
my.basicChain = function (input, callback) {
    var lessParser = new (less.Parser)({
        // put options here - but where are they doc'd?
    });

    lessParser.parse(input, function (err, tree) {
        if (err) {
            return callback(err, null)
        }
        var css = tree.toCSS();
        return callback(null, autop.process(css).css);
    })
};


my.basicLessWithSourcemap = function (input, callback) {
    var lessParser = new (less.Parser)({
        // put options here - but where are they doc'd?
    });

    lessParser.parse(input, function (err, tree) {
            if (err) {
                return callback(err, null)
            }
            var data = {};
            data.css = tree.toCSS({
                compress         : false,
                sourceMap        : true,
                writeSourceMap   : function (thing) {
                    // check out node_modules/less/lib/less/source-map-output.js:127
                    data.sourceMap = thing;
                },
                sourceMapURL     : 'testdata.css.map',
                sourceMapFilename: 'testdata.css',
                sourceMapRootpath: '../'
            });
//            return callback(null, autop.process(css).css);
            return callback(null, data);
        }
    )
};


if (require.main === module) { // Don't run this if require()'d.
    my.basicLessWithSourcemap('/* comment here */\n.testclass{display:flex;}\n', function (err, data) {
        if (err) {
            throw(err);
        }
        console.log(data);
    });
}


module.exports = my;