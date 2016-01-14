(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3'), require('d3-selection'), require('d3-color'), require('d3-scale')) :
	typeof define === 'function' && define.amd ? define('d3plus-shape', ['exports', 'd3', 'd3-selection', 'd3-color', 'd3-scale'], factory) :
	(factory((global.d3plus_shape = {}),global.d3,global.d3_selection,global.d3_color,global.d3_scale));
}(this, function (exports,d3,d3Selection,d3Color,d3Scale) { 'use strict';

	d3 = 'default' in d3 ? d3['default'] : d3;

	var version = "0.2.0";

	function constant(x) {
	  return function constant() {
	    return x;
	  };
	}

	function constant$1(x) {
	  return function constant() {
	    return x;
	  };
	}

	function boxEllipsis(_) {
	  if (_.includes(" ")) {
	    var a = _.split(/\s+/);
	    return _.replace(` ${a[a.length - 1]}`, "...");
	  }
	  return "...";
	}

	var splitChars = ["-", "/", ";", ":", "&"];
	var splitRegex = new RegExp("[^\\s\\" + splitChars.join("\\") + "]+\\" + splitChars.join("?\\") + "?", "g");
	function boxSplit(_) {
	  return _.match(splitRegex);
	}

	function box() {

	  var ellipsis = boxEllipsis,
	      fontColor,
	      fontFamily,
	      fontSize,
	      height = constant$1(200),
	      lineHeight,
	      select,
	      split = boxSplit,
	      text,
	      width = constant$1(200),
	      x = constant$1(0),
	      y = constant$1(0);

	  function box() {

	    var fS = fontSize(),
	        h = height(select),
	        l = 1,
	        lH = lineHeight(),
	        p = "",
	        t = text(select),
	        w = width(select),
	        xP = x(select);

	    select
	      .attr("y", `${y(select)}px`)
	      .attr("fill", fontColor())
	      .attr("font-family", fontFamily())
	      .attr("font-size", `${fS}px`)
	      .size("font-size", `${fS}px`);

	    function tspanStyle(tspan) {
	      tspan
	        .attr("x", `${xP}px`)
	        .attr("dx", "0px")
	        .attr("dy", `${lH}px`)
	        .attr("dominant-baseline", "alphabetic")
	        .style("baseline-shift", "0%");
	    }

	    var tspan = select.html("").append("tspan").call(tspanStyle);
	    function addWord(word) {
	      var temp = p + word,
	          curr = tspan.html(),
	          join = t.charAt(temp.length);
	      tspan.html(curr + word);

	      if (select.node().getBBox().height > h) {
	        tspan.remove();
	        tspan = d3Selection.select(select.node().lastChild);
	        if (tspan.size()) {
	          t = tspan.html();
	          var e = ellipsis(t);
	          tspan.html(e ? e : t);
	        }
	        return false;
	      }
	      else if (tspan.node().getComputedTextLength() > w) {
	        tspan.html(curr.trimRight());
	        tspan = select.append("tspan").call(tspanStyle);
	        l++;
	        return addWord(word);
	      }
	      else {
	        var char = join === " " ? " " : "";
	        p = temp + char;
	        tspan.html(curr + word + char);
	        return true;
	      }
	    }

	    for (let word of split(t)) {
	      var r = addWord(word);
	      if (!r) { break; }
	    }

	  }

	  box.ellipsis = function(_) {
	    return arguments.length ? (ellipsis = typeof _ === "function" ? _ : constant$1(_), box) : ellipsis;
	  };

	  box.fontColor = function(_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant$1(_), box) : fontColor;
	  };

	  box.fontFamily = function(_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant$1(_), box) : fontFamily;
	  };

	  box.fontSize = function(_) {
	    return arguments.length ? (fontSize = typeof _ === "function" ? _ : constant$1(_), box) : fontSize;
	  };

	  box.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant$1(_), box) : height;
	  };

	  box.select = function(_) {
	    if (arguments.length) {
	      select = d3Selection.select(_);
	      if (text === void 0) {
	        text = constant$1(select.text());
	        if (fontColor === void 0) { fontColor = constant$1(select.style("font-color")); }
	        if (fontFamily === void 0) { fontFamily = constant$1(select.style("font-family")); }
	        if (fontSize === void 0) {
	          fontSize = constant$1(parseFloat(select.style("font-size"), 10));
	          lineHeight = constant$1(Math.ceil(fontSize() * 1.1));
	        }
	      }
	      return box;
	    }
	    return select;
	  };

	  box.split = function(_) {
	    return arguments.length ? (split = _, box) : split;
	  };

	  box.text = function(_) {
	    return arguments.length ? (text = typeof _ === "function" ? _ : constant$1(_), box) : text;
	  };

	  box.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant$1(_), box) : width;
	  };

	  box.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant$1(_), box) : x;
	  };

	  box.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant$1(_), box) : y;
	  };

	  return box;

	}

	/**
	    @module {Object} defaults
	    @desc A set of default color values used when assigning colors based on data.
	      *
	      * | Name | Default | Description |
	      * |---|---|---|
	      * | dark | #444444 | Used in the [contrast](#contrast) function when the color given is very light. |
	      * | light | #f7f7f7 | Used in the [contrast](#contrast) function when the color given is very dark. |
	      * | missing | #cccccc | Used in the [assign](#assign) function when the value passed is `null` or `undefined`. |
	      * | off | #b22200 | Used in the [assign](#assign) function when the value passed is `false`. |
	      * | on | #224f20 | Used in the [assign](#assign) function when the value passed is `true`. |
	      * | scale | `scale.ordinal().range([ "#b22200", "#eace3f", "#282f6b", "#b35c1e", "#224f20", "#5f487c", "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8", "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"])` | An ordinal scale used in the [assign](#assign) function for non-valid color strings and numbers. |
	*/
	var defaults = {
	  "dark": "#444444",
	  "light": "#f7f7f7",
	  "missing": "#cccccc",
	  "off": "#b22200",
	  "on": "#224f20",
	  "scale": d3Scale.scaleOrdinal().range([
	    "#b22200", "#eace3f", "#282f6b", "#b35c1e", "#224f20", "#5f487c",
	    "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8",
	    "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"
	  ])
	};

	function getColor$1(k, u) {
	  return k in u ? u[k] : defaults[k];
	}

	/**
	    @function contrast
	    @desc A set of default color values used when assigning colors based on data.
	    @param {String} c A valid CSS color string.
	    @param {Object} [u = defaults] An object containing overrides of the default colors.
	    @returns {String}
	*/
	function contrast(c, u) {
	  if (u === void 0) { u = {}; }
	  c = d3Color.rgb(c);
	  var yiq = (c.r * 299 + c.g * 587 + c.b * 114) / 1000;
	  return yiq >= 128 ? getColor$1("dark", u) : getColor$1("light", u);
	}

	function rectHeight(d) {
	  return d.height;
	}

	function rectId(d) {
	  return d.id;
	}

	function rectInnerBounds(w, h) {
	  return {"width": w, "height": h, "x": -w / 2, "y": -h / 2};
	}

	function rectWidth(d) {
	  return d.width;
	}

	function rectX(d) {
	  return d.x;
	}

	function rectY(d) {
	  return d.y;
	}

	/**
	    @function rect
	*/
	function rect() {

	  var fill = constant("black"),
	      data = [],
	      id = rectId,
	      innerBounds = rectInnerBounds,
	      height = rectHeight,
	      label,
	      select,
	      timing = 600,
	      width = rectWidth,
	      x = rectX,
	      y = rectY;

	  function rect() {

	    /* Bind data array to elements using provided id matching. */
	    var groups = select.selectAll(".d3plus-shape-rect")
	      .data(data, id);

	    /* Enter */
	    var enter = groups.enter().append("g")
	      .attr("class", "d3plus-shape-rect")
	      .attr("id", (d) => "d3plus-shape-rect-" + id(d))
	      .attr("transform", (d) => `translate(${x(d)},${y(d)})`);

	    enter.append("rect")
	      .attr("width", 0)
	      .attr("height", 0)
	      .attr("x", 0)
	      .attr("y", 0)
	      .attr("fill", (d) => fill(d));

	    /* Update */
	    groups.transition().duration(timing)
	      .attr("transform", (d) => `translate(${x(d)},${y(d)})`);

	    groups.selectAll("rect").transition().duration(timing)
	      .attr("width", (d) => width(d))
	      .attr("height", (d) => height(d))
	      .attr("x", (d) => -width(d) / 2)
	      .attr("y", (d) => -height(d) / 2)
	      .attr("fill", (d) => fill(d));

	    /* Exit */
	    groups.exit().transition().delay(timing).remove();

	    groups.exit().selectAll("rect").transition().duration(timing)
	      .attr("width", 0)
	      .attr("height", 0)
	      .attr("x", (d) => x(d))
	      .attr("y", (d) => y(d));

	    /* Draw labels based on inner bounds */
	    groups.each(function(d){
	      if (label !== void 0) {
	        var b = innerBounds(width(d), height(d));
	        if (b) {

	          var elem = d3.select(this).selectAll("text").data([0]);
	          elem.enter().append("text").html(label(d));

	          box()
	            .fontColor(function(){
	              return contrast(fill(d));
	            })
	            .height(b.height)
	            .select(elem.node())
	            .width(b.width)
	            .x(b.x)
	            .y(b.y)();

	        }
	        else {
	          d3.select(this).select("text").remove();
	        }
	      }
	      else {
	        d3.select(this).select("text").remove();
	      }
	    });

	    return rect;

	  }

	  /**
	      @memberof rect
	      @desc If *data* is specified, sets the data array to the specified array and returns this rectangle generator. If *data* is not specified, returns the current data array. A rectangle will be drawn for each object in the array.
	      @param {Array} [*data* = []]
	  */
	  rect.data = function(_) {
	    return arguments.length ? (data = _, rect) : data;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current fill accessor.
	      @param {Function|String} [*value* = "black"]
	  */
	  rect.fill = function(_) {
	    return arguments.length ? (fill = typeof _ === "function" ? _ : constant(_), rect) : fill;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current height accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.height;
	}
	  */
	  rect.height = function(_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), rect) : height;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the id accessor to the specified function and returns this rectangle generator. If *value* is not specified, returns the current id accessor.
	      @param {Function} [*value*]
	      @example
	function(d) {
	  return d.id;
	}
	  */
	  rect.id = function(_) {
	    return arguments.length ? (id = _, rect) : id;
	  };

	  /**
	      @memberof rect
	      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this rectangle generator. If *bounds* is not specified, returns the current inner bounds accessor.
	      @example
	function(w, h) {
	  return {
	    "width": w,
	    "height": h,
	    "x": -w / 2,
	    "y": -h / 2
	  };
	}
	      @param {Function} [*bounds*] Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
	  */
	  rect.innerBounds = function(_) {
	    return arguments.length ? (innerBounds = _, rect) : innerBounds;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
	      @param {Function|String} [*value*]
	  */
	  rect.label = function(_) {
	    return arguments.length ? (label = typeof _ === "function" ? _ : constant(_), rect) : label;
	  };

	  /**
	      @memberof rect
	      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this rectangle generator. If *selector* is not specified, returns the current SVG container element, which is `undefined` by default.
	      @param {String|HTMLElement} [*selector*]
	  */
	  rect.select = function(_) {
	    return arguments.length ? (select = d3.select(_), rect) : select;
	  };

	  /**
	      @memberof rect
	      @desc If *ms* is specified, sets the animation timing to the specified number and returns this rectangle generator. If *ms* is not specified, returns the current animation timing.
	      @param {Number} [*ms* = 600]
	  */
	  rect.timing = function(_) {
	    return arguments.length ? (timing = _, rect) : timing;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current width accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.width;
	}
	  */
	  rect.width = function(_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), rect) : width;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current x accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.x;
	}
	  */
	  rect.x = function(_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), rect) : x;
	  };

	  /**
	      @memberof rect
	      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current y accessor.
	      @param {Function|Number} [*value*]
	      @example
	function(d) {
	  return d.y;
	}
	  */
	  rect.y = function(_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), rect) : y;
	  };

	  return rect;

	}

	exports.version = version;
	exports.rect = rect;

}));