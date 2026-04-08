# App.tsx 功能說明

`App.tsx` 是 SROI 投入管理系統的**核心前端元件**，負責管理整個應用程式的狀態、頁面切換，以及與 Gemini API 的互動流程。

---

## 📋 目錄

- [整體架構](#整體架構)
- [狀態管理](#狀態管理)
- [主要功能](#主要功能)
- [API 整合](#api-整合)
- [SROI 分析流程](#sroi-分析流程)
- [子元件與分頁](#子元件與分頁)

---

## 整體架構

```
App.tsx
├── Header（頂部導覽、全螢幕、觸發 AI 報告）
├── TabNavigation（分頁切換）
├── 各分頁內容（依 activeTab 動態渲染）
│   ├── SetupTab
│   ├── StakeholdersTab
│   ├── OutcomesTab
│   ├── FinancialsTab
│   ├── ImpactTab
│   ├── ValuesTab
│   ├── DashboardTab
│   └── AIReportTab
└── Footer
```

---

## 狀態管理

### 分頁狀態

| 狀態 | 型別 | 說明 |
|------|------|------|
| `activeTab` | `'setup' \| 'stakeholders' \| ... \| 'ai'` | 目前顯示的分頁 |

### 專案資料狀態

| 狀態 | 型別 | 說明 |
|------|------|------|
| `setupData` | `ProjectSetupData` | 專案基本設定（名稱、期間、地點、類型、動機、目標等） |
| `userInputs` | `ProjectInput[]` | 投入項目（人力、場地、物力） |
| `userOutputs` | `ProjectOutput[]` | 產出項目（直接/間接產出） |

### SROI 分析結果狀態

| 狀態 | 型別 | 說明 |
|------|------|------|
| `stakeholders` | `Stakeholder[]` | 利害關係人盤點結果 |
| `outcomes` | `Outcome[]` | 成果推導結果 |
| `financialProxies` | `FinancialProxy[]` | 財務代理變數定價 |
| `impactFactors` | `ImpactFactor[]` | 影響力因子（死重、替代、歸因、衰減） |
| `impactValues` | `ImpactValue[]` | 影響價值計算結果 |
| `sroiResult` | `SROIFinalResult \| null` | 最終 SROI 比率與結論 |
| `analysis` | `string` | AI 顧問報告（Markdown 格式） |

### 載入與錯誤狀態

| 狀態 | 說明 |
|------|------|
| `isParsing` | PDF 解析中 |
| `isAnalyzing` | AI 顧問報告生成中 |
| `isAnalyzingStakeholders` ~ `isCalculatingSROI` | 各階段 AI 分析中 |
| `isFullscreen` | 全螢幕模式 |
| `errorMsg` | 錯誤訊息（可關閉） |

---

## 主要功能

### 1. PDF 計畫書解析

- **觸發**：`handleFileChange`（上傳 PDF 檔案）
- **流程**：
  1. 驗證檔案為 PDF
  2. 轉為 Base64 後呼叫 `parsePDFProposal` API
  3. 解析回傳的 `setup`、`inputs`、`outputs`
  4. 更新 `setupData`、`userInputs`、`userOutputs`
  5. 自動觸發 `runAllAnalysis` 進行全流程分析

### 2. 投入/產出項目 CRUD

| 函式 | 功能 |
|------|------|
| `handleAddInput` / `handleAddOutput` | 新增項目 |
| `handleUpdateInput` / `handleUpdateOutput` | 更新項目（含自動重算 `totalValue`） |
| `handleRemoveInput` / `handleRemoveOutput` | 刪除項目 |

### 3. 全螢幕切換

- `toggleFullscreen`：切換全螢幕模式
- `useEffect` 監聽 `fullscreenchange` 事件以同步 `isFullscreen` 狀態

### 4. 錯誤提示

- 以紅色橫幅顯示 `errorMsg`
- 點擊 X 可關閉
- 各 API 呼叫失敗時會設定對應錯誤訊息

---

## API 整合

### callGeminiAPI 輔助函式

```typescript
callGeminiAPI(actionType: string, data: any)
```

- 向 `/api/gemini` 發送 POST 請求
- `actionType` 對應後端 `geminiService` 的動作類型
- 回傳 `resultData.result`，錯誤時拋出 `Error`

### 支援的 actionType

| actionType | 說明 |
|------------|------|
| `parsePDFProposal` | 解析 PDF 計畫書 |
| `analyzeSROI` | 生成 SROI 顧問報告 |
| `analyzeStakeholders` | 利害關係人盤點 |
| `analyzeOutcomes` | 成果推導 |
| `analyzeFinancialProxies` | 財務代理變數定價 |
| `analyzeImpactFactors` | 影響力因子評估 |
| `analyzeImpactValue` | 影響價值計算 |
| `calculateFinalSROI` | 最終 SROI 計算與結論 |

### CSV 解析

- 多數 AI 分析回傳 CSV 格式
- 使用 `parseCSV`（`./src/utils/csvParser`）將字串轉為結構化資料

---

## SROI 分析流程

分析流程具**依賴關係**，需依序完成：

```
1. 專案設定 + 投入/產出
   ↓
2. 利害關係人盤點 (Stakeholders)
   ↓
3. 成果推導 (Outcomes)
   ↓
4. 財務代理變數定價 (Financial Proxies)
   ↓
5. 影響力因子評估 (Impact Factors)
   ↓
6. 影響價值計算 (Impact Values)
   ↓
7. SROI 計算 (Dashboard)
   ↓
8. AI 顧問報告 (AI Report)
```

### runAllAnalysis（一鍵全流程）

上傳 PDF 後自動執行：

1. 並行：利害關係人 + 成果推導
2. 並行：財務代理變數 + 影響力因子
3. 影響價值計算
4. SROI 計算
5. 背景執行：AI 顧問報告

### 手動觸發函式

| 函式 | 前置條件 |
|------|----------|
| `triggerStakeholderAnalysis` | 已解析 PDF 或填寫專案設定 |
| `triggerOutcomeAnalysis` | 已完成利害關係人盤點 |
| `triggerFinancialProxyAnalysis` | 已完成成果推導 |
| `triggerImpactFactorAnalysis` | 已完成財務代理變數 |
| `triggerImpactValueAnalysis` | 已完成影響力因子 |
| `triggerSROICalculation` | 已完成影響價值計算 |
| `triggerAIAnalysis` | 已有投入/產出資料 |

---

## 子元件與分頁

| 分頁 | 元件 | 主要 Props |
|------|------|------------|
| `setup` | `SetupTab` | 專案設定、投入/產出、PDF 上傳、各階段觸發按鈕 |
| `stakeholders` | `StakeholdersTab` | 利害關係人列表、決策（納入/排除）、分析觸發 |
| `outcomes` | `OutcomesTab` | 成果列表、決策、分析觸發 |
| `financials` | `FinancialsTab` | 財務代理變數列表 |
| `impact` | `ImpactTab` | 影響力因子（死重、替代、歸因、衰減） |
| `values` | `ValuesTab` | 影響價值計算結果 |
| `dashboard` | `DashboardTab` | SROI 比率、圖表、結論 |
| `ai` | `AIReportTab` | AI 顧問報告（Markdown 渲染） |

---

## 統計計算 (stats)

```typescript
stats = useMemo(() => {
  totalInvestment: userInputs 總和
  totalOutput: userOutputs 總和
  sroiRatio: totalOutput / totalInvestment
  inputCount, outputCount
}, [userInputs, userOutputs])
```

---

## 相關檔案

- **型別定義**：`app/types.ts`
- **API 服務**：`app/services/geminiService.ts`
- **API 路由**：`app/routes/api.gemini.ts`
- **CSV 解析**：`app/src/utils/csvParser.ts`
- **架構總覽**：[ARCHITECTURE.md](./ARCHITECTURE.md)
