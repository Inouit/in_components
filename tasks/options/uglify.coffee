module.exports =
  options:
    banner: '/*! uglified <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */'
  build:
    files: [{
      expand: true,
      cwd: '<%= in8.jsDest %>',
      src: '*.js',
      dest: '<%= in8.jsDest %>'
      ext: '.min.js'
    }]
  components:
    files: [{
      expand: true,
      cwd: '<%= in8.jsDest %>/components/',
      src: '*.js',
      dest: '<%= in8.jsDest %>/components/'
      ext: '.min.js'
    }]