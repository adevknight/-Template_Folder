module.exports = function (grunt) {

  grunt.initConfig({
    watch: {
      autoprefixer: {
          files: ['css/non-prefixed-styles.css'],
          tasks: ['autoprefixer'],
          options: {
            livereload: true
          }
      },
      cssmin: {
        files: ['css/non-prefixed-styles.css'],
        tasks: ['cssmin'],
        options: {
            livereload: true
        }
      },
      html: {
        files: ['*.html'],
        options: {
          livereload: true
        }
      },
      javascript: {
        files: ['js/*.js'],
        options: {
          livereload: true
        }
      }
    },
    autoprefixer: {
      // prefix only specified file
      single_file: {
        options: {
          browsers: ['last 5 Chrome versions',
            'last 5 Firefox versions',
            'last 5 Safari versions',
            'Explorer >= 10',
            'last 3 ChromeAndroid versions',
            'last 3 FirefoxAndroid versions',
            'last 3 iOS versions'],
          cascade : true
        },
        src: 'css/non-prefixed-styles.css',
        dest: 'css/styles.css'
      },
    },
    cssmin: {
      target: {
        files: [{
          src: 'css/styles.css',
          dest: 'css/styles.min.css',
          ext: '.min.css'
        }],
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', 'watch');
};