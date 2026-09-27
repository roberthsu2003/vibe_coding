# 📑 AI First 實戰進階：Workspace 智慧單據報銷系統（Google Sheets 原生整合 ⚡）

> **30 秒專案介紹**：  
> 每到月底總是被淹沒在超商、加油站、計程車與文具店的發票收據中嗎？傳統人工作業必須肉眼盯著發票打統編、手動分類會計科目、再一筆筆敲進 Excel 或 Google 試算表，枯燥又容易出錯。  
> 本專案透過 **Gemini 多模態視覺模型** 結合 **Google AI Studio 最新「Integrations 原生整合面板」**，讓員工直接拍照或拖曳上傳發票，AI 瞬間自動拆解金額明細與會計科目，點擊授權後**直接將整筆記錄以新列寫入個人雲端 Google 試算表**，更支援一鍵下載保留公式與排版的正式 Excel 請款單！  
> 透過 Google AI Studio 一鍵部署至 **Google Cloud Run**，享有 **Backend Proxy 伺服器代理機制**，零金鑰與憑證外洩風險！

---

## ⚡ Google Workspace 原生整合亮點

本專案深度整合 Google AI Studio 的官方原生能力，無須自行在 GCP 建立複雜的 OAuth 2.0 Client ID 與處理 Token：

| 整合服務 | 官方功能卡片 | 核心串接機制 | 專題全景指引 |
| :--- | :---: | :--- | :--- |
| **Google Sheets** | ![Google Sheets](../GoogleWorkspace原生整合說明/images/workspace_integrations/google_sheets.png) | 透過 Google 帳號一鍵授權，直接調用 Sheets API 將結構化報銷紀錄批次追加（Append Row）至指定的雲端試算表末端。 | [👉 查看 Google Workspace 14 大原生整合完整指南](../GoogleWorkspace原生整合說明/README.md) |

---

## 📥 第一步：下載課程素材檔案

我們為大家準備了 3 個可直接下載的教學素材，讓你在課堂上無須拿出個人私人發票即可立即測試：

| 檔案名稱 | 格式 | 說明與用途 | 下載連結 |
| :--- | :---: | :--- | :---: |
| **sample_receipt_invoice.svg** | `SVG` | 台灣電子發票證明聯示範圖（含 QR Code、超商咖啡點心明細、統編與條碼） | [📥 點我下載圖檔](./sample_receipt_invoice.svg) |
| **2026公司報銷流水帳_範本.csv** | `CSV` | Google 試算表範本（含標準 7 大欄位與 4 筆預設歷史報帳紀錄，可直接匯入 Google Sheets） | [📥 點我下載 CSV](./2026公司報銷流水帳_範本.csv) |
| **receipt_mock_data.md** | `MD` | 4 筆超詳細企業日常報帳文字明細（超商茶點、加油油資、文具耗材、高鐵車票） | [📥 點我檢視 Markdown](./receipt_mock_data.md) |

<br>

<details>
<summary>📋 點擊展開：檢視 receipt_mock_data.md 完整文字偽資料（可直接複製測試）</summary>

```markdown
# 📌 案例一：【統一超商 7-ELEVEN 電子發票】（跨部門會議茶點）
- 發票號碼：AB-98765432
- 開立日期：2026-10-12 14:25
- 買受人統編：54321098（公司統編）
- 賣方名稱：統一超商股份有限公司台北松高分公司（統編：22555003）
- 消費明細：
  1. 大杯美式咖啡 x 5 ($225)
  2. 原味手工可頌 x 3 ($135)
  3. 瓶裝礦泉水 x 2 ($60)
- 總計金額 (NTD)：$420（營業稅額：$20）
- AI 建議會計科目：餐飲交際
- 報銷事由備註：Q4產品跨部門籌備會議茶水點心

---

# 📌 案例二：【台灣中油加油站電子發票】（外勤出差油資）
- 發票號碼：CD-12345678
- 開立日期：2026-10-14 09:18
- 買受人統編：54321098
- 賣方名稱：台灣中油股份有限公司建國北路站（統編：03795505）
- 消費明細：95無鉛汽油 32.00公升 @ 32.0元 ($1,024)
- 總計金額 (NTD)：$1,024
- AI 建議會計科目：差旅交通
- 報銷事由備註：拜訪新竹科學園區客戶洽談合作來回公務車加油
```

</details>

---

## 🚀 第二步：Google AI Studio 實作 3 步驟（SOP）

請依照以下簡單三步驟完成專案建置與 Google Cloud Run 雲端發布：

```
【步驟 1】開啟 AI Studio 右側 Integrations ──► 點擊 Google Sheets「Enable」
                                                  ▼
【步驟 2】複製第三步提示詞 ────────────────► 貼至 AI Studio 對話框生成專案
                                                  ▼
【步驟 3】網頁立即測試 ──────────────────► 上傳發票辨識、一鍵登錄 Sheets、一鍵 Publish！
```

### 1. 啟用 Google Sheets 原生整合
- 開啟 [Google AI Studio](https://aistudio.google.com/)，點擊右上角進入 **Build Mode** 建立新 Web 專案。
- 查看右側工具列的 **`Integrations`** 面板，找到 **`Google Sheets`** 並點擊 **`Enable（啟用）`**。

### 2. 貼入提示詞生成應用程式
- 複製下方**「第三步」**的完整 RTCCF 提示詞，直接貼入 AI Studio 對話框發送生成。

### 3. 測試與雲端發布
- **發票圖片多模態辨識**：拖曳或點選上傳 `sample_receipt_invoice.svg`，點擊「⚡ 開始 AI 智慧解析」，Gemini 自動萃取店家、日期、金額與會計科目。
- **一鍵登錄至 Google 試算表**：點擊「Sign in with Google」登入個人 Google 帳號，填入目標試算表 ID，點擊「📥 登錄至 Google 試算表」，資料立即以新列追加至雲端試算表！
- **離線 Excel 請款單下載**：點擊「📑 匯出本筆報銷 Excel 請款單」，瀏覽器立即下載保留排版與加總公式的正式 `.xlsx` 請款單。
- **一鍵發布至 Cloud Run**：
  - 點擊右側工具列的 **`Publish`** 按鈕。
  - 自訂 App URL（例如 `smart-expense-sheets-hub`），點擊 **`Publish your app`**，30~60 秒內由 Google Cloud Run 全託管發布上線！

---

## 💡 如何用別的 AI 將「你公司自訂的報銷單欄位」轉成 RTCCF？

如果你未來想客製化自己公司的報銷系統（例如：新增「專案代碼 (Project Code)」、「成本中心 (Cost Center)」或「主管審批人工號」），只要把你的欄位名稱與規格整理好，貼入下方指令，讓其他 AI（如 ChatGPT、Claude 或 Gemini）協助你轉換成標準 RTCCF 規格書：

<details>
<summary>👉 點擊展開：請其他 AI 協助客製報銷欄位的自然語言指令（可直接複製）</summary>

```text
我已經完成了一份公司內部的報銷欄位規格與會計科目清單。
我想在 Google AI Studio 開發一個專為辦公室員工設計的「Workspace 智慧單據報銷系統 SPA」，技術棧使用 Vite + React + TypeScript + Tailwind CSS，並使用 Google AI Studio 原生的 Google Sheets Integration。
功能需求：
1. 支援發票收據圖片上傳，利用 Gemini 多模態視覺模型辨識。
2. 自動萃取各項消費欄位並分類會計科目。
3. 整合 Google 帳號授權，一鍵將確認無誤的資料以新列寫入指定的 Google Sheets 試算表中。
4. 提供一鍵離線下載 Excel 請款單功能。
請扮演資深全端架構師，使用標準 RTCCF 框架（包含：# 角色 Role、## 任務目標 Task、## 背景情境 Context、## 核心規則與限制 Constraints、## 輸出規格與風格 Format），將我自訂的報銷欄位融入規格中：

[在此處貼上你公司自訂的報銷欄位、專案代碼、成本中心與會計科目清單]
```

</details>

<br>

---

## 🤖 第三步：專案生成提示詞（點擊代碼框右上角一鍵複製）

請將以下整段提示詞複製，貼到 **Google AI Studio**：

```markdown
# 角色 (Role)
你是一位精通企業自動化、React 18+、TypeScript、Tailwind CSS 與 Google Workspace 原生整合的全端架構師，專精於運用 Gemini 多模態視覺能力與 Google Sheets Integration 打造極速辦公室工作流。

## 任務目標 (Task)
請開發一個極具現代商務美感、專為辦公室同仁設計的單頁 Web 應用程式「Workspace 智慧單據報銷系統 (Smart Expense & Invoice Logger)」。

## 背景情境 (Context)
- 開發環境與技術棧：Google AI Studio (Build Mode)、Vite、React 18+、TypeScript、Tailwind CSS、Lucide React 圖示庫、ExcelJS。
- 原生整合：已在 Google AI Studio 啟用 **Google Sheets Integration**。
- 適用對象：經常需要報銷零用金、出差交通費、採購文具與交際茶點的企業同仁與行政財務人員。
- **預先內建的發票示範偽資料結構**：
  若使用者沒有現成發票，提供「⚡ 快速載入示範發票」按鈕，立即填入預設資料進行流程測試：
  - 店家：統一超商松高門市（統編：22555003）
  - 發票號碼：AB-98765432
  - 日期：2026-10-12
  - 品項：大杯美式咖啡 x 5、原味可頌 x 3、瓶裝礦泉水 x 2
  - 總計金額：NT$ 420（稅額 $20，買受人統編：54321098）
  - 科目分類：餐飲交際
  - 事由備註：Q4產品跨部門籌備會議茶水點心

## 核心規則與限制 (Constraints)
1. 頂部 Google 帳號授權與試算表設定列：
   - 整合 Google AI Studio 的 Google 登入驗證流（Sign in with Google）。
   - 登入成功後展示使用者 Google 頭像、名稱與「Google Sheets 連線正常 🟢」徽章。
   - 提供「目標試算表設定」區塊：使用者可填入目標 Google Sheets 網址或 Spreadsheet ID（提供預設提示與防呆）。
2. 發票/收據拍照上傳與 Gemini 多模態視覺解析：
   - 支援拖曳圖檔（PNG / JPG / WebP / SVG）至上傳區域，具備即時縮圖預覽。
   - 點擊「開始 AI 智慧解析」後，調用 Gemini 多模態 API 分析圖片，精準提取以下 JSON 欄位：
     - `date`: 發票日期 (YYYY-MM-DD)
     - `vendor`: 開立店家或廠商名稱
     - `taxId`: 統一編號（買方或賣方統編）
     - `category`: 智慧會計科目分類（下拉選項：差旅交通 / 餐飲交際 / 辦公文具雜費 / 資訊設備與軟體 / 其他）
     - `amount`: 報銷總金額（純整數）
     - `itemsSummary`: 消費明細清單摘要
     - `purpose`: 報銷事由建議
3. 審核表單與即時編輯卡片：
   - 解析完成後以清晰的表單呈現，使用者可隨時手動修正各欄位數值。
   - 即時計算未稅金額、稅額與總額檢核。
4. 一鍵同步至 Google Sheets（核心功能）：
   - 提供「📥 登錄至 Google 試算表」按鈕（未登入 Google 時顯示友善引導）。
   - 點擊後透過 Google Sheets Integration API，將該筆資料以新的一列（Append Row）寫入目標試算表末端。
   - 寫入成功後顯示綠色 Toast 提示，並提供「在 Google Sheets 中開啟」快捷連結。
5. 離線 Excel 單據備份匯出：
   - 提供「📑 匯出本筆報銷 Excel 請款單」按鈕，使用 ExcelJS 在前端一鍵產生標準報銷請款單 `.xlsx` 檔案供下載列印。

## 輸出規格與風格 (Format)
- UI/UX 風格：現代企業高質感亮色風格（Slate 50 淺灰底色、純白圓角卡片、細緻陰影、藍色 Indigo 600 高亮、翡翠綠 Emerald 500 成功指標）。
- 程式碼規範：
  - 提供完整、單一且具備完整 TypeScript 型別定義的 `App.tsx` 程式碼。
  - 核心功能模組化（含圖片轉 Base64、Gemini API 呼叫、Sheets API 呼叫、Excel 匯出函式）。
  - 附帶簡潔的套件安裝指令（`npm i lucide-react exceljs file-saver`）。
```

---

## 💡 常見問題與除錯指南 (FAQ)

### Q1：點擊「登錄至 Google 試算表」時出現權限不足（Permission Denied）？
- **原因**：初次點擊「Sign in with Google」登入時，Google 會彈出權限勾選視窗。
- **解法**：請確保在授權視窗中勾選了「**查看、編輯、建立和刪除您的 Google 試算表**」的權限方塊，否則 API 僅有讀取權而無法寫入新列。

### Q2：如何取得我的 Google 試算表 Spreadsheet ID？
- 打開你在 Google 雲端硬碟建立的試算表，觀察網址列：
  `https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`**`/edit`
- 中間粗體這串由英文大小寫與數字組成的代碼，就是你的 **Spreadsheet ID**！直接貼入網頁的設定欄位即可指定儲存目標。

### Q3：發布到 Google Cloud Run 後，需要重新設定 Google 登入憑證嗎？
- **完全不需要**！這正是 Google AI Studio 原生 Integrations 的巨大優勢。部署至 Google Cloud Run 後，系統自動由託管伺服器維持安全代理，使用者點擊登入授權即可無縫運作。
