# 提示詞
## Prompt ⼯程是未來關鍵技能
與 AI 的溝通能⼒決定了其輔助的成效｡善⽤｢ROSES 架構｣等提⽰技巧能讓 AI 更精準地理解需求｡

### ROSES架構:
- Role(角色)
- Objective(目標)
- Scenario(情境)
- Expected Solution(預期結果)
- Steps(步驟)

## Google公布AI提示萬用公式

**掌握「21字黃金法則」:先穩80分基本功再求好**

1. 角色設定:要LLM調度哪些領域知識
2. 任務:你想完成什麼目標
3. 背景:任務的起源/目標的限制/涉及的人士等
4. 格式:輸出類型,編排格式

## 所需要的文件
### PRD(Product Requirements Document)
**用途：**

產品需求文檔（PRD）是一份詳細說明產品功能、特性和需求的文檔。它的主要用途包括：

1. 明確產品定義：清楚描述要開發的產品是什麼，包含哪些功能
2. 統一團隊認知：讓開發團隊、設計師、產品經理等所有相關人員對產品需求有一致的理解
3. 開發指引：作為開發過程中的參考文檔，確保開發方向正確
4. 測試基準：提供測試人員驗證產品是否符合需求的依據
5. 決策記錄：記錄產品設計的決策過程和理由

在軟體開發流程中，PRD通常是產品開發的起始文檔，它會詳細描述用戶故事、功能需求、技術規格、驗收標準等重要資訊，是整個開發團隊的共同參考基準。

### 需求
- 開發的需求
- debug需求
- 測試需求
- update需求
### codabase
- 在程式開發的領域，尤其像你在 Vibe Coding 上看到的「code base」，是一個很常見且重要的術語。

⸻

📌 code base 是什麼？

「Code base（程式碼庫）」指的是：

某一個專案或產品的所有原始程式碼的集合。

它包含了：
	•	所有的 .py、.js、.java、.cpp 等原始程式碼檔案
	•	設定檔（如 .env, config.json, settings.py）
	•	資料結構與函式庫的實作
	•	測試程式碼（unit tests）
	•	有時還包含文件、建置腳本（如 Dockerfile, Makefile）等

⸻

✅ 常見用法
	1.	This code base is hard to maintain.
→ 這個程式碼庫很難維護。
	2.	We need to refactor the code base.
→ 我們需要重構整個程式碼庫。
	3.	Our code base is shared across three microservices.
→ 我們的程式碼庫橫跨三個微服務。

⸻

🧠 舉例說明

假設你有一個 Python 網頁專案：

```
my_project/
├── app.py
├── routes/
│   └── user.py
├── models/
│   └── user_model.py
├── tests/
│   └── test_user.py
└── requirements.txt
```

這整個 my_project 資料夾就是你的 code base。


---


### acceptance Criteria(驗收標準)
- given-When-then-And

## 基礎建立\
是的，你可以在 Vibe Coding 時建立一個 To Do List 檔案，並讓 AI 按順序執行每一個任務，不過需要搭配一些策略，因為 Vibe Coding 本身的設計偏向「逐步互動」，而不是完全自動化的腳本執行。但你可以透過以下方式達成你的目標：

⸻

✅ 方法 1：在編輯器中建立 To Do List + 手動執行
	1.	在專案根目錄中建立一個文字檔案，例如 TODO.md 或 steps.todo。
	2.	清單格式可以是：

- [ ] 初始化一個 Node.js 專案
- [ ] 安裝 Express 套件
- [ ] 建立基本的伺服器架構
- [ ] 撰寫一個簡單的 API


	3.	在 Vibe Coding 中，你可以：
	•	一步步將清單項目複製貼上給 AI，請它完成。
	•	每當一項完成時，將 [ ] 改成 [x]。

⸻

✅ 方法 2：結合「System Prompt」與「工作清單」

如果你是進階使用者，可以試試下面這個方式：
	1.	建立一個指令（Prompt）像這樣：

你是一個程式開發助手，我會提供你一個步驟清單，請你**依序**執行每個任務。完成一個再繼續下一個，並在每個任務前請回報「已完成上一步，準備執行第 N 步」。

步驟如下：
1. 初始化一個 Node.js 專案
2. 安裝 Express 套件
3. 建立基本伺服器架構
4. 撰寫一個 GET /hello API


	2.	把這段話貼到 Vibe Coding 裡讓 AI 按順序執行。

⸻

✅ 方法 3：程式化自動控制（進階）

如果你希望完全自動化整個執行流程（例如 AI 自動跳到下一步），Vibe Coding 本身不支援程式觸發多回合對話（這種需求屬於 Agent 風格），但你可以考慮：
	•	使用 Python + OpenAI API 撰寫一個腳本控制每一個任務（使用 LangChain 或 AutoGen）。
	•	或者用 Open WebUI + Ollama 本地模型，來執行你的 Agent。
	•	使用 Cursor IDE（支援多步驟指令和檔案追蹤能力）來實作。

⸻

🔁 小結

方法	特性	適合對象
TODO 檔 + 手動進行	最簡單、直觀	初學者
清單 + 系統提示	半自動、有邏輯控制	中階
API + Agent 控制	全自動執行	進階開發者


---

如果你在 VS Code 中使用 GitHub Copilot，而且希望**逐步完成一個 To Do List（像任務清單）**的開發流程，建議這樣操作可以讓你又清楚又高效：

⸻

✅ GitHub Copilot 開發流程建議（結合 To Do List）

🎯 目標

建立一份逐步任務清單，讓 Copilot 按照每一個步驟協助你完成程式開發。

⸻

🧩 1. 建立 TODO.md 或 tasks.todo

在 VS Code 專案資料夾中建立一個 TODO.md 檔案，格式如下：

# 專案開發 To Do List

- [ ] 初始化 Node.js 專案
- [ ] 安裝 Express
- [ ] 建立基本伺服器（port 3000）
- [ ] 設計 GET /api/hello 回傳 JSON
- [ ] 將錯誤訊息統一處理


⸻

🛠 2. 逐步執行 + Copilot 配合方式

你可以一個一個任務進行，並善用 Copilot 的能力：

步驟一：手動選擇任務
	1.	選定第一個任務（例如「初始化 Node.js 專案」）
	2.	在終端機手動執行（Copilot 不會操作 CLI）：

npm init -y



步驟二：開始寫程式時，讓 Copilot 參與
	1.	在 index.js 或其他檔案中打下如下注解：

// 建立一個 Express 應用並監聽在 3000 port


	2.	Copilot 通常會自動補出一段程式碼，例如：

const express = require('express');
const app = express();
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


	3.	你可以接受 (Tab) 或修改 Copilot 提供的內容。

⸻

💡 3. 逐步進行每一個 To Do 項目

每完成一項，就在 TODO.md 中將 [ ] 改為 [x]：

- [x] 初始化 Node.js 專案
- [x] 安裝 Express
- [ ] 建立基本伺服器（port 3000）

這樣你可以：
	•	清楚追蹤目前的進度。
	•	控制 Copilot 的參與方式（透過提示文字或註解讓它補出你需要的程式碼）。

⸻

🧠 小技巧：如何讓 Copilot 更聰明幫你
	•	使用具體描述的註解會讓 Copilot 提供更符合需求的建議。例如：

// 建立一個 GET /api/hello 路由，回傳 { message: "Hello World" }


	•	若 Copilot 沒有出現建議，可以按下 Ctrl + Enter（或 macOS 的 Cmd + Enter）呼叫 Copilot Chat 幫你生成一段程式碼。

⸻

🧰 附加工具（如果你想更進階）

工具	說明
Copilot Chat	可對話問 Copilot「幫我根據這個 todo 建立 API」
Tasks Extension	VS Code 插件，可讓你管理 todo 和標註完成
Markdown Preview	即時預覽 TODO.md，適合展示與教學


⸻

✅ 最佳實作流程小總結
	1.	建立 TODO.md 並依照任務排序
	2.	每完成一項，就手動勾選
	3.	使用 Copilot 在程式檔案中寫註解讓 AI 協助產生程式碼
	4.	搭配 Copilot Chat，可以做更高層的對話協作

⸻
