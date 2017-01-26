import {test} from "tape";
import {default as lineIntersection} from "../../src/geom/lineIntersection";

test("geom/lineIntersection", assert => {

  const point = JSON.stringify([2, 2]);
  assert.equal(point, JSON.stringify(lineIntersection([0, 0], [4, 4], [4, 0], [0, 4])), "crossing segments");
  assert.equal(point, JSON.stringify(lineIntersection([0, 0], [2, 2], [4, 0], [0, 4])), "touching segments");
  assert.equal(point, JSON.stringify(lineIntersection([0, 0], [1, 1], [4, 0], [0, 4])), "non-touching segments");
  assert.equal(null, lineIntersection([0, 0], [1, 1], [1, 0], [2, 1]), "parallel segments");
  assert.end();

});
