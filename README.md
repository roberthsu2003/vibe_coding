# vibe_coding(氛圍編程)-AI輔助程式設計完整指南
「Vibe coding」是一種新興的程式設計方式，特別指利用大型語言模型（LLM）等人機互動介面，透過自然語言描述需求來生成程式碼的過程。此方式允許非專業程式設計者（或對程式碼了解有限的使用者）快速生成軟體，而無需深入理解底層程式碼邏輯。這種方法強調直覺與功能性，接受程式碼可能存在錯誤或瑕疵。

## Vibe Coding 的主要特徵：
- **自然語言輸入**：使用者以日常語言描述需求，例如「設計一個根據冰箱食材推薦午餐的應用程式」，AI 隨即生成相應程式碼。
- **有限的程式理解**：使用者可能不完全理解程式碼的運作原理，僅關注程式功能是否符合預期「氛圍」（vibe）。
- **應用場景**：適用於個人化或小規模的「即用即棄」專案，例如自製工具（如名為 LunchBox Buddy 的應用程式）。由於可能存在未察覺的錯誤，此方式不適合需要高可靠性或安全性的專業應用。
- **起源**：此術語由電腦科學家 Andrej Karpathy 於 2025 年 2 月提出，並於 2025 年 3 月被 Merriam-Webster 收錄為俚語。

## AI時代成為「開發者的黃金時刻!」 [GitHub CEO給你最真實的建議](./vibe_coding時代_github_ceo_建議)

> [!IMPORTANT]
> 建議講解給學員了解,讓學員知道為什麼是`開發者的黃金時刻!`

## [AI輔助程式設計的優點](./AI輔助程式設計的優點)


## VibeCoding的原理是什麼?[影片介紹](https://youtu.be/ZXzYZ2fk-vk?si=pqpf7jbQPACJmrN6)

## [3種類型的AI助手](./3種類型的AI助手)

## vibe_coding常用工具

| 類型 | 工具名稱 | 備註 |
| :--- | :--- | :--- |
| **視窗介面** | [Cursor](./cursor/README.md) | 整合 AI 功能的 VSCode 分支 |
| | [Kiro](./kiro/README.md) | 開源的 AI 程式碼編輯器 |
| | [Zed](./zed/README.md) | 高效能的程式碼編輯器 |
| | GitHub Copilot | VSCode 擴充套件 |
| | cline | (TBD) |
| | roo_code | (TBD) |
| | winsuff | (TBD) |
| **CLI** | [Gemini CLI](./gemini_cli/gemini_簡介_安裝.md) | Google 的命令列 AI 工具 |
| | [Claude Code CLI](./claude_code_cli/README.md) | Anthropic 的命令列 AI 工具 |
| | [RovoDev](./revo_dev/README.md) | |
| | OpenAI Codex | |
| **網頁介面** | Google Jules | |
| | Firebase Studio | |
| | GitHub Spark | |
| | Google Stitch | |

## GitHub Copilot工具的說明

**請先安裝vscode的CitHub Copilot extensions**


### [GitHub Copilot 的System Prompt設定](./github_copilot/github_system_prompt)

### [GitHub Copilot 的  MCP設定](./github_copilot/github_mcp_setting)


### 僅功能說明(無實作)

- [GitHub Copilot的chat view提示建構教學](./github_copilot/github_copilot_提示建構)

- [GitHub Copilot的MCP,Prompts,instruction設定](./github_copilot/mcp_prompts_instruction)


### 功能說明(有實作)

- github的-程式碼自動完成和下一個編輯建議

	- [官網說明](https://code.visualstudio.com/docs/copilot/ai-powered-suggestions#_next-edit-suggestions)

	- [功能說明](./github_copilot/程式碼自動完成和下一個編輯建議/README.md)

- [GitHub Copilot的程式碼審核和重構](./github_copilot/GitHub_Code_Review)

- [GitHub Copilot的ASK,EDIT,AGENT和自訂模式](./github_copilot/ask_edit_agent_自訂模式)


- [GitHub Copilot coding Agent「github網站執行-(並行執行,背景執行)」](./github_copilot/GitHub_Copilot_coding_Agent)

- [GitHub Copilot的小功能(MCP自動開啟,AI Stats,Todolist,UI Integration,agent_session)](./github_copilot/github_實用小工具)

- [GitHub spark](https://docs.github.com/en/copilot/tutorials/easy-apps-with-spark)

## Gemini Code Assist

### [官網說明](https://codeassist.google/?hl=zh-tw)

### 安裝方式
1. 安裝擴統套件-Gemini Code Assist`
2. 登入Google帳號

### [Gemini Code Assist System prompt設定](./gemini_code_assist/system_prompt設定)

### [Gemini Code Assist MCP設定](./gemini_code_assist/mcp設定)
---

## Gemini CLI
**官方GitHub網站**-[https://github.com/google-gemini/gemini-cli/tree/main](https://github.com/google-gemini/gemini-cli/tree/main)

[**Gemini CLI功能與應用探索**](./gemini_cli/功能與應用探索.md)

**Gemini CLI功能與應用探索(語音摘要)**[下載位址](./gemini_cli/voice/突破性開發體驗Google_Gemini_CLI如何轉型你的程式碼協作與AI代理工作流.mp3)

[**非官方繁體中文操作說明**](https://gemini-cli.gh.miniasp.com/extension.html)
- [Gemini CLI簡介_安裝](./gemini_cli/gemini_簡介_安裝.md)
- [Gemini CLI Getting Started](./gemini_cli/gemini_getting_started.md)
- [Gemini CLI的配置設定](./gemini_cli/gemini_配置設定.md)
- [Gemini CLI的快捷鍵](./gemini_cli/gemini_快捷鍵.md)
- [Gemini CLI的命令說明](./gemini_cli/gemini_命令說明.md)
- [Gemini CLI待加入文章和範例參考](./gemini_cli/gemini_chatGPT提供.md)
- [操作範例](./gemini_cli/操作範例.md)

## Claude Code CLI

- [Claude Code CLI](./claude_code_cli/README.md)

## revo dev

- [revo dev](./revo_dev/README.md)

## Cursor 編輯器使用說明

### [cursor System prompt設定](./cursor/system_prompt設定)


## Kiro編輯器使用說明

- [Kiro編輯器使用說明](./kiro/README.md)

## Zed編輯器使用說明

- [Zed編輯器使用說明](./zed/README.md)

## Spec-Driven 規範驅動開發工具

## 提示詞注意事項

- [提示詞](./prompt/README.md)
- [提示詞範例1](./prompt/範例1/README.md)
	- 使用Gemini CLI
	- 下載指定網頁內容和圖片
	- 將英文翻譯為繁體中文版的markdown格式
	- 將英文翻譯為繁英版的markdown格式


## [vibe_coding範例樣版](./vibe_coding範例樣版)