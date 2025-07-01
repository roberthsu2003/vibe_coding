## Gemini CLI Configuration

[官網說明文件](./https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md)

Gemini CLI 提供了多種配置其行為的方式，包括環境變數、命令列參數和設定檔。本文檔概述了不同的配置方法和可用的設定。

### 配置層:
配置以以下優先順序套用（較低的數字被較高的數字覆蓋）：

1. Default value:應用程式內的預設值。
2. User settings file: 當前用戶的全域設定。
3. Project settings file:專案特定的設定
4. Environment variables: 系統範圍或會話特定的變量，可能從 .env 檔案載入。
5. Command-line arguments:啟動 CLI 時傳遞的值。

### 使用者設定文件和專案設定文件

Gemini CLI 使用 settings.json 檔案進行持久化配置。這些文件位於兩個位置：

- 使用者設定檔：
	- 位置：~/.gemini/settings.json（其中~是使用者的目錄）。
	- 範圍：適用於目前使用者的所有 Gemini CLI 會話​​。

- 專案設定檔：
	- 位置：專案根目錄中的 .gemini/settings.json
	- 範圍：僅在從特定專案執行 Gemini CLI 時適用。項目設定會覆蓋使用者設定。
 
 > [!TIP]
 > 關於設定中的環境變數的注意事項：settings.json 檔案中的字串值可以使用 $VAR_NAME 或 ${VAR_NAME} 語法來引用環境變數。這些變數將在設定載入時自動解析。例如，如果您有一個環境變數 MY_API_TOKEN，您可以在 settings.json 中像這樣使用它："apiKey": "$MY_API_TOKEN"。

### 專案中的 .gemini 目錄

除了專案設定檔之外，專案的 .gemini 目錄還可以包含與 Gemini CLI 操作相關的其他專案特定文件，例如：

- Custom sandbox profiles (e.g., .gemini/sandbox-macos-custom.sb, .gemini/sandbox.Dockerfile).

### settings.json 中可用的設定：
- contextFileName (string or array of strings):
	- 描述：指定上下文檔案的檔案名稱（例如 GEMINI.md、AGENTS.md）。可以是單一檔案名，也可以是可接受檔案名稱的清單。
	- Default: GEMINI.md
	- 例如：“contextFileName”：“AGENTS.md”

- fileFiltering (object):
	- 描述：控制@指令和檔案發現工具的 git-aware 檔案過濾行為。
	- Default: "respectGitIgnore": true, "enableRecursiveFileSearch": true
	- 屬性:
		- respectGitIgnore（布林值）：發現檔案時是否遵循 .gitignore 模式。當設定為 true 時，git 忽略的檔案（例如 node_modules/、dist/、.env）將自動從 @ 指令和檔案清單操作中排除。

		- enable Recursive FileSearch (boolean): 啟用遞歸檔案搜尋（布林值）：在提示中完成@前綴時是否啟用遞歸搜尋目前樹下的檔案名稱。

	- 例如:

		```
		"fileFiltering": {
	  "respectGitIgnore": true,
	  "enableRecursiveFileSearch": false
		}
		```
		
### mcpServers (object):

```
"mcpServers": {
  "myPythonServer": {
    "command": "python",
    "args": ["mcp_server.py", "--port", "8080"],
    "cwd": "./mcp_tools/python",
    "timeout": 5000
  },
  "myNodeServer": {
    "command": "node",
    "args": ["mcp_server.js"],
    "cwd": "./mcp_tools/node"
  },
  "myDockerServer": {
    "command": "docker",
    "args": ["run", "i", "--rm", "-e", "API_KEY", "ghcr.io/foo/bar"],
    "env": {
      "API_KEY": "$MY_API_TOKEN"
    }
  },
}
```

### checkpointing (object):
- 說明: 設定檢查點功能，讓您儲存和還原對話及檔案狀態。有關更多詳細信息，請參閱檢查點文檔。

- Default: {"enabled": false}

- 屬性:

	-enabled（布林值）：當為真時，/restore 指令可用。
	
### preferredEditor (string):

- 說明: 指定用於查看差異的首選編輯器。
- 預設: vscode
- Example: "preferredEditor": "vscode"

### telemetry (object):
- 描述：配置 Gemini CLI 的日誌記錄和指標收集。更多信息，請參閱遙測。
- Default: {"enabled": false, "target": "local", "otlpEndpoint": "http://localhost:4317", "logPrompts": true}
- Properties:
	- enabled (boolean): 是否啟用遙測。
	- target (string): T 收集的遙測資料的目的地。支援的值為 local 和 gcp。
	- otlpEndpoint (string): OTLP 導出器的端點
	- logPrompts (boolean): 是否在日誌中包含使用者提示的內容。