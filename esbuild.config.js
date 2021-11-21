const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['./src/index.js'],
  outfile: './dist/index.js',
  minify: false,
  bundle: true,
  sourcemap: true,
  platform: 'node',
  target: 'es2017',
  watch: true
})
