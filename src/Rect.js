import {accessor, constant} from "d3plus-common";
import {strip} from "d3plus-text";

import {default as Shape} from "./Shape";

/**
    @class Rect
    @extends Shape
    @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
*/
export default class Rect extends Shape {

  /**
      @memberof Rect
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
      @private
  */
  constructor() {
    super();
    this._height = accessor("height");
    this._labelBounds = (d, i, s) => ({width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2});
    this._width = accessor("width");
  }

  /**
      Draws the rectangles.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    const groups = this._select.selectAll(".d3plus-Rect").data(this._data, this._id);

    groups.transition(this._transition)
      .attr("transform", (d, i) => `translate(${this._x(d, i)},${this._y(d, i)})`);

    groups.select("rect").transition(this._transition).call(this._applyStyle.bind(this));

    groups.exit().transition().delay(this._duration).remove();

    groups.exit().select("rect").transition(this._transition)
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0);

    groups.exit()
      .call(this._applyImage.bind(this), false)
      .call(this._applyLabels.bind(this), false);

    const enter = groups.enter().append("g")
        .attr("class", (d, i) => `d3plus-Shape d3plus-Rect d3plus-id-${strip(this._id(d, i))}`)
        .attr("transform", (d, i) => `translate(${this._x(d, i)},${this._y(d, i)})`);

    enter.append("rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0)
      .call(this._applyStyle.bind(this));

    const update = enter.merge(groups);

    update.select("rect").transition(this._transition)
      .call(this._applyPosition.bind(this));

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
      @memberof Rect
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  _aes(d, i) {
    return {width: this._width(d, i), height: this._height(d, i)};
  }

  /**
      @memberof Rect
      @desc Provides the default positioning to the <rect> elements.
      @param {D3Selection} *elem*
      @private
  */
  _applyPosition(elem) {
    elem
      .attr("width", (d, i) => this._width(d, i))
      .attr("height", (d, i) => this._height(d, i))
      .attr("x", (d, i) => -this._width(d, i) / 2)
      .attr("y", (d, i) => -this._height(d, i) / 2);
  }

  /**
      @memberof Rect
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.height;
}
  */
  height(_) {
    return arguments.length ? (this._height = typeof _ === "function" ? _ : constant(_), this) : this._height;
  }

  /**
      @memberof Rect
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.width;
}
  */
  width(_) {
    return arguments.length ? (this._width = typeof _ === "function" ? _ : constant(_), this) : this._width;
  }

}
