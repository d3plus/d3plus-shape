# d3plus-shape

[![NPM Release](http://img.shields.io/npm/v/d3plus-shape.svg?style=flat-square)](https://www.npmjs.org/package/d3plus-shape)
[![Build Status](https://travis-ci.org/d3plus/d3plus-shape.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/d3plus/d3plus-shape.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-shape)
[![Dependency Status](http://img.shields.io/david/dev/d3plus/d3plus-shape.svg?style=flat-square)](https://david-dm.org/d3plus/d3plus-shape#info=devDependencies)

<a name="Abstract"></a>
## Abstract
Abstract class that all shapes extend. Contains method available to all shapes.

**Kind**: global class  

* [Abstract](#Abstract)
  * [new Abstract(container)](#new_Abstract_new)
  * [.name](#Abstract+name) ⇒ <code>String</code>
  * [.data([arr])](#Abstract+data) ⇒ <code>[Abstract](#Abstract)</code>
  * [.draw([timing])](#Abstract+draw) ⇒ <code>[Abstract](#Abstract)</code>
  * [.remove()](#Abstract+remove)

<a name="new_Abstract_new"></a>
### new Abstract(container)

| Param | Type | Description |
| --- | --- | --- |
| container | <code>selector</code> &#124; <code>node</code> | Either a selector string or an SVG node that will act as a container for any contents being drawn. |

<a name="Abstract+name"></a>
### abstract.name ⇒ <code>String</code>
A unique name for this class. Any shape that extends this class should overwrite this function with it's own unique string.

**Kind**: instance property of <code>[Abstract](#Abstract)</code>  
<a name="Abstract+data"></a>
### abstract.data([arr]) ⇒ <code>[Abstract](#Abstract)</code>
**Kind**: instance method of <code>[Abstract](#Abstract)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [arr] | <code>Array</code> | <code>[]</code> | The data array used to display the shapes. |

<a name="Abstract+draw"></a>
### abstract.draw([timing]) ⇒ <code>[Abstract](#Abstract)</code>
Draws/redraws the current group of shapes.

**Kind**: instance method of <code>[Abstract](#Abstract)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [timing] | <code>Number</code> | <code>600</code> | A number in milliseconds used for the timing of transitions. |

<a name="Abstract+remove"></a>
### abstract.remove()
Removes all shapes created with this instance.

**Kind**: instance method of <code>[Abstract](#Abstract)</code>  
<a name="Rectangle"></a>
## Rectangle
**Kind**: global class  

* [Rectangle](#Rectangle)
  * [.name](#Rectangle+name) ⇒ <code>&quot;Rectangle&quot;</code>
  * [.innerBounds()](#Rectangle+innerBounds) ⇒ <code>Object</code>

<a name="Rectangle+name"></a>
### rectangle.name ⇒ <code>&quot;Rectangle&quot;</code>
**Kind**: instance property of <code>[Rectangle](#Rectangle)</code>  
<a name="Rectangle+innerBounds"></a>
### rectangle.innerBounds() ⇒ <code>Object</code>
The inner bounding box for the rectangle.

**Kind**: instance method of <code>[Rectangle](#Rectangle)</code>  
**Example**  
```js
{
  width: 300,
  height: 200,
  x: 0,
  y: 0
}
```
