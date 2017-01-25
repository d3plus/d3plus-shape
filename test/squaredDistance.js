import {test} from "tape";
import {default as squaredDistance} from "../src/geom/squaredDistance";

test("geom/squaredDistance", assert => {

  assert.equal(50, squaredDistance([0, 0], [5, 5]), "euclidean distance");
  assert.end();

});
