import {test} from "tape";
import {default as rotatePoly} from "../src/geom/rotatePoly";

test("geom/rotatePoly", assert => {

  const def = rotatePoly([[2, 0], [4, 4], [0, 4]], Math.PI).map(p => p.map(Math.round));
  assert.equal(JSON.stringify([[-2, 0], [-4, -4], [0, -4]]), JSON.stringify(def), "default origin");

  const org = rotatePoly([[2, 0], [4, 4], [0, 4]], Math.PI, [2, 2]).map(p => p.map(Math.round));
  assert.equal(JSON.stringify([[2, 4], [0, 0], [4, 0]]), JSON.stringify(org), "custom origin");

  assert.end();

});
