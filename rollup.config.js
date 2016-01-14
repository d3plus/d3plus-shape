import json from "rollup-plugin-json";

export default {
  dest: "build/d3plus-shape.js",
  entry: "index.js",
  format: "umd",
  globals: function(id) { return id.replace(/-/g, "_"); },
  moduleId: "d3plus-shape",
  moduleName: "d3plus_shape",
  plugins: [json()]
};
