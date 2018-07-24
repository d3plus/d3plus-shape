import {max, min, quantile} from "d3-array";
import {nest} from "d3-collection";
import {select} from "d3-selection";

import {accessor, assign, BaseClass, configPrep, constant, merge, elem} from "d3plus-common";

import Circle from "./Circle";
import Rect from "./Rect";
import Whisker from "./Whisker";

const shapes = {Circle, Rect};

/**
    @class Box
    @extends BaseClass
    @desc Creates SVG box based on an array of data.
*/
export default class Box extends BaseClass {

  /**
      @memberof Box
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
      @private
  */
  constructor() {

    super();

    this._id = accessor("id", 1);
    this._medianConfig = {
      fill: constant("black"),
      height: constant(1)
    };
    this._outlier = accessor("outlier", "Circle");
    this._outlierConfig = {
      Circle: {
        r: accessor("r", 5)
      },
      Rect: {
        height: accessor("height", 5),
        width: accessor("width", 20)
      }
    };
    this._rectConfig = {
      fill: constant("white"),
      stroke: constant("black"),
      strokeWidth: constant(1)
    };
    this._rectWidth = constant(50);
    this._value = accessor("value");
    this._whiskerConfig = {};
    this._whiskerMode = ["tukey", "tukey"];
    this._x = accessor("x", 250);
    this._y = accessor("y", 250);

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

    const outlierData = [];

    const filteredData = nest().key(this._id).entries(this._data).map((d, i) => {

      d.data = merge(d.values);
      const values = d.values.map(this._value);
      values.sort((a, b) => a - b);
      d.i = this._data.indexOf(d.values[0]);
      d.id = this._id(d.data, d.i);
      d.x = this._x(d.data, d.i);
      d.y = this._y(d.data, d.i);

      d.first = quantile(values, 0.25);
      d.median = quantile(values, 0.50);
      d.third = quantile(values, 0.75);

      d.height = d.third - d.first;
      d.width = this._rectWidth(d.data, d.i);
      d.medianY = d.y - d.height / 2 + d.third -  d.median;

      const mode = this._whiskerMode;

      if (mode[0] === "tukey") {
        d.top = d.third + (d.third - d.first) * 1.5;
        if (d.top > max(values)) d.top = max(values);
      }
      else if (mode[0] === "extent") d.top = max(values);
      else if (typeof mode[0] === "number") d.top = min([max(values), quantile(values, mode[0] / 100)]);

      if (mode[1] === "tukey") {
        d.bottom = d.first - (d.third - d.first) * 1.5;
        if (d.bottom < min(values)) d.bottom = min(values);
      }
      else if (mode[1] === "extent") d.bottom = min(values);
      else if (typeof mode[1] === "number") d.bottom = max([min(values), quantile(values, mode[1] / 100)]);

      // Compute data for outliers.
      values.forEach(value => {
        const dataObj = {};
        dataObj.__d3plus__ = true;
        dataObj.data = d;
        dataObj.i = i;
        dataObj.outlier = this._outlier(d, i);
        dataObj.x = d.x;

        if (value < d.bottom) {
          dataObj.y = d.y + d.height / 2 + d.first - d.bottom + value;
          outlierData.push(dataObj);
        }
        else if (value > d.top) {
          dataObj.y = d.y - d.height / 2 - d.top - d.third - value;
          outlierData.push(dataObj);
        }
      });

      d.nested = true;
      d.__d3plus__ = true;

      return d;
    });

    // Draw box.
    new Rect()
      .data(filteredData)
      .x(d => d.x)
      .y(d => d.y)
      .select(elem("g.d3plus-Box", {parent: this._select}).node())
      .config(configPrep.bind(this)(this._rectConfig, "shape"))
      .render();

    // Draw median.
    new Rect()
      .data(filteredData)
      .y(d => d.medianY)
      .select(elem("g.d3plus-Box-Median", {parent: this._select}).node())
      .config(configPrep.bind(this)(this._medianConfig, "shape"))
      .render();

    // Draw 2 lines using Whisker class.
    // Construct coordinates for whisker startpoints and push it to the whiskerData.
    const whiskerData = [];
    filteredData.forEach((d, i) => {
      const x = this._x(d, i);
      const y = this._y(d, i);
      const topY = y - d.height / 2;
      const bottomY = y + d.height / 2;
      const topLength = d.top - d.third;
      const bottomLength = d.first - d.bottom;

      whiskerData.push(
        {__d3plus__: true, data: d, i, x, y: topY, length: topLength, orient: "top"},
        {__d3plus__: true, data: d, i, x, y: bottomY, length: bottomLength, orient: "bottom"}
      );
    });

    // Draw whiskers.
    new Whisker()
      .data(whiskerData)
      .select(elem("g.d3plus-Box-Whisker", {
        parent: this._select
      }).node())
      .config(configPrep.bind(this)(this._whiskerConfig, "shape"))
      .render();

    // Draw outliers.
    const outlierShapeData = nest().key(d => d.outlier).entries(outlierData);
    outlierShapeData.forEach(shapeData => {
      const shapeName = shapeData.key;
      new shapes[shapeName]()
        .data(shapeData.values)
        .select(elem(`g.d3plus-Box-Outlier-${shapeName}`, {parent: this._select}).node())
        .config(configPrep.bind(this)(this._outlierConfig, "shape", shapeName))
        .render();
    });

    return this;
  }

  /**
      @memberof Box
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.
      @param {Array} [*data* = []]
      @chainable
  */
  data(_) {
    return arguments.length ? (this._data = _, this) : this._data;
  }

  /**
      @memberof Box
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance.
      @param {Function} [*value*]
      @chainable
  */
  id(_) {
    return arguments.length ? (this._id = _, this) : this._id;
  }

  /**
      @memberof Box
      @desc If *value* is specified, sets the config method for median and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  medianConfig(_) {
    return arguments.length ? (this._medianConfig = assign(this._medianConfig, _), this) : this._medianConfig;
  }

  /**
      @memberof Box
      @desc If *value* is specified, sets the outlier accessor to the specified function or string and returns the current class instance.
      @param {Function|String}
      @chainable
  */
  outlier(_) {
    return arguments.length ? (this._outlier = typeof _ === "function" ? _ : constant(_), this) : this._outlier;
  }

  /**
      @memberof Box
      @desc If *value* is specified, sets the config method for each outlier point and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  outlierConfig(_) {
    return arguments.length ? (this._outlierConfig = assign(this._outlierConfig, _), this) : this._outlierConfig;
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
      @desc If *value* is specified, sets the config method for whisker and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  whiskerConfig(_) {
    return arguments.length ? (this._whiskerConfig = assign(this._whiskerConfig, _), this) : this._whiskerConfig;
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
  return d.y;
}
  */
  y(_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(_), this) : this._y;
  }

}
