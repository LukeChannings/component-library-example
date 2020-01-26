import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcssImport from 'postcss-import'
import postcssEnv from 'postcss-preset-env'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'core-js': 'core-js'
}

const globalModules = Object.keys(globals);

const sourceMap = true;

export default {
  input: {
    index: './src/index.ts'
  },
  preserveModules: true,
  treeshake: false,
  output: [
    {
      dir: 'dist',
      format: 'esm',
      globals,
      sourcemap: sourceMap,
      preferConst: true,
    },
  ],
  plugins: [
    resolve({ extensions }),
    commonjs({
      include: '**/node_modules/**',
      namedExports: {},
    }),
    babel({
      sourceMap,
      extensions,
      include: ['src/**/*'],
      exclude: [
        'node_modules/**',
        '**/*.css',
      ]
    }),
    postcss({
      plugins: [
        postcssImport(),
        postcssEnv(),
      ],
      namedExports: true,
      modules: {
        generateScopedName: '[folder]_[local]-[hash:base64:5]'
      },
      sourceMap,
      configFile: false,
      extract: true,
      preserveModules: true,
    }),
  ],
  external: id => globalModules.includes(id) || /core-js/.test(id),
}
