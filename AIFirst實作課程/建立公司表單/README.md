# 建立公司表單：辦公室飲料訂購系統 (React + Vite 版)

本單元將帶領學生利用現代前端技術棧 **Vite + React + TypeScript** 建立一個與 Google Sheets 串接的實戰應用。學生將學會如何透過精確的 Prompt 引導 AI 產出高品質的元件代碼、型別定義以及後端串接邏輯。

## 課堂規劃

- **環境初始化**：引導學生使用 `npm create vite@latest` 初始化 React + TS 專案。
- **資料庫設計**：在 Google Sheets 建立 `Menu` 與 `Orders` 分頁。
- **AI 協作實作**：
    - 使用 Prompt 產生 **React 元件 (hooks, props, components)**。
    - 使用 Prompt 定義 **TypeScript Interfaces** 確保資料安全。
    - 使用 Prompt 產生 Google Apps Script (GAS) 後端。
- **部署與發佈**：將專案部署至 Vercel 或 GitHub Pages。

## 💡 Prompt 指令示範 (React/TS 教學重點)

教學時，請引導學生按照以下階段下指令：

### 第一階段：定義資料型別與元件結構
> **Prompt 範例**：
> 「我正在使用 **React + TypeScript** 開發飲料訂購系統。請幫我：
> 1. 定義 `Drink`（菜單項）和 `Order`（訂單）的 TypeScript Interfaces。
> 2. 建立一個 `OrderForm.tsx` 元件，使用 Tailwind CSS 設計表單。
> 3. 表單包含：訂購人姓名（文字框）、選擇飲料（下拉選單）、甜度（Radio Buttons）、冰塊（Radio Buttons）、數量。
> 4. 使用 `react-hook-form` 處理表單驗證。」

### 第二階段：建立 GAS 後端 (API)
> **Prompt 範例**：
> 「請幫我寫一個 Google Apps Script。
> 1. `doGet`：回傳 Google Sheet 'Menu' 分頁中的飲料資料（格式：`Drink[]`）。
> 2. `doPost`：接收 JSON 格式的 `Order` 物件並存入 'Orders' 分頁。
> 請確保回傳正確的 CORS headers，以便 React 前端可以順利進行跨網域呼叫。」

### 第三階段：串接 API 與狀態管理
> **Prompt 範例**：
> 「在我的 React 專案中，請幫我寫一個自定義 Hook `useDrinks` 來處理 API 抓取菜單的邏輯（使用 `useEffect` 和 `fetch`）。另外，請實作提交表單的功能，當資料傳送到 GAS 成功後，顯示一個漂亮的成功通知（如：`react-hot-toast`）。」

## 作品（產出）

- **實戰作品**：一個具備型別檢查、現代 UI 的 React 訂餐應用程式。
- **技術文件**：記錄下你在 React 元件開發與 API 串接過程中所使用的 Prompts。

## 實作檢查清單

- [ ] [初始化 Vite 專案](./)
- [ ] [定義 src/types.ts](./src/types.ts)
- [ ] [撰寫 src/components/OrderForm.tsx](./src/components/OrderForm.tsx)
- [ ] [Google Apps Script 佈署連結]()

---
> [!TIP]
> **教學重點**：強調 **TypeScript** 的重要性。引導學生問 AI：「如何根據後端回傳的 JSON 自動產生 TypeScript 型別？」，這能大幅提升開發效率並減少錯誤。
