import test from "zora";
import {default as segmentsIntersect} from "../../src/geom/segmentsIntersect";

test("geom/segmentsIntersect", assert => {

  assert.equal(true, segmentsIntersect([0, 0], [4, 4], [4, 0], [0, 4]), "cross");
  assert.equal(true, segmentsIntersect([0, 0], [4, 4], [4, 0], [4, 4]), "vertex");
  assert.equal(false, segmentsIntersect([0, 0], [4, 4], [4, 0], [4, 2]), "false");
  assert.equal(false, segmentsIntersect([0, 0], [0, 4], [4, 0], [4, 4]), "parallel");

});

export default test;
