# Gemini CLI: Custom slash commands

![Header Image](resources/custom_slash_commands_header.max-2600x2600.png)

**Published**: Jul 22, 2024

**Author**: Ethan hemodynamic

Custom slash commands are a new feature in Gemini CLI that lets you define your own reusable prompts. This lets you streamline your interactions with Gemini CLI and improve your workflow efficiency.

This article provides an overview of custom slash commands and shows you how to create your own.

## How to use custom slash commands

The following animation shows how to use the `/review` custom slash command to review a pull request:

![Review Command](resources/custom_slash_commands_review.gif)

## How to create custom slash commands

The foundation of custom slash commands is rooted in `.toml` files.

The `.toml` file provides a powerful and structured base on which to build extensive support for complex commands. To help support a wide range of users, we made the required keys minimal (just `prompt`). And we support easy-to-use args with `{{args}}` and shell command execution `!{...}` directly into the prompt.

Here is an example `.toml` file that is invoked using `/review <issue_number>` from Gemini CLI to review a GitHub PR. Notice that the file name defines the command name and it's case sensitive. For more information about custom slash commands, see the [Custom Commands](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md#custom-commands) section of the Gemini CLI documentation.

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

The name of a command is determined by its file path relative to the `commands` directory. Sub-directories are used to create *namespaced commands*, with the path separator (`/` or `\`) being converted to a colon (`:`).

*   A file at `<project>/.gemini/commands/test.toml` becomes the command `/test`.
*   A file at `<project>/.gemini/commands/git/commit.toml` becomes the namespaced command `/git:commit`.

![Namespacing](resources/custom_slash_commands_namespaces.gif)

This allows grouping related commands under a single namespace.

## Building a slash command

The next few sections show you how to build a slash command for Gemini CLI.

### 1 - Create the command file

First, create a file named `plan.toml` inside the `~/.gemini/commands/` directory. Doing so will let you create a `/plan` command to tell Gemini CLI to only *plan* the changes by providing a step-by-step plan and to not start on implementation. This approach will let you provide feedback and iterate on the plan before implementation.

Custom slash commands can be scoped to an individual *user* or *project* by defining the `.toml` files in designated directories.

*   User-scoped commands are available across all Gemini CLI projects for a user and are stored in `~/.gemini/commands/` (note the `~`).
*   Project-scoped commands are only available from sessions within a given project and are stored in `.gemini/commands/`.

**Hint**: To streamline project workflows, check these into *Git* repositories!

```bash
mkdir -p ~/.gemini/commands
touch ~/.gemini/commands/plan.toml
```

### 2 - Add the command definition

Open `plan.toml` and add the following content:

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

Now you can use this command within Gemini CLI:

```
/plan How can I make the project more performant?
```

## Enriched integration with MCP Prompts

Gemini CLI now offers a more integrated experience with MCP by supporting [MCP Prompts](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts) as slash commands! MCP provides a standardized way for servers to expose prompt templates to clients. Gemini CLI utilizes this to expose available prompts for configured MCP servers and make the prompts available as slash commands.

The `name` and `description` of the MCP prompt is used as the slash command name and description. MCP prompt `arguments` are also supported and leveraged in slash commands by using `/mycommand --<argument_name>="<argument_value>"` or positionally `/mycommand <argument1> <argument2>`.

The following is an example `/research` command that uses [FastMCP](https://gofastmcp.com/getting-started/welcome) Python server:

![MCP Integration](resources/custom_slash_commands_mcp.gif)

## Easy to get started

So what are you waiting for? Upgrade your terminal experience with [Gemini CLI](https://github.com/google-gemini/gemini-cli) today and try out custom slash commands to streamline your workflows. To learn more, check out the [Custom Commands](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md#custom-commands) documentation for the Gemini CLI.
