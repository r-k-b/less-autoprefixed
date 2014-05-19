/**
 * Created by VadShaytReth on 2014-05-18.
 */

var assert = require('assert');
var lap = require('../less-autoprefixed');

describe('basic-test', function () {
    it('should produce the expected unminified output', function (done) {
        assert.equal(
                '/* comment here */\n' +
                '.testclass {\n' +
                '  display: -webkit-box;\n' +
                '  display: -webkit-flex;\n' +
                '  display: -ms-flexbox;\n' +
                '  display: flex;\n' +
                '}',
            lap.basicChain(
                '/* comment here */\n.testclass{display:flex;}\n',
                function(err, data) {
                    if (err) throw err;
                    done();
                }
            )
        );
    })
});