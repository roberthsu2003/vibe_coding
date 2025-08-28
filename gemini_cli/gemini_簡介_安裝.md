# Gemini CLI簡介

Gemini CLI 是一款開源人工智慧代理程式，將 Gemini 的強大功能直接帶入您的終端機。它提供輕量級的 Gemini 存取管道，讓您從提示字串到模型運行擁有最直接的路徑。

## Why Gemini CLI:

- 免費方案: 每分鐘 60 次請求，每日 1,000 次請求（適用於個人 Google 帳戶）
- Gemini 2.5 Pro模型: 存取 1佰萬 token context window
- 內建工具：Google 搜尋基礎、檔案操作、shell 指令、網頁抓取
- 可擴展：MCP（模型上下文協定）support for custom integrations
- 終端優先：專為使用命令列的開發人員設計
- 開源: Apache 2.0 licensed

## 安裝方式:

**系統需求**
- Node.js 版本20以上
- MacOS,Linux,Windows

### 使用npm安裝

```bash
npm install -g @google/gemini-cli
```

### 使用Homebrew安裝

```bash
brew install gemini-cli
```

> 整合vscode 和 currsor 編輯器
> 安裝擴充套件:Gemini Code Assist, Gemini CLI Companion

## 主要功能

### 1. 程式碼理解和生成

- 查詢和編輯大型程式碼庫
- 運用多模態功能，從PDF、圖像或草圖生成新應用程式
- 使用自然語言進行除錯與故障排除

### 2. 自動化與整合

- 自動化操作任務，例如查詢拉取請求或處理複雜的重新基礎化操作
- 使用 MCP 伺服器連接新功能，包括使用 [Imagen、Veo 或 Lyria 產生媒體](https://github.com/GoogleCloudPlatform/vertex-ai-creative-studio/tree/main/experiments/mcp-genmedia)
- 在腳本中以非互動模式執行，實現工作流程自動化

### 3. 進階功能

- 透過內建的 Google 搜尋功能，為您的查詢奠定基礎，獲取即時資訊
- 對話檢查點功能，用於儲存與恢復複雜會話
- 自訂情境檔案（GEMINI.md）以調整專案行為

### 4. GitHub整合

- 使用 [Gemini CLI GitHub Action](https://github.com/google-github-actions/run-gemini-cli) 將 Gemini CLI 直接整合到您的 GitHub 工作流程中

- Pull Request Reviews: 具備上下文反饋與建議的自動化程式碼審查

- Issue triage(分類): 基於內容分析的GitHub問題自動標記與優先級排序

- On-demand Assistance：在問題與拉取請求中提及 @gemini-cli，即可獲得除錯、說明或任務委派方面的協助

- Custom Workflows：根據團隊需求建立自動化、規劃化和按需的工作流程


## 身份驗證選項

### 選項 1：OAuth 登入（使用您的 Google 帳戶）

✨ 最適合：個人開發者以及持有 Gemini Code Assist 授權的用戶。（詳情請參閱配額限制與服務條款）

優勢：

- 免費方案：每分鐘 60 次請求，每日 1,000 次請求
- Gemini 2.5 Pro 搭配 100 萬代幣上下文視窗
- 免 API 金鑰管理 - 直接使用 Google 帳戶登入
- 自動更新至最新模型
- 啟動 Gemini CLI 後，選擇 OAuth 並依提示完成瀏覽器驗證流程

### 選項 2：Gemini API 金鑰

✨ 最適合：需要特定模型控制權或付費層級存取權的開發者

優勢：

- 免費層級：每日 100 次請求（搭配 Gemini 2.5 Pro）
- 模型選擇：可指定選用特定 Gemini 模型
- 用量計費：可隨時升級以提升請求上限

```
# Get your key from https://aistudio.google.com/apikey
export GEMINI_API_KEY="YOUR_API_KEY"
gemini
```

