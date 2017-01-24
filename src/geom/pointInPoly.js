/**
    @function rayIntersectsSegment
    @desc Checks whether the horizontal ray going through point p intersects the segment p1p2. Implementation from: [http://rosettacode.org/wiki/Ray-casting_algorithm/CoffeeScript](http://rosettacode.org/wiki/Ray-casting_algorithm/CoffeeScript).
    @param {Array} p The point which is used to cast a horizontal ray, which should always be an `[x, y]` formatted Array.
    @param {Array} p1 The first point of the line segment, which should always be an `[x, y]` formatted Array.
    @param {Array} p2 The second point of the line segment, which should always be an `[x, y]` formatted Array.
    @returns {Boolean}
    @private
*/
function rayIntersectsSegment(p, p1, p2) {
  const [a, b] = p1[1] < p2[1] ? [p1, p2] : [p2, p1];
  if (p[1] === b[1] || p[1] === a[1]) p[1] += Number.MIN_VALUE;
  if (p[1] > b[1] || p[1] < a[1]) return false;
  else if (p[0] > a[0] && p[0] > b[0]) return false;
  else if (p[0] < a[0] && p[0] < b[0]) return true;
  else {
    const mAB = (b[1] - a[1]) / (b[0] - a[0]);
    const mAP = (p[1] - a[1]) / (p[0] - a[0]);
    return mAP > mAB;
  }
}

/**
    @function pointInPoly
    @desc Checks whether the point p is inside a polygon using the Ray-Casting algorithm. Implementation from: [http://rosettacode.org/wiki/Ray-casting_algorithm/CoffeeScript](http://rosettacode.org/wiki/Ray-casting_algorithm/CoffeeScript).
    @param {Array} p The point to be checked, which should always be an `[x, y]` formatted Array.
    @param {Array} poly An Array of points to be used as the polygon.
    @returns {Boolean}
*/
export default function(p, poly) {
  let i = -1;
  const n = poly.length;
  let b = poly[n - 1];
  let c = 0;
  while (++i < n) {
    const a = b;
    b = poly[i];
    if (rayIntersectsSegment(p, a, b)) c++;
  }
  return c % 2 !== 0;
}
