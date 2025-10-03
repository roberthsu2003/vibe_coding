# Gemini Code Assist的System prompt的設定

## Gemini Code Assist 使用者層級設定

**位置**

```
~/.gemini/settings.json
```

以下是 ~/.gemini/settings.json 檔案的結構範例：

```
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

**主要欄位說明：**

- mcpServers: 此物件用於設定與模型-視圖-控制器協定（MCP）伺服器的連線，這些伺服器可以為 Gemini 提供額外的上下文和工具。

- coreTools: 您可以指定一個核准的內建工具列表，供代理人使用。您也可以為特定工具指定特定指令。

- excludeTools: 這允許您防止代理人使用特定的內建工具。

-----

## 在 VS Code 中為 Gemini Code Assist 設定工作區層級的系統提示

為 Gemini Code Assist 設定工作區（Workspace）或專案層級的系統提示，主要且官方建議的方法是在您專案的根目錄中建立一個名為 `GEMINI.md` 的檔案。這個檔案能為 Gemini 提供針對該特定專案的持續性上下文和指令。

與使用者層級的設定（影響您所有的專案）不同，`GEMINI.md` 檔案讓您可以為每個專案量身打造 Gemini 的行為，確保它遵循特定的編碼規範、了解專案的架構，並使用正確的函式庫。

-----

### 如何透過 `GEMINI.md` 檔案進行設定

#### 步驟 1：建立檔案

在您 VS Code 工作區的根目錄（通常是 `.git` 資料夾所在的頂層目錄）下，建立一個新檔案，並將其命名為 `GEMINI.md`。

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

#### 步驟 2：在檔案中加入指令

使用 Markdown 語法在 `GEMINI.md` 檔案中撰寫您希望 Gemini 遵守的規則、指南和上下文資訊。Gemini Code Assist 在處理您於該工作區內的請求時，會將此檔案的內容納入考量。

**您可以包含以下類型的資訊：**

  * **專案概觀：** 簡要說明專案的目標和用途。
  * **技術棧：** 列出主要的程式語言、框架和函式庫（例如：React 18, Node.js 20, Express, Tailwind CSS）。
  * **編碼規範：** 指定程式碼風格指南（例如：使用駝峰式命名法、函式註解必須使用 JSDoc 格式、避免使用預設匯出 `export default`）。
  * **架構原則：** 描述專案的架構模式（例如：採用模組化架構，所有 API 路由都必須在 `src/api` 目錄下定義）。
  * **重要指令：** 提供不應執行的操作（例如：不要使用 `var` 宣告變數，應使用 `let` 或 `const`；不要在此專案中引入 jQuery 函式庫）。

#### `GEMINI.md` 檔案內容範例

這是一個用於 React 和 Node.js 專案的 `GEMINI.md` 檔案範例：

```markdown
# 專案：電商平台前端

## 專案目標
此專案是為我們的線上商店建立一個現代化、反應快速的前端介面。

## 技術棧
- **語言:** TypeScript
- **框架:** React 18 (使用 Function Components 和 Hooks)
- **狀態管理:** Zustand
- **樣式:** Tailwind CSS
- **API 客戶端:** Axios

## 編碼規範與規則
- 所有元件都必須是函式元件 (Function Components)。
- 狀態管理應優先使用 Zustand，避免使用 Redux。
- 變數命名請使用駝峰式 (camelCase)。
- 函式應包含 JSDoc 格式的註解，說明其用途、參數和回傳值。
- **禁止事項：**
  - 不要使用 Class Components。
  - 不要使用 CSS-in-JS 函式庫，如 styled-components。
  - 絕對不要在此專案中使用 jQuery。
  - 避免使用 `export default`，應優先使用具名匯出 `export`。

## API 互動
與後端 API 的所有互動都必須透過 `src/lib/apiClient.js` 中定義的 `apiClient` 實例進行。
```

#### 步驟 3：儲存並使用

儲存 `GEMINI.md` 檔案。您不需要重新啟動 VS Code。Gemini Code Assist 會自動偵測到這個檔案，並在您下一次於此工作區中與它互動（例如：提問、要求產生程式碼）時，將這些指令作為其行為的依據。

### 工作區層級 vs. 使用者層級設定

為了讓您更清楚，以下是兩種設定層級的比較：

| 設定類型 | 設定方式 | 範圍 | 用途 |
| :--- | :--- | :--- | :--- |
| **工作區層級** | 在專案根目錄建立 `GEMINI.md` | **僅限當前工作區** | 提供專案特定的上下文、編碼規範和技術棧資訊。 |
| **使用者層級** | 編輯 `~/.gemini/settings.json` | **所有專案** | 設定全域性的工具（例如 `grep`）、MCP 伺服器連線等。 |

透過在您的專案中加入 `GEMINI.md` 檔案，您可以有效地為 Gemini Code Assist 建立一個強大的、專案專屬的「系統提示」，大幅提升其生成內容的相關性和準確性。


### 資料夾層級的System prompt

您可以為專案中的特定資料夾（例如 `lesson1`）建立專屬的系統提示。方法與設定整個工作區的提示相同，就是**在該資料夾內也建立一個 `GEMINI.md` 檔案**。

Gemini Code Assist 的設計非常靈活，它會以階層化的方式來讀取和整合指令。

### 設定步驟

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

您想要為 `lesson1` 資料夾設定專屬的系統提示，您可以這樣做：

1.  **在 `lesson1` 資料夾內建立一個 `GEMINI.md` 檔案**：

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

2.  **在 `lesson1/GEMINI.md` 中撰寫專屬指令**：

    在這個檔案中，您可以放入只適用於 `lesson1` 的規則。

    **範例 `lesson1/GEMINI.md` 內容：**

    ```markdown
    # 課程 1：Python 基礎入門

    ## 指導原則
    - 這裡的所有程式碼都是為了初學者設計的。
    - 產生的 Python 程式碼必須非常簡單，避免使用高階語法（例如：列表推導式、裝飾器）。
    - 每一行程式碼都必須附上詳細的中文註解，解釋其功能。
    - 變數命名應使用清楚易懂的完整英文單字，例如 `user_name` 而非 `un`。

    ## 禁止事項
    - 不要引入任何第三方函式庫。
    - 不要撰寫超過 10 行的函式。
    ```

### 階層化指令的運作方式

Gemini 的運作方式是，當您在某個檔案（例如 `lesson1/exercise1.py`）中與它互動時，它會：

1.  **尋找當前資料夾**：首先在 `lesson1` 資料夾內尋找 `GEMINI.md`。
2.  **向上層尋找**：接著會繼續往上層資料夾（例如專案根目錄 `/your-project`）尋找，直到找到您的家目錄（home directory）為止。
3.  **整合所有指令**：它會**整合所有找到的 `GEMINI.md` 檔案**中的內容作為上下文。

#### 指令的優先級

如果不同層級的 `GEMINI.md` 檔案中有互相衝突的指令，**最接近您正在編輯的檔案的 `GEMINI.md`（也就是最內層的）具有最高的優先級**。

**舉個例子：**

  * 您在專案根目錄 `/your-project` 有一個 `GEMINI.md`，內容是：「所有 Python 程式碼都應遵循 PEP 8 規範。」
  * 您在 `lesson1` 資料夾內有另一個 `GEMINI.md`，內容是：「每一行程式碼都必須附上中文註解。」

**結果會是：**

  * 當您編輯 `lesson1/exercise1.py` 時，Gemini 會**同時**要求程式碼遵循 PEP 8 **並且**每一行都要有中文註解。
  * 當您編輯 `lesson2/task2.js` 時，由於 `lesson2` 內沒有 `GEMINI.md`，Gemini 只會讀取專案根目錄的 `GEMINI.md`，並套用其通用規則。

透過這種方式，您可以為大型專案中的不同模組、課程或功能區塊設定非常精細且獨立的指令，讓 Gemini 的輔助更貼近您在不同情境下的實際需求。
