# 實作：用 AI 開發會議總結與翻譯工具

本單元將帶領學員使用 AI 開發一款「會議紀錄總結與多國語言翻譯」工具。我們將學習如何撰寫精準的 Prompt 來約束 AI 的輸出格式，並透過 Vercel Serverless Functions 確保 API Key 的安全性。

## 🛠 技術棧 (Tech Stack)

實作此專案時，建議採用以下前端技術：
- **建置工具**: Vite
- **前端框架**: React
- **程式語言**: TypeScript
- **樣式框架**: Tailwind CSS

---

## 📂 測試資料：會議紀錄逐字稿

在開發與測試階段，請複製以下會議紀錄逐字稿，作為應用程式的測試輸入內容：

<details>
<summary>📋 點我展開會議紀錄</summary>

```text
會議主題：Q3 產品開發進度同步與行銷策略討論
會議時間：2023年9月15日 10:00 - 11:00
與會者：
- Alex (產品經理)
- Ben (前端工程師)
- Cathy (後端工程師)
- David (行銷總監)

會議紀錄：
Alex：大家好，今天主要是想同步一下我們 Q3 新功能「AI 智慧推薦系統」的開發進度。Ben，前端那邊目前狀況如何？
Ben：目前首頁的推薦區塊 UI 已經切版完成，並且串接了 Mock API，不過效能在資料量大的時候會卡頓，這週我會加入虛擬滾動 (Virtual Rendering) 來優化。預計週五前可以完成。
Alex：OK，效能優化很重要。Cathy，後端 API 的部分呢？
Cathy：推薦演算法的模型已經部署到測試環境了，目前 API 的回應時間平均在 200ms 左右。不過有些極端情況下會有 Timeout 的問題，我正在跟 DevOps 團隊一起排查，可能需要增加機器的規格。
Alex：好，有問題隨時提出。David，行銷那邊針對這次上線有什麼規劃嗎？
David：我們預計在功能上線前一週發送 EDM 給既有客戶，強調「個人化體驗升級」。另外，我希望產品團隊能提供一些實際的應用案例 (Use Case)，讓我們可以在社群媒體上做預熱宣傳。
Alex：沒問題，我明天下班前整理三個 Use Case 給你。總結一下接下來的 Action Items：第一，Ben 負責前端效能優化，週五前完成；第二，Cathy 解決後端 API Timeout 問題；第三，我明天提供三個 Use Case 給 David。大家還有問題嗎？
Cathy：沒有。
Ben：沒問題。
David：收到，期待上線！
Alex：好，那今天會議就先到這邊，謝謝大家。
```

</details>

---

## 🚀 實作步驟與 Prompt 範例

在這個實作中，我們將需要使用不同的 Prompt 來完成應用程式的開發與 AI 行為設定：

### 1. 開發前端網頁的 Prompt

您可以複製以下指令，交給 AI 輔助開發工具（如 Cursor、GitHub Copilot）來生成前端應用程式的基礎架構與畫面：

```markdown
請幫我開發一個「AI 會議記錄生成與翻譯工具」的網頁前端應用程式。
具體的開發需求與規格如下：

#### 1. 技術棧與框架
- 建置工具：Vite
- 核心框架：React
- 程式語言：TypeScript
- 樣式框架：Tailwind CSS (請幫我設計美觀、現代化的介面)

#### 2. 核心功能與介面
- **介面語系**：整個應用程式（App）的 UI 介面與所有提示文字都必須使用**繁體中文**呈現。
- **輸入區**：提供一個大型文字方塊（Textarea），讓使用者可以貼上「會議逐字稿」或「重點筆記」。
- **操作按鈕**：包含一個「生成總結與翻譯」的按鈕，點擊時必須顯示 Loading 讀取狀態，避免重複點擊。
- **輸出顯示區**：將 AI 處理後的結果格式化顯示於畫面中（支援 Markdown 渲染為佳），並且為結果區塊提供一個「一鍵複製」的按鈕。

#### 3. API 整合邏輯
- 請在前端撰寫一個呼叫 AI 模型（例如 Google Gemini 等 API）的串接邏輯。
- 請設計一個 `System Instructions` 常數，用來設定 AI 的行為與輸出格式，並在呼叫 API 時帶入。
- 當使用者點擊送出按鈕時，將文字框的內容作為 User Prompt 發送。

請列出完整的專案結構，並提供各個檔案所需的完整程式碼。
```

### 2. AI 模型的 System Instructions

為了讓 AI 每次都能輸出結構化的會議總結，我們需要設定 `System Instructions`。請將以下提示詞設定到您的程式碼或是 AI 平台中：

```markdown
你是一位專業的會議記錄助理。請根據使用者提供的會議逐字稿，整理出結構化的會議紀錄。
請務必遵守以下輸出格式要求：

1. **會議主題與時間**：擷取會議的主題與時間。
2. **與會者**：列出參與會議的人員。
3. **會議重點總結**：用 3 到 5 個重點總結會議內容。
4. **Action Items (待辦事項)**：明確列出接下來的待辦事項與負責人。
5. **英文翻譯版**：將上述 1~4 點的內容完整翻譯成專業的英文。

請以 Markdown 格式輸出，不要包含任何額外的問候語或結語。
```

> **💡 範例參考**
> 
> 如果需要參考完整的實作程式碼，可以下載：[Gemini AI Studio 完成範例檔](./gemini_ai_完成的範例zip檔/meeting-minutes-assistant.zip)

---

## 🔒 專案升級：遷移至 Vercel Serverless 後端

**⚠️ 資安警告**：直接在前端（React）呼叫 AI API 會導致 API Key 暴露在瀏覽器中，這是非常危險的做法！

當您在本地端完成初步測試後，請務必將呼叫 AI 服務的邏輯遷移至後端。您可以將以下 Prompt 餵給 AI，請它幫您將專案改寫為 Vercel Serverless 架構：

```markdown
這是一個基於 Vite + React 所建立的前端專案。為了避免在前端程式碼中暴露 API Key，我需要將呼叫 AI 服務的邏輯遷移至後端。

請幫我將這個專案加入 Vercel Serverless Functions 的支援，具體需求如下：

1. **建立 Serverless 函數**：在專案根目錄建立 `/api` 資料夾，並撰寫一個對接 AI 模型的 Serverless Function（例如 `api/generate.ts`）。請明確指定呼叫 `gemini-2.5-pro` 模型，避免使用到過期的舊版模型。
2. **環境變數安全**：請要求將 API Key （如 `GEMINI_API_KEY`） 放置於 `.env` 檔案中，並設定為 Node.js 環境變數（`process.env`）讀取，確保私鑰絕不外洩至前端。
3. **改寫前端串接邏輯**：請幫我找出目前前端直接呼叫 AI 平台的 `fetch` / axios 程式碼，將其改為呼叫我們自己建立的 `/api/generate` 本地端點。
4. **Vercel 部署設定**：如果需要處理型別或是配置檔（如 `vercel.json`），請一併提供必要的設定與修改。請確保 `vercel.json` 的設定採用以下標準寫法：
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       },
       {
         "src": "api/**/*.ts",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/api/$1.ts"
       }
     ]
   }
   ```
5. **本地端測試方法**：改為 Serverless 後，單純執行 Vite (`npm run dev`) 無法啟動 `/api` 端點。請告訴我需要安裝什麼工具（例如 Vercel CLI）或做什麼設定（如 Vite Proxy），並列出非常具體的完整本地端測試步驟。

請列出所有需要新增或修改的檔案完整程式碼。


### 💻 Vercel Serverless 本地端測試指南

因為 Vite 原生的開發伺服器無法執行 Vercel 的 Node.js 函數，改寫為 Serverless 架構後，原本的 `npm run dev` 必定會出錯或遇到 404 找不到 `/api` 路由的問題。

請依照以下步驟設定，才能在本地端順利測試包含 `/api` 的全端網站：
```
1. **安裝專案套件與全域安裝 Vercel CLI**：
   請先安裝專案所需的依賴套件，並全域安裝 Vercel CLI：
   ```bash
   npm install
   npm install -g vercel
   ```
2. **登入並連結專案**：
   （**⚠️ 帳號提醒**：由於學員可能共用電腦或擁有多個帳號，請先執行 `vercel logout` 登出前一個帳號，再以 `vercel login` 重新登入自己的帳號。）
   確認登入無誤後，在您的專案根目錄中，將本地程式碼與 Vercel 雲端專案進行連結：
   ```bash
   vercel link
   ```
3. **同步環境變數**：
   將設定在 Vercel 雲端上的 `GEMINI_API_KEY` 拉取到本地專案中（請下載為 `.env` 檔案，因為我們的專案程式碼是設定讀取 `.env`，並確保此檔案不會上傳到 GitHub）：
   ```bash
   vercel env pull .env
   ```
4. **啟動全端測試伺服器**：
   請停用原本的 `npm run dev`，一律改用以下指令啟動專案：
   ```bash
   vercel dev
   ```
   啟動後，前端 Vite 畫面與後端 `/api` 將會合併在同一個本地網址運行（通常是 `http://localhost:3000`），您就可以順利進行測試了！

<details>
<summary>💡 進階說明：由 Google AI Studio 完成的專案為何需要這些設定？</summary>

因為這些程式是由 **Google AI Studio** 協助完成的專案，原本通常是單純的前端架構。當我們為了安全性加入後端 API 時，就需要透過上述指令來設定 Vercel 的環境。

**1. 如何確認專案架構已經符合上傳至 Vercel？**
在上傳或測試前，請檢查您的專案目錄是否具備以下結構：
- **`api/` 資料夾**：專案根目錄必須包含 `api/` 資料夾，並且裡面有處理 API 請求的 Serverless 函數程式碼（例如 `generate.ts`）。
- **`vercel.json` 檔案**：根目錄必須包含此設定檔，裡面確實配置了 `builds` 與 `routes`，以確保 Vercel 知道如何編譯前端與啟動後端路由。
- **不包含機密金鑰**：確保程式碼中已經將寫死的 API Key 移除，改為透過 `process.env` 讀取環境變數。

**2. 為什麼要加入這些指令？**
- **`npm install`**：從 Google AI Studio 或外部取得的專案原始碼，並不會包含 `node_modules` 資料夾。必須先執行此指令安裝所有必備套件，專案才能正常運作。
- **`npm install -g vercel`**：安裝 Vercel 官方提供的 CLI 工具，讓我們可以在本地電腦上模擬完整的 Vercel 雲端環境。
- **`vercel link`**：將您本地電腦的專案資料夾與 Vercel 雲端上已經建立的專案綁定，確保後續操作能對應到正確的雲端專案。
- **`vercel env pull .env`**：為確保安全，我們將 API Key 儲存在 Vercel 雲端。透過這個指令能安全地將雲端環境變數拉取回本機的 `.env` 檔案，供本地測試時讀取。
- **`vercel dev`**：原本 Vite 的 `npm run dev` 無法啟動 `/api` 後端程式。`vercel dev` 能夠同時啟動前端畫面與後端 API，完美模擬最終部署上線的全端伺服器環境。

</details>

---

## 🎯 學生課後練習

完成基礎的「會議紀錄生成工具」後，請嘗試以下兩項挑戰來擴充您的工具：

### 挑戰 1：新增多國語言切換功能
- 在 UI 介面上新增一個下拉選單（例如選項包含：英文、日文、韓文、法文）。
- 當使用者點擊送出時，將該語言選項動態帶入 Prompt 之中，讓最後產出的「翻譯版本」能依據使用者的選擇改變目標語言。

### 挑戰 2：情境切換，變身「客服信件草稿產生器」
- 嘗試修改 `System Instructions`，將 AI 的角色從「會議紀錄助理」改為「資深客服人員」。
- 當使用者貼上一段「客戶抱怨對話」時，讓 AI 自動產出：
  1. 客戶的情緒狀態與問題核心總結。
  2. 一封得體的致歉與補償 Email 草稿（請包含中文與英文雙語版本）。

---

## 💻 實作專案請放此處

- 請透過以下指令初始化您的專案 (建議選擇 React + TypeScript)：
  ```bash
  npm create vite@latest
  ```
- 請將專案相關程式碼建立於目前的資料夾內 (`/⽤AI寫總結和翻譯/`)。
