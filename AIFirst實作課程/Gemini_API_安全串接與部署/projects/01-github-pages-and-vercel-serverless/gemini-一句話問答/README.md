# Gemini 一句話問答（本機開發）

本機使用 **Express**（`server.ts`）同時提供前端與 `POST /api/gemini`；**金鑰只放在後端環境變數**，勿寫進前端。

## 為什麼專案裡沒有 `.env`？

- **倉庫裡本來就不會附 `.env`**，避免有人誤把金鑰推上 GitHub。
- **`.gitignore`** 已設定忽略 `.env`、`.env.local` 等（只保留 **`.env.example`** 當範本）。
- 因此你要在**自己電腦上**用下面指令**自己建立** `.env`（或 `.env.local`）：
  ```bash
  cd gemini-一句話問答
  cp .env.example .env
  ```
- 在 **VS Code 左側檔案列表**：若仍看不到，請確認已顯示**隱藏檔**（檔名以 `.` 開頭）；或直接用 **檔案 → 開啟檔案** 輸入路徑 `.../gemini-一句話問答/.env` 編輯。

---

## 執行前必做

1. 複製環境變數檔（擇一即可）：

   ```bash
   cp .env.example .env
   ```

   或使用 **`.env.local`**（與 AI Studio 說明一致亦可）。

2. 在 **`.env` 或 `.env.local`** 內設定真實金鑰（勿提交 Git）：

   ```bash
   GEMINI_API_KEY=你的金鑰
   ```

3. 若未設定金鑰，瀏覽器會收到後端錯誤：`GEMINI_API_KEY is not configured on the server`。

## 本機指令

```bash
npm install
npm run dev
```

瀏覽器開啟終端機顯示的網址（預設 `http://localhost:3000`）。

## 仍有錯誤時請檢查

- **`GEMINI_API_KEY is not configured on the server`**：代表後端沒讀到環境變數。請依序檢查：
  1. 瀏覽器網址必須是 **`http://localhost:3000`**（與 `npm run dev`／`server.ts` 一致）。若開成 **`http://localhost:5173`**（單獨跑 Vite），**不會**有 Express API，行為會異常。
  2. **`.env`** 放在 **`gemini-一句話問答/`** 且有一行 `GEMINI_API_KEY=你的金鑰`（勿整行 `#` 註解）。
  3. 若曾在終端機執行過 `export GEMINI_API_KEY=`（空值），預設 dotenv **不會覆寫**；本專案 `server.ts` 已改為 **`override: true`** 從檔案讀取。仍失敗請關閉終端機重開，或執行 `unset GEMINI_API_KEY` 後再 `npm run dev`。
  4. 修改 `.env` 後請**重啟** `npm run dev`，並確認終端機出現 `[env] GEMINI_API_KEY: 已載入（長度 …）`。
- **終端機**：是否有 `Gemini API error:` 日誌（代表金鑰有讀到，但模型名稱、配額或網路有問題）。
- **`server.ts` 內 `model:`**：須與 [Google AI Studio](https://aistudio.google.com/) 目前提供的模型名稱一致。

---

原始 AI Studio 連結（若仍有效）：https://ai.studio/apps/f167ecee-c814-429b-95f6-b49d763bcdbc
