class CSlide
  constructor: (@$el, options) ->
    @options = options;
    @$el.addClass('cSlide');
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
    @slider = new Slider(@$el.find('.slide-list'), @$el.find('.slide-item'), @$el.find('.prev'), @$el.find('.next'))


  set: (attribute, value) =>
    @[attribute] = value

in_c["cSlide"] = CSlide


class Slider
  constructor: (@$el, @$slides, @$prev, @$next) ->
    @setSizes()
    @$current = $(@$slides[0])
    @$prev.on "click", @prev
    @$next.on "click", @next
    $(window).on "resize", @setSizes

  next: =>
    if @$current.index()+1 < @$slides.length
      @$current = $(@$slides[@$current.index()+1])
      @goTo(@$current)

  prev: =>
    if @$current.index()
      @$current = $(@$slides[@$current.index()-1])
      @goTo @$current

  goTo: ($slide) ->
    @$el.css
      "margin-left": -$slide.position().left + "px",

  setSizes: () =>
    console.log @$el.parent().width()
    slideWidth = @$el.parent().width()
    slideHeight = @$el.parent().height()
    @$slides.width(slideWidth);
    @$slides.height(slideHeight);

    @$el.width(@$slides.length * slideWidth);