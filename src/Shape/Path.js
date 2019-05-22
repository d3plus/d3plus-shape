import {accessor, constant} from "d3plus-common";

import Shape from "./Shape";
import largestRect from "../geom/largestRect";
import path2polygon from "../geom/path2polygon";

/**
    @class Path
    @extends Shape
    @desc Creates SVG Paths based on an array of data.
*/
export default class Path extends Shape {

  /**
      @memberof Path
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from Shape.
      @private
  */
  constructor() {
    super("path");
    this._d = accessor("path");
    this._labelBounds = (d, i, aes) => {
      const r = largestRect(aes.points, {angle: this._labelConfig.rotate ? this._labelConfig.rotate(d, i) : 0});
      return r ? {angle: r.angle, width: r.width, height: r.height, x: r.cx - r.width / 2, y: r.cy - r.height / 2} : false;
    };
    this._name = "Path";
    this._labelConfig = Object.assign(this._labelConfig, {
      textAnchor: "middle",
      verticalAlign: "middle"
    });
  }

  /**
      @memberof Path
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  _aes(d, i) {
    return {points: path2polygon(this._d(d, i))};
  }

  /**
      @memberof Path
      @desc Draws the paths.
      @param {Function} [*callback*]
      @chainable
  */
  render(callback) {

    super.render(callback);

    this._enter
      .attr("opacity", 0)
      .attr("d", this._d)
      .call(this._applyStyle.bind(this))
      .transition(this._transition)
      .attr("opacity", 1);

    this._update.transition(this._transition)
      .call(this._applyStyle.bind(this))
      .attr("opacity", 1)
      .attr("d", this._d);

    this._exit.transition(this._transition)
      .attr("opacity", 0);

    return this;

  }

  /**
      @memberof Path
      @desc If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance.
      @param {Function|String} [*value*]
      @chainable
      @example
function(d) {
  return d.path;
}
  */
  d(_) {
    return arguments.length ? (this._d = typeof _ === "function" ? _ : constant(_), this) : this._d;
  }

}
