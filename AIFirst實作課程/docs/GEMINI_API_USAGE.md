# Google Gemini API 使用說明

本文件說明 SROI Remix App 中 Google Gemini API 的整合方式、各 API 端點、對應的 Tab 頁面與觸發時機。

## 概述

- **API 路由**：`/api/gemini`（POST）
- **環境變數**：`GEMINI_API_KEY`（必填，存放於 `.env.local`）
- **錯誤處理**：API 錯誤會顯示於畫面上方紅色橫幅，並在終端機輸出詳細日誌

## API 端點一覽

| actionType | 對應函式 | 使用模型 | 說明 |
|------------|----------|----------|------|
| `parsePDFProposal` | `parsePDFProposal()` | gemini-3-flash-preview | 解析 PDF 計畫書，提取結構化 JSON |
| `analyzeStakeholders` | `analyzeStakeholders()` | gemini-3-flash-preview | 利害關係人盤點（CSV） |
| `analyzeOutcomes` | `analyzeOutcomes()` | gemini-3-flash-preview | 成果推導（CSV） |
| `analyzeFinancialProxies` | `analyzeFinancialProxies()` | gemini-3-flash-preview | 財務代理變數定價（CSV） |
| `analyzeImpactFactors` | `analyzeImpactFactors()` | gemini-3-flash-preview | 影響力因子評估（CSV） |
| `analyzeImpactValue` | `analyzeImpactValue()` | gemini-3-flash-preview | 影響價值計算（CSV） |
| `calculateFinalSROI` | `calculateFinalSROI()` | gemini-3-flash-preview | 最終 SROI 比值與結論（CSV） |
| `analyzeSROI` | `analyzeSROI()` | gemini-3-pro-preview | 顧問深度解析報告（Markdown） |

## 各 Tab 與 Gemini API 對應

### Tab 1：計畫解析 (Setup)

| 觸發方式 | 呼叫 API | 說明 |
|----------|----------|------|
| 上傳 PDF 檔案 | `parsePDFProposal` | 解析計畫書，提取 setup、inputs、outputs |
| 點擊「利害關係人盤點」 | `analyzeStakeholders` | 盤點利害關係人 |
| 點擊「成果推導」 | `analyzeOutcomes` | 推導成果 |
| 點擊「財務代理變數」 | `analyzeFinancialProxies` | 定價財務代理變數 |
| 點擊「影響力因子」 | `analyzeImpactFactors` | 評估影響力因子 |
| 點擊「影響價值計算」 | `analyzeImpactValue` | 計算影響價值 |
| 點擊「計算 SROI」 | `calculateFinalSROI` | 計算最終 SROI |
| 點擊「自動生成」 | 上述全部 + `analyzeSROI` | 一鍵執行完整流程 |

### Tab 2：利害關係人 (Stakeholders)

| 觸發方式 | 呼叫 API |
|----------|----------|
| 點擊「重新分析」 | `analyzeStakeholders` |
| 點擊「下一步」 | `analyzeOutcomes` |

### Tab 3：成果推導 (Outcomes)

| 觸發方式 | 呼叫 API |
|----------|----------|
| 點擊「重新分析」 | `analyzeOutcomes` |
| 點擊「下一步」 | `analyzeFinancialProxies` |

### Tab 4：財務代理變數 (Financials)

| 觸發方式 | 呼叫 API |
|----------|----------|
| 點擊「重新計算」 | `analyzeFinancialProxies` |
| 點擊「下一步」 | `analyzeImpactFactors` |

### Tab 5：影響力因子 (Impact)

| 觸發方式 | 呼叫 API |
|----------|----------|
| 點擊「重新評估」 | `analyzeImpactFactors` |
| 點擊「下一步」 | `analyzeImpactValue` |

### Tab 6：影響價值 (Values)

| 觸發方式 | 呼叫 API |
|----------|----------|
| 點擊「重新計算」 | `analyzeImpactValue` |
| 點擊「下一步」 | 無（僅切換至 Tab 7） |

### Tab 7：影響力看板 (Dashboard)

| 觸發方式 | 呼叫 API |
|----------|----------|
| 點擊「立即計算 SROI」 | `calculateFinalSROI` |
| 點擊「下一步」 | 無（僅切換至 Tab 8） |

### Tab 8：顧問報告 (AI)

| 觸發方式 | 呼叫 API |
|----------|----------|
| 點擊 Header「生成顧問報告」 | `analyzeSROI` |

> 顧問報告的觸發按鈕位於全域 Header，可在任意 Tab 點擊；完成後會切換至 Tab 8 顯示報告，並可下載 PDF。

## 技術架構

```
前端 (App.tsx)
    │
    │  callGeminiAPI(actionType, data)
    │  POST /api/gemini
    ▼
API 路由 (app/routes/api.gemini.ts)
    │
    │  switch (actionType) → 呼叫對應函式
    ▼
Gemini Service (app/services/geminiService.ts)
    │
    │  GoogleGenAI.generateContent()
    ▼
Google Gemini API
```

## 錯誤處理

- **429 配額超限**：顯示「Gemini API 配額已用完，請稍後再試或檢查您的帳單設定」
- **API 金鑰無效**：顯示「Gemini API 金鑰無效或已過期，請檢查 .env.local 中的 GEMINI_API_KEY」
- **其他錯誤**：顯示實際錯誤訊息（超過 200 字會截斷）

## 相關資源

- [Gemini API 官方文件](https://ai.google.dev/gemini-api/docs)
- [Gemini API 配額與限制](https://ai.google.dev/gemini-api/docs/rate-limits)
- [用量監控](https://ai.dev/rate-limit)
