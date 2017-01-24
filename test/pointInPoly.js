import {test} from "tape";
import {default as pointInPoly} from "../src/geom/pointInPoly";

test("geom/pointInPoly", assert => {

  assert.equal(true, pointInPoly([2, 2], [[0, 0], [4, 0], [4, 4], [0, 4]]), "inside");
  assert.equal(false, pointInPoly([4, 2], [[0, 0], [4, 0], [4, 4], [0, 4]]), "edge");
  assert.equal(false, pointInPoly([4, 4], [[0, 0], [4, 0], [4, 4], [0, 4]]), "vertex");
  assert.equal(false, pointInPoly([6, 2], [[0, 0], [4, 0], [4, 4], [0, 4]]), "outside");
  assert.end();

});
