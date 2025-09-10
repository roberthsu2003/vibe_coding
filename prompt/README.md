# AI 提示詞工程指南

## 提示詞工程基礎

### Prompt 工程是未來關鍵技能
與 AI 的溝通能力決定了其輔助的成效。善用「ROSES 架構」等提示技巧能讓 AI 更精準地理解需求。

### ROSES架構:
- **R**ole (角色)
- **O**bjective (目標)
- **S**cenario (情境)
- **E**xpected Solution (預期結果)
- **S**teps (步驟)

### Google公布AI提示萬用公式
**掌握「21字黃金法則」: 先穩80分基本功再求好**

1. **角色設定**: 要LLM調度哪些領域知識
2. **任務**: 你想完成什麼目標
3. **背景**: 任務的起源/目標的限制/涉及的人士等
4. **格式**: 輸出類型, 編排格式

---

## 軟體開發所需文件

### PRD (Product Requirements Document)
產品需求文檔（PRD）是一份詳細說明產品功能、特性和需求的文檔。它的主要用途包括：

1. **明確產品定義**：清楚描述要開發的產品是什麼，包含哪些功能
2. **統一團隊認知**：讓開發團隊、設計師、產品經理等所有相關人員對產品需求有一致的理解
3. **開發指引**：作為開發過程中的參考文檔，確保開發方向正確
4. **測試基準**：提供測試人員驗證產品是否符合需求的依據
5. **決策記錄**：記錄產品設計的決策過程和理由

在軟體開發流程中，PRD通常是產品開發的起始文檔，它會詳細描述用戶故事、功能需求、技術規格、驗收標準等重要資訊，是整個開發團隊的共同參考基準。

### 需求類型
- 開發的需求
- Debug需求
- 測試需求
- Update需求

### Codebase (程式碼庫)
在程式開發的領域，「code base」是一個很常見且重要的術語。

#### Code base 是什麼？
「Code base（程式碼庫）」指的是：某一個專案或產品的所有原始程式碼的集合。

它包含了：
- 所有的 .py、.js、.java、.cpp 等原始程式碼檔案
- 設定檔（如 .env, config.json, settings.py）
- 資料結構與函式庫的實作
- 測試程式碼（unit tests）
- 有時還包含文件、建置腳本（如 Dockerfile, Makefile）等

#### 常見用法
1. This code base is hard to maintain.  
   → 這個程式碼庫很難維護。
2. We need to refactor the code base.  
   → 我們需要重構整個程式碼庫。
3. Our code base is shared across three microservices.  
   → 我們的程式碼庫橫跨三個微服務。

#### 舉例說明
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

### Acceptance Criteria (驗收標準)
- Given-When-Then-And 格式

---

## AI 輔助開發流程

### 在 Vibe Coding 中使用 To-Do List
Vibe Coding 時可以建立一個 To Do List 檔案，並讓 AI 按順序執行每一個任務。因為 Vibe Coding 本身的設計偏向「逐步互動」而非完全自動化的腳本執行，你可以透過以下方式達成目標：


了解 👍

你想做的主題是 **如何設計一份最佳化的 todolist.md**，讓 AI（像 GitHub Copilot Chat、Cursor、Claude、ChatGPT 等）可以依據你的清單內容來進行程式設計。

我幫你整理一份 **最佳化 todolist.md 設計指南**，包含 **結構、格式、範例**，讓 AI 容易理解並執行。

---

## **📘 todolist.md 最佳化設計原則**

### **1. 明確化 (Clarity)**

- 每一項任務要具體、可執行，避免模糊。
- 避免寫「完成前端」，應寫「建立登入頁面的 React 元件」。

### **2. 原子化 (Atomic)**

- 將任務拆解成最小可完成單位。
- 一個任務不要同時包含「建立 API + 測試 API + 部署」。

### **3. 可驗證性 (Verifiable)**

- 每個任務應有 **完成標準** (Definition of Done)。
- AI 才知道完成的程式碼是否達到要求。

### **4. 指令化 (Instructional)**

- 使用 **動詞開頭**（實作、建立、撰寫、測試）。
- 提供範例或限制（例如語言、框架、檔名）。

### **5. 層級化 (Hierarchical)**

- 用 # / ## / - 組織結構。
- 方便 AI 從上而下逐步完成。

---

## **📂 範例 todolist.md**

```other
# Project: Todo App (最佳化 todolist.md)

## 1. 初始化專案
- [ ] 使用 `npm init -y` 建立 Node.js 專案
- [ ] 安裝必要套件: `express`, `cors`, `nodemon`

## 2. 建立後端 API
- [ ] 建立檔案 `server.js`
- [ ] 建立 `GET /todos`，回傳 JSON 格式的待辦事項
- [ ] 建立 `POST /todos`，接收並新增新的待辦事項
- [ ] 建立 `DELETE /todos/:id`，刪除指定待辦事項
- [ ] 測試 API 是否可正常運作 (使用 `curl` 或 `Postman`)

## 3. 建立前端
- [ ] 使用 `create-react-app` 建立前端
- [ ] 建立元件 `TodoList.jsx` 顯示所有待辦事項
- [ ] 建立元件 `AddTodo.jsx`，可以輸入並新增待辦
- [ ] 在前端呼叫後端 API (`GET`, `POST`, `DELETE`)

## 4. 測試與驗證
- [ ] 測試新增、刪除、顯示功能是否正常
- [ ] 確認前後端連線成功
- [ ] README.md 撰寫專案啟動說明
```

---

## **📌 小技巧**

1. **明確指定語言/框架**：例如「用 Python Flask 建立 API」而不是「建立 API」。
2. **加入輸入/輸出格式**：讓 AI 知道該怎麼寫。
3. **加上檔名**：避免 AI 把程式碼寫到錯的檔案。
4. **善用核取方塊 [ ]**：AI 可以逐項完成。
5. **模組化**：一個模組一個區塊，讓 AI 可以分開執行。

---

要不要我幫你設計一個 **todolist.md 範本**，讓你未來做任何專案（例如 Python、Web、AI 任務）都能套用？
