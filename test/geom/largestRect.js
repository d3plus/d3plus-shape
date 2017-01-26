import {test} from "tape";
import {default as largestRect} from "../src/geom/largestRect";

test("geom/largestRect", assert => {

  const poly = [[40, 0], [80, 40], [40, 80], [0, 40], [40, 0]];

  let rect = largestRect(poly);
  assert.equal(JSON.stringify([[40, 1], [79, 40], [40, 79], [1, 40], [40, 1]]), JSON.stringify(rect.points.map(d => d.map(Math.round))), "default options");

  rect = largestRect(poly, {angle: 0});
  assert.equal(JSON.stringify([[21, 21], [59, 21], [59, 59], [21, 59], [21, 21]]), JSON.stringify(rect.points.map(d => d.map(Math.round))), "angle option");

  assert.end();

});
