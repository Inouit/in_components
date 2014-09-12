(function() {
  var in_Components;

  in_Components = (function() {
    function in_Components(selector) {
      var script, stylesheet, _i, _j, _len, _len1, _ref, _ref1;
      this.selector = selector;
      if (!window.in_c) {
        window.in_c = new Array();
      }
      this.$el = $(this.selector);
      this.el = $(this.selector).get(0);
      if (this.$el.attr('data-script')) {
        this.scripts = this.$el.attr('data-script').split(',');
      }
      if (this.$el.attr('data-css')) {
        this.stylesheets = this.$el.attr('data-css').split(',');
      }
      this.type = this.$el.attr('data-component');
      _ref = this.stylesheets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stylesheet = _ref[_i];
        if (!($("head").find('link[href="' + stylesheet + '"]').index() >= 0)) {
          $("head").append($('<link />', {
            href: stylesheet,
            rel: "stylesheet",
            type: "text/css"
          }));
        }
      }
      _ref1 = this.scripts;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        script = _ref1[_j];
        $.getScript(script).done((function(_this) {
          return function() {
            if ((typeof in_c !== "undefined" && in_c !== null ? in_c[_this.type] : void 0) != null) {
              return _this.component = new in_c[_this.type](_this.$el, _this.getOptions());
            } else {
              throw new ReferenceError('The component `' + _this.type + '` does not exist, or isn\'t registered in the `in_c` global array');
            }
          };
        })(this)).fail(function(e, name, err) {
          throw err;
        });
      }
      return this;
    }

    in_Components.prototype.getOptions = function() {
      var attribute, _ref;
      this.options = {};
      for (attribute in this.el.attributes) {
        if (((_ref = this.el.attributes[attribute].name) != null ? _ref.indexOf("data-") : void 0) >= 0) {
          this.options[this.el.attributes[attribute].name.replace('data-', '')] = this.el.attributes[attribute].value;
        }
      }
      return this.options;
    };

    return in_Components;

  })();

  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    exports.in_Components = in_Components;
  } else {
    window.in_Components = in_Components;
  }

}).call(this);

//# sourceMappingURL=in-components.js.map
