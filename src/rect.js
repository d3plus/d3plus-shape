import {select as d3Select} from "d3-selection";
import {transition as d3Transition} from "d3-transition";
const d3 = {
  select: d3Select,
  transition: d3Transition
};

import {box} from "d3plus-text";
import {contrast} from "d3plus-color";

import {accessor, constant} from "d3plus-common";
import {default as image} from "./image";

/**
    The default inner bounds function.
    @private
*/
function rectInnerBounds(s) {
  return {width: s.width, height: s.height, x: -s.width / 2, y: -s.height / 2};
}

/**
    @function rect
    @desc Creates SVG rectangles based on an array of data. If *data* is specified, immediately draws squares based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#rect.data) method.
    @param {Array} [data = []]
    @example <caption>a sample row of data</caption>
var data = {"id": 0, "x": 100, "y": 50, "width": 200, "height": 100};
@example <caption>passed to the generator</caption>
rect([data]);
@example <caption>creates the following</caption>
<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
</g>
@example <caption>this is shorthand for the following</caption>
rect().data([data])();
@example <caption>which also allows a post-draw callback function</caption>
rect().data([data])(function() { alert("draw complete!"); })
*/
export default function(data = []) {

  /**
      The default font-color accessor function.
      @private
  */
  function rectFontColor(d, i) {
    return contrast(fill(d, i));
  }

  const on = {};

  let backgroundImage = constant(false),
      duration = 600,
      fill = constant("black"),
      fontColor = rectFontColor,
      fontFamily,
      fontResize = constant(false),
      fontSize,
      height = accessor("height"),
      id = accessor("id"),
      innerBounds = rectInnerBounds,
      label = constant(false),
      labelPadding = constant(5),
      lineHeight,
      opacity = constant(1),
      select,
      stroke = constant("black"),
      strokeWidth = constant(0),
      textAnchor = constant("start"),
      verticalAlign = constant("top"),
      width = accessor("width"),
      x = accessor("x"),
      y = accessor("y");

  /**
      The inner return object and draw function that gets assigned the public methods.
      @private
  */
  function rect(callback) {

    if (select === void 0) rect.select(d3.select("body").append("svg").style("width", `${window.innerWidth}px`).style("height", `${window.innerHeight}px`).style("display", "block").node());
    if (lineHeight === void 0) lineHeight = (d, i) => fontSize(d, i) * 1.1;

    /**
        Sets styles for both entering and updating rectangles.
        @private
    */
    function rectStyle(r, show) {
      if (show === void 0) show = true;

      r
        .attr("width", show ? (d, i) => width(d, i) : 0)
        .attr("height", show ? (d, i) => height(d, i) : 0)
        .attr("x", show ? (d, i) => -width(d, i) / 2 : 0)
        .attr("y", show ? (d, i) => -height(d, i) / 2 : 0)
        .attr("fill", (d, i) => fill(d, i))
        .attr("stroke", (d, i) => stroke(d, i))
        .attr("stroke-width", (d, i) => strokeWidth(d, i));
    }

    /**
        Updates inner contents of all rectangles.
        @private
    */
    function contents(g, show) {
      if (show === void 0) show = true;

      g.each(function(d, i) {

        const h = height(d, i),
              w = width(d, i);

        /* Draws background image */
        const imageUrl = show ? backgroundImage(d, i) : false;
        image()
          .data(imageUrl ? [{url: imageUrl}] : [])
          .duration(duration)
          .height(show ? h : 0)
          .select(this)
          .width(show ? w : 0)
          .x(show ? -w / 2 : 0)
          .y(show ? -h / 2 : 0)
          ();

        /* Draws label based on inner bounds */
        const labelData = [],
              labelText = show ? label(d, i) : false;

        if (labelText) {
          const bounds = innerBounds({width: w, height: h}, i),
                padding = labelPadding(d, i);

          bounds.height -= padding * 2;
          bounds.width -= padding * 2;
          bounds.x += padding;
          bounds.y += padding;
          bounds.id = id(d, i);
          labelData.push(bounds);
        }

        box()
          .data(labelData)
          .delay(duration / 2)
          .duration(duration)
          .fontColor(fontColor(d, i))
          .fontFamily(fontFamily(d, i))
          .fontResize(fontResize(d, i))
          .fontSize(fontSize(d, i))
          .lineHeight(lineHeight(d, i))
          .textAnchor(textAnchor(d, i))
          .verticalAlign(verticalAlign(d, i))
          .select(this)
          .text(label(d, i))
          ();

      });

    }

    const groups = select.selectAll(".d3plus-shape-rect").data(data, id);

    groups.transition().duration(duration)
      .attr("transform", (d, i) => `translate(${x(d, i)},${y(d, i)})`);

    groups.exit().transition().delay(duration).remove();

    groups.exit().select("rect").transition().duration(duration)
      .attr("width", 0)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0);

    groups.exit().call(contents, false);

    const enter = groups.enter().append("g")
        .attr("class", "d3plus-shape-rect")
        .attr("id", (d, i) => `d3plus-shape-rect-${id(d, i)}`)
        .attr("transform", (d, i) => `translate(${x(d, i)},${y(d, i)})`);

    enter.append("rect")
      .call(rectStyle, false);

    const update = enter.merge(groups);

    update.select("rect").transition().duration(duration)
      .call(rectStyle);

    update.call(contents).transition().duration(duration)
      .attr("opacity", opacity);

    const events = Object.keys(on);
    for (let e = 0; e < events.length; e++) update.on(events[e], on[events[e]]);

    if (callback) setTimeout(callback, duration + 100);

    return rect;

  }

  /**
      @memberof rect
      @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background-image accessor.
      @param {Function|String} [*value* = false]
  */
  rect.backgroundImage = function(_) {
    return arguments.length ? (backgroundImage = typeof _ === "function" ? _ : constant(_), rect) : backgroundImage;
  };

  /**
      @memberof rect
      @desc If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A rectangle will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  rect.data = function(_) {
    return arguments.length ? (data = _, rect) : data;
  };

  /**
      @memberof rect
      @desc If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
  */
  rect.duration = function(_) {
    return arguments.length ? (duration = _, rect) : duration;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor.
      @param {Function|String} [*value* = "black"]
  */
  rect.fill = function(_) {
    return arguments.length ? (fill = typeof _ === "function" ? _ : constant(_), rect) : fill;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.
      @param {Function|String} [*value*]
  */
  rect.fontColor = function(_) {
    return arguments.length ? (fontColor = typeof _ === "function" ? _ : constant(_), rect) : fontColor;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor.
      @param {Function|String} [*value*]
  */
  rect.fontFamily = function(_) {
    return arguments.length ? (fontFamily = typeof _ === "function" ? _ : constant(_), rect) : fontFamily;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#rect.label) will be resized the best fit the rectangle.
      @param {Function|Boolean} [*value*]
  */
  rect.fontResize = function(_) {
    return arguments.length ? (fontResize = typeof _ === "function" ? _ : constant(_), rect) : fontResize;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor.
      @param {Function|String} [*value*]
  */
  rect.fontSize = function(_) {
    return arguments.length ? (fontSize = typeof _ === "function" ? _ : constant(_), rect) : fontSize;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.height;
}
  */
  rect.height = function(_) {
    return arguments.length ? (height = typeof _ === "function" ? _ : constant(_), rect) : height;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
      @example
function(d) {
  return d.id;
}
  */
  rect.id = function(_) {
    return arguments.length ? (id = _, rect) : id;
  };

  /**
      @memberof rect
      @desc If *bounds* is specified, sets the inner bounds to the specified function and returns this generator. If *bounds* is not specified, returns the current inner bounds accessor.
      @example
function(shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
      @param {Function} [*bounds*] Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`.
  */
  rect.innerBounds = function(_) {
    return arguments.length ? (innerBounds = _, rect) : innerBounds;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.
      @param {Function|String} [*value*]
  */
  rect.label = function(_) {
    return arguments.length ? (label = typeof _ === "function" ? _ : constant(_), rect) : label;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the label padding to the specified number and returns this generator. If *value* is not specified, returns the current label padding.
      @param {Number} [*value* = 10]
  */
  rect.labelPadding = function(_) {
    return arguments.length ? (labelPadding = typeof _ === "function" ? _ : constant(_), rect) : labelPadding;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the line-height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current line-height accessor.
      @param {Function|String} [*value*]
  */
  rect.lineHeight = function(_) {
    return arguments.length ? (lineHeight = typeof _ === "function" ? _ : constant(_), rect) : lineHeight;
  };

  /**
      @memberof rect
      @desc Adds or removes a *listener* to each rectangle for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
      @param {String} [*typenames*]
      @param {Function} [*listener*]
  */
  rect.on = function(typenames, listener) {
    return arguments.length === 2 ? (on[typenames] = listener, rect) : arguments.length ? on[typenames] : on;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current opacity accessor.
      @param {Number} [*value* = 1]
  */
  rect.opacity = function(_) {
    return arguments.length ? (opacity = typeof _ === "function" ? _ : constant(_), rect) : opacity;
  };

  /**
      @memberof rect
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  rect.select = function(_) {
    if (arguments.length) {
      select = d3.select(_);
      if (fontFamily === void 0) fontFamily = constant(select.style("font-family"));
      if (fontSize === void 0) fontSize = constant(parseFloat(select.style("font-size"), 10));
      return rect;
    }
    return select;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke accessor.
      @param {Function|String} [*value* = "black"]
  */
  rect.stroke = function(_) {
    return arguments.length ? (stroke = typeof _ === "function" ? _ : constant(_), rect) : stroke;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke-width accessor.
      @param {Function|Number} [*value* = 0]
  */
  rect.strokeWidth = function(_) {
    return arguments.length ? (strokeWidth = typeof _ === "function" ? _ : constant(_), rect) : strokeWidth;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`.
      @param {Function|String} [*value* = "start"]
  */
  rect.textAnchor = function(_) {
    return arguments.length ? (textAnchor = typeof _ === "function" ? _ : constant(_), rect) : textAnchor;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`.
      @param {Function|String} [*value* = "start"]
  */
  rect.verticalAlign = function(_) {
    return arguments.length ? (verticalAlign = typeof _ === "function" ? _ : constant(_), rect) : verticalAlign;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.width;
}
  */
  rect.width = function(_) {
    return arguments.length ? (width = typeof _ === "function" ? _ : constant(_), rect) : width;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.x;
}
  */
  rect.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : constant(_), rect) : x;
  };

  /**
      @memberof rect
      @desc If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.
      @param {Function|Number} [*value*]
      @example
function(d) {
  return d.y;
}
  */
  rect.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : constant(_), rect) : y;
  };

  return data.length ? rect() : rect;

}
