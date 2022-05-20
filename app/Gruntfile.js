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
                    'styles/css/main.css': 'styles/sass/style.scss',       // 'destination': 'source'
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'styles/css/style.min.css': [ 'style.css'],
                    'styles/css/bootstrap4-wizardry.min.css': [ 'bootstrap4-wizardry.css'],
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/uglified/uglifiedJSFiles.min.js': ['js/concat/concat.js'],
                    'views/view.journeys.min.js':['views/view.journeys.js'],
                    'views/view.404.min.js':['views/view.404.js'],
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['sass', 'cssmin', "concat"]);
};