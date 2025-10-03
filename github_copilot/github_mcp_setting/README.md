# GitHub MCP 設定

## 手動檔案設定

1. 建立mcp.json檔案

```
<project>/.vscode/mcp.json
```

## 自動檔案設定

```
1. 使用 VS Code 命令面板 (Cmd + Shift + P)
2. 執行 > MCP: Open Workspace Folder MCP Configuration
```


## 設定格式

```json
{
    "servers": {
        "chrome-devtools": {
            "command": "npx",
            "args": [
                "chrome-devtools-mcp@latest"
            ]
        }
    },
    "inputs": []
}
```