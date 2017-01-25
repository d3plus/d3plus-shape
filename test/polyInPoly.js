import {test} from "tape";
import {default as polyInPoly} from "../src/geom/polyInPoly";

test("geom/polyInPoly", assert => {

  const square = [[0, 0], [4, 0], [4, 4], [0, 4]];
  assert.equal(true, polyInPoly([[1, 1], [3, 1], [3, 3], [1, 3]], square), "inside");
  assert.equal(false, polyInPoly([[3, 1], [5, 1], [5, 3], [3, 3]], square), "overlap");
  assert.equal(false, polyInPoly([[5, 1], [8, 1], [8, 3], [5, 3]], square), "outsite");
  assert.end();

});
