module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: ['assets/css/*.css'],
                tasks: [],
                options: {
                    livereload: true,
                }
            },
            compass: {
                files: ['sass/*.scss'],
                tasks: ['compass:dev'],
                options: {
                    livereload: false,
                },
            },
            js: {
                files: 'assets/js/*.js',
                options: {
                    livereload: true,
                }
            },
            html: {
                files: '*.html',
                options: {
                    livereload: true,
                }
            }
        },
        compass: {                  
            dev: {                    
                options: {
                    sassDir: 'sass',
                    cssDir: 'assets/css',
                    noLineComments: true,
                    outputStyle: 'compressed',
                    specify: 'sass/style.scss'
                }
            }
        }
    });
    
    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Register Production
    grunt.registerTask('default', ['compass:dev','watch']);
};