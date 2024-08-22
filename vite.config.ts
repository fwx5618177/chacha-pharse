import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import glsl from "rollup-plugin-glsl";

import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {},
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: "dist",
      include: "./src/**/*",
    }),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
      },
    }),
    glsl({
      include: "**/*.{glsl,frag,vert}",
      exclude: "node_modules/**",
    }),
  ],
  resolve: {
    alias: {
      buffer: "buffer",
    },
  },
  build: {
    sourcemap: true,
    minify: "esbuild",
    outDir: "dist",
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/[name][extname]";
          }
          return "[name][extname]";
        },
      },
    },
  },
  server: {
    open: true,
    port: 3000,
    host: "0.0.0.0",
  },
});
