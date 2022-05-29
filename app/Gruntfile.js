module.exports = function (grunt) {

    grunt.initConfig({
        // Project configuration.
        concat: {
            dist: {
                src: ['js/kwm.js', 'js/kwm-model.js', 'js/kwm-route.js', 'js/kwm-router.js',
                    'js/kwm-templater.js', "js/kwm-translator.js", "js/kwm-utils.js"],
                dest: 'js/concat/concat.js',
            },
        },
        jshint: {
            beforeconcat: ['js/kwm.js', 'js/kwm-model.js', 'js/kwm-route.js', 'js/kwm-router.js',
                'js/kwm-templater.js', "js/kwm-translator.js", "js/kwm-utils.js"],
            afterconcat: ['dist/output.js']
        },
        nodeunit: {
            files: ['js/concat/concat.js']
        },

        watch: {
            css: {
                files: ['styles/scss/*.scss'],
                tasks: ['sass', 'concat'],
                options: {
                    options: {
                        livereload: true,
                    }
                },
            },
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'styles/css/main.css': 'styles/scss/style.scss',       // 'destination': 'source'
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'js/uglified/uglifiedJSFiles.min.js': ['js/concat/concat.js'],
                    'views/view.journeys.min.js': ['views/view.journeys.js'],
                    'views/view.404.min.js': ['views/view.404.js'],
                }
            }
        },
        htmlhint: {
            html1: {
                options: {
                    'tag-pair': true
                },
                src: ['index.html']
            }
        }
    });
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['sass', "concat, uglify"]);
}
;