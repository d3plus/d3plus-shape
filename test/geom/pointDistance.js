import zora from "zora";
import {default as pointDistance} from "../../src/geom/pointDistance";

export default zora()
  .test("geom/pointDistance", assert => {

    assert.equal(Math.sqrt(50), pointDistance([0, 0], [5, 5]), "distance");

  });
