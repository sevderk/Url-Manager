const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");

module.exports = defineConfig(({ mode }) => {
  const isDev = mode === "development";
  return {
    plugins: [react()],
    base: isDev ? "/" : "./",
    server: { host: true, port: 5173, strictPort: true },
    preview: { host: true, port: 4173, strictPort: true },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      target: "es2022",
      sourcemap: false,
      rollupOptions: { external: ["electron"] }
    },
    esbuild: { target: "es2022" },
    optimizeDeps: { esbuildOptions: { target: "es2022" } }
  };
});
