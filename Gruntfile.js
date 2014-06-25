module.exports = function(grunt) {
    (require('load-grunt-tasks'))(grunt);
    grunt.registerTask('default', ['bower', 'uglify', 'jshint', 'cssmin', 'serve', 'update']);
    grunt.registerTask('serve', ['connect']);
    grunt.registerTask('update', ['watch']);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            lint: ['Gruntfile.js', 'src/js/*.js']
        },
        karma: {
            spec: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },
            singleRun: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        uglify: {
            options: {
                mangle: false,
                verbose: true
            },
            lib: {
                files: {
                    'build/js/lib.min.js': ['build/lib/jquery/jquery.js', 'build/lib/bootstrap/bootstrap.js', 'build/lib/lodash/lodash.compat.js','build/lib/handlebars/handlebars.js'],
                    'build/js/all.min.js': ['src/js/login.js','src/js/task.js', 'src/js/index.js']
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'build/css/lib.min.css': ['build/lib/**/*.css'],
                    'build/css/all.min.css': ['src/css/*.css']
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'build/lib',
                    cleanTargetDir: true
                }
            }
        },
        watch: {
            jsfiles: {
                files: ['src/js/*.js'],
                tasks: ['jshint']
            },
            htmlCssJs: {
                files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css'],
                tasks: ['cssmin']
            },
            configFiles:{
                files:['Gruntfile.js','karma.conf.js'],
                options:{
                    reload:true
                }
            },
            options: {
                spawn: true,
                livereload: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    keepalive: false,
                    livereload: true,
                    base: ['src/html', 'build/css', 'build/js']
                }
            }
        }
    });
};
