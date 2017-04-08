import zora from "zora";
import {default as pointRotate} from "../../src/geom/pointRotate";

export default zora()
  .test("geom/pointRotate", assert => {

    assert.equal(JSON.stringify([-4, -4]), JSON.stringify(pointRotate([4, 4], Math.PI).map(Math.round)), "default origin");
    assert.equal(JSON.stringify([-0, 0]), JSON.stringify(pointRotate([4, 4], Math.PI, [2, 2]).map(Math.round)), "custom origin");

  });
