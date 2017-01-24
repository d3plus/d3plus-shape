import {test} from "tape";
import {default as pointInSegmentBox} from "../src/geom/pointInSegmentBox";

test("geom/pointInSegmentBox", assert => {

  assert.equal(true, pointInSegmentBox([2, 2], [0, 0], [4, 4]), "inside");
  assert.equal(true, pointInSegmentBox([2, 0], [0, 0], [4, 4]), "edge");
  assert.equal(false, pointInSegmentBox([5, 5], [0, 0], [4, 4]), "outside");
  assert.end();

});
