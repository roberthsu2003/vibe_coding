# **Gemini CLI 從零到一：教師版實作講義（含學生練習）**

> 目標：帶學生從安裝、登入、基本操作、工具使用、檔案改寫、對話狀態管理、到自訂命令與 MCP 伺服器入門，最後完成一個可評量的迷你專案。

---

## **一、課前準備（老師&學生）**

- 作業系統：macOS / Linux / Windows 皆可。
- Node.js：**v20 以上**（課前請先安裝）。
- （建議）Git 已安裝。
- 終端機使用基本能力。
- 帳號／金鑰（擇一即可）
    - OAuth 登入（個人 Google 帳號或學校的 Code Assist 授權）。
    - 或 AI Studio 的 **GEMINI_API_KEY**。
    - 或 Vertex AI（企業／學校 GCP 環境）。

> 小提醒：教室環境常見限制為 Proxy、防火牆、安裝權限，請先與資訊組確認可安裝 npm 套件並能開啟瀏覽器完成 OAuth。

---

## **二、安裝與啟動（3 選 1）**

### **1) 免安裝（建議第一次教學用）**

```other
npx https://github.com/google-gemini/gemini-cli
```

### **2) 全域安裝（npm）**

```other
npm install -g @google/gemini-cli
```

### **3) macOS/Linux（Homebrew）**

```other
brew install gemini-cli
```

### **啟動方式**

```other
# 在目前資料夾啟動互動模式
gemini

# 指定分析多個資料夾（逗號分隔）
gemini --include-directories src,docs

# 指定模型
gemini -m gemini-2.5-flash

# 非互動（單次任務），適合腳本/CI
gemini -p "用三點說明這個專案的架構" --include-directories src
```

---

## **三、認證方式（擇一）**

### **A. OAuth（最簡單）**

```other
gemini   # 啟動後依畫面指示，用瀏覽器登入
```

> 若使用學校/企業 Code Assist 授權，建議先設定專案：

```other
export GOOGLE_CLOUD_PROJECT="你的GCP專案ID"
gemini
```

### **B. AI Studio API Key**

```other
export GEMINI_API_KEY="你的金鑰"  # Windows PowerShell：setx GEMINI_API_KEY "your_key"
gemini
```

### **C. Vertex AI（進階/企業）**

```other
# 方式1：使用 API Key（依單位政策）
export GOOGLE_API_KEY="你的金鑰"
export GOOGLE_GENAI_USE_VERTEXAI=true
gemini

# 方式2：使用 ADC（已安裝 gcloud）
gcloud auth application-default login
export GOOGLE_CLOUD_PROJECT="你的GCP專案ID"
export GOOGLE_GENAI_USE_VERTEXAI=true
gemini
```

---

## **四、第一次上手（Hello, CLI!）**

1. 在一個小專案資料夾執行：

```other
gemini
```

1. 輸入第一句提示：

>> 「幫我用條列三點摘要這個資料夾的程式架構，並列出每個檔案的作用。」

1. 看見輸出後試試：
    - /help：看看有哪些指令。
    - /tools：列出目前可用工具（讀檔、寫檔、Web 取用、Shell…）。
    - 按 y 允許 CLI 讀檔或寫檔（有互動安全提示）。

---

## **五、內建工具（核心練習）**

### **1) 檔案讀寫**

[使用專案範例7資料夾](../vibe_coding範例樣版)

- 目標：讓模型讀 README.md 並自動生成 CONTRIBUTING.md。
- 步驟：
    1. 在 CLI 中輸入：

>>> 「請閱讀當前資料夾的 README.md，幫我建立一份 CONTRIBUTING.md，內容包含：分支策略、Commit 規範、PR 範本。」

    1. 看到工具呼叫提案後，**確認允許** read_file / write_file。
    2. 完成後，cat CONTRIBUTING.md 檢查內容。

### **2) 多檔改寫（multi-file operations）**

- 目標：請模型重構 src/ 下兩個檔案、修正 ESLint 問題並更新註解。
- 提示範例：

    >> 「閱讀 src/utils.js 與 src/main.js，重構使其更模組化並修正 eslint 錯誤，最後回報修改重點與風險。」

### **3) Web 取用與查證（可選）**

- 目標：讓模型用內建的 Web tools 搜集資訊並引用。
- 提示範例：

    >> 「查詢 *fetch API 錯誤處理* 的最佳實務，整理為三點並附來源連結，最後把重點寫入 docs/fetch-best-practice.md。」

---

## **六、對話狀態與檔案版本保護**

### **1) 會話檢查點（Checkpointing）**

```other
gemini --checkpointing   # 或在設定中開啟
```

- /restore：列出可還原的檢查點，或 /restore <tool_call_id> 還原到特定修改前。

### **2) 對話儲存與分支**

```other
/chat save v1-summary
/chat list
/chat resume v1-summary
```

---

## **七、GEMINI.md 與記憶（Memory）**

1. 在專案根目錄建立 .gemini/GEMINI.md（可被遞迴載入）。
2. 範例內容：

```other
# 專案背景
這是一個給學生的教學專案，請回覆時：
- 優先提供中文答案與程式碼註解。
- 每次改檔都列出「變更摘要」。
- 若不確定需求，先提三個澄清問題。
```

1. CLI 指令：

```other
/memory show     # 查看目前載入的記憶內容
/memory refresh  # 重新載入 GEMINI.md
```

---

## **八、自訂命令（Custom Commands）**

> 優點：把常用提示做成捷徑，跨專案或專案內共享。

### **1) 全域命令（使用者目錄）**

```other
mkdir -p ~/.gemini/commands/refactor
nano ~/.gemini/commands/refactor/pure.toml
```

貼上：

```other
# 檔名：~/.gemini/commands/refactor/pure.toml
# 用法：/refactor:pure

description = "將目前情境中的程式碼重構為純函式，並提供測試範例"

prompt = """
請分析我提供的程式碼，將其重構為**純函式**：
1. 移除外部可變狀態依賴（若有）。
2. 提供純輸入輸出介面。
3. 產生對應的單元測試（以 pytest 或 jest 為例）。
4. 使用 write_file 工具直接修改對應檔案，並在回覆中列出變更摘要。
"""
```

在 CLI 內輸入：

```other
/refactor:pure
```

### **2) 專案命令（可版控）**

```other
<project>/.gemini/commands/changelog.toml
```

範例：

```other
description = "將輸入版本與訊息，更新到 CHANGELOG.md（Keep a Changelog 格式）"

prompt = """
# 任務：更新 Changelog
請解析使用者輸入的 `/changelog <version> <type> <message>`，
並用 write_file 工具更新或建立 CHANGELOG.md。
- <type> 僅能為 added/changed/fixed/removed。
- 若無該版本節，請自動建立。
"""
```

用法：

```other
/changelog 1.2.0 added "新增 CLI 自訂命令示例"
```

---

## **九、MCP 伺服器（入門）**

> 讓 CLI 連到外部工具（如 GitHub、資料庫、雲端）。

1. 編輯（或建立）個人設定 ~/.gemini/settings.json：

```other
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "<你的GH Token>"
      }
    }
  }
}
```

1. 在 CLI 執行：

```other
/mcp           # 檢視已連線的 MCP 伺服器與可用工具
@mcp:github ...  # 依工具說明呼叫（或使用 @github 別名，視伺服器提供）
```

---

## **十、常用 Slash 指令速查**

- /help、/about、/stats、/privacy
- /tools（加 desc 顯示說明）
- /mcp（加 schema 看工具參數）
- /memory show、/memory refresh
- /chat save|list|resume|delete
- /restore（需要開啟 checkpointing）
- /settings、/theme、/vim、/clear

---

## **十一、課堂實作流程（90–120 分鐘）**

1. **10 分**：介紹 CLI 能做什麼（多檔改寫、查資訊、生成檔案）。
2. **15 分**：安裝與登入（示範三種認證，學生擇一）。
3. **25 分**：內建工具實作（讀 README.md → 產出 CONTRIBUTING.md）。
4. **20 分**：多檔重構與 /restore 還原。
5. **15 分**：建立 GEMINI.md + /memory show/refresh。
6. **15 分**：自訂命令 /changelog 或 /refactor:pure。
7. **（選修）20 分**：MCP GitHub 伺服器串接與簡單查詢。

---

## **十二、作業與評量（可收檔驗證）**

### **作業 1：安裝與環境驗證**

- 提交 .gemini/settings.json（可空白），與終端機截圖（/tools 輸出）。

### **作業 2：專案摘要與文件**

- 產出 SUMMARY.md（專案摘要）與 CONTRIBUTING.md，需含來源檔案列表與規範。

### **作業 3：自訂命令**

- 在 ~/.gemini/commands/ 或 <project>/.gemini/commands/ 新增 1 個指令（TOML），並示範執行結果。

### **作業 4（選修）：MCP 串接**

- 連上 1 個 MCP 伺服器（例如 GitHub），並完成一次工具呼叫。

**評分建議（20 分）：** 安裝與登入（4）／工具使用（6）／檔案品質（6）／自訂命令（4）。

---

## **十三、常見問題排除（FAQ）**

- **Node 版本過舊**：請升級至 v20+（node -v）。
- **權限不足（npm -g）**：macOS 可用 Homebrew 安裝；或在專案使用 npx。
- **無法開啟瀏覽器登入**：請改用 API Key 模式（GEMINI_API_KEY）。
- **Windows 環境變數**：PowerShell 請用 setx，重開終端機生效。
- **代理/離線**：改用非互動模式 -p 搭配既有檔案；或請網管開放必要網域。
- **不小心覆蓋檔案**：若已開啟 checkpointing，使用 /restore 還原；或用 Git 版本控制。

---

## **十四、附錄：模型與模式建議**

- 入門互動：gemini-2.5-flash（回覆快、費率友善）。
- 深度改寫/長上下文：gemini-2.5-pro（長上下文、分析能力強）。
- 指令列腳本：偏好 **非互動** -p 與 --include-directories 組合。

---

> 備註：各平台配額、模型與功能以官方公告為準。若教室環境有限制，建議先做「免安裝 npx」與「API Key」備案流程。



太好了！你是老師、要帶學生熟悉 **Gemini CLI**。我已經把一份可直接上課用的「**從零到一實作講義（含學生練習與評量）**」放到右側的 canvas，內容涵蓋：

- 課前需求與安裝（含 npx / npm / Homebrew 三種做法）
- 三種認證方式（OAuth、AI Studio API Key、Vertex AI）
- Hello CLI → 內建工具操作（讀/寫檔、多檔改寫、Web 取用）
- Checkpoint//restore、GEMINI.md 與 /memory
- 自訂 Slash 指令（TOML 範例）與 MCP 伺服器入門
- 90–120 分鐘課堂流程、作業與評量標準、常見問題排除

    （教室有安裝/網路限制時怎麼備援，也寫好了）

如果你想「一步一步照官方原始範例跑完」，以下是**最可靠的原始來源**（已幫你比對最新）：

- [官方 GitHub（安裝指令、Node 版本需求、功能總覽）](https://github.com/google-gemini/gemini-cli)
- [官方文件首頁與 Quickstart、Authentication、設定與快捷鍵](https://google-gemini.github.io/gemini-cli/)
- [Slash 指令（/help、/tools、/mcp…）完整參考](https://google-gemini.github.io/gemini-cli/docs/cli/commands.html)
- [官方 Codelab「Hands-on with Gemini CLI」（逐步練習版](https://codelabs.developers.google.com/gemini-cli-hands-on)
- [若走 Vertex AI（學校/企業環境）：快速起步與程式碼樣例](https://cloud.google.com/vertex-ai/generative-ai/docs/start/quickstart)

### **帶課超短流程（建議）**

1. [用 **npx** 直接啟動，選 **OAuth** 登入。參考 GitHub README 的安裝章節。](https://github.com/google-gemini/gemini-cli)
2. [跟著 **Codelab** 做 Hello CLI → 讀/寫檔 → 多檔改寫。](https://codelabs.developers.google.com/gemini-cli-hands-on)
3. [示範 /tools、/restore、/memory show 與建立 GEMINI.md。](https://google-gemini.github.io/gemini-cli/docs/cli/commands.html)
4. [做一個**自訂指令**（TOML）當作小作業](https://google-gemini.github.io/gemini-cli/docs/cli/commands.html)
