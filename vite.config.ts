import { defineConfig, PluginOption } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

function replaceHtmlModulePlugin(): PluginOption {
  return {
    name: "html-transform-replace-module",
    apply: "build",
    enforce: "post",
    transformIndexHtml(html) {
      return html;
        // .replaceAll(`type="module"`, `defer`)
        // .replaceAll(`crossorigin`, ``)
        // .replaceAll(`rel="modulepreload"`, ``);
    },
  };
}
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), replaceHtmlModulePlugin()],
  define: {
    __PREVIEW_PATH:
      process.env.NODE_ENV === "production"
        ? `"./src/preview.html"`
        : `"../src/preview.html"`,
  },
  build: {
    target: "es2015",
    outDir: "docs",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        preview: resolve(__dirname, "preview.html"),
      },
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      keepNames: true,
    },
  },
});
