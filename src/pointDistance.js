/**
    @function distance
    @desc Calculates the pixel distance between two points.
    @param {Array|Object} p1 The first point, either an Array formatted like `[x, y]` or a keyed object formatted like `{x, y}`.
    @param {Array|Object} p2 The second point, either an Array formatted like `[x, y]` or a keyed object formatted like `{x, y}`
    @returns {Number}
*/
export default function(p1, p2) {
  if (!(p1 instanceof Array)) p1 = [p1.x, p1.y];
  if (!(p2 instanceof Array)) p2 = [p2.x, p2.y];
  const xx = Math.abs(p1[0] - p2[0]);
  const yy = Math.abs(p1[1] - p2[1]);
  return Math.sqrt(xx * xx + yy * yy);
}
