class CAlert
  constructor: (@$el, @options) ->
    @$el.addClass('cAlert');
    @loader = new Object()

    $.get(options.data)
      .done (data) =>
        @loader.feed = true
        @set "feed", data

        if @loader.template
          @render()

    $.get(options.template)
      .done (data) =>
        @loader.template = true
        @set "template", _.template(data)
        if @loader.feed
          @render()



  render: ()->
    @$el.html @template({items: @feed})
    @$items = @$el.find("[data-id]")
    @slider = new Slider(@$el.find('.alert-list'), @$el.find('.alert-item'), @$el.find('.prev'), @$el.find('.next'))

  filter: (results) ->
    for item in @$items
      $item = $(item)
      if !results.length || $item.attr("data-"+@options.filter) in results
        $item.show()
      else
        $item.hide()


  renderFilters: ()->
    @$el.html @template({items: @feed})

  set: (attribute, value) =>
    @[attribute] = value

in_c["cAlert"] = CAlert

class Slider
  constructor: (@$el, @$slides, @$prev, @$next) ->
    @$current = $(@$slides[0])
    @$prev.on "click", @prev
    @$next.on "click", @next

  next: =>
    if @$current.index()+1 < @$slides.length
      @$current = $(@$slides[@$current.index()+1])
      @goTo @$current

  prev: =>
    if @$current.index() >= -1
      @$current = $(@$slides[@$current.index()-1])
      @goTo @$current

  goTo: ($slide) ->
    @$el.css
      "margin-top": -$slide.position().top + "px",
