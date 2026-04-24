import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves from /<repo>/
export default defineConfig({
  plugins: [react()],
  base: "/osaka-planner/",
});
