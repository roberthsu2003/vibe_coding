# ⽤ AI 寫總結和翻譯

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

本單元將帶領學員使用 AI 來進行會議紀錄的重點總結與多國語言翻譯。我們將透過撰寫精準的 Prompt 來約束 AI 的輸出格式。

## 技術棧 (Tech Stack)
實作此生成工具時，建議採用以下前端技術：
- **建置工具**: Vite
- **前端框架**: React
- **程式語言**: TypeScript

## 測試資料：會議紀錄逐字稿
請點擊下方展開會議紀錄，並將內容複製下來，以便在測試 AI 輸出時使用：

<details>
<summary>📋 點我展開會議紀錄</summary>

```text
會議主題：Q3 產品開發進度同步與行銷策略討論
會議時間：2023年9月15日 10:00 - 11:00
與會者：
- Alex (產品經理)
- Ben (前端工程師)
- Cathy (後端工程師)
- David (行銷總監)

會議紀錄：
Alex：大家好，今天主要是想同步一下我們 Q3 新功能「AI 智慧推薦系統」的開發進度。Ben，前端那邊目前狀況如何？
Ben：目前首頁的推薦區塊 UI 已經切版完成，並且串接了 Mock API，不過效能在資料量大的時候會卡頓，這週我會加入虛擬滾動 (Virtual Rendering) 來優化。預計週五前可以完成。
Alex：OK，效能優化很重要。Cathy，後端 API 的部分呢？
Cathy：推薦演算法的模型已經部署到測試環境了，目前 API 的回應時間平均在 200ms 左右。不過有些極端情況下會有 Timeout 的問題，我正在跟 DevOps 團隊一起排查，可能需要增加機器的規格。
Alex：好，有問題隨時提出。David，行銷那邊針對這次上線有什麼規劃嗎？
David：我們預計在功能上線前一週發送 EDM 給既有客戶，強調「個人化體驗升級」。另外，我希望產品團隊能提供一些實際的應用案例 (Use Case)，讓我們可以在社群媒體上做預熱宣傳。
Alex：沒問題，我明天下班前整理三個 Use Case 給你。總結一下接下來的 Action Items：第一，Ben 負責前端效能優化，週五前完成；第二，Cathy 解決後端 API Timeout 問題；第三，我明天提供三個 Use Case 給 David。大家還有問題嗎？
Cathy：沒有。
Ben：沒問題。
David：收到，期待上線！
Alex：好，那今天會議就先到這邊，謝謝大家。
```

</details>

## 實作 Prompt 範例

```markdown
請幫我開發一個「AI 會議記錄生成與翻譯工具」的網頁前端應用程式。
具體的開發需求與規格如下：

### 1. 技術棧與框架 (Tech Stack)
- 建置工具：Vite
- 核心框架：React
- 程式語言：TypeScript
- 樣式框架：Tailwind CSS (或其他適合的 UI 函式庫，請幫我設計美觀的現代化介面)

### 2. 核心功能與介面
- **介面語系**：整個應用程式（App）的 UI 介面與所有提示文字都必須使用**繁體中文**呈現。
- **輸入區**：提供一個大型文字方塊（Textarea），讓使用者可以貼上「會議逐字稿」或「重點筆記」。
- **操作按鈕**：包含一個「生成總結與翻譯」的按鈕，點擊時必須顯示 Loading 讀取狀態。
- **輸出顯示區**：將 AI 處理後的結果格式化顯示於畫面中（支援 Markdown 渲染為佳），並且為結果區塊提供一個「一鍵複製」的按鈕。

### 3. API 整合邏輯
- 請在前端撰寫一個呼叫 AI 模型（例如 Google Gemini 或 OpenAI API）的串接邏輯。
- 當使用者送出文本時，請將以下 Prompt 包裝後發送給 AI 服務：
  > "請扮演專業的會議記錄助理。根據提供的逐字稿，整理出：1. 摘要 2. 重點討論 3. Checkbox 格式的待辦清單，接著再將上述內容提供一份專業的英文翻譯版本。"

請列出完整的專案結構，並提供各個檔案所需的完整程式碼。
```

## 實作專案請放此處

- 請透過 `npm create vite@latest` 初始化專案 (選擇 React + TypeScript)。
- 並將專案相關程式碼建立於此資料夾內 (`/⽤AI寫總結和翻譯/`)。
