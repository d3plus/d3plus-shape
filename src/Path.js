import {accessor, constant} from "d3plus-common";
import {strip} from "d3plus-text";

import {default as Shape} from "./Shape";

/**
    @class Path
    @extends Shape
    @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
*/
export default class Path extends Shape {

  /**
      @memberof Path
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
      @private
  */
  constructor() {
    super();
    this._d = accessor("path");
  }

  /**
      Draws the rectangles.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    const groups = this._select.selectAll(".d3plus-Path").data(this._data, this._id);

    groups.transition(this._transition)
      .attr("transform", (d, i) => `translate(${this._x(d, i)},${this._y(d, i)})scale(${this._scale(d, i)})`);

    groups.select("path").transition(this._transition).call(this._applyStyle.bind(this));

    groups.exit().transition().delay(this._duration).remove();

    groups.exit().select("path").transition(this._transition)
      .attr("opacity", 0);

    groups.exit()
      .call(this._applyImage.bind(this), false)
      .call(this._applyLabels.bind(this), false);

    const enter = groups.enter().append("g")
        .attr("class", (d, i) => `d3plus-Shape d3plus-Path d3plus-id-${strip(this._id(d, i))}`)
        .attr("transform", (d, i) => `translate(${this._x(d, i)},${this._y(d, i)})scale(${this._scale(d, i)})`);

    enter.append("path")
      .attr("opacity", 0)
      .call(this._applyStyle.bind(this));

    const update = enter.merge(groups);

    update.select("path").transition(this._transition)
      .attr("opacity", 1)
      .attr("d", this._d);

    update
        .call(this._applyImage.bind(this))
        .call(this._applyLabels.bind(this))
        .attr("pointer-events", "none")
      .transition(this._transition)
        .attr("opacity", this._opacity)
      .transition()
        .attr("pointer-events", "all");

    this._applyEvents(update);

    return this;

  }

  /**
      @memberof Path
      @desc If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current "d" attribute accessor.
      @param {Function|String} [*value*]
      @example
function(d) {
  return d.path;
}
  */
  d(_) {
    return arguments.length ? (this._d = typeof _ === "function" ? _ : constant(_), this) : this._d;
  }

}
