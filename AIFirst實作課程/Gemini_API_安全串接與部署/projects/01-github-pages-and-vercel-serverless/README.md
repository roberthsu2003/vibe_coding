# 專案一：GitHub Pages + Vercel Serverless

**目標**：靜態前端託管在 **GitHub Pages**，**Gemini 呼叫**經由 **Vercel** 上的 Serverless API；`GEMINI_API_KEY` 僅設在 **Vercel 專案環境變數**，並設定 **CORS** 允許 Pages 網域。

- 上層講義：[`../../README.md`](../../README.md)
- 技術棧先修與慣例可對照：**[react_typescript_vite](https://github.com/roberthsu2003/react_typescript_vite)**（本專案前端亦採 **React + TypeScript + Vite**）。

---

## 本專案需求（必備）

以下為**必須達成**的規格；未符合者視為未完成本專案。

### 教學目標

- 實際做出 **「靜態前端（GitHub Pages）+ 後端代理（Vercel Serverless）」**，並能說明 **Gemini API key 為何沒有外洩到瀏覽器或公開儲存庫**。

### 架構與託管（硬性規定）

| 項目 | 需求 |
|------|------|
| **前端** | 使用 **React + TypeScript + Vite** 建置；產出為**靜態檔**，並部署至 **GitHub Pages**（或課程指定之等效靜態託管）。 |
| **後端** | 使用可部署於 **Vercel** 的 **Serverless API**（Node），負責**唯一**向 Google **Gemini** 發請求。 |
| **呼叫鏈** | 使用者瀏覽器 → **僅**呼叫你部署在 Vercel 上的 **HTTPS API** → 後端再呼叫 Gemini。**禁止**瀏覽器直接呼叫 Google Generative Language API 或在前端持有 `GEMINI_API_KEY`。 |
| **跨網域** | 前端網域（Pages）與 API 網域（Vercel）不同時，後端必須設定 **CORS**，**允許**你的 GitHub Pages 來源。 |

### 目錄與程式組織（建議，以利批改）

- **`frontend/`**：Vite 前端專案。
- **`api/`**（或 Vercel 文件規定的對應目錄）：Serverless 入口與路由。
- **後端**可將呼叫 Gemini 的邏輯集中在 **`services/`** 或單一模組（非強制檔名，但須能清楚指出「哪裡在呼叫 Gemini」）。

### 金鑰與設定檔

| 項目 | 需求 |
|------|------|
| **Vercel（線上後端）** | 在 **Vercel 專案 → Environment Variables** 設定 `GEMINI_API_KEY`（或與程式一致之名稱），**不得**將真鑰寫入前端建置或公開檔案。 |
| **本機開發** | 使用 **`.env`**（或平台慣用方式）且 **`.env` 已列入 `.gitignore`**。 |
| **儲存庫** | 根目錄（或子專案根目錄）提供 **`.env.example`**，**只**列出變數**名稱**與簡短說明，**不可**含真鑰。 |

### 原始碼與版本控制

- 專案程式碼 **push 至 GitHub**（公開或依課程規定之可見範圍）；**commit 歷史與檔案中不得出現真實 API key**。

### 功能範圍（最低限度）

本專案**預設實作**以下畫面與行為（與下方 Prompt 範本一致）；進階美化為選配。

- **單頁**應用，頁面標題顯示：**「Gemini 一句話問答」**（或同義中英文標題，須固定可辨識）。
- **一個多行文字框**：供使用者輸入想問 Gemini 的內容；placeholder 須提示「請輸入問題」之類說明。
- **一個「送出」按鈕**：點擊後，前端**只**呼叫後端 API；送出與等待回應期間按鈕可 disabled 或顯示載入中，避免重複送出。
- **結果區**：成功時在輸入區**下方**顯示 **Gemini 回覆全文**（純文字即可）；失敗時顯示**簡短錯誤訊息**（勿在畫面上顯示 API key）。

### 驗收檢查（繳交前自行確認）

1. **Network**：在已部署的 GitHub Pages 上操作時，開發者工具 → Network 中，**不可**看到請求內含 Gemini API key，且**不可**看到對 `generativelanguage.googleapis.com`（或同類）的**瀏覽器直連**（應僅見對你自己 Vercel API 網址的請求）。  
2. **儲存庫**：搜尋 `GEMINI`、`AIza` 等，確認無誤提交之金鑰字串。  
3. **口頭或書面**：能說明金鑰放在 **Vercel 哪裡**、前端如何設定 **API 基底網址**（例如 `VITE_API_BASE_URL`）。

---

## 在 Google AI Studio 裡下 Prompt（與本專案架構）

在 AI Studio 產生程式時，**請在 Prompt 裡主動寫清楚技術棧與目錄**，否則模型容易給出「前端直接帶 API key」的單頁範例，與本單元目標衝突。建議每次開新對話或改需求時，都附上下面**架構約束**（可整段複製再補你的畫面／功能描述）。

### 請 AI 遵守的專案架構（摘要）

| 區塊 | 要求 |
|------|------|
| **前端** | **React + TypeScript + Vite**；建置結果為**靜態檔**，日後部署 **GitHub Pages**（或同類靜態託管）。程式放在 `frontend/`。 |
| **後端** | **Vercel Serverless**（或相容的 Node API 目錄），負責呼叫 Gemini；程式放在 `api/`（或 Vercel 慣用的 `/api` 結構）。 |
| **金鑰** | **禁止**在前端程式、HTML、或 `import.meta.env` 的公開變數中出現真實 `GEMINI_API_KEY`。金鑰僅能由**後端**從環境變數讀取。 |
| **前端呼叫方式** | 瀏覽器只 `fetch` **你自己後端的 HTTPS 網址**（相對路徑或設定 `VITE_API_BASE_URL` 指向該網址），**不**直接打 Google Generative Language API。 |
| **其餘** | 提供 `.env.example`（僅變數名稱）；`gemini` 相關邏輯可集中於後端的 `services/` 或單一模組，方便日後維護。 |

### Prompt 範本（可複製後修改）

將下方 `[ ]` 內改成你的需求即可。

```text
請用 React + TypeScript + Vite 建立專案，並符合下列架構（與課程「GitHub Pages + Vercel Serverless」一致）：

技術棧：
- 前端：Vite + React + TypeScript（與常見 react_typescript_vite 專案慣例相容即可）
- 後端：提供可部署到 Vercel 的 Serverless API（Node），用於代理呼叫 Google Gemini API

目錄結構請採用或貼近：
- frontend/     … Vite 前端，build 後為靜態檔，供 GitHub Pages
- api/            … Vercel Serverless 入口（或你採用的 Vercel 慣用結構）
- .env.example    … 只列出需要的環境變數名稱（例如 GEMINI_API_KEY），不要寫真鑰

安全要求（必須遵守）：
- GEMINI_API_KEY 只能出現在後端執行環境；前端不得持有或打包 API key
- 前端僅透過 fetch 呼叫我們自己的 API 路徑；由後端讀取 process.env.GEMINI_API_KEY（或平台規定的方式）再呼叫 Gemini
- 若需跨網域，請在後端說明如何設定 CORS（允許 GitHub Pages 的網域）

功能需求（請依此實作，勿省略）：
- 單頁應用，頁面標題為「Gemini 一句話問答」（或清楚同義標題）。
- 一個多行輸入框，placeholder 提示使用者輸入要向 Gemini 提問的文字。
- 一個「送出」按鈕；點擊後由前端呼叫我們自己的後端 API，等待期間顯示載入中或停用按鈕。
- 成功時在輸入區下方顯示 Gemini 回覆（純文字）；失敗時顯示簡短錯誤訊息，且畫面與 Network 皆不得暴露 GEMINI_API_KEY。

請分檔給出關鍵程式碼，並簡述本機如何分別啟動前端與測試 API。
```

產出後，請仍依下一節流程**搬到本機、移除任何誤放在前端的金鑰**，再推上 GitHub。

---

## 建議實作流程（本專案）

1. 在 **Google AI Studio** 使用上面的 **Prompt 與架構約束**產生程式，先做出可運作的原型（此時若 AI 仍誤把金鑰寫在前端，請在下一步修正）。
2. 將成果**匯出或複製到本機**，用 **VS Code** 開啟專案。
3. **移除前端／範例裡直接寫死的 API key 或瀏覽器端直連 Gemini**，改為：**前端只呼叫你自己在 Vercel 上的 API**，金鑰只放在 **Vercel 環境變數**（本機可用 `.env`，且 `.env` 列入 `.gitignore`，僅提交 `.env.example`）。
4. 修改、測試無誤後，**推送到 GitHub**；再依課程設定 **GitHub Pages**（靜態）與 **Vercel**（後端）。

請於此資料夾內建立 `frontend/`、`api/`（或平台慣用結構）與 **`.env.example`**（只列變數名，不含真鑰）。

---

## 常見問題：GitHub Actions 與 Secrets

### 1. GitHub Actions 要寫在檔案裡，還是只能在網頁上設定？

**主要寫在倉庫裡的檔案。** 在專案根目錄建立：

`.github/workflows/你的名稱.yml`

在該 YAML 裡定義「何時觸發、跑哪些步驟」（例如 `npm ci`、`npm run build`、部署指令）。這些檔案會跟程式一起 **commit、push**，別人 clone 下來也能看到**流程定義**。

網頁上（Repository **Settings**）多半是做：**開關權限**、**哪些分支可跑 Actions**、以及下面的 **Secrets** 等，**不是**用網頁取代整份 workflow 檔；若沒有 `.github/workflows/` 裡的檔案，就**不會**自動跑出你自訂的 workflow。

（本專案若暫時只用 Vercel 連 GitHub 自動部署、不必從 GitHub 跑 CLI，也可以**先不建立** Actions；需要時再加。）

### 2. Secrets 要寫在檔案裡嗎？

**不要。** 真實金鑰、token 應在 GitHub **網頁**設定：

**Settings → Secrets and variables → Actions → New repository secret**

建立名稱（例如 `GEMINI_API_KEY`）並貼上值；儲存後在程式碼與公開畫面中**看不到**內容。

在 **`.github/workflows/*.yml`** 裡**不要**寫死金鑰，改以佔位符讀取，例如：

```yaml
env:
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

或依該步驟文件寫在 `run:` 需要的環境變數中。**Vercel 專案後台**的環境變數則在 **Vercel 網站**設定，與 GitHub Secrets **分開**：前者給「已部署的 Vercel 服務」執行時用；後者給「在 GitHub 上跑的 Actions」在建置／部署步驟時用（若你有用到）。

---

## 小結

| 項目 | 放在哪裡 |
|------|----------|
| **Actions 流程**（何時跑、跑什麼指令） | 倉庫內 **`.github/workflows/*.yml`** |
| **GitHub Secrets**（給 Actions 用的金鑰） | **GitHub 網頁** Settings 裡新增；YAML 用 `${{ secrets.名稱 }}` 引用 |
| **Vercel 上的 API 金鑰**（給線上後端執行） | **Vercel 專案 → Environment Variables**（與 Secrets 不同處，見上層講義） |
