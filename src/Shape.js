import {select} from "d3-selection";
import {transition} from "d3-transition";

import {attrize, constant} from "d3plus-common";
import {contrast} from "d3plus-color";
import {TextBox} from "d3plus-text";
import {default as Image} from "./Image";

/**
    @class Shape
    @desc An abstracted class for generating shapes.
*/
export default class Shape {

  constructor() {
    this._backgroundImage = constant(false);
    this._data = [];
    this._duration = 600;
    this._fill = constant("black");
    this._fontColor = (d, i) => contrast(this._fill(d, i));
    this._fontFamily = constant("Verdana");
    this._fontResize = constant(false);
    this._fontSize = constant(12);
    this._id = (d, i) => d.id !== void 0 ? d.id : i;
    this._label = constant(false);
    this._labelPadding = constant(5);
    this._on = {};
    this._opacity = constant(1);
    this._scale = constant(1);
    this._stroke = constant("black");
    this._strokeWidth = constant(0);
    this._textAnchor = constant("start");
    this._verticalAlign = constant("top");
  }

  /**
      @memberof Shape
      @desc Given a specific data point and index, returns the aesthetic properties of the shape.
      @param {Object} *data point*
      @param {Number} *index*
      @private
  */
  _aes() {
    return {};
  }

  /**
      @memberof Shape
      @desc Adds event listeners to each shape group or hit area.
      @param {D3Selection} *update* The update cycle of the data binding.
      @private
  */
  _applyEvents(update) {

    const that = this;
    let hitArea = update.selectAll(".hitArea").data(this._hitArea ? [0] : []);
    hitArea.exit().remove();
    hitArea = hitArea.enter().append("rect")
        .attr("class", "hitArea")
        .attr("fill", "none")
      .merge(hitArea)
        .data(d => [d])
        .each(function(d) {
          const h = that._hitArea(d, that._data.indexOf(d));
          if (h) select(this).call(attrize, h);
          else select(this).remove();
        });
    const handler = this._hitArea ? hitArea : update;

    const events = Object.keys(this._on);
    for (let e = 0; e < events.length; e++) {
      handler.on(events[e], function(d, i) {
        const hit = this.className.baseVal === "hitArea";
        const t = hit ? this.parentNode : this;
        that._on[events[e]].bind(t)(d, hit ? that._data.indexOf(d) : i);
      });
    }

  }

  /**
      @memberof Shape
      @desc Adds background image to each shape group.
      @param {D3Selection} *g*
      @param {Boolean} [*show* = True] Whether or not to show or remove the image.
      @private
  */
  _applyImage(g, show = true) {

    const that = this;

    g.each(function(d, i) {

      const aes = that._aes(d, i);

      const imageData = [];
      let h = 0, w = 0;

      if (show && (aes.r || aes.width && aes.height)) {
        h = aes.r ? aes.r * 2 : aes.height;
        w = aes.r ? aes.r * 2 : aes.width;
        const url = that._backgroundImage(d, i);
        if (url) imageData.push({url});
      }

      new Image()
        .data(imageData)
        .duration(that._duration)
        .height(h)
        .select(this)
        .width(w)
        .x(-w / 2)
        .y(-h / 2)
        .render();

    });

  }

  /**
      @memberof Shape
      @desc Adds labels to each shape group.
      @param {D3Selection} *g*
      @param {Boolean} [*show* = True] Whether or not to show or remove the labels.
      @private
  */
  _applyLabels(g, show = true) {

    const that = this;

    g.each(function(datum, i) {

      let d = datum;
      if (datum.nested && datum.key && datum.values) d = datum.values[0];

      /* Draws label based on inner bounds */
      const labelData = [];

      if (show) {

        let labels = that._label(d, i);

        if (that._labelBounds && labels !== false && labels !== void 0) {

          const bounds = that._labelBounds(d, i, that._aes(datum, i));

          if (bounds) {

            if (labels.constructor !== Array) labels = [labels];

            const fC = that._fontColor(d, i),
                  fF = that._fontFamily(d, i),
                  fR = that._fontResize(d, i),
                  fS = that._fontSize(d, i),
                  lH = that._lineHeight(d, i),
                  padding = that._labelPadding(d, i),
                  tA = that._textAnchor(d, i),
                  vA = that._verticalAlign(d, i);

            for (let l = 0; l < labels.length; l++) {
              const b = bounds.constructor === Array ? bounds[l] : Object.assign({}, bounds),
                    p = padding.constructor === Array ? padding[l] : padding;
              b.height -= p * 2;
              b.width -= p * 2;
              b.x += p;
              b.y += p;
              b.id = `${that._id(d, i)}_${l}`;
              b.text = labels[l];

              b.fC = fC.constructor === Array ? fC[l] : fC;
              b.fF = fF.constructor === Array ? fF[l] : fF;
              b.fR = fR.constructor === Array ? fR[l] : fR;
              b.fS = fS.constructor === Array ? fS[l] : fS;
              b.lH = lH.constructor === Array ? lH[l] : lH;
              b.tA = tA.constructor === Array ? tA[l] : tA;
              b.vA = vA.constructor === Array ? vA[l] : vA;

              labelData.push(b);
            }

          }

        }
      }

      new TextBox()
        .data(labelData)
        .delay(that._duration / 2)
        .duration(that._duration)
        .fontColor(d => d.fC)
        .fontFamily(d => d.fF)
        .fontResize(d => d.fR)
        .fontSize(d => d.fS)
        .lineHeight(d => d.lH)
        .textAnchor(d => d.tA)
        .verticalAlign(d => d.vA)
        .select(this)
        .render();

    });

  }

  /**
      @memberof Shape
      @desc Provides the default styling to the shape elements.
      @param {HTMLElement} *elem*
      @private
  */
  _applyStyle(elem) {
    elem
      .attr("fill", (d, i) => this._fill(d, i))
      .attr("stroke", (d, i) => this._stroke(d, i))
      .attr("stroke-width", (d, i) => this._strokeWidth(d, i));
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current background-image accessor.
      @param {Function|String} [*value* = false]
  */
  backgroundImage(_) {
    return arguments.length ? (this._backgroundImage = typeof _ === "function" ? _ : constant(_), this) : this._backgroundImage;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the methods that correspond to the key/value pairs and returns the current class instance. If *value* is not specified, returns the current configuration.
      @param {Object} [*value*]
  */
  config(_) {
    if (arguments.length) {
      for (const k in _) if ({}.hasOwnProperty.call(_, k) && k in this) this[k](_[k]);
      return this;
    }
    else {
      const config = {};
      for (const k in this.prototype.constructor) if (k !== "config" && {}.hasOwnProperty.call(this, k)) config[k] = this[k]();
      return config;
    }
  }

  /**
      @memberof Shape
      @desc If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.
      @param {Array} [*data* = []]
  */
  data(_) {
    return arguments.length ? (this._data = _, this) : this._data;
  }

  /**
      @memberof Shape
      @desc If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.
      @param {Number} [*ms* = 600]
  */
  duration(_) {
    return arguments.length ? (this._duration = _, this) : this._duration;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current fill accessor.
      @param {Function|String} [*value* = "black"]
  */
  fill(_) {
    return arguments.length ? (this._fill = typeof _ === "function" ? _ : constant(_), this) : this._fill;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-color accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
  */
  fontColor(_) {
    return arguments.length ? (this._fontColor = typeof _ === "function" ? _ : constant(_), this) : this._fontColor;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-family accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-family accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "Verdana"]
  */
  fontFamily(_) {
    return arguments.length ? (this._fontFamily = typeof _ === "function" ? _ : constant(_), this) : this._fontFamily;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns the current class instance. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#label) will be resized the best fit the shape. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Boolean|Array} [*value*]
  */
  fontResize(_) {
    return arguments.length ? (this._fontResize = typeof _ === "function" ? _ : constant(_), this) : this._fontResize;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the font-size accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-size accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = 12]
  */
  fontSize(_) {
    return arguments.length ? (this._fontSize = typeof _ === "function" ? _ : constant(_), this) : this._fontSize;
  }

  /**
      @memberof Shape
      @desc If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.
      @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`.
      @example
function(d, i, shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
  */
  hitArea(_) {
    return arguments.length ? (this._hitArea = typeof _ === "function" ? _ : constant(_), this) : this._hitArea;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.
      @param {Function} [*value*]
  */
  id(_) {
    return arguments.length ? (this._id = _, this) : this._id;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default. If an array is passed or returned from the function, each value will be rendered as an individual label.
      @param {Function|String|Array} [*value*]
  */
  label(_) {
    return arguments.length ? (this._label = typeof _ === "function" ? _ : constant(_), this) : this._label;
  }

  /**
      @memberof Shape
      @desc If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.
      @param {Function} [*bounds*] The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label.
      @example
function(d, i, shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
  */
  labelBounds(_) {
    return arguments.length ? (this._labelBounds = typeof _ === "function" ? _ : constant(_), this) : this._labelBounds;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the label padding to the specified number and returns the current class instance. If *value* is not specified, returns the current label padding. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|Number|Array} [*value* = 10]
  */
  labelPadding(_) {
    return arguments.length ? (this._labelPadding = typeof _ === "function" ? _ : constant(_), this) : this._labelPadding;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the line-height accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current line-height accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value*]
  */
  lineHeight(_) {
    return arguments.length ? (this._lineHeight = typeof _ === "function" ? _ : constant(_), this) : this._lineHeight;
  }

  /**
      @memberof Shape
      @desc Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.
      @param {String|Object} [*typenames*]
      @param {Function} [*listener*]
  */
  on(_, f) {
    return arguments.length === 2 ? (this._on[_] = f, this) : arguments.length ? typeof _ === "string" ? this._on[_] : (this._on = Object.assign({}, this._on, _), this) : this._on;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current opacity accessor.
      @param {Number} [*value* = 1]
  */
  opacity(_) {
    return arguments.length ? (this._opacity = typeof _ === "function" ? _ : constant(_), this) : this._opacity;
  }

  /**
      @memberof Shape
      @desc Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.
      @param {Function} [*callback* = undefined]
  */
  render(callback) {

    if (this._select === void 0) this.select(select("body").append("svg").style("width", `${window.innerWidth}px`).style("height", `${window.innerHeight}px`).style("display", "block").node());
    if (this._lineHeight === void 0) this.lineHeight((d, i) => this._fontSize(d, i) * 1.1);

    this._transition = transition().duration(this._duration);

    if (callback) setTimeout(callback, this._duration + 100);

    return this;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current scale accessor.
      @param {Function|Number} [*value* = 1]
  */
  scale(_) {
    return arguments.length ? (this._scale = typeof _ === "function" ? _ : constant(_), this) : this._scale;
  }

  /**
      @memberof Shape
      @desc If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.
      @param {String|HTMLElement} [*selector* = d3.select("body").append("svg")]
  */
  select(_) {
    return arguments.length ? (this._select = select(_), this) : this._select;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke accessor.
      @param {Function|String} [*value* = "black"]
  */
  stroke(_) {
    return arguments.length ? (this._stroke = typeof _ === "function" ? _ : constant(_), this) : this._stroke;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke-width accessor.
      @param {Function|Number} [*value* = 0]
  */
  strokeWidth(_) {
    return arguments.length ? (this._strokeWidth = typeof _ === "function" ? _ : constant(_), this) : this._strokeWidth;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
  */
  textAnchor(_) {
    return arguments.length ? (this._textAnchor = typeof _ === "function" ? _ : constant(_), this) : this._textAnchor;
  }

  /**
      @memberof Shape
      @desc If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.
      @param {Function|String|Array} [*value* = "start"]
  */
  verticalAlign(_) {
    return arguments.length ? (this._verticalAlign = typeof _ === "function" ? _ : constant(_), this) : this._verticalAlign;
  }

}
