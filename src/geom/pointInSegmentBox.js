/**
    @function pointInSegmentBox
    @desc Checks whether the point p is inside the bounding box of the line segment p1q1.
    @param {Array} p The point to be checked, which should always be an `[x, y]` formatted Array.
    @param {Array} p1 The first point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
    @param {Array} q1 The second point of the line segment to be used for the bounding box, which should always be an `[x, y]` formatted Array.
    @returns {Boolean}
*/
export default function(p, p1, q1) {

  // allow for some margins due to numerical errors
  const eps = 1e-9;
  const [px, py] = p;
  return !(px < Math.min(p1[0], q1[0]) - eps ||
           px > Math.max(p1[0], q1[0]) + eps ||
           py < Math.min(p1[1], q1[1]) - eps ||
           py > Math.max(p1[1], q1[1]) + eps);

}
