import babel from "rollup-plugin-babel";
import json from "rollup-plugin-json";
import npm from "rollup-plugin-npm";

export default {
  dest: "build/d3plus-layout.full.js",
  entry: "index.js",
  format: "umd",
  globals: function(id) { return id.replace(/-/g, "_"); },
  moduleId: "d3plus-layout",
  moduleName: "d3plus_layout",
  plugins: [
    json(),
    npm({"jsnext": true, "main": true, "skip": ["d3"]}),
    babel({"presets": ["es2015-rollup"]})
  ]
};
