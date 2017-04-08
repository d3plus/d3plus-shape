import zora from "zora";
import {default as polygonInside} from "../../src/geom/polygonInside";

export default zora()
  .test("geom/polygonInside", assert => {

    const square = [[0, 0], [4, 0], [4, 4], [0, 4]];
    assert.equal(true, polygonInside([[1, 1], [3, 1], [3, 3], [1, 3]], square), "inside");
    assert.equal(false, polygonInside([[3, 1], [5, 1], [5, 3], [3, 3]], square), "overlap");
    assert.equal(false, polygonInside([[5, 1], [8, 1], [8, 3], [5, 3]], square), "outsite");

  });
