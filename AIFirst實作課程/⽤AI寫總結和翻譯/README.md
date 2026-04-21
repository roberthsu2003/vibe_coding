# ⽤ AI 寫總結和翻譯



本單元將帶領學員使用 AI 來進行會議紀錄的重點總結與多國語言翻譯。我們將透過撰寫精準的 Prompt 來約束 AI 的輸出格式。

## 技術棧 (Tech Stack)
實作此生成工具時，建議採用以下前端技術：
- **建置工具**: Vite
- **前端框架**: React
- **程式語言**: TypeScript

## 測試資料：會議紀錄逐字稿
請點擊下方展開會議紀錄，並將內容複製下來，以便在測試 AI 輸出時使用：

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

## 實作 Prompt 範例

在這個實作中，我們將需要兩種 Prompt：
1. **開發網頁的 Prompt**（用來請 AI 幫忙寫 Vite + React 程式碼）
2. **AI 工具的 System Instructions**（設定在程式碼或 AI 平台中，用來約束產出格式）

### 1. 給 AI 寫程式的開發 Prompt
您可以複製以下指令，指揮 AI 幫您生成出前端應用程式：

```markdown
請幫我開發一個「AI 會議記錄生成與翻譯工具」的網頁前端應用程式。
具體的開發需求與規格如下：

#### 1. 技術棧與框架 (Tech Stack)
- 建置工具：Vite
- 核心框架：React
- 程式語言：TypeScript
- 樣式框架：Tailwind CSS (或其他適合的 UI 函式庫，請幫我設計美觀的現代化介面)

#### 2. 核心功能與介面
- **介面語系**：整個應用程式（App）的 UI 介面與所有提示文字都必須使用**繁體中文**呈現。
- **輸入區**：提供一個大型文字方塊（Textarea），讓使用者可以貼上「會議逐字稿」或「重點筆記」。
- **操作按鈕**：包含一個「生成總結與翻譯」的按鈕，點擊時必須顯示 Loading 讀取狀態。
- **輸出顯示區**：將 AI 處理後的結果格式化顯示於畫面中（支援 Markdown 渲染為佳），並且為結果區塊提供一個「一鍵複製」的按鈕。

#### 3. API 整合邏輯
- 請在前端撰寫一個呼叫 AI 模型（例如 Google Gemini 等 API）的串接邏輯。
- 將下方提供的 `System Instructions` 帶入 API 的系統提示詞設定中。
- 當使用者點擊送出按鈕時，將文字框的內容作為 User Prompt 發送。

請列出完整的專案結構，並提供各個檔案所需的完整程式碼。
```

### 2. 設置在工具內的 System Instructions
如果您的 AI 平台（例如 Google AI Studio）支援設定 `System Instructions`，或是要將指令寫入 API 參數中，請直接「複製並貼上」以下內容：

```text
你是一位專業的高階秘書與會議記錄助理。
你的任務是接收一段混亂的會議逐字稿或筆記，將其整理為專業的會議報告，並提供對應的翻譯。

請務必嚴格遵循以下 Markdown 輸出格式：

### 1. 📝 會議摘要 (Executive Summary)
用 3-5 句話簡潔總結會議核心目的與結論。

### 2. 💡 重點討論事項 (Key Discussions)
條列式整理各部門或各位講者的重點發言內容。

### 3. ✅ 待辦事項清單 (Action Items)
使用 Markdown Checkbox 語法 (`- [ ]`) 呈現。
必須明確列出對應的「負責人」與「預計完成時間」。

### 4. 🌐 翻譯版本 (Translation)
請將上述整理好的「會議摘要」與「待辦事項清單」部分，翻譯為專業流暢的商務英文。
```

### [gemini_ai_studio完成範例檔下載](./gemini_ai_完成的範例zip檔/meeting-minutes-assistant.zip)

### 3. 專案升級：遷移至 Vercel Serverless 後端 Prompt
因為直接在前端（React）呼叫 AI API 會有暴露 API Key 的巨大資安風險。當您將專案下載到本地端之後，可以把這段指令餵給本地端的 AI（例如 Cursor、ChatGPT 或 GitHub Copilot），請它幫您把專案改寫為 Vercel Serverless 架構：

```markdown
這是一個基於 Vite + React 所建立的前端專案。為了避免在前端程式碼中暴露 API Key，我需要將呼叫 AI 服務的邏輯遷移至後端。

請幫我將這個專案加入 Vercel Serverless Functions 的支援，具體需求如下：

1. **建立 Serverless 函數**：在專案根目錄建立 `/api` 資料夾，並撰寫一個對接 AI 模型的 Serverless Function（例如 `api/generate.ts`）。請務必明確指定呼叫 `gemini-2.5-pro` 模型，避免使用到過期的舊版模型。
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
```

### 4. Vercel Serverless 本地端測試指南
因為 Vite 原生的開發伺服器無法執行 Vercel 的 Node.js 函數，所以當 AI 幫您改完 Serverless 架構後，原本的 `npm run dev` 必定會出錯或遇到 404。
請跟著以下步驟設定，才能在本地端測試包含 `/api` 的全端網站：

1. **全域安裝 Vercel CLI**：
   ```bash
   npm install -g vercel
   ```
2. **登入並連結專案**：
   在您的專案根目錄中，將本地程式碼與 Vercel 雲端專案進行連結：
   ```bash
   vercel link
   ```
3. **同步環境變數**：
   將設定在 Vercel 雲端上的 `GEMINI_API_KEY` 拉取到本地專案的潛藏設定檔中（會自動建立 `.env.local` 且不會上傳到 GitHub）：
   ```bash
   vercel env pull .env.local
   ```
4. **啟動全端測試伺服器**：
   請停用原本的 `npm run dev`，一律改用以下指令啟動專案：
   ```bash
   vercel dev
   ```
   啟動後，前端 Vite 畫面與後端 `/api` 將會合併在同一個本地網址運行（通常是 `http://localhost:3000`），即可順利測試！

## 🎯 學生課後練習

完成基礎的「會議紀錄生成工具」後，請嘗試以下兩項挑戰來擴充您的工具：

1. **新增多國語言切換功能**
   - 在 UI 上新增一個下拉選單（例如選項包含：英文、日文、韓文、法文）。
   - 當使用者點擊送出時，將該語言選項動態帶入 Prompt 之中，讓最後產出的 `4. 翻譯版本` 能依據選擇改變語言。
   
2. **情境切換：變身「客服信件草稿產生器」**
   - 嘗試修改 `System Instructions`。
   - 將角色從「會議紀錄助理」改為「資深客服人員」。
   - 當貼上一段「客戶抱怨對話」時，讓 AI 自動產出：
     1. 客戶情緒與問題總結。
     2. 一封得體的致歉與補償 Email 草稿（包含中文與英文雙語版本）。

## 實作專案請放此處

- 請透過 `npm create vite@latest` 初始化專案 (選擇 React + TypeScript)。
- 並將專案相關程式碼建立於此資料夾內 (`/⽤AI寫總結和翻譯/`)。
