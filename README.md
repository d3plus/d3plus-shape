# d3plus-shape

[![NPM Release](http://img.shields.io/npm/v/d3plus-shape.svg?style=flat)](https://www.npmjs.org/package/d3plus-shape) [![Build Status](https://travis-ci.org/d3plus/d3plus-shape.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-shape) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-shape.svg?style=flat)](https://david-dm.org/d3plus/d3plus-shape) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/) [![1.0 progress](https://img.shields.io/badge/1.0_progress-75%25-yellow.svg?style=flat)](https://github.com/d3plus/d3plus-shape/projects/1)

Fancy SVG shapes for visualizations

## Installing

If you use NPM, run `npm install d3plus-shape --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-shape/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-shape.v0.14.full.min.js"></script>
```

[width]: 360
[height]: 150

## Drawing Rectangles

Let's say you want to draw 2 rectangles with distinct labels and colors. If you structure your data like this:

```js
var data = [
  {text: "Box #1", width: 200, height: 150, x: 100, y: 75,  color: "cornflowerblue"},
  {text: "Box #2", width: 150, height: 100, x: 285, y: 100, color: "firebrick"}
];
```

It can be passed to the [Rect](http://d3plus.org/docs/#Rect) class like this:

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

 * [Drawing Area Shapes](http://d3plus.org/examples/d3plus-shape/area/)

## API Reference

##### 
* [Image](#Image)
* [Area](#Area)
* [Bar](#Bar)
* [Circle](#Circle)
* [Line](#Line)
* [Path](#Path)
* [Rect](#Rect)
* [Shape](#Shape)

##### 
* [largestRect](#largestRect) - An angle of zero means that the longer side of the polygon (the width) will be aligned with the x axis. An angle of 90 and/or -90 means that the longer side of the polygon (the width) will be aligned with the y axis. The value can be a number between -90 and 90 specifying the angle of rotation of the polygon, a string which is parsed to a number, or an array of numbers specifying the possible rotations of the polygon.
* [lineIntersection](#lineIntersection) - Finds the intersection point (if there is one) of the lines p1q1 and p2q2.
* [path2polygon](#path2polygon) - Transforms a path string into an Array of points.
* [pointDistance](#pointDistance) - Calculates the pixel distance between two points.
* [pointDistanceSquared](#pointDistanceSquared) - Returns the squared euclidean distance between two points.
* [pointRotate](#pointRotate) - Rotates a point around a given origin.
* [polygonInside](#polygonInside) - Checks if one polygon is inside another polygon.
* [polygonRayCast](#polygonRayCast) - Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.
* [polygonRotate](#polygonRotate) - Rotates a point around a given origin.
* [segmentBoxContains](#segmentBoxContains) - Checks whether a point is inside the bounding box of a line segment.
* [segmentsIntersect](#segmentsIntersect) - Checks whether the line segments p1q1 && p2q2 intersect.
* [shapeEdgePoint](#shapeEdgePoint) - Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.
* [largestRect](#largestRect) - Simplifies the points of a polygon using both the Ramer-Douglas-Peucker algorithm and basic distance-based simplification. Adapted to an ES6 module from the excellent [Simplify.js](http://mourner.github.io/simplify-js/).

##### 
* [LargestRect](#LargestRect) - The returned Object of the largestRect function.

---

<a name="Image"></a>
#### **Image** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L6)


This is a global class.


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


<a name="new_Image_new" href="#new_Image_new">#</a> new **Image**()

Creates SVG images based on an array of data.



a sample row of data

```js
var data = {"url": "file.png", "width": "100", "height": "50"};
```
passed to the generator

```js
new Image().data([data]).render();
```
creates the following

```js
<image class="d3plus-Image" opacity="1" href="file.png" width="100" height="50" x="0" y="0"></image>
```
this is shorthand for the following

```js
image().data([data])();
```
which also allows a post-draw callback function

```js
image().data([data])(function() { alert("draw complete!"); })
```


<a name="Image.render" href="#Image.render">#</a> Image.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L45)

Renders the current Image to the page. If a *callback* is specified, it will be called once the images are done drawing.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.data" href="#Image.data">#</a> Image.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L109)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.duration" href="#Image.duration">#</a> Image.**duration**([*ms*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L119)

If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.height" href="#Image.height">#</a> Image.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L133)

If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.height;
}
```


<a name="Image.id" href="#Image.id">#</a> Image.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L147)

If *value* is specified, sets the id accessor to the specified function and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.id;
}
```


<a name="Image.pointerEvents" href="#Image.pointerEvents">#</a> Image.**pointerEvents**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L157)

If *value* is specified, sets the pointer-events accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.select" href="#Image.select">#</a> Image.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L167)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


<a name="Image.url" href="#Image.url">#</a> Image.**url**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L181)

If *value* is specified, sets the URL accessor to the specified function and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.url;
}
```


<a name="Image.width" href="#Image.width">#</a> Image.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L195)

If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.width;
}
```


<a name="Image.x" href="#Image.x">#</a> Image.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L209)

If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x || 0;
}
```


<a name="Image.y" href="#Image.y">#</a> Image.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Image.js#L223)

If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Image</code>](#Image), and is chainable with other methods of this Class.


```js
function(d) {
  return d.y || 0;
}
```

---

<a name="Area"></a>
#### **Area** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L12)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Area](#Area) ⇐ [<code>Shape</code>](#Shape)
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


<a name="new_Area_new" href="#new_Area_new">#</a> new **Area**()

Creates SVG areas based on an array of data.





<a name="Area.render" href="#Area.render">#</a> Area.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L113)

Draws the area polygons.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.curve" href="#Area.curve">#</a> Area.**curve**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L156)

If *value* is specified, sets the area curve to the specified string and returns the current class instance. If *value* is not specified, returns the current area curve.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.defined" href="#Area.defined">#</a> Area.**defined**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L166)

If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.x" href="#Area.x">#</a> Area.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L176)

If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x accessor.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.x0" href="#Area.x0">#</a> Area.**x0**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L189)

If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x0 accessor.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.x1" href="#Area.x1">#</a> Area.**x1**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L202)

If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current x1 accessor.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.y" href="#Area.y">#</a> Area.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L212)

If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y accessor.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.y0" href="#Area.y0">#</a> Area.**y0**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L225)

If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y0 accessor.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.


<a name="Area.y1" href="#Area.y1">#</a> Area.**y1**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Area.js#L238)

If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance. If *value* is not specified, returns the current y1 accessor.


This is a static method of [<code>Area</code>](#Area), and is chainable with other methods of this Class.

---

<a name="Bar"></a>
#### **Bar** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Bar](#Bar) ⇐ [<code>Shape</code>](#Shape)
    * [new Bar()](#new_Bar_new)
    * [.render([*callback*])](#Bar.render) ↩︎
    * [.height([*value*])](#Bar.height) ↩︎
    * [.width([*value*])](#Bar.width) ↩︎
    * [.x0([*value*])](#Bar.x0) ↩︎
    * [.x1([*value*])](#Bar.x1) ↩︎
    * [.y0([*value*])](#Bar.y0) ↩︎
    * [.y1([*value*])](#Bar.y1) ↩︎


<a name="new_Bar_new" href="#new_Bar_new">#</a> new **Bar**()

Creates SVG areas based on an array of data.





<a name="Bar.render" href="#Bar.render">#</a> Bar.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L45)

Draws the bars.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.height" href="#Bar.height">#</a> Bar.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L157)

If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


```js
function(d) {
  return d.height;
}
```


<a name="Bar.width" href="#Bar.width">#</a> Bar.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L171)

If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


```js
function(d) {
  return d.width;
}
```


<a name="Bar.x0" href="#Bar.x0">#</a> Bar.**x0**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L181)

If *value* is specified, sets the x0 accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.x1" href="#Bar.x1">#</a> Bar.**x1**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L194)

If *value* is specified, sets the x1 accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.y0" href="#Bar.y0">#</a> Bar.**y0**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L204)

If *value* is specified, sets the y0 accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.


<a name="Bar.y1" href="#Bar.y1">#</a> Bar.**y1**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Bar.js#L217)

If *value* is specified, sets the y1 accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Bar</code>](#Bar), and is chainable with other methods of this Class.

---

<a name="Circle"></a>
#### **Circle** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Circle.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Circle](#Circle) ⇐ [<code>Shape</code>](#Shape)
    * [new Circle()](#new_Circle_new)
    * [.render([*callback*])](#Circle.render) ↩︎
    * [.r([*value*])](#Circle.r) ↩︎


<a name="new_Circle_new" href="#new_Circle_new">#</a> new **Circle**()

Creates SVG circles based on an array of data.





<a name="Circle.render" href="#Circle.render">#</a> Circle.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Circle.js#L47)

Draws the circles.


This is a static method of [<code>Circle</code>](#Circle), and is chainable with other methods of this Class.


<a name="Circle.r" href="#Circle.r">#</a> Circle.**r**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Circle.js#L89)

If *value* is specified, sets the radius accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Circle</code>](#Circle), and is chainable with other methods of this Class.


```js
function(d) {
  return d.r;
}
```

---

<a name="Line"></a>
#### **Line** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Line.js#L11)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Line](#Line) ⇐ [<code>Shape</code>](#Shape)
    * [new Line()](#new_Line_new)
    * [.render([*callback*])](#Line.render) ↩︎
    * [.curve([*value*])](#Line.curve) ↩︎
    * [.defined([*value*])](#Line.defined) ↩︎


<a name="new_Line_new" href="#new_Line_new">#</a> new **Line**()

Creates SVG lines based on an array of data.





<a name="Line.render" href="#Line.render">#</a> Line.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Line.js#L84)

Draws the lines.


This is a static method of [<code>Line</code>](#Line), and is chainable with other methods of this Class.


<a name="Line.curve" href="#Line.curve">#</a> Line.**curve**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Line.js#L129)

If *value* is specified, sets the line curve to the specified string and returns the current class instance. If *value* is not specified, returns the current line curve.


This is a static method of [<code>Line</code>](#Line), and is chainable with other methods of this Class.


<a name="Line.defined" href="#Line.defined">#</a> Line.**defined**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Line.js#L139)

If *value* is specified, sets the defined accessor to the specified function and returns the current class instance. If *value* is not specified, returns the current defined accessor.


This is a static method of [<code>Line</code>](#Line), and is chainable with other methods of this Class.

---

<a name="Path"></a>
#### **Path** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Path.js#L7)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Path](#Path) ⇐ [<code>Shape</code>](#Shape)
    * [new Path()](#new_Path_new)
    * [.render([*callback*])](#Path.render) ↩︎
    * [.d([*value*])](#Path.d) ↩︎


<a name="new_Path_new" href="#new_Path_new">#</a> new **Path**()

Creates SVG Paths based on an array of data.





<a name="Path.render" href="#Path.render">#</a> Path.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Path.js#L50)

Draws the paths.


This is a static method of [<code>Path</code>](#Path), and is chainable with other methods of this Class.


<a name="Path.d" href="#Path.d">#</a> Path.**d**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Path.js#L83)

If *value* is specified, sets the "d" attribute accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Path</code>](#Path), and is chainable with other methods of this Class.


```js
function(d) {
  return d.path;
}
```

---

<a name="Rect"></a>
#### **Rect** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L5)


This is a global class, and extends all of the methods and functionality of [<code>Shape</code>](#Shape).


* [Rect](#Rect) ⇐ [<code>Shape</code>](#Shape)
    * [new Rect()](#new_Rect_new)
    * [.render([*callback*])](#Rect.render) ↩︎
    * [.height([*value*])](#Rect.height) ↩︎
    * [.width([*value*])](#Rect.width) ↩︎


<a name="new_Rect_new" href="#new_Rect_new">#</a> new **Rect**()

Creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-shape/getting-started/) for help getting started using the rectangle generator.





<a name="Rect.render" href="#Rect.render">#</a> Rect.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L32)

Draws the rectangles.


This is a static method of [<code>Rect</code>](#Rect), and is chainable with other methods of this Class.


<a name="Rect.height" href="#Rect.height">#</a> Rect.**height**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L90)

If *value* is specified, sets the height accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Rect</code>](#Rect), and is chainable with other methods of this Class.


```js
function(d) {
  return d.height;
}
```


<a name="Rect.width" href="#Rect.width">#</a> Rect.**width**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Rect.js#L104)

If *value* is specified, sets the width accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Rect</code>](#Rect), and is chainable with other methods of this Class.


```js
function(d) {
  return d.width;
}
```

---

<a name="Shape"></a>
#### **Shape** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L19)


This is a global class, and extends all of the methods and functionality of [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass).


* [Shape](#Shape) ⇐ [<code>BaseClass</code>](https://github.com/d3plus/d3plus-common#BaseClass)
    * [new Shape()](#new_Shape_new)
    * [.render([*callback*])](#Shape.render) ↩︎
    * [.active([*value*])](#Shape.active) ↩︎
    * [.activeOpacity(*value*)](#Shape.activeOpacity) ↩︎
    * [.activeStyle(*value*)](#Shape.activeStyle) ↩︎
    * [.ariaLabel(*value*)](#Shape.ariaLabel) ↩︎
    * [.backgroundImage([*value*])](#Shape.backgroundImage) ↩︎
    * [.data([*data*])](#Shape.data) ↩︎
    * [.duration([*ms*])](#Shape.duration) ↩︎
    * [.fill([*value*])](#Shape.fill) ↩︎
    * [.fillOpacity([*value*])](#Shape.fillOpacity) ↩︎
    * [.hover([*value*])](#Shape.hover) ↩︎
    * [.hoverStyle(*value*)](#Shape.hoverStyle) ↩︎
    * [.hoverOpacity([*value*])](#Shape.hoverOpacity) ↩︎
    * [.hitArea([*bounds*])](#Shape.hitArea) ↩︎
    * [.id([*value*])](#Shape.id) ↩︎
    * [.label([*value*])](#Shape.label) ↩︎
    * [.labelBounds([*bounds*])](#Shape.labelBounds) ↩︎
    * [.labelConfig([*value*])](#Shape.labelConfig) ↩︎
    * [.opacity([*value*])](#Shape.opacity) ↩︎
    * [.pointerEvents([*value*])](#Shape.pointerEvents) ↩︎
    * [.role(*value*)](#Shape.role) ↩︎
    * [.rotate([*value*])](#Shape.rotate) ↩︎
    * [.rx([*value*])](#Shape.rx) ↩︎
    * [.ry([*value*])](#Shape.ry) ↩︎
    * [.scale([*value*])](#Shape.scale) ↩︎
    * [.select([*selector*])](#Shape.select) ↩︎
    * [.shapeRendering([*value*])](#Shape.shapeRendering) ↩︎
    * [.sort([*value*])](#Shape.sort) ↩︎
    * [.stroke([*value*])](#Shape.stroke) ↩︎
    * [.strokeDasharray([*value*])](#Shape.strokeDasharray) ↩︎
    * [.strokeLinecap([*value*])](#Shape.strokeLinecap) ↩︎
    * [.strokeOpacity([*value*])](#Shape.strokeOpacity) ↩︎
    * [.strokeWidth([*value*])](#Shape.strokeWidth) ↩︎
    * [.textAnchor([*value*])](#Shape.textAnchor) ↩︎
    * [.vectorEffect([*value*])](#Shape.vectorEffect) ↩︎
    * [.verticalAlign([*value*])](#Shape.verticalAlign) ↩︎
    * [.x([*value*])](#Shape.x) ↩︎
    * [.y([*value*])](#Shape.y) ↩︎


<a name="new_Shape_new" href="#new_Shape_new">#</a> new **Shape**()

An abstracted class for generating shapes.





<a name="Shape.render" href="#Shape.render">#</a> Shape.**render**([*callback*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L481)

Renders the current Shape to the page. If a *callback* is specified, it will be called once the shapes are done drawing.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.active" href="#Shape.active">#</a> Shape.**active**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L600)

If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.activeOpacity" href="#Shape.activeOpacity">#</a> Shape.**activeOpacity**(*value*) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L619)

When shapes are active, this is the opacity of any shape that is not active.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.activeStyle" href="#Shape.activeStyle">#</a> Shape.**activeStyle**(*value*) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L629)

The style to apply to active shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.ariaLabel" href="#Shape.ariaLabel">#</a> Shape.**ariaLabel**(*value*) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L639)

If *value* is specified, sets the aria-label attribute to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.backgroundImage" href="#Shape.backgroundImage">#</a> Shape.**backgroundImage**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L651)

If *value* is specified, sets the background-image accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.data" href="#Shape.data">#</a> Shape.**data**([*data*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L663)

If *data* is specified, sets the data array to the specified array and returns the current class instance. If *data* is not specified, returns the current data array. A shape will be drawn for each object in the array.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.duration" href="#Shape.duration">#</a> Shape.**duration**([*ms*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L675)

If *ms* is specified, sets the animation duration to the specified number and returns the current class instance. If *ms* is not specified, returns the current animation duration.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.fill" href="#Shape.fill">#</a> Shape.**fill**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L687)

If *value* is specified, sets the fill accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.fillOpacity" href="#Shape.fillOpacity">#</a> Shape.**fillOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L699)

Defines the "fill-opacity" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.hover" href="#Shape.hover">#</a> Shape.**hover**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L711)

If *value* is specified, sets the highlight accessor to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.hoverStyle" href="#Shape.hoverStyle">#</a> Shape.**hoverStyle**(*value*) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L730)

The style to apply to hovered shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.hoverOpacity" href="#Shape.hoverOpacity">#</a> Shape.**hoverOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L740)

If *value* is specified, sets the hover opacity to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.hitArea" href="#Shape.hitArea">#</a> Shape.**hitArea**([*bounds*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L759)

If *bounds* is specified, sets the mouse hit area to the specified function and returns the current class instance. If *bounds* is not specified, returns the current mouse hit area accessor.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


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


<a name="Shape.id" href="#Shape.id">#</a> Shape.**id**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L769)

If *value* is specified, sets the id accessor to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.label" href="#Shape.label">#</a> Shape.**label**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L779)

If *value* is specified, sets the label accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.labelBounds" href="#Shape.labelBounds">#</a> Shape.**labelBounds**([*bounds*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L798)

If *bounds* is specified, sets the label bounds to the specified function and returns the current class instance. If *bounds* is not specified, returns the current inner bounds accessor.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


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


<a name="Shape.labelConfig" href="#Shape.labelConfig">#</a> Shape.**labelConfig**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L808)

A pass-through to the config method of the TextBox class used to create a shape's labels.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.opacity" href="#Shape.opacity">#</a> Shape.**opacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L818)

If *value* is specified, sets the opacity accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.pointerEvents" href="#Shape.pointerEvents">#</a> Shape.**pointerEvents**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L828)

If *value* is specified, sets the pointerEvents accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.role" href="#Shape.role">#</a> Shape.**role**(*value*) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L838)

If *value* is specified, sets the role attribute to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.rotate" href="#Shape.rotate">#</a> Shape.**rotate**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L850)

If *value* is specified, sets the rotate accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.rx" href="#Shape.rx">#</a> Shape.**rx**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L860)

Defines the "rx" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.ry" href="#Shape.ry">#</a> Shape.**ry**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L870)

Defines the "rx" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.scale" href="#Shape.scale">#</a> Shape.**scale**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L880)

If *value* is specified, sets the scale accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.select" href="#Shape.select">#</a> Shape.**select**([*selector*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L890)

If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns the current class instance. If *selector* is not specified, returns the current SVG container element.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.shapeRendering" href="#Shape.shapeRendering">#</a> Shape.**shapeRendering**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L904)

If *value* is specified, sets the shape-rendering accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x;
}
```


<a name="Shape.sort" href="#Shape.sort">#</a> Shape.**sort**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L914)

If *value* is specified, sets the sort comparator to the specified function and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.stroke" href="#Shape.stroke">#</a> Shape.**stroke**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L924)

If *value* is specified, sets the stroke accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeDasharray" href="#Shape.strokeDasharray">#</a> Shape.**strokeDasharray**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L934)

Defines the "stroke-dasharray" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeLinecap" href="#Shape.strokeLinecap">#</a> Shape.**strokeLinecap**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L944)

Defines the "stroke-linecap" attribute for the shapes. Accepted values are `"butt"`, `"round"`, and `"square"`.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeOpacity" href="#Shape.strokeOpacity">#</a> Shape.**strokeOpacity**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L954)

Defines the "stroke-opacity" attribute for the shapes.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.strokeWidth" href="#Shape.strokeWidth">#</a> Shape.**strokeWidth**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L964)

If *value* is specified, sets the stroke-width accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.textAnchor" href="#Shape.textAnchor">#</a> Shape.**textAnchor**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L974)

If *value* is specified, sets the text-anchor accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.vectorEffect" href="#Shape.vectorEffect">#</a> Shape.**vectorEffect**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L984)

If *value* is specified, sets the vector-effect accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.verticalAlign" href="#Shape.verticalAlign">#</a> Shape.**verticalAlign**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L994)

If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


<a name="Shape.x" href="#Shape.x">#</a> Shape.**x**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L1008)

If *value* is specified, sets the x accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d) {
  return d.x;
}
```


<a name="Shape.y" href="#Shape.y">#</a> Shape.**y**([*value*]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/Shape/Shape.js#L1022)

If *value* is specified, sets the y accessor to the specified function or number and returns the current class instance.


This is a static method of [<code>Shape</code>](#Shape), and is chainable with other methods of this Class.


```js
function(d) {
  return d.y;
}
```

---

<a name="largestRect"></a>
#### d3plus.**largestRect**(poly, [options]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/largestRect.js#L28)

An angle of zero means that the longer side of the polygon (the width) will be aligned with the x axis. An angle of 90 and/or -90 means that the longer side of the polygon (the width) will be aligned with the y axis. The value can be a number between -90 and 90 specifying the angle of rotation of the polygon, a string which is parsed to a number, or an array of numbers specifying the possible rotations of the polygon.


This is a global function.
**Author**: Daniel Smilkov [dsmilkov@gmail.com]  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | An Array of points that represent a polygon. |
| [options] | <code>Object</code> |  | An Object that allows for overriding various parameters of the algorithm. |
| [options.angle] | <code>Number</code> \| <code>String</code> \| <code>Array</code> | <code>d3.range(-90, 95, 5)</code> | The allowed rotations of the final rectangle. |
| [options.aspectRatio] | <code>Number</code> \| <code>String</code> \| <code>Array</code> |  | The ratio between the width and height of the rectangle. The value can be a number, a string which is parsed to a number, or an array of numbers specifying the possible aspect ratios of the final rectangle. |
| [options.maxAspectRatio] | <code>Number</code> | <code>15</code> | The maximum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided. |
| [options.minAspectRatio] | <code>Number</code> | <code>1</code> | The minimum aspect ratio (width/height) allowed for the rectangle. This property should only be used if the aspectRatio is not provided. |
| [options.nTries] | <code>Number</code> | <code>20</code> | The number of randomly drawn points inside the polygon which the algorithm explores as possible center points of the maximal rectangle. |
| [options.minHeight] | <code>Number</code> | <code>0</code> | The minimum height of the rectangle. |
| [options.minWidth] | <code>Number</code> | <code>0</code> | The minimum width of the rectangle. |
| [options.tolerance] | <code>Number</code> | <code>0.02</code> | The simplification tolerance factor, between 0 and 1. A larger tolerance corresponds to more extensive simplification. |
| [options.origin] | <code>Array</code> |  | The center point of the rectangle. If specified, the rectangle will be fixed at that point, otherwise the algorithm optimizes across all possible points. The given value can be either a two dimensional array specifying the x and y coordinate of the origin or an array of two dimensional points specifying multiple possible center points of the rectangle. |
| [options.cache] | <code>Boolean</code> |  | Whether or not to cache the result, which would be used in subsequent calculations to preserve consistency and speed up calculation time. |


---

<a name="lineIntersection"></a>
#### d3plus.**lineIntersection**(p1, q1, p2, q2) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/lineIntersection.js#L1)

Finds the intersection point (if there is one) of the lines p1q1 and p2q2.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point of the first line segment, which should always be an `[x, y]` formatted Array. |
| q1 | <code>Array</code> | The second point of the first line segment, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The first point of the second line segment, which should always be an `[x, y]` formatted Array. |
| q2 | <code>Array</code> | The second point of the second line segment, which should always be an `[x, y]` formatted Array. |


---

<a name="path2polygon"></a>
#### d3plus.**path2polygon**(path, [segmentLength]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/path2polygon.js#L6)

Transforms a path string into an Array of points.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| path | <code>String</code> |  | An SVG string path, commonly the "d" property of a <path> element. |
| [segmentLength] | <code>Number</code> | <code>20</code> | The lenght of line segments when converting curves line segments. Higher values lower computation time, but will result in curves that are more rigid. |


---

<a name="pointDistance"></a>
#### d3plus.**pointDistance**(p1, p2) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/pointDistance.js#L3)

Calculates the pixel distance between two points.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The second point, which should always be an `[x, y]` formatted Array. |


---

<a name="pointDistanceSquared"></a>
#### d3plus.**pointDistanceSquared**(p1, p2) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/pointDistanceSquared.js#L1)

Returns the squared euclidean distance between two points.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The second point, which should always be an `[x, y]` formatted Array. |


---

<a name="pointRotate"></a>
#### d3plus.**pointRotate**(p, alpha, [origin]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/pointRotate.js#L1)

Rotates a point around a given origin.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| p | <code>Array</code> |  | The point to be rotated, which should always be an `[x, y]` formatted Array. |
| alpha | <code>Number</code> |  | The angle in radians to rotate. |
| [origin] | <code>Array</code> | <code>[0, 0]</code> | The origin point of the rotation, which should always be an `[x, y]` formatted Array. |


---

<a name="polygonInside"></a>
#### d3plus.**polygonInside**(polyA, polyB) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/polygonInside.js#L5)

Checks if one polygon is inside another polygon.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| polyA | <code>Array</code> | An Array of `[x, y]` points to be used as the inner polygon, checking if it is inside polyA. |
| polyB | <code>Array</code> | An Array of `[x, y]` points to be used as the containing polygon. |


---

<a name="polygonRayCast"></a>
#### d3plus.**polygonRayCast**(poly, origin, [alpha]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/polygonRayCast.js#L5)

Gives the two closest intersection points between a ray cast from a point inside a polygon. The two points should lie on opposite sides of the origin.


This is a global function.
**Returns**: <code>Array</code> - An array containing two values, the closest point on the left and the closest point on the right. If either point cannot be found, that value will be `null`.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | The polygon to test against, which should be an `[x, y]` formatted Array. |
| origin | <code>Array</code> |  | The origin point of the ray to be cast, which should be an `[x, y]` formatted Array. |
| [alpha] | <code>Number</code> | <code>0</code> | The angle in radians of the ray. |


---

<a name="polygonRotate"></a>
#### d3plus.**polygonRotate**(poly, alpha, [origin]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/polygonRotate.js#L3)

Rotates a point around a given origin.


This is a global function.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | The polygon to be rotated, which should be an Array of `[x, y]` values. |
| alpha | <code>Number</code> |  | The angle in radians to rotate. |
| [origin] | <code>Array</code> | <code>[0, 0]</code> | The origin point of the rotation, which should be an `[x, y]` formatted Array. |


---

<a name="segmentBoxContains"></a>
#### d3plus.**segmentBoxContains**(s1, s2, p) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/segmentBoxContains.js#L1)

Checks whether a point is inside the bounding box of a line segment.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| s1 | <code>Array</code> | The first point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array. |
| s2 | <code>Array</code> | The second point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array. |
| p | <code>Array</code> | The point to be checked, which should always be an `[x, y]` formatted Array. |


---

<a name="segmentsIntersect"></a>
#### d3plus.**segmentsIntersect**(p1, q1, p2, q2) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/segmentsIntersect.js#L4)

Checks whether the line segments p1q1 && p2q2 intersect.


This is a global function.

| Param | Type | Description |
| --- | --- | --- |
| p1 | <code>Array</code> | The first point of the first line segment, which should always be an `[x, y]` formatted Array. |
| q1 | <code>Array</code> | The second point of the first line segment, which should always be an `[x, y]` formatted Array. |
| p2 | <code>Array</code> | The first point of the second line segment, which should always be an `[x, y]` formatted Array. |
| q2 | <code>Array</code> | The second point of the second line segment, which should always be an `[x, y]` formatted Array. |


---

<a name="shapeEdgePoint"></a>
#### d3plus.**shapeEdgePoint**(angle, distance) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/shapeEdgePoint.js#L3)

Calculates the x/y position of a point at the edge of a shape, from the center of the shape, given a specified pixel distance and radian angle.


This is a global function.
**Returns**: <code>String</code> - [shape = "circle"] The type of shape, which can be either "circle" or "square".  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>Number</code> | The angle, in radians, of the offset point. |
| distance | <code>Number</code> | The pixel distance away from the origin. |


---

<a name="largestRect"></a>
#### d3plus.**largestRect**(poly, [tolerance], [highestQuality]) [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/simplify.js#L112)

Simplifies the points of a polygon using both the Ramer-Douglas-Peucker algorithm and basic distance-based simplification. Adapted to an ES6 module from the excellent [Simplify.js](http://mourner.github.io/simplify-js/).


This is a global function.
**Author**: Vladimir Agafonkin  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| poly | <code>Array</code> |  | An Array of points that represent a polygon. |
| [tolerance] | <code>Number</code> | <code>1</code> | Affects the amount of simplification (in the same metric as the point coordinates). |
| [highestQuality] | <code>Boolean</code> | <code>false</code> | Excludes distance-based preprocessing step which leads to highest quality simplification but runs ~10-20 times slower. |


---

<a name="LargestRect"></a>
#### **LargestRect** [<>](https://github.com/d3plus/d3plus-shape/blob/master/src/geom/largestRect.js#L16)

The returned Object of the largestRect function.


This is a global typedef.
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


---



###### <sub>Documentation generated on Fri, 15 Jun 2018 16:07:40 GMT</sub>
