var d3 = require("d3");

var DataPoint = require("../../../d3plus-datapoint/src/datapoint.js"),
    Shell = require("../../../d3plus-shell/src/shell.js");

module.exports = class extends Shell {

  constructor (container) {

    super();

    this.container = d3.select(container);
    this.dataArray = [];
    this.groups = false;
    this.timing = 600;

  }

  get name () {
    return "Default";
  }

  area () {
    return false;
  }

  data (arr) {

    if (!arr) {
      arr = [];
    }
    else if (arr.constructor !== Array) {
      arr = [arr];
    }
    this.dataArray = arr.map(d => new DataPoint(d, this.attrLookup));
    return this;

  }

  draw (timing) {

    if (timing !== undefined) {
      this.timing = timing;
    }

    this.groups = this.container.selectAll("g.d3plus-shape-" + this.name)
      .data(this.dataArray, function(d, i) {
        d.clear();
        d.id = d.fetch("id") || i;
        return d.id;
      });

    var enter = this.groups.enter().append("g")
      .attr("class", "d3plus-shape-" + this.name)
      .attr("id", (d) => "d3plus-shape-" + this.name + "-" + d.id);

    var exit = this.groups.exit();

    this.exit(exit);
    exit.transition().delay(this.timing).remove();
    this.update(this.groups);
    this.enter(enter);

    var self = this;
    setTimeout(function(){
      self.reset();
    }, this.timing);

    return this;

  }

  remove () {
    if (this.groups) {
      this.groups.remove();
    }
  }

};
