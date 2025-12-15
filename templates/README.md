# Vibe Coding 模板庫

> 這個資料夾包含了 Vibe Coding 開發流程中常用的文件模板和 AI Prompt 模板。

---

## 📁 資料夾結構

```
templates/
├── README.md                       # 本檔案
├── requirement_template.md         # 需求規格書模板
├── plan_template.md               # 計畫文件模板
├── task_template.md               # 任務清單模板
├── test_checklist.md              # TDD 測試檢查清單
└── prompt_templates/              # AI Prompt 模板集
    ├── code_review.md             # Code Review Prompts
    ├── refactoring.md             # 重構 Prompts
    ├── test_generation.md         # 測試生成 Prompts
    └── bug_fixing.md              # 除錯 Prompts
```

---

## 📄 文件模板

### 1. [需求規格書模板](requirement_template.md)

**用途**: 定義專案需求,讓 AI 理解你要做什麼

**適用時機**:
- 開始新專案時
- 新增大功能時
- 需要與 AI 溝通需求時

**包含章節**:
- 專案基本資訊
- 核心功能需求
- 非功能需求
- 技術限制與約束
- 資料需求
- UI/UX 需求

**快速開始**:
```bash
# 複製模板
cp templates/requirement_template.md my_project_requirement.md

# 編輯並填寫你的需求
# 填寫完成後,將內容提供給 AI 生成 plan.md 和 task.md
```

---

### 2. [計畫文件模板](plan_template.md)

**用途**: 規劃專案的整體架構、模組劃分與實作順序

**適用時機**:
- 需求確定後,開始實作前
- 中大型專案需要架構設計時
- 需要讓 AI 理解專案結構時

**包含章節**:
- 系統架構
- 模組劃分
- 資料流設計
- API 設計
- 資料庫設計
- 實作順序與里程碑

**工作流程**:
1. 先填寫 [requirement_template.md](requirement_template.md)
2. 請 AI 根據需求生成 plan.md
3. 審核並調整 plan.md
4. 將 plan.md 作為後續實作的導航地圖

---

### 3. [任務清單模板](task_template.md)

**用途**: 將計畫拆解成可執行的具體任務

**適用時機**:
- plan.md 完成後
- 需要逐步執行實作時
- 追蹤開發進度時

**包含章節**:
- 任務狀態標記 (⬜ ✅ 🔄 ⏸️ ❌)
- Phase 分組
- 詳細的執行步驟
- 驗收標準
- 預估時間
- 參考 Prompt

**使用方式**:
1. 將 plan.md 提供給 AI,請它生成 task.md
2. 審核任務清單,確認順序和拆分是否合理
3. 逐一執行任務,更新狀態
4. 每天開始前檢視進度,結束前更新狀態

---

### 4. [TDD 測試檢查清單](test_checklist.md)

**用途**: 確保測試的完整性與品質

**適用時機**:
- 撰寫測試時
- 審核 AI 生成的測試時
- Code Review 時檢查測試

**包含章節**:
- 測試覆蓋度檢查
- 測試品質檢查
- 測試類型完整性
- 安全性測試
- 效能測試
- 常見測試反模式

**使用方式**:
1. 撰寫或生成測試後,對照檢查清單逐項檢查
2. 確保涵蓋 Happy Path、Edge Cases、Error Handling
3. 檢查測試獨立性、可讀性、穩定性
4. 執行測試並查看覆蓋率報告

---

## 🤖 AI Prompt 模板集

### 1. [Code Review Prompts](prompt_templates/code_review.md)

**用途**: 使用 AI 進行程式碼審查

**包含 Prompts**:
- 基本 Code Review (程式碼品質、潛在問題、安全性、可維護性)
- 特定面向檢查 (安全性、效能、可讀性)
- 特定語言/框架 Review (React, Node.js/Express, Python)
- 比較式 Review (比較兩種實作方式)
- Pull Request Review

**使用範例**:
```
請幫我審查以下程式碼,檢查:
1. 程式碼品質
2. 潛在問題
3. 安全性
4. 可維護性

[貼上你的程式碼]
```

---

### 2. [Refactoring Prompts](prompt_templates/refactoring.md)

**用途**: 使用 AI 進行程式碼重構

**包含 Prompts**:
- 基礎重構 (提升可讀性、消除重複、函式拆分)
- 設計模式應用 (Strategy Pattern, etc.)
- 效能優化重構
- 架構重構 (分層架構、模組化)
- 特定語言/框架重構 (React Hooks, Async/Await)
- 測試友善重構

**使用範例**:
```
請重構以下程式碼,提升可讀性:

重構目標:
1. 改善變數和函式命名
2. 簡化複雜的邏輯
3. 移除不必要的程式碼

[貼上程式碼]
```

---

### 3. [Test Generation Prompts](prompt_templates/test_generation.md)

**用途**: 使用 AI 生成測試程式碼

**包含 Prompts**:
- 單元測試生成
- 整合測試生成 (API 端點、資料庫操作)
- E2E 測試生成
- TDD 測試先行
- 測試資料生成 (Fixtures, Mock)
- 特定類型測試 (React Component, Hooks, Redux)
- 測試覆蓋度提升

**使用範例**:
```
請為以下函式生成完整的單元測試:

測試框架: Jest

測試需求:
1. Happy path (正常情況)
2. Edge cases (邊界條件)
3. Error handling (錯誤處理)

[貼上函式程式碼]
```

---

### 4. [Bug Fixing Prompts](prompt_templates/bug_fixing.md)

**用途**: 使用 AI 協助除錯和問題解決

**包含 Prompts**:
- 基本除錯 (找出 Bug 原因、解釋錯誤訊息)
- 特定類型 Bug (邏輯錯誤、非同步問題、記憶體洩漏、效能問題)
- 特定環境 Bug (跨瀏覽器、環境相關)
- 除錯策略 (除錯計畫、加入除錯輸出)
- 特定框架/工具 Bug (React, API, 資料庫)
- 安全性 Bug
- 測試相關問題

**使用範例**:
```
我遇到一個 Bug,請幫我分析可能的原因:

**預期行為**: [描述程式應該如何運作]
**實際行為**: [描述實際發生了什麼]
**錯誤訊息**: [貼上完整錯誤訊息]
**相關程式碼**: [貼上程式碼]
```

---

## 🎯 使用流程建議

### 新專案開發流程

```
1. 填寫需求規格書
   └─> requirement_template.md

2. 請 AI 生成計畫文件
   └─> plan_template.md

3. 請 AI 生成任務清單
   └─> task_template.md

4. 逐一執行任務
   ├─> 使用 test_generation prompts 先寫測試 (TDD)
   ├─> 實作功能
   ├─> 使用 code_review prompts 審查程式碼
   ├─> 使用 refactoring prompts 優化程式碼
   └─> 使用 test_checklist 檢查測試品質

5. 遇到問題時
   └─> 使用 bug_fixing prompts 除錯
```

---

### 維護既有專案流程

```
1. 加入新功能
   ├─> 更新 requirement.md (描述新功能)
   ├─> 更新 plan.md (如何整合到現有架構)
   └─> 生成或更新 task.md

2. 重構程式碼
   ├─> 使用 code_review prompts 找出問題
   ├─> 使用 refactoring prompts 重構
   └─> 使用測試確保行為不變

3. 修復 Bug
   ├─> 使用 bug_fixing prompts 找出原因
   ├─> 修復問題
   ├─> 使用 test_generation prompts 加入回歸測試
   └─> 使用 code_review prompts 審查修復
```

---

## 💡 最佳實踐

### 1. 文件先行

- 開始實作前,先填寫文件模板
- 清楚的文件能讓 AI 生成更準確的程式碼
- 文件也是團隊溝通的基礎

### 2. 迭代改善

- 不要期望 AI 第一次就生成完美的結果
- 審核 AI 的輸出,提供回饋
- 多輪對話逐步改善

### 3. 批判性思考

- AI 的建議不一定都正確
- 需要自己判斷是否適合專案
- 理解 AI 的建議,不要盲目複製貼上

### 4. 持續更新

- 專案進行中,文件要持續更新
- plan.md 和 task.md 應該反映最新狀態
- 發現問題時更新檢查清單

### 5. 建立習慣

- 每次寫程式碼都使用模板和 prompts
- 養成先寫測試、先做規劃的習慣
- 定期 code review 和重構

---

## 🔧 客製化

### 根據專案需求調整模板

這些模板是通用的起點,你可以根據專案特性客製化:

**專案特定的需求模板**:
```
# 在 requirement_template.md 基礎上加入:
- 專案特有的技術棧
- 團隊規範
- 特定的驗收標準
```

**專案特定的 Code Review Checklist**:
```
# 在 code_review.md 基礎上加入:
- 團隊的 coding style guide
- 專案特定的安全要求
- 特定框架的最佳實踐
```

### 建立專案範本

可以將這些模板整合成專案範本:

```bash
my-project-template/
├── docs/
│   ├── requirement.md      # 從 template 複製
│   ├── plan.md             # 從 template 複製
│   └── task.md             # 從 template 複製
├── prompts/                # 複製整個 prompt_templates 資料夾
└── README.md               # 專案說明
```

---

## 📚 延伸資源

### 相關文檔

- [00_ai_coding_basics](../00_ai_coding_basics/README.md) - AI Coding 基礎
- [01_iterative_method](../01_iterative_method/README.md) - 迭代開發方法
- [02_sdd](../02_sdd/README.md) - 軟體設計說明書
- [03_tdd](../03_tdd/README.md) - 測試驅動開發

### 實際範例

完整的範例專案請參考 `examples/` 資料夾:
- Snake Game 範例 (迭代開發示範)
- Todo App 範例 (SDD 流程示範)
- API Service 範例 (TDD 流程示範)

---

## 🤝 貢獻

如果你有更好的模板或 prompts,歡迎貢獻!

改進建議:
- 更具體的範例
- 特定領域的模板 (如 Mobile App, ML 專案)
- 更多語言/框架的 prompts
- 真實專案的 case study

---

## ❓ 常見問題

### Q: 一定要使用所有模板嗎?

A: 不一定。根據專案規模選擇:
- 小專案: 可能只需要 task.md
- 中型專案: requirement.md + task.md
- 大型專案: 全套文件 (requirement + plan + task)

### Q: 模板太複雜了,可以簡化嗎?

A: 當然可以!這些模板是「最完整版」,你可以:
- 刪除不需要的章節
- 簡化內容
- 根據團隊習慣調整

### Q: Prompts 太長了,每次都要輸入這麼多?

A: 建議:
- 將常用 prompts 存成檔案或片段 (snippets)
- 使用文字擴展工具
- 建立專案專用的 prompts 資料夾

### Q: 如何知道使用哪個 Prompt?

A: 參考每個 Prompt 檔案開頭的分類:
- code_review.md: 檢查程式碼品質時
- refactoring.md: 需要優化程式碼時
- test_generation.md: 需要寫測試時
- bug_fixing.md: 遇到問題要除錯時

---

**開始你的 Vibe Coding 之旅吧!** 🚀

從選擇一個模板開始,逐步建立你的 AI 輔助開發流程。記住,這些工具是為了讓開發更順暢,不是增加負擔。找到適合你的方式最重要!
