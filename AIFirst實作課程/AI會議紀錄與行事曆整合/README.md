# 📅 AI First 實戰進階：AI 會議紀錄與 Google 日曆待辦整合

> **30 秒專案介紹**：  
> 本專案展示 **Google AI Studio「雙 Workspace 整合」** 實戰（**Google Sheets ＋ Google Calendar**）！開完會後，只需將散亂的會議筆記或錄音逐字稿貼入網頁，AI 會瞬間提煉出「核心決策」、「待辦行動清單（Action Items）」與「關鍵里程碑」。點擊按鈕，即可**自動將待辦寫入 Google 試算表追蹤，並直接把任務 Deadline 與覆盤會議排入 Google 個人日曆**！

---

## 🌟 核心亮點：徹底終結「開完會沒有下文」的辦公室通病

1. **跨服務雙整合（Sheets + Calendar）**：一次掌握 Google AI Studio 最新 Integrations 面板的多服務聯動技巧。
2. **雜亂筆記秒變結構化看板**：自動解析「誰負責（Assignee）」、「做什麼（Task）」、「何時交（Due Date）」、「重要性（Priority）」。
3. **無痛日曆排程**：過去要切換視窗手動到 Google Calendar 點選日期、打標題、設提醒；現在由網頁直接透過 Calendar API 一鍵建檔。

---

## 📥 第一步：準備測試試算表與範例文字

### 1. 建立 Google Sheets 專案待辦表（可選）
在個人的 [Google 雲端硬碟](https://drive.google.com/) 建立一份試算表，命名為「`2026專案會議追蹤表`」，第一列填入：

| A 欄 | B 欄 | C 欄 | D 欄 | E 欄 |
| :---: | :---: | :---: | :---: | :---: |
| **任務名稱** | **負責人** | **優先等級** | **截止日期** | **執行備註/驗收標準** |

### 2. 課堂隨附「範例會議紀錄」（供學生一鍵貼上測試）
```text
【2026 Q4 產品上線跨部門籌備會議記錄】
時間：2026/10/15 下午 2:00
參與人：David (PM), Sarah (設計), Alex (工程主管), Emily (行銷)

會議結論與討論：
1. 針對新功能改版，設計團隊 Sarah 必須在 2026/10/22 前完成所有 Figma 高傳真原型與切版規範交接，優先級為緊急。
2. 工程團隊 Alex 需在 2026/10/29 以前完成核心 API 壓力測試與資安弱點掃描，並提交測試報告。
3. 行銷團隊 Emily 負責規劃上線預熱宣傳文案，預計 2026/11/05 前完成社群與 EDM 首波發布。
4. 全體團隊約定在 2026/10/30 下午 3:00 召開線上 Pre-Launch 最終覆盤檢查會議（線上 Google Meet）。
```

---

## 🚀 第二步：Google AI Studio 實作步驟（SOP）

```
【步驟 1】開啟 AI Studio Build Mode ──► 在 Integrations 同時啟用「Google Sheets」與「Google Calendar」
                                         ▼
【步驟 2】複製下方提示詞 ──────────────► 貼入對話框生成應用程式
                                         ▼
【步驟 3】點擊「Sign in with Google」 ──► 一次授權試算表與日曆權限
                                         ▼
【步驟 4】貼上會議文字點擊「AI 萃取」 ──► 點擊「同步 Sheets」＋「加入 Google 日曆」！
```

1. **開啟 [Google AI Studio](https://aistudio.google.com/)**，點擊右上角進入 **Build Mode**。
2. **啟用雙整合**：
   - 在右側 **Integrations** 面板中。
   - 勾選啟用 **Google Sheets**。
   - 勾選啟用 **Google Calendar**。
3. **貼上專案提示詞**（見下方第三步）。
4. **預覽與測試**：
   - 點擊「使用 Google 帳號登入」並同意日曆與試算表存取權限。
   - 點擊「一鍵填入範例會議紀錄」並點擊「開始智能分析」。
   - 檢視 AI 萃取的清單，點擊「同步待辦清單至 Google Sheets」。
   - 點擊「一鍵將待辦與會議排入 Google 日曆」，打開自己的 [Google Calendar](https://calendar.google.com/)，立刻看見新行程已就位！

---

## 🤖 第三步：專案生成提示詞（點擊右上角一鍵複製）

請將以下整段提示詞複製，貼到 **Google AI Studio**：

```markdown
# Role（角色）
你是一位精通企業協作自動化、React、TypeScript 與 Tailwind CSS 的全端專家，擅長運用 Google AI Studio 的 Google Workspace Integrations（Google Sheets + Google Calendar）打造高效率辦公室工作流。

# Context（背景情境）
辦公室員工在開完跨部門會議後，常因手動整理待辦事項與排程而延誤時程。
本專案為「AI 智慧會議秘書（AI Meeting Action & Calendar Hub）」，讓使用者貼入雜亂筆記或逐字稿，經由 Gemini 整理為結構化待辦與重要會議日程，並透過 Google Integrations 分別寫入 Google Sheets 追蹤表與在 Google Calendar 建立排程。

# Task（任務目標）
請使用 vite-react-typescript 與 Tailwind CSS 建置優雅高效的單頁應用程式：

1. **Workspace 整合與 Google 登入狀態列**：
   - 頂部導航列顯示 Google 授權狀態（整合 Google Sheets 與 Google Calendar API）。
   - 提供「Sign in with Google」按鈕，授權後顯示個人頭像及「Sheets 連線中 🟢」、「Calendar 連線中 🟢」狀態指示燈。

2. **會議輸入與範本載入區**：
   - 提供大型文字輸入區（Textarea），支援貼上會議記錄或對話逐字稿。
   - 提供「📋 載入示範會議紀錄」按鈕，點擊可秒填入一段真實的跨部門會議內容，方便立即測試。
   - 提供「🚀 開始 AI 智慧拆解」主按鈕（附帶思考中 Loading 動畫）。

3. **AI 結構化萃取與三欄式成果呈現**：
   - **區塊一：會議核心摘要 (Executive Summary)**：3~4 點精闢的會議決策重點。
   - **區塊二：行動清單 (Action Items)**：
     - 以卡片或表格呈現：任務名稱、負責人（標籤色彩）、優先等級（高/中/低 Badge）、截止日期（Due Date）。
     - 提供「📥 一鍵寫入 Google Sheets」按鈕，將待辦事項整批追加進使用者的 Google 試算表。
   - **區塊三：關鍵日程與日曆同步 (Calendar Events)**：
     - 列出會議中提及的關鍵驗收日（Deadlines）與後續複盤會議（Follow-up Meetings）。
     - 每個事件旁附帶「📅 排入 Google 日曆」按鈕，亦提供「🌟 一鍵全部排入日曆」功能。
     - 調用 Google Calendar Integration 建立包含事件標題、日期時間、詳細說明的日曆項目。

4. **進度回饋與狀態提示**：
   - 寫入 Sheets 或建立 Calendar 事件時，顯示精緻的微動畫與成功訊息通知（Toast）。
   - 成功建立日曆事件後，附帶「在 Google 日曆中檢視」的超連結。

# Constraints（規格與限制要求）
1. 【設計風格】：現代簡約 Notion / Linear 風格，字體清晰，留白適當，善用 Indigo / Violet 色系作為科技感主色調。
2. 【相容與防呆】：
   - 針對日期格式進行自動補正（若會議只寫「下週二」，AI 需基於當前系統時間推算正確 YYYY-MM-DD）。
   - 若使用者尚未登入 Google，點擊同步按鈕時彈出貼心提醒 modal 引導登入。
3. 【單檔交付】：程式碼結構嚴謹，提供完整可運作的單一 App.tsx（或組件），含完整 TypeScript 型別定義。

# Format（交付格式）
1. 相依套件安裝指令（含 lucide-react 等圖示庫）。
2. 提供完整且註解詳細的前端程式碼。
```

---

## 💡 常見問題與教學技巧

### Q1：AI 如何推算「下週五」是幾月幾號？
- 提示詞中已指示系統注入當前日期（System Time Context），Gemini 能根據當前基準時間精準換算相對日期（例如「後天」、「下週五」），自動轉化為標準的 `YYYY-MM-DD` 格式以供日曆與試算表使用。

### Q2：排入日曆時可以設定通知提醒嗎？
- 可以！在 Google Calendar API 寫入事件時，預設會啟動 Google 日曆的 10 分鐘或 30 分鐘前推播提醒，確保團隊成員不會忘記重要 Milestone。
