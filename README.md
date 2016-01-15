# d3plus-shape

[![NPM Release](http://img.shields.io/npm/v/d3plus-shape.svg?style=flat-square)](https://www.npmjs.org/package/d3plus-shape)
[![Build Status](https://travis-ci.org/d3plus/d3plus-shape.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-shape.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/dev/d3plus/d3plus-shape.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-shape#info=devDependencies)

A javascript library that draws data-driven shapes to DOM using the popular [d3](https://d3js.org) library.

## Installing

If you use NPM, `npm install d3plus-shape`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-shape/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3js.org](https://d3js.org) and [d3plus.org](https://d3plus.org):

```html
<script src="https://d3js.org/d3.v3.min.js"></script>
<script src="https://d3plus.org/js/d3plus-color.v0.2.min.js"></script>
<script src="https://d3plus.org/js/d3plus-shape.v0.3.min.js"></script>
```

In a vanilla environment, a `d3plus_shape` global is exported.

---

# API Reference
<a name="rect"></a>
## rect([data])
Creates SVG rectangles based on an array of data. If *data* is specified, immediately draws squares based on the specified array and returns this rectangle generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#rect.data) method.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Array</code> | <code>[]</code> | 

**Example** *(a sample row of data)*  
```js
var data = {"id": 0, "x": 100, "y": 50, "width": 200, "height": 100};
```
**Example** *(passed to the generator)*  
```js
rect([data]);
```
**Example** *(creates the following)*  
```js
<g class="d3plus-shape-rect" id="d3plus-shape-rect-0" transform="translate(100,50)">
  <rect width="200" height="100" x="-100" y="-50" fill="black"></rect>
</g>
```

* [rect([data])](#rect)
    * [.data([*data*])](#rect.data)
    * [.fill([*value*])](#rect.fill)
    * [.height([*value*])](#rect.height)
    * [.id([*value*])](#rect.id)
    * [.innerBounds([*bounds*])](#rect.innerBounds)
    * [.label([*value*])](#rect.label)
    * [.select([*selector*])](#rect.select)
    * [.timing([*ms*])](#rect.timing)
    * [.width([*value*])](#rect.width)
    * [.x([*value*])](#rect.x)
    * [.y([*value*])](#rect.y)

<a name="rect.data"></a>
### rect.data([*data*])
If *data* is specified, sets the data array to the specified array and returns this rectangle generator. If *data* is not specified, returns the current data array. A rectangle will be drawn for each object in the array.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="rect.fill"></a>
### rect.fill([*value*])
If *value* is specified, sets the fill accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current fill accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;black&quot;</code> | 

<a name="rect.height"></a>
### rect.height([*value*])
If *value* is specified, sets the height accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current height accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.height;
}
```
<a name="rect.id"></a>
### rect.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns this rectangle generator. If *value* is not specified, returns the current id accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function(d) {
  return d.id;
}
```
<a name="rect.innerBounds"></a>
### rect.innerBounds([*bounds*])
If *bounds* is specified, sets the inner bounds to the specified function and returns this rectangle generator. If *bounds* is not specified, returns the current inner bounds accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [*bounds*] | <code>function</code> | Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`. |

**Example**  
```js
function(w, h) {
  return {
    "width": w,
    "height": h,
    "x": -w / 2,
    "y": -h / 2
  };
}
      
```
<a name="rect.label"></a>
### rect.label([*value*])
If *value* is specified, sets the label accessor to the specified function or string and returns this rectangle generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="rect.select"></a>
### rect.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this rectangle generator. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="rect.timing"></a>
### rect.timing([*ms*])
If *ms* is specified, sets the animation timing to the specified number and returns this rectangle generator. If *ms* is not specified, returns the current animation timing.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*ms*] | <code>Number</code> | <code>600</code> | 

<a name="rect.width"></a>
### rect.width([*value*])
If *value* is specified, sets the width accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current width accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.width;
}
```
<a name="rect.x"></a>
### rect.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.x;
}
```
<a name="rect.y"></a>
### rect.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns this rectangle generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y;
}
```
