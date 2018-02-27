import test from "zora";
import {default as shapeEdgePoint} from "../../src/geom/shapeEdgePoint";

test("geom/shapeEdgePoint", assert => {

  assert.equal(JSON.stringify([7, 7]), JSON.stringify(shapeEdgePoint(Math.PI * 0.25, 10).map(Math.round)), "circle");
  assert.equal(JSON.stringify([10, 10]), JSON.stringify(shapeEdgePoint(Math.PI * 0.25, 10, "square").map(Math.round)), "square - quadrant 4");
  assert.equal(JSON.stringify([-10, 10]), JSON.stringify(shapeEdgePoint(Math.PI * 0.75, 10, "square").map(Math.round)), "square - quadrant 3");
  assert.equal(JSON.stringify([-10, -10]), JSON.stringify(shapeEdgePoint(Math.PI * 1.25, 10, "square").map(Math.round)), "square - quadrant 2");
  assert.equal(JSON.stringify([10, -10]), JSON.stringify(shapeEdgePoint(Math.PI * 1.75, 10, "square").map(Math.round)), "square - quadrant 1");

});

export default test;
