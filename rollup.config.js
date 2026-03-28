import resolve from "@rollup/plugin-node-resolve"
import external from "rollup-plugin-peer-deps-external"
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert { type: "json" };

export default [{
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
  },
],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  external: ["react"],
},
{
  // Configuración para generar los archivos de tipos (.d.ts)
  input: "dist/index.esm.js",
  output: [{ file: "dist/index.d.ts", format: "esm" }],
  plugins: [dts()],
}
]