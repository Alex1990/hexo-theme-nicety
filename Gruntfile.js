/**
 * nicety - A hexo blog theme
 *
 * Under the MIT license | (c) 2015 Alex Chao
 */

'use strict';

module.exports = function(grunt) {

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    watch: {
      styles: {
        files: 'source/css/src/**/*.css',
        tasks: ['autoprefixer', 'concat', 'cssmin']
      },
      scripts: {
        files: 'source/js/main.js',
        tasks: ['jshint', 'uglify']
      }
    },
    autoprefixer: {
      all: {
        options: {
          // browsers: ['> 0.5%', 'last 2 versions', 'ie >= 9']
        },
        src: 'source/css/src/main.css'
      }
    },
    concat: {
      all: {
        src: ['source/css/src/normalize.css', 'source/css/src/main.css', 'source/css/src/highlightjs/github.css'],
        dest: 'source/css/dist/style.css'
      }
    },
    cssmin: {
      all: {
        options: {
          advanced: false
        },
        files: {
          'source/css/dist/style.min.css': ['source/css/dist/style.css']
        }
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'source/js/main.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    uglify: {
      build: {
        files: {
          'source/js/main.min.js': 'source/js/main.js'
        }
      }
    }
  });

  grunt.registerTask('css', ['autoprefixer', 'concat', 'cssmin']);
  grunt.registerTask('js', ['jshint', 'uglify']);

  grunt.registerTask('default', ['css', 'js']);

};
