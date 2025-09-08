# Gemini的配置設定

Gemini CLI 提供多種配置其行為的方式，包括環境變數、命令列參數及設定檔。本文檔概述了不同的配置方法與可用設定項目。

> [!IMPORTANT]
> 官網說明-[https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md)

## 配置層(Configuration layers)
配置以以下優先順序套用（較低的數字被較高的數字覆蓋）

1. 預設值：應用程式內硬編碼的預設值。
2. 系統預設值檔案：可被其他設定檔覆寫的全局預設設定。
3. 使用者設定檔：當前使用者的全局設定。
4. 專案設定檔：專案專屬設定。
5. 系統設定檔：覆蓋所有其他設定檔的系統層級設定。
6. 環境變數：系統層級或會話專屬變數，可能從 .env 檔案載入。
7. 命令列參數：啟動 CLI 時傳遞的參數值。

## 設定檔案

Gemini CLI 使用 JSON 設定檔來儲存持久化配置。這些檔案有四個存放位置：

- **系統預設值檔案**：
	- **位置**：/etc/gemini-cli/system-defaults.json（Linux）、C:\ProgramData\gemini-cli\system-defaults.json（Windows）或 /Library/Application Support/GeminiCli/system-defaults.json（macOS）。可透過環境變數 GEMINI_CLI_SYSTEM_DEFAULTS_PATH 覆寫此路徑。

	- **作用範圍**：提供系統層級預設設定的基礎層級。此類設定優先級最低，旨在被使用者、專案或系統覆寫設定取代。

- **使用者設定檔**：
	- **位置**：~/.gemini/settings.json（其中 ~ 代表您的Home目錄）。

	- **作用範圍**：適用於當前使用者所有 Gemini CLI 工作階段。使用者設定會覆寫系統預設值。

- **專案設定檔**：
	- **位置**：專案根目錄內的 .gemini/settings.json。

	- **作用範圍**：僅在從該特定專案執行 Gemini CLI 時生效。專案設定會覆寫使用者設定與系統預設值。

- **系統設定檔**：
	- **位置**：/etc/gemini-cli/settings.json（Linux）、C:\ProgramData\gemini-cli\settings.json（Windows）或 /Library/Application Support/GeminiCli/settings.json（macOS）。可透過 GEMINI_CLI_SYSTEM_SETTINGS_PATH 環境變數覆寫路徑。

	- **作用範圍**：適用於系統中所有使用者進行的 Gemini CLI 工作階段。系統設定具有覆寫效力，優先於所有其他設定檔。此機制可協助企業系統管理員管控使用者端的 Gemini CLI 設定。

## 您專案中的 .gemini 目錄
除了專案設定檔之外，專案的 .gemini 目錄還可包含其他與 Gemini CLI 運作相關的專案專屬檔案，例如：

## settings.json 中的可用設定：

請參考官網說明-[https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md](https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md)


- **contextFileName (string or array of strings):**

	描述：指定上下文檔案的檔案名稱（例如 GEMINI.md、AGENTS.md）。可以是單一檔案名，也可以是可接受檔案名稱的清單。
		
	Default: GEMINI.md
	
	Example: "contextFileName": “AGENTS.md”



** mcpServer (object):**

```
"mcpServers": {
  "myPythonServer": {
    "command": "python",
    "args": ["mcp_server.py", "--port", "8080"],
    "cwd": "./mcp_tools/python",
    "timeout": 5000,
    "includeTools": ["safe_tool", "file_reader"],
  },
  "myNodeServer": {
    "command": "node",
    "args": ["mcp_server.js"],
    "cwd": "./mcp_tools/node",
    "excludeTools": ["dangerous_tool", "file_deleter"]
  },
  "myDockerServer": {
    "command": "docker",
    "args": ["run", "-i", "--rm", "-e", "API_KEY", "ghcr.io/foo/bar"],
    "env": {
      "API_KEY": "$MY_API_TOKEN"
    }
  },
  "mySseServer": {
    "url": "http://localhost:8081/events",
    "headers": {
      "Authorization": "Bearer $MY_SSE_TOKEN"
    },
    "description": "An example SSE-based MCP server."
  },
  "myStreamableHttpServer": {
    "httpUrl": "http://localhost:8082/stream",
    "headers": {
      "X-API-Key": "$MY_HTTP_API_KEY"
    },
    "description": "An example Streamable HTTP-based MCP server."
  }
}
```

