var d3 = require("d3");

var DataPoint = require("d3plus-datapoint"),
    Shell = require("d3plus-shell");

/**
  @class Abstract class that all shapes extend. Contains method available to all shapes.
*/
class Abstract extends Shell {

  /**
    @param {selector|node} container Either a selector string or an SVG node that will act as a container for any contents being drawn.
  */
  constructor (container) {

    super();

    this.container = d3.select(container);
    this.dataArray = [];
    this.groups = false;
    this.timing = 600;

  }

  /**
    A unique name for this class. Any shape that extends this class should overwrite this function with it's own unique string.
    @returns {String}
  */
  get name () {
    return "Default";
  }

  /**
    @param {Array} [arr = []] The data array used to display the shapes.
    @returns {Abstract}
  */
  data (arr) {

    if (!arr) {
      arr = [];
    }
    else if (arr.constructor !== Array) {
      arr = [arr];
    }
    var settings = this.settings;
    this.dataArray = arr.map(function(d) {
      return new DataPoint(d, settings);
    });
    return this;

  }

  /**
    Draws/redraws the current group of shapes.
    @param {Number} [timing = 600] A number in milliseconds used for the timing of transitions.
    @returns {Abstract}
  */
  draw (timing) {

    if (timing !== undefined) {
      this.timing = timing;
    }

    var type = this.name;
    this.groups = this.container.selectAll("g.d3plus-shape-" + type)
      .data(this.dataArray, function(d, i) {
        d.clear();
        d.id = d.fetch("id") || i;
        return d.id;
      });
    this.update = this.groups;

    this.enter = this.groups.enter().append("g")
      .attr("class", "d3plus-shape-" + type)
      .attr("id", function(d) {
        return "d3plus-shape-" + type + "-" + d.id;
      });

    this.exit = this.groups.exit();

    this.animation();

    this.exit.transition().delay(this.timing).remove();

    var self = this;
    setTimeout(function(){
      self.reset();
    }, this.timing);

    return this;

  }

  /*
    Calculates and returns the maximum inner boundaries for the shape. This is commonly used for correct label placement inside the shape.
    @returns {Object}
  */
  innerBounds () {
    return false;
  }

  /** Removes all shapes created with this instance. */
  remove () {
    if (this.groups) {
      this.groups.remove();
    }
  }

}

module.exports = Abstract;
