//Gruntfile
  module.exports = function(grunt) {

  //Initializing the configuration object
    grunt.initConfig({

      // Task configuration
      concat: {
        options: {
          separator: ';',
        },
        js_frontend: {
          src: [
            './bower_components/jquery/dist/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './assets/javascript/frontend.js'
          ],
          dest: './public/assets/javascript/frontend.js',
        }
      },
      less: {
        development: {
          options: {
            compress: true,  //minifying the result
          },
          files: {
            //compiling frontend.less into frontend.css
            "./public/assets/stylesheets/frontend.css":"./assets/stylesheets/frontend.less",
          }
        }
      },
      uglify: {
        options: {
          mangle: false  // Use if you want the names of your functions and variables unchanged
        },
        frontend: {
          files: {
            './public/assets/javascript/frontend.js': './public/assets/javascript/frontend.js',
          }
        }
      },
      watch: {
        js_frontend: {
          files: [
            //watched files
            './bower_components/jquery/dist/jquery.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './assets/javascript/frontend.js'
            ],   
          tasks: ['concat:js_frontend','uglify:frontend'],     //tasks to run
          options: {
            livereload: true                        //reloads the browser
          }
        },
        less: {
          files: ['./assets/stylesheets/*.less'],  //watched files
          tasks: ['less'],                          //tasks to run
          options: {
            livereload: true                        //reloads the browser
          }
        }
      }
    });

  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Task definition
  grunt.registerTask('default', ['watch']);
};
