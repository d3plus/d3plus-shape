var Abstract = require("./Abstract.js"),
    Color = require("../../../d3plus-color/src/color.js");

function position(rect) {

  rect
    .attr("width", (d) => d.fetch("width"))
    .attr("height", (d) => d.fetch("height"))
    .attr("x", (d) => d.fetch("x") - d.fetch("width") / 2)
    .attr("y", (d) => d.fetch("y") - d.fetch("height") / 2);

}

class Rectangle extends Abstract {

  get name () {
    return "Rectangle";
  }

  area (d) {
    return {
      width: d.fetch("width"),
      height: d.fetch("height"),
      x: d.fetch("x") - d.fetch("width") / 2,
      y: d.fetch("y") - d.fetch("height") / 2
    };
  }

  enter (groups) {

    groups.append("rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", (d) => d.fetch("x"))
      .attr("y", (d) => d.fetch("y"))
      .attr("fill", (d) => new Color(d.fetch("fill")).hex())
      .transition().duration(this.timing)
        .call(position);

  }

  exit (groups) {

    groups.select("rect").transition().duration(this.timing)
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", (d) => d.fetch("x"))
      .attr("y", (d) => d.fetch("y"));

  }

  update (groups) {

    groups.select("rect").transition().duration(this.timing)
      .call(position)
      .attr("fill", (d) => new Color(d.fetch("fill")).hex());

  }

}

module.exports = Rectangle;
