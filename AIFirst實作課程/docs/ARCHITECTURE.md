# SROI 投入管理系統 (SROI Remix App) 專案架構指南

這份文件旨在幫助您快速理解本專案的系統架構、資料流程以及核心模組。本系統原本為一個 SPA 單頁式網頁，現已升級為基於 React Router v7 (前身為 Remix) 的全端應用程式，並整合了 Google Gemini AI 來輔助計算與分析 SROI (社會投資報酬率)。

---

## 🚀 技術堆疊 (Tech Stack)

* **核心框架**: React Router v7 (SSR/Client side routing), React 19
* **建置工具**: Vite, TypeScript
* **樣式/UI**: Tailwind CSS v4, Lucide React (Icons), Recharts (圖表)
* **AI 服務**: Google GenAI SDK (`@google/genai`)
* **其他**: React Markdown (呈現 AI Markdown 回應), Vite TSPath (路徑管理)

---

## 📁 資料夾與檔案結構 (Directory Structure)

專案原始碼主要集中於 `app/` 資料夾中。

```text
sori-remix-app/
├── package.json             # 依賴套件定義
├── vite.config.ts           # Vite 環境設定
├── react-router.config.ts   # 路由規則核心設定檔
├── app/
│   ├── root.tsx             # 應用程式的進入點與根版面 (Root Layout)
│   ├── routes.ts            # 定義路由列表 (指引 / 和 /api/gemini 的路徑)
│   ├── types.ts             # TS 型別定義檔 (專案通用資料結構)
│   ├── App.tsx              # ⭐ 系統前端的「核心大腦」，管理幾乎所有的狀態與頁面切換
│   ├── routes/              # 頁面與 API 路由 (React Router v7)
│   │   ├── home.tsx         # 首頁 (路徑 "/", 將 App.tsx 包裝引入)
│   │   └── api.gemini.ts    # ⭐ 後端 API 端點 (接收前端 POST 請求，執行伺服器操作)
│   ├── services/            # 商務邏輯與外部服務整合
│   │   └── geminiService.ts # ⭐ 封裝所有與 Gemini API 互動的邏輯、特定 Prompt 設定
│   └── src/                 # 共用元件與工具
│       ├── components/
│       │   ├── Layout/      # Header 與 TabNavigation
│       │   └── Tabs/        # 所有的分頁元件 (SetupTab, Dashboard, AIReport 等)
│       └── utils/           # 工具函式 (例如 csvParser.ts)
```

---

## ♻️ 資料流與架構 (Data Flow & Architecture)

本專案採用 **前後端分離 (Client-Server Interaction)** 概念，但都寫在同一個框架下：

### 1. 前端狀態管理 (`app/App.tsx`)
所有的狀態資料集中由 `App.tsx` 建立與維護，例如專案設定 `ProjectSetupData`、輸入項目 `ProjectInput`、輸出項目 `ProjectOutput`，以及分析各個階段的成果與報告。
- `App.tsx` 作為主要的「狀態容器」(State Container)。
- 狀態透過 Props 傳遞給 `app/src/components/Tabs/` 下的各個子元件（分頁）。
- 各分頁觸發特定事件 (例如點擊「AI 分析」)，會呼叫到 `App.tsx` 中的 Handler 事件 (如 `triggerStakeholderAnalysis`)。

### 2. 前後端溝通 (Frontend to API)
因為串接 AI API（Gemini）需要用到安全的 `API_KEY`，不能將密鑰暴露在前端，專案設立了 `api.gemini.ts` 作為後端中繼站。
- `App.tsx` 內有方法 `callGeminiAPI(actionType, data)`。
- 這個方法會發送一個 `POST` 請求到 `/api/gemini`。
- 請求夾帶 JSON 格式的 `actionType` (想做什麼分析) 與 `data` (目前分析用的資料)。

### 3. Server-side 分析層 (`app/routes/api.gemini.ts` & `geminiService.ts`)
這是真正的後端邏輯層。
- `api.gemini.ts` 中的 `action` 函式收到 `POST` 請求後，透過 `switch(actionType)` 來分流。
- 根據 `actionType` 呼叫 `geminiService.ts` 暴露出來的函式 (如：`analyzeSROI`, `parsePDFProposal`)。
- `geminiService.ts` 內嵌了大量 **SROI 專業知識系統指令 (SYSTEM_INSTRUCTION)**，格式化資料並打給 Google GenAI 取得分析結果。
- 分析結果返回後，`api.gemini.ts` 再將資料包裝回 JSON 傳遞給前端的 `App.tsx` 進行畫面渲染。

---

## 🧩 核心模組詳解 (Key Modules)

### A. 前端畫面與分頁 (Tabs)
位於 `app/src/components/Tabs/`：
1. **SetupTab.tsx**: 專案基本設定 (名稱、年份、PDF 企劃書上傳解析)。
2. **StakeholdersTab.tsx**: 利害關係人盤點。
3. **OutcomesTab.tsx**: 成果與事件鏈推導。
4. **FinancialsTab.tsx**: 財務與代理變數轉化。
5. **ImpactTab.tsx**: 影響力因子分析。
6. **ValuesTab.tsx**: 綜合價值計算與圖表呈現。
7. **DashboardTab.tsx / AIReportTab.tsx**: 視覺化 Dashboard 與自動產生的 AI 顧問報告。

### B. 後台分析 Action Types (`api.gemini.ts`)
您可以將這些理解為 Controller 層的方法：
- `analyzeSROI` (取得顧問建議分析)
- `parsePDFProposal` (上傳 PDF 後自動提取資料)
- `analyzeStakeholders` (自動分析利害相關人)
- `analyzeOutcomes` (推導成果)
- `analyzeFinancialProxies` (財務化)
- `analyzeImpactFactors`、`analyzeImpactValue`、`calculateFinalSROI` (計算 SROI 最終值)

---

## 🛠 如果你想修改... (How to Modify)

1. **想改前端畫面/排版/狀態?**
   - 尋找 `app/App.tsx` (總管) 或 `app/src/components/Tabs/*.tsx` (各頁面)。
   - UI 元件為 Tailwind，直接修改 `className`。
   
2. **想改 AI 分析的邏輯、Prompt?**
   - 尋找 `app/services/geminiService.ts`。所有的提示詞與系統背景知識 (SYSTEM_INSTRUCTION) 都在這裡。
   - 若您想增加新的分析階段，請在此新增一個服務函式。
   
3. **想新增別的後端 API?**
   - 可以在 `app/routes/` 底下新增類似 `api.something.ts`，並於 `app/routes.ts` 裡面註冊路由，即可建立一個新的 Server端 Endpoint。
