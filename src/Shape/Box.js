import {max, min, quantile} from "d3-array";
import {nest} from "d3-collection";
import {interpolatePath} from "d3-interpolate-path";
import {select} from "d3-selection";

import {accessor, constant, merge} from "d3plus-common";

import Shape from "./Shape";

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
    this._whiskerMode = ["tukey", "tukey"];

  }

  /**
      @memberof Box
      @desc Filters/manipulates the data array before binding each point to an SVG group.
      @param {Array} [*data* = the data array to be filtered]
      @private
  */
  _dataFilter(data) {

    const boxes = nest().key(this._id).entries(data).map(d => {

      d.data = merge(d.values);
      const values = d.values.map(this._value);
      d.i = data.indexOf(d.values[0]);

      d.first = quantile(values, 0.75);
      d.median = quantile(values, 0.50);
      d.second = quantile(values, 0.25);

      const mode = this._whiskerMode;

      if (mode[0] === "tukey") d.bottom = d.first - (d.first - d.second) * 1.5;
      else if (mode[0] === "extent") d.bottom = max(values);
      else if (typeof mode[0] === "number") d.bottom = min([max(values), quantile(values, mode[0] / 100)]);

      if (mode[1] === "tukey") d.top = d.first + (d.first - d.second) * 1.5;
      else if (mode[1] === "extent") d.top = min(values);
      else if (typeof mode[1] === "number") d.top = max([min(values), quantile(values, mode[1] / 100)]);

      d.nested = true;
      d.__d3plusShape__ = true;

      return d;
    });

    boxes.key = d => d.key;
    console.log(boxes);
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

    // const that = this;
    //
    // this._path
    //   .curve(paths[`curve${this._curve.charAt(0).toUpperCase()}${this._curve.slice(1)}`])
    //   .defined(this._defined)
    //   .x(this._x)
    //   .y(this._y);
    //
    // this._enter.append("path")
    //   .attr("transform", d => `translate(${-d.xR[0] - d.width / 2}, ${-d.yR[0] - d.height / 2})`)
    //   .attr("d", d => this._path(d.values))
    //   .call(this._applyStyle.bind(this));
    //
    // this._update.select("path").transition(this._transition)
    //   .attr("transform", d => `translate(${-d.xR[0] - d.width / 2}, ${-d.yR[0] - d.height / 2})`)
    //   .attrTween("d", function(d) {
    //     return interpolatePath(select(this).attr("d"), that._path(d.values));
    //   })
    //   .call(this._applyStyle.bind(this));

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

}
