# Claude Code CLI 完整使用指南

## 目錄
- [簡介](#簡介)
- [安裝步驟](#安裝步驟)
- [基本配置](#基本配置)
- [核心功能](#核心功能)
- [使用範例](#使用範例)
- [進階技巧](#進階技巧)
- [常見問題](#常見問題)
- [最佳實踐](#最佳實踐)

## 簡介

Claude Code CLI 是 Anthropic 推出的命令列工具，讓開發者能夠直接在終端機中與 Claude AI 互動，進行程式碼生成、除錯、重構等開發任務。這個工具特別適合喜歡在命令列環境工作的開發者。

### 主要特色
- 🚀 快速的程式碼生成和修改
- 🔍 智能程式碼分析和建議
- 🛠️ 支援多種程式語言
- 📝 自動化文檔生成
- 🔄 版本控制整合

## 安裝步驟

### 系統需求
- Node.js 16.0 或更高版本
- npm 或 yarn 套件管理器
- Claude API 金鑰

### 1. 安裝 CLI 工具

```bash
# 使用 npm 全域安裝
npm install -g @anthropic-ai/claude-cli

# 或使用 yarn
yarn global add @anthropic-ai/claude-cli
```

### 2. 驗證安裝

```bash
claude --version
```

### 3. 取得 API 金鑰

1. 前往 [Anthropic Console](https://console.anthropic.com/)
2. 註冊或登入帳號
3. 在 API Keys 頁面生成新的金鑰
4. 複製金鑰備用

## 基本配置

### 設定 API 金鑰

```bash
# 方法 1: 使用環境變數
export ANTHROPIC_API_KEY="your-api-key-here"

# 方法 2: 使用配置檔案
claude config set api-key your-api-key-here

# 方法 3: 在專案目錄建立 .env 檔案
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env
```

### 初始化專案配置

```bash
# 在專案根目錄執行
claude init

# 這會建立 .claude 配置檔案
```

### 配置檔案範例

```json
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4096,
  "temperature": 0.7,
  "system_prompt": "你是一個專業的程式設計助手",
  "include_patterns": ["*.js", "*.ts", "*.py", "*.md"],
  "exclude_patterns": ["node_modules/**", "*.log"]
}
```

## 核心功能

### 1. 程式碼生成

```bash
# 生成新檔案
claude generate --file app.js --prompt "建立一個 Express.js 伺服器"

# 生成函數
claude generate --function --prompt "建立一個計算費波納契數列的函數"
```

### 2. 程式碼分析

```bash
# 分析單一檔案
claude analyze src/main.js

# 分析整個專案
claude analyze --recursive src/

# 檢查程式碼品質
claude lint --fix src/
```

### 3. 程式碼重構

```bash
# 重構檔案
claude refactor src/legacy.js --style modern

# 優化效能
claude optimize --file src/utils.js

# 轉換程式語言
claude convert --from python --to javascript src/script.py
```

### 4. 文檔生成

```bash
# 生成 README
claude docs --readme

# 生成 API 文檔
claude docs --api src/

# 生成註解
claude comment --file src/main.js
```

### 5. 測試生成

```bash
# 生成單元測試
claude test --unit src/utils.js

# 生成整合測試
claude test --integration src/api/

# 生成測試資料
claude mock --schema user.json
```

## 使用範例

### 範例 1: 建立 React 元件

```bash
# 生成 React 元件
claude generate --prompt "建立一個可重複使用的 Button 元件，支援不同大小和顏色" --file components/Button.jsx

# 生成對應的測試
claude test --unit components/Button.jsx

# 生成 Storybook 故事
claude generate --prompt "為 Button 元件建立 Storybook 故事" --file components/Button.stories.js
```

### 範例 2: API 開發

```bash
# 生成 Express 路由
claude generate --prompt "建立用戶管理的 REST API 路由，包含 CRUD 操作" --file routes/users.js

# 生成資料模型
claude generate --prompt "建立 User 模型，使用 Mongoose" --file models/User.js

# 生成 API 文檔
claude docs --api routes/ --output api-docs.md
```

### 範例 3: 程式碼重構

```bash
# 將 callback 轉換為 async/await
claude refactor --pattern "callback-to-async" src/

# 優化 SQL 查詢
claude optimize --database --file src/queries.js

# 更新過時的語法
claude modernize --target es2022 src/
```

## 進階技巧

### 1. 自訂提示模板

建立 `.claude/templates/` 目錄：

```bash
mkdir -p .claude/templates
```

建立模板檔案 `component.md`：

```markdown
# React 元件模板

請建立一個 React 元件，包含以下特性：
- TypeScript 支援
- Props 介面定義
- 預設 props
- CSS Modules 樣式
- 單元測試

元件名稱：{{name}}
功能描述：{{description}}
```

使用模板：

```bash
claude generate --template component --name Button --description "可自訂的按鈕元件"
```

### 2. 批次處理

```bash
# 批次重構多個檔案
find src/ -name "*.js" | xargs -I {} claude refactor {}

# 批次生成測試
claude test --batch src/**/*.js

# 批次更新文檔
claude docs --update --recursive src/
```

### 3. Git 整合

```bash
# 分析 Git diff
claude review --diff HEAD~1

# 生成 commit 訊息
claude commit --auto

# 檢查程式碼變更
claude check --staged
```

### 4. 工作流程自動化

建立 `.claude/workflows/deploy.yml`：

```yaml
name: 部署前檢查
steps:
  - name: 程式碼分析
    run: claude analyze --strict
  - name: 測試生成
    run: claude test --coverage
  - name: 文檔更新
    run: claude docs --update
  - name: 程式碼格式化
    run: claude format --fix
```

執行工作流程：

```bash
claude workflow run deploy
```

## 常見問題

### Q: API 金鑰無效怎麼辦？

```bash
# 檢查金鑰設定
claude config get api-key

# 重新設定金鑰
claude config set api-key new-api-key

# 測試連線
claude test-connection
```

### Q: 如何處理大型專案？

```bash
# 設定檔案過濾
claude config set include-patterns "src/**/*.js,src/**/*.ts"
claude config set exclude-patterns "node_modules/**,dist/**,*.log"

# 使用分批處理
claude analyze --batch-size 10 src/

# 設定記憶體限制
claude config set max-memory 4096
```

### Q: 如何自訂輸出格式？

```bash
# JSON 格式輸出
claude analyze --format json src/main.js

# Markdown 格式
claude docs --format markdown

# 自訂模板
claude generate --template custom --output-format yaml
```

### Q: 如何處理敏感資訊？

```bash
# 設定忽略模式
claude config set ignore-patterns "*.env,*.key,secrets/**"

# 使用本地模式（不上傳到 API）
claude analyze --local-only

# 資料遮罩
claude config set mask-sensitive true
```

## 最佳實踐

### 1. 專案結構建議

```
project/
├── .claude/
│   ├── config.json
│   ├── templates/
│   └── workflows/
├── src/
├── tests/
└── docs/
```

### 2. 配置最佳化

```json
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4096,
  "temperature": 0.3,
  "system_prompt": "你是專業的 {{language}} 開發者，請提供高品質、可維護的程式碼",
  "context_window": 8192,
  "streaming": true,
  "cache_responses": true
}
```

### 3. 安全性考量

- 永遠不要將 API 金鑰提交到版本控制
- 使用環境變數或安全的配置管理
- 定期輪換 API 金鑰
- 監控 API 使用量

### 4. 效能優化

```bash
# 啟用快取
claude config set cache-enabled true

# 設定並行處理
claude config set parallel-jobs 4

# 使用增量分析
claude analyze --incremental
```

### 5. 團隊協作

```bash
# 共享配置
claude config export team-config.json

# 匯入團隊配置
claude config import team-config.json

# 版本控制配置
git add .claude/config.json
```

## 更新和維護

### 更新 CLI 工具

```bash
# 檢查更新
claude --check-updates

# 更新到最新版本
npm update -g @anthropic-ai/claude-cli

# 查看更新日誌
claude changelog
```

### 清理和重置

```bash
# 清理快取
claude cache clear

# 重置配置
claude config reset

# 重新初始化
claude init --force
```

---

## 相關資源

- [官方文檔](https://docs.anthropic.com/claude/cli)
- [GitHub 儲存庫](https://github.com/anthropics/claude-cli)
- [社群論壇](https://community.anthropic.com/)
- [範例專案](https://github.com/anthropics/claude-cli-examples)

## 授權

本文檔遵循 MIT 授權條款。