# AI 分析與洞察

本單元將帶領學員使用 AI 來進行 CSV/Excel 數據資料的自動化分析與洞察。我們將打造一個工具，能讓使用者上傳或貼上表格資料，並由 AI 協助理解欄位意義、檢查缺值與異常，最終產出包含統計與趨勢的摘要報告。

## 🛠 技術棧 (Tech Stack)

實作此生成工具時，建議採用以下前端技術：
- **建置工具**: Vite
- **前端框架**: React
- **程式語言**: TypeScript
- **樣式框架**: Tailwind CSS

---

## 📂 測試資料：銷售業績 CSV 範例片段

在開發與測試階段，請複製以下 CSV 內容，作為應用程式的測試輸入內容：

<details>
<summary>📋 點我展開 CSV 資料</summary>

```csv
訂單編號,日期,業務員,產品類別,銷售數量,單價(NTD),總金額(NTD)
ORD-001,2023-10-01,張小明,筆記型電腦,5,30000,150000
ORD-002,2023-10-02,李大華,智慧型手機,12,25000,300000
ORD-003,2023-10-03,王建國,平板電腦,,15000,
ORD-004,2023-10-03,張小明,智慧型手機,3,25000,75000
ORD-005,2023-10-04,陳淑芬,穿戴裝置,20,5000,100000
ORD-006,2023-10-05,陳淑芬,筆記型電腦,1,30000,30000
ORD-007,2023-10-06,王建國,異常測試商品,500,999999,499999500
ORD-008,2023-10-07,李大華,穿戴裝置,8,5000,40000
```
*(注意：此資料包含刻意留空的值與極端的異常值)*

</details>

---

## 🚀 實作步驟與 Prompt 範例

在這個實作中，我們將使用不同的 Prompt 來完成應用程式的開發與 AI 行為設定：

### 1. 開發前端網頁的 Prompt

您可以複製以下指令，交給 AI 輔助開發工具（如 Cursor、GitHub Copilot）來生成前端應用程式的基礎架構與畫面：

```markdown
請幫我開發一個「AI 數據分析與洞察工具」的網頁前端應用程式。
具體的開發需求與規格如下：

#### 1. 技術棧與框架 (Tech Stack)
- 建置工具：Vite
- 核心框架：React
- 程式語言：TypeScript
- 樣式框架：Tailwind CSS (請幫我設計美觀、現代化的介面)

#### 2. 核心功能與介面
- **介面語系**：整個應用程式（App）的 UI 介面與所有提示文字都必須使用**繁體中文**呈現。
- **輸入區**：提供一個大型文字方塊（Textarea），讓使用者可以貼上「CSV 格式」的報表資料。
- **操作按鈕**：包含一個「開始 AI 分析」的按鈕，點擊時必須顯示 Loading 讀取狀態，避免重複點擊。
- **輸出顯示區**：將 AI 分析後的結果格式化顯示於畫面中（支援 Markdown 渲染為佳），並且為結果區塊提供一個「一鍵複製」的按鈕。

#### 3. API 整合邏輯
- 請在前端撰寫一個呼叫 AI 模型（例如 Google Gemini 等 API）的串接邏輯。
- 請設計一個 `System Instructions` 常數，用來設定 AI 的行為與輸出格式，並在呼叫 API 時帶入。
- 當使用者點擊送出按鈕時，將文字框的 CSV 內容作為 User Prompt 發送。

請列出完整的專案結構，並提供各個檔案所需的完整程式碼。
```

### 2. AI 模型的 System Instructions

為了讓 AI 每次都能輸出結構化的數據分析報告，我們需要設定 `System Instructions`。請將以下提示詞設定到您的程式碼或是 AI 平台中：

```markdown
你是一位專業的資料分析師。
你的任務是接收一段 CSV 或表格結構的原始數據，理解其欄位意義，並提出精確的摘要報告與洞察。

請務必嚴格遵循以下 Markdown 輸出格式：

### 1. 📊 資料概況與欄位理解
簡要說明這份資料的主題是什麼，並列出關鍵欄位的意義。

### 2. ⚠️ 異常與缺值檢查
檢查資料中是否有空白（例如缺少數量或金額）、極端值（例如不合理的高價），並將發現的異常項目條列出來。若無異常，說明「未發現明顯異常」。

### 3. 📈 統計與趨勢洞察
請回答以下問題的總結：
- **總計概況**：銷售數量或總金額的大概加總。
- **分類表現**：哪個業務員或哪項產品表現最好？
- **業務建議**：從數據中給出 1-2 個可以執行的商業建議。

請以 Markdown 格式輸出，所有繁體中文部分必須使用**繁體中文**回覆，不要包含任何額外的問候語或結語。
```

> **💡 範例參考**
>
> 如果需要參考完整的實作程式碼，可以下載：[Gemini AI Studio 完成範例檔](./gemini_ai_完成的範例zip檔/data-analysis-assistant.zip)

---

## 🔒 專案升級：遷移至 Vercel Serverless 後端

**⚠️ 資安警告**：直接在前端（React）呼叫 AI API 會導致 API Key 暴露在瀏覽器中，這是非常危險的做法！

當您在本地端完成初步測試後，請務必將呼叫 AI 服務的邏輯遷移至後端。您可以將以下 Prompt 餵給 AI，請它幫您將專案改寫為 Vercel Serverless 架構：

```markdown
這是一個由 **Google AI Studio** 協助建立的 Vite + React 純前端專案，專案結構與 Vercel Serverless Functions 的標準架構不同，在加入 `/api` 後端時可能需要額外調整。

請在現有的前端專案中，新增**多 AI 服務提供商選擇功能**，並透過 Vercel Serverless Function 呼叫 AI API，具體需求如下：

1. **新增 AI 服務選擇介面**：在 UI 介面中加入一個下拉選單或切換按鈕，讓使用者可以在送出前選擇要使用的 AI 服務：
   - **Google Gemini**（模型：`gemini-2.5-flash-lite`）
   - **NVIDIA**（模型：`nvidia/nemotron-mini-4b-instruct`）

2. **建立 Serverless Function**：在專案根目錄建立 `/api/analyze.ts`，在後端根據前端傳入的服務選擇，動態呼叫對應的 AI API：
   - **Gemini API**：使用 `process.env.GEMINI_API_KEY` 讀取 API Key，模型為 `gemini-2.5-flash-lite`。
   - **NVIDIA API**：使用 `process.env.NVIDIA_API_KEY` 讀取 API Key，Base URL 為 `https://integrate.api.nvidia.com/v1`，模型為 `nvidia/nemotron-mini-4b-instruct`。

3. **改寫前端串接邏輯**：前端將使用者選擇的服務商與輸入內容一起傳送至 `/api/analyze`，不直接呼叫任何 AI 平台。

4. **環境變數設定**：將兩組 API Key 儲存於 Vercel 後台的環境變數中，並透過 Node.js 的 `process.env` 讀取，確保私鑰不外洩至前端：

       GEMINI_API_KEY=你的_Gemini_API_Key
       NVIDIA_API_KEY=你的_NVIDIA_API_Key

   同時，請在專案根目錄建立 `.env.local` 檔案，內容如下（供本地開發測試使用）：

       GEMINI_API_KEY=你的_Gemini_API_Key
       NVIDIA_API_KEY=你的_NVIDIA_API_Key

   > ⚠️ **重要**：`.env.local` 包含機密金鑰，請確認 `.gitignore` 中已有此條目，**絕對不可上傳至 GitHub**。
```

### 💻 Vercel Serverless 本地端測試指南

因為 Vite 原生的開發伺服器無法執行 Vercel 的 Node.js 函數，改寫為 Serverless 架構後，原本的 `npm run dev` 必定會出錯或遇到 404 找不到 `/api` 路由的問題。

請依照以下步驟設定，才能在本地端順利測試包含 `/api` 的全端網站：

1. **安裝專案套件與全域安裝 Vercel CLI**：
   請先安裝專案所需的依賴套件，並全域安裝 Vercel CLI：
   ```bash
   npm install
   npm install -g vercel
   ```

2. **登入 Vercel 帳號**：
   （**⚠️ 帳號提醒**：由於學員可能共用電腦或擁有多個帳號，請先執行 `vercel logout` 登出前一個帳號，再以 `vercel login` 重新登入自己的帳號。）
   ```bash
   vercel logout
   vercel login
   ```

3. **手動建立 `.env.local` 檔案**：
   在專案根目錄建立 `.env.local`，填入您的 API Key（此步驟取代從雲端拉取，適合尚未部署至 Vercel 的情境）：
   ```
   GEMINI_API_KEY=你的_Gemini_API_Key
   NVIDIA_API_KEY=你的_NVIDIA_API_Key
   ```
   > ⚠️ 請確認 `.gitignore` 中已包含 `.env.local`，**絕對不可上傳至 GitHub**。

4. **連結 Vercel 專案**：
   在專案根目錄執行以下指令，依照提示建立或連結一個 Vercel 雲端專案（本機測試必須完成此步驟，`vercel dev` 才能正常運作）：
   ```bash
   vercel link
   ```

5. **啟動全端測試伺服器**：
   請停用原本的 `npm run dev`，一律改用以下指令啟動專案：
   ```bash
   vercel dev
   ```
   啟動後，前端 Vite 畫面與後端 `/api` 將會合併在同一個本地網址運行（通常是 `http://localhost:3000`），您就可以順利進行測試了！

> 💡 **已部署至 Vercel 並在後台設定好環境變數的學員**：可跳過步驟 3，改在步驟 4 之後執行 `vercel env pull .env.local`，從雲端直接同步環境變數。

<details>
<summary>💡 進階說明：由 Google AI Studio 完成的專案為何需要這些設定？</summary>

因為這些程式是由 **Google AI Studio** 協助完成的專案，原本通常是單純的前端架構。當我們為了安全性加入後端 API 時，就需要透過上述指令來設定 Vercel 的環境。

**1. 如何確認專案架構已經符合上傳至 Vercel？**
在上傳或測試前，請檢查您的專案目錄是否具備以下結構：
- **`api/` 資料夾**：專案根目錄必須包含 `api/` 資料夾，並且裡面有處理 API 請求的 Serverless 函數程式碼（例如 `analyze.ts`）。
- **不需要 `vercel.json`**：Vercel 的零配置功能會自動偵測 Vite 專案並處理 `api/` 路由，無需此檔案。若專案中已有 `vercel.json`，請直接刪除。
- **不包含機密金鑰**：確保程式碼中已經將寫死的 API Key 移除，改為透過 `process.env` 讀取環境變數。

**2. 為什麼要加入這些指令？**
- **`npm install`**：從 Google AI Studio 或外部取得的專案原始碼，並不會包含 `node_modules` 資料夾。必須先執行此指令安裝所有必備套件，專案才能正常運作。
- **`npm install -g vercel`**：安裝 Vercel 官方提供的 CLI 工具，讓我們可以在本地電腦上模擬完整的 Vercel 雲端環境。
- **`vercel link`**：將您本地電腦的專案資料夾與 Vercel 雲端上已經建立的專案綁定，確保後續操作能對應到正確的雲端專案。
- **`vercel env pull .env.local`**：為確保安全，我們將 API Key 儲存在 Vercel 雲端。透過這個指令能安全地將雲端環境變數拉取回本機的 `.env.local` 檔案，供本地測試時讀取。Vite 優先讀取 `.env.local`，因此使用此檔名最為正確。
- **`vercel dev`**：原本 Vite 的 `npm run dev` 無法啟動 `/api` 後端程式。`vercel dev` 能夠同時啟動前端畫面與後端 API，完美模擬最終部署上線的全端伺服器環境。

**3. Vercel 零配置 (Zero Configuration) 說明**
Vercel 擁有強大的零配置功能，會自動幫你處理大部分的設定：
- **前端自動偵測**：Vercel 會自動偵測到你的專案是使用 Vite（從 `package.json` 判斷），並自動執行 `npm run build`，且預設知道輸出目錄是 `dist`。
- **API 自動路由**：Vercel 預設會將專案根目錄下 `api/` 資料夾裡面的檔案自動視為 Serverless Functions，並自動處理好路由（例如：打 `/api/analyze` 的請求會自動對應到 `api/analyze.ts`），完全不需要手動設定。

</details>

---

## 🎯 學生課後練習

完成基礎的「AI 數據分析與洞察工具」後，請嘗試以下兩項挑戰來擴充您的工具：

### 挑戰 1：實作真實的 Excel (XLSX) 檔案上傳
- 整合 `xlsx` (SheetJS) 或 `papaparse` 函式庫。
- 讓使用者可以直接點擊按鈕選擇本地端的 `.csv` 或 `.xlsx` 檔案，而非只能貼上文字。
- 在前端將檔案轉換為 JSON 或純文字 CSV 後，再傳遞給 AI 進行分析。

### 挑戰 2：客製化不同的分析視角
- 新增分析維度選項單，讓使用者可以勾選「行銷視角」、「財務視角」、「庫存視角」。
- 當使用者點擊分析時，將該視角需求動態加入 Prompt，讓 AI 根據使用者的角色給出不同的洞察與建議。
