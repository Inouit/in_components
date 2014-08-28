module.exports =
  dev:
    options:
      watchTask: true
      ghostMode:
          clicks: true
          scroll: true
          links: true
      server:
        baseDir: "./"
    bsFiles:
      src : [
        '<%= in8.jsDest %>/*.js'
        '<%= in8.componentsDest %>/*.js'
        '<%= in8.htmlSrc %>/*.html'
        '<%= in8.htmlSrc %>/assets/*.*'
      ]
