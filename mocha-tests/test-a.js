/**
 * Created by VadShaytReth on 2014-05-18.
 */

var assert = require('assert');
var lap = require('../less-autoprefixed');

describe('basicChain test', function () {

    it('should produce the expected unminified output', function (done) {
        lap.basicChain(
            '/* comment here */\n.testclass{display:flex;}\n',
            function (err, data) {
                if (err) throw err;

                assert.equal(
                    data,
                        '/* comment here */\n' +
                        '.testclass {\n' +
                        '  display: -webkit-box;\n' +
                        '  display: -webkit-flex;\n' +
                        '  display: -ms-flexbox;\n' +
                        '  display: flex;\n' +
                        '}\n'
                );
                done();
            }
        );
    });
});

describe('basic source map functionality', function () {
    it('should produce the expected unminified output, with a source map', function (done) {
        lap.basicLessWithSourcemap(
            '/* comment here */\n.testclass{display:flex;}\n',
            function (err, data) {
                if (err) throw err;

                assert.equal(
                    data.css,
                        '/* comment here */\n' +
                        '.testclass {\n' +
                        '  display: flex;\n' +
                        '}\n' +
                        '/*# sourceMappingURL=testdata.css.map */'
                );
                done();
            }
        );
    });

    it('should produce the expected source map', function (done) {
        lap.basicLessWithSourcemap(
            '/* comment here */\n.testclass{display:flex;}\n',
            function (err, data) {
                if (err) throw err;

                assert.equal(
                    data.sourceMap,
                        '{"version":3,"sources":["../input"],"names":[],"mappings":";AACA;EAAW,aAAA"}'
                );
                done();
            }
        );
    })
});