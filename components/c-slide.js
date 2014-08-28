(function() {
  var CSlide, Slider,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CSlide = (function() {
    function CSlide($el, options) {
      this.$el = $el;
      this.set = __bind(this.set, this);
      this.options = options;
      this.$el.addClass('cSlide');
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

    CSlide.prototype.render = function() {
      this.$el.html(this.template({
        items: this.feed
      }));
      return this.slider = new Slider(this.$el.find('.slide-list'), this.$el.find('.slide-item'), this.$el.find('.prev'), this.$el.find('.next'));
    };

    CSlide.prototype.set = function(attribute, value) {
      return this[attribute] = value;
    };

    return CSlide;

  })();

  in_c["cSlide"] = CSlide;

  Slider = (function() {
    function Slider($el, $slides, $prev, $next) {
      this.$el = $el;
      this.$slides = $slides;
      this.$prev = $prev;
      this.$next = $next;
      this.setSizes = __bind(this.setSizes, this);
      this.prev = __bind(this.prev, this);
      this.next = __bind(this.next, this);
      this.setSizes();
      this.$current = $(this.$slides[0]);
      this.$prev.on("click", this.prev);
      this.$next.on("click", this.next);
      $(window).on("resize", this.setSizes);
    }

    Slider.prototype.next = function() {
      if (this.$current.index() + 1 < this.$slides.length) {
        this.$current = $(this.$slides[this.$current.index() + 1]);
        return this.goTo(this.$current);
      }
    };

    Slider.prototype.prev = function() {
      if (this.$current.index()) {
        this.$current = $(this.$slides[this.$current.index() - 1]);
        return this.goTo(this.$current);
      }
    };

    Slider.prototype.goTo = function($slide) {
      return this.$el.css({
        "margin-left": -$slide.position().left + "px"
      });
    };

    Slider.prototype.setSizes = function() {
      var slideHeight, slideWidth;
      console.log(this.$el.parent().width());
      slideWidth = this.$el.parent().width();
      slideHeight = this.$el.parent().height();
      this.$slides.width(slideWidth);
      this.$slides.height(slideHeight);
      return this.$el.width(this.$slides.length * slideWidth);
    };

    return Slider;

  })();

}).call(this);

//# sourceMappingURL=c-slide.js.map
