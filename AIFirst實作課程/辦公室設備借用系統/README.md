# 🏢 辦公室設備借用系統 (Office Equipment Booking Hub) - Prompt 指南

> **開發工具建議**：本專案推薦使用 **Google AI Studio (Build Mode)** 進行開發，技術棧採用 Vite、React、TypeScript、Tailwind CSS，並啟用官方原生的 **Firebase Firestore & Auth Integration**。
> 
> 💼 **上班族職場必備・資產登記神器**：公司的會議投影機、專案公用筆電、攝影空拍機或公務車，經常「大家問了一圈還是不知道在誰那裡」嗎？用白板手寫登記容易擦掉、用 Excel 又容易被覆寫。本單元透過 **Firebase Auth 帳號登入** 與 **Firestore 雲端 NoSQL 資料庫**，打造多人即時同步的公務設備借用登記系統，只要有人點擊「借出」或「歸還」，全體同仁的螢幕**零秒差同步跳動更新狀態**，徹底解決撞期與找不到設備的辦公室痛點！

---

## 專案設計思維：從「傳統紙本白板」到「雲端即時資產資料庫」

在企業行政資產管理中，設備借用涵蓋「**目錄盤點 ➜ 身分授權 ➜ 即時預約 ➜ 歸還追蹤**」四大環節。

為了讓學員體驗最流暢的加速工作流，本單元已預先設計好完整的**示範偽資料集（包含 5 大類常見公務設備 CSV 範本與歷史借用記錄）**，各模組對應關係如下：

| 工作流環節 (Stage) | 處理內容與對應偽資料 | 技術實作機制 | 辦公室價值 (Business Value) |
| :--- | :--- | :--- | :--- |
| **1. 資產目錄展示 (Catalog)** | 瀏覽投影機、展示筆電、空拍機、公務車（提供 `equipment_list_template.csv`） | Firestore 即時集合監聽 (`onSnapshot`) | 隨時查看器材規格、存放櫃位與配件清單 |
| **2. 身分自動辨識 (Auth)** | 使用者以 Google 帳號或員工帳號登入 | Firebase Authentication | 自動記錄「誰借的 (Borrower)」，責任歸屬清晰 |
| **3. 即時狀態卡片 (Realtime)** | 綠色「可借用」與琥珀色「借用中」動態切換（對應 `equipment_mock_data.md`） | Firestore 交易更新 (`updateDoc`) | 多人同時打開網頁也不會撞期，狀態毫秒級更新 |
| **4. 一鍵登記與歸還 (Actions)** | 填寫借用天數與用途備註，一鍵完成登記；使用完畢一鍵歸還 | Firestore 時間戳記 (`serverTimestamp`) | 免找總務填紙本單據，線上秒級核准流轉 |

---

## 一、 專案建立階段：準備偽資料與生成應用程式

### 📥 步驟 1：下載或預覽「設備示範偽資料檔案」

我們為大家準備了 2 個可直接下載與檢視的教學素材，讓你在課堂上無須手動輸入一長串設備資料即可秒測：

| 檔案名稱 | 說明 | 點擊下載 |
| :--- | :--- | :---: |
| **equipment_list_template.csv** | 5 大辦公室設備初始清單 CSV（含編號、名稱、分類、位置、狀態、預計歸還日） | [📥 點我下載 CSV](./equipment_list_template.csv) |
| **equipment_mock_data.md** | 詳細公務資產庫偽資料（投影機、MacBook 筆電、空拍機、視訊麥克風、公務休旅車） | [📥 點我檢視 Markdown](./equipment_mock_data.md) |

<br>

<details>
<summary>👉 點擊展開：檢視 equipment_mock_data.md 完整文字示範資料（可直接複製測試）</summary>

```markdown
1. 【視聽簡報】EPSON 4K超高流明商務投影機 (EQ-2026-001)
   - 存放位置：8F 總部大器材室 A-03 櫃
   - 目前狀態：可借用 (Available)
   - 隨附配件：HDMI 4K 傳輸線、Logitech 簡報筆

2. 【資訊設備】MacBook Pro M3 Max 專案展示筆電 (EQ-2026-002)
   - 目前狀態：借用中 (In Use)
   - 借用人：Sarah Chen (設計主管)
   - 預計歸還時間：2026-10-24 18:00
   - 借用用途：前往台北市電腦公會展示 Q4 產品動態原型

3. 【交通公務】公務休旅車 (車牌: BCD-8821 / EQ-2026-005)
   - 存放車位：B2 地下公務車位 08 號
   - 目前狀態：借用中 (In Use)
   - 借用人：David Lin (PM) / 歸還日：2026-10-22
```

</details>

<br>

### 💡 步驟 2：如何用別的 AI 將「你公司的公務資產清單」轉成 RTCCF？
如果你未來想客製化自己公司的設備庫（例如：實驗室儀器、攝影棚棚燈鏡頭、醫療器材），只要把清單貼入下方指令：

<details>
<summary>👉 點擊展開：請其他 AI 協助客製設備借用系統的自然語言指令（可直接複製）</summary>

```text
我已經完成了一份我們公司內部的公務設備與資產登記清單。
我想在 Google AI Studio 開發一個專為辦公室員工設計的「企業設備與公務資源即時借用系統」，技術棧使用 Vite + React + TypeScript + Tailwind CSS，並使用 Google AI Studio 原生的 Firebase Firestore & Auth Integration。
功能需求：
1. 支援員工帳號登入（Firebase Auth）。
2. 展示所有公務設備卡片，具備「可借用」、「已借出」等即時標籤，多人操作即時同步（Firestore Realtime）。
3. 支援點選設備填寫用途與預計歸還日期進行登記，借用人一鍵歸還。
4. 預載我提供的初始設備清單。
請扮演資深全端架構師，使用標準 RTCCF 框架（包含：# 角色 Role、## 任務目標 Task、## 背景情境 Context、## 核心規則與限制 Constraints、## 輸出規格與風格 Format），將我的設備清單融入規格中：

[在此處貼上你公司的設備與資產清單]
```

</details>

<br>

### 📋 步驟 3：專案建立 RTCCF Prompt（複製貼入 Google AI Studio）

請依照以下 3 個步驟開始建立專案：
1. 開啟 [Google AI Studio](https://aistudio.google.com/)，點擊「**+ New app**」。
   > 🚨 **注意**：首頁對話框僅支援純文字與圖片檔，無法直接放 docx/xlsx/pptx 檔案，請直接將下方完整提示詞複製貼入輸入框中！
2. 複製下方整段 RTCCF 提示詞，貼入首頁對話框發送生成專案。
3. **對話框一鍵確認啟用整合**：由於提示詞明確寫入 Firebase 整合需求，**AI Studio 會在對話框中自動跳出整合提示卡片（如 `I accept, continue to enable Firebase...`）**，直接點擊即可自動啟用！
   *(💡 備註：若對話框未自動跳出，也可在專案右側側邊欄的 `Integrations` 面板找到 Firebase 點擊 Enable)*。

```markdown
# 角色 (Role)
你是一位精通現代全端開發、React 18+、TypeScript、Tailwind CSS 與 Google Firebase 原生整合的架構師，專精於運用 Firestore 即時 NoSQL 資料庫與 Firebase Authentication 打造高互動性辦公室管理工具。

## 任務目標 (Task)
請開發一個極具現代商務美感、具備多人即時同步更新的單頁 Web 應用程式「辦公室設備與公務資源借用系統 (Office Equipment Booking Hub)」。

## 背景情境 (Context)
- 開發環境與技術棧：Google AI Studio (Build Mode)、Vite、React 18+、TypeScript、Tailwind CSS、Lucide React 圖示庫。
- 原生整合：已在 Google AI Studio 啟用 **Firebase Firestore & Auth Integration**。
- 部署與安全架構：所有雲端驗證由 Google AI Studio 後端代理（Backend Proxy）保護，完全不洩漏金鑰。
- 適用對象：企業內部各部門同仁、專案經理與行政總務人員。
- **預先內建的設備初始資料庫**：
  若資料庫為空，提供「⚡ 寫入示範設備庫」按鈕，快速初始化 5 筆示範資產：
  1. `EQ-2026-001`：EPSON 4K超高流明商務投影機（視聽簡報 / 8F 大器材室 / 可借用）
  2. `EQ-2026-002`：MacBook Pro M3 Max 專案展示筆電（資訊設備 / 7F 設備庫 / 借用中 / 借用人: Sarah）
  3. `EQ-2026-003`：DJI 4K空拍機與雙電池套裝（攝影設備 / 8F 大器材室 / 可借用）
  4. `EQ-2026-004`：Jabra 全向型降噪會議麥克風揚聲器（視訊會議 / 6F 管理櫃 / 可借用）
  5. `EQ-2026-005`：公務休旅車 BCD-8821（交通資源 / B2 車位 08 / 借用中 / 借用人: David）

## 核心規則與限制 (Constraints)
1. 頂部會員身分列（Firebase Auth 整合）：
   - 提供「登入 / 註冊」彈窗或快速登入，支援 Google 一鍵登入或 Email 登入。
   - 登入後顯示使用者頭像、姓名與「資料庫即時連線中 🟢」狀態徽章。
   - 頂部提供「我借用的設備 (My Borrowed Items)」快速篩選標籤。
2. 設備展示與即時看板（Firestore 整合）：
   - 頂部具備分類篩選器（全部 / 視聽簡報 / 資訊設備 / 攝影影音 / 交通資源）與關鍵字搜尋框。
   - 採用網格卡片呈現，每張卡片包含：設備編號、名稱、照片圖示、存放位置、配件清單。
   - 狀態標籤：
     - `可借用`：翡翠綠 Emerald 徽章，顯示「立即借用」按鈕。
     - `借用中`：琥珀橙 Amber 徽章，顯示當前借用人與預計歸還時間。
   - **實時監聽 (Realtime onSnapshot)**：當某位同仁借出或歸還設備時，所有打開網頁的人卡片狀態即時變換，不需手動重新整理頁面。
3. 借用與歸還互動抽屜/彈窗：
   - 點擊「立即借用」：彈出借用確認視窗，自動帶入當前登入者姓名與 Email，使用者選擇「預計歸還日期」並填寫「借用用途（如：跨部門會議、客戶拜訪）」，確認後即時更新 Firestore 文件。
   - 點擊「歸還設備」：只有當前借用人或管理者可點擊歸還，確認後狀態瞬間切換回「可借用」，並將借用人欄位清空。
4. 防呆機制與使用者體驗：
   - 未登入同仁點擊借用時，彈出友善登入提示。
   - 點擊操作時具備流暢微動畫與 Toast 成功訊息。

## 輸出規格與風格 (Format)
- UI/UX 風格：現代簡約高階企業風格（Slate 50 淺灰底色、純白圓角卡片、細緻灰色邊框、Indigo 600 高亮按鈕、清晰的 Empty State）。
- 程式碼規範：
  - 提供完整、單一且具備完整 TypeScript 型別定義的 `App.tsx` 前端程式碼。
  - 核心功能模組化（Firebase 初始化、Firestore 即時監聽 Hook、借還狀態更新函式）。
  - 附帶相依套件安裝指令（`npm i lucide-react firebase`）。
```

---

## 💡 常見問題與除錯指南 (FAQ)

### Q1：使用 Firebase Firestore 需要付費或綁定信用卡嗎？
- **完全不需要！** Google AI Studio 的 Firebase Integration 預設採用免費的 **Spark Plan**，每天提供高達 50,000 次讀取與 20,000 次寫入配額，在課堂實作、公司內部日常使用完全免費，無需輸入任何信用卡資訊。

### Q2：為什麼同仁借用後，我的畫面能自動更新？
- 這歸功於 Firebase Firestore 的核心技術 **WebSockets 即時通道（`onSnapshot` 監聽器）**。當資料庫伺服器中的文件有任何欄位被修改，伺服器會主動將最新資料推播給所有連線中的瀏覽器，實現毫秒級無感更新。

### Q3：在 AI Studio 畫面出現「⚠️ Quota exceeded. Please try again later.」或跑了數百秒報錯該怎麼辦？
- **原因**：免費帳號（Free Tier）具備每分鐘請求數（RPM: 約 10~15 次）與每分鐘 Token 數（TPM: 約 1,000,000）上限。當模型在背景連續執行思考與修改代碼長達數分鐘時，短時間內極易觸發速率門檻。
- **解法**：
  1. **靜置等待 1~3 分鐘**：每分鐘額度為滾動時間窗口（Rolling Window），稍等 1~3 分鐘即可自動恢復重試。
  2. **點擊 Checkpoint 還原**：若修改卡住，可點擊右下角 **`Restore`** 回復至上一版乾淨代碼。
  3. **查看目前額度**：可直接造訪 [AI Studio 配額面板](https://aistudio.google.com/usage?tab=rate-limit) 查詢剩餘配額。
  4. **升級 Pay-as-you-go**：點擊左下角「Upgrade to unlock more」綁定 GCP 帳單，享有專屬高額度保障算力（費用極低，每次微調約 $0.0001 美元），並可在 Dashboard 設定每月花費上限（Spend Cap）。
