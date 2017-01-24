/**
    @function pointDistance
    @desc Calculates the pixel distance between two points.
    @param {Array} p1 The first point, which should always be an `[x, y]` formatted Array.
    @param {Array} p2 The second point, which should always be an `[x, y]` formatted Array.
    @returns {Number}
*/
export default function(p1, p2) {
  const xx = Math.abs(p1[0] - p2[0]);
  const yy = Math.abs(p1[1] - p2[1]);
  return Math.sqrt(xx * xx + yy * yy);
}
