'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stagingConfig: {},

        // Run a connect serer with the livereload script injected
        connect: {
            server: {
                options: {
                    port: 9001,
                    livereload: true
                }
            }
        },

        // opens a browser window to the site
        open: {
            dev: {
                path: 'http://localhost:<%= connect.server.options.port %>/site/build/'
            }
        },

        // provides server side include support
        ssi: {
            options: {
                cache:'all',
                baseDir:'site/src'
            },
            build:{
                files: [{
                    expand: true,
                    cwd: 'site/src',
                    src: ['**/*.html'],
                    dest: 'site/build',
                }]
            }
        },

        // compiles sass
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'site/build/css/main.css': 'site/src/css/main.scss' // 'destination': 'source'
                }
            }
        },

        // Copies the contents of src into build
        copy: {
            js:{
                expand: true,
                cwd: 'site/src', 
                src: ['js/**/*'], 
                dest: 'site/build/'
            },
            build: {
                expand: true,
                cwd: 'site/src', 
                src: ['**'], 
                dest: 'site/build/'
            }
        },

        // Observe the js/html/css/sass files for changes and execute the tasks
        watch: {
            options: { livereload: true },
            html: {
                files: 'site/src/**/*.html',
                tasks: ['ssi']
            },
            scripts: {
                files: 'site/src/**/*.js',
                tasks: ['copy:js']
            },
            sass: {
                files: 'site/src/**/*.scss',
                tasks: ['sass']
            }
        },

        sshexec: {
            options: {
                host: "<%= stagingConfig.host %>",
                username: "<%= stagingConfig.username %>",
                privateKey: '<%= stagingConfig.localKey %>',
                passphrase: '<%= stagingConfig.passphrase %>'
            },
            stagingstart: {
                command: "umask 002 && rm -rf <%= stagingConfig.destinationPath %> && mkdir <%= stagingConfig.destinationPath %>"
            },
            stagingfinish:{
                command: "chmod -R 775 <%= stagingConfig.destinationPath %> "
            }
        },

        sftp:{
            staging: {
                options: {
                    host: '<%= stagingConfig.host %>',
                    username: '<%= stagingConfig.username %>',
                    privateKey: '<%= stagingConfig.localKey %>',
                    passphrase: '<%= stagingConfig.passphrase %>',
                    path: '<%= stagingConfig.destinationPath %>',
                    srcBasePath: "site/build/",
                    showProgress: true,
                    createDirectories:true
                },
                files: {
                    "./": ["site/build/**/*"]
                }
            }
        }

        // Increment an official version number in Git
        bump: {
            options: {
                files: ['package.json'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                updateConfigs: ['pkg']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-ssi');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-ssh');
    grunt.loadNpmTasks('grunt-bump');
  
    // $ grunt
    grunt.registerTask('default', 'Runs a local development server and opens the site in a new browser page/tab', 
        ['copy:build', 'sass', 'connect', 'open:dev', 'ssi', 'watch']
    );

    // $ grunt stage
    grunt.registerTask('stage', 'Uploads site to staging server', function(){
        var settingsFile = "staging-config.json"
        if(!grunt.file.exists(settingsFile)){
            grunt.log.error('Your staging-config.json file was not found. Copy it from staging-config.example.json')
            return false
        }else{
            var stagingConfig = grunt.file.readJSON(settingsFile)
        }
        grunt.config.set('stagingConfig', stagingConfig);
        grunt.config.set('stagingConfig.localKey', grunt.file.read(stagingConfig.localKeyPath))
        grunt.task.run(['copy:build', 'sass', 'ssi', 'sshexec:stagingstart', 'sftp', 'sshexec:stagingfinish'])
    });

    // $ grunt tag:[major|minor|patch]
    grunt.registerTask('tag', 'Commits the current codebase to Git as a versioned tag.', function(target){
        if(typeof target == "undefined"){
            grunt.log.error('You must specify a version increment: major, minor or patch e.g tag:minor')
            return false
        }
        grunt.task.run(['bump:' + target]);
    })
};
