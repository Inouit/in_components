class CFeed
  constructor: (@$el, @options) ->
    @$el.addClass('cFeed');
    @loader = new Object()

    $.get(options.data)
      .done (data) =>
        @loader.feed = true
        @set "feed", data
        if options.filter
          @filters = new Filters(@$el, data, @options.filter, @options.filtertmpl, true)
          @filters.$el.on "search.change", (e, data) =>
            @filter(data.filter)

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

in_c["cFeed"] = CFeed


###
# Filters
## Manage filters
# Parameters :
#   - parent : The dom selector were the filter navigation must be added
#   - data : The data to search
#   - fields : The field to filter
#   - @template : The template to build the navigation
###
class Filters
  constructor: ($parent, data, field, template, @unique) ->

    # Set an unique id
    @id = 'item-filters-'+(new Date().getTime())
    # Create the view node
    $parent.before('<div id="'+@id+'" class="item-filters" />')
    @$el = $('#'+@id)

    @unique = false unless @unique

    @parseData data, field
    @filter = new Array()

    # Get templates
    $.get(template)
      .done (data) =>
        @template = _.template(data)
        @render()
        # get all navigation items (filters) and bind clicks
        @$filterBtns = @$el.find('.item-filter')
        @$filterBtns.on "click", @setFilter

    return @

  # ## parseData
  # Get all unique field values
  parseData: (data, field) ->
    @filters = new Array()
    if @unique
      @filters.push "all"

    for item in data
      unless item[field] in @filters
        @filters.push item[field]
    return @

  # ## render
  # Create the navigation from filters
  render:  ->
    @$el.html(@template({@filters}))

  # ## setFilter
  # ## Enable/disable a filter
  setFilter: (e) =>
    if e instanceof jQuery.Event
      e.preventDefault()
      $filters = @$el.find('.item-filter')
      $filter = $(e.target).closest('.item-filter')
      filter = $filter.attr('data-filter')

    if (filter == "all" || filter in @filter)
      $filter.removeClass("active")
      if @unique
        @filter = new Array()
      else
        @filter.splice(@filter.indexOf(filter), 1)
    else
      $filter.addClass("active")
      if @unique
        @filter = [filter]
        $filters.not($filter).removeClass("active")
      else
        @filter.push(filter)


    @$el.trigger('search.change', {@filter})

    return @
