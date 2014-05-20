/**
 * Created by VadShaytReth on 2014-05-19.
 */

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    clearRequireCache: true
                },
                src: ['mocha-tests/**/*.js']
            }
        },

        watch: {
            js: {
                options: {
                    spawn: false
                },
                files: '**/*.js',
                tasks: ['default']
            }
        }
    });

    // On watch events, if the changed file is a test file then configure mochaTest to only
    // run the tests from that file. Otherwise run all the tests
    var defaultTestSrc = grunt.config('mochaTest.test.src');
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('mochaTest.test.src', defaultTestSrc);
        if (filepath.match('mocha-tests/')) {
            grunt.config('mochaTest.test.src', filepath);
        }
    });

    grunt.registerTask('default', 'mochaTest');
};