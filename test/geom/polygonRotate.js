import {test} from "zora";
import {default as polygonRotate} from "../../src/geom/polygonRotate";

test("geom/polygonRotate", assert => {

  const def = polygonRotate([[2, 0], [4, 4], [0, 4]], Math.PI).map(p => p.map(Math.round));
  assert.equal(JSON.stringify([[-2, 0], [-4, -4], [0, -4]]), JSON.stringify(def), "default origin");

  const org = polygonRotate([[2, 0], [4, 4], [0, 4]], Math.PI, [2, 2]).map(p => p.map(Math.round));
  assert.equal(JSON.stringify([[2, 4], [0, 0], [4, 0]]), JSON.stringify(org), "custom origin");

});

export default test;
