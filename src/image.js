import {select as d3Select} from "d3-selection";
import {transition as d3Transition} from "d3-transition";
const d3 = {
  "select": d3Select,
  "transition": d3Transition
};
import {default as constant} from "./constant";

/**
    The default height accessor function.
    @private
*/
function imageHeight(d) {
  return d.height;
}

/**
    The default URL accessor function.
    @private
*/
function imageUrl(d) {
  return d.url;
}

/**
    The default width accessor function.
    @private
*/
function imageWidth(d) {
  return d.width;
}

/**
    The default x accessor function.
    @private
*/
function imageX(d) {
  return d.x || 0;
}

/**
    The default y accessor function.
    @private
*/
function imageY(d) {
  return d.y || 0;
}

/**
    @function image
    @desc Creates SVG images based on an array of data. If *data* is specified, immediately draws the images based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#image.data) method.
    @param {Array} [data = []]
    @example <caption>a sample row of data</caption>
var data = {"url": "file.png", "width": "100", "height": "50"};
@example <caption>passed to the generator</caption>
image([data]);
@example <caption>creates the following</caption>
<image class="d3plus-shape-image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
@example <caption>this is shorthand for the following</caption>
image().data([data])();
@example <caption>which also allows a post-draw callback function</caption>
image().data([data])(function() { alert("draw complete!"); })
*/
export default function(data = []) {

  let duration = 600,
      height = imageHeight,
      id = imageUrl,
      select,
      url = imageUrl,
      width = imageWidth,
      x = imageX,
      y = imageY;

  /**
      The inner return object and draw function that gets assigned the public methods.
      @private
  */
  function image(callback) {

    if (select === void 0) image.select(d3.select("body").append("svg").style("width", `${window.innerWidth}px`).style("height", `${window.innerHeight}px`).style("display", "block").node());

    const images = select.selectAll(".d3plus-shape-image").data(data, id);

    const enter = images.enter().append("image")
      .attr("class", "d3plus-shape-image")
      .attr("opacity", 0);

    const update = enter.merge(images);

    update.attr("xlink:href", url)
      .transition().duration(duration)
        .attr("opacity", 1)
        .attr("width", (d, i) => width(d, i))
        .attr("height", (d, i) => height(d, i))
        .attr("x", (d, i) => x(d, i))
        .attr("y", (d, i) => y(d, i));

    images.exit().transition().duration(duration)
      .attr("opacity", 0).remove();

    if (callback) setTimeout(callback, duration + 100);

    return image;

  }

  /**
      @memberof image
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  image.data = function(_) {
    return arguments.length ? (data = _, image) : data;
  };

  /**
      @memberof image
      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
  */
  image.duration = function(_) {
    return arguments.length ? (duration = _, image) : duration;
  };

  /**
      @memberof image
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.height;
}
  */
  image.height = function(_) {
    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), image) : height;
  };

  /**
      @memberof image
      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.
      @param {Function} [*value*]
      @example
function(d) {
  return d.url;
}
  */
  image.id = function(_) {
    return arguments.length ? (id = _, image) : id;
  };

  /**
      @memberof image
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  image.select = function(_) {
    return arguments.length ? (select = d3.select(_), image) : select;
  };

  /**
      @memberof image
      @desc If *value* is specified, sets the URL accessor to the specified function and returns this generator. If *value* is not specified, returns the current URL accessor.
      @param {Function} [*value*]
      @example
function(d) {
  return d.url;
}
  */
  image.url = function(_) {
    return arguments.length ? (url = _, image) : url;
  };

  /**
      @memberof image
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.width;
}
  */
  image.width = function(_) {
    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), image) : width;
  };

  /**
      @memberof image
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.x || 0;
}
  */
  image.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), image) : x;
  };

  /**
      @memberof image
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.y || 0;
}
  */
  image.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), image) : y;
  };

  return data.length ? image() : image;

}
