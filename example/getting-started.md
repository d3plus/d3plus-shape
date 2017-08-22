[width]: 360
[height]: 150

# Drawing Rectangles

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
