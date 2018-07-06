
import {select} from "d3-selection";

import {assign, BaseClass, constant, elem} from "d3plus-common";

import Path from "./Path";

/**
    @class Whisker
    @extends BaseClass
    @desc Creates SVG lines based on an array of data.
*/
export default class Whisker extends BaseClass {

  /**
      @memberof Whisker
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
      @private
  */
  constructor() {

    super();

    this._name = "Whisker";
    this._pathConfig = {
      stroke: constant("black"),
      strokeWidth: constant(1)
    };

  }

  /**
      @memberof Whisker
      @desc Draws the whisker.
      @chainable
  */
  render() {

    if (this._select === void 0) {
      this.select(select("body").append("svg")
        .style("width", `${window.innerWidth}px`)
        .style("height", `${window.innerHeight}px`)
        .style("display", "block").node());
    }

    new Path()
      .data(this._data)
      .select(elem("g.d3plus-Whisker", {
        parent: this._select
      }).node())
      .strokeWidth(1)
      .render();

    console.log("this._data: ", this._data);
    return this;
  }

  /**
      @memberof Whisker
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.
      @param {Array} [*data* = []]
      @chainable
  */
  data(_) {
    return arguments.length
      ? (this._data = _, this)
      : this._data;
  }

  /**
      @memberof Whisker
      @desc If *value* is specified, sets the config method for path shape and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  whiskerConfig(_) {
    return arguments.length ? (this._pathConfig = assign(this._pathConfig, _), this) : this._pathConfig;
  }

  /**
      @memberof Whisker
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
      @chainable
  */
  select(_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  }

}
