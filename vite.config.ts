import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
      "@/stores": path.resolve(__dirname, "./src/stores"),
      "@/providers": path.resolve(__dirname, "./src/providers"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/config": path.resolve(__dirname, "./src/config"),
      "@/i18n": path.resolve(__dirname, "./src/i18n"),
    },
  },
})
