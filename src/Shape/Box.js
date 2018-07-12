import {max, min, quantile} from "d3-array";
import {nest} from "d3-collection";
import {select} from "d3-selection";

import {accessor, assign, BaseClass, constant, merge, elem} from "d3plus-common";

import Rect from "./Rect";
import Whisker from "./Whisker";
import Line from "./Line";

/**
    @class Box
    @extends BaseClass
    @desc Creates SVG lines based on an array of data.
*/
export default class Box extends BaseClass {

  /**
      @memberof Box
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
      @private
  */
  constructor() {

    super();

    this._name = "Box";
    // this._groupBy = [accessor("id")];
    this._id = (d, i) => d.id !== void 0 ? d.id : i;
    this._pathConfig = {
      stroke: constant("black"),
      strokeWidth: constant(1)
    };
    this._rectConfig = {
      fill: constant("white"),
      stroke: constant("black"),
      strokeWidth: constant(1)
    };
    this._value = accessor("value");
    this._whiskerMode = ["extent", "extent"];
    this._rectHeight = d => d.third - d.first;
    this._rectWidth = constant(50);
    this._x = constant(250);
    this._y = constant(250);

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
      values.sort((a, b) => a - b);
      d.i = data.indexOf(d.values[0]);
      d.x = this._x(d.data, d.i);
      d.y = this._y(d.data, d.i);

      d.first = quantile(values, 0.25);
      d.median = quantile(values, 0.50);
      d.third = quantile(values, 0.75);

      d.width = this._rectWidth();
      d.height = this._rectHeight(d);
      
      const mode = this._whiskerMode;

      if (mode[0] === "tukey") d.top = d.first - (d.third - d.first) * 1.5;
      else if (mode[0] === "extent") d.top = max(values);
      else if (typeof mode[0] === "number") d.top = min([max(values), quantile(values, mode[0] / 100)]);

      if (mode[1] === "tukey") d.bottom = d.third + (d.third - d.first) * 1.5;
      else if (mode[1] === "extent") d.bottom = min(values);
      else if (typeof mode[1] === "number") d.bottom = max([min(values), quantile(values, mode[1] / 100)]);

      this._topWhiskerLength = d.top - d.third;
      this._bottomWhiskerLength = d.first - d.bottom;

      d.nested = true;
      d.__d3plusShape__ = true;

      console.log("d from box: ", d);

      return d;
    });

    boxes.key = d => d.key;
    return boxes;

  }

  /**
      @memberof Box
      @desc Draws the Box.
      @param {Function} [*callback*]
      @chainable
  */
  render() {

    if (this._select === void 0) {
      this.select(select("body").append("svg")
        .style("width", `${window.innerWidth}px`)
        .style("height", `${window.innerHeight}px`)
        .style("display", "block").node());
    }

    const filteredData = this._dataFilter(this._data);
    console.log("filteredData: ", filteredData);

    new Rect()
      .data(filteredData)
      .x(filteredData[0].x)
      .y(filteredData[0].y)
      .config(this._rectConfig)
      .select(elem("g.d3plus-box", {
        parent: this._select
      }).node())
      .render();

    // Compute coordinates for median line.
    const boxTopY = this._y() - this._rectHeight(filteredData[0]) / 2;
    const medianPoint1X = this._x() - this._rectWidth() / 2;
    const medianPoint1Y = boxTopY + filteredData[0].third - filteredData[0].median;
    const medianPoint2X = medianPoint1X + this._rectWidth();
    const medianPoint2Y = medianPoint1Y;

    // Draw median line inside the box.
    new Line()
      .data([{x: medianPoint1X, y: medianPoint1Y}, {x: medianPoint2X, y: medianPoint2Y}])
      .select(elem("g.d3plus-box-median", {
        parent: this._select
      }).node())
      .render();

    // Draw 2 lines using Whisker class.
    // Note that this._x() and this._y() are coordinates of center of the rectangle.

    // Construct line coordinates for bottom line.
    const point1X = this._x();
    const point1Y = this._y() + this._rectHeight(filteredData[0]) / 2;

    // Construct line coordinates for top line.
    const point5X = this._x();
    const point5Y = this._y() - this._rectHeight(filteredData[0]) / 2;

    const whiskerData1 = [
      {x: point1X, y: point1Y}
    ];

    const whiskerData2 = [
      {x: point5X, y: point5Y}
    ];

    new Whisker()
      .data(whiskerData1)
      .select(elem("g.d3plus-box-whisker1", {
        parent: this._select
      }).node())
      .length(this._bottomWhiskerLength)
      .orient("bottom")
      .endpoint("Rect")
      .endpointConfig({
        Circle: {
          fill: "red",
          r: 5
        },
        Rect: {
          fill: "black",
          height: 3,
          width: 10
        }
      })
      .render();

    return this;
  }

  /**
      @memberof Box
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.
      @param {Array} [*data* = []]
      @chainable
  */
  data(_) {
    return arguments.length
      ? (this._data = _, this)
      : this._data;
  }

  /**
      @memberof Box
      @desc If *value* is specified, sets the config method for path shape and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  pathConfig(_) {
    return arguments.length ? (this._pathConfig = assign(this._pathConfig, _), this) : this._pathConfig;
  }

  /**
      @memberof Box
      @desc If *value* is specified, sets the config method for rect shape and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  rectConfig(_) {
    return arguments.length ? (this._rectConfig = assign(this._rectConfig, _), this) : this._rectConfig;
  }

  /**
      @memberof Box
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  select(_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
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
  rectWidth(_) {
    return arguments.length ? (this._rectWidth = typeof _ === "function" ? _ : constant(_), this) : this._rectWidth;
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
