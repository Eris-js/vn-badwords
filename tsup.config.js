const { defineConfig } = require('tsup');

module.exports = defineConfig({
    entry: ['src/index.js'],
    sourcemap: true,
    clean: true,
    format: ['cjs', 'esm'],
    minify: true,
});
