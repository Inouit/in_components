module.exports =
  coffee:
    files: [
      '<%= in8.jsSrc %>/*.coffee'
    ]
    tasks: [
      'newer:coffee:build'
    ]

  components:
    files: [
      '<%= in8.componentsSrc %>/*.coffee'
    ]
    tasks: [
      'newer:coffee:components'
    ]