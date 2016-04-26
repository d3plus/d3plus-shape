# d3plus-shape

[![NPM Release](http://img.shields.io/npm/v/d3plus-shape.svg?style=flat-square)](https://www.npmjs.org/package/d3plus-shape)
[![Build Status](https://travis-ci.org/d3plus/d3plus-shape.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-shape.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/dev/d3plus/d3plus-shape.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-shape#info=devDependencies)

A javascript library that draws data-driven shapes to DOM using the popular [d3](https://d3js.org) library.

## Installation Options

* [NPM](#install.npm)
* [Browser](#install.browser)
* [AMD and CommonJS](#install.amd)
* [Custom Builds](#install.custom)

<a name="install.npm"></a>
### NPM
```sh
npm install d3plus-shape
```

<a name="install.browser"></a>
### Browser
In a vanilla environment, a `d3plus_shape` global is exported. To use a compiled version hosted on [d3plus.org](https://d3plus.org) that includes all dependencies:

```html
<script src="https://d3plus.org/js/d3plus-shape.v0.4.full.min.js"></script>
```

For development purposes, you can also load all dependencies separately:

```html
<script src="https://d3js.org/d3-color.v0.4.min.js"></script>
<script src="https://d3js.org/d3-dispatch.v0.4.min.js"></script>
<script src="https://d3js.org/d3-ease.v0.7.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v0.7.min.js"></script>
<script src="https://d3js.org/d3-selection.v0.7.min.js"></script>
<script src="https://d3js.org/d3-timer.v0.4.min.js"></script>
<script src="https://d3js.org/d3-transition.v0.2.min.js"></script>

<script src="https://d3plus.org/js/d3plus-color.v0.2.min.js"></script>
<script src="https://d3plus.org/js/d3plus-text.v0.4.min.js"></script>

<script src="https://d3plus.org/js/d3plus-shape.v0.4.min.js"></script>
```

Otherwise, [click here](https://github.com/d3plus/d3plus-shape/releases/latest) to download the latest release.

<a name="install.amd"></a>
### AMD and CommonJS
The released bundle natively supports both AMD and CommonJS, and vanilla environments.

<a name="install.custom"></a>
### Custom Builds
The source code is written using standard `import` and `export` statements. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. Take a look at the  [index.js](https://github.com/d3plus/d3plus-shape/blob/master/index.js) file to see the modules exported.

---

# API Reference
<a name="rect"></a>

## rect([data])
Creates SVG rectangles based on an array of data. If *data* is specified, immediately draws squares based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#rect.data) method.

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
**Example** *(this is shorthand for the following)*  
```js
rect().data([data])();
```
**Example** *(which also allows a post-draw callback function)*  
```js
rect().data([data])(function() { alert("draw complete!"); })
```

* [rect([data])](#rect)
    * [.data([*data*])](#rect.data)
    * [.duration([*ms*])](#rect.duration)
    * [.fill([*value*])](#rect.fill)
    * [.fontColor([*value*])](#rect.fontColor)
    * [.fontFamily([*value*])](#rect.fontFamily)
    * [.fontResize([*value*])](#rect.fontResize)
    * [.fontSize([*value*])](#rect.fontSize)
    * [.height([*value*])](#rect.height)
    * [.id([*value*])](#rect.id)
    * [.innerBounds([*bounds*])](#rect.innerBounds)
    * [.label([*value*])](#rect.label)
    * [.labelPadding([*value*])](#rect.labelPadding)
    * [.lineHeight([*value*])](#rect.lineHeight)
    * [.select([*selector*])](#rect.select)
    * [.textAnchor([*value*])](#rect.textAnchor)
    * [.verticalAlign([*value*])](#rect.verticalAlign)
    * [.width([*value*])](#rect.width)
    * [.x([*value*])](#rect.x)
    * [.y([*value*])](#rect.y)

<a name="rect.data"></a>

### rect.data([*data*])
If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. A rectangle will be drawn for each object in the array.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="rect.duration"></a>

### rect.duration([*ms*])
If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*ms*] | <code>Number</code> | <code>600</code> | 

<a name="rect.fill"></a>

### rect.fill([*value*])
If *value* is specified, sets the fill accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current fill accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;black&quot;</code> | 

<a name="rect.fontColor"></a>

### rect.fontColor([*value*])
If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="rect.fontFamily"></a>

### rect.fontFamily([*value*])
If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="rect.fontResize"></a>

### rect.fontResize([*value*])
If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#rect.label) will be resized the best fit the rectangle.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Boolean</code> | 

<a name="rect.fontSize"></a>

### rect.fontSize([*value*])
If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="rect.height"></a>

### rect.height([*value*])
If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.

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
If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor.

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
If *bounds* is specified, sets the inner bounds to the specified function and returns this generator. If *bounds* is not specified, returns the current inner bounds accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [*bounds*] | <code>function</code> | Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`. |

**Example**  
```js
function(shape) {
  return {
    "width": shape.width,
    "height": shape.height,
    "x": -shape.width / 2,
    "y": -shape.height / 2
  };
}
      
```
<a name="rect.label"></a>

### rect.label([*value*])
If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="rect.labelPadding"></a>

### rect.labelPadding([*value*])
If *value* is specified, sets the label padding to the specified number and returns this generator. If *value* is not specified, returns the current label padding.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>10</code> | 

<a name="rect.lineHeight"></a>

### rect.lineHeight([*value*])
If *value* is specified, sets the line-height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current line-height accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | 

<a name="rect.select"></a>

### rect.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="rect.textAnchor"></a>

### rect.textAnchor([*value*])
If *value* is specified, sets the text-anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;start&quot;</code> | 

<a name="rect.verticalAlign"></a>

### rect.verticalAlign([*value*])
If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;start&quot;</code> | 

<a name="rect.width"></a>

### rect.width([*value*])
If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.

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
If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor. The number returned should correspond to the horizontal center of the rectangle.

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
If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor. The number returned should correspond to the vertical center of the rectangle.

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
