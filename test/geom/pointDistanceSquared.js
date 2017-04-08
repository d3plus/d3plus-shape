import zora from "zora";
import {default as pointDistanceSquared} from "../../src/geom/pointDistanceSquared";

export default zora()
  .test("geom/pointDistanceSquared", assert => {

    assert.equal(50, pointDistanceSquared([0, 0], [5, 5]), "euclidean distance");

  });
