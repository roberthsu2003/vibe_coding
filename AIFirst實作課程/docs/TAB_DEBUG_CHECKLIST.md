# Tab 除錯檢查清單 (Tab Debug Checklist)

本文件對應每個 Tab 的主要頁面、功能、觸發按鈕、Gemini API 與 Prompt 位置，方便您一個 Tab 一個 Tab 進行資料驗證與除錯。

---

## 檔案對照表

| 檔案 | 路徑 |
|------|------|
| Gemini 服務（所有 Prompt） | `app/services/geminiService.ts` |
| API 路由（actionType 分流） | `app/routes/api.gemini.ts` |
| 主狀態與觸發邏輯 | `app/App.tsx` |
| CSV 解析工具 | `app/src/utils/csvParser.ts` |

---

## Tab 0：計畫解析 (Setup)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/SetupTab.tsx` |
| **主要功能** | PDF 上傳解析、專案背景編輯、投入/產出項目 CRUD |
| **觸發按鈕** | 「立即解析 PDF 並提取定價數據」、新增/刪除投入項、新增/刪除產出項 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `parsePDFProposal` | `parsePDFProposal()` | 上傳 PDF 並點擊解析按鈕 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 75–117 行
- **函式**：`parsePDFProposal`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `base64Data` | PDF 轉 Base64 |
| `mimeType` | `application/pdf` |

| 輸出 | 寫入 State |
|------|------------|
| `setup` | `setupData` |
| `inputs` | `userInputs` |
| `outputs` | `userOutputs` |

### 檢查重點

- [ ] PDF 解析後 `setupData` 是否有正確的 name、period、location、type
- [ ] `userInputs` 的 category 是否為「人/場地/物力」三類之一
- [ ] `userOutputs` 的 subCategory 是否正確
- [ ] 各項 `totalValue` 計算是否正確

---

## Tab 1：利害關係人 (Stakeholders)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/StakeholdersTab.tsx` |
| **主要功能** | 利害關係人盤點、納入/排除決策 |
| **觸發按鈕** | 「分析利害關係人」、各列的納入/排除按鈕 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `analyzeStakeholders` | `analyzeStakeholders()` | 點擊「分析利害關係人」或 PDF 解析後自動 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 145–171 行
- **函式**：`analyzeStakeholders`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `projectData` | `setupData`（專案基本資訊） |

| 輸出格式 | CSV 標題列 |
|----------|------------|
| CSV | `類別(直接/間接),利害關係人,系統判斷建議,理由,使用者決策 (按鈕)` |

| 解析對應 (App.tsx) | parts 索引 |
|--------------------|------------|
| `category` | parts[0] |
| `name` | parts[1] |
| `suggestion` | parts[2] |
| `reason` | parts[3] |
| `decision` | parts[4] |

### 檢查重點

- [ ] CSV 回傳是否為純 CSV（無 Markdown 包裝）
- [ ] 標題列是否正確（第一行會被 parseCSV 略過）
- [ ] 解析後 `stakeholders` 陣列每筆是否有 5 個欄位
- [ ] 使用者點擊「納入/排除」後 `decision` 是否正確更新

---

## Tab 2：成果推導 (Outcomes)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/OutcomesTab.tsx` |
| **主要功能** | 推導事件鏈與定義成果、納入/排除決策 |
| **觸發按鈕** | 「推導成果」、各列的納入/排除按鈕 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `analyzeOutcomes` | `analyzeOutcomes()` | 點擊「推導成果」或 PDF 解析後自動 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 176–204 行
- **函式**：`analyzeOutcomes`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `projectData` | `setupData` |
| `inputs` | `userInputs` |
| `outputs` | `userOutputs` |

| 輸出格式 | CSV 標題列 |
|----------|------------|
| CSV | `對象,投入 (來自計畫書),產出 (來自計畫書),推導事件鏈,定義成果,使用者決策 (按鈕)` |

| 解析對應 (App.tsx) | parts 索引 |
|--------------------|------------|
| `stakeholder` | parts[0] |
| `input` | parts[1] |
| `output` | parts[2] |
| `chain` | parts[3] |
| `outcome` | parts[4] |
| `decision` | parts[5] |

### 檢查重點

- [ ] 前置：`stakeholders.length > 0`
- [ ] CSV 欄位數是否為 6
- [ ] `chain` 是否使用 `->` 描述事件鏈
- [ ] 後續步驟會過濾 `decision !== '排除'` 的 outcomes

---

## Tab 3：財務定價 (Financials)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/FinancialsTab.tsx` |
| **主要功能** | 財務代理變數與定價 |
| **觸發按鈕** | 「推導財務代理變數」 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `analyzeFinancialProxies` | `analyzeFinancialProxies()` | 點擊「推導財務代理變數」或 PDF 解析後自動 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 209–234 行
- **函式**：`analyzeFinancialProxies`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `stakeholders` | `stakeholders.filter(s => s.decision !== '排除')` |
| `outcomes` | `outcomes.filter(o => o.decision !== '排除')` |

| 輸出格式 | CSV 標題列 |
|----------|------------|
| CSV | `利害關係人,成果,財務代理變數,定價` |

| 解析對應 (App.tsx) | parts 索引 |
|--------------------|------------|
| `stakeholder` | parts[0] |
| `outcome` | parts[1] |
| `proxy` | parts[2] |
| `pricing` | parts[3] |

### 檢查重點

- [ ] 前置：`outcomes.length > 0`（且至少一筆未排除）
- [ ] 傳入的 stakeholders、outcomes 是否已過濾「排除」項
- [ ] `pricing` 是否為可解析的數字格式

---

## Tab 4：影響力因子 (Impact)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/ImpactTab.tsx` |
| **主要功能** | 四項折減因子（無謂、移轉、歸因、衰減） |
| **觸發按鈕** | 「評估影響力因子」 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `analyzeImpactFactors` | `analyzeImpactFactors()` | 點擊「評估影響力因子」或 PDF 解析後自動 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 239–264 行
- **函式**：`analyzeImpactFactors`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `stakeholders` | 過濾後的利害關係人 |
| `outcomes` | 過濾後的成果 |

| 輸出格式 | CSV 標題列 |
|----------|------------|
| CSV | `利害關係人,成果,無謂因子,移轉因子,歸因因子,衰減因子` |

| 解析對應 (App.tsx) | parts 索引 |
|--------------------|------------|
| `stakeholder` | parts[0] |
| `outcome` | parts[1] |
| `deadweight` | parts[2] |
| `displacement` | parts[3] |
| `attribution` | parts[4] |
| `dropOff` | parts[5] |

### 檢查重點

- [ ] 前置：`financialProxies.length > 0`（邏輯上需先有財務定價）
- [ ] 各因子格式是否為「百分比 (理由)」
- [ ] 與 `financialProxies` 的 stakeholder/outcome 對應是否一致

---

## Tab 5：影響價值 (Values)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/ValuesTab.tsx` |
| **主要功能** | 影響價值計算（未折現） |
| **觸發按鈕** | 「計算影響價值」 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `analyzeImpactValue` | `analyzeImpactValue()` | 點擊「計算影響價值」或 PDF 解析後自動 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 269–298 行
- **函式**：`analyzeImpactValue`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `financials` | `financialProxies` |
| `impactFactors` | `impactFactors` |

| 輸出格式 | CSV 標題列 |
|----------|------------|
| CSV | `利害關係人,成果,成果定價,無謂因子,移轉因子,歸因因子,衰減因子,影響價值(未折現)` |

| 解析對應 (App.tsx) | parts 索引 |
|--------------------|------------|
| `stakeholder` | parts[0] |
| `outcome` | parts[1] |
| `pricing` | parts[2] |
| `deadweight` | parts[3] |
| `displacement` | parts[4] |
| `attribution` | parts[5] |
| `dropOff` | parts[6] |
| `value` | parts[7] |

### 檢查重點

- [ ] 前置：`impactFactors.length > 0`
- [ ] `value` 欄位是否為**純數字**（無逗號、無 NT$）
- [ ] 公式：`影響價值 = 定價 × (1 - 無謂%) × (1 - 移轉%) × (1 - 歸因%)`
- [ ] App.tsx 計算 totalImpact 時會用 `parseFloat(v.value.replace(/[^\d.]/g, ''))`

---

## Tab 6：影響力看板 (Dashboard)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/DashboardTab.tsx` |
| **主要功能** | SROI 比率、圖表、結論說明 |
| **觸發按鈕** | 「計算 SROI」 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `calculateFinalSROI` | `calculateFinalSROI()` | 點擊「計算 SROI」或 PDF 解析後自動 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 303–329 行
- **函式**：`calculateFinalSROI`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `totalCost` | `setupData.funds`（number）或 `userInputs` 總和 |
| `totalImpactValue` | `impactValues` 的 value 加總（字串） |

| 輸出格式 | CSV 標題列 |
|----------|------------|
| CSV | `總投入成本,總影響價值,SROI比值,結論說明` |

| 解析對應 (App.tsx) | 說明 |
|--------------------|------|
| 取第二行 | `sroiLines[1]` |
| `conclusion` | parts[3]（結論說明） |

**注意**：`totalCost`、`totalImpactValue`、`ratio` 在 App.tsx 中由前端計算，Gemini 回傳的 CSV 主要用於 `conclusion` 文字。

### 檢查重點

- [ ] 前置：`impactValues.length > 0`
- [ ] `funds`：`ProjectSetupData.funds` 為 **number**；PDF 舊字串經 `parseFundsToNumber` 正規化
- [ ] 折現率 1.2%：`impactPresentValue = totalImpact / (1 + 0.012)`
- [ ] SROI 公式：`ratio = impactPresentValue / funds`

---

## Tab 7：顧問報告 (AI Report)

| 項目 | 說明 |
|------|------|
| **頁面元件** | `app/src/components/Tabs/AIReportTab.tsx` |
| **主要功能** | AI 顧問報告（Markdown 渲染） |
| **觸發按鈕** | Header「生成顧問報告」按鈕 |

### Gemini API 對應

| actionType | 函式 | 觸發時機 |
|------------|------|----------|
| `analyzeSROI` | `analyzeSROI()` | 點擊 Header「生成顧問報告」或 PDF 解析後背景執行 |

### Prompt 位置

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 44–70 行
- **函式**：`analyzeSROI`

### 輸入 / 輸出

| 輸入 | 說明 |
|------|------|
| `inputs` | `userInputs` |
| `outputs` | `userOutputs` |

| 輸出 | 說明 |
|------|------|
| Markdown 文字 | 寫入 `analysis` state，由 ReactMarkdown 渲染 |

### 檢查重點

- [ ] 前置：`userInputs.length > 0` 或 `userOutputs.length > 0`
- [ ] 回傳為 Markdown，非 CSV
- [ ] 報告內容是否包含：數據總結、價值合理性評估、優化建議

---

## 共用：SYSTEM_INSTRUCTION

所有 Gemini 呼叫皆使用同一個 `SYSTEM_INSTRUCTION`：

- **檔案**：`app/services/geminiService.ts`
- **行數**：約 6–39 行
- **內容**：SROI 分析師角色、計算公式、人/地/物對應規則、標竿案例、輸出規範

---

## 除錯流程建議

1. **Tab 0**：上傳 PDF → 檢查 `setupData`、`userInputs`、`userOutputs`
2. **Tab 1**：檢查 `stakeholders` 解析結果與決策按鈕
3. **Tab 2**：檢查 `outcomes`，確認 chain、outcome 欄位
4. **Tab 3**：確認傳入的 stakeholders/outcomes 已過濾排除項
5. **Tab 4**：確認與 Tab 3 的 stakeholder/outcome 對應一致
6. **Tab 5**：確認 `value` 為純數字，檢查 totalImpact 計算
7. **Tab 6**：確認 funds、totalImpact、ratio、conclusion
8. **Tab 7**：確認 Markdown 渲染與報告內容

---

## 相關文件

- [APP_FUNCTIONALITY.md](./APP_FUNCTIONALITY.md) - App.tsx 功能說明
- [DEBUG_建議.md](./DEBUG_建議.md) - 除錯方法建議
