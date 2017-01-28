[width]: 700
[height]: 300

# Area Generator

This generator extends the lower level functionality of the [d3-shape area generator](https://github.com/d3/d3-shape#areas), drawing the produced area to the screen, following their definition of an area:

> An area is defined by two bounding lines, either splines or polylines. Typically, the two lines share the same x-values (x0 = x1), differing only in y-value (y0 and y1); most commonly, y0 is defined as a constant representing zero. The first line (the topline) is defined by x1 and y1 and is rendered first; the second line (the baseline) is defined by x0 and y0 and is rendered second, with the points in reverse order.

In the simplest case, it only needs a few data values:

```js
var data = [
  {x: 0, y0: 300, y1: 200},
  {x: 150, y0: 100, y1: 0},
  {x: 450, y0: 300, y1: 180},
  {x: 700, y0: 140, y1: 40}
];
```

It can be passed to the [area generator](#Area) like this:

```js
new d3plus.Area()
  .data(data)
  .y0(function(d) { return d.y0; })
  .y1(function(d) { return d.y1; })
  .label("An Example D3plus Area")
  .render();
```

This is also a great example of the [largest rectangle](#largestRect) function put to use in order to find the optimal placement for the label.
