# Gemini CLI：自訂斜線指令

![Header Image](resources/custom_slash_commands_header.max-2600x2600.png)

**發布日期**：2024 年 7 月 22 日

**作者**：Ethan hemodynamic

自訂斜線指令是 Gemini CLI 的一項新功能，可讓您定義自己的可重複使用提示。這可讓您簡化與 Gemini CLI 的互動，並提高工作流程效率。

本文概述了自訂斜線指令，並說明如何建立自己的指令。

## 如何使用自訂斜線指令

以下動畫說明如何使用 `/review` 自訂斜線指令來審查提取請求：

![Review Command](resources/custom_slash_commands_review.gif)

## 如何建立自訂斜線指令

自訂斜線指令的基礎在於 `.toml` 檔案。

`.toml` 檔案提供了一個強大且結構化的基礎，可用於為複雜指令建立廣泛的支援。為了支援廣泛的使用者，我們將必要的金鑰減至最少 (只有 `prompt`)。我們也支援在提示中直接使用易於使用的參數 `{{args}}` 和 shell 指令執行 `!{...}`。

以下是使用 Gemini CLI 的 `/review <issue_number>` 叫用的 `.toml` 檔案範例，用於審查 GitHub PR。請注意，檔案名稱會定義指令名稱，且區分大小寫。如需有關自訂斜線指令的更多資訊，請參閱 Gemini CLI 文件的 [自訂指令](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md#custom-commands) 部分。

```toml
description="Reviews a pull request based on issue number."
prompt = """
Please provide a detailed pull request review on GitHub issue: {{args}}.

Follow these steps:

1. Use `gh pr view {{args}}` to pull the information of the PR.
2. Use `gh pr diff {{args}}` to view the diff of the PR.
3. Understand the intent of the PR using the PR description.
4. If PR description is not detailed enough to understand the intent of the PR,
   make sure to note it in your review.
5. Make sure the PR title follows Conventional Commits, here are the last five
   commits to the repo as examples: !{git log --pretty=format:"%s" -n 5}
6. Search the codebase if required.
7. Write a concise review of the PR, keeping in mind to encourage strong code
   quality and best practices.
8. Use `gh pr comment {{args}} --body {{review}}` to post the review to the PR.

Remember to use the GitHub CLI (`gh`) with the Shell tool for all
GitHub-related tasks.
"""
```

## 命名空間

指令的名稱取決於其相對於 `commands` 目錄的檔案路徑。子目錄用於建立*命名空間指令*，路徑分隔符 (`/` 或 `\`) 會轉換為冒號 (`:`)。

*   位於 `<project>/.gemini/commands/test.toml` 的檔案會成為 `/test` 指令。
*   位於 `<project>/.gemini/commands/git/commit.toml` 的檔案會成為命名空間指令 `/git:commit`。

![Namespacing](resources/custom_slash_commands_namespaces.gif)

這可讓您將相關指令分組到單一命名空間下。

## 建立斜線指令

接下來的幾個部分將說明如何為 Gemini CLI 建立斜線指令。

### 1 - 建立指令檔案

首先，在 `~/.gemini/commands/` 目錄中建立一個名為 `plan.toml` 的檔案。這樣做可讓您建立 `/plan` 指令，告知 Gemini CLI 僅*規劃*變更，方法是提供逐步計劃，而不是開始實作。這種方法可讓您在實作前提供意見回饋並反覆修改計劃。

自訂斜線指令可以透過在指定目錄中定義 `.toml` 檔案，將範圍限定為個別*使用者*或*專案*。

*   使用者範圍的指令適用於使用者的所有 Gemini CLI 專案，並儲存在 `~/.gemini/commands/` 中 (請注意 `~`)。
*   專案範圍的指令僅適用於指定專案中的工作階段，並儲存在 `.gemini/commands/` 中。

**提示**：為了簡化專案工作流程，請將這些儲存庫簽入 *Git*！

```bash
mkdir -p ~/.gemini/commands
touch ~/.gemini/commands/plan.toml
```

### 2 - 新增指令定義

開啟 `plan.toml` 並新增以下內容：

```toml
# ~/.gemini/commands/plan.toml

description="Investigates and creates a strategic plan to accomplish a task."
prompt = """
Your primary role is that of a strategist, not an implementer.
Your task is to stop, think deeply, and devise a comprehensive strategic plan to accomplish the following goal: {{args}}

You MUST NOT write, modify, or execute any code. Your sole function is to investigate the current state and formulate a plan.

Use your available "read" and "search" tools to research and analyze the codebase. Gather all necessary context before presenting your strategy.

Present your strategic plan in markdown. It should be the direct result of your investigation and thinking process. Structure your response with the following sections:

1.  **Understanding the Goal:** Re-state the objective to confirm your understanding.
2.  **Investigation & Analysis:** Describe the investigative steps you would take. What files would you need to read? What would you search for? What critical questions need to be answered before any work begins?
3.  **Proposed Strategic Approach:** Outline the high-level strategy. Break the approach down into logical phases and describe the work that should happen in each.
4.  **Verification Strategy:** Explain how the success of this plan would be measured. What should be tested to ensure the goal is met without introducing regressions?
5.  **Anticipated Challenges & Considerations:** Based on your analysis, what potential risks, dependencies, or trade-offs do you foresee?

Your final output should be ONLY this strategic plan.
"""
```

### 3 - 使用指令

現在您可以在 Gemini CLI 中使用此指令：

```
/plan How can I make the project more performant?
```

## 與 MCP 提示的豐富整合

Gemini CLI 現在透過支援 [MCP 提示](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts) 作為斜線指令，提供與 MCP 更整合的體驗！MCP 為伺服器提供了一種標準化方式，可向用戶端公開提示範本。Gemini CLI 利用此功能公開已設定 MCP 伺服器的可用提示，並讓提示以斜線指令的形式提供。

MCP 提示的 `name` 和 `description` 會用作斜線指令的名稱和說明。MCP 提示 `arguments` 也受到支援，並可透過使用 `/mycommand --<argument_name>="<argument_value>"` 或按位置 `/mycommand <argument1> <argument2>` 在斜線指令中加以利用。

以下是使用 [FastMCP](https://gofastmcp.com/getting-started/welcome) Python 伺服器的 `/research` 指令範例：

![MCP Integration](resources/custom_slash_commands_mcp.gif)

## 輕鬆上手

那您還在等什麼？立即使用 [Gemini CLI](https://github.com/google-gemini/gemini-cli) 升級您的終端機體驗，並試用自訂斜線指令來簡化您的工作流程。若要深入了解，請參閱 Gemini CLI 的 [自訂指令](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md#custom-commands) 文件。
