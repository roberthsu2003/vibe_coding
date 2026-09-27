# ⚡ AI First 實戰進階：Workspace 智慧單據報銷系統

> **30 秒專案介紹**：  
> 本專案示範 **Google AI Studio 2026 最新「Integrations（整合面板）」** 功能！結合 **Gemini 多模態視覺辨識** 與 **Google Sheets 雲端原生串接**：員工只需拍照上傳發票或收據，AI 會自動辨識商店、日期、統編、明細金額與會計科目，並在使用者以 Google 帳號授權後，**一鍵自動登錄寫入個人 Google 雲端試算表**，還能同時**一鍵匯出正式 Excel 報銷請款單**！

---

## 🌟 核心亮點：解決辦公室最大的技術痛點

1. **零 GCP 繁瑣設定**：過去要串接 Google Sheets 需要去 Google Cloud Console 申請 OAuth 憑證、設定 Redirect URI、寫複雜的 Token 交換。現在只要在 Google AI Studio Build Mode 啟用 **Integrations 面板**，系統自動生成「Sign in with Google」登入授權與後端 API！
2. **多模態發票收據秒讀**：利用 Gemini 視覺模型直接解析收據圖片，再也不用手動對帳打字。
3. **雲端與離線雙向支援**：
   - 雲端：資料自動新增一列至使用者的 Google Sheets。
   - 離線：一鍵打包產出標準排版的 Excel 請款單（完美銜接前一單元技巧）。

---

## 📥 第一步：準備測試資料與 Google 試算表

### 1. 建立測試用的 Google Sheets 試算表
請在個人的 [Google 雲端硬碟](https://drive.google.com/) 新增一份空的 Google 試算表，命名為「`2026公司報銷流水帳`」，並在第一列（標題列）依序填入以下欄位名稱：

| A 欄 | B 欄 | C 欄 | D 欄 | E 欄 | F 欄 | G 欄 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **報銷日期** | **店家/廠商名稱** | **統一編號** | **消費品項摘要** | **會計科目分類** | **金額 (NTD)** | **備註說明** |

> 💡 **試算表連結小技巧**：複製該試算表網址中的 **Spreadsheet ID**（網址中 `/d/` 與 `/edit` 之間的那串長代碼），稍後可貼入網頁中指定存檔位置。

### 2. 測試素材準備
您可以使用手機隨手拍一張超商、加油站或文具店的發票，或者使用以下測試用文字/範例圖片進行測試。

---

## 🚀 第二步：Google AI Studio 實作步驟（SOP）

```
【步驟 1】開啟 AI Studio Build Mode ──► 在右側 Integrations 面板啟用「Google Sheets」
                                         ▼
【步驟 2】複製下方提示詞 ──────────────► 貼入對話框生成應用程式
                                         ▼
【步驟 3】點擊「Sign in with Google」 ──► 授權存取個人 Google 雲端試算表
                                         ▼
【步驟 4】拖曳上傳收據照片 ──────────► AI 自動辨識填表 ➜ 一鍵寫入試算表！
```

1. **開啟 [Google AI Studio](https://aistudio.google.com/)**，點擊右上角進入 **Build Mode（應用程式建置模式）**。
2. **啟用 Google Sheets 整合**：
   - 查看右側側邊欄的 **Integrations（整合面板）**。
   - 找到 **Google Sheets** 並點擊 **Enable（啟用）**。
   - *(系統會自動在背景掛載 Sheets API 與 Google 登入驗證模組)*。
3. **複製下方「第三步」的專案提示詞**，直接貼入對話框進行生成。
4. **預覽與測試**：
   - 在預覽視窗點擊 **「Sign in with Google」** 完成授權。
   - 上傳發票或收據照片（或點擊「帶入範例收據」快速測試）。
   - 確認 AI 自動辨識拆出的各欄位資料，點擊 **「確認並寫入 Google Sheets」**。
   - 前往您的 Google 雲端試算表，會發現新的一列資料已經自動登錄完成！

---

## 🤖 第三步：專案生成提示詞（點擊右上角一鍵複製）

請將以下整段提示詞複製，貼到 **Google AI Studio**：

```markdown
# Role（角色）
你是一位專精於 Google Workspace 生態系整合、React、TypeScript 與 Tailwind CSS 的全端自動化專家，熟悉 Google AI Studio 的原生 Integrations 機制與 Gemini 視覺模型應用。

# Context（背景情境）
打造一個專為企業員工設計的「AI 智慧單據報銷系統（Smart Expense & Invoice Logger）」。
使用者只需拍照或上傳發票/收據圖片，系統利用 Gemini 多模態視覺能力解析內容，提取出報銷關鍵欄位；使用者確認無誤後，透過已啟用的 Google Sheets Integration，安全、一鍵將該筆報銷紀錄寫入使用者的 Google 雲端試算表中，並提供一鍵匯出 Excel 請款單的功能。

# Task（任務目標）
請使用 vite-react-typescript 與 Tailwind CSS 建置現代質感的單頁應用程式：

1. **Google 帳號授權與整合狀態區（頂部）**：
   - 整合 Google AI Studio 的 Google Sheets Integration 授權狀態。
   - 顯示「使用 Google 帳號登入 (Sign in with Google)」按鈕；登入成功後顯示使用者頭像、姓名與「已連線 Google Sheets」的綠色狀態標籤。
   - 提供「目標 Google 試算表設定」折疊欄位（支援輸入 Spreadsheet ID 或 Sheet 名稱，預設保留智慧提示）。

2. **多模態收據上傳與 AI 智慧解析**：
   - 提供直覺的拖曳上傳收據/發票區域（支援 PNG/JPG/WebP/PDF）。
   - 提供一個「載入測試發票範例」按鈕，讓沒有發票照片的使用者也能一鍵填入範例資料秒測。
   - 調用 Gemini 多模態 API 分析圖片，精準提取以下 JSON 格式欄位：
     - `date`: 日期（格式 YYYY-MM-DD）
     - `vendor`: 店家或廠商名稱
     - `taxId`: 統一編號（若無則填「無」）
     - `category`: 會計科目建議（下拉選單：差旅交通 / 餐飲交際 / 辦公文具雜費 / 資訊軟體 / 其他）
     - `amount`: 總金額（純數字）
     - `items`: 消費品項明細摘要
     - `note`: 備註建議

3. **審核與編輯預覽卡片（中區）**：
   - 解析完成後以優雅的卡片式表單呈現，所有欄位均可直接由使用者微調或修改。
   - 自動檢核金額格式與日期正確性。

4. **一鍵寫入 Google Sheets（核心功能）**：
   - 點擊「📥 寫入 Google 試算表」按鈕。
   - 透過 Google Sheets Integration API，將資料以新列（Append Row）寫入使用者的目標工作表。
   - 顯示流暢的寫入進度與成功 Toast 提示，並附帶「在 Google Sheets 中開啟」的捷徑連結。

5. **離線 Excel 請款單下載（進階備份）**：
   - 點擊「📑 匯出本筆報銷 Excel 單據」，利用前端快速產出帶有樣式與欄位說明的 `.xlsx` 請款單，方便實體列印簽核。

# Constraints（規格與限制要求）
1. 【UI/UX 設計】：
   - 採用現代商務配色（深色 Slate 頂部導航、藍綠 Emerald 成功強調色、柔和陰影與圓角卡片）。
   - 清楚的 Empty State（尚未上傳時的引導畫面）與 Loading Skeleton（AI 辨識中的動態光影）。
2. 【安全與防呆】：
   - 未登入 Google 時，停用寫入試算表按鈕，並友善提示「請先登入 Google 帳號以啟用雲端同步」。
   - 上傳非圖片檔時彈出防呆警示。
   - 確保所有 API 金鑰在部署模式下不直接暴露給訪客。

# Format（交付格式）
1. 列出相依套件指令（含 exceljs、lucide-react）。
2. 提供完整、單一、具備完整型別的 App.tsx 程式碼，邏輯清晰、註解詳盡。
```

---

## 💡 常見問題與教學備註

### Q1：學生執行時顯示「Permission Denied」或無法存取試算表？
- 請提醒學生確認登入的 Google 帳號，是否具有該 Google 試算表的**「編輯者」權限**。
- 如果是新試算表，第一次登入授權時請確保勾選允許存取 Google Drive / Sheets 檔案的授權項目。

### Q2：公司有資安管制不能使用個人 Google 帳號怎麼辦？
- 本專案特別設計了**「離線 Excel 請款單下載」備援按鈕**。即便在無法連線 Google 雲端的情況下，AI 多模態辨識與自動產生 Excel 單據的功能依然能 100% 正常運作！
