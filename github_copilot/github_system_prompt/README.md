# GitHub Copilot System Prompt 設定指南

本文件詳細說明如何在不同層級設定 GitHub Copilot 的自訂指令，包含使用者層級、專案層級、資料夾層級以及 AGENTS.md 的使用方式。

## 📚 目錄

- [官方文件參考](#官方文件參考)
- [使用者層級設定](#使用者層級設定)
- [專案層級設定](#專案層級設定)
- [資料夾層級設定](#資料夾層級設定)
- [AGENTS.md 使用方式](#agentsmd-使用方式)
- [實作範例](#實作範例)
- [使用流程與注意事項](#使用流程與注意事項)

## 🔗 官方文件參考

- [GitHub Copilot 官方說明](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
- [VS Code Copilot 客製化設定](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)

---

## ⚙️ 使用者層級設定

### 方法一：基本聊天預設提示 (非官方)

**設定檔位置：** `~/Library/Application Support/Code/User/settings.json`

**設定步驟：**
1. 使用 VS Code 命令面板 (`Cmd + Shift + P`)
2. 執行 `> Preferences: Open User Settings (JSON)`
3. 在 `settings.json` 中加入：

```json
{
  "github.copilot.chat.preprompt": "所有的回答都必須用繁體中文"
}
```

### 方法二：啟用指令檔案功能

**設定步驟：**
1. 使用 VS Code 命令面板 (`Cmd + Shift + P`)
2. 執行 `> Preferences: Open User Settings (JSON)`
3. 在 `settings.json` 中加入：

```json
{
  "github.copilot.chat.codeGeneration.useInstructionFiles": true
}
```

---

## 🏗️ 專案層級設定

### 檔案位置與建立方式

**檔案路徑：** `.github/copilot-instructions.md`

**建立方式：**
- **手動建立：** 直接在專案根目錄建立 `.github/copilot-instructions.md` 檔案
- **自動產生：** 在 Copilot Chat 設定中點選 ⚙️ → `產生指令`

### 範例內容

```markdown path=.github/copilot-instructions.md start=1
# GitHub Copilot 指令說明

## 回覆說明
- 使用繁體中文回覆

## 專案概述
這是一個 **職能發展學院 Python 機器學習課程** 的儲存庫，用於以繁體中文教授 Python 基礎和機器學習概念。

### 課程組織模式
- 每堂課都遵循結構化格式：`lessonN/` 目錄包含相關教材
- **中文文件**：所有課程資料都使用繁體中文

## 開發環境
### 虛擬環境
- 使用 `.venv/` 目錄（已在終端機中配置）
- 使用 `source .venv/bin/activate` 啟動（macOS/Linux）

## 編碼規範
### Python 風格
- **Snake_case** 用於函數和變數
```

---

## 📁 資料夾層級設定

### 支援機制概覽

VS Code 的 Copilot 擴充支援 **custom instructions / instructions file** 機制，允許建立多個 `.instructions.md` 檔案，並使用 `applyTo` frontmatter 指定對特定檔案或資料夾生效。

### 專案結構範例

```text
project/
├── .github/
│   ├── copilot-instructions.md         ← 全域指令（可選）
│   └── instructions/
│       └── lesson1.instructions.md    ← lesson1 專屬指令
├── lesson1/
│   └── ... 檔案 ...
├── lesson2/
│   └── ... 檔案 ...
└── 其他資料夾／檔案
```

### 設定步驟

1. 在專案根目錄建立 `.github/instructions/` 資料夾
2. 建立特定資料夾的指令檔案（如 `lesson1.instructions.md`）
3. 在指令檔案頂部使用 YAML frontmatter 指定適用範圍
4. 確保 VS Code 已啟用 instruction files 功能
5. 在對應資料夾內使用 Copilot Chat 時會自動套用指令

### 指令檔案範例

**檔案：** `.github/instructions/lesson1.instructions.md`

```yaml path=.github/instructions/lesson1.instructions.md start=1
---
applyTo: "lesson1/**/*"
---

你是這個 `lesson1` 資料夾的教學助理。當處理或回應此資料夾下的檔案時：

- 使用繁體中文回答
- 加上程式碼註解與教學說明
- 儘量詳盡、步驟清楚
```

**自動產生方式：** 在 Copilot Chat 設定中點選 ⚙️ → `指令`

---

## 🤖 AGENTS.md 使用方式

### 背景說明

GitHub Copilot 的 coding agent 現在支援 `AGENTS.md` 作為 custom instructions，用來引導 agent 的自動化行為。

### 檔案特性

- **優先級規則：** Agent 會採用「最接近目標路徑」的 `AGENTS.md` 作為指令來源
- **用途：** 告訴 agent 專案架構、工作流程、編譯/測試指令、規範/風格等
- **適用場景：** 自動執行任務、生成 Pull Request 等

### 與其他指令檔案的比較

| 檔案類型 | 適用範圍 | 主要用途 |
|---------|---------|----------|
| `.github/copilot-instructions.md` | 整個儲存庫 | Chat、代碼建議、agent 通用指令 |
| `.github/instructions/*.instructions.md` | 特定路徑 | 針對不同資料夾的 Chat/代碼建議 |
| `AGENTS.md` | Agent 專用 | 自動執行任務、生成 PR 等 |

---

## 🏗️ 實作範例

### 完整專案結構

```text
project-root/
├── .github/
│   ├── copilot-instructions.md
│   └── instructions/
│       └── lesson1.instructions.md
├── lesson1/
│   ├── AGENTS.md
│   └── (lesson1 的原始程式碼檔案)
├── lesson2/
│   └── (lesson2 的程式碼)
└── (其他檔案與資料夾)
```

### 1. 全域指令檔案

**檔案：** `.github/copilot-instructions.md`

```markdown path=.github/copilot-instructions.md start=1
這是本專案的全域 Copilot 指令文件：

- 請用繁體中文回答所有回覆
- 程式碼部分要附上清楚說明與註解
- 在提出修改時，優先考慮可讀性與一致性風格
- 編譯、測試與驗證流程如下：
  1. `npm install`
  2. `npm test`
  3. `npm run lint`
- 每次提交前要通過測試與 lint 檢查
```

### 2. 特定資料夾指令檔案

**檔案：** `.github/instructions/lesson1.instructions.md`

```yaml path=.github/instructions/lesson1.instructions.md start=1
---
applyTo: "lesson1/**/*"
---

你是 `lesson1` 專屬的教學助理 Copilot：

- 在 `lesson1` 裡回答要講解得更詳細，步驟要清楚
- 提供示範程式碼時，附上中英對照註解或小節說明
- 如果學生問到錯誤或疑問，要引導學生思考而不是直接給答案
```

### 3. Agent 專用指令檔案

**檔案：** `lesson1/AGENTS.md`

```markdown path=lesson1/AGENTS.md start=1
# AGENTS.md — lesson1 資料夾專屬 agent 指令

## 目標 (Goals)
- 以教學為導向，產出可讀性高、具註解、與學生易懂的程式碼
- 自動產生課堂範例與練習題檔案
- 在修改程式碼前先檢查現存測試是否通過
- 若有變更，撰寫對應的單元測試

## 指令 (Instructions)
1. 在做任何修改前，先運行 `npm test` 或專案對應的測試套件
2. 如果測試失敗，停下來並回報失敗的測試項目
3. 優先修改邏輯錯誤、變數命名與可讀性，再考慮性能優化
4. 變更後自動加入註解與變更說明
5. 若有檔案被新增或刪除，請在 PR 描述中說明理由
6. 每次 PR 要確保可通過測試、lint 檢查，以及代碼風格一致

## 工具與環境 (Environment)
- 使用 Node.js 版本 `>= 18`
- 使用 `npm test` 作為測試命令
- Lint 工具為 ESLint，配置檔在 `.eslintrc.js`
- 所有自動產出的檔案要放在 `lesson1/examples/` 或 `lesson1/exercises/` 子資料夾

## 優先級 (Priority)
1. 正確性與易讀性
2. 完整測試覆蓋與例外處理
3. 性能優化與重構（在不影響可讀性的前提下）
```

---

## ✅ 使用流程與注意事項

### 版本需求
- 確保 Copilot / VS Code / agent 模式版本已支援相應功能
- GitHub Changelog 已說明 agent 現在支援 AGENTS.md

### 檔案優先級
- **AGENTS.md：** Agent 會選擇最接近目標檔案位置的版本
- **路徑查找：** 若當前資料夾沒有對應檔案，會沿父目錄向上查找

### 功能適用範圍
- **AGENTS.md：** 主要用於 agent 模式，Chat 模式可能不一定納入
- **混合使用：** 各種指令檔案可以混用，彼此互補
- **回退機制：** 找不到特定指令時會使用全域檔案

### 最佳實踐
1. 先設定全域指令作為基礎
2. 針對特殊需求建立資料夾層級指令
3. 為自動化任務設定 AGENTS.md
4. 定期檢查指令效果並調整內容

