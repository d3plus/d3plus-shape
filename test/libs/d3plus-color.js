(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-color'), require('d3-scale')) :
	typeof define === 'function' && define.amd ? define('d3plus-color', ['exports', 'd3-color', 'd3-scale'], factory) :
	(factory((global.d3plus_color = {}),global.d3_color,global.d3_scale));
}(this, function (exports,d3Color,d3Scale) { 'use strict';

	var version = "0.2.4";

	/**
	    @function add
	    @desc Adds two colors together.
	    @param {String} c1 The first color, a valid CSS color string.
	    @param {String} c2 The second color, also a valid CSS color string.
	    @param {String} [o1 = 1] Value from 0 to 1 of the first color's opacity.
	    @param {String} [o2 = 1] Value from 0 to 1 of the first color's opacity.
	    @returns {String}
	*/
	function add (c1, c2) {
	    var o1 = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	    var o2 = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];

	    c1 = d3Color.hsl(c1);
	    c2 = d3Color.hsl(c2);
	    var d = Math.abs(c2.h * o2 - c1.h * o1);
	    if (d > 180) d -= 360;
	    var h = (Math.min(c1.h, c2.h) + d / 2) % 360;
	    var l = c1.l + (c2.l * o2 - c1.l * o1) / 2,
	        s = c1.s + (c2.s * o2 - c1.s * o1) / 2;
	    // a = o1 + (o2 - o1) / 2;
	    if (h < 0) h += 360;
	    return d3Color.hsl("hsl(" + h + "," + s * 100 + "%," + l * 100 + "%)").toString();
	    // return hsl(`hsl(${h},${s * 100}%,${l * 100}%,${a})`).toString();
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
	  "scale": d3Scale.scaleOrdinal().range(["#b22200", "#eace3f", "#282f6b", "#b35c1e", "#224f20", "#5f487c", "#759143", "#419391", "#993c88", "#e89c89", "#ffee8d", "#afd5e8", "#f7ba77", "#a5c697", "#c5b5e5", "#d1d392", "#bbefd0", "#e099cf"])
	};

	/**
	    Returns a color based on a key, whether it is present in a user supplied object or in the default object.
	    @private
	    @returns {String}
	*/
	function getColor(k, u) {
	  return k in u ? u[k] : defaults[k];
	}

	/**
	    @function assign
	    @desc Assigns a color to a value using a predefined set of defaults.
	    @param {String} c A valid CSS color string.
	    @param {Object} [u = defaults] An object containing overrides of the default colors.
	    @returns {String}
	*/
	function assign (c, u) {

	  if (u === void 0) u = {};

	  // If the value is null or undefined, set to grey.
	  if ([null, void 0].indexOf(c) >= 0) return getColor("missing", u);
	  // Else if the value is true, set to green.
	  else if (c === true) return getColor("on", u);
	    // Else if the value is false, set to red.
	    else if (c === false) return getColor("off", u);

	  var p = d3Color.color(c);
	  // If the value is not a valid color string, use the color scale.
	  if (!p) return getColor("scale", u)(c);

	  return c.toString();
	}

	/**
	    @function contrast
	    @desc A set of default color values used when assigning colors based on data.
	    @param {String} c A valid CSS color string.
	    @param {Object} [u = defaults] An object containing overrides of the default colors.
	    @returns {String}
	*/
	function contrast (c, u) {
	    if (u === void 0) u = {};
	    c = d3Color.rgb(c);
	    var yiq = (c.r * 299 + c.g * 587 + c.b * 114) / 1000;
	    return yiq >= 128 ? getColor("dark", u) : getColor("light", u);
	}

	/**
	    @function legible
	    @desc Darkens a color so that it will appear legible on a white background.
	    @param {String} c A valid CSS color string.
	    @returns {String}
	*/
	function legible (c) {
	  c = d3Color.hsl(c);
	  if (c.l > 0.45) {
	    if (c.s > 0.8) c.s = 0.8;
	    c.l = 0.45;
	  }
	  return c.toString();
	}

	/**
	    @function lighter
	    @desc Similar to d3.color.brighter, except that this also reduces saturation so that colors don't appear neon.
	    @param {String} c A valid CSS color string.
	    @param {String} [i = 0.5] A value from 0 to 1 dictating the strength of the function.
	    @returns {String}
	*/
	function lighter (c, i) {
	  if (i === void 0) i = 0.5;
	  c = d3Color.hsl(c);
	  i *= 1 - c.l;
	  c.l += i;
	  c.s -= i;
	  return c.toString();
	}

	/**
	    @function subtract
	    @desc Subtracts one color from another.
	    @param {String} c1 The base color, a valid CSS color string.
	    @param {String} c2 The color to remove from the base color, also a valid CSS color string.
	    @param {String} [o1 = 1] Value from 0 to 1 of the first color's opacity.
	    @param {String} [o2 = 1] Value from 0 to 1 of the first color's opacity.
	    @returns {String}
	*/
	function subtract (c1, c2, o1, o2) {
	  if (o1 === void 0) o1 = 1;
	  if (o2 === void 0) o2 = 1;
	  c1 = d3Color.hsl(c1);
	  c2 = d3Color.hsl(c2);
	  var d = c2.h * o2 - c1.h * o1;
	  if (Math.abs(d) > 180) d -= 360;
	  var h = (c1.h - d) % 360;
	  var l = c1.l - (c2.l * o2 - c1.l * o1) / 2,
	      s = c1.s - (c2.s * o2 - c1.s * o1) / 2;
	  // a = o1 - (o2 - o1) / 2;
	  if (h < 0) h += 360;
	  return d3Color.hsl("hsl(" + h + "," + s * 100 + "%," + l * 100 + "%)").toString();
	  // return hsl(`hsl(${h},${s * 100}%,${l * 100}%,${a})`).toString();
	}

	exports.version = version;
	exports.add = add;
	exports.assign = assign;
	exports.contrast = contrast;
	exports.defaults = defaults;
	exports.legible = legible;
	exports.lighter = lighter;
	exports.subtract = subtract;

}));
