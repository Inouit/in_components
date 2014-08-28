class CWhosWho
  constructor: (@$el, options) ->
    @options = options;
    @$el.addClass('cWhosWho');
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
    @$el.html @template({persons: @feed})


  set: (attribute, value) =>
    @[attribute] = value

in_c["cWhosWho"] = CWhosWho
