# 📋 部門專案即時協作看板 (Team Kanban & Task Hub) - Prompt 指南

> **開發工具建議**：本專案推薦使用 **Google AI Studio (Build Mode)** 進行開發，技術棧採用 Vite、React、TypeScript、Tailwind CSS，並啟用官方原生的 **Firebase Firestore & Auth Integration**。
> 
> 💼 **上班族職場必備・專案追蹤神器**：團隊同時跑好幾個專案，大家進度卡在哪裡總要一直開會問「那份文件寫好了嗎？」、「API 測完了沒？」用 Excel 管理待辦容易互相覆寫衝突，用外部專業專案管理軟體又太繁重且要付費授權。本單元透過 **Firebase Auth 會員認證** 結合 **Firestore 雲端 NoSQL 即時資料庫**，打造專屬團隊的輕量級即時看板（Kanban Board）。同仁在自己的螢幕上將卡片從「進行中」拖到「已完成」，**全組成員與主管的螢幕瞬間同步跳動更新**，讓專案進度一目了然！

---

## 專案設計思維：從「訊息互相催促」到「雲端即時可視化看板」

在企業團隊日常協作中，敏捷任務流動涵蓋「**任務指派 ➜ 狀態推進 ➜ 即時同步 ➜ 成果交付**」四大環節。

為了讓學員體驗最流暢的加速工作流，本單元已預先設計好完整的**示範偽資料集（包含 6 筆跨部門任務卡片 CSV 範本與詳細驗收標籤）**，各模組對應關係如下：

| 工作流環節 (Stage) | 處理內容與對應偽資料 | 技術實作機制 | 辦公室價值 (Business Value) |
| :--- | :--- | :--- | :--- |
| **1. 任務結構化 (Tasks)** | 建立含標題、負責人、優先級、截止日與標籤的卡片（提供 `kanban_tasks_template.csv`） | Firestore Collection 集合模型 | 一處建檔，資訊公開透明不漏接 |
| **2. 成員認領 (Assignment)** | 同仁以 Google 或公司帳號登入系統 | Firebase Authentication | 自動辨別指派對象，支援「我的任務」一鍵過濾 |
| **3. 泳道即時流動 (Kanban Flow)** | 四欄位狀態：待處理 ➔ 進行中 ➔ 審查中 ➔ 已完成（對應 `kanban_mock_data.md`） | Firestore 實時資料流 (`onSnapshot`) | 只要有人更新卡片，全團隊視窗秒級自動刷新 |
| **4. 智慧篩選與提醒 (Filters)** | 依照成員、優先級（緊急/高/中/低）與即將逾期進行篩選 | 陣列動態過濾與日期比對 | 晨會立會 3 分鐘快速檢視專案阻礙與瓶頸 |

---

## 一、 專案建立階段：準備偽資料與生成應用程式

### 📥 步驟 1：下載或預覽「看板示範偽資料檔案」

我們為大家準備了 2 個可直接下載與檢視的教學素材，讓你在課堂上無須手動輸入一筆筆任務即可秒測：

| 檔案名稱 | 說明 | 點擊下載 |
| :--- | :--- | :---: |
| **kanban_tasks_template.csv** | 跨部門專案任務範本 CSV（含任務ID、標題、專案、狀態、負責人、優先級、截止日） | [📥 點我下載 CSV](./kanban_tasks_template.csv) |
| **kanban_mock_data.md** | 詳細敏捷看板任務偽資料（品牌指南規範、發票辨識模組、發表會新聞稿、資安測試等） | [📥 點我檢視 Markdown](./kanban_mock_data.md) |

<br>

<details>
<summary>👉 點擊展開：檢視 kanban_mock_data.md 完整示範任務資料（可直接複製測試）</summary>

```markdown
1. 【待處理】完成新版官方品牌視覺指南規範 (TASK-01)
   - 負責人：Sarah Chen (設計主管) / 截止日：2026-10-24 / 優先級：高
   - 標籤：#設計 #品牌

2. 【進行中】整合 Gemini 多模態發票自動辨識模組 (TASK-02)
   - 負責人：Alex Wang (工程主管) / 截止日：2026-10-22 / 優先級：緊急
   - 標籤：#技術 #AI

3. 【審查中】規劃伺服器架構資安合規壓力測試 (TASK-04)
   - 負責人：Kevin Chang (QA) / 截止日：2026-10-21 / 優先級：高
   - 標籤：#資安 #維運

4. 【已完成】全體團隊跨部門進度同步例會會議記錄 (TASK-05)
   - 負責人：David Lin (PM) / 完成時間：2026-10-18
   - 標籤：#管理 #例會
```

</details>

<br>

### 💡 步驟 2：如何用別的 AI 將「你部門的日常專案流程」轉成 RTCCF？
如果你未來想客製化自己部門特定的看板流（例如：行銷活動審批、客戶客服客訴工單、軟體開發 Bug 追蹤），只要把流程貼入下方指令：

<details>
<summary>👉 點擊展開：請其他 AI 協助客製專案看板系統的自然語言指令（可直接複製）</summary>

```text
我已經完成了一份我們部門的專案任務欄位與工作流程階段清單。
我想在 Google AI Studio 開發一個專為辦公室員工設計的「部門專案即時協作看板 (Team Kanban Hub)」，技術棧使用 Vite + React + TypeScript + Tailwind CSS，並使用 Google AI Studio 原生的 Firebase Firestore & Auth Integration。
功能需求：
1. 支援員工帳號登入（Firebase Auth）。
2. 提供多欄式看板（如：待處理、進行中、審查中、已完成），支援卡片點選或拖曳切換狀態，多人即時同步（Firestore Realtime）。
3. 支援新增任務、指派同仁、設定優先級與截止日期。
4. 預載我提供的初始任務資料。
請扮演資深全端架構師，使用標準 RTCCF 框架（包含：# 角色 Role、## 任務目標 Task、## 背景情境 Context、## 核心規則與限制 Constraints、## 輸出規格與風格 Format），將我的工作流程融入規格中：

[在此處貼上你部門的工作流程與任務欄位]
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
你是一位精通敏捷協作、React 18+、TypeScript、Tailwind CSS 與 Google Firebase 原生整合的資深全端架構師，專精於運用 Firestore 即時 NoSQL 資料庫打造高互動性的團隊協作看板。

## 任務目標 (Task)
請開發一個極具現代生產力工具（Linear / Trello 風格）質感的單頁 Web 應用程式「部門專案即時協作看板 (Team Project Kanban & Task Hub)」。

## 背景情境 (Context)
- 開發環境與技術棧：Google AI Studio (Build Mode)、Vite、React 18+、TypeScript、Tailwind CSS、Lucide React 圖示庫。
- 原生整合：已在 Google AI Studio 啟用 **Firebase Firestore & Auth Integration**。
- 部署與安全架構：所有雲端驗證由 Google AI Studio 後端代理（Backend Proxy）保護，免擔心金鑰外洩。
- 適用對象：企業各部門團隊成員、專案經理 (PM) 與主管。
- **預先內建的示範任務資料庫**：
  若資料庫為空，提供「⚡ 載入示範專案任務」按鈕，快速初始化 5 筆跨部門代表性任務：
  1. `TASK-01`：完成新版官方品牌視覺指南規範（待處理 / 負責人: Sarah / 優先級: 高）
  2. `TASK-02`：整合 Gemini 多模態發票自動辨識模組（進行中 / 負責人: Alex / 優先級: 緊急）
  3. `TASK-03`：撰寫 Q4 產品發表會新聞發布稿（進行中 / 負責人: Emily / 優先級: 中）
  4. `TASK-04`：規劃伺服器架構資安合規壓力測試（審查中 / 負責人: Kevin / 優先級: 高）
  5. `TASK-05`：全體團隊跨部門進度同步例會會議記錄（已完成 / 負責人: David / 優先級: 普通）

## 核心規則與限制 (Constraints)
1. 頂部會員身分與控制列（Firebase Auth 整合）：
   - 提供「Sign in with Google」或員工快速登入。
   - 登入後顯示使用者頭像、姓名與「即時同步連線中 🟢」狀態標籤。
   - 頂部控制列：
     - 「+ 新增任務」主按鈕。
     - 「只看指派給我的任務」切換開關。
     - 專案標籤篩選下拉選單與關鍵字搜尋框。
2. 四欄式敏捷看板（Kanban Columns）核心架構：
   - 畫面分為四個直式泳道：
     - 🟡 **待處理 (To Do)**
     - 🔵 **進行中 (In Progress)**
     - 🟣 **審查中 (In Review)**
     - 🟢 **已完成 (Done)**
   - 每個泳道頂部顯示卡片總數 Badge。
   - **實時資料監聽 (Firestore onSnapshot)**：
     - 使用者可以在卡片上點擊按鈕或拖曳快速變更欄位狀態。
     - 當任一位成員變更卡片位置或編輯內容時，所有連線中的瀏覽器**不需重新整理即時同步移動卡片**。
3. 任務卡片精緻視覺元件：
   - 卡片內容包含：任務標題、所屬專案 Tag、負責人頭像與姓名、截止日期、優先級 Badge（緊急: 紅 / 高: 橙 / 中: 藍 / 低: 灰）。
   - 逾期警示：若當前日期已超過截止日且未處於「已完成」，截止日期以醒目紅色標記。
4. 新增與編輯任務抽屜/彈窗：
   - 點擊卡片可查看完整說明與留言記錄，支援就地修改並保存回 Firestore。
   - 支援刪除任務防呆二次確認。

## 輸出規格與風格 (Format)
- UI/UX 風格：現代極簡生產力風格（Slate 50 畫布背景、純白微圓角卡片、平滑懸浮陰影、精緻狀態顏色指標、絲滑卡片拖曳與過渡動畫）。
- 程式碼規範：
  - 提供完整、單一且具備完整 TypeScript 型別定義的 `App.tsx` 前端程式碼。
  - 模組化設計（Firebase 初始化、Firestore 即時監聽 Hook、狀態變更交易函式）。
  - 附帶相依套件安裝指令（`npm i lucide-react firebase`）。
```

---

## 💡 常見問題與除錯指南 (FAQ)

### Q1：多人同時修改同一個任務卡片時，資料會打架嗎？
- Firestore 原生支援**分散式文件鎖定與交易機制（Transactions）**。當兩位同仁同時操作時，Firestore 會依據伺服器時間戳記（Timestamp）進行精準的版本判定與最後寫入保留，避免傳統 Excel 常見的檔案覆寫遺失問題。

### Q2：專案做完後如何分享給部門同事一起使用？
- 專案完成後，只需在 Google AI Studio 頂部點擊 **Publish（火箭圖示）** 一鍵部署至 Google Cloud Run，系統會生成一個專屬網址。只要把網址丟到公司群組，同事點進去登入 Google 帳號，所有人就能立刻在同一個看板上協同作業！

### Q3：在 AI Studio 畫面出現「⚠️ Quota exceeded. Please try again later.」或跑了數百秒報錯該怎麼辦？
- **原因**：免費帳號（Free Tier）針對 `Gemini 3.8 Flash` 具備每分鐘請求數（RPM: 5 次）、每分鐘 Token（TPM: 250K）與每日總請求數（RPD: 僅 20 次）上限。當模型在背景連續執行思考與修改代碼（如修改 `src/lib/firebase.ts`）長達數分鐘時，短時間內極易衝破 RPM 或累積滿每日 20 次上限。
- **解法**：
  1. **靜置等待 1~3 分鐘**：每分鐘額度為滾動時間窗口（Rolling Window），若為短時衝破稍等 1~3 分鐘即可自動恢復。
  2. **點擊 Checkpoint 還原**：若修改卡住，可點擊右下角 **`Restore`** 回復至上一版乾淨代碼。
  3. **查看目前額度**：造訪 [AI Studio 配額面板](https://aistudio.google.com/usage?tab=rate-limit) 查詢即時剩餘量，亦可參考 [📸 官方 Rate Limit 儀表板圖解說明](../認識GoogleAIStudio/README.md#4--配額機制與quota-exceeded排查指南-rate-limits--quota)。
  4. **升級 Pay-as-you-go**：點擊左下角「Upgrade to unlock more」綁定 GCP 帳單，享有專屬高額度保障算力（費用極低，每次微調約 $0.0001 美元），並可在 Dashboard 設定每月花費上限（Spend Cap）。
