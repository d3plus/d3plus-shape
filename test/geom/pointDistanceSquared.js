import test from "zora";
import {default as pointDistanceSquared} from "../../src/geom/pointDistanceSquared";

test("geom/pointDistanceSquared", assert => {

  assert.equal(50, pointDistanceSquared([0, 0], [5, 5]), "euclidean distance");

});

export default test;
