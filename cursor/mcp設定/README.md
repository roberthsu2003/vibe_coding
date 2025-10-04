# Cursor設定MCP

- **自動設定**

設定 -> `Tools & MCP` 


- **手動設定**

```
<project folder>/.cursor/mcp.json
```


- **mcp.json格式如下**

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```

