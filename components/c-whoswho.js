(function() {
  var CWhosWho,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CWhosWho = (function() {
    function CWhosWho($el, options) {
      this.$el = $el;
      this.set = __bind(this.set, this);
      this.options = options;
      this.$el.addClass('cWhosWho');
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

    CWhosWho.prototype.render = function() {
      return this.$el.html(this.template({
        persons: this.feed
      }));
    };

    CWhosWho.prototype.set = function(attribute, value) {
      return this[attribute] = value;
    };

    return CWhosWho;

  })();

  in_c["cWhosWho"] = CWhosWho;

}).call(this);

//# sourceMappingURL=c-whoswho.js.map
