import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // ✅ 移除 define 區塊：GEMINI_API_KEY 不再注入前端，改由 Serverless Function 讀取
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: process.env.DISABLE_HMR !== "true",
    proxy: {
      // 開發環境：將 /api 請求代理到 Vercel CLI 本機模擬的 Serverless Function（port 3001）
      // 執行方式：同時啟動 `npm run dev` 與 `vercel dev`
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
