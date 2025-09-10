# AI 提示詞工程指南

## 提示詞工程基礎

### Prompt 工程是未來關鍵技能
與 AI 的溝通能力決定了其輔助的成效。善用「ROSES 架構」等提示技巧能讓 AI 更精準地理解需求。

### ROSES Prompt Framework（建議定義）:
- **R – Role (角色)**：指定 AI 的角色（如：Python 專家、Code Reviewer）。
- **O – Objective (目標)**：清楚描述要完成的任務。
- **S – Steps (步驟)**：拆解任務的步驟，讓 AI 照順序處理。
- **E – Examples (範例)**：提供輸入/輸出的範例，避免模糊。
- **S – Scope & Style (範圍/風格)**：限制語言、框架、程式風格。

> [!IMPORTANT]
> 透過**描素**建立符合**ROSES的Prompt.md樣版**

#### 範本1: 建立 Python API

```
# ROSES Prompt: Python API 建立

## R – Role (角色)
你是一位 Python Flask 專家。

## O – Objective (目標)
建立一個簡單的 RESTful API，提供 `GET /users` 回傳 JSON 格式的使用者資料。

## S – Steps (步驟)
1. 建立 Flask 專案檔案 `app.py`
2. 在 `app.py` 內建立 `/users` 路由
3. 回傳一個 JSON 陣列，包含 `id`, `name`, `email`
4. 確保程式可直接執行 `python app.py` 啟動

## E – Examples (範例)

### 輸入：
bash:curl http://127.0.0.1:5000/users

### 輸出:

[
  {"id": 1, "name": "Alice", "email": "alice@example.com"},
  {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

## **S – Scope & Style (範圍/風格)**

- 使用 Python 3.12
- 僅用 Flask，不可使用 FastAPI
- 程式碼要有註解，遵循 PEP8


```



### 補充:Google公布AI提示萬用公式
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

---

## Prompt常見的指令(coding)

這些像 **codebase, workspace** 的詞，常出現在 **AI coding prompt / 開發環境** 裡，尤其是 GitHub Copilot Chat、Cursor、VSCode 插件裡面。它們其實是一種 **指令詞 (Context 指令)**，用來告訴 AI 如何理解專案結構與程式範圍。

我幫你整理 **常見的 coding Prompt 指令**，分門別類說明：

---


### **1.**

### **codebase**

- **用途**：告訴 AI「專案所有程式碼的集合」
- **常見用法**：
    - #codebase 請 AI 解釋整個專案架構
    - #codebase search "login" 找出專案內所有 login 相關程式
- **重點**：適合用來總覽、尋找、或做跨檔案修改

---

### **2.**

### **workspace**

- **用途**：指你目前在 IDE 或專案資料夾裡的工作範圍
- **常見用法**：
    - #workspace 解釋目前開啟的檔案與目錄
    - #workspace edit 修改當前檔案的程式碼
- **差異**：比 codebase 小，通常指「你正在處理的子專案或目前開啟的內容」

---

### **3.**

### **file**

- **用途**：限制 AI 在「單一檔案」操作或解釋
- **常見用法**：
    - #file explain 解釋目前檔案內容
    - #file edit 修改目前檔案
- **重點**：比 workspace 更小的範圍

---

### **4.**

### **diff**

- **用途**：請 AI 檢視 Git 的差異（修改紀錄）
- **常見用法**：
    - #diff 解釋最新的 git 修改內容
    - #diff review 請 AI 做 code review
- **好處**：適合用來檢查 PR / commit 是否合理

---

### **5.**

### **tests**

- **用途**：讓 AI 生成或修改測試程式
- **常見用法**：
    - #tests generate 針對某檔案自動建立測試
    - #tests run 幫忙模擬執行測試並解釋結果

---

### **6.**

### **docs**

- **用途**：讓 AI 專注於文件或註解生成
- **常見用法**：
    - #docs write 幫程式碼加上 docstring
    - #docs summarize 產生 API 文件

---

### **7.**

### **terminal**

- **用途**：模擬命令列操作
- **常見用法**：
    - #terminal run "npm install"
    - #terminal explain 解釋錯誤訊息

---

### **8.**

### **review**

- **用途**：請 AI 檢查品質 / 安全性 / 效能
- **常見用法**：
    - #review code 檢查是否有 bug
    - #review security 檢查安全性問題

---

## **🔑 總結**

| **指令**        | **範圍/用途**       |
| ------------- | --------------- |
| **codebase**  | 整個專案（全域搜尋 / 修改） |
| **workspace** | 目前資料夾 / 子專案     |
| **file**      | 當前單一檔案          |
| **diff**      | Git 修改差異        |
| **tests**     | 測試程式生成/執行       |
| **docs**      | 文件 / 註解生成       |
| **terminal**  | 命令列操作模擬         |
| **review**    | 程式碼審查 / 安全性檢查   |

---



## AI 輔助開發流程

> [!IMPORTANT]
> 透過**prompt**產生**todolist.md樣版**
> 透過**prompt+prd產生**todolist.md樣版**

### 在 Vibe Coding 中使用 To-Do List
Vibe Coding 時可以建立一個 To Do List 檔案，並讓 AI 按順序執行每一個任務。因為 Vibe Coding 本身的設計偏向「逐步互動」而非完全自動化的腳本執行

**如何設計一份最佳化的 todolist.md**，讓 AI（像 GitHub Copilot Chat、Cursor、Claude、ChatGPT 等）可以依據你的清單內容來進行程式設計。


### **todolist.md 最佳化設計原則**

#### **1. 明確化 (Clarity)**

- 每一項任務要具體、可執行，避免模糊。
- 避免寫「完成前端」，應寫「建立登入頁面的 React 元件」。

#### **2. 原子化 (Atomic)**

- 將任務拆解成最小可完成單位。
- 一個任務不要同時包含「建立 API + 測試 API + 部署」。

#### **3. 可驗證性 (Verifiable)**

- 每個任務應有 **完成標準** (Definition of Done)。
- AI 才知道完成的程式碼是否達到要求。

#### **4. 指令化 (Instructional)**

- 使用 **動詞開頭**（實作、建立、撰寫、測試）。
- 提供範例或限制（例如語言、框架、檔名）。

#### **5. 層級化 (Hierarchical)**

- 用 # / ## / - 組織結構。
- 方便 AI 從上而下逐步完成。

---

### **範例 todolist.md**

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

## **小技巧**

1. **明確指定語言/框架**：例如「用 Python Flask 建立 API」而不是「建立 API」。
2. **加入輸入/輸出格式**：讓 AI 知道該怎麼寫。
3. **加上檔名**：避免 AI 把程式碼寫到錯的檔案。
4. **善用核取方塊 [ ]**：AI 可以逐項完成。
5. **模組化**：一個模組一個區塊，讓 AI 可以分開執行。


