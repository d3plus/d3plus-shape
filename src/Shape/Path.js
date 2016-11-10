import {accessor, constant} from "d3plus-common";

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
    this._name = "Path";
  }

  /**
      Draws the rectangles.
      @param {Function} [*callback* = undefined]
      @private
  */
  render(callback) {

    super.render(callback);

    this._enter.append("path")
        .attr("opacity", 0)
        .attr("d", this._d)
      .call(this._applyStyle.bind(this))
      .transition(this._transition)
        .attr("opacity", 1);

    this._update.select("path").transition(this._transition)
      .call(this._applyStyle.bind(this))
        .attr("opacity", 1)
        .attr("d", this._d);

    this._exit.select("path").transition(this._transition)
      .attr("opacity", 0);

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
    return arguments.length
         ? (this._d = typeof _ === "function" ? _ : constant(_), this)
         : this._d;
  }

}
