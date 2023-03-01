import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import globals from "rollup-plugin-node-globals";

const config = [
  {
    input: "./src/Components/Form/Form.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "named",
        // globals: { process: "process" },
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: "node_modules/**/*",
        presets: [
          "@babel/preset-env",
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      }),
      external(),
      json(),
      resolve({ browser:true }),
      commonjs(),
      globals(),
      terser(),
    ],
    external: {
      React: "react",
    },
  },
];

export default config;
