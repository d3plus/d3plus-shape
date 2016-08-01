import {accessor, constant} from "d3plus-common";
import {default as Shape} from "./Shape";

import {transition} from "d3-transition";

/**
    @class Rect
    @desc Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.
*/
export default class Rect extends Shape {

  constructor() {
    super();
    this._height = accessor("height");
    this._innerBounds = s => ({width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2});
    this._width = accessor("width");
    this._x = accessor("x");
    this._y = accessor("y");
  }

  /**
      Provides the default positioning to the <rect> elements.
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
      Draws the rectangles.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    const groups = this._select.selectAll(".d3plus-shape-rect").data(this._data, this._id);

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
        .attr("class", "d3plus-shape-rect")
        .attr("id", (d, i) => `d3plus-shape-rect-${this._id(d, i)}`)
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
      .transition(this._transition)
        .attr("opacity", this._opacity);

    const events = Object.keys(this._on);
    for (let e = 0; e < events.length; e++) update.on(events[e], this._on[events[e]]);

    return this;

  }

  /**
      @memberof Rect
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
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
      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this generator. If *bounds* is not specified, returns the current inner bounds accessor.
      @param {Function} [*bounds*] Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label.
      @example
function(shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
  */
  innerBounds(_) {
    return arguments.length ? (this._innerBounds = _, this) : this._innerBounds;
  }

  /**
      @memberof Rect
      @desc Updates the style and positioning of the elements matching *selector* and returns this generator. This is helpful when not wanting to loop through all shapes just to change the style of a few.
      @param {String|HTMLElement} *selector*
  */
  update(_) {

    const groups = this._select.selectAll(_),
          t = transition().duration(this._duration);

    groups
        .call(this._applyImage.bind(this))
        .call(this._applyLabels.bind(this))
      .transition(t)
        .attr("opacity", this._opacity)
        .attr("transform", (d, i) => `translate(${this._x(d, i)},${this._y(d, i)})scale(${this._scale(d, i)})`);

    groups.select("rect").transition(t)
      .call(this._applyStyle.bind(this))
      .call(this._applyPosition.bind(this));

    return this;

  }

  /**
      @memberof Rect
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.width;
}
  */
  width(_) {
    return arguments.length ? (this._width = typeof _ === "function" ? _ : constant(_), this) : this._width;
  }

  /**
      @memberof Rect
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
      @memberof Rect
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
