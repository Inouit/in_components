(function() {
  var CAlert, Slider,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CAlert = (function() {
    function CAlert($el, options) {
      this.$el = $el;
      this.options = options;
      this.set = __bind(this.set, this);
      this.$el.addClass('cAlert');
      this.loader = new Object();
      $.get(options.data).done((function(_this) {
        return function(data) {
          _this.loader.feed = true;
          _this.set("feed", data);
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

    CAlert.prototype.render = function() {
      this.$el.html(this.template({
        items: this.feed
      }));
      this.$items = this.$el.find("[data-id]");
      return this.slider = new Slider(this.$el.find('.alert-list'), this.$el.find('.alert-item'), this.$el.find('.prev'), this.$el.find('.next'));
    };

    CAlert.prototype.filter = function(results) {
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

    CAlert.prototype.renderFilters = function() {
      return this.$el.html(this.template({
        items: this.feed
      }));
    };

    CAlert.prototype.set = function(attribute, value) {
      return this[attribute] = value;
    };

    return CAlert;

  })();

  in_c["cAlert"] = CAlert;

  Slider = (function() {
    function Slider($el, $slides, $prev, $next) {
      this.$el = $el;
      this.$slides = $slides;
      this.$prev = $prev;
      this.$next = $next;
      this.prev = __bind(this.prev, this);
      this.next = __bind(this.next, this);
      this.$current = $(this.$slides[0]);
      this.$prev.on("click", this.prev);
      this.$next.on("click", this.next);
    }

    Slider.prototype.next = function() {
      if (this.$current.index() + 1 < this.$slides.length) {
        this.$current = $(this.$slides[this.$current.index() + 1]);
        return this.goTo(this.$current);
      }
    };

    Slider.prototype.prev = function() {
      if (this.$current.index() >= -1) {
        this.$current = $(this.$slides[this.$current.index() - 1]);
        return this.goTo(this.$current);
      }
    };

    Slider.prototype.goTo = function($slide) {
      return this.$el.css({
        "margin-top": -$slide.position().top + "px"
      });
    };

    return Slider;

  })();

}).call(this);

//# sourceMappingURL=c-alert.js.map
