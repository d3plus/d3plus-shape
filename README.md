# d3plus-shape

[![NPM Release](http://img.shields.io/npm/v/d3plus-shape.svg?style=flat-square)](https://www.npmjs.org/package/d3plus-shape)
[![Build Status](https://travis-ci.org/d3plus/d3plus-shape.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-shape.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-shape)

Fancy SVG shapes for visualizations

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
In a vanilla environment, a `d3plus` global is exported. To use a compiled version hosted on [d3plus.org](https://d3plus.org) that includes all dependencies:

```html
<script src="https://d3plus.org/js/d3plus-shape.v0.6.full.min.js"></script>
```

Otherwise, [click here](https://github.com/d3plus/d3plus-shape/releases/latest) to download the latest release.

<a name="install.amd"></a>
### AMD and CommonJS
The released bundle natively supports both AMD and CommonJS, in addition to vanilla environments.

<a name="install.custom"></a>
### Custom Builds
The source code is written using standard `import` and `export` statements. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. Take a look at the [index.js](https://github.com/d3plus/d3plus-shape/blob/master/index.js) file to see the modules exported.

---

# API Reference
## Functions

<dl>
<dt><a href="#image">image([data])</a></dt>
<dd><p>Creates SVG images based on an array of data. If <em>data</em> is specified, immediately draws the images based on the specified array and returns this generator. If <em>data</em> is not specified on instantiation, it can be passed/updated after instantiation using the <a href="#image.data">data</a> method.</p>
</dd>
<dt><a href="#rect">rect([data])</a></dt>
<dd><p>Creates SVG rectangles based on an array of data. If <em>data</em> is specified, immediately draws squares based on the specified array and returns this generator. If <em>data</em> is not specified on instantiation, it can be passed/updated after instantiation using the <a href="#rect.data">data</a> method.</p>
</dd>
</dl>

<a name="image"></a>

## image([data])
Creates SVG images based on an array of data. If *data* is specified, immediately draws the images based on the specified array and returns this generator. If *data* is not specified on instantiation, it can be passed/updated after instantiation using the [data](#image.data) method.

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>Array</code> | <code>[]</code> | 

**Example** *(a sample row of data)*  
```js
var data = {"url": "file.png", "width": "100", "height": "50"};
```
**Example** *(passed to the generator)*  
```js
image([data]);
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

* [image([data])](#image)
    * [.data([*data*])](#image.data)
    * [.duration([*ms*])](#image.duration)
    * [.height([*value*])](#image.height)
    * [.id([*value*])](#image.id)
    * [.select([*selector*])](#image.select)
    * [.url([*value*])](#image.url)
    * [.width([*value*])](#image.width)
    * [.x([*value*])](#image.x)
    * [.y([*value*])](#image.y)

<a name="image.data"></a>

### image.data([*data*])
If *data* is specified, sets the data array to the specified array and returns this generator. If *data* is not specified, returns the current data array. An <image> tag will be drawn for each object in the array.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*data*] | <code>Array</code> | <code>[]</code> | 

<a name="image.duration"></a>

### image.duration([*ms*])
If *ms* is specified, sets the animation duration to the specified number and returns this generator. If *ms* is not specified, returns the current animation duration.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*ms*] | <code>Number</code> | <code>600</code> | 

<a name="image.height"></a>

### image.height([*value*])
If *value* is specified, sets the height accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current height accessor.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.height;
}
```
<a name="image.id"></a>

### image.id([*value*])
If *value* is specified, sets the id accessor to the specified function and returns this generator. If *value* is not specified, returns the current id accessor. This is useful if you want to duplicate the same image.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function(d) {
  return d.url;
}
```
<a name="image.select"></a>

### image.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="image.url"></a>

### image.url([*value*])
If *value* is specified, sets the URL accessor to the specified function and returns this generator. If *value* is not specified, returns the current URL accessor.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> | 

**Example**  
```js
function(d) {
  return d.url;
}
```
<a name="image.width"></a>

### image.width([*value*])
If *value* is specified, sets the width accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current width accessor.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.width;
}
```
<a name="image.x"></a>

### image.x([*value*])
If *value* is specified, sets the x accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current x accessor.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.x || 0;
}
```
<a name="image.y"></a>

### image.y([*value*])
If *value* is specified, sets the y accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current y accessor.

**Kind**: static method of <code>[image](#image)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | 

**Example**  
```js
function(d) {
  return d.y || 0;
}
```
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
    * [.backgroundImage([*value*])](#rect.backgroundImage)
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
    * [.on([*typenames*], [*listener*])](#rect.on)
    * [.opacity([*value*])](#rect.opacity)
    * [.select([*selector*])](#rect.select)
    * [.stroke([*value*])](#rect.stroke)
    * [.strokeWidth([*value*])](#rect.strokeWidth)
    * [.textAnchor([*value*])](#rect.textAnchor)
    * [.verticalAlign([*value*])](#rect.verticalAlign)
    * [.width([*value*])](#rect.width)
    * [.x([*value*])](#rect.x)
    * [.y([*value*])](#rect.y)

<a name="rect.backgroundImage"></a>

### rect.backgroundImage([*value*])
If *value* is specified, sets the background-image accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current background-image accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>false</code> | 

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
If *value* is specified, sets the font-color accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-color accessor, which by default returns a color that contrasts the fill color. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="rect.fontFamily"></a>

### rect.fontFamily([*value*])
If *value* is specified, sets the font-family accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-family accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="rect.fontResize"></a>

### rect.fontResize([*value*])
If *value* is specified, sets the font resizing accessor to the specified function or boolean and returns this generator. If *value* is not specified, returns the current font resizing accessor. When font resizing is enabled, the font-size of the value returned by [label](#rect.label) will be resized the best fit the rectangle. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>Boolean</code> &#124; <code>Array</code> | 

<a name="rect.fontSize"></a>

### rect.fontSize([*value*])
If *value* is specified, sets the font-size accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current font-size accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

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
| [*bounds*] | <code>function</code> | Given a rectangle's width and height, the function should return an object containing the following values: `width`, `height`, `x`, `y`. If an array is returned from the function, each value will be used in conjunction with each label. |

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
If *value* is specified, sets the label accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text accessor, which is `undefined` by default. If an array is passed or returned from the function, each value will be rendered as an individual label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="rect.labelPadding"></a>

### rect.labelPadding([*value*])
If *value* is specified, sets the label padding to the specified number and returns this generator. If *value* is not specified, returns the current label padding. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> &#124; <code>Array</code> | <code>10</code> | 

<a name="rect.lineHeight"></a>

### rect.lineHeight([*value*])
If *value* is specified, sets the line-height accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current line-height accessor. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | 

<a name="rect.on"></a>

### rect.on([*typenames*], [*listener*])
Adds or removes a *listener* to each rectangle for the specified event *typenames*. If a *listener* is not specified, returns the currently-assigned listener for the specified event *typename*. Mirrors the core [d3-selection](https://github.com/d3/d3-selection#selection_on) behavior.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type |
| --- | --- |
| [*typenames*] | <code>String</code> | 
| [*listener*] | <code>function</code> | 

<a name="rect.opacity"></a>

### rect.opacity([*value*])
If *value* is specified, sets the opacity accessor to the specified function or number and returns this generator. If *value* is not specified, returns the current opacity accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>Number</code> | <code>1</code> | 

<a name="rect.select"></a>

### rect.select([*selector*])
If *selector* is specified, sets the SVG container element to the specified d3 selector or DOM element and returns this generator. If *selector* is not specified, returns the current SVG container element.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*selector*] | <code>String</code> &#124; <code>HTMLElement</code> | <code>d3.select(&quot;body&quot;).append(&quot;svg&quot;)</code> | 

<a name="rect.stroke"></a>

### rect.stroke([*value*])
If *value* is specified, sets the stroke accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> | <code>&quot;black&quot;</code> | 

<a name="rect.strokeWidth"></a>

### rect.strokeWidth([*value*])
If *value* is specified, sets the stroke-width accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current stroke-width accessor.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>Number</code> | <code>0</code> | 

<a name="rect.textAnchor"></a>

### rect.textAnchor([*value*])
If *value* is specified, sets the text-anchor accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current text-anchor accessor, which is `"start"` by default. Accepted values are `"start"`, `"middle"`, and `"end"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;start&quot;</code> | 

<a name="rect.verticalAlign"></a>

### rect.verticalAlign([*value*])
If *value* is specified, sets the vertical alignment accessor to the specified function or string and returns this generator. If *value* is not specified, returns the current vertical alignment accessor, which is `"top"` by default. Accepted values are `"top"`, `"middle"`, and `"bottom"`. If an array is passed or returned from the function, each value will be used in conjunction with each label.

**Kind**: static method of <code>[rect](#rect)</code>  

| Param | Type | Default |
| --- | --- | --- |
| [*value*] | <code>function</code> &#124; <code>String</code> &#124; <code>Array</code> | <code>&quot;start&quot;</code> | 

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
