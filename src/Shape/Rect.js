import {accessor, constant} from "d3plus-common";

import Shape from "./Shape";

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
    super("rect");
    this._height = accessor("height");
    this._labelBounds = (d, i, s) =>
      ({width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2});
    this._name = "Rect";
    this._width = accessor("width");
  }

  /**
      @memberof Rect
      @desc Draws the rectangles.
      @param {Function} [*callback*]
      @chainable
  */
  render(callback) {

    super.render(callback);

    this._enter
      .attr("width", 0).attr("height", 0)
      .attr("x", 0).attr("y", 0)
      .call(this._applyStyle.bind(this))
      .transition(this._transition)
      .call(this._applyPosition.bind(this));

    this._update.transition(this._transition)
      .call(this._applyStyle.bind(this))
      .call(this._applyPosition.bind(this));

    this._exit.transition(this._transition)
      .attr("width", 0).attr("height", 0)
      .attr("x", 0).attr("y", 0);

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
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
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

}
