# GitHub Copilot 提示建構指南

## 目錄 (Table of Contents)

1. [概述](#概述)
2. [Prompt Engineering 提示工程](#prompt-engineering-提示工程)
3. [提示建構核心元素](#提示建構核心元素)
   - [@ 聊天參與者 (Chat Participants)](#聊天參與者-chat-participants)
   - [/ 斜線命令 (Slash Commands)](#斜線命令-slash-commands)
   - [# 聊天變數 (Chat Variables)](#聊天變數-chat-variables)
4. [工作區域設定](#工作區域設定)
5. [自訂指令與提示檔案](#自訂指令與提示檔案)
6. [專案內建資料夾結構](#專案內建資料夾結構)
7. [常用命令](#常用命令)
8. [實用範例](#實用範例)

---

## 概述

GitHub Copilot 提示建構包含三大核心元素：
- **斜線命令** - 快速執行常見操作
- **聊天參與者** - 不同領域的專家助手
- **變數 (context, mcp)** - 提供上下文資訊

## Prompt Engineering 提示工程

**什麼是 Prompt Engineering？**
- 設計與優化輸入給 AI 模型的文字提示
- 獲得更準確、相關或可控的輸出結果的技術
- 提升 GitHub Copilot 準確度的關鍵技巧

**提示建構的重要性：**
- 幫助 GitHub Copilot 更好理解需求
- 避免口語表達習慣造成誤解（贅詞、禮貌用詞、斷句）
- 簡化並明確表達需求

---

## 提示建構核心元素

### @ 聊天參與者 (Chat Participants)

- **功能**：不同領域的專家，具備特定專長，可協助你完成任務
- **智能推斷**：Copilot Chat 能根據您的自然語言提示自動推斷出相關的聊天參與者
- **擴展性**：可以由擴充功能提供更多專業參與者
- **優勢**：幫助你發現進階功能，而無需明確指定參與者

### / 斜線命令 (Slash Commands)

- **目的**：精簡方式表達意圖
- **效率**：避免撰寫複雜提示，快速完成常見操作
- **便利性**：標準化的命令格式，提高互動效率

### # 聊天變數 (Chat Variables)

- **功能**：在提示中加入特定的上下文資訊
- **靈活性**：動態引用檔案、選取內容或環境資訊
- **精確性**：提供更準確的上下文，提升回應品質

**使用場景：**
您可以向 Copilot Chat 諮詢專案相關的特定問題或常規軟體問題。您也可以使用 Copilot Chat 編寫程式碼、修復錯誤、編寫測試和說明文件。

範例提示會使用：
- `聊天參與者（以 @ 開頭）`
- `斜線命令（以 / 開頭）`
- `聊天變數（以 # 開頭）`

---

## 工作區域設定

### 設定工作區域的 2 種方式：

1. **預設方式**：以 VSCode 開啟的資料夾為工作區

2. **自訂工作區**：建立 `.github/BASE.md` 檔案
   ```markdown
   # 預設工作區說明

   本資料夾（lesson17）已設為預設工作區。所有自動化、查詢、程式操作皆以此資料夾為主。
   ```
   
   > [!TIP]
   > 必需把這檔案拉至 chat view 內成為附加檔案

---

## 自訂指令與提示檔案

### Generate Instructions
> 可以使用 GitHub Copilot 右上角的設定聊天中「產生指示」自動產生

**情境 - 自訂指令 (Custom Instructions) 與提示檔案 (Prompt Files)**
- 為了避免每次對話都重複輸入這些資訊，你可以將上下文內容儲存在檔案中，並在每次對話時自動加入

### .github/copilot-instructions.md
- **格式**：使用 Markdown 格式撰寫程式碼產生的指令說明
- **集中管理**：所有指令集中儲存在單一檔案中，並存放於工作區 (workspace) 內
- **自動包含**：這些指令會自動包含在每一次的聊天請求中
- **應用範圍**：可用來定義整體的程式撰寫規範、偏好的技術選型與通用的專案需求，這些會套用在所有程式碼產生的任務中

---

## 專案內建資料夾結構

### 專案內自訂 Copilot 專用的內建資料夾
> 可以使用 GitHub Copilot 右上角的設定聊天中自動產生

| 類型 | 路徑 | 說明 |
|------|------|------|
| 提示檔案 | `.github/prompts/xxxxx.md.prompt` | 自訂提示模板 |
| 指示 | `.github/instructions/xx.instructions.md` | 專案指令說明 |
| 工具集 | 建立在 user 內 | 自訂工具 |
| 模式 | `.github/chatmodes/xxx.chatmode.md` | 自訂聊天模式 |
| MCP | `.vscode/mcp.json` | Model Context Protocol 設定 |

---

## 常用命令

### /new - 建立新專案
- `/new react app with typescript`
- `/new python django web application`
- `/new node.js express server`

### /clear - 清除聊天記錄
清除當前 chat 的對話記錄

---

## 實用範例

### 詢問一般軟體問題

您可以向 Copilot Chat 詢問一些常見的問題，例如：

- Node.js 常用的 Web Server Framework 有以下幾種
- 我如何建立 Express 應用程式
- `@terminal` 如何更新 npm 套件

### 使用聊天參與者範例
- `@workspace` 分析整個專案結構
- `@vscode` VSCode 相關問題
- `@terminal` 終端機命令協助

### 使用聊天變數範例
- `#file` 引用特定檔案
- `#selection` 引用選取的程式碼
- `#editor` 引用當前編輯器內容

---

*最後更新：2024年*