import {test} from "tape";
import {default as segmentBoxContains} from "../src/geom/segmentBoxContains";

test("geom/segmentBoxContains", assert => {

  assert.equal(true, segmentBoxContains([0, 0], [4, 4], [2, 2]), "inside");
  assert.equal(true, segmentBoxContains([0, 0], [4, 4], [2, 0]), "edge");
  assert.equal(false, segmentBoxContains([0, 0], [4, 4], [5, 5]), "outside");
  assert.end();

});
