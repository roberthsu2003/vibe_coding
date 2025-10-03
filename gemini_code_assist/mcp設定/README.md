# Gemini Code Assist的MCP設定

## 設定位置

```
<project>/.gemini/settings.json
```


## settings.json的內容

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["chrome-devtools-mcp@latest"]
    }
  }
}

```
