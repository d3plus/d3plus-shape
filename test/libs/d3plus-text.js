(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3')) :
	typeof define === 'function' && define.amd ? define('d3plus-text', ['exports', 'd3'], factory) :
	(factory((global.d3plus_text = {}),global.d3));
}(this, function (exports,d3) { 'use strict';

	d3 = 'default' in d3 ? d3['default'] : d3;

	var version = "0.2.1";

	/**
	    Wraps non-function variables in a simple return function.
	    @private
	*/
	function constant (x) {
	  return function constant() {
	    return x;
	  };
	}

	function measure (text) {
	  var style = arguments.length <= 1 || arguments[1] === undefined ? { "font-size": 10, "font-family": "sans-serif" } : arguments[1];

	  var canvas = d3.select("body").selectAll("canvas#d3plus-text-size").data([0]);
	  canvas.enter().append("canvas").attr("id", "d3plus-text-size");
	  var context = canvas.node().getContext("2d");

	  var font = [];
	  if ("font-style" in style) font.push(style["font-style"]);
	  if ("font-variant" in style) font.push(style["font-variant"]);
	  if ("font-weight" in style) font.push(style["font-weight"]);
	  if ("font-size" in style) {
	    var s = style["font-size"] + "px";
	    if ("line-height" in style) s += "/" + style["line-height"] + "px";
	    font.push(s);
	  }
	  if ("font-family" in style) font.push(style["font-family"]);

	  context.font = font.join(" ");

	  if (text instanceof Array) return text.map(function (t) {
	    return context.measureText(t).width;
	  });
	  return context.measureText(text).width;
	}

	/**
	    The default ellipsis function.
	    @private
	*/
	function boxEllipsis(_) {
	  if (_.includes(" ")) {
	    var a = _.split(/\s+/);
	    return _.replace(" " + a[a.length - 1], "...");
	  }
	  return "...";
	}

	/**
	    The default height accessor function.
	    @private
	*/
	function boxHeight(d) {
	  return d.height || 200;
	}

	/**
	    The default id accessor function.
	    @private
	*/
	function boxId(d, i) {
	  return d.id || "" + i;
	}

	var splitChars = ["-", "/", ";", ":", "&"];
	var splitRegex = new RegExp("[^\\s\\" + splitChars.join("\\") + "]+\\" + splitChars.join("?\\") + "?", "g");
	/**
	    The default word split function.
	    @private
	*/
	function boxSplit(_) {
	  return _.match(splitRegex);
	}

	/**
	    The default text accessor function.
	    @private
	*/
	function boxText(d) {
	  return d.text;
	}

	/**
	    The default width accessor function.
	    @private
	*/
	function boxWidth(d) {
	  return d.width || 200;
	}

	/**
	    The default x accessor function.
	    @private
	*/
	function boxX(d) {
	  return d.x || 0;
	}

	/**
	    The default y accessor function.
	    @private
	*/
	function boxY(d) {
	  return d.y || 0;
	}

	function box () {
	  var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	  var delay = 0,
	      duration = 0,
	      ellipsis = boxEllipsis,
	      fontColor = undefined,
	      fontFamily = undefined,
	      fontSize = undefined,
	      height = boxHeight,
	      id = boxId,
	      lineHeight = undefined,
	      select = undefined,
	      split = boxSplit,
	      text = boxText,
	      width = boxWidth,
	      x = boxX,
	      y = boxY;

	  function box() {

	    if (select === void 0) box.select(d3.select("body").append("svg").style("width", window.innerWidth + "px").style("height", window.innerHeight + "px").node());

	    var boxes = select.selectAll(".d3plus-text-box").data(data, id);

	    boxes.enter().append("text").attr("class", "d3plus-text-box").attr("id", function (d, i) {
	      return "d3plus-text-box-" + id(d, i);
	    });

	    boxes.attr("y", function (d, i) {
	      return y(d, i) + "px";
	    }).attr("fill", function (d, i) {
	      return fontColor(d, i);
	    }).attr("font-family", function (d, i) {
	      return fontFamily(d, i);
	    }).attr("font-size", function (d, i) {
	      return fontSize(d, i) + "px";
	    }).style("font-size", function (d, i) {
	      return fontSize(d, i) + "px";
	    }).each(function (d, i) {

	      var line = 1,
	          textProg = "",
	          widthProg = 0;

	      var h = height(d, i),
	          lH = lineHeight(d, i),
	          lineData = [""],
	          space = measure(" ", style),
	          t = text(d, i),
	          w = width(d, i),
	          words = split(t, i);

	      var style = {
	        "font-family": fontFamily(d, i),
	        "font-size": fontSize(d, i),
	        "line-height": lH
	      };

	      if (h > lH) {

	        var sizes = measure(words, style);
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	          for (var _iterator = words[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var word = _step.value;

	            var wordWidth = sizes[words.indexOf(word)];
	            if (wordWidth > w) break;
	            var nextChar = t.charAt(textProg.length + word.length);
	            if (nextChar === " ") word += nextChar;
	            if (widthProg + wordWidth > w) {
	              line++;
	              if (lH * line > h) {
	                lineData[line - 2] = ellipsis(lineData[line - 2].trimRight());
	                break;
	              }
	              widthProg = wordWidth;
	              lineData.push(word);
	            } else lineData[line - 1] += word;
	            textProg += word;
	            widthProg += wordWidth;
	            if (nextChar === " ") widthProg += space;
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	      }

	      function tspanStyle(tspan) {
	        tspan.text(function (d) {
	          return d.trimRight();
	        }).attr("x", x(d, i) + "px").attr("dx", "0px").attr("dy", lH + "px");
	      }

	      var tspans = d3.select(this).selectAll("tspan").data(lineData);

	      tspans.transition().duration(duration).call(tspanStyle);

	      tspans.enter().append("tspan").attr("dominant-baseline", "alphabetic").style("baseline-shift", "0%").attr("opacity", 0).call(tspanStyle).transition().duration(duration).delay(delay).attr("opacity", 1);
	    });

	    return box;
	  }

	  box.data = function (_) {
	    return arguments.length ? (data = _, box) : data;
	  };

	  box.delay = function (_) {
	    return arguments.length ? (delay = _, box) : delay;
	  };

	  box.duration = function (_) {
	    return arguments.length ? (duration = _, box) : duration;
	  };

	  box.ellipsis = function (_) {
	    return arguments.length ? (ellipsis = typeof _ === "function" ? _ : constant(_), box) : ellipsis;
	  };

	  box.fontColor = function (_) {
	    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant(_), box) : fontColor;
	  };

	  box.fontFamily = function (_) {
	    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant(_), box) : fontFamily;
	  };

	  box.fontSize = function (_) {
	    if (arguments.length) {
	      fontSize = typeof _ === "function" ? _ : constant(_);
	      if (lineHeight === void 0) lineHeight = constant(Math.ceil(fontSize() * 1.1));
	      return box;
	    }
	    return fontSize;
	  };

	  box.height = function (_) {
	    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), box) : height;
	  };

	  box.id = function (_) {
	    return arguments.length ? (id = typeof _ === "function" ? _ : constant(_), box) : id;
	  };

	  box.lineHeight = function (_) {
	    return arguments.length ? (lineHeight = typeof _ === "function" ? _ : constant(_), box) : lineHeight;
	  };

	  box.select = function (_) {
	    if (arguments.length) {
	      select = d3.select(_);
	      if (fontColor === void 0) box.fontColor(select.style("font-color"));
	      if (fontFamily === void 0) box.fontFamily(select.style("font-family"));
	      if (fontSize === void 0) box.fontSize(parseFloat(select.style("font-size"), 10));
	      return box;
	    }
	    return select;
	  };

	  box.split = function (_) {
	    return arguments.length ? (split = _, box) : split;
	  };

	  box.text = function (_) {
	    return arguments.length ? (text = typeof _ === "function" ? _ : constant(_), box) : text;
	  };

	  box.width = function (_) {
	    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), box) : width;
	  };

	  box.x = function (_) {
	    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), box) : x;
	  };

	  box.y = function (_) {
	    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), box) : y;
	  };

	  return data.length ? box() : box;
	}

	exports.version = version;
	exports.box = box;
	exports.width = measure;

}));
