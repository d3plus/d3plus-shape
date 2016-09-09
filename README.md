# d3plus-shape

[![NPM Release](http://img.shields.io/npm/v/d3plus-shape.svg?style=flat)](https://www.npmjs.org/package/d3plus-shape)
[![Build Status](https://travis-ci.org/d3plus/d3plus-shape.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-shape.svg?style=flat)](https://david-dm.org/d3plus/d3plus-shape)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

Fancy SVG shapes for visualizations

## Installing

If you use NPM, `npm install d3plus-shape`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-shape/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-shape.v0.8.full.min.js"></script>
```

[width]: 360
[height]: 150

## Getting Started

Let's say you want to draw 2 rectangles with distinct labels and colors. If you structure your data like this:

```js
var data = [
  {text: "Box #1", width: 200, height: 150, x: 100, y: 75, color: "cornflowerblue"},
  {text: "Box #2", width: 150, height: 100, x: 285, y: 100, color: "firebrick"}
];
```

It can be passed to the [rectangle generator](#Rect) like this:

```js
new d3plus.Rect()
  .data(data)
  .fill(function(d) { return d.color; })
  .label(function(d) { return d.text; })
  .render();
```

It even detects that the blue rectangle should have a dark label and the red rectangle's should be light!

*Please note that the x and y positions are relative to the center of the rectangles.*


[<kbd><img src="/example/getting-started.png" width="360px" height="150px" /></kbd>](https://d3plus.org/examples/d3plus-shape/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-shape/getting-started/) to view this example live on the web.





## API Reference
### Classes

<dl>
<dt><a href="#Circle">Circle</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Image">Image</a></dt>
<dd></dd>
<dt><a href="#Line">Line</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Rect">Rect</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Shape">Shape</a></dt>
<dd></dd>
</dl>

<a name="Circle"></a>

### Circle ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Circle](#Circle) ⇐ <code>[Shape](#Shape)</code>
    * [new Circle()](#new_Circle_new)
    * [.r([*value*])](#Circle.r)
    * [.update(*selector*)](#Circle.update)
    * [.x([*value*])](#Circle.x)
    * [.y([*value*])](#Circle.y)

<a name="new_Circle_new"></a>

#### new Circle()
Creates SVG circles based on an array of data.

<a name="Circle.r"></a>

#### Circle.r([*value*])
If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current radius accessor.

**Kind**: static method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.r;
}
```
<a name="Circle.update"></a>

#### Circle.update(*selector*)
Updates the style and positioning of the elements matching *selector* and returns the current class instance. This is helpful when not wanting to loop through all shapes just to change the style of a few.

**Kind**: static method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| *selector* | <code>String</code> &#124; <code>HTMLElement</code> | 

<a name="Circle.x"></a>

#### Circle.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.

**Kind**: static method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.x;
}
```
<a name="Circle.y"></a>

#### Circle.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.

**Kind**: static method of <code>[Circle](#Circle)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y;
}
```
<a name="Image"></a>

### Image
**Kind**: global class  

* [Image](#Image)
    * [new Image()](#new_Image_new)
    * [.render([*callback*])](#Image.render)
    * [.data([*data*])](#Image.data)
    * [.duration([*ms*])](#Image.duration)
    * [.height([*value*])](#Image.height)
    * [.id([*value*])](#Image.id)
    * [.select([*selector*])](#Image.select)
    * [.url([*value*])](#Image.url)
    * [.width([*value*])](#Image.width)
    * [.x([*value*])](#Image.x)
    * [.y([*value*])](#Image.y)

<a name="new_Image_new"></a>

#### new Image()
Creates SVG images based on an array of data.

**Example** *(a sample row of data)*  
```js
var data = {"url": "file.png", "width": "100", "height": "50"};
```
**Example** *(passed to the generator)*  
```js
new Image().data([data]).render();
```
**Example** *(creates the following)*  
```js
<image class="d3plus-shape-image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
```
**Example** *(this is shorthand for the following)*  
```js
image().data([data])();
```
**Example** *(which also allows a post-draw callback function)*  
```js
image().data([data])(function() { alert("draw complete!"); })
```
<a name="Image.render"></a>

#### Image.render([*callback*])
Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Image.data"></a>

#### Image.data([*data*])
If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="Image.duration"></a>

#### Image.duration([*ms*])
If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*ms*] | <code>Number</code> | <code>600</code> | 

<a name="Image.height"></a>

#### Image.height([*value*])
If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.height;
}
```
<a name="Image.id"></a>

#### Image.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function(d) {
  return d.url;
}
```
<a name="Image.select"></a>

#### Image.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="Image.url"></a>

#### Image.url([*value*])
If *value* is specified, sets the URL accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current URL accessor.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function(d) {
  return d.url;
}
```
<a name="Image.width"></a>

#### Image.width([*value*])
If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.width;
}
```
<a name="Image.x"></a>

#### Image.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.x || 0;
}
```
<a name="Image.y"></a>

#### Image.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[Image](#Image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y || 0;
}
```
<a name="Line"></a>

### Line ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Line](#Line) ⇐ <code>[Shape](#Shape)</code>
    * [new Line()](#new_Line_new)
    * [.curve([*value*])](#Line.curve)
    * [.update(*selector*)](#Line.update)
    * [.x([*value*])](#Line.x)
    * [.y([*value*])](#Line.y)

<a name="new_Line_new"></a>

#### new Line()
Creates SVG lines based on an array of data.

<a name="Line.curve"></a>

#### Line.curve([*value*])
If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve. The number returned should correspond to the horizontal center of the rectangle.

**Kind**: static method of <code>[Line](#Line)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | 

<a name="Line.update"></a>

#### Line.update(*selector*)
Updates the style and positioning of the elements matching *selector* and returns the current class instance. This is helpful when not wanting to loop through all shapes just to change the style of a few.

**Kind**: static method of <code>[Line](#Line)</code>  

| Param | Type |
| --- | --- |
| *selector* | <code>String</code> &#124; <code>HTMLElement</code> | 

<a name="Line.x"></a>

#### Line.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.

**Kind**: static method of <code>[Line](#Line)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.x;
}
```
<a name="Line.y"></a>

#### Line.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.

**Kind**: static method of <code>[Line](#Line)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y;
}
```
<a name="Rect"></a>

### Rect ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Rect](#Rect) ⇐ <code>[Shape](#Shape)</code>
    * [new Rect()](#new_Rect_new)
    * [.height([*value*])](#Rect.height)
    * [.update(*selector*)](#Rect.update)
    * [.width([*value*])](#Rect.width)
    * [.x([*value*])](#Rect.x)
    * [.y([*value*])](#Rect.y)

<a name="new_Rect_new"></a>

#### new Rect()
Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.

<a name="Rect.height"></a>

#### Rect.height([*value*])
If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.

**Kind**: static method of <code>[Rect](#Rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.height;
}
```
<a name="Rect.update"></a>

#### Rect.update(*selector*)
Updates the style and positioning of the elements matching *selector* and returns the current class instance. This is helpful when not wanting to loop through all shapes just to change the style of a few.

**Kind**: static method of <code>[Rect](#Rect)</code>  

| Param | Type |
| --- | --- |
| *selector* | <code>String</code> &#124; <code>HTMLElement</code> | 

<a name="Rect.width"></a>

#### Rect.width([*value*])
If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.

**Kind**: static method of <code>[Rect](#Rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.width;
}
```
<a name="Rect.x"></a>

#### Rect.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.

**Kind**: static method of <code>[Rect](#Rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.x;
}
```
<a name="Rect.y"></a>

#### Rect.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.

**Kind**: static method of <code>[Rect](#Rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y;
}
```
<a name="Shape"></a>

### Shape
**Kind**: global class  

* [Shape](#Shape)
    * [new Shape()](#new_Shape_new)
    * [.backgroundImage([*value*])](#Shape.backgroundImage)
    * [.config([*value*])](#Shape.config)
    * [.data([*data*])](#Shape.data)
    * [.duration([*ms*])](#Shape.duration)
    * [.fill([*value*])](#Shape.fill)
    * [.fontColor([*value*])](#Shape.fontColor)
    * [.fontFamily([*value*])](#Shape.fontFamily)
    * [.fontResize([*value*])](#Shape.fontResize)
    * [.fontSize([*value*])](#Shape.fontSize)
    * [.hitArea([*bounds*])](#Shape.hitArea)
    * [.id([*value*])](#Shape.id)
    * [.label([*value*])](#Shape.label)
    * [.labelBounds([*bounds*])](#Shape.labelBounds)
    * [.labelPadding([*value*])](#Shape.labelPadding)
    * [.lineHeight([*value*])](#Shape.lineHeight)
    * [.on([*typenames*], [*listener*])](#Shape.on)
    * [.opacity([*value*])](#Shape.opacity)
    * [.render([*callback*])](#Shape.render)
    * [.scale([*value*])](#Shape.scale)
    * [.select([*selector*])](#Shape.select)
    * [.stroke([*value*])](#Shape.stroke)
    * [.strokeWidth([*value*])](#Shape.strokeWidth)
    * [.textAnchor([*value*])](#Shape.textAnchor)
    * [.verticalAlign([*value*])](#Shape.verticalAlign)

<a name="new_Shape_new"></a>

#### new Shape()
An abstracted class for generating shapes.

<a name="Shape.backgroundImage"></a>

#### Shape.backgroundImage([*value*])
If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current background-image accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>false</code> | 

<a name="Shape.config"></a>

#### Shape.config([*value*])
If *value* is specified, sets the methods that correspond to the key/value pairs and returns the current class instance. If *value* is not specified, returns the current configuration.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>Object</code> | 

<a name="Shape.data"></a>

#### Shape.data([*data*])
If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="Shape.duration"></a>

#### Shape.duration([*ms*])
If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*ms*] | <code>Number</code> | <code>600</code> | 

<a name="Shape.fill"></a>

#### Shape.fill([*value*])
If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current fill accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;black&quot;</code> | 

<a name="Shape.fontColor"></a>

#### Shape.fontColor([*value*])
If *value* is specified, sets the font-color accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="Shape.fontFamily"></a>

#### Shape.fontFamily([*value*])
If *value* is specified, sets the font-family accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-family accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;Verdana&quot;</code> | 

<a name="Shape.fontResize"></a>

#### Shape.fontResize([*value*])
If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns the current class instance. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#label) will be resized the best fit the shape. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Boolean</code> &#124; <code>Array</code> | 

<a name="Shape.fontSize"></a>

#### Shape.fontSize([*value*])
If *value* is specified, sets the font-size accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-size accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>12</code> | 

<a name="Shape.hitArea"></a>

#### Shape.hitArea([*bounds*])
If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [*bounds*] | <code>function</code> | The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`. |

**Example**  
```js
function(d, i, shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
```
<a name="Shape.id"></a>

#### Shape.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Shape.label"></a>

#### Shape.label([*value*])
If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default. If an array is passed or returned from the function, each value will be rendered as an individual label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="Shape.labelBounds"></a>

#### Shape.labelBounds([*bounds*])
If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [*bounds*] | <code>function</code> | The given function is passed the data point, index, and internally defined properties of the shape and should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label. |

**Example**  
```js
function(d, i, shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
```
<a name="Shape.labelPadding"></a>

#### Shape.labelPadding([*value*])
If *value* is specified, sets the label padding to the specified number and returns the current class instance. If *value* is not specified, returns the current label padding. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>Array</code> | <code>10</code> | 

<a name="Shape.lineHeight"></a>

#### Shape.lineHeight([*value*])
If *value* is specified, sets the line-height accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current line-height accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="Shape.on"></a>

#### Shape.on([*typenames*], [*listener*])
Adds or removes a *listener* to each shape for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*typenames*] | <code>String</code> &#124; <code>Object</code> | 
| [*listener*] | <code>function</code> | 

<a name="Shape.opacity"></a>

#### Shape.opacity([*value*])
If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current opacity accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>1</code> | 

<a name="Shape.render"></a>

#### Shape.render([*callback*])
Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Shape.scale"></a>

#### Shape.scale([*value*])
If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current scale accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | <code>1</code> | 

<a name="Shape.select"></a>

#### Shape.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="Shape.stroke"></a>

#### Shape.stroke([*value*])
If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;black&quot;</code> | 

<a name="Shape.strokeWidth"></a>

#### Shape.strokeWidth([*value*])
If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke-width accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | <code>0</code> | 

<a name="Shape.textAnchor"></a>

#### Shape.textAnchor([*value*])
If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;start&quot;</code> | 

<a name="Shape.verticalAlign"></a>

#### Shape.verticalAlign([*value*])
If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;start&quot;</code> | 



###### <sub>Documentation generated on Fri, 09 Sep 2016 22:18:49 GMT</sub>
