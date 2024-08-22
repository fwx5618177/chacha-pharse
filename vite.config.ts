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
      outDir: "lib",
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
    outDir: "lib",
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      external: ["react", "react-dom", "web3", "@solana/web3.js"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          web3: "Web3",
          "@solana/web3.js": "Web3",
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
