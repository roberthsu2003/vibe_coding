# 📑 AI First 實戰進階：智慧商業數據分析與動態洞察儀表板（Google Cloud Run 全託管版）

> **30 秒專案介紹**：  
> 這是一個結合 **Google 最新世代 Gemini 3 系列（`gemini-3.8-flash`）**、純前端資料解析（`xlsx` / `papaparse`）與 **Google Cloud Run** 的商業智慧 (BI) 應用。  
> 網頁啟動時**自動載入 `public/` 資料夾的預設數據檔案**，AI 自動理解欄位結構並**智慧推薦 4~6 種深度分析面向**供使用者挑選。使用者選擇後，系統**即時生成動態互動圖表、關鍵 KPI 指標卡與商業策略建議**，更可**一鍵匯出包含完整分析報表與計算公式的全新 Excel 檔案（.xlsx）**！  
> 支援**單一通用上傳區（CSV 與 XLSX 拖曳即用）**，且具備**「更新即清空」**防呆機制。透過 Google AI Studio 一鍵部署至 **Google Cloud Run**，享有 **Backend Proxy 伺服器端金鑰保護** 與 **縮容至 0 (Scale to Zero) 免費待機**！

---

## 📥 第一步：下載課程素材檔案

請點擊下方按鈕**一鍵下載商業數據完整素材包**，解壓縮後稍後會放入專案中使用：

> 🎁 **[👉 【推薦】點我一鍵下載「AI數據分析與洞察素材包.zip」](./AI數據分析與洞察素材包.zip)**  
> *(內含以下所有銷售業績 Excel 範本、電商營運 CSV 數據與 Logo)*

### 📂 素材清單與單獨下載

| 檔案名稱 | 格式 | 說明與用途 | 單獨下載 |
| :--- | :---: | :--- | :---: |
| **全通路銷售與業績數據範本.xlsx** | `XLSX` | 官方預設銷售數據（含通路、業務員、品類、銷售額與毛利，**網頁啟動預設自動載入**） | [📥 下載](./全通路銷售與業績數據範本.xlsx) |
| **電商營運分析數據.csv** | `CSV` | 官方切換範本（含會員等級、流量管道、實付金額、運費與顧客評分，**測試 CSV 檔案解析**） | [📥 下載](./電商營運分析數據.csv) |
| **logo.svg** | `SVG` | 現代商業智慧 BI 數據分析標誌圖片（已適配響應式排版） | [🖼️ 下載](./logo.svg) |

<details>
<summary>📋 點擊展開預覽：電商營運分析數據 CSV 內容片段</summary>

```csv
訂單編號,下單日期,會員等級,流量來源,商品品類,品名,購買件數,商品原價,實付金額,運費,優惠折扣,退貨狀態,顧客評分
ORD-EC-801,2026-09-01,VIP白金會員,Google搜尋廣告,智慧穿戴,FitPulse Pro 智慧運動手環,2,4200,7560,0,840,正常完成,5
ORD-EC-802,2026-09-01,一般會員,Facebook社群,行動裝置,Ultra 5G 旗艦機 256GB,1,28000,28000,100,0,正常完成,4
ORD-EC-803,2026-09-02,黃金會員,LINE官方帳號,智慧家電,IoT 靜音抗敏空氣清淨機,1,16800,15120,0,1680,正常完成,5
ORD-EC-804,2026-09-02,新註冊會員,KOL網紅推薦,智慧穿戴,Watch Ultra 專業潛水錶,1,16500,16500,0,0,退貨處理中,2
ORD-EC-805,2026-09-03,VIP白金會員,EDM電子報,商務電腦,ProBook 14 旗艦商務筆電,3,38000,102600,0,11400,正常完成,5
```

</details>

---

## 🚀 第二步：Google AI Studio 實作 3 步驟（SOP）

請依照以下簡單三步驟完成專案建置與 Google Cloud Run 雲端發布：

```
【步驟 1】複製第三步提示詞 ──► 貼至 Google AI Studio 對話框生成專案
                                 ▼
【步驟 2】將素材解壓縮 ─────► 放至專案的 public/ 資料夾內
                                 ▼
【步驟 3】網頁立即測試 ─────► 自動載入預設數據、挑選分析維度、動態圖表與匯出 Excel，一鍵發布！
```

### 1. 建立專案
- 開啟 [Google AI Studio](https://aistudio.google.com/)，點擊右上角建立新 Web 專案。
- 複製下方**「第三步」**的完整提示詞，貼入 AI Studio 對話框發送生成。

### 2. 放置素材檔案
- 專案建立完成後，將剛才下載的 `AI數據分析與洞察素材包.zip` 解壓縮。
- 將解壓後的檔案（`全通路銷售與業績數據範本.xlsx`、`電商營運分析數據.csv`、`logo.svg`）**手動放至專案根目錄的 `public/` 資料夾內**。

### 3. 測試與雲端發布
- **預設自動載入**：網頁啟動時會自動讀取並解析 `public/全通路銷售與業績數據範本.xlsx`，展示資料概覽與前 5 筆預覽。
- **AI 智慧推薦分析維度**：AI 即時掃描資料欄位，列出 4~6 個建議分析視角（如「通路獲利貢獻」、「產品類別交叉分析」），使用者可直接點選有興趣的維度。
- **動態網頁分析儀表板**：點選分析後，網頁即時呈現 **KPI 指標卡**、**視覺化互動圖表（長條圖/折線圖）** 與 **AI 商業策略洞察**。
- **匯出分析結果至全新 Excel**：點擊「📥 匯出分析報告 Excel」，即可下載一份包含原始資料、AI 洞察與統計樞紐的全新 `.xlsx` 活頁簿！
- **更新即自動清除**：點選上傳自訂的 `.csv` 或 `.xlsx` 檔案，舊的分析圖表**立即清空**，並動態重新推薦分析面向。
- **一鍵發布至 Cloud Run**：
  - 點擊右側工具列的 **`Publish`** 按鈕。
  - 自訂 App URL（例如 `ai-data-insights-bi`），最終網址即為：  
    👉 **`https://ai-data-insights-bi.ai.studio`**
  - 點擊 **`Publish your app`**，底層自動建立 **Google Cloud Run** 全託管容器，30~60 秒內發布上線！

---

## 💡 如何用別的 AI 將「你自己的簡報大綱」轉成 RTCCF？

如果你未來想製作自己的專案簡報（或自訂商業數據分析儀表板），只要把你的 Word/Notion 大綱或數據分析需求整理好，貼上下方折疊區內的指令，讓其他 AI（如 ChatGPT、Claude 或 Gemini）協助你轉換成標準 RTCCF 規格書：

<details>
<summary>👉 點擊展開：請其他 AI 協助將「簡報大綱」轉成 RTCCF 的自然語言指令（可直接複製）</summary>

```text
我已經完成了一份簡報文字大綱 Markdown 檔案（包含 6 頁投影片的標題、重點條列、數據與版型規劃）。
我想在 Google AI Studio 開發一個專為上班族設計的「現代科技感線上簡報單頁系統 (Interactive Web Presentation Deck SPA)」，技術棧使用 Vite + React + TypeScript + Tailwind CSS。
功能需求：
1. 支援鍵盤左右箭頭/空白鍵翻頁、全螢幕簡報模式、底部進度條、投影片大綱目錄抽屜。
2. 簡報內容與版型必須抽離至 slidesData.ts。
請扮演資深前端架構師與 Keynote 簡報設計專家，使用標準 RTCCF 框架（包含：# 角色 Role、## 任務目標 Task、## 背景情境 Context、## 核心規則與限制 Constraints、## 輸出規格與風格 Format），將我下方的大綱完整融入規格書中，讓我可以直接複製貼入 Google AI Studio 生成可運行的程式碼：

[在此處貼上你自己的簡報大綱 Markdown 內容]
```

</details>

<br>

<details>
<summary>👉 點擊展開：請其他 AI 協助將「自訂業務數據與動態報表分析需求」轉成 RTCCF 的自然語言指令（數據分析專用）</summary>

```text
我已經完成了一份我們公司內部的銷售/營運業務數據欄位規範與分析需求清單。
我想在 Google AI Studio 開發一個專為商業團隊設計的「智慧商業數據分析與動態洞察儀表板 SPA」，技術棧使用 Vite + React + TypeScript + Tailwind CSS，結合 xlsx、papaparse、recharts 與 Google Gen AI SDK（@google/genai），並部署於 Google Cloud Run。
功能需求：
1. 預設自動透過 fetch 載入 public/ 目錄下的銷售業績 Excel 或 CSV 檔案。
2. 支援通用檔案上傳（.csv、.xlsx 拖曳即用），具備即時清空舊圖表的防呆機制。
3. AI 自動掃描欄位結構並智慧推薦 4~6 個深度商業分析視角。
4. 點選維度後即時呈現關鍵 KPI 指標卡、互動圖表（長條圖/折線圖）與商業策略建議。
5. 支援一鍵打包匯出包含原始數據、分析洞察與樞紐統計的全新 Excel 檔案（.xlsx）。
請扮演資深商業智慧 (BI) 全端架構師，使用標準 RTCCF 框架（包含：# 角色 Role、## 任務目標 Task、## 背景情境 Context、## 核心規則與限制 Constraints、## 輸出規格與風格 Format），將我自訂的數據欄位與分析需求融入規格中：

[在此處貼上你公司自訂的業務數據欄位、CSV範例或分析維度需求]
```

</details>

<br>

---

## 🤖 第三步：專案生成提示詞（點擊代碼框右上角一鍵複製）

請將以下整段提示詞複製，貼到 **Google AI Studio**：

```markdown
# Role（角色）
你是一位精通 React、TypeScript、Tailwind CSS、純前端 Excel/CSV 數據處理（xlsx、papaparse）與互動圖表（Recharts）的資深商業智慧 (BI) 全端工程師，專精於 Google Gen AI SDK（@google/genai）、最新世代 Gemini 3 模型（gemini-3.8-flash）以及 Google Cloud Run 雲端全託管架構。

# Context（背景情境）
這是一個企業級「AI 商業數據分析與動態洞察儀表板（AI Data Insights & Analytics Dashboard）」。
使用者可載入或上傳任何 CSV / Excel 表格資料，AI 自動理解欄位並提供多種分析維度建議，使用者挑選後即時產生動態圖表與文字洞察，並能一鍵將分析成果打包匯出為全新排版美觀的 Excel 檔案。
專案直接運行於 Google AI Studio，並透過右側「Publish」面板主動部署至 Google Cloud Run。
系統後端具備 Cloud Run Backend Proxy 自動代理機制，可透過 `process.env.GEMINI_API_KEY` 安全呼叫 Gemini 模型，API Key 絕不外洩至瀏覽器前端。

# Task（任務目標）
請使用 `vite-react-typescript` 與 Tailwind CSS 建立單一頁面應用程式（SPA）：

1. **安裝與串接最新相依套件**：
   - 使用 `@google/genai` 調用最新世代模型：`gemini-3.8-flash`（支援 1M Token 上下文視窗、極致低延遲、`thinking_level: "low"` 秒級響應）。
   - 使用 `xlsx`（SheetJS）解析與建構 Excel 活頁簿（支援讀取 `.xlsx` 與匯出多工作表 Excel）。
   - 使用 `papaparse`（包含 `@types/papaparse`）解析 CSV 檔案。
   - 使用 `recharts` 或純前端 SVG/Tailwind 圖表元件呈現長條圖、折線圖、環形佔比圖。
   - 使用 `lucide-react` 提供現代商務圖示，`canvas-confetti` 提供分析完成微慶祝動效。

2. **預設自動讀取 public 素材與通用檔案上傳（更新即清除）**：
   - **網頁初始化自動載入**：
     - 應用程式啟動時，自動透過 `fetch('/全通路銷售與業績數據範本.xlsx')` 讀取並以 `xlsx.read()` 解析資料，展示前 5 筆預覽與欄位綱要（Schema）。
   - **單一通用多格式上傳區**：
     - 支援拖曳或點選上傳自訂檔案（`accept=".csv,.xlsx,.xls"`）。
     - 上傳 `.csv` 時以 `Papa.parse` 處理；上傳 `.xlsx` 時以 `XLSX.read` 處理。
   - **只要更新就清除（Auto-Clear on Update）**：
     - 當使用者重新上傳新檔案或切換資料來源時，系統必須**立即清除舊有的分析建議、動態圖表與匯出按鈕**，確保畫面上呈現的資訊永遠與當前數據 100% 同步。
   - 提供「🔄 重設為預設銷售數據範本」按鈕，隨時一鍵重新載入 `public/全通路銷售與業績數據範本.xlsx`。

3. **核心功能一：AI 智慧推薦分析面向（AI Suggested Analyses）**：
   - 資料載入完成後，將資料前 5~10 筆樣本與欄位名稱傳給 Gemini 3.8 Flash。
   - AI 分析資料特徵後，自動產出 4~6 個最具商業價值的分析面向標籤卡片，例如：
     - `📈 各通路營收與毛利貢獻分析`
     - `📊 產品類別銷售與毛利率交叉排行`
     - `🏆 業務代表業績與銷售件數評比`
     - `⚠️ 異常低毛利或退貨風險警示`
     - `💡 顧客消費型態與訂單價值分群`
   - 使用者可點擊單選或多選感興趣的分析維度，點擊「🚀 開始執行深度分析」。

4. **核心功能二：動態網頁互動圖表與策略洞察（Dynamic Visual Dashboard）**：
   - 根據使用者選取的分析面向，AI 進行深度統計計算並結構化回傳 JSON 數據與 Markdown 洞察：
     - **關鍵 KPI 指標卡**：總銷售額、總毛利、平均客單價、訂單總筆數（含環比趨勢標記）。
     - **動態互動圖表**：
       - 通路/類別比較（長條圖 Bar Chart）
       - 趨勢演變（折線圖 Line Chart）
       - 貢獻佔比（圓餅/甜甜圈圖 Pie/Doughnut Chart）
     - **AI 商業洞察與行動建議 (Executive Strategy Insights)**：3~4 點條列式深度建議，點出營運亮點與風險隱憂。

5. **核心功能三：一鍵產出含分析結果的 Excel 活頁簿（Export Comprehensive XLSX）**：
   - 頂部操作列提供「📥 匯出完整分析 Excel 報告」按鈕。
   - 點擊後，利用 `xlsx` 動態建立包含多個工作表的專業 Excel 活頁簿：
     - **工作表 1：`原始數據明細`**：保留所有原始匯入資料列。
     - **工作表 2：`AI 商業策略與 KPI 洞察`**：將 AI 產出的關鍵指標與文字建議整齊排版。
     - **工作表 3：`維度彙總與統計樞紐`**：包含各通路/品類之加總額、平均值與計算公式（如 `=SUM(...)`）。
   - 觸發瀏覽器下載（檔名：`商業數據分析與洞察報告_[日期].xlsx`）。

# Constraints（限制與規格要求）
1. 【Google Cloud Run 原生相容】：全面相容 Google AI Studio 主動部署機制，透過後端代理讀取金鑰，嚴禁在客戶端程式碼硬編碼任何 API Key。
2. 【現代商業智慧 BI 美學】：
   - 配色以 Slate 深灰藍（`#0F172A`、`#1E293B`）與質感淺灰（`#F8FAFC`、`#F1F5F9`）為主，搭配高雅電藍（`#2563EB`）、薄荷綠（`#10B981`）與琥珀橙（`#F59E0B`）高對比圖表色系。
   - 數據指標卡片微陰影、圓角邊框與流暢動畫。
3. 【全繁體中文介面】：所有 UI 標籤、欄位名稱、圖表標註與 AI 洞察回覆皆使用標準繁體中文。
4. 【容錯防呆】：若 public 範本尚未放置，顯示友善提示引導使用者上傳自訂 CSV 或 XLSX 檔案，不可崩潰。

# Format（交付格式）
1. 列出相依套件安裝指令（`npm i @google/genai xlsx papaparse recharts lucide-react canvas-confetti && npm i -D @types/papaparse`）。
2. 提供完整、具備完整 TypeScript 型別定義的單一程式碼檔案（如 `src/App.tsx`）。
3. 簡短執行與 Google Cloud Run 發布步驟。
```

---

## 🏛️ 第四步：Google Cloud Run 部署架構與安全機制剖析

本專案全面相容 Google AI Studio 主動發布機制，直接將容器託管於 **Google Cloud Run**：

![Google Cloud Run 全託管智慧架構](./images/cloudrun_architecture.svg)

### 🔍 為什麼採用 Google Cloud Run 架構？

| 比較維度 | 🚀 Google Cloud Run（本專案標準架構） | ⚠️ 傳統純前端直連 API |
| :--- | :--- | :--- |
| **金鑰安全性** | **極高**。由 Cloud Run 後端代理注入 `GEMINI_API_KEY`，前端完全看不到金鑰 | **極度危險**。金鑰直接暴露在瀏覽器 Network 與原始碼中，易遭盜刷 |
| **部署門檻** | **一鍵發布**。在 AI Studio 點擊 `Publish` 即自動容器化並配發正式網址 | 需自行設定 Docker、網域名稱與伺服器伺服程式 |
| **維運成本** | **縮容至 0 (Scale to Zero)**。無人造訪時不耗算力，每月 200 萬次請求免費 | 需持續租用虛擬主機 (VPS)，即便無人使用每月仍需付費 |
| **即時同步** | 修改提示詞後點擊 **`Republish`**，30 秒內更新雲端，網址永不變更 | 需重新建置 Bundle 並手動上傳伺服器 |

---

## 🛠️ 第五步：常見問題排查：遇到 503 錯誤？如何切換為付費 API Key？

當專案使用 Google 提供的預設免費額度（Free Tier）時，若適逢全球尖峰用量時段，畫面可能會跳出以下警示：

```json
數據分析處理失敗: {
  "error": {
    "code": 503,
    "message": "This model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.",
    "status": "UNAVAILABLE"
  }
}
```

### 💡 為什麼會出現 503 錯誤？
- **免費層共用算力限制**：免費版 API 屬於共享資源池，當尖峰時段需求劇增時，系統會暫時進行流量限制。
- **最佳解法：切換為 Pay-as-you-go（綁定 GCP 帳單的專屬 API Key）**：
  在 [Google AI Studio Get API Key](https://aistudio.google.com/apikey) 建立綁定 Google Cloud 帳單帳戶的金鑰，即可享有**企業級專屬保障算力**（收費極低，分析一份完整報表通常僅需不到 $0.001 美元），徹底擺脫 503 尖峰擁擠！

### 🖼️ Google AI Studio 切換 API Key 4 步驟圖解指南

![Google AI Studio 切換付費 API Key 4 步驟指南](./images/secrets_change_apikey_guide.svg)

### 📋 換 Key 4 步驟 SOP：

1. **切換至「Secrets」頁籤**：
   在 Google AI Studio 右側頂部導航列中，找到並點選 **`Secrets`** 標籤。
2. **切換為已綁定帳單的 API Key**：
   在 `Name: GEMINI_API_KEY` 右側的 `Value` 下拉選單中，點擊並選擇您已綁定 GCP 帳單的付費金鑰（或點選 `+ Add secret` 貼上新申請的 Key）。
3. **點擊「Apply changes」儲存**：
   點擊面板最下方的黑色大按鈕 **`[💾 Apply changes]`**，系統立即將新金鑰寫入專案環境。
4. **回到 Publish 面板點擊「Republish」**：
   切換回 **`Publish`** 面板，點擊 **`[🔄 Republish]`**。Google Cloud Run 容器將在 30 秒內自動代入全新金鑰重新載入，503 錯誤立即迎刃而解！
