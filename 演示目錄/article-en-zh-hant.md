# Gemini CLI: Custom slash commands
# Gemini CLI：自訂斜線指令

![Header Image](resources/custom_slash_commands_header.max-2600x2600.png)

**Published**: Jul 22, 2024
**發布日期**：2024 年 7 月 22 日

**Author**: Ethan hemodynamic
**作者**：Ethan hemodynamic

Custom slash commands are a new feature in Gemini CLI that lets you define your own reusable prompts. This lets you streamline your interactions with Gemini CLI and improve your workflow efficiency.
自訂斜線指令是 Gemini CLI 的一項新功能，可讓您定義自己的可重複使用提示。這可讓您簡化與 Gemini CLI 的互動，並提高工作流程效率。

This article provides an overview of custom slash commands and shows you how to create your own.
本文概述了自訂斜線指令，並說明如何建立自己的指令。

## How to use custom slash commands
## 如何使用自訂斜線指令

The following animation shows how to use the `/review` custom slash command to review a pull request:
以下動畫說明如何使用 `/review` 自訂斜線指令來審查提取請求：

![Review Command](resources/custom_slash_commands_review.gif)

## How to create custom slash commands
## 如何建立自訂斜線指令

The foundation of custom slash commands is rooted in `.toml` files.
自訂斜線指令的基礎在於 `.toml` 檔案。

The `.toml` file provides a powerful and structured base on which to build extensive support for complex commands. To help support a wide range of users, we made the required keys minimal (just `prompt`). And we support easy-to-use args with `{{args}}` and shell command execution `!{...}` directly into the prompt.
`.toml` 檔案提供了一個強大且結構化的基礎，可用於為複雜指令建立廣泛的支援。為了支援廣泛的使用者，我們將必要的金鑰減至最少 (只有 `prompt`)。我們也支援在提示中直接使用易於使用的參數 `{{args}}` 和 shell 指令執行 `!{...}`。

Here is an example `.toml` file that is invoked using `/review <issue_number>` from Gemini CLI to review a GitHub PR. Notice that the file name defines the command name and it's case sensitive. For more information about custom slash commands, see the [Custom Commands](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md#custom-commands) section of the Gemini CLI documentation.
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

## Namespacing
## 命名空間

The name of a command is determined by its file path relative to the `commands` directory. Sub-directories are used to create *namespaced commands*, with the path separator (`/` or `\`) being converted to a colon (`:`).
指令的名稱取決於其相對於 `commands` 目錄的檔案路徑。子目錄用於建立*命名空間指令*，路徑分隔符 (`/` 或 `
`) 會轉換為冒號 (`:`)。

*   A file at `<project>/.gemini/commands/test.toml` becomes the command `/test`.
*   位於 `<project>/.gemini/commands/test.toml` 的檔案會成為 `/test` 指令。
*   A file at `<project>/.gemini/commands/git/commit.toml` becomes the namespaced command `/git:commit`.
*   位於 `<project>/.gemini/commands/git/commit.toml` 的檔案會成為命名空間指令 `/git:commit`。

![Namespacing](resources/custom_slash_commands_namespaces.gif)

This allows grouping related commands under a single namespace.
這可讓您將相關指令分組到單一命名空間下。

## Building a slash command
## 建立斜線指令

The next few sections show you how to build a slash command for Gemini CLI.
接下來的幾個部分將說明如何為 Gemini CLI 建立斜線指令。

### 1 - Create the command file
### 1 - 建立指令檔案

First, create a file named `plan.toml` inside the `~/.gemini/commands/` directory. Doing so will let you create a `/plan` command to tell Gemini CLI to only *plan* the changes by providing a step-by-step plan and to not start on implementation. This approach will let you provide feedback and iterate on the plan before implementation.
首先，在 `~/.gemini/commands/` 目錄中建立一個名為 `plan.toml` 的檔案。這樣做可讓您建立 `/plan` 指令，告知 Gemini CLI 僅*規劃*變更，方法是提供逐步計劃，而不是開始實作。這種方法可讓您在實作前提供意見回饋並反覆修改計劃。

Custom slash commands can be scoped to an individual *user* or *project* by defining the `.toml` files in designated directories.
自訂斜線指令可以透過在指定目錄中定義 `.toml` 檔案，將範圍限定為個別*使用者*或*專案*。

*   User-scoped commands are available across all Gemini CLI projects for a user and are stored in `~/.gemini/commands/` (note the `~`).
*   使用者範圍的指令適用於使用者的所有 Gemini CLI 專案，並儲存在 `~/.gemini/commands/` 中 (請注意 `~`)。
*   Project-scoped commands are only available from sessions within a given project and are stored in `.gemini/commands/`.
*   專案範圍的指令僅適用於指定專案中的工作階段，並儲存在 `.gemini/commands/` 中。

**Hint**: To streamline project workflows, check these into *Git* repositories!
**提示**：為了簡化專案工作流程，請將這些儲存庫簽入 *Git*！

```bash
mkdir -p ~/.gemini/commands
touch ~/.gemini/commands/plan.toml
```

### 2 - Add the command definition
### 2 - 新增指令定義

Open `plan.toml` and add the following content:
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

### 3 - Use the command
### 3 - 使用指令

Now you can use this command within Gemini CLI:
現在您可以在 Gemini CLI 中使用此指令：

```
/plan How can I make the project more performant?
```

## Enriched integration with MCP Prompts
## 與 MCP 提示的豐富整合

Gemini CLI now offers a more integrated experience with MCP by supporting [MCP Prompts](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts) as slash commands! MCP provides a standardized way for servers to expose prompt templates to clients. Gemini CLI utilizes this to expose available prompts for configured MCP servers and make the prompts available as slash commands.
Gemini CLI 現在透過支援 [MCP 提示](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts) 作為斜線指令，提供與 MCP 更整合的體驗！MCP 為伺服器提供了一種標準化方式，可向用戶端公開提示範本。Gemini CLI 利用此功能公開已設定 MCP 伺服器的可用提示，並讓提示以斜線指令的形式提供。

The `name` and `description` of the MCP prompt is used as the slash command name and description. MCP prompt `arguments` are also supported and leveraged in slash commands by using `/mycommand --<argument_name>="<argument_value>"` or positionally `/mycommand <argument1> <argument2>`.
MCP 提示的 `name` 和 `description` 會用作斜線指令的名稱和說明。MCP 提示 `arguments` 也受到支援，並可透過使用 `/mycommand --<argument_name>="<argument_value>"` 或按位置 `/mycommand <argument1> <argument2>` 在斜線指令中加以利用。

The following is an example `/research` command that uses [FastMCP](https://gofastmcp.com/getting-started/welcome) Python server:
以下是使用 [FastMCP](https://gofastmcp.com/getting-started/welcome) Python 伺服器的 `/research` 指令範例：

![MCP Integration](resources/custom_slash_commands_mcp.gif)

## Easy to get started
## 輕鬆上手

So what are you waiting for? Upgrade your terminal experience with [Gemini CLI](https://github.com/google-gemini/gemini-cli) today and try out custom slash commands to streamline your workflows. To learn more, check out the [Custom Commands](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md#custom-commands) documentation for the Gemini CLI.
那您還在等什麼？立即使用 [Gemini CLI](https://github.com/google-gemini/gemini-cli) 升級您的終端機體驗，並試用自訂斜線指令來簡化您的工作流程。若要深入了解，請參閱 Gemini CLI 的 [自訂指令](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md#custom-commands) 文件。
