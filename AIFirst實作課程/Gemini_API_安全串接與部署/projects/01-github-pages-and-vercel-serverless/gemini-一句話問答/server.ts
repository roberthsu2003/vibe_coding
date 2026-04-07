/**
 * 本機開發入口：Express 併在同一個 process 裡提供
 * - REST API：`POST /api/gemini`（後端持有 GEMINI_API_KEY）
 * - 前端頁面：開發模式交給 Vite middleware；正式環境改送 `dist` 靜態檔
 *
 * 啟動：`npm run dev` → 執行 `tsx server.ts`
 */

import dotenv from "dotenv";
import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ESM 環境沒有 __dirname，需自 import.meta.url 換算（Express、dotenv 路徑用）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 以 server.ts 所在目錄載入 .env（不依賴 process.cwd，專案子資料夾執行也一致）
// override: true → 若終端機／系統已存在空的 GEMINI_API_KEY，仍會以檔案內容為準（dotenv 預設不覆寫既有變數）
dotenv.config({ path: path.join(__dirname, ".env"), override: true });
dotenv.config({ path: path.join(__dirname, ".env.local"), override: true });

async function startServer() {
  const app = express();
  // Render / Railway 等平台會注入 PORT；本機預設 3000
  const PORT = Number(process.env.PORT) || 3000;

  // 解析 JSON body（/api/gemini 會讀 req.body.prompt）
  app.use(express.json());
  // 允許瀏覽器從其他 origin 呼叫 API（本專案預設同一個 localhost:3000，影響較小）
  app.use(cors());

  /**
   * Gemini 代理：前端只送「使用者輸入」，金鑰永遠只存在 process.env
   */
  app.post("/api/gemini", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server" });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Failed to fetch from Gemini API" });
    }
  });

  /**
   * 前端資源：
   * - 開發：Vite 以 middleware 掛在 Express 上，請求非 /api/* 時由 Vite 即時編譯/提供
   * - 正式：先 `vite build` 產出 dist，再由 express.static + SPA fallback 回傳 index.html
   */
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // 其餘路徑（如 /about）仍回傳單頁應用的 index.html，由前端路由處理
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // 0.0.0.0：同網段其他裝置也可連線（例如手機測試）；只用本機則 127.0.0.1 亦可
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(
      `[env] GEMINI_API_KEY: ${
        process.env.GEMINI_API_KEY
          ? `已載入（長度 ${process.env.GEMINI_API_KEY.length}）`
          : `未載入，請確認 ${path.join(__dirname, ".env")} 或 .env.local 是否存在且含 GEMINI_API_KEY=`
      }`
    );
  });
}

startServer();
