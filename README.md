# d3plus-shape

[![NPM Release](http://img.shields.io/npm/v/d3plus-shape.svg?style=flat)](https://www.npmjs.org/package/d3plus-shape)
[![Build Status](https://travis-ci.org/d3plus/d3plus-shape.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-shape.svg?style=flat)](https://david-dm.org/d3plus/d3plus-shape)
[![Slack](https://img.shields.io/badge/Slack-Click%20to%20Join!-green.svg?style=social)](https://goo.gl/forms/ynrKdvusekAwRMPf2)

Fancy SVG shapes for visualizations

## Installing

If you use NPM, `npm install d3plus-shape`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-shape/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a [custom bundle using Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-shape.v0.12.full.min.js"></script>
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


[<kbd><img src="/example/getting-started.png" width="360px" /></kbd>](https://d3plus.org/examples/d3plus-shape/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-shape/getting-started/) to view this example live on the web.


### More Examples

 * [Area Generator](http://d3plus.org/examples/d3plus-shape/area/)

## API Reference
### Classes

<dl>
<dt><a href="#Image">Image</a></dt>
<dd></dd>
<dt><a href="#Area">Area</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Bar">Bar</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Circle">Circle</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Line">Line</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Path">Path</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Rect">Rect</a> ⇐ <code><a href="#Shape">Shape</a></code></dt>
<dd></dd>
<dt><a href="#Shape">Shape</a> ⇐ <code><a href="https://github.com/d3plus/d3plus-common#BaseClass">BaseClass</a></code></dt>
<dd></dd>
</dl>

### Functions

<dl>
<dt><a href="#largestRect">largestRect(poly, [options])</a> ⇒ <code><a href="#LargestRect">LargestRect</a></code></dt>
<dd><p>An angle of zero means that the longer side of the polygon (the width) will be aligned with the x axis. An angle of 90 and/or -90 means that the longer side of the polygon (the width) will be aligned with the y axis. The value can be a number between -90 and 90 specifying the angle of rotation of the polygon, a string which is parsed to a number, or an array of numbers specifying the possible rotations of the polygon.</p>
</dd>
<dt><a href="#lineIntersection">lineIntersection(p1, q1, p2, q2)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Finds the intersection point (if there is one) of the lines p1q1 and p2q2.</p>
</dd>
<dt><a href="#path2polygon">path2polygon(path, [segmentLength])</a> ⇒ <code>Array</code></dt>
<dd><p>Transforms a path string into an Array of points.</p>
</dd>
<dt><a href="#pointDistance">pointDistance(p1, p2)</a> ⇒ <code>Number</code></dt>
<dd><p>Calculates the pixel distance between two points.</p>
</dd>
<dt><a href="#pointDistanceSquared">pointDistanceSquared(p1, p2)</a> ⇒ <code>Number</code></dt>
<dd><p>Returns the squared euclidean distance between two points.</p>
</dd>
<dt><a href="#pointRotate">pointRotate(p, alpha, [origin])</a> ⇒ <code>Boolean</code></dt>
<dd><p>Rotates a point around a given origin.</p>
</dd>
<dt><a href="#polygonInside">polygonInside(polyA, polyB)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if one polygon is inside another polygon.</p>
</dd>
<dt><a href="#polygonRayCast">polygonRayCast(poly, origin, [alpha])</a> ⇒ <code>Array</code></dt>
<dd><p>Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.</p>
</dd>
<dt><a href="#polygonRotate">polygonRotate(poly, alpha, [origin])</a> ⇒ <code>Boolean</code></dt>
<dd><p>Rotates a point around a given origin.</p>
</dd>
<dt><a href="#segmentBoxContains">segmentBoxContains(s1, s2, p)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether a point is inside the bounding box of a line segment.</p>
</dd>
<dt><a href="#segmentsIntersect">segmentsIntersect(p1, q1, p2, q2)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks whether the line segments p1q1 &amp;&amp; p2q2 intersect.</p>
</dd>
<dt><a href="#shapeEdgePoint">shapeEdgePoint(angle, distance)</a> ⇒ <code>String</code></dt>
<dd><p>Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.</p>
</dd>
<dt><a href="#largestRect">largestRect(poly, [tolerance], [highestQuality])</a></dt>
<dd><p>Simplifies the points of a polygon using both the Ramer-Douglas-Peucker algorithm and basic distance-based simplification. Adapted to an ES6 module from the excellent <a href="http://mourner.github.io/simplify-js/">Simplify.js</a>.</p>
</dd>
</dl>

### Typedefs

<dl>
<dt><a href="#LargestRect">LargestRect</a> : <code>Object</code></dt>
<dd><p>The returned Object of the largestRect function.</p>
</dd>
</dl>

<a name="Image"></a>

### Image
**Kind**: global class  

* [Image](#Image)
    * [new Image()](#new_Image_new)
    * [.render([*callback*])](#Image.render) ↩︎
    * [.data([*data*])](#Image.data) ↩︎
    * [.duration([*ms*])](#Image.duration) ↩︎
    * [.height([*value*])](#Image.height) ↩︎
    * [.id([*value*])](#Image.id) ↩︎
    * [.pointerEvents([*value*])](#Image.pointerEvents) ↩︎
    * [.select([*selector*])](#Image.select) ↩︎
    * [.url([*value*])](#Image.url) ↩︎
    * [.width([*value*])](#Image.width) ↩︎
    * [.x([*value*])](#Image.x) ↩︎
    * [.y([*value*])](#Image.y) ↩︎

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
<image class="d3plus-Image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
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

#### Image.render([*callback*]) ↩︎
Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Image.data"></a>

#### Image.data([*data*]) ↩︎
If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="Image.duration"></a>

#### Image.duration([*ms*]) ↩︎
If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*ms*] | <code>Number</code> | <code>600</code> | 

<a name="Image.height"></a>

#### Image.height([*value*]) ↩︎
If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

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

#### Image.id([*value*]) ↩︎
If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function(d) {
  return d.id;
}
```
<a name="Image.pointerEvents"></a>

#### Image.pointerEvents([*value*]) ↩︎
If *value* is specified, sets the pointer-events accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current pointer-events accessor.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;auto&quot;</code> | 

<a name="Image.select"></a>

#### Image.select([*selector*]) ↩︎
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="Image.url"></a>

#### Image.url([*value*]) ↩︎
If *value* is specified, sets the URL accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current URL accessor.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

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

#### Image.width([*value*]) ↩︎
If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

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

#### Image.x([*value*]) ↩︎
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

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

#### Image.y([*value*]) ↩︎
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[Image](#Image)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y || 0;
}
```
<a name="Area"></a>

### Area ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Area](#Area) ⇐ <code>[Shape](#Shape)</code>
    * [new Area()](#new_Area_new)
    * [.render([*callback*])](#Area.render) ↩︎
    * [.curve([*value*])](#Area.curve) ↩︎
    * [.defined([*value*])](#Area.defined) ↩︎
    * [.x([*value*])](#Area.x) ↩︎
    * [.x0([*value*])](#Area.x0) ↩︎
    * [.x1([*value*])](#Area.x1) ↩︎
    * [.y([*value*])](#Area.y) ↩︎
    * [.y0([*value*])](#Area.y0) ↩︎
    * [.y1([*value*])](#Area.y1) ↩︎

<a name="new_Area_new"></a>

#### new Area()
Creates SVG areas based on an array of data.

<a name="Area.render"></a>

#### Area.render([*callback*]) ↩︎
Draws the area polygons.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Area.curve"></a>

#### Area.curve([*value*]) ↩︎
If *value* is specified, sets the area curve to the specified string and returns the current class instance. If *value* is not specified, returns the current area curve.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | 

<a name="Area.defined"></a>

#### Area.defined([*value*]) ↩︎
If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Area.x"></a>

#### Area.x([*value*]) ↩︎
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Area.x0"></a>

#### Area.x0([*value*]) ↩︎
If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Area.x1"></a>

#### Area.x1([*value*]) ↩︎
If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>null</code> | 

<a name="Area.y"></a>

#### Area.y([*value*]) ↩︎
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Area.y0"></a>

#### Area.y0([*value*]) ↩︎
If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Area.y1"></a>

#### Area.y1([*value*]) ↩︎
If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.

**Kind**: static method of <code>[Area](#Area)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>null</code> | 

<a name="Bar"></a>

### Bar ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Bar](#Bar) ⇐ <code>[Shape](#Shape)</code>
    * [new Bar()](#new_Bar_new)
    * [.render([*callback*])](#Bar.render) ↩︎
    * [.height([*value*])](#Bar.height) ↩︎
    * [.width([*value*])](#Bar.width) ↩︎
    * [.x0([*value*])](#Bar.x0) ↩︎
    * [.x1([*value*])](#Bar.x1) ↩︎
    * [.y0([*value*])](#Bar.y0) ↩︎
    * [.y1([*value*])](#Bar.y1) ↩︎

<a name="new_Bar_new"></a>

#### new Bar()
Creates SVG areas based on an array of data.

<a name="Bar.render"></a>

#### Bar.render([*callback*]) ↩︎
Draws the bars.

**Kind**: static method of <code>[Bar](#Bar)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Bar.height"></a>

#### Bar.height([*value*]) ↩︎
If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.

**Kind**: static method of <code>[Bar](#Bar)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.height;
}
```
<a name="Bar.width"></a>

#### Bar.width([*value*]) ↩︎
If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.

**Kind**: static method of <code>[Bar](#Bar)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.width;
}
```
<a name="Bar.x0"></a>

#### Bar.x0([*value*]) ↩︎
If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.

**Kind**: static method of <code>[Bar](#Bar)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Bar.x1"></a>

#### Bar.x1([*value*]) ↩︎
If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.

**Kind**: static method of <code>[Bar](#Bar)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>null</code> | 

<a name="Bar.y0"></a>

#### Bar.y0([*value*]) ↩︎
If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.

**Kind**: static method of <code>[Bar](#Bar)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

<a name="Bar.y1"></a>

#### Bar.y1([*value*]) ↩︎
If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.

**Kind**: static method of <code>[Bar](#Bar)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>null</code> | 

<a name="Circle"></a>

### Circle ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Circle](#Circle) ⇐ <code>[Shape](#Shape)</code>
    * [new Circle()](#new_Circle_new)
    * [.render([*callback*])](#Circle.render) ↩︎
    * [.r([*value*])](#Circle.r) ↩︎

<a name="new_Circle_new"></a>

#### new Circle()
Creates SVG circles based on an array of data.

<a name="Circle.render"></a>

#### Circle.render([*callback*]) ↩︎
Draws the circles.

**Kind**: static method of <code>[Circle](#Circle)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Circle.r"></a>

#### Circle.r([*value*]) ↩︎
If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current radius accessor.

**Kind**: static method of <code>[Circle](#Circle)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.r;
}
```
<a name="Line"></a>

### Line ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Line](#Line) ⇐ <code>[Shape](#Shape)</code>
    * [new Line()](#new_Line_new)
    * [.render([*callback*])](#Line.render) ↩︎
    * [.curve([*value*])](#Line.curve) ↩︎
    * [.defined([*value*])](#Line.defined) ↩︎

<a name="new_Line_new"></a>

#### new Line()
Creates SVG lines based on an array of data.

<a name="Line.render"></a>

#### Line.render([*callback*]) ↩︎
Draws the lines.

**Kind**: static method of <code>[Line](#Line)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Line.curve"></a>

#### Line.curve([*value*]) ↩︎
If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve.

**Kind**: static method of <code>[Line](#Line)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>String</code> | <code>&quot;linear&quot;</code> | 

<a name="Line.defined"></a>

#### Line.defined([*value*]) ↩︎
If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.

**Kind**: static method of <code>[Line](#Line)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Path"></a>

### Path ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Path](#Path) ⇐ <code>[Shape](#Shape)</code>
    * [new Path()](#new_Path_new)
    * [.render([*callback*])](#Path.render) ↩︎
    * [.d([*value*])](#Path.d) ↩︎

<a name="new_Path_new"></a>

#### new Path()
Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.

<a name="Path.render"></a>

#### Path.render([*callback*]) ↩︎
Draws the paths.

**Kind**: static method of <code>[Path](#Path)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Path.d"></a>

#### Path.d([*value*]) ↩︎
If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current "d" attribute accessor.

**Kind**: static method of <code>[Path](#Path)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

**Example**  
```js
function(d) {
  return d.path;
}
```
<a name="Rect"></a>

### Rect ⇐ <code>[Shape](#Shape)</code>
**Kind**: global class  
**Extends:** <code>[Shape](#Shape)</code>  

* [Rect](#Rect) ⇐ <code>[Shape](#Shape)</code>
    * [new Rect()](#new_Rect_new)
    * [.render([*callback*])](#Rect.render) ↩︎
    * [.height([*value*])](#Rect.height) ↩︎
    * [.width([*value*])](#Rect.width) ↩︎

<a name="new_Rect_new"></a>

#### new Rect()
Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.

<a name="Rect.render"></a>

#### Rect.render([*callback*]) ↩︎
Draws the rectangles.

**Kind**: static method of <code>[Rect](#Rect)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Rect.height"></a>

#### Rect.height([*value*]) ↩︎
If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current height accessor.

**Kind**: static method of <code>[Rect](#Rect)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.height;
}
```
<a name="Rect.width"></a>

#### Rect.width([*value*]) ↩︎
If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current width accessor.

**Kind**: static method of <code>[Rect](#Rect)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.width;
}
```
<a name="Shape"></a>

### Shape ⇐ <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>
**Kind**: global class  
**Extends:** <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>  

* [Shape](#Shape) ⇐ <code>[BaseClass](https://github.com/d3plus/d3plus-common#BaseClass)</code>
    * [new Shape()](#new_Shape_new)
    * [.render([*callback*])](#Shape.render) ↩︎
    * [.active([*value*])](#Shape.active) ↩︎
    * [.activeOpacity([*value*])](#Shape.activeOpacity) ↩︎
    * [.backgroundImage([*value*])](#Shape.backgroundImage) ↩︎
    * [.data([*data*])](#Shape.data) ↩︎
    * [.duration([*ms*])](#Shape.duration) ↩︎
    * [.fill([*value*])](#Shape.fill) ↩︎
    * [.fontColor([*value*])](#Shape.fontColor) ↩︎
    * [.fontFamily([*value*])](#Shape.fontFamily) ↩︎
    * [.fontResize([*value*])](#Shape.fontResize) ↩︎
    * [.fontSize([*value*])](#Shape.fontSize) ↩︎
    * [.hover([*value*])](#Shape.hover) ↩︎
    * [.hoverOpacity([*value*])](#Shape.hoverOpacity) ↩︎
    * [.hitArea([*bounds*])](#Shape.hitArea) ↩︎
    * [.id([*value*])](#Shape.id) ↩︎
    * [.label([*value*])](#Shape.label) ↩︎
    * [.labelBounds([*bounds*])](#Shape.labelBounds) ↩︎
    * [.labelRotate([angle])](#Shape.labelRotate) ↩︎
    * [.labelPadding([*value*])](#Shape.labelPadding) ↩︎
    * [.lineHeight([*value*])](#Shape.lineHeight) ↩︎
    * [.opacity([*value*])](#Shape.opacity) ↩︎
    * [.scale([*value*])](#Shape.scale) ↩︎
    * [.select([*selector*])](#Shape.select) ↩︎
    * [.shapeRendering([*value*])](#Shape.shapeRendering) ↩︎
    * [.sort([*value*])](#Shape.sort) ↩︎
    * [.stroke([*value*])](#Shape.stroke) ↩︎
    * [.strokeWidth([*value*])](#Shape.strokeWidth) ↩︎
    * [.textAnchor([*value*])](#Shape.textAnchor) ↩︎
    * [.vectorEffect([*value*])](#Shape.vectorEffect) ↩︎
    * [.verticalAlign([*value*])](#Shape.verticalAlign) ↩︎
    * [.x([*value*])](#Shape.x) ↩︎
    * [.y([*value*])](#Shape.y) ↩︎

<a name="new_Shape_new"></a>

#### new Shape()
An abstracted class for generating shapes.

<a name="Shape.render"></a>

#### Shape.render([*callback*]) ↩︎
Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*callback*] | <code>function</code> | 

<a name="Shape.active"></a>

#### Shape.active([*value*]) ↩︎
If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Shape.activeOpacity"></a>

#### Shape.activeOpacity([*value*]) ↩︎
If *value* is specified, sets the active opacity to the specified function and returns the current class instance. If *value* is not specified, returns the current active opacity.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>0.75</code> | 

<a name="Shape.backgroundImage"></a>

#### Shape.backgroundImage([*value*]) ↩︎
If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current background-image accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>false</code> | 

<a name="Shape.data"></a>

#### Shape.data([*data*]) ↩︎
If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="Shape.duration"></a>

#### Shape.duration([*ms*]) ↩︎
If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*ms*] | <code>Number</code> | <code>600</code> | 

<a name="Shape.fill"></a>

#### Shape.fill([*value*]) ↩︎
If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current fill accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;black&quot;</code> | 

<a name="Shape.fontColor"></a>

#### Shape.fontColor([*value*]) ↩︎
If *value* is specified, sets the font-color accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="Shape.fontFamily"></a>

#### Shape.fontFamily([*value*]) ↩︎
If *value* is specified, sets the font-family accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-family accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;Verdana&quot;</code> | 

<a name="Shape.fontResize"></a>

#### Shape.fontResize([*value*]) ↩︎
If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns the current class instance. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#label) will be resized the best fit the shape. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Boolean</code> &#124; <code>Array</code> | 

<a name="Shape.fontSize"></a>

#### Shape.fontSize([*value*]) ↩︎
If *value* is specified, sets the font-size accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current font-size accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>12</code> | 

<a name="Shape.hover"></a>

#### Shape.hover([*value*]) ↩︎
If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current highlight accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Shape.hoverOpacity"></a>

#### Shape.hoverOpacity([*value*]) ↩︎
If *value* is specified, sets the hover opacity to the specified function and returns the current class instance. If *value* is not specified, returns the current hover opacity.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>0.5</code> | 

<a name="Shape.hitArea"></a>

#### Shape.hitArea([*bounds*]) ↩︎
If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

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

#### Shape.id([*value*]) ↩︎
If *value* is specified, sets the id accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current id accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

<a name="Shape.label"></a>

#### Shape.label([*value*]) ↩︎
If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text accessor, which is `undefined` by default. If an array is passed or returned from the function, each value will be rendered as an individual label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="Shape.labelBounds"></a>

#### Shape.labelBounds([*bounds*]) ↩︎
If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

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
<a name="Shape.labelRotate"></a>

#### Shape.labelRotate([angle]) ↩︎
Specifies the rotation angle, in degrees, of a shape's label. If *value* is not specified, returns the current label rotation. If an array is passed or returned from the function, each value will be used consecutively with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [angle] | <code>function</code> &#124; <code>Number</code> &#124; <code>Array</code> | <code>0</code> | 

<a name="Shape.labelPadding"></a>

#### Shape.labelPadding([*value*]) ↩︎
If *value* is specified, sets the label padding to the specified number and returns the current class instance. If *value* is not specified, returns the current label padding. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>Array</code> | <code>10</code> | 

<a name="Shape.lineHeight"></a>

#### Shape.lineHeight([*value*]) ↩︎
If *value* is specified, sets the line-height accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current line-height accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="Shape.opacity"></a>

#### Shape.opacity([*value*]) ↩︎
If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current opacity accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>1</code> | 

<a name="Shape.scale"></a>

#### Shape.scale([*value*]) ↩︎
If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current scale accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | <code>1</code> | 

<a name="Shape.select"></a>

#### Shape.select([*selector*]) ↩︎
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="Shape.shapeRendering"></a>

#### Shape.shapeRendering([*value*]) ↩︎
If *value* is specified, sets the shape-rendering accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current shape-rendering accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;geometricPrecision&quot;</code> | 

**Example**  
```js
function(d) {
  return d.x;
}
```
<a name="Shape.sort"></a>

#### Shape.sort([*value*]) ↩︎
If *value* is specified, sets the sort comparator to the specified function and returns the current class instance. If *value* is not specified, returns the current sort comparator.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>false</code> &#124; <code>function</code> | <code>[]</code> | 

<a name="Shape.stroke"></a>

#### Shape.stroke([*value*]) ↩︎
If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;black&quot;</code> | 

<a name="Shape.strokeWidth"></a>

#### Shape.strokeWidth([*value*]) ↩︎
If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current stroke-width accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | <code>0</code> | 

<a name="Shape.textAnchor"></a>

#### Shape.textAnchor([*value*]) ↩︎
If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;start&quot;</code> | 

<a name="Shape.vectorEffect"></a>

#### Shape.vectorEffect([*value*]) ↩︎
If *value* is specified, sets the vector-effect accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vector-effect accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;non-scaling-stroke&quot;</code> | 

<a name="Shape.verticalAlign"></a>

#### Shape.verticalAlign([*value*]) ↩︎
If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;start&quot;</code> | 

<a name="Shape.x"></a>

#### Shape.x([*value*]) ↩︎
If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.x;
}
```
<a name="Shape.y"></a>

#### Shape.y([*value*]) ↩︎
If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[Shape](#Shape)</code>  
**Chainable**  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y;
}
```
<a name="largestRect"></a>

### largestRect(poly, [options]) ⇒ <code>[LargestRect](#LargestRect)</code>
An angle of zero means that the longer side of the polygon (the width) will be aligned with the x axis. An angle of 90 and/or -90 means that the longer side of the polygon (the width) will be aligned with the y axis. The value can be a number between -90 and 90 specifying the angle of rotation of the polygon, a string which is parsed to a number, or an array of numbers specifying the possible rotations of the polygon.

**Kind**: global function  
**Author:** Daniel Smilkov [dsmilkov@gmail.com]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | An Array of points that represent a polygon. |
| [options] | <code>Object</code> |  | An Object that allows for overriding various parameters of the algorithm. |
| [options.angle] | <code>Number</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>d3.range(-90, 95, 5)</code> | The allowed rotations of the final rectangle. |
| [options.aspectRatio] | <code>Number</code> &#124; <code>String</code> &#124; <code>Array</code> |  | The ratio between the width and height of the rectangle. The value can be a number, a string which is parsed to a number, or an array of numbers specifying the possible aspect ratios of the final rectangle. |
| [options.maxAspectRatio] | <code>Number</code> | <code>15</code> | The maximum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided. |
| [options.minAspectRatio] | <code>Number</code> | <code>1</code> | The minimum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided. |
| [options.nTries] | <code>Number</code> | <code>20</code> | The number of randomly drawn points inside the polygon which the algorithm explores as possible center points of the maximal rectangle. |
| [options.minHeight] | <code>Number</code> | <code>0</code> | The minimum height of the rectangle. |
| [options.minWidth] | <code>Number</code> | <code>0</code> | The minimum width of the rectangle. |
| [options.tolerance] | <code>Number</code> | <code>0.02</code> | The simplification tolerance factor, between 0 and 1. A larger tolerance corresponds to more extensive simplification. |
| [options.origin] | <code>Array</code> |  | The center point of the rectangle. If specified, the rectangle will be fixed at that point, otherwise the algorithm optimizes across all possible points. The given value can be either a two dimensional array specifying the x and y coordinate of the origin or an array of two dimensional points specifying multiple possible center points of the rectangle. |

<a name="lineIntersection"></a>

### lineIntersection(p1, q1, p2, q2) ⇒ <code>Boolean</code>
Finds the intersection point (if there is one) of the lines p1q1 and p2q2.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point of the first line segment, which should always be an `[x, y]` formatted Array. |
| q1 | <code>Array</code> | The second point of the first line segment, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The first point of the second line segment, which should always be an `[x, y]` formatted Array. |
| q2 | <code>Array</code> | The second point of the second line segment, which should always be an `[x, y]` formatted Array. |

<a name="path2polygon"></a>

### path2polygon(path, [segmentLength]) ⇒ <code>Array</code>
Transforms a path string into an Array of points.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | An SVG string path, commonly the "d" property of a <path> element. |
| [segmentLength] | <code>Number</code> | <code>20</code> | The lenght of line segments when converting curves line segments. Higher values lower computation time, but will result in curves that are more rigid. |

<a name="pointDistance"></a>

### pointDistance(p1, p2) ⇒ <code>Number</code>
Calculates the pixel distance between two points.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The second point, which should always be an `[x, y]` formatted Array. |

<a name="pointDistanceSquared"></a>

### pointDistanceSquared(p1, p2) ⇒ <code>Number</code>
Returns the squared euclidean distance between two points.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The second point, which should always be an `[x, y]` formatted Array. |

<a name="pointRotate"></a>

### pointRotate(p, alpha, [origin]) ⇒ <code>Boolean</code>
Rotates a point around a given origin.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| p | <code>Array</code> |  | The point to be rotated, which should always be an `[x, y]` formatted Array. |
| alpha | <code>Number</code> |  | The angle in radians to rotate. |
| [origin] | <code>Array</code> | <code>[0, 0]</code> | The origin point of the rotation, which should always be an `[x, y]` formatted Array. |

<a name="polygonInside"></a>

### polygonInside(polyA, polyB) ⇒ <code>Boolean</code>
Checks if one polygon is inside another polygon.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| polyA | <code>Array</code> | An Array of `[x, y]` points to be used as the inner polygon, checking if it is inside polyA. |
| polyB | <code>Array</code> | An Array of `[x, y]` points to be used as the containing polygon. |

<a name="polygonRayCast"></a>

### polygonRayCast(poly, origin, [alpha]) ⇒ <code>Array</code>
Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.

**Kind**: global function  
**Returns**: <code>Array</code> - An array containing two values, the closest point on the left and the closest point on the right. If either point cannot be found, that value will be `null`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | The polygon to test against, which should be an `[x, y]` formatted Array. |
| origin | <code>Array</code> |  | The origin point of the ray to be cast, which should be an `[x, y]` formatted Array. |
| [alpha] | <code>Number</code> | <code>0</code> | The angle in radians of the ray. |

<a name="polygonRotate"></a>

### polygonRotate(poly, alpha, [origin]) ⇒ <code>Boolean</code>
Rotates a point around a given origin.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | The polygon to be rotated, which should be an Array of `[x, y]` values. |
| alpha | <code>Number</code> |  | The angle in radians to rotate. |
| [origin] | <code>Array</code> | <code>[0, 0]</code> | The origin point of the rotation, which should be an `[x, y]` formatted Array. |

<a name="segmentBoxContains"></a>

### segmentBoxContains(s1, s2, p) ⇒ <code>Boolean</code>
Checks whether a point is inside the bounding box of a line segment.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| s1 | <code>Array</code> | The first point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array. |
| s2 | <code>Array</code> | The second point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array. |
| p | <code>Array</code> | The point to be checked, which should always be an `[x, y]` formatted Array. |

<a name="segmentsIntersect"></a>

### segmentsIntersect(p1, q1, p2, q2) ⇒ <code>Boolean</code>
Checks whether the line segments p1q1 && p2q2 intersect.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point of the first line segment, which should always be an `[x, y]` formatted Array. |
| q1 | <code>Array</code> | The second point of the first line segment, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The first point of the second line segment, which should always be an `[x, y]` formatted Array. |
| q2 | <code>Array</code> | The second point of the second line segment, which should always be an `[x, y]` formatted Array. |

<a name="shapeEdgePoint"></a>

### shapeEdgePoint(angle, distance) ⇒ <code>String</code>
Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.

**Kind**: global function  
**Returns**: <code>String</code> - [shape = "circle"] The type of shape, which can be either "circle" or "square".  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle, in radians, of the offset point. |
| distance | <code>Number</code> | The pixel distance away from the origin. |

<a name="largestRect"></a>

### largestRect(poly, [tolerance], [highestQuality])
Simplifies the points of a polygon using both the Ramer-Douglas-Peucker algorithm and basic distance-based simplification. Adapted to an ES6 module from the excellent [Simplify.js](http://mourner.github.io/simplify-js/).

**Kind**: global function  
**Author:** Vladimir Agafonkin  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | An Array of points that represent a polygon. |
| [tolerance] | <code>Number</code> | <code>1</code> | Affects the amount of simplification (in the same metric as the point coordinates). |
| [highestQuality] | <code>Boolean</code> | <code>false</code> | Excludes distance-based preprocessing step which leads to highest quality simplification but runs ~10-20 times slower. |

<a name="LargestRect"></a>

### LargestRect : <code>Object</code>
The returned Object of the largestRect function.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| width | <code>Number</code> | The width of the rectangle |
| height | <code>Number</code> | The height of the rectangle |
| cx | <code>Number</code> | The x coordinate of the rectangle's center |
| cy | <code>Number</code> | The y coordinate of the rectangle's center |
| angle | <code>Number</code> | The rotation angle of the rectangle in degrees. The anchor of rotation is the center point. |
| area | <code>Number</code> | The area of the largest rectangle. |
| points | <code>Array</code> | An array of x/y coordinates for each point in the rectangle, useful for rendering paths. |



###### <sub>Documentation generated on Tue, 14 Feb 2017 17:32:47 GMT</sub>
