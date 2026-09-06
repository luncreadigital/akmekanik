import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// base + outDir: sitenin tamamı /akmekanik/ altında sunulacak şekilde üretilir.
// Vercel, dist içeriğini köke koyar → site /akmekanik/* altında yayında olur.
export default defineConfig({
  base: "/akmekanik/",
  build: {
    outDir: "dist/akmekanik",
  },
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
