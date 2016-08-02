import {accessor, constant} from "d3plus-common";
import {default as Shape} from "./Shape";
import {nest} from "d3-collection";
import {line as lineGen} from "d3-shape";

import {transition} from "d3-transition";

/**
    @class Line
    @desc Creates SVG lines based on an array of data.
*/
export default class Line extends Shape {

  constructor() {
    super();
    this._fill = constant("none");
    this._path = lineGen().defined(d => d);
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

    const lines = nest().key(this._id).entries(this._data);

    this._path
      .x(this._x)
      .y(this._y);

    const groups = this._select.selectAll(".d3plus-shape-line").data(lines, d => d.key);

    groups.select("path").transition(this._transition)
      .attr("d", d => this._path(d.values))
      .call(this._applyStyle.bind(this));

    groups.exit().transition().delay(this._duration).remove();

    groups.exit().call(this._applyLabels.bind(this), false);

    const enter = groups.enter().append("g")
        .attr("class", "d3plus-shape-line")
        .attr("id", d => `d3plus-shape-line-${d.key}`);

    enter.append("path")
      .attr("d", d => this._path(d.values))
      .call(this._applyStyle.bind(this));

    const update = enter.merge(groups);

    update.call(this._applyLabels.bind(this))
      .transition(this._transition)
        .attr("opacity", this._opacity);

    const events = Object.keys(this._on);
    for (let e = 0; e < events.length; e++) update.on(events[e], this._on[events[e]]);

    return this;

  }

  /**
      @memberof Line
      @desc Updates the style and positioning of the elements matching *selector* and returns this generator. This is helpful when not wanting to loop through all shapes just to change the style of a few.
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
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
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
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
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
