# Claude Code MCP 設定

> **Model Context Protocol (MCP)** 讓 Claude Code 連接外部工具和資料源

## 什麼是 MCP

**MCP (Model Context Protocol)** 是 Anthropic 開發的協定,讓 Claude Code 與外部系統互動:

- 🗄️ **資料庫** - 直接查詢和操作資料
- 📁 **檔案系統** - 存取本地或遠端檔案
- 🌐 **API 服務** - 整合第三方服務
- 🔧 **開發工具** - Git、Docker、測試框架等

---

## 如何設定 MCP

### 1. CLI 設定方式

```bash
# 初始化 MCP 設定
claude mcp init

# 新增 MCP Server
claude mcp add git

# 列出已安裝的 MCP Servers
claude mcp list
```

### 2. 手動設定檔案

#### 全域設定 (所有專案)
檔案位置: `~/.claude/mcp.json`

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-git"]
    }
  }
}
```

#### 專案設定 (單一專案)
檔案位置: `.claude/mcp.json`

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@localhost:5432/mydb"
      }
    }
  }
}
```

#### VSCode 設定
檔案位置: `~/Library/Application Support/Code/User/settings.json`

```json
{
  "claude.mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-filesystem"],
      "env": {
        "ALLOWED_PATHS": "${workspaceFolder}"
      }
    }
  }
}
```

---

## 常用 MCP Servers

### Git 整合
```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-git"],
      "env": {
        "GIT_REPO_PATH": "${workspaceFolder}"
      }
    }
  }
}
```

### PostgreSQL 資料庫
```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://localhost:5432/mydb"
      }
    }
  }
}
```

### 檔案系統
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropics/mcp-server-filesystem"],
      "env": {
        "ALLOWED_PATHS": "${workspaceFolder}"
      }
    }
  }
}
```

---

## MCP 指令

```bash
# 管理 MCP Servers
claude mcp list                    # 列出所有 Servers
claude mcp add <server-name>       # 新增 Server
claude mcp remove <server-name>    # 移除 Server
claude mcp update <server-name>    # 更新 Server

# 除錯
export CLAUDE_MCP_DEBUG=1          # 啟用除錯
claude mcp logs <server-name>      # 查看日誌
claude mcp test <server-name>      # 測試連接
```

---

## 官方資源

- [MCP 協定官方網站](https://modelcontextprotocol.io)
- [Claude Code 文件](https://docs.claude.com/claude-code)
- [官方 MCP Servers](https://github.com/anthropics/mcp-servers)
