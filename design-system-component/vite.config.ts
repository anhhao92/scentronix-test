import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ exclude: ["**/*.stories.tsx"] })],
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
