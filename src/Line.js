import {extent} from "d3-array";
import {nest} from "d3-collection";
import * as paths from "d3-shape";
import {select} from "d3-selection";
import {transition} from "d3-transition";

import {accessor, attrize, constant} from "d3plus-common";
import {default as Shape} from "./Shape";

/**
    @class Line
    @extends Shape
    @desc Creates SVG lines based on an array of data.
*/
export default class Line extends Shape {

  constructor() {
    super();
    this._curve = "linear";
    this._fill = constant("none");
    this._path = paths.line().defined(d => d);
    this._strokeWidth = constant(1);
    this._x = accessor("x");
    this._y = accessor("y");
  }

  /**
      Draws the lines.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    const lines = nest().key(this._id).entries(this._data).map(d => {
      const x = extent(d.values, v => v.x);
      d.xR = x;
      d.width = x[1] - x[0];
      d.x = x[0] + d.width / 2;
      const y = extent(d.values, v => v.y);
      d.yR = y;
      d.height = y[1] - y[0];
      d.y = y[0] + d.height / 2;
      d.nested = true;
      return d;
    });

    this._path
      .curve(paths[`curve${this._curve.charAt(0).toUpperCase()}${this._curve.slice(1)}`])
      .x(this._x)
      .y(this._y);

    const groups = this._select.selectAll(".d3plus-shape-line").data(lines, d => d.key);

    groups.transition(this._transition)
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    groups.select("path").transition(this._transition)
      .attr("transform", d => `translate(${-d.xR[0] - d.width / 2}, ${-d.yR[0] - d.height / 2})`)
      .attr("d", d => this._path(d.values))
      .call(this._applyStyle.bind(this));

    groups.exit().transition().delay(this._duration).remove();

    groups.exit().call(this._applyLabels.bind(this), false);

    const enter = groups.enter().append("g")
        .attr("class", "d3plus-shape-line")
        .attr("id", d => `d3plus-shape-line-${d.key}`)
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
        .attr("pointer-events", "none");

    const that = this;
    let hitArea = update.selectAll(".hitArea").data(this._hitArea ? [0] : []);
    hitArea.exit().remove();
    hitArea = hitArea.enter().append("rect")
        .attr("class", "hitArea")
        .attr("fill", "none")
      .merge(hitArea)
        .data(d => [d])
        .each(function(d) {
          const h = that._hitArea(d, that._data.indexOf(d));
          if (h) select(this).call(attrize, h);
          else select(this).remove();
        });
    const handler = this._hitArea ? hitArea : update;

    const events = Object.keys(this._on);
    for (let e = 0; e < events.length; e++) handler.on(events[e], this._on[events[e]]);

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
      @desc If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve. The number returned should correspond to the horizontal center of the rectangle.
      @param {String} [*value* = "linear"]
  */
  curve(_) {
    return arguments.length ? (this._curve = _, this) : this._curve;
  }

  /**
      @memberof Line
      @desc Updates the style and positioning of the elements matching *selector* and returns the current class instance. This is helpful when not wanting to loop through all shapes just to change the style of a few.
      @param {String|HTMLElement} *selector*
  */
  update(_) {

    const groups = this._select.selectAll(_),
          t = transition().duration(this._duration);

    groups
        .call(this._applyLabels.bind(this))
      .transition(t)
        .attr("opacity", this._opacity);

    groups.select("path").transition(t)
      .attr("d", d => this._path(d.values));

    return this;

  }

  /**
      @memberof Line
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.x;
}
  */
  x(_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : constant(_), this) : this._x;
  }

  /**
      @memberof Line
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.y;
}
  */
  y(_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(_), this) : this._y;
  }

}
