import {test} from "tape";
import {default as rotatePoint} from "../src/geom/rotatePoint";

test("geom/rotatePoint", assert => {

  assert.equal(JSON.stringify([-4, -4]), JSON.stringify(rotatePoint([4, 4], Math.PI).map(Math.round)), "default origin");
  assert.equal(JSON.stringify([-0, 0]), JSON.stringify(rotatePoint([4, 4], Math.PI, [2, 2]).map(Math.round)), "custom origin");
  assert.end();

});
