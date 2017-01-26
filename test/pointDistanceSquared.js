import {test} from "tape";
import {default as pointDistanceSquared} from "../src/geom/pointDistanceSquared";

test("geom/pointDistanceSquared", assert => {

  assert.equal(50, pointDistanceSquared([0, 0], [5, 5]), "euclidean distance");
  assert.end();

});
