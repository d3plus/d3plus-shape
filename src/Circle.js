import {accessor, constant} from "d3plus-common";
import {default as Shape} from "./Shape";

import {transition} from "d3-transition";

/**
    @class Circle
    @extends Shape
    @desc Creates SVG circles based on an array of data.
*/
export default class Circle extends Shape {

  constructor() {
    super();
    this._r = accessor("r");
    this._x = accessor("x");
    this._y = accessor("y");
  }

  /**
      Provides the default positioning to the <rect> elements.
      @private
  */
  _applyPosition(elem) {
    elem
      .attr("r", (d, i) => this._r(d, i))
      .attr("x", (d, i) => -this._r(d, i) / 2)
      .attr("y", (d, i) => -this._r(d, i) / 2);
  }

  /**
      Draws the circles.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    const groups = this._select.selectAll(this._update || ".d3plus-shape-circle").data(this._data, this._id);

    groups.transition(this._transition)
      .attr("transform", (d, i) => `translate(${this._x(d, i)},${this._y(d, i)})`);

    groups.select("circle").transition(this._transition).call(this._applyStyle.bind(this));

    groups.exit().transition().delay(this._duration).remove();

    groups.exit().select("circle").transition(this._transition)
      .attr("r", 0)
      .attr("x", 0)
      .attr("y", 0);

    groups.exit()
      .call(this._applyImage.bind(this), false)
      .call(this._applyLabels.bind(this), false);

    const enter = groups.enter().append("g")
        .attr("class", "d3plus-shape-circle")
        .attr("id", (d, i) => `d3plus-shape-circle-${this._id(d, i)}`)
        .attr("transform", (d, i) => `translate(${this._x(d, i)},${this._y(d, i)})`);

    enter.append("circle")
      .attr("r", 0)
      .attr("x", 0)
      .attr("y", 0)
      .call(this._applyStyle.bind(this));

    const update = enter.merge(groups);

    update.select("circle").transition(this._transition)
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
      @memberof Circle
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  _aes(d, i) {
    return {r: this._r(d, i)};
  }

  /**
      @memberof Circle
      @desc If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current radius accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.r;
}
  */
  r(_) {
    return arguments.length ? (this._r = typeof _ === "function" ? _ : constant(_), this) : this._r;
  }

  /**
      @memberof Circle
      @desc Updates the style and positioning of the elements matching *selector* and returns the current class instance. This is helpful when not wanting to loop through all shapes just to change the style of a few.
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

    groups.select("circle").transition(t)
      .call(this._applyStyle.bind(this))
      .call(this._applyPosition.bind(this));

    return this;

  }

  /**
      @memberof Circle
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
      @memberof Circle
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
