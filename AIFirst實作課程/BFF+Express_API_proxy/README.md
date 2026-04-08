# 將 Google AI Studio 單純 React 專案轉為 BFF 模式 (Express API Proxy)

## 什麼是 BFF 模式？為什麼需要它？

BFF (Backend For Frontend) 是一種架構模式，為特定的前端應用程式提供專屬的後端服務。

當您從 Google AI Studio 下載或匯入純前端 React 專案時，通常會遇到以下幾個關鍵問題：

1. **安全性風險 (最嚴重的一點)：** 單純的前端專案通常會將 API Key 直接寫在前端程式碼或 `.env` 並打包到前端客戶端中。這代表一旦專案上線（或分享給他人），任何使用者都可以透過瀏覽器開發者工具 (DevTools) 輕易找到並竊取您的 Google Gemini API Key。
2. **CORS (跨來源資源共用) 問題：** 直接從前端呼叫某些第三方 API 時，如果對方的伺服器沒有開放跨域請求，瀏覽器就會將其擋下。
3. **前端邏輯過於肥大：** 複雜的 Prompt 組合邏輯、System Instructions 或與其他服務的串接，如果都放在前端，會讓前端程式碼難以維護，且容易暴露商業邏輯。

**解決方案：** 建立一個簡單的 Express 後端伺服器作為 **API Proxy (代理伺服器)**。
- **前端 (React)：** 只負責畫面顯示、取得使用者輸入資料，並將資料發送給我們自己的後端。
- **後端 (Express)：** 隱藏並安全地保管您的 API Key，接收前端請求，整理後再發送給 Google Gemini API，最後將取得的結果回傳給前端。

---

## 實作步驟：從純 React 轉換為 BFF 架構

假設您已經有一個從 Google AI Studio 下載的標準 React (以 Vite 為例) 專案。

### 第一步：建立後端 (Express Server)

為了分離前後端，我們建議在您的工作區建立一個專屬後端目錄。你可以選擇在 React 專案根目錄下建議一個 `server` 資料夾，或是與前端同層建立一個新目錄。這裡我們以前者為例。

1. **初始化後端專案與安裝套件：**
   打開終端機 (Terminal)，進入您的 React 專案根目錄：
   ```bash
   mkdir server
   cd server
   npm init -y
   
   # 安裝需要的後端框架與 Google AI SDK 
   npm install express cors dotenv @google/genai
   # (註：請留意您的專案是使用新版 @google/genai 還是舊版 @google/generative-ai)
   ```

2. **建立後端環境變數檔 (`server/.env`)：**
   在 `server` 目錄下建立一個 `.env` 檔案，並將原本寫在前端的 API Key 移過來：
   ```env
   GEMINI_API_KEY=您的_GOOGLE_GEMINI_API_KEY_放在這裡
   PORT=3001
   ```
   🚨 **極其重要：** 記得在您的版控忽略清單 (`.gitignore`) 中加入 `.env`，**絕對不要**將包含 API Key 的 `.env` 檔案推送至 GitHub。如果是放在根目錄的 `.gitignore`，請加上 `server/.env`。

3. **撰寫 Express 伺服器程式碼 (`server/index.js`)：**
   在 `server` 目錄下建立 `index.js`，負責接收前端請求並透過您的 API Key 操作 Gemini：

   由於我們習慣使用現代 ES Module 寫法，請先打開 `server/package.json`，加入 `"type": "module"`：
   ```json
   {
     "name": "server",
     "type": "module",
     // ...
   }
   ```

   接著在 `index.js` 寫入：
   ```javascript
   import express from 'express';
   import cors from 'cors';
   import dotenv from 'dotenv';
   import { GoogleGenAI } from '@google/genai';

   // 載入 .env 環境變數
   dotenv.config();

   const app = express();
   const port = process.env.PORT || 3001;

   // 啟用 CORS，讓前端 (例如 localhost:5173 ) 能跨域存取這個後端
   app.use(cors());
   // 解析前端傳來的 JSON Body payload
   app.use(express.json());

   // 初始化 Gemini 實例 (此時將安全的在伺服器端讀取環境變數)
   const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

   // 建立提供給前端呼叫的代理 API 路由
   app.post('/api/chat', async (req, res) => {
       try {
           const { prompt } = req.body;

           if (!prompt) {
               return res.status(400).json({ error: '無效的請求，缺少 prompt' });
           }

           // 將原本前端呼叫 API 的邏輯轉移到這裡
           const response = await ai.models.generateContent({
               model: 'gemini-2.5-flash',
               contents: prompt,
           });

           // 將結果回傳給前端
           res.json({ text: response.text });
       } catch (error) {
           console.error('Gemini API Error:', error);
           res.status(500).json({ error: '產生內容時發生錯誤' });
       }
   });

   app.listen(port, () => {
       console.log(`BFF API 代理伺服器已啟動: http://localhost:${port}`);
   });
   ```

---

### 第二步：修改前端 (React) 程式碼

後端準備好代理路由後，我們需要拔除前端原本直接呼叫 Google API 的危險邏輯。

1. **移除前端專案中的敏感資訊與 SDK 參考：**
   - 從前端的 `.env` 檔案中刪除您的 API 金鑰 (例如 `VITE_GEMINI_API_KEY`)。
   - 如果確定純前端不再需要 SDK，可以執行 `npm uninstall @google/genai` (在前端目錄下)。

2. **改寫負責呼叫 API 的 React 邏輯 (例如 `App.jsx`)：**
   將發送行為改成用 `fetch` 去打給我們剛剛寫好的 Express Server (`/api/chat`)：

   **修改前 (危險的純前端寫法)：**
   ```javascript
   import { GoogleGenAI } from '@google/genai';
   const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

   async function handleGenerate(userInput) {
       const response = await ai.models.generateContent({
           model: 'gemini-2.5-flash',
           contents: userInput,
       });
       setResult(response.text);
   }
   ```

   **修改後 (安全的 BFF 串接寫法)：**
   ```javascript
   async function handleGenerate(userInput) {
       try {
           // 現在前端把 prompt 打給自己的代理伺服器
           const response = await fetch('http://localhost:3001/api/chat', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ prompt: userInput }),
           });

           if (!response.ok) {
               throw new Error('伺服器回應異常');
           }

           const data = await response.json();
           setResult(data.text); // 取用我們自己後端打包出來的結構
       } catch (error) {
           console.error("Fetch error:", error);
       }
   }
   ```

> 💡 **進階技巧 (Vite Proxy 設定)：**
> 為了避免開發環境的 CORS 問題，也避免把 `http://localhost:3001` 寫死在前端影響未來上線部屬，您可以設定 Vite 的代理：
> 修改前端的 `vite.config.js` (`/vite.config.js`)：
> ```javascript
> import { defineConfig } from 'vite'
> import react from '@vitejs/plugin-react'
> 
> export default defineConfig({
>   plugins: [react()],
>   server: {
>     proxy: {
>       // 當前端發送 /api 開頭的請求時，自動轉給後端
>       '/api': {
>         target: 'http://localhost:3001',
>         changeOrigin: true,
>       }
>     }
>   }
> })
> ```
> 設定完成後，React 裡的 fetch 程式碼就可以簡化成 `fetch('/api/chat', ...)` 了。

---

### 第三步：同時執行前後端進行開發

BFF 模式代表您有兩個伺服器需要啟動：
請開啟兩個終端機介面：

1. **終端機 1 (Express 後端)：**
   ```bash
   cd server
   node index.js
   # 建議使用 nodemon: npm install -g nodemon，之後用 nodemon index.js 以便熱更新後端
   ```

2. **終端機 2 (React 前端)：**
   ```bash
   npm run dev
   ```

現在您的前端介面就可以正常的透過中間層 Proxy 去與 Gemini 進行通訊了！

---

## 結論

將專案拆分為 BFF + Express 模式的幾個優勢：
- 🛡️ **獲得絕對的安全性：** API 金鑰藏在後端伺服器的環境變數中，不會洩漏給前端的使用者。
- 🔧 **邏輯擴充性高：** 您可以在 Express 後端做很多事，例如：增加速率限制 (Rate limit)、加入使用者身分驗證，或是將使用者的對話紀錄存進資料庫，比起純前端更具有企業級專案的雛形。
