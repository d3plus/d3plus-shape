import {extent} from "d3-array";
import {nest} from "d3-collection";
import {interpolatePath} from "d3-interpolate-path";
import {select} from "d3-selection";
import * as paths from "d3-shape";

import {constant} from "d3plus-common";
import {strip} from "d3plus-text";

import {default as Shape} from "./Shape";

/**
    @class Line
    @extends Shape
    @desc Creates SVG lines based on an array of data.
*/
export default class Line extends Shape {

  /**
      @memberof Line
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
      @private
  */
  constructor() {

    super();

    this._curve = "linear";
    this._defined = d => d;
    this._fill = constant("none");
    this._path = paths.line();
    this._strokeWidth = constant(1);

  }

  /**
      Draws the lines.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    const that = this;

    const lines = nest().key(this._id).entries(this._data).map(d => {
      const x = extent(d.values, this._x);
      d.xR = x;
      d.width = x[1] - x[0];
      d.x = x[0] + d.width / 2;
      const y = extent(d.values, this._y);
      d.yR = y;
      d.height = y[1] - y[0];
      d.y = y[0] + d.height / 2;
      d.nested = true;
      return d;
    });

    this._path
      .curve(paths[`curve${this._curve.charAt(0).toUpperCase()}${this._curve.slice(1)}`])
      .defined(this._defined)
      .x(this._x)
      .y(this._y);

    const groups = this._select.selectAll(".d3plus-Line").data(lines, d => d.key);

    groups.transition(this._transition)
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    groups.select("path").transition(this._transition)
      .attr("transform", d => `translate(${-d.xR[0] - d.width / 2}, ${-d.yR[0] - d.height / 2})`)
      .attrTween("d", function(d) {
        return interpolatePath(select(this).attr("d"), that._path(d.values));
      })
      .call(this._applyStyle.bind(this));

    groups.exit().transition().delay(this._duration).remove();

    groups.exit().call(this._applyLabels.bind(this), false);

    const enter = groups.enter().append("g")
        .attr("class", d => `d3plus-Shape d3plus-Line d3plus-id-${strip(d.key)}`)
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .attr("opacity", 0);

    enter.append("path")
      .attr("transform", d => `translate(${-d.xR[0] - d.width / 2}, ${-d.yR[0] - d.height / 2})`)
      .attr("d", d => this._path(d.values))
      .call(this._applyStyle.bind(this));

    const update = enter.merge(groups);

    update.call(this._applyLabels.bind(this))
        .attr("pointer-events", "none")
      .transition(this._transition)
        .attr("opacity", this._opacity)
      .transition()
        .attr("pointer-events", "all");

    this._applyEvents(update);

    return this;

  }

  /**
      @memberof Line
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  _aes(d, i) {
    return {points: d.values.map(p => [this._x(p, i), this._y(p, i)])};
  }

  /**
      @memberof Line
      @desc If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve.
      @param {String} [*value* = "linear"]
  */
  curve(_) {
    return arguments.length ? (this._curve = _, this) : this._curve;
  }

  /**
      @memberof Line
      @desc If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.
      @param {Function} [*value*]
  */
  defined(_) {
    return arguments.length ? (this._defined = _, this) : this._defined;
  }

}
