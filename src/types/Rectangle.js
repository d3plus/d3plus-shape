var Abstract = require("./Abstract.js"),
    Color = require("../../../d3plus-color/src/Color.js");

/** @class Rectangle */
class Rectangle extends Abstract {

  /** @returns {"Rectangle"} */
  get name () {
    return "Rectangle";
  }

  /* The custom enter/update/exit animation for this shape. */
  animation () {

    /* Enter */
    this.enter.append("rect")
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", function(d) {
        return d.fetch("x");
      })
      .attr("y", function(d) {
        return d.fetch("y");
      })
      .attr("fill", function(d) {
        return new Color(d.fetch("fill")).hex();
      });

    /* Update */
    this.update.select("rect")
      .transition().duration(this.timing)
        .attr("width", function(d) {
          return d.fetch("width");
        })
        .attr("height", function(d) {
          return d.fetch("height");
        })
        .attr("x", function(d) {
          return d.fetch("x") - d.fetch("width") / 2;
        })
        .attr("y", function(d) {
          return d.fetch("y") - d.fetch("height") / 2;
        })
        .attr("fill", function(d) {
          return new Color(d.fetch("fill")).hex();
        });

    /* Exit */
    this.exit.select("rect")
      .transition().duration(this.timing)
        .attr("width", 0)
        .attr("height", 0)
        .attr("x", function(d) {
          return d.fetch("x");
        })
        .attr("y", function(d) {
          return d.fetch("y");
        });

  }

  /**
    The inner bounding box for the rectangle.
    @returns {Object}
    @example
{
  width: 300,
  height: 200,
  x: 0,
  y: 0
}
  */
  innerBounds (d) {
    return {
      width: d.fetch("width"),
      height: d.fetch("height"),
      x: d.fetch("x") - d.fetch("width") / 2,
      y: d.fetch("y") - d.fetch("height") / 2
    };
  }

}

module.exports = Rectangle;
