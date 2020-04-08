import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  plugins: [
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.worker.json",
    }),
    resolve({
      jsnext: true,
      extensions: [".ts", ".js", ".json"],
    }),
  ],
};
