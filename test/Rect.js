import {test} from "tape";
import {default as Rect} from "../src/Shape/Rect";

test("Rect", assert => {

  new Rect()
    .data([{id: "test"}])
    .duration(100)
    .height(200)
    .label(d => d.id)
    .width(100)
    .x(100)
    .y(50)
    .render(() => {

      assert.equal(document.getElementsByTagName("svg").length, 1, "automatically added <svg> element to page");
      assert.equal(document.getElementsByClassName("d3plus-Rect").length, 1, "created <g> container element");
      assert.equal(document.getElementsByTagName("rect").length, 1, "created <rect> element");
      assert.equal(document.getElementsByTagName("text").length, 1, "created <text> element");
      const tspans = document.getElementsByTagName("tspan");
      assert.equal(tspans.length, 1, "created <tspan> element");
      assert.equal(tspans[0].textContent, "test", "rendered label");

      assert.end();

    });

});
