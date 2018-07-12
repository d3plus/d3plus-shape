import {select} from "d3-selection";

import {accessor, assign, BaseClass, configPrep, constant, elem} from "d3plus-common";

import Circle from "./Circle";
import Line from "./Line";
import Rect from "./Rect";

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

    this._endpoint = constant("Circle");
    this._endpointConfig = {
      Circle: {
        fill: d => d.fill,
        r: d => d.r
      },
      Rect: {
        fill: d => d.fill,
        height: d => d.height,
        stroke: constant("black"),
        strokeWidth: constant(1),
        width: d => d.width
      }
    };
    this._length = accessor("length", 25);
    this._lineConfig = {
      stroke: constant("black"),
      strokeWidth: constant(1)
    };
    this._name = "Whisker";
    this._orient = accessor("orient", "top");
    this._shapes = [];
    this._x = accessor("x", 0);
    this._y = accessor("y", 0);

  }

  /**
      @memberof Box
      @desc Filters/manipulates the data array before binding each point to an SVG group.
      @param {Array} [*data* = the data array to be filtered]
      @private
  */
  _whiskerData(data) {
    this._lineData = [];
    this._circleData = [];
    this._rectData = [];
    data.forEach((d, i) => {
      const lineCoordinates1 = {id: i, x: d.x, y: d.y};
      this._lineData.push(lineCoordinates1);

      if (d.orient === "top") {
        d.x2 = d.x;
        d.y2 = d.y - d.length;
      }
      else if (d.orient === "bottom") {
        d.x2 = d.x;
        d.y2 = d.y + d.length;
      }
      else if (d.orient === "left") {
        d.x2 = d.x - d.length;
        d.y2 = d.y;
      }
      else if (d.orient === "right") {
        d.x2 = d.x + d.length;
        d.y2 = d.y;
      }
      const lineCoordinates2 = {id: i, x: d.x2, y: d.y2};
      this._lineData.push(lineCoordinates2);

      if (d.endpoint === undefined) d.endpoint = this._endpoint();
      if (d.orient === undefined) d.orient = this._orient(d);

      if (d.endpoint === "Circle") {
        console.log("d from circle data: ", d);
        const circleData = {
          fill: d.fill !== undefined ? d.fill : "black",
          r: d.r !== undefined ? d.r : 7,
          x: d.x2,
          y: d.y2
        };
        this._circleData.push(circleData);
      }
      else {
        console.log("d from rect data: ", d);
        const rectData = {
          fill: d.fill !== undefined ? d.fill : "black",
          height: d.height !== undefined ? d.height : 10,
          width: d.width !== undefined ? d.width : 20,
          x: d.x2,
          y: d.y2
        };
        this._rectData.push(rectData);
      }
    });

    return this;

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

    const filteredData = this._whiskerData(this._data);
    console.log("filteredData: ", filteredData);

    this._shapes.push(new Line()
      .data(this._lineData)
      .select(elem("g.d3plus-Whisker", {parent: this._select}).node())
      // .config({id: (d, i) => this._ids(d, i).join("-")})
      .config(configPrep.bind(this)(this._lineConfig, "shape"))
      .render());

    console.log("this._data: ", this._data);
    
    this._shapes.push(new Circle()
      .data(this._circleData)
      .select(elem("g.d3plus-Whisker-Circle", {parent: this._select}).node())
      // .config({id: (d, i) => this._ids(d, i).join("-")})
      .config(configPrep.bind(this)(this._endpointConfig, "shape", "Circle"))
      .render());

    this._shapes.push(new Rect()
      .data(this._rectData)
      .select(elem("g.d3plus-Whisker-Rect", {parent: this._select}).node())
      .config(configPrep.bind(this)(this._endpointConfig, "shape", "Rect"))
      .render());
    
    console.log("this._data from whisker render: ", this._data);
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
      @desc TODO: refer shape's labelConfig(_) If *value* is specified, sets the endpoint accessor to the specified function or string and returns the current class instance.
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
    @memberof Box
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
      @memberof Box
      @desc If *value* is specified, sets the y axis to the specified function or number and returns the current class instance.
      @param {Function|Number} [*value*]
      @chainable
      @example
function(d) {
return d.x;
}
  */
  y(_) {
    return arguments.length ? (this._y = typeof _ === "function" ? _ : constant(_), this) : this._y;
  }

}
