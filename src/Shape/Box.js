import {max, min, quantile} from "d3-array";
import {nest} from "d3-collection";
// import {interpolatePath} from "d3-interpolate-path";
// import {select} from "d3-selection";
// import {accessor, assign, configPrep, constant, elem, merge} from "d3plus-common";

import {accessor, configPrep, constant, merge, elem} from "d3plus-common";

import Shape from "./Shape";
import Rect from "./Rect";
// import Line from "./Line";
import Path from "./Path";

/**
    @class Box
    @extends Shape
    @desc Creates SVG lines based on an array of data.
*/
export default class Box extends Shape {

  /**
      @memberof Box
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
      @private
  */
  constructor() {

    super();

    this._defined = d => d;
    this._fill = constant("white");
    this._name = "Box";
    this._stroke = constant("black");
    this._strokeWidth = constant(1);
    this._value = accessor("value");
    this._whiskerMode = ["extent", "extent"];
    this._width = constant(100);
    this._x = constant(100);
    this._y = constant(100);

  }

  /**
      @memberof Box
      @desc Filters/manipulates the data array before binding each point to an SVG group.
      @param {Array} [*data* = the data array to be filtered]
      @private
  */
  _dataFilter(data) {
    const boxes = this._box = nest().key(this._id).entries(data).map(d => {

      d.data = merge(d.values);
      const values = d.values.map(this._value);
      values.sort();
      d.i = data.indexOf(d.values[0]);

      d.first = quantile(values, 0.25);
      d.median = quantile(values, 0.50);
      d.third = quantile(values, 0.75);

      const mode = this._whiskerMode;

      if (mode[0] === "tukey") d.top = d.first - (d.third - d.first) * 1.5;
      else if (mode[0] === "extent") d.top = max(values);
      else if (typeof mode[0] === "number") d.top = min([max(values), quantile(values, mode[0] / 100)]);

      if (mode[1] === "tukey") d.bottom = d.third + (d.third - d.first) * 1.5;
      else if (mode[1] === "extent") d.bottom = min(values);
      else if (typeof mode[1] === "number") d.bottom = max([min(values), quantile(values, mode[1] / 100)]);

      d.nested = true;
      d.__d3plusShape__ = true;

      return d;
    });

    boxes.key = d => d.key;
    return boxes;
    
  }

  /**
      @memberof Box
      @desc Draws the lines.
      @param {Function} [*callback*]
      @chainable
  */
  render(callback) {

    super.render(callback);

    const rectData = {width: this._width(), height: this._box[0].third - this._box[0].first, x: this._x(), y: this._y()};
    new Rect()
      .data([rectData])
      .fill("white")
      .strokeWidth(1)
      .select(elem("g.d3plus-Box", {
        parent: this._select
      }).node())
      .render();

    // Draw 4 lines using Path class.
    // Note that rectData.x and rectData.y are coordinates of center of the rectangle.

    // Construct path string for bottom line.
    const point1X = rectData.x;
    const point1Y = rectData.y + rectData.height / 2;
    const point2X = point1X;
    const point2Y = point1Y + (this._box[0].first - this._box[0].bottom);
    let line1Str = `M${  point1X  },${  point1Y}`;
    line1Str += `L${  point2X  },${  point2Y}`;
    console.log("line1Str: ", line1Str);

    // Construct path string for end marker of bottom line.
    const point3X = point2X - 50;
    const point3Y = point2Y;
    const point4X = point2X + 50;
    const point4Y = point2Y;
    let line2Str = `M${  point3X  },${  point3Y}`;
    line2Str += `L${  point4X  },${  point4Y}`;
    console.log("line2Str: ", line2Str);

    // Construct path string for top line.
    const point5X = rectData.x;
    const point5Y = rectData.y - rectData.height / 2;
    const point6X = point5X;
    const point6Y = point5Y - (this._box[0].top - this._box[0].third);
    let line3Str = `M${  point5X  },${  point5Y}`;
    line3Str += `L${  point6X  },${  point6Y}`;
    console.log("line3Str: ", line3Str);

    // Construct path string for end marker of top line.
    const point7X = point6X - 50;
    const point7Y = point6Y;
    const point8X = point6X + 50;
    const point8Y = point6Y;
    let line4Str = `M${  point7X  },${  point7Y}`;
    line4Str += `L${  point8X  },${  point8Y}`;
    console.log("line4Str: ", line4Str);

    new Path()
    .data([
      {path: line1Str},
      {path: line2Str},
      {path: line3Str},
      {path: line4Str}
    ])
    .select(elem("g.d3plus-Box", {
      parent: this._select
    }).node())
    .strokeWidth(1)
    .render();
    return this;
  }

  /**
      @memberof Box
      @desc An accessor function that provides the number needed to calculate the various ranges used when making the box. If all of the data points use the same key to return the value, then this method can be passed String of that key (instead of a full accessor function).
      @param {String|Function} *value* = "value"
      @chainable
  */
  value(_) {
    return arguments.length ? (this._value = typeof _ === "function" ? _ : accessor(_), this) : this._value;
  }

  /**
      @memberof Box
      @desc Determines the value used for each whisker. Can be passed a single value to apply for both whiskers, or an Array of 2 values for the lower and upper whiskers (in that order). Accepted values are `"tukey"`, `"extent"`, or a Number representing a quantile.
      @param {String|Number|Array[2]} *value* = "tukey"
      @chainable
  */
  whiskerMode(_) {
    return arguments.length ? (this._whiskerMode = _ instanceof Array ? _ : [_, _], this) : this._whiskerMode;
  }


  /**
      @memberof Box
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.width;
}
  */
  width(_) {
    return arguments.length ? (this._width = typeof _ === "function" ? _ : constant(_), this) : this._width;
  }


  /**
      @memberof Box
      @desc If *value* is specified, sets the x axis to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.x;
}
  */
  x(_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : constant(_), this) : this._x;
  }

  /**
      @memberof Box
      @desc If *value* is specified, sets the y axis to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.x;
}
  */
  y(_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(_), this) : this._y;
  }

}
