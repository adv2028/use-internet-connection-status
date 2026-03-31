import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs"
import terser from '@rollup/plugin-terser';
import packageJson from "./package.json" with { type: "json" };

export default [{
  input: "index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: packageJson.module,
      format: "es",
      sourcemap: true,
      plugins: [terser()]
  },
],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ 
      tsconfig: "./tsconfig.json",
      exclude: ["**/__tests__/**", "**/*.test.ts"] }),
       
  ],
  external: ["react"],
}
]