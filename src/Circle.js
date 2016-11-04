import {accessor, constant} from "d3plus-common";
import {strip} from "d3plus-text";

import {default as Shape} from "./Shape";

/**
    @class Circle
    @extends Shape
    @desc Creates SVG circles based on an array of data.
*/
export default class Circle extends Shape {

  /**
      @memberof Circle
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
      @private
  */
  constructor() {
    super();
    this._r = accessor("r");
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

    const groups = this._select.selectAll(".d3plus-Circle").data(this._data, this._id);

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
        .attr("class", (d, i) => `d3plus-Shape d3plus-Circle d3plus-id-${strip(this._id(d, i))}`)
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

}
