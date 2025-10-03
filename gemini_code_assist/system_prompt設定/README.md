# 🚀 Gemini Code Assist System Prompt 設定指南

> 本指南將詳細說明如何為 Gemini Code Assist 設定不同層級的系統提示，讓 AI 助手更了解您的專案需求。

---

## 📋 目錄

- [使用者層級設定](#-使用者層級設定)
- [工作區層級設定](#-工作區層級設定)
- [資料夾層級設定](#-資料夾層級設定)
- [設定層級比較](#-設定層級比較)

---

## 🔧 使用者層級設定

### 📍 設定位置

```bash
~/.gemini/settings.json
```

### 📝 設定檔案結構

```json
{
  "mcpServers": {
    "eclair": {
      "httpUrl": "http://localhost:8080/mcp",
      "timeout": 5000
    }
  },
  "selectedAuthType": "gemini-api-key",
  "coreTools": [
    "TOOL_NAME_1",
    "TOOL_NAME_2(COMMAND)"
  ],
  "excludeTools": [
    "TOOL_TO_EXCLUDE"
  ]
}
```

### 🔍 主要欄位說明

| 欄位 | 說明 |
|------|------|
| **mcpServers** | 設定與模型-視圖-控制器協定（MCP）伺服器的連線，為 Gemini 提供額外的上下文和工具 |
| **coreTools** | 指定核准的內建工具列表，供代理人使用。可為特定工具指定特定指令 |
| **excludeTools** | 防止代理人使用特定的內建工具 |

---

## 🏢 工作區層級設定

### 💡 核心概念

為 Gemini Code Assist 設定工作區層級的系統提示，**官方建議的方法**是在專案根目錄建立 `GEMINI.md` 檔案。這個檔案能為 Gemini 提供針對該特定專案的持續性上下文和指令。

> **💡 提示**：與使用者層級設定不同，`GEMINI.md` 讓您可以為每個專案量身打造 Gemini 的行為。

### 🛠️ 設定步驟

#### 步驟 1：建立檔案

在 VS Code 工作區的根目錄建立 `GEMINI.md` 檔案：

```bash
# 專案結構範例
/your-project
├── .git
├── .vscode/
├── src/
│   ├── main.js
│   └── ...
├── package.json
└── GEMINI.md   <-- 在這裡建立檔案
```

#### 步驟 2：撰寫指令內容

使用 Markdown 語法撰寫您希望 Gemini 遵守的規則、指南和上下文資訊。

### 📋 可包含的資訊類型

- **🎯 專案概觀**：簡要說明專案的目標和用途
- **⚙️ 技術棧**：列出主要的程式語言、框架和函式庫
- **📏 編碼規範**：指定程式碼風格指南
- **🏗️ 架構原則**：描述專案的架構模式
- **🚫 重要指令**：提供不應執行的操作

### 📄 GEMINI.md 檔案範例

```markdown
# 專案：電商平台前端

## 🎯 專案目標
此專案是為我們的線上商店建立一個現代化、反應快速的前端介面。

## ⚙️ 技術棧
- **語言:** TypeScript
- **框架:** React 18 (使用 Function Components 和 Hooks)
- **狀態管理:** Zustand
- **樣式:** Tailwind CSS
- **API 客戶端:** Axios

## 📏 編碼規範與規則
- 所有元件都必須是函式元件 (Function Components)
- 狀態管理應優先使用 Zustand，避免使用 Redux
- 變數命名請使用駝峰式 (camelCase)
- 函式應包含 JSDoc 格式的註解，說明其用途、參數和回傳值

### 🚫 禁止事項
- 不要使用 Class Components
- 不要使用 CSS-in-JS 函式庫，如 styled-components
- 絕對不要在此專案中使用 jQuery
- 避免使用 `export default`，應優先使用具名匯出 `export`

## 🔗 API 互動
與後端 API 的所有互動都必須透過 `src/lib/apiClient.js` 中定義的 `apiClient` 實例進行。
```

#### 步驟 3：儲存並使用

儲存 `GEMINI.md` 檔案後，Gemini Code Assist 會自動偵測並在下次互動時套用這些指令。

---

## 📁 資料夾層級設定

### 🎯 適用情境

您可以為專案中的特定資料夾（例如 `lesson1`）建立專屬的系統提示。方法很簡單：**在該資料夾內也建立一個 `GEMINI.md` 檔案**。

### 🛠️ 設定步驟

假設您的專案結構如下：

```
/your-project
├── .git
├── src/
├── lesson1/
│   └── exercise1.py
└── lesson2/
    └── task2.js
```

#### 1. 建立資料夾專用檔案

在 `lesson1` 資料夾內建立 `GEMINI.md`：

```
/your-project
├── .git
├── src/
├── lesson1/
│   ├── exercise1.py
│   └── GEMINI.md   <-- 在這裡建立 lesson1 專用的提示檔案
└── lesson2/
    └── task2.js
```

#### 2. 撰寫專屬指令

**範例 `lesson1/GEMINI.md` 內容：**

```markdown
# 課程 1：Python 基礎入門

## 📚 指導原則
- 這裡的所有程式碼都是為了初學者設計的
- 產生的 Python 程式碼必須非常簡單，避免使用高階語法（例如：列表推導式、裝飾器）
- 每一行程式碼都必須附上詳細的中文註解，解釋其功能
- 變數命名應使用清楚易懂的完整英文單字，例如 `user_name` 而非 `un`

## 🚫 禁止事項
- 不要引入任何第三方函式庫
- 不要撰寫超過 10 行的函式
```

### 🔄 階層化指令運作方式

當您在某個檔案中與 Gemini 互動時，它會：

1. **🔍 尋找當前資料夾**：首先在當前資料夾內尋找 `GEMINI.md`
2. **⬆️ 向上層尋找**：繼續往上層資料夾尋找，直到找到家目錄為止
3. **🔗 整合所有指令**：整合所有找到的 `GEMINI.md` 檔案內容作為上下文

### ⚖️ 指令優先級

如果不同層級的 `GEMINI.md` 檔案中有互相衝突的指令，**最接近您正在編輯的檔案的 `GEMINI.md`（最內層的）具有最高的優先級**。

#### 📝 實際範例

- **專案根目錄** `/your-project/GEMINI.md`：「所有 Python 程式碼都應遵循 PEP 8 規範。」
- **資料夾層級** `lesson1/GEMINI.md`：「每一行程式碼都必須附上中文註解。」

**結果：**
- 編輯 `lesson1/exercise1.py` 時：Gemini 會**同時**要求遵循 PEP 8 **並且**每一行都要有中文註解
- 編輯 `lesson2/task2.js` 時：由於 `lesson2` 內沒有 `GEMINI.md`，只會套用專案根目錄的通用規則

---

## 📊 設定層級比較

| 設定類型 | 設定方式 | 影響範圍 | 主要用途 |
|:---------|:---------|:---------|:---------|
| **🔧 使用者層級** | 編輯 `~/.gemini/settings.json` | **所有專案** | 設定全域性工具、MCP 伺服器連線等 |
| **🏢 工作區層級** | 在專案根目錄建立 `GEMINI.md` | **僅限當前工作區** | 提供專案特定的上下文、編碼規範和技術棧資訊 |
| **📁 資料夾層級** | 在特定資料夾建立 `GEMINI.md` | **僅限該資料夾** | 為特定模組或功能區塊設定精細的指令 |

---

## 🎉 總結

透過在您的專案中加入 `GEMINI.md` 檔案，您可以有效地為 Gemini Code Assist 建立一個強大的、專案專屬的「系統提示」，大幅提升其生成內容的相關性和準確性。

這種階層化的設定方式讓您可以為大型專案中的不同模組、課程或功能區塊設定非常精細且獨立的指令，讓 Gemini 的輔助更貼近您在不同情境下的實際需求。
