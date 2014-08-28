(function() {
  var CFeed, Filters,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CFeed = (function() {
    function CFeed($el, options) {
      this.$el = $el;
      this.options = options;
      this.set = __bind(this.set, this);
      this.$el.addClass('cFeed');
      this.loader = new Object();
      $.get(options.data).done((function(_this) {
        return function(data) {
          _this.loader.feed = true;
          _this.set("feed", data);
          if (options.filter) {
            _this.filters = new Filters(_this.$el, data, _this.options.filter, _this.options.filtertmpl, true);
            _this.filters.$el.on("search.change", function(e, data) {
              return _this.filter(data.filter);
            });
          }
          if (_this.loader.template) {
            return _this.render();
          }
        };
      })(this));
      $.get(options.template).done((function(_this) {
        return function(data) {
          _this.loader.template = true;
          _this.set("template", _.template(data));
          if (_this.loader.feed) {
            return _this.render();
          }
        };
      })(this));
    }

    CFeed.prototype.render = function() {
      this.$el.html(this.template({
        items: this.feed
      }));
      return this.$items = this.$el.find("[data-id]");
    };

    CFeed.prototype.filter = function(results) {
      var $item, item, _i, _len, _ref, _ref1, _results;
      _ref = this.$items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        $item = $(item);
        if (!results.length || (_ref1 = $item.attr("data-" + this.options.filter), __indexOf.call(results, _ref1) >= 0)) {
          _results.push($item.show());
        } else {
          _results.push($item.hide());
        }
      }
      return _results;
    };

    CFeed.prototype.renderFilters = function() {
      return this.$el.html(this.template({
        items: this.feed
      }));
    };

    CFeed.prototype.set = function(attribute, value) {
      return this[attribute] = value;
    };

    return CFeed;

  })();

  in_c["cFeed"] = CFeed;


  /*
   * Filters
   *# Manage filters
   * Parameters :
   *   - parent : The dom selector were the filter navigation must be added
   *   - data : The data to search
   *   - fields : The field to filter
   *   - @template : The template to build the navigation
   */

  Filters = (function() {
    function Filters($parent, data, field, template, unique) {
      this.unique = unique;
      this.setFilter = __bind(this.setFilter, this);
      this.id = 'item-filters-' + (new Date().getTime());
      $parent.before('<div id="' + this.id + '" class="item-filters" />');
      this.$el = $('#' + this.id);
      if (!this.unique) {
        this.unique = false;
      }
      this.parseData(data, field);
      this.filter = new Array();
      $.get(template).done((function(_this) {
        return function(data) {
          _this.template = _.template(data);
          _this.render();
          _this.$filterBtns = _this.$el.find('.item-filter');
          return _this.$filterBtns.on("click", _this.setFilter);
        };
      })(this));
      return this;
    }

    Filters.prototype.parseData = function(data, field) {
      var item, _i, _len, _ref;
      this.filters = new Array();
      if (this.unique) {
        this.filters.push("all");
      }
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        item = data[_i];
        if (_ref = item[field], __indexOf.call(this.filters, _ref) < 0) {
          this.filters.push(item[field]);
        }
      }
      return this;
    };

    Filters.prototype.render = function() {
      return this.$el.html(this.template({
        filters: this.filters
      }));
    };

    Filters.prototype.setFilter = function(e) {
      var $filter, $filters, filter;
      if (e instanceof jQuery.Event) {
        e.preventDefault();
        $filters = this.$el.find('.item-filter');
        $filter = $(e.target).closest('.item-filter');
        filter = $filter.attr('data-filter');
      }
      if (filter === "all" || __indexOf.call(this.filter, filter) >= 0) {
        $filter.removeClass("active");
        if (this.unique) {
          this.filter = new Array();
        } else {
          this.filter.splice(this.filter.indexOf(filter), 1);
        }
      } else {
        $filter.addClass("active");
        if (this.unique) {
          this.filter = [filter];
          $filters.not($filter).removeClass("active");
        } else {
          this.filter.push(filter);
        }
      }
      this.$el.trigger('search.change', {
        filter: this.filter
      });
      return this;
    };

    return Filters;

  })();

}).call(this);

//# sourceMappingURL=c-feed.js.map
