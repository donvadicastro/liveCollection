// Generated on 2014-09-26 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'liveCollection.min.js': ['liveCollection.js']
                }
            }
        },

        wiredep: {
            js: {
                src: 'karma.conf.js',
                options: {
                    fileTypes: {
                        js: {
                            /*
                             regex
                             the way to find (and group) the:
                             - beginning delimiter of the bower block, * including *
                             - indentation
                             - type of block
                             - contents of the block
                             - end delimiter of the block
                             */
                            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,

                            /*
                             regex
                             the format to detect if the path is already inside of your target
                             .js file
                             */
                            detect: {
                                js: /".*\.js"/gi
                            },

                            /*
                             string
                             the format to "spit out" the path inside of your target .js file
                             */
                            replace: {
                                js: '"{{filePath}}",'
                            }
                        }
                    }
                }
            }
        },

        jsdoc : {
            dist : {
                src: ['readme.md', 'src/**/*.js', 'test/*.js'],
                options: {
                    destination: 'doc',
                    template : "node_modules/ink-docstrap/template",
                    configure : "node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        }
    });

    grunt.registerTask('default', ['wiredep', 'uglify', 'jsdoc']);
    grunt.registerTask('build', ['uglify', 'jsdoc']);
};