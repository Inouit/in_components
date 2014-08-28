module.exports = (grunt)->
  grunt.registerTask 'default', [
    'coffee'
    'uglify'
    'browserSync'
    'watch'
  ]