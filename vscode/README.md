# VSCode

## VSCode設定檔

**.vscode/settings.json**

```json
{
    "chat.mcp.discovery.enabled": true,

    // --- Suggested Settings for better code quality ---

    // Automatically save files after a delay.
    "files.autoSave": "afterDelay",

    // Format a file on save. A default formatter must be available.
    "editor.formatOnSave": true,

    // Trim trailing whitespace when saving a file.
    "files.trimTrailingWhitespace": true
}
```




**.vscode/mcp.json**

```josn
{
    "servers": {
        "vscode_postgres": {
        "command": "npx",
        "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:raspberry@host.docker.internal:5432/postgres"
      ]
    }
    },
}

```