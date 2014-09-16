# # in_Components
# ## It manages initializing components.
# A component must be registered in the global object in_c.
class in_Components
  constructor: (@selector)->
    unless window.in_c
      window.in_c = new Array()
    @$el = $(@selector)
    @el = $(@selector).get(0)

    # Component's scripts  and styles
    if @$el.attr('data-css')
      @stylesheets = @$el.attr('data-css').split(',')
      for stylesheet in @stylesheets
        unless $("head").find('link[href="'+stylesheet+'"]').index() >= 0
          $("head").append $('<link />', href: stylesheet, rel:"stylesheet", type: "text/css")

    if @$el.attr('data-script')
      @scripts = @$el.attr('data-script').split(',')
      for script in @scripts
        $.getScript(script)
          .done =>
            # Once the component script is loaded it's initialized
            if in_c?[@type]?
              @component = new in_c[@type](@$el, @getOptions())
            else throw new ReferenceError('The component `'+@type+'` does not exist, or isn\'t registered in the `in_c` global array')
          .fail (e, name, err) ->
            throw err

    @type = @$el.attr('data-component')

    return @

  # ## getOptions() parse the attributes of the element and return them as an object
  getOptions: ->
    @options = {}
    for attribute of @el.attributes
      if @el.attributes[attribute].name?.indexOf("data-") >= 0
        # "data-" prefixes are removed
        @options[@el.attributes[attribute].name.replace('data-','')] = @el.attributes[attribute].value

    return @options


if module?.exports
  exports.in_Components = in_Components
else
  window.in_Components = in_Components