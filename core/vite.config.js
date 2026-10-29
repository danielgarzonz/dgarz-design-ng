import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/js/index.js'),
      name: 'dgarz',
      formats: ['umd', 'es'],
      fileName: function(format) {
        return format === 'umd' ? 'dgarz.js' : 'dgarz.esm.js';
      }
    },
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        exports: 'named',
      }
    },
    minify: false,
  }
});
