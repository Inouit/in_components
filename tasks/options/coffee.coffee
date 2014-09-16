module.exports =
  build:
    options:
      sourceMap: false
    expand: true
    flatten: true
    cwd: '<%= in8.jsSrc %>'
    src: ['*.coffee']
    dest: '<%= in8.jsDest %>'
    ext: '.js'

  components:
    options:
      sourceMap: false
    expand: true
    flatten: true
    cwd: '<%= in8.componentsSrc %>'
    src: ['*.coffee']
    dest: '<%= in8.componentsDest %>'
    ext: '.js'