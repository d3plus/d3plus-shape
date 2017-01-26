import {default as pointDistance} from "./pointDistance";
import {default as shapeEdgePoint} from "./shapeEdgePoint";

const pi = Math.PI;

/**
    @function path2polygon
    @desc Transforms a path string into an Array of points.
    @param {String} path An SVG string path, commonly the "d" property of a <path> element.
    @param {Number} [segmentLength = 20] The lenght of line segments when converting curves line segments. Higher values lower computation time, but will result in curves that are more rigid.
    @returns {Array}
*/
export default (path, segmentLength = 20) => {

  const poly = [],
        regex = /([MLA])([^MLAZ]+)/ig;

  let match = regex.exec(path);
  while (match !== null) {

    if (["M", "L"].includes(match[1])) poly.push(match[2].split(",").map(Number));
    else if (match[1] === "A") {

      const points = match[2].split(",").map(Number);

      const last = points.slice(points.length - 2, points.length),
            prev = poly[poly.length - 1],
            radius = points[0],
            width = pointDistance(prev, last);

      let angle = Math.acos((radius * radius + radius * radius - width * width) / (2 * radius * radius));
      if (points[2]) angle = pi * 2 - angle;

      const step = angle / (angle / (pi * 2) * (radius * pi * 2) / segmentLength);
      const start = Math.atan2(-prev[1], -prev[0]) - pi;
      let i = step;
      while (i < angle) {
        poly.push(shapeEdgePoint(start + i, radius));
        i += step;
      }
      poly.push(last);

    }
    match = regex.exec(path);

  }

  return poly;

};
