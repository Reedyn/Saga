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
                tasks: ['compass', 'autoprefixer', 'cssmin'],
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
            options: {
                sassDir: 'sass',
                cssDir: 'assets/css',
                noLineComments: true,
                outputStyle: 'expanded',
                specify: 'sass/style.scss'
            }
        },
        autoprefixer: {
            css: {
                src: 'assets/css/style.css'
            }
        },
        cssmin: {
            target: {
                files: [{
                    'assets/css/style.min.css': ['assets/css/style.css']
                }]
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'assets/css/*.css',
                        'assets/js/**/*.js',
                        '*.hbs'
                    ]
                },
                options: {
                    watchTask: true,
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    },
                    options: {
                        proxy: "ghost.dev",
                        port: 80
                    }
                }
            }
        }
    });
    
    // Load tasks
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    
    // Register Production
    grunt.registerTask('default', ['compass', 'autoprefixer', 'cssmin','browserSync', 'watch']);
};