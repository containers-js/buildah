import dts from 'rollup-plugin-dts'
import ts from 'rollup-plugin-typescript2'

const build = (format) => ({
  input: './src/index.ts',
  output: {dir: `dist/${format}`, format: format, sourcemap: true},
  plugins: [ts({tsconfigOverride: {compilerOptions: {module: 'esnext'}}, typescript: require('typescript')})],
  external: ['execa'],
})

export default [
  build('cjs'),
  build('es'),
  {
    input: './src/index.ts',
    output: [{file: 'dist/index.d.ts', format: 'es'}],
    plugins: [dts()],
  },
]
