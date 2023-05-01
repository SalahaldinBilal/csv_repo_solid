import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin()],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 5923,
    strictPort: true,
    // proxy: {
    // '/api': {
    //   target: 'http://localhost:5200',
    //   changeOrigin: true,
    //   secure: false,
    //   ws: true,
    //   // rewrite: (path) => path.replace(/^\/api/, ''),
    // },
    // '/socket.io': {
    //   target: 'ws://localhost:5200',
    //   changeOrigin: true,
    //   ws: true,
    // }
    // },
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: ["es2021", "chrome100", "safari13"],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    // commonjsOptions: {
    //   include: []
    // }
  }
});
