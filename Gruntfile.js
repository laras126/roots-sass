'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'assets/js/plugins/*js',
    'assets/js/*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.js',
        '!assets/**/*.min.*'
      ]
    },
    sass: {
      dev: {
        style: 'expanded',
        src: 'assets/scss/main.scss',
        dest: 'assets/css/main.css',
        // Source maps are available, but require Sass 3.3.0 to be installed
        // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
        sourcemap: true
      },
      build: {
        style: 'compressed',
        src: 'assets/scss/main.scss',
        dest: 'assets/css/main.min.css',
        // Source maps are available, but require Sass 3.3.0 to be installed
        // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
        sourcemap: true
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'assets/css/'
          }
        },
        src: 'assets/css/main.css'
      },
      build: {
        src: 'assets/css/main.min.css'
      }
    },
    // modernizr: {
    //   build: {
    //     devFile: 'assets/vendor/modernizr/modernizr.js',
    //     outputFile: 'assets/js/vendor/modernizr.min.js',
    //     files: {
    //       'src': [
    //         ['assets/js/scripts.min.js'],
    //         ['assets/css/main.min.css']
    //       ]
    //     },
    //     uglify: true,
    //     parseFiles: true
    //   }
    // },
    version: {
      default: {
        options: {
          format: true,
          length: 32,
          manifest: 'assets/manifest.json',
          querystring: {
            style: 'roots_css',
            script: 'roots_js'
          }
        },
        files: {
          'lib/scripts.php': 'assets/{css,js}/{main,scripts}.min.{css,js}'
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/scss/*.scss',
          'assets/scss/**/*.scss'
        ],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.js',
          'templates/*.php',
          '*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'jshint',
    'sass:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'sass:build',
    'autoprefixer:build',
    'uglify',
    //'modernizr',
    'version'
  ]);
};
