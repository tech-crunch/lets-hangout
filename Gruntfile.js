module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'client/www/js/**/*.js'
        ] ,
        dest: 'client/www/dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
                mangle: false
            },
      target: {
        files: {
          'client/www/dist/<%= pkg.name %>.min.js': ['client/www/dist/Lets-Hangout.js']
        }
      }
    },


    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'client/www/dist/style.min.css': 'client/www/css/style.css'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'client/**/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/**/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////


  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
      grunt.task.run([ 'shell:prodServer' ]);
  });

  grunt.registerTask('deploy', [
    'build'
  ]);


};