import {select} from "d3-selection";

import {accessor, assign, BaseClass, configPrep, constant, elem} from "d3plus-common";
import {nest} from "d3-collection";

import Circle from "./Circle";
import Line from "./Line";
import Rect from "./Rect";

/**
    @class Whisker
    @extends BaseClass
    @desc Creates SVG whisker based on an array of data.
*/
export default class Whisker extends BaseClass {

  /**
      @memberof Whisker
      @desc Invoked when creating a new class instance, and overrides any default parameters inherited from BaseClass.
      @private
  */
  constructor() {

    super();

    this._endpoint = accessor("endpoint", "Circle");
    this._endpointConfig = {
      Circle: {
        fill: accessor("fill", "black"),
        r: accessor("r", 7)
      },
      Rect: {
        fill: accessor("fill", "black"),
        height: accessor("height", 10),
        width: accessor("width", 20)
      },
      stroke: constant("black"),
      strokeWidth: constant(1)
    };
    this._length = accessor("length", 25);
    this._lineConfig = {
      stroke: constant("black"),
      strokeWidth: constant(1)
    };
    this._name = "Whisker";
    this._orient = accessor("orient", "top");
    this._shapeClasses = {Rect, Circle};
    this._shapes = [];
    this._x = accessor("x", 0);
    this._y = accessor("y", 0);
    
  }

  /**
      @memberof Whisker
      @desc Filters/manipulates the data array before binding each point to an SVG group.
      @param {Array} [*data* = the data array to be filtered]
      @private
  */
  _whiskerData(data) {
    
    const getEndpointX = (d, i) => {
      let x = this._x(d, i);
      if (this._orient(d, i) === "left") {
        x = this._x(d, i) - this._length(d, i);
      }
      else if (this._orient(d, i) === "right") {
        x = this._x(d, i) + this._length(d, i);
      }
      return x;
    };
    const getEndpointY = (d, i) => {
      let y = this._y(d, i);
      if (this._orient(d, i) === "top") {
        y = this._y(d, i) - this._length(d, i);
      }
      else if (this._orient(d, i) === "bottom") {
        y = this._y(d, i) + this._length(d, i);
      }
      return y;
    };

    this._lineData = [];
    data.forEach((d, i) => {
      this._lineData.push({id: i, x: this._x(d, i), y: this._y(d, i)});
      this._lineData.push({id: i, x: getEndpointX(d, i), y: getEndpointY(d, i)});
    });

    // Copy original data to add/update x and y coordinates to endpoint coordinates.
    const dataCopy = data.map(a => Object.assign({}, a));
    dataCopy.forEach((d, i) => {
      d.x = getEndpointX(d, i);
      d.y = getEndpointY(d, i);
    });
    this._endpointShapeData = nest().key(this._endpoint).entries(dataCopy);

  }

  /**
      @memberof Whisker
      @desc Draws the whisker.
      @param {Function} [*callback*]
      @chainable
  */
  render(callback) {

    if (this._select === void 0) {
      this.select(select("body").append("svg")
        .style("width", `${window.innerWidth}px`)
        .style("height", `${window.innerHeight}px`)
        .style("display", "block").node());
    }
    
    this._whiskerData(this._data);

    this._shapes.push(new Line()
      .data(this._lineData)
      .select(elem("g.d3plus-Whisker", {parent: this._select}).node())
      .config(configPrep.bind(this)(this._lineConfig, "shape"))
      .render(callback));

    this._endpointShapeData.forEach(shapeData => {
      const shapeName = shapeData.key;
      this._shapes.push(new this._shapeClasses[shapeName]()
        .data(shapeData.values)
        .select(elem(`g.d3plus-Whisker-${shapeName}`, {parent: this._select}).node())
        .config(configPrep.bind(this)(this._endpointConfig, "shape", shapeName))
        .render());
    });

    return this;

  }

  /**
      @memberof Whisker
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array.
      @param {Array} [*data* = []]
      @chainable
  */
  data(_) {
    return arguments.length ? (this._data = _, this) : this._data;
  }

  /**
      @memberof Whisker
      @desc If *value* is specified, sets the endpoint accessor to the specified function or string and returns the current class instance.
      @param {Function|String}
      @chainable
  */
  endpoint(_) {
    return arguments.length ? (this._endpoint = typeof _ === "function" ? _ : constant(_), this) : this._endpoint;
  }

  /**
      @memberof Whisker
      @desc If *value* is specified, sets the config method for each endpoint and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  endpointConfig(_) {
    return arguments.length ? (this._endpointConfig = assign(this._endpointConfig, _), this) : this._endpointConfig;
  }

  /**
      @memberof Whisker
      @desc If *value* is specified, sets the length accessor for whisker and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
  */
  length(_) {
    return arguments.length ? (this._length = typeof _ === "function" ? _ : constant(_), this) : this._length;
  }

  /**
      @memberof Whisker
      @desc If *value* is specified, sets the config method for line shape and returns the current class instance.
      @param {Object} [*value*]
      @chainable
  */
  lineConfig(_) {
    return arguments.length ? (this._lineConfig = assign(this._lineConfig, _), this) : this._lineConfig;
  }
  
  /**
      @memberof Whisker
      @desc If *value* is specified, sets the orientation to the specified value. If *value* is not specified, returns the current orientation.
      @param {Function|String} [*value* = "top"] Accepts "top", "right", "bottom" or "left"
      @chainable
  */
  orient(_) {
    return arguments.length ? (this._orient = typeof _ === "function" ? _ : constant(_), this) : this._orient;
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

  /**
    @memberof Whisker
    @desc If *value* is specified, sets the x axis to the specified function or number and returns the current class instance.
    @param {Function|Number} [*value*]
    @chainable
    @example
function(d) {
  return d.x;
}
  */
  x(_) {
    return arguments.length ? (this._x = typeof _ === "function" ? _ : constant(_), this) : this._x;
  }

  /**
      @memberof Whisker
      @desc If *value* is specified, sets the y axis to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
  return d.y;
}
  */
  y(_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(_), this) : this._y;
  }

}
