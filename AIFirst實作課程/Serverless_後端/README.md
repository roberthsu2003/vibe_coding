# 將 Google AI Studio 單純 React 專案轉為-靜態網頁+ Vercel serverless functions

> 詳細說明請參考[將 Google AI Studio 單純 React 專案轉為-靜態網頁+ Vercel serverless functions](./serverless_functions_說明.md)

## 什麼是Serverless functions？為什麼需要它？

Serverless Functions (無伺服器函式) 是一種雲端運算執行模型。開發者只需編寫並部署處理特定任務的程式碼（例如 API 請求），雲端平台（如 Vercel）就會自動為其分配資源、運行並處理擴展，完全免除管理傳統後端伺服器的煩惱。

當您從 Google AI Studio 下載或匯入純前端 React 專案時，通常會遇到以下幾個關鍵問題，這正是我們需要導入 Serverless Functions 的原因：

1. **安全性風險 (最嚴重的一點)：** 單純的前端專案通常會將 API Key 直接寫在前端程式碼或 `.env` 並打包到前端客戶端中。這代表一旦專案上線（或分享給他人），任何使用者都可以透過瀏覽器開發者工具 (DevTools) 輕易找到並竊取您的 Google Gemini API Key。
2. **CORS (跨來源資源共用) 問題：** 直接從前端呼叫某些第三方 API 時，如果對方的伺服器沒有開放跨域請求，瀏覽器就會將其擋下。
3. **前端邏輯過於肥大：** 複雜的 Prompt 組合邏輯、System Instructions 或與其他服務的串接，如果都放在前端，會讓前端程式碼難以維護，且容易暴露商業邏輯。

**解決方案：** 透過建立 **Vercel Serverless Functions** 作為中繼的 **API Proxy (代理)** 進行安全串接。
- **前端 (React)：** 只負責畫面顯示、取得使用者輸入資料，並發送 API 請求給我們專屬的 Serverless Function。
- **後端 (Serverless Functions)：** 隱藏並安全地保管您的 API Key，在伺服器端接收前端請求、整理後再發送給 Google Gemini API，最後將取得的結果回傳給前端。

---

## 實作步驟：從純 React 轉換為 BFF 架構

假設您已經有一個從 Google AI Studio 下載的標準 React (以 Vite 為例) 專案。

### 在Google AI Studio建立一個新的React專案

**app name:** Gemini 一句話問答

**prompt:**

```markdown
請用 React + TypeScript + Vite 建立專案
### 🛠 技術棧
- **前端：** Vite + React + TypeScript（與常見 `react_typescript_vite` 專案慣例相容即可）

### 📝 功能需求（請依此實作，勿省略）
- **單頁應用 (SPA)**：頁面標題需為「Gemini 一句話問答」（或清楚同義標題）。
- **輸入元件**：包含一個多行輸入框（Textarea），並透過 `placeholder` 提示使用者輸入要向 Gemini 提問的文字。
- **送出機制**：
  - 一個「送出」按鈕。
  - 等待 API 回應期間，需顯示「載入中」狀態或將按鈕設為停用（Disabled）。
- **結果呈現**：
  - **成功時**：在輸入區下方顯示 Gemini 回覆的純文字。
  - **失敗時**：顯示簡短的錯誤提示訊息。

### 📦 輸出要求
1. 請分檔提供關鍵的實作程式碼。
2. 請簡述在本機環境中，如何啟動「前端專案」。
```
### 提供的實際專案
- [**產生出的範例專案資料夾zip檔**](./ai_studio_專案來源/gemini-一句話問答.zip)

- [**產生出的專案程式碼**](./ai_studio_專案來源/gemini-一句話問答/) 

**架構如下**

```text
gemini-一句話問答/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    └── main.tsx
```

### 在 AI 編輯器開啟此專案並轉換為serverless functions

**使用AI編輯器的Prompt,將google ai studio產生的react專案轉換為serverless functions**

**prompt**

```markdown
請幫我將目前的 React 專案改寫並升級為 Serverless Functions 架構，主要目的是隱藏並保護 API Key，避免將其暴露在前端程式碼中。
具體需求如下：

## 建議加構


my-ai-app/
├── src/
│   ├── App.tsx
│   └── main.tsx
│
├── api/
│   └── gemini.ts      ← Vercel 會自動識別為 Serverless Function
│
├── package.json
├── vite.config.ts
└── .github/
    └── workflows/
        └── deploy.yml

```
### 提供的實際專案
- [**產生出的BFF專案資料夾zip檔**](./轉換為BFF架構的專案/轉換為BBF的專案.zip)

- [**產生出的BFF專案程式碼**](./轉換為BFF架構的專案/轉換為BBF的專案/)

**架構如下:**

```text
轉換為BBF的專案/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── metadata.json
├── package-lock.json
├── package.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    └── main.tsx
```
---

### 🚀 本機端測試與驗證

在使用或啟動開發伺服器前，**請務必注意**：
您必須先將專案根目錄的 `.env.example` 複製一份並重新命名為 `.env`，接著在全新的 `.env` 檔案中，填寫您專屬的 Google Gemini API Key。

#### 1. 開發階段驗證
在開發階段時，請使用以下指令安裝必要套件，並啟動開發環境進行測試：
```bash
npm install
npm run dev
```

#### 2. 部署階段驗證
為了確保上線後不會出現非預期錯誤，請在本地端模擬即將上線的正式營運環境，執行編譯與啟動流程：
```bash
npm run build
npm run start
```

---

### ☁️ 部署至 Render 或其他雲端平台

當本地端測試一切運作正常後，您可以將專案推送到 GitHub，接著串連至 Render、Heroku 或其他雲端平台進行自動化部署。

**💡 部署時的重要設定欄位 (以 Render 等雲端平台為例)：**

在建立 Web Service (網頁服務) 時，請確保以下欄位設定正確，專案才能順利建置與啟動：

- **Build Command (建置指令)**：`npm install && npm run build`
  - *說明：安裝所有依賴套件，並執行 Vite 前端的打包編譯程序。*
- **Start Command (啟動指令)**：`npm run start` 
  - *說明：啟動 Express 伺服器，此伺服器會做為後端 API Proxy，並同時對外提供編譯好的前端靜態檔案。*

**⚠️ 雲端部署的重大注意事項：**

1. **絕對不可上傳 `.env` 檔案**：`.env` 檔案包含您最敏感的 API 金鑰資訊，絕不能推送至 GitHub。請再三確認專案內的 `.gitignore` 檔案中已經包含 `.env` 以防止意外提交。
2. **手動設定環境變數**：由於 `.env` 未跟隨程式碼上傳，您必須自行登入 Render (或其他雲端服務) 專案設定後台，找到「Environment Variables」區塊，手動新增一筆名為 `GEMINI_API_KEY` 的金鑰設定，後端伺服器在雲端上運作時才能順利呼叫 Gemini API。


