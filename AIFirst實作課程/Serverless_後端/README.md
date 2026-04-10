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

## 實作步驟：從純 React 轉換為 Serverless Functions 架構

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

## 建議架構


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
- [**轉換為 Serverless 的專案zip檔**](./轉換為Serverless專案/gemini-一句話問答.zip)
- [**轉換為 Serverless 的專案程式碼**](./轉換為Serverless專案/gemini-一句話問答/)

**改寫後的架構如下：**

```text
gemini-一句話問答/
├── .env.example          ← 只保留 GEMINI_API_KEY（伺服器端讀取）
├── .gitignore
├── index.html
├── package.json          ← 移除 express/dotenv，加入 @vercel/node
├── tsconfig.json
├── vite.config.ts        ← 移除 define 注入，加入 /api proxy
├── api/
│   └── gemini.ts         ← ✅ 新增：Vercel Serverless Function
├── src/
│   ├── App.tsx           ← 改為呼叫 /api/gemini（不再直接呼叫 Gemini）
│   ├── index.css
│   └── main.tsx
└── .github/
    └── workflows/
        └── deploy.yml    ← ✅ 新增：GitHub Actions CI
```
---


### 🚀 本機端測試與驗證

在測試前，**請務必先設定 API Key**：

```bash
cd 轉換為Serverless專案/gemini-一句話問答
cp .env.example .env
# 用文字編輯器開啟 .env，填入您的 GEMINI_API_KEY
```

#### 方式 A（推薦）：使用 Vercel CLI 完整模擬

##### Step 1：安裝 Vercel CLI 與專案套件

⚠️ **請注意順序，必須先安裝套件再執行 `vercel dev`！**

```bash
npm install -g vercel   # 全域安裝 Vercel CLI
npm install             # 安裝專案的 node_modules（此步驟不可跳過）
```

##### Step 2：啟動 Vercel 開發伺服器

```bash
vercel dev
```

> **💡 `vercel dev` 是純本機模擬，不會上傳任何東西！**
>
> | 指令 | 執行位置 | 是否上傳至雲端 | 存取網址 |
> |---|---|---|---|
> | `vercel dev` | 您的電腦本機 | ❌ 沒有 | `http://localhost:3000` |
> | `vercel` / `vercel --prod` | Vercel 雲端伺服器 | ✅ 有 | `https://xxx.vercel.app` |
>
> `vercel dev` 在本機同時模擬兩件事：前端 Vite 開發伺服器，以及 `/api/gemini.ts` Serverless Function 的執行。程式碼全都在您電腦上，API Key 從本機 `.env` 讀取，外部無法存取。關掉終端機後便結束，不留任何雲端紀錄。

首次執行會出現一系列互動式設定問題，請依以下方式回答：

| 問題 | 正確回答 |
|---|---|
| `Set up and develop "...gemini-一句話問答"?` | **Y（Enter）** |
| `Which scope should contain your project?` | 選擇您的帳號 |
| `Link to existing project?` | **N（建立全新專案）** ← 重要！ |
| `What's your project's name?` | 輸入任意名稱（例如 `gemini-test`）|
| `In which directory is your code located?` | 直接按 Enter（使用 `./`）|
| `Want to modify these settings?` | N |

設定完成後，系統會自動啟動：
- **前端**：http://localhost:3000
- **Serverless Function（API）**：自動由 Vercel CLI 模擬

##### ⚠️ 常見錯誤與解決方式

**錯誤 1：誤選連結到舊有的既有專案**
```
? Link to existing project? yes
→ 選到了其他舊專案（例如 v0-shaders-landing-page）
sh: yarn: command not found   ← 因為舊專案用 yarn，導致 build 失敗
```
**解決：** 刪除自動建立的 `.vercel` 資料夾，重新執行 `vercel dev`，這次在 "Link to existing project?" 選 **N**。
```bash
rm -rf .vercel
vercel dev
```

**錯誤 2：忘記先執行 `npm install`**
```
sh: vite: command not found
```
**解決：** 先安裝專案套件後再啟動：
```bash
npm install
vercel dev
```

#### 方式 B：只啟動前端（僅測試 UI 畫面）

```bash
npm install
npm run dev
```

> 注意：方式 B 下，點擊「送出」按鈕會因找不到 `/api/gemini` 而回傳錯誤，這是正常的。


---

### ☁️ 部署至 Vercel

當本地測試一切正常後，請依以下步驟部署至 Vercel：

**1. 推送至 GitHub**
```bash
git add . 
git commit -m "feat: 轉換為 Vercel Serverless Functions 架構" 
git push 
```

**2. 在 Vercel 匯入專案（Monorepo 子資料夾設定）**

前往 [vercel.com](https://vercel.com) → Import Git Repository → 選擇 `vibe_coding` 這個 repo。

> **💡 重要：設定 Root Directory**
>
> 由於這個專案只是 repo 中的**其中一個子資料夾**，匯入時必須指定 Root Directory，否則 Vercel 會嘗試從 repo 根目錄建置（會失敗）。
>
> 在 Import 畫面找到 **Root Directory** 欄位，填入：
> ```
> AIFirst實作課程/Serverless_後端/轉換為Serverless專案/gemini-一句話問答
> ```
> 或在匯入後至 **Settings → General → Root Directory** 修改。

設定正確後，Vercel 會自動偵測 Vite 設定並使用 `npm run build` 作為建置指令。

> **📌 同一個 repo 可以建立多個 Vercel Project，每個 Project 指向不同的子資料夾，互不干擾。**

**3. 設定環境變數（重要）**

匯入後，進入專案設定：

```
Vercel Dashboard → 選取專案 → Settings → Environment Variables
→ 新增：GEMINI_API_KEY = 您的 API Key
```

**⚠️ 重要安全注意事項：**

1. **絕對不可上傳 `.env` 檔案**：請確認 `.gitignore` 已包含 `.env`，避免 API Key 被推送至 GitHub。
2. **API Key 只存在 Vercel**：不同於 Render/Heroku，Vercel 的 Serverless Function 會在執行期自動注入環境變數，前端打包檔案中完全不會包含任何 Key。
3. **不需要 Start Command**：Vercel Serverless 無需維護常駐伺服器，部署後即自動可用。

**4. 部署後驗證**

完成後，您的應用程式將可透過以下網址存取：
```
https://your-app-name.vercel.app
```
在瀏覽器開發者工具的 Network 頁籤中，確認所有請求只會看到 `/api/gemini`，而非任何含有 API Key 的請求。

---

### 🔄 之後的自動部署（永久生效）

第一次設定完成後，**往後更新程式碼只需要 `git push`**，Vercel 會全自動處理剩下的一切：

```
修改程式碼
    ↓
git push 到 main
    ↓
Vercel 自動偵測到變更（約 1~2 分鐘）
    ↓
自動 build + 部署
    ↓
https://your-app.vercel.app 立即更新 ✅
```

**部署內容包含：**

| 項目 | 說明 |
|---|---|
| 前端靜態頁面 | Vite build 後的 `index.html` + `assets/` |
| `api/gemini.ts` | 自動識別並部署為 Vercel Serverless Function |
| `GEMINI_API_KEY` | 從 Vercel 環境變數安全讀取，不隨程式碼上傳 |

> **💡 Vercel 只監視您指定的 Root Directory 內的變更。** 若修改的是 repo 中其他子專案的檔案，不會觸發此 Project 的重新部署。
