# ⚡ Workspace 智慧單據報銷系統 (AI Expense & Sheets Automation) - Prompt 指南

> **開發工具建議**：本專案推薦使用 **Google AI Studio (Build Mode)** 進行開發，技術棧採用 Vite、React、TypeScript、Tailwind CSS，並啟用官方原生的 **Google Sheets Integration**。
> 
> 💼 **上班族職場必備・月底報帳神器**：每到月底總是被淹沒在咖啡店、加油站、計程車與文具店的發票收據中嗎？傳統人工作業必須肉眼盯著發票打統編、手動分類會計科目、再一筆筆敲進 Excel 或 Google 試算表，枯燥又容易出錯。本單元透過 **Gemini 多模態視覺辨識** 結合 **Google AI Studio 最新「Integrations」面板**，讓員工直接拍照上傳發票，AI 瞬間自動拆解金額明細，點擊授權後**直接將整筆記錄寫入個人雲端 Google 試算表**，更支援一鍵下載正式 Excel 請款單！

---

## 專案設計思維：從「單據拍照」到「雲端試算表自動化登錄」

在職場實務中，財務與報銷作業的核心流轉可分為「**資料擷取 ➜ 智慧驗證 ➜ 雲端歸檔 ➜ 紙本簽核**」四大環節。

為了讓學員體驗最流暢的加速工作流，本單元已預先設計好完整的**示範偽資料集（包含 SVG 發票圖片、Google Sheets CSV 匯入檔、文字明細）**，各模組對應關係如下：

| 工作流環節 (Stage) | 處理內容與對應偽資料 | 技術實作機制 | 辦公室價值 (Business Value) |
| :--- | :--- | :--- | :--- |
| **1. 單據輸入 (Ingestion)** | 支援拖曳或相機拍照上傳發票圖檔（提供 `sample_receipt_invoice.svg` 供下載測試） | HTML5 Drag & Drop + Gemini 視覺模型多模態解析 | 告別人工看字打統編，1 秒完成資料擷取 |
| **2. 欄位結構化 (Extraction)** | 提取日期、賣方店家、統編、品項明細、金額、稅額與會計科目（對應 `receipt_mock_data.md`） | 結構化 JSON Prompt 工程 + 會計規則分類器 | 自動分類差旅費、交際費、文具費，省去查科目時間 |
| **3. 雲端同步 (Cloud Sync)** | 登入 Google 帳號後，一鍵將報銷明細寫入試算表（提供 `2026公司報銷流水帳_範本.csv`） | Google AI Studio 原生 **Google Sheets Integration** | 零後端程式碼，自動建立 OAuth 授權並寫入試算表 |
| **4. 離線簽核 (Offline Export)** | 點擊一鍵匯出保留排版與加總公式的 `.xlsx` 單據請款單 | 前端 ExcelJS 模板引擎 | 兼顧雲端儲存與傳統實體紙本簽呈蓋章需求 |

---

## 一、 專案建立階段：準備偽資料與生成應用程式

### 📥 步驟 1：下載或預覽「報銷示範偽資料檔案」

我們為大家準備了 3 個可直接下載的教學素材，讓你在課堂上無須拿出個人私人發票即可立即測試：

| 檔案名稱 | 說明 | 點擊下載 |
| :--- | :--- | :---: |
| **sample_receipt_invoice.svg** | 台灣電子發票證明聯示範圖（含 QR Code、超商咖啡點心明細、統編與條碼） | [📥 點我下載圖檔](./sample_receipt_invoice.svg) |
| **2026公司報銷流水帳_範本.csv** | Google 試算表範本（含標準 7 大欄位與 4 筆預設歷史報帳紀錄，可直接匯入 Google Sheets） | [📥 點我下載 CSV](./2026公司報銷流水帳_範本.csv) |
| **receipt_mock_data.md** | 4 筆超詳細企業日常報帳文字明細（超商茶點、加油油資、文具耗材、高鐵車票） | [📥 點我檢視 Markdown](./receipt_mock_data.md) |

<br>

<details>
<summary>👉 點擊展開：檢視 receipt_mock_data.md 完整文字偽資料（可直接複製測試）</summary>

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

<br>

### 💡 步驟 2：如何用別的 AI 將「你公司自訂的報銷單欄位」轉成 RTCCF？
如果你未來想客製化自己公司的報銷系統（例如：新增「專案代碼 (Project Code)」、「成本中心 (Cost Center)」或「主管審批人工號」），只要把欄位名稱貼入下方指令，讓 AI 幫你微調：

<details>
<summary>👉 點擊展開：請其他 AI 協助客製報銷欄位的自然語言指令（可直接複製）</summary>

```text
我已經完成了一份公司內部的報銷欄位規格與會計科目清單。
我想在 Google AI Studio 開發一個專為辦公室員工設計的「AI 智慧單據報銷系統」，技術棧使用 Vite + React + TypeScript + Tailwind CSS，並使用 Google AI Studio 原生的 Google Sheets Integration。
功能需求：
1. 支援發票收據圖片上傳，利用 Gemini 多模態視覺模型辨識。
2. 自動萃取各項消費欄位並分類會計科目。
3. 整合 Google 帳號授權，一鍵將確認無誤的資料以新列寫入指定的 Google Sheets 試算表中。
4. 提供一鍵離線下載 Excel 請款單功能。
請扮演資深全端架構師，使用標準 RTCCF 框架（包含：# 角色 Role、## 任務目標 Task、## 背景情境 Context、## 核心規則與限制 Constraints、## 輸出規格與風格 Format），將我自訂的報銷欄位融入規格中：

[在此處貼上你公司自訂的報銷欄位與會計科目清單]
```

</details>

<br>

### 📋 步驟 3：專案建立 RTCCF Prompt（複製貼入 Google AI Studio）

請依照以下 3 個直覺步驟開始建立專案：
1. 開啟 [Google AI Studio](https://aistudio.google.com/)，點擊右上角進入 **Build Mode**。
2. 查看右側側邊欄的 **Integrations 面板**，找到 **Google Sheets** 並點擊 **Enable（啟用）**。
3. 直接複製下方整段 RTCCF 提示詞，貼入 AI Studio 對話框開始生成：

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
