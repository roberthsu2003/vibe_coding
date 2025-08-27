# MCP_PROMPTS_INSTRUCTIONs

## MCP

### 安裝方式(For User)

- 使用vscode->Extension->MCP Server

- 連線至Visual Studio Code網頁頁面,選擇MCP Server

- 使用`Playwrigth`,按下`install Playwright`

- 自動安裝至vscode的playwright內,資料是儲存在個人目錄內的設定檔

### 安裝方式(for WorkSpace(專案))

- 建立`.vscode/mcp.json`

```json
{
  "servers": {
    "vscode_postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:raspberry@host.docker.internal:5432/postgres"
      ]
    },
    "render_postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://chillee_sunday_user:KRsZo4u7MMXmHLhPo36FN4PeRZBkkQt4@dpg-d2bvmo7diees73f5fn8g-a.singapore-postgres.render.com/chillee_sunday?sslmode=require"
      ]
    },
    "playwright": {
			"command": "npx",
			"args": [
				"@playwright/mcp@latest"
			]
		}
  },
}
```



## INSTRUCTION(命令,system prompt)
在儲存庫中建立一個文件，為 Copilot 在該儲存庫中所做的工作提供額外的上下文。

### 關於 Copilot 的儲存庫自訂instruction

** Creating a repository custom instructions file**

VS Code 支援以下任一操作：

- 儲存庫中儲存單一 .github/copilot-instructions.md 自訂指令文件

- 專案中 .github/instructions 目錄下存放著一個或多個 .instructions.md 檔案。每個檔案都可以指定 applyTo 前置內容來定義其指令適用的檔案或目錄。

** 使用單一 `.github/copilot-instructions.md` 檔案**

1.  在程式碼庫的根目錄中，建立一個名為 .github/copilot-instructions.md 的檔案。

2. 以 Markdown 格式為檔案新增自然語言指令。

指令之間的空格會被忽略，因此指令可以寫成一個段落，每個指令另起一行，或用空白行分隔，以提高可讀性。

** 使用一個或多個 .instructions.md 文件

1. 建立.github/instructions目錄
2. 建立一個或多個 .instructions.md 文件，並在文件中加入自然語言說明。
3. 使用 glob 語法將 applyTo 前置內容新增至 Markdown 文件，指定指令適用的文件或目錄。

```markdown
---
applyTo: "app/models/**/*.rb"
---

Add custom instructions here
```

**編寫有效的儲存庫自訂指令**

您添加到自訂指令文件中的指令應簡短、獨立，為 Copilot 提供相關信息，以幫助其在此存儲庫中工作。由於這些指令會隨每個聊天訊息一起發送，因此它們應該廣泛適用於您在儲存庫環境中發出的大多數請求。

指令檔的具體結構會因專案和需求而異，但以下準則提供了一個很好的起點：

概述您正在進行的項目，包括其目的、目標和任何相關的背景資訊。
包含儲存庫的資料夾結構，包括與專案相關的任何重要目錄或檔案。
指定應遵循的編碼標準和約定，例如命名約定、格式規則和最佳實務。
包含專案中使用的任何特定工具、程式庫或框架，以及任何相關的版本號或配置。

```
# 專案概述

本專案是一個 Web 應用程序，可讓使用者管理他們的任務和待辦事項清單。它使用 React 和 Node.js 構建，並使用 MongoDB 進行資料儲存。

## 資料夾結構

- `/src`：包含前端原始碼。
- `/server`：包含 Node.js 後端原始碼。
- `/docs`：包含專案文檔，包括 API 規格和使用者指南。

## 函式庫和框架

- 前端使用 React 和 Tailwind CSS。
- 後端使用 Node.js 和 Express。
- MongoDB 進行資料儲存。

## 編碼規範

- 每個語句結尾都使用分號。
- 字串使用單引號。
- 在 React 中使用基於函數的元件。
- 使用箭頭函數進行回呼。

## UI 指南

- 提供切換開關，可在亮模式和暗模式之間切換。
- 應用程式應具有現代、簡潔的設計。
```






