# Claude Code CLI 完整教學指南

> 初學者友善的 Claude Code CLI 完整教學文件

## 📖 關於本教材

這是一份專為**程式設計師和開發者**設計的 Claude Code CLI 完整教學文件。透過這份教材，你將學會如何在命令列環境中高效使用 Claude AI 進行程式開發、除錯、重構等任務。

### 🎯 適合對象

- 喜歡命令列工作環境的開發者
- 想要提升開發效率的程式設計師
- 需要自動化程式碼處理的團隊
- 對 AI 輔助編程工具感興趣的技術人員
- 使用多種編輯器但想要統一 AI 助手的開發者

### ✨ 教材特色

- ✅ **實戰導向**：豐富的實際使用案例和專案範例
- ✅ **循序漸進**：從基礎安裝到進階應用的完整路徑
- ✅ **問題解決**：常見問題和最佳實踐分享
- ✅ **繁體中文**：全繁體中文撰寫，易於理解
- ✅ **模組化設計**：內容分章節，方便查閱和學習

## 🚀 快速開始

### 必備條件

1. **Node.js 16.0 或更高版本**
2. **npm 或 yarn 套件管理器**
3. **Claude API 金鑰**（需要 Claude Pro/Team/Enterprise 訂閱）
4. **基本命令列操作能力**

### 快速導覽

如果你是第一次使用，建議按照以下順序閱讀：

1. **第一章：認識 Claude Code CLI** - 了解 CLI 版本的特色
2. **第二章：安裝與設定** - 完成環境建置
3. **第三章：基本操作** - 學會基礎命令
4. **第五章：實戰專案** - 動手完成第一個專案！

## 📚 完整目錄

### 第一章：認識 Claude Code CLI
- [1.1 什麼是 Claude Code CLI？](#11-什麼是-claude-code-cli)
- [1.2 CLI 版 vs VSCode 版比較](#12-cli-版-vs-vscode-版比較)
- [1.3 使用場景分析](#13-使用場景分析)
- [1.4 系統需求](#14-系統需求)

### 第二章：安裝與設定
- [2.1 安裝 CLI 工具](#21-安裝-cli-工具)
- [2.2 API 金鑰設定](#22-api-金鑰設定)
- [2.3 基本配置](#23-基本配置)
- [2.4 驗證安裝](#24-驗證安裝)
- [2.5 疑難排解](#25-疑難排解)

### 第三章：基本操作
- [3.1 命令列介面導覽](#31-命令列介面導覽)
- [3.2 核心命令概覽](#32-核心命令概覽)
- [3.3 第一次互動](#33-第一次互動)
- [3.4 檔案操作基礎](#34-檔案操作基礎)

### 第四章：核心功能詳解
- [4.1 程式碼生成](#41-程式碼生成)
- [4.2 程式碼分析與審查](#42-程式碼分析與審查)
- [4.3 程式碼重構](#43-程式碼重構)
- [4.4 測試生成](#44-測試生成)
- [4.5 文檔生成](#45-文檔生成)
- [4.6 專案管理](#46-專案管理)

### 第五章：實戰專案
📌 **強烈推薦！** 透過實際專案學習如何使用 Claude Code CLI
- [5.1 專案一：建立 Node.js API](#51-專案一建立-nodejs-api)
- [5.2 專案二：React 元件開發](#52-專案二react-元件開發)
- [5.3 專案三：Python 數據處理](#53-專案三python-數據處理)
- [5.4 專案四：程式碼重構實戰](#54-專案四程式碼重構實戰)

### 第六章：進階應用
- [6.1 自訂提示模板](#61-自訂提示模板)
- [6.2 批次處理技巧](#62-批次處理技巧)
- [6.3 Git 整合應用](#63-git-整合應用)
- [6.4 工作流程自動化](#64-工作流程自動化)
- [6.5 團隊協作設定](#65-團隊協作設定)

### 第七章：最佳實踐與技巧
- [7.1 如何撰寫有效的提示](#71-如何撰寫有效的提示)
- [7.2 專案組織結構建議](#72-專案組織結構建議)
- [7.3 效能優化技巧](#73-效能優化技巧)
- [7.4 安全性考量](#74-安全性考量)
- [7.5 常見錯誤避免](#75-常見錯誤避免)

### 附錄
- [A. 命令快速參考](#a-命令快速參考)
- [B. 常見問題 FAQ](#b-常見問題-faq)
- [C. 設定檔案範例](#c-設定檔案範例)
- [D. 延伸學習資源](#d-延伸學習資源)

---

## 第一章：認識 Claude Code CLI

### 1.1 什麼是 Claude Code CLI？

Claude Code CLI 是 Anthropic 推出的命令列工具，讓開發者能夠直接在終端機中與 Claude AI 互動，進行程式碼生成、除錯、重構等開發任務。

#### 主要特色

- 🚀 **快速的程式碼生成和修改**
- 🔍 **智能程式碼分析和建議**
- 🛠️ **支援多種程式語言**
- 📝 **自動化文檔生成**
- 🔄 **版本控制整合**
- ⚡ **批次處理能力**
- 🔧 **高度可自訂化**

### 1.2 CLI 版 vs VSCode 版比較

| 特色 | CLI 版 | VSCode 版 |
|------|--------|-----------|
| **執行環境** | 任何終端機 | 需要 VSCode |
| **檔案處理** | 批次處理強大 | 單檔案為主 |
| **自動化** | 腳本化程度高 | 手動操作為主 |
| **學習曲線** | 需要命令列基礎 | 圖形介面友善 |
| **整合性** | 任何編輯器 | VSCode 深度整合 |
| **適用場景** | CI/CD、自動化 | 日常編程 |

### 1.3 使用場景分析

#### 適合使用 CLI 版本的情況：

✅ **自動化工作流程**
- 建置腳本整合
- CI/CD 流水線
- 定時程式碼檢查

✅ **批次處理**
- 多檔案重構
- 大量程式碼生成
- 專案遷移

✅ **團隊標準化**
- 程式碼風格統一
- 文檔生成自動化
- 測試覆蓋率提升

✅ **遠端開發**
- SSH 連線環境
- 雲端開發平台
- 容器化環境

### 1.4 系統需求

#### 最低需求
- Node.js 16.0+
- npm 7.0+ 或 yarn 1.22+
- 2GB RAM
- 1GB 硬碟空間

#### 推薦配置
- Node.js 18.0+
- npm 9.0+ 或 yarn 3.0+
- 4GB RAM
- 穩定網路連線

---

## 第二章：安裝與設定

### 2.1 安裝 CLI 工具

#### 使用 npm 安裝

```bash
# 全域安裝（推薦）
npm install -g @anthropic-ai/claude-cli

# 確認安裝成功
claude --version
```

#### 使用 yarn 安裝

```bash
# 全域安裝
yarn global add @anthropic-ai/claude-cli

# 確認安裝成功
claude --version
```

#### 預期輸出

```
Claude CLI v1.0.0
```

### 2.2 API 金鑰設定

#### 方法一：環境變數設定（推薦）

```bash
# macOS/Linux
export ANTHROPIC_API_KEY="your-api-key-here"

# Windows Command Prompt
set ANTHROPIC_API_KEY=your-api-key-here

# Windows PowerShell
$env:ANTHROPIC_API_KEY="your-api-key-here"
```

#### 方法二：配置檔案設定

```bash
# 設定 API 金鑰
claude config set api-key your-api-key-here

# 檢查設定
claude config get api-key
```

#### 方法三：專案層級設定

在專案根目錄建立 `.env` 檔案：

```bash
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env
```

#### 取得 API 金鑰步驟

1. 前往 [Anthropic Console](https://console.anthropic.com/)
2. 註冊或登入帳號
3. 點選左側選單的 "API Keys"
4. 點擊 "Create Key" 按鈕
5. 為金鑰命名（例如：CLI Development）
6. 複製生成的金鑰並妥善保存

### 2.3 基本配置

#### 初始化專案配置

```bash
# 在專案根目錄執行
claude init
```

這會建立 `.claude/config.json` 配置檔案：

```json
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4096,
  "temperature": 0.7,
  "system_prompt": "你是一個專業的程式設計助手",
  "include_patterns": ["*.js", "*.ts", "*.py", "*.md"],
  "exclude_patterns": ["node_modules/**", "*.log", ".git/**"]
}
```

#### 常用配置參數說明

| 參數 | 說明 | 預設值 | 範例 |
|------|------|--------|------|
| `model` | Claude 模型版本 | claude-3-sonnet-20240229 | claude-3-opus-20240229 |
| `max_tokens` | 最大回應長度 | 4096 | 8192 |
| `temperature` | 創意程度 | 0.7 | 0.3 (保守) ~ 1.0 (創意) |
| `system_prompt` | 系統提示 | 預設助手 | 客製化角色 |
| `include_patterns` | 包含檔案類型 | 常見程式檔案 | ["*.java", "*.kt"] |
| `exclude_patterns` | 排除檔案/目錄 | 系統檔案 | ["target/**"] |

### 2.4 驗證安裝

#### 測試基本功能

```bash
# 測試連線
claude test-connection

# 簡單測試
claude generate --prompt "寫一個 Hello World 程式" --language javascript
```

#### 預期輸出

```javascript
// Hello World 程式
console.log("Hello, World!");
```

#### 測試檔案讀取功能

```bash
# 建立測試檔案
echo "const x = 1;" > test.js

# 讓 Claude 分析檔案
claude analyze test.js
```

### 2.5 疑難排解

#### 常見安裝問題

**問題：`command not found: claude`**

解決方案：
```bash
# 檢查全域安裝路徑
npm list -g --depth=0

# 重新安裝
npm uninstall -g @anthropic-ai/claude-cli
npm install -g @anthropic-ai/claude-cli
```

**問題：API 金鑰無效**

解決方案：
```bash
# 檢查金鑰設定
claude config get api-key

# 重新設定金鑰
claude config set api-key your-new-api-key

# 測試連線
claude test-connection
```

**問題：權限錯誤（macOS/Linux）**

解決方案：
```bash
# 使用 sudo 安裝
sudo npm install -g @anthropic-ai/claude-cli

# 或修改 npm 全域目錄權限
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

---

## 第三章：基本操作

### 3.1 命令列介面導覽

#### 基本命令結構

```bash
claude [命令] [選項] [參數]
```

#### 取得說明

```bash
# 查看所有命令
claude --help

# 查看特定命令說明
claude generate --help
claude analyze --help
```

### 3.2 核心命令概覽

| 命令 | 功能 | 範例 |
|------|------|------|
| `generate` | 生成程式碼 | `claude generate --prompt "建立 API"` |
| `analyze` | 分析程式碼 | `claude analyze src/main.js` |
| `refactor` | 重構程式碼 | `claude refactor --style modern src/` |
| `test` | 生成測試 | `claude test --unit src/utils.js` |
| `docs` | 生成文檔 | `claude docs --readme` |
| `review` | 程式碼審查 | `claude review --diff HEAD~1` |
| `config` | 配置管理 | `claude config set model opus` |

### 3.3 第一次互動

#### 簡單對話

```bash
# 基本問答
claude chat --prompt "什麼是 TypeScript？"
```

#### 生成簡單程式碼

```bash
# 生成函數
claude generate --prompt "寫一個計算兩數相加的 JavaScript 函數"
```

#### 分析現有檔案

```bash
# 建立範例檔案
cat > example.js << 'EOF'
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
EOF

# 讓 Claude 分析
claude analyze example.js
```

### 3.4 檔案操作基礎

#### 單一檔案操作

```bash
# 分析單一檔案
claude analyze src/main.js

# 重構單一檔案
claude refactor src/legacy.js --output src/modern.js
```

#### 多檔案操作

```bash
# 分析整個目錄
claude analyze --recursive src/

# 批次重構
claude refactor src/*.js --style modern
```

#### 檔案過濾

```bash
# 只處理 JavaScript 檔案
claude analyze --include "*.js" src/

# 排除測試檔案
claude analyze --exclude "*test.js,*spec.js" src/
```

---

## 第四章：核心功能詳解

### 4.1 程式碼生成

#### 基本語法

```bash
claude generate [選項] --prompt "描述"
```

#### 常用選項

| 選項 | 說明 | 範例 |
|------|------|------|
| `--file` | 輸出檔案 | `--file app.js` |
| `--language` | 程式語言 | `--language python` |
| `--style` | 程式風格 | `--style functional` |
| `--template` | 使用模板 | `--template react-component` |

#### 實戰範例

**範例 1：建立 Express.js 伺服器**

```bash
claude generate \
  --prompt "建立一個 Express.js 伺服器，包含基本路由和中介軟體" \
  --file server.js \
  --language javascript
```

**範例 2：建立 React 元件**

```bash
claude generate \
  --prompt "建立一個可重複使用的 Button 元件，支援不同大小和顏色變體" \
  --file components/Button.jsx \
  --language typescript
```

**範例 3：建立資料模型**

```bash
claude generate \
  --prompt "建立一個 User 資料模型，使用 Mongoose，包含基本 CRUD 方法" \
  --file models/User.js
```

### 4.2 程式碼分析與審查

#### 基本分析

```bash
# 分析單一檔案
claude analyze src/main.js

# 分析整個專案
claude analyze --recursive src/
```

#### 深度分析

```bash
# 檢查程式碼品質
claude analyze --quality src/

# 安全性分析
claude analyze --security src/

# 效能分析
claude analyze --performance src/
```

#### 審查選項

| 選項 | 功能 | 使用時機 |
|------|------|----------|
| `--quality` | 程式碼品質檢查 | 程式碼審查 |
| `--security` | 安全性漏洞掃描 | 部署前檢查 |
| `--performance` | 效能瓶頸分析 | 優化前評估 |
| `--complexity` | 複雜度分析 | 重構決策 |

#### 實戰範例

**範例 1：程式碼品質檢查**

```bash
# 檢查整個專案的程式碼品質
claude analyze --quality --recursive src/ \
  --output-format json > quality-report.json
```

**範例 2：安全性掃描**

```bash
# 掃描潛在安全問題
claude analyze --security src/ \
  --include "*.js,*.ts" \
  --exclude "*.test.js"
```

### 4.3 程式碼重構

#### 重構命令

```bash
claude refactor [檔案/目錄] [選項]
```

#### 重構模式

| 模式 | 說明 | 範例 |
|------|------|------|
| `--style modern` | 現代化語法 | ES6+, async/await |
| `--pattern mvc` | 設計模式重構 | MVC, Observer |
| `--performance` | 效能優化 | 快取、演算法 |
| `--maintainability` | 可維護性提升 | 模組化、解耦 |

#### 實戰範例

**範例 1：現代化語法**

```bash
# 將 callback 轉換為 async/await
claude refactor src/api.js \
  --style modern \
  --pattern "callback-to-async"
```

**範例 2：效能優化**

```bash
# 優化演算法和資料結構
claude refactor src/utils.js \
  --performance \
  --focus "algorithm,data-structure"
```

**範例 3：架構重構**

```bash
# 套用 MVC 模式
claude refactor src/ \
  --pattern mvc \
  --recursive
```

### 4.4 測試生成

#### 測試類型

```bash
# 單元測試
claude test --unit src/utils.js

# 整合測試
claude test --integration src/api/

# 端對端測試
claude test --e2e src/
```

#### 測試框架支援

| 框架 | JavaScript | Python | Java |
|------|------------|--------|------|
| **單元測試** | Jest, Mocha | pytest, unittest | JUnit |
| **整合測試** | Supertest | pytest | TestNG |
| **模擬** | Sinon | mock | Mockito |

#### 實戰範例

**範例 1：生成單元測試**

```bash
# 為工具函數生成完整測試
claude test --unit src/utils.js \
  --framework jest \
  --coverage 90
```

**範例 2：生成整合測試**

```bash
# 為 API 路由生成測試
claude test --integration src/routes/ \
  --framework supertest \
  --include-mock-data
```

### 4.5 文檔生成

#### 文檔類型

```bash
# README 檔案
claude docs --readme

# API 文檔
claude docs --api src/

# 程式碼註解
claude docs --comments src/
```

#### 文檔格式

| 格式 | 用途 | 命令 |
|------|------|------|
| **Markdown** | 一般文檔 | `--format markdown` |
| **JSDoc** | JavaScript API | `--format jsdoc` |
| **Sphinx** | Python 文檔 | `--format sphinx` |
| **OpenAPI** | REST API | `--format openapi` |

#### 實戰範例

**範例 1：生成專案 README**

```bash
# 自動分析專案並生成 README
claude docs --readme \
  --include-installation \
  --include-usage \
  --include-api
```

**範例 2：生成 API 文檔**

```bash
# 生成 OpenAPI 規格文檔
claude docs --api src/routes/ \
  --format openapi \
  --output api-docs.yaml
```

### 4.6 專案管理

#### 專案初始化

```bash
# 建立新專案結構
claude init-project --type web-app --name my-project
```

#### 依賴管理

```bash
# 分析並建議依賴更新
claude deps --analyze package.json

# 生成依賴安全報告
claude deps --security-audit
```

#### 設定檔案生成

```bash
# 生成 ESLint 設定
claude config-gen --type eslint --strict

# 生成 TypeScript 設定
claude config-gen --type typescript --target es2022
```

---

## 第五章：實戰專案

### 5.1 專案一：建立 Node.js API

#### 專案目標
建立一個完整的 RESTful API，包含使用者管理、驗證和資料庫操作。

#### 步驟 1：專案初始化

```bash
# 建立專案目錄
mkdir user-api && cd user-api

# 初始化 Claude 設定
claude init

# 生成專案結構
claude generate \
  --prompt "建立 Node.js Express API 專案結構，包含 MVC 架構" \
  --template project-structure
```

#### 步驟 2：生成核心檔案

```bash
# 生成主要伺服器檔案
claude generate \
  --prompt "建立 Express.js 伺服器，包含中介軟體設定、錯誤處理、CORS 設定" \
  --file server.js

# 生成資料庫連線
claude generate \
  --prompt "建立 MongoDB 連線設定，使用 Mongoose，包含連線池和錯誤處理" \
  --file config/database.js

# 生成環境變數範例
claude generate \
  --prompt "建立環境變數設定檔，包含資料庫 URL、JWT 密鑰、埠號等" \
  --file .env.example
```

#### 步驟 3：建立資料模型

```bash
# 生成使用者模型
claude generate \
  --prompt "建立 User 模型，包含姓名、email、密碼加密、時間戳記，使用 Mongoose" \
  --file models/User.js

# 生成模型索引檔案
claude generate \
  --prompt "建立模型索引檔案，匯出所有模型" \
  --file models/index.js
```

#### 步驟 4：建立控制器

```bash
# 生成使用者控制器
claude generate \
  --prompt "建立 UserController，包含 CRUD 操作、註冊、登入、密碼驗證功能" \
  --file controllers/UserController.js

# 生成驗證控制器
claude generate \
  --prompt "建立 AuthController，包含 JWT token 生成、驗證、重新整理功能" \
  --file controllers/AuthController.js
```

#### 步驟 5：建立路由

```bash
# 生成使用者路由
claude generate \
  --prompt "建立 users 路由，包含 RESTful endpoints，套用驗證中介軟體" \
  --file routes/users.js

# 生成驗證路由
claude generate \
  --prompt "建立 auth 路由，包含註冊、登入、登出、重新整理 token endpoints" \
  --file routes/auth.js

# 生成路由索引
claude generate \
  --prompt "建立路由索引檔案，整合所有路由" \
  --file routes/index.js
```

#### 步驟 6：建立中介軟體

```bash
# 生成驗證中介軟體
claude generate \
  --prompt "建立 JWT 驗證中介軟體，檢查 token 有效性並提取使用者資訊" \
  --file middleware/auth.js

# 生成錯誤處理中介軟體
claude generate \
  --prompt "建立全域錯誤處理中介軟體，統一處理各種錯誤類型" \
  --file middleware/errorHandler.js
```

#### 步驟 7：生成測試

```bash
# 生成單元測試
claude test --unit models/User.js \
  --framework jest \
  --output tests/unit/user.model.test.js

# 生成整合測試
claude test --integration controllers/UserController.js \
  --framework supertest \
  --output tests/integration/user.controller.test.js

# 生成 API 端點測試
claude test --e2e routes/users.js \
  --framework supertest \
  --output tests/e2e/user.routes.test.js
```

#### 步驟 8：生成文檔

```bash
# 生成 README
claude docs --readme \
  --include-installation \
  --include-api-endpoints \
  --include-environment-setup

# 生成 API 文檔
claude docs --api routes/ \
  --format openapi \
  --output docs/api.yaml
```

#### 步驟 9：程式碼品質檢查

```bash
# 分析程式碼品質
claude analyze --quality --recursive . \
  --exclude "node_modules/**,*.log"

# 安全性檢查
claude analyze --security . \
  --include "*.js" \
  --output security-report.json
```

### 5.2 專案二：React 元件開發

#### 專案目標
建立一套可重複使用的 React UI 元件庫，包含按鈕、表單、模態視窗等常用元件。

#### 步驟 1：專案設定

```bash
# 建立專案
mkdir react-ui-components && cd react-ui-components

# 初始化專案
claude generate \
  --prompt "建立 React 元件庫專案結構，使用 TypeScript，包含 Storybook 設定" \
  --template react-library
```

#### 步驟 2：建立基礎元件

```bash
# 生成 Button 元件
claude generate \
  --prompt "建立可自訂的 Button 元件，支援不同大小、顏色、載入狀態，使用 TypeScript" \
  --file src/components/Button/Button.tsx

# 生成 Button 樣式
claude generate \
  --prompt "建立 Button 元件的 CSS Module 樣式，包含主題變數和響應式設計" \
  --file src/components/Button/Button.module.css

# 生成 Button 介面
claude generate \
  --prompt "建立 Button 元件的 TypeScript 介面定義和 Props 類型" \
  --file src/components/Button/Button.types.ts
```

#### 步驟 3：建立表單元件

```bash
# 生成 Input 元件
claude generate \
  --prompt "建立 Input 元件，支援驗證、錯誤顯示、不同輸入類型，使用 TypeScript" \
  --file src/components/Input/Input.tsx

# 生成 Form 元件
claude generate \
  --prompt "建立 Form 容器元件，整合表單驗證和提交處理" \
  --file src/components/Form/Form.tsx
```

#### 步驟 4：建立進階元件

```bash
# 生成 Modal 元件
claude generate \
  --prompt "建立 Modal 元件，支援動畫、鍵盤操作、無障礙功能" \
  --file src/components/Modal/Modal.tsx

# 生成 Dropdown 元件
claude generate \
  --prompt "建立 Dropdown 元件，支援搜尋、多選、自訂選項渲染" \
  --file src/components/Dropdown/Dropdown.tsx
```

#### 步驟 5：建立 Storybook 故事

```bash
# 為 Button 建立故事
claude generate \
  --prompt "為 Button 元件建立 Storybook 故事，展示所有變體和互動狀態" \
  --file src/components/Button/Button.stories.tsx

# 為 Modal 建立故事
claude generate \
  --prompt "為 Modal 元件建立 Storybook 故事，展示不同大小和內容類型" \
  --file src/components/Modal/Modal.stories.tsx
```

#### 步驟 6：建立測試

```bash
# 生成元件測試
claude test --unit src/components/Button/Button.tsx \
  --framework "@testing-library/react" \
  --output src/components/Button/Button.test.tsx

# 生成互動測試
claude test --integration src/components/Form/Form.tsx \
  --framework "@testing-library/react" \
  --include-user-events
```

#### 步驟 7：建立文檔

```bash
# 生成元件使用指南
claude docs --components src/components/ \
  --format markdown \
  --output docs/components.md

# 生成設計系統文檔
claude docs --design-system \
  --include-color-palette \
  --include-typography \
  --output docs/design-system.md
```

### 5.3 專案三：Python 數據處理

#### 專案目標
建立一個數據分析管道，包含數據清理、轉換、視覺化和報告生成。

#### 步驟 1：專案結構

```bash
# 建立專案
mkdir data-pipeline && cd data-pipeline

# 生成專案結構
claude generate \
  --prompt "建立 Python 數據分析專案結構，包含配置、工具、測試目錄" \
  --template python-data-project
```

#### 步驟 2：數據處理模組

```bash
# 生成數據載入器
claude generate \
  --prompt "建立數據載入模組，支援 CSV、JSON、Excel 格式，包含錯誤處理" \
  --file src/loaders/data_loader.py

# 生成數據清理器
claude generate \
  --prompt "建立數據清理模組，處理缺失值、重複資料、異常值檢測" \
  --file src/processors/data_cleaner.py

# 生成數據轉換器
claude generate \
  --prompt "建立數據轉換模組，包含標準化、編碼、特徵工程功能" \
  --file src/processors/data_transformer.py
```

#### 步驟 3：分析模組

```bash
# 生成統計分析器
claude generate \
  --prompt "建立統計分析模組，包含描述性統計、相關性分析、分佈檢驗" \
  --file src/analyzers/statistical_analyzer.py

# 生成機器學習管道
claude generate \
  --prompt "建立機器學習管道，包含模型訓練、評估、預測功能" \
  --file src/ml/model_pipeline.py
```

#### 步驟 4：視覺化模組

```bash
# 生成圖表生成器
claude generate \
  --prompt "建立圖表生成模組，使用 matplotlib 和 seaborn，支援各種圖表類型" \
  --file src/visualizers/chart_generator.py

# 生成儀表板
claude generate \
  --prompt "建立互動式儀表板，使用 Plotly Dash，包含過濾和鑽取功能" \
  --file src/dashboard/app.py
```

#### 步驟 5：報告生成

```bash
# 生成報告模組
claude generate \
  --prompt "建立自動報告生成模組，支援 PDF、HTML 格式，包含圖表嵌入" \
  --file src/reporters/report_generator.py

# 生成報告模板
claude generate \
  --prompt "建立報告 HTML 模板，包含公司品牌和響應式設計" \
  --file templates/report_template.html
```

#### 步驟 6：建立測試

```bash
# 生成單元測試
claude test --unit src/processors/data_cleaner.py \
  --framework pytest \
  --include-fixtures

# 生成整合測試
claude test --integration src/ml/model_pipeline.py \
  --framework pytest \
  --include-mock-data
```

### 5.4 專案四：程式碼重構實戰

#### 專案目標
重構一個遺留的程式碼專案，提升程式碼品質、效能和可維護性。

#### 步驟 1：程式碼分析

```bash
# 下載範例遺留程式碼（假設存在）
git clone https://github.com/example/legacy-project.git
cd legacy-project

# 全面程式碼分析
claude analyze --comprehensive . \
  --include-quality \
  --include-security \
  --include-performance \
  --output analysis-report.json
```

#### 步驟 2：制定重構計畫

```bash
# 生成重構建議
claude refactor-plan . \
  --priority high \
  --focus "security,performance,maintainability" \
  --output refactor-plan.md
```

#### 步驟 3：安全性修復

```bash
# 修復安全漏洞
claude refactor src/ \
  --pattern security-fixes \
  --include-sql-injection \
  --include-xss-protection
```

#### 步驟 4：效能優化

```bash
# 優化資料庫查詢
claude refactor src/models/ \
  --pattern performance \
  --focus "database-queries,n+1-problem"

# 優化演算法
claude refactor src/utils/ \
  --pattern algorithm-optimization \
  --target-complexity "O(n)"
```

#### 步驟 5：架構重構

```bash
# 套用設計模式
claude refactor src/ \
  --pattern design-patterns \
  --apply "factory,observer,strategy"

# 模組化重構
claude refactor src/ \
  --pattern modularization \
  --extract-common-code
```

#### 步驟 6：現代化語法

```bash
# 更新到現代語法
claude refactor src/ \
  --modernize \
  --target es2022 \
  --pattern "arrow-functions,template-literals,destructuring"
```

#### 步驟 7：測試覆蓋率提升

```bash
# 生成缺少的測試
claude test --coverage-gap src/ \
  --target-coverage 90 \
  --framework jest
```

#### 步驟 8：文檔更新

```bash
# 更新文檔
claude docs --update . \
  --include-architecture \
  --include-migration-guide
```

---

## 第六章：進階應用

### 6.1 自訂提示模板

#### 建立模板目錄

```bash
# 建立模板目錄
mkdir -p .claude/templates

# 檢視預設模板
claude templates list
```

#### 建立自訂模板

**React 元件模板**

建立 `.claude/templates/react-component.md`：

```markdown
# React 元件模板

請建立一個 React 元件，包含以下特性：

## 基本需求
- 使用 TypeScript
- 包含 Props 介面定義
- 支援 className 擴展
- 包含預設 props

## 樣式需求
- 使用 CSS Modules
- 支援主題變數
- 響應式設計

## 無障礙需求
- 適當的 ARIA 標籤
- 鍵盤導航支援
- 螢幕閱讀器友善

## 元件資訊
- 元件名稱：{{name}}
- 功能描述：{{description}}
- 設計變體：{{variants}}
- 特殊行為：{{behavior}}

請生成完整的元件程式碼，包含：
1. 主要元件檔案 ({{name}}.tsx)
2. 樣式檔案 ({{name}}.module.css)
3. 類型定義 ({{name}}.types.ts)
4. 匯出索引 (index.ts)
```

**API 路由模板**

建立 `.claude/templates/api-route.md`：

```markdown
# API 路由模板

請建立一個 RESTful API 路由，包含以下特性：

## 技術需求
- 使用 {{framework}} 框架
- 包含完整的 CRUD 操作
- 資料驗證和錯誤處理
- 適當的 HTTP 狀態碼

## 安全需求
- 身份驗證檢查
- 授權控制
- 輸入清理和驗證
- 速率限制

## 資源資訊
- 資源名稱：{{resource}}
- 資料模型：{{model}}
- 權限等級：{{permissions}}
- 特殊端點：{{custom_endpoints}}

請生成：
1. 路由檔案
2. 控制器
3. 驗證中介軟體
4. 測試檔案
```

#### 使用自訂模板

```bash
# 使用 React 元件模板
claude generate \
  --template react-component \
  --name Button \
  --description "可自訂的按鈕元件" \
  --variants "primary,secondary,danger" \
  --behavior "loading,disabled"

# 使用 API 路由模板
claude generate \
  --template api-route \
  --framework express \
  --resource users \
  --model User \
  --permissions "admin,user" \
  --custom_endpoints "profile,avatar"
```

### 6.2 批次處理技巧

#### 批次檔案處理

```bash
# 批次分析多個檔案
find src/ -name "*.js" -type f | xargs -I {} claude analyze {}

# 使用 GNU parallel 加速處理
find src/ -name "*.js" | parallel claude analyze {}

# 批次重構檔案
claude refactor src/**/*.js \
  --batch-size 10 \
  --parallel 4
```

#### 腳本化批次操作

建立 `batch-process.sh`：

```bash
#!/bin/bash

# 批次處理腳本
FILES=$(find src/ -name "*.js" -type f)
TOTAL=$(echo "$FILES" | wc -l)
CURRENT=0

echo "開始處理 $TOTAL 個檔案..."

for file in $FILES; do
    CURRENT=$((CURRENT + 1))
    echo "[$CURRENT/$TOTAL] 處理: $file"
    
    # 分析檔案
    claude analyze "$file" --format json > "reports/$(basename $file).json"
    
    # 如果有問題，進行重構
    if claude analyze "$file" --check-issues; then
        echo "  發現問題，進行重構..."
        claude refactor "$file" --auto-fix
    fi
    
    echo "  完成"
done

echo "批次處理完成！"
```

#### 使用配置檔案批次處理

建立 `batch-config.json`：

```json
{
  "tasks": [
    {
      "name": "security-scan",
      "command": "analyze",
      "options": ["--security"],
      "patterns": ["src/**/*.js", "src/**/*.ts"],
      "exclude": ["*.test.js", "*.spec.ts"]
    },
    {
      "name": "modernize",
      "command": "refactor",
      "options": ["--modernize", "--target", "es2022"],
      "patterns": ["src/**/*.js"],
      "exclude": ["node_modules/**"]
    },
    {
      "name": "generate-tests",
      "command": "test",
      "options": ["--unit", "--framework", "jest"],
      "patterns": ["src/**/*.js"],
      "exclude": ["*.test.js"]
    }
  ]
}
```

執行批次任務：

```bash
claude batch --config batch-config.json
```

### 6.3 Git 整合應用

#### Git Hook 整合

建立 `.git/hooks/pre-commit`：

```bash
#!/bin/sh

echo "執行 Claude 程式碼檢查..."

# 取得暫存檔案
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E "\.(js|ts|py)$")

if [ -z "$STAGED_FILES" ]; then
    echo "沒有程式檔案變更"
    exit 0
fi

# 程式碼品質檢查
for file in $STAGED_FILES; do
    echo "檢查: $file"
    
    # Claude 分析
    if ! claude analyze "$file" --strict; then
        echo "❌ $file 未通過品質檢查"
        exit 1
    fi
done

echo "✅ 所有檔案通過檢查"
exit 0
```

#### 自動生成 Commit 訊息

```bash
# 分析變更並生成 commit 訊息
claude commit --auto \
  --analyze-diff \
  --conventional-commits

# 手動指定範圍
claude commit \
  --prompt "修復使用者驗證問題" \
  --type "fix" \
  --scope "auth"
```

#### Pull Request 審查

```bash
# 分析 PR 差異
claude review \
  --diff origin/main..HEAD \
  --focus "security,performance,best-practices"

# 生成審查報告
claude review \
  --pr-number 123 \
  --output pr-review.md
```

#### 建立 GitHub Actions 工作流程

建立 `.github/workflows/claude-review.yml`：

```yaml
name: Claude Code Review

on:
  pull_request:
    branches: [ main, develop ]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install Claude CLI
      run: npm install -g @anthropic-ai/claude-cli
    
    - name: Configure Claude
      env:
        ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
      run: claude config set api-key $ANTHROPIC_API_KEY
    
    - name: Analyze Changed Files
      run: |
        CHANGED_FILES=$(git diff --name-only origin/${{ github.base_ref }}...HEAD | grep -E "\.(js|ts|py)$" || true)
        if [ -n "$CHANGED_FILES" ]; then
          echo "分析變更的檔案:"
          echo "$CHANGED_FILES"
          
          for file in $CHANGED_FILES; do
            if [ -f "$file" ]; then
              claude analyze "$file" --format json > "review-$file.json"
            fi
          done
        fi
    
    - name: Generate Review Report
      run: |
        claude review --diff origin/${{ github.base_ref }}...HEAD \
          --output review-report.md
    
    - name: Comment PR
      uses: actions/github-script@v6
      with:
        script: |
          const fs = require('fs');
          if (fs.existsSync('review-report.md')) {
            const report = fs.readFileSync('review-report.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Claude Code Review\n\n${report}`
            });
          }
```

### 6.4 工作流程自動化

#### 建立工作流程定義

建立 `.claude/workflows/ci-cd.yml`：

```yaml
name: CI/CD 流程
description: 持續整合和部署工作流程

variables:
  coverage_threshold: 80
  quality_gate: strict
  
steps:
  - name: 程式碼分析
    command: analyze
    options:
      - --recursive
      - --quality
      - --security
      - --performance
    paths: ["src/"]
    continue_on_error: false
    
  - name: 測試生成
    command: test
    options:
      - --coverage
      - --threshold
      - "{{ coverage_threshold }}"
    paths: ["src/"]
    depends_on: ["程式碼分析"]
    
  - name: 文檔更新
    command: docs
    options:
      - --update
      - --api
      - --readme
    condition: "on_main_branch"
    
  - name: 品質檢查
    command: quality-gate
    options:
      - --level
      - "{{ quality_gate }}"
    fail_fast: true
    
  - name: 部署準備
    command: build-artifacts
    condition: "quality_passed"
```

#### 執行工作流程

```bash
# 執行完整 CI/CD 流程
claude workflow run ci-cd

# 執行特定步驟
claude workflow run ci-cd --steps "程式碼分析,測試生成"

# 帶參數執行
claude workflow run ci-cd \
  --var coverage_threshold=90 \
  --var quality_gate=strict
```

#### 建立自訂工作流程

```bash
# 建立新工作流程
claude workflow create release \
  --template deployment \
  --steps "test,build,deploy"

# 編輯工作流程
claude workflow edit release
```

### 6.5 團隊協作設定

#### 共享配置管理

建立 `.claude/team-config.json`：

```json
{
  "team": {
    "name": "開發團隊",
    "coding_standards": {
      "language_versions": {
        "javascript": "ES2022",
        "typescript": "4.9+",
        "python": "3.9+"
      },
      "style_guides": {
        "javascript": "airbnb",
        "python": "pep8",
        "typescript": "strict"
      },
      "naming_conventions": {
        "functions": "camelCase",
        "variables": "camelCase",
        "constants": "UPPER_SNAKE_CASE",
        "files": "kebab-case"
      }
    },
    "quality_gates": {
      "test_coverage": 80,
      "complexity_threshold": 10,
      "security_level": "strict"
    },
    "templates": {
      "react_component": ".claude/templates/react-component.md",
      "api_endpoint": ".claude/templates/api-endpoint.md",
      "test_suite": ".claude/templates/test-suite.md"
    }
  }
}
```

#### 匯入團隊配置

```bash
# 匯入團隊配置
claude config import .claude/team-config.json

# 同步團隊標準
claude team sync-standards

# 檢查配置一致性
claude config validate --team
```

#### 建立團隊模板

```bash
# 匯出團隊模板
claude templates export --team > team-templates.zip

# 分享給團隊成員
claude templates import team-templates.zip
```

#### 程式碼審查自動化

建立 `.claude/review-rules.json`：

```json
{
  "review_rules": {
    "automatic_checks": [
      {
        "name": "security_scan",
        "enabled": true,
        "blocking": true,
        "scope": ["src/**/*.js", "src/**/*.ts"]
      },
      {
        "name": "performance_check",
        "enabled": true,
        "blocking": false,
        "scope": ["src/**/*.js"]
      },
      {
        "name": "test_coverage",
        "enabled": true,
        "blocking": true,
        "threshold": 80
      }
    ],
    "manual_review": {
      "required_reviewers": 2,
      "domain_experts": {
        "security": ["@security-team"],
        "database": ["@db-team"],
        "frontend": ["@frontend-team"]
      }
    }
  }
}
```

---

## 第七章：最佳實踐與技巧

### 7.1 如何撰寫有效的提示

#### 提示撰寫原則

**1. 明確具體**
```bash
# ❌ 不好的提示
claude generate --prompt "寫個 API"

# ✅ 好的提示
claude generate \
  --prompt "建立一個 RESTful API 端點，處理使用者註冊，包含 email 驗證、密碼強度檢查，使用 Express.js 和 MongoDB"
```

**2. 提供上下文**
```bash
# ✅ 包含專案背景
claude generate \
  --prompt "在現有的電商網站中，建立一個購物車 API，需要與現有的商品服務和使用者服務整合，支援優惠券計算"
```

**3. 指定技術棧**
```bash
# ✅ 明確技術需求
claude generate \
  --prompt "使用 React 18、TypeScript、Tailwind CSS 建立一個產品卡片元件，支援懶載入圖片和無障礙功能"
```

#### 提示模板範例

**功能開發模板**
```
建立 [功能名稱]

技術需求：
- 框架：[React/Vue/Angular]
- 語言：[JavaScript/TypeScript]
- 樣式：[CSS/SCSS/Tailwind]

功能描述：
- 主要功能：[詳細描述]
- 使用者互動：[點擊、輸入、拖拽等]
- 資料流：[props、state、API]

技術規格：
- 效能需求：[載入時間、記憶體使用]
- 無障礙需求：[WCAG 等級]
- 瀏覽器支援：[Chrome、Firefox、Safari]

範例使用：
[提供具體的使用場景]
```

**除錯模板**
```
除錯問題：[簡述問題]

問題現象：
- 錯誤訊息：[完整錯誤訊息]
- 重現步驟：[1、2、3...]
- 預期行為：[應該如何運作]
- 實際行為：[目前發生什麼]

環境資訊：
- 作業系統：[Windows/macOS/Linux]
- 瀏覽器：[版本資訊]
- Node.js版本：[版本號]

相關程式碼：
[貼上相關的程式碼片段]
```

### 7.2 專案組織結構建議

#### 標準專案結構

```
project/
├── .claude/                    # Claude 配置目錄
│   ├── config.json            # 主要配置
│   ├── templates/             # 自訂模板
│   │   ├── component.md
│   │   └── api.md
│   ├── workflows/             # 工作流程
│   │   ├── ci-cd.yml
│   │   └── release.yml
│   └── prompts/               # 常用提示
│       ├── code-review.md
│       └── refactor.md
├── src/                       # 原始碼
├── tests/                     # 測試檔案
├── docs/                      # 文檔
├── scripts/                   # 腳本檔案
└── .env.example              # 環境變數範例
```

#### 配置檔案最佳實踐

**專案級配置 `.claude/config.json`**
```json
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4096,
  "temperature": 0.3,
  "system_prompt": "你是專業的 {{language}} 開發者，遵循 {{company}} 的程式碼規範",
  "include_patterns": [
    "src/**/*.{js,ts,jsx,tsx}",
    "tests/**/*.{js,ts}",
    "*.md"
  ],
  "exclude_patterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "*.log",
    ".git/**"
  ],
  "custom_commands": {
    "component": "generate --template react-component",
    "api": "generate --template api-endpoint",
    "test": "test --unit --framework jest"
  }
}
```

**團隊共享配置**
```json
{
  "team": {
    "coding_standards": {
      "max_line_length": 80,
      "indent_size": 2,
      "quote_style": "single",
      "semicolons": true
    },
    "quality_gates": {
      "test_coverage": 85,
      "complexity_max": 10,
      "duplication_threshold": 3
    }
  }
}
```

### 7.3 效能優化技巧

#### CLI 效能優化

**1. 快取設定**
```bash
# 啟用回應快取
claude config set cache-enabled true
claude config set cache-ttl 3600

# 清理過期快取
claude cache clean --older-than 7d
```

**2. 並行處理**
```bash
# 設定並行任務數
claude config set parallel-jobs 4

# 使用批次處理
claude analyze src/ --batch-size 10 --parallel
```

**3. 增量處理**
```bash
# 只處理變更的檔案
claude analyze --incremental --since last-commit

# 使用檔案雜湊快取
claude analyze src/ --use-hash-cache
```

#### 提示優化技巧

**1. 模組化提示**
```bash
# 將複雜提示分解為多個步驟
claude generate --prompt-file prompts/step1.md
claude generate --prompt-file prompts/step2.md --context step1-output.js
```

**2. 上下文管理**
```bash
# 限制上下文大小
claude config set context-window 8192

# 智能上下文選擇
claude analyze large-file.js --smart-context
```

### 7.4 安全性考量

#### API 金鑰安全

**1. 環境變數管理**
```bash
# 使用專案特定的環境檔案
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local

# 確保不被版本控制
echo ".env.local" >> .gitignore
```

**2. 金鑰輪換**
```bash
# 定期檢查金鑰狀態
claude config check-key-status

# 設定金鑰過期提醒
claude config set key-rotation-reminder 30d
```

#### 程式碼安全

**1. 敏感資訊保護**
```bash
# 設定敏感檔案過濾
claude config set ignore-patterns "*.env,*.key,secrets/**,*.pem"

# 啟用敏感資訊遮罩
claude config set mask-sensitive-data true
```

**2. 程式碼審查**
```bash
# 安全性掃描
claude analyze --security src/ \
  --check-secrets \
  --check-vulnerabilities \
  --output security-report.json
```

#### 網路安全

**1. 代理設定**
```bash
# 企業代理設定
claude config set proxy http://corporate-proxy:8080
claude config set proxy-auth username:password
```

**2. SSL/TLS 設定**
```bash
# 強制 HTTPS
claude config set force-https true

# 自訂 CA 憑證
claude config set ca-cert-path /path/to/ca-cert.pem
```

### 7.5 常見錯誤避免

#### 配置錯誤

**1. API 金鑰問題**
```bash
# ❌ 常見錯誤：金鑰格式不正確
export ANTHROPIC_API_KEY="ant-api-123..."  # 錯誤格式

# ✅ 正確格式
export ANTHROPIC_API_KEY="sk-ant-api03-..."  # 正確格式

# 驗證金鑰
claude test-connection
```

**2. 路徑問題**
```bash
# ❌ 使用相對路徑
claude analyze ../other-project/src

# ✅ 使用絕對路徑或正確的相對路徑
claude analyze ./src
cd ../other-project && claude analyze ./src
```

#### 提示錯誤

**1. 模糊的需求**
```bash
# ❌ 模糊的提示
claude generate --prompt "幫我寫個函數"

# ✅ 明確的提示
claude generate --prompt "寫一個 JavaScript 函數，接收兩個數字參數，回傳它們的最大公約數，使用歐幾里得演算法"
```

**2. 缺乏上下文**
```bash
# ❌ 沒有上下文
claude refactor src/utils.js

# ✅ 提供上下文
claude refactor src/utils.js \
  --context "這是一個 React 專案的工具函數，需要支援 TypeScript"
```

#### 檔案處理錯誤

**1. 檔案權限**
```bash
# 檢查檔案權限
ls -la src/

# 修正權限問題
chmod 644 src/**/*.js
```

**2. 編碼問題**
```bash
# 指定檔案編碼
claude analyze src/chinese.js --encoding utf-8

# 轉換編碼
iconv -f big5 -t utf-8 old-file.js > new-file.js
```

#### 效能問題

**1. 大檔案處理**
```bash
# ❌ 直接處理大檔案
claude analyze huge-file.js  # 可能超時

# ✅ 分段處理
split -l 1000 huge-file.js chunk_
for chunk in chunk_*; do
  claude analyze "$chunk"
done
```

**2. 記憶體使用**
```bash
# 監控記憶體使用
claude config set memory-limit 4096

# 使用流式處理
claude analyze --stream src/
```

---

## 附錄

### A. 命令快速參考

#### 基本命令

| 命令 | 語法 | 說明 |
|------|------|------|
| `generate` | `claude generate --prompt "..."` | 生成程式碼 |
| `analyze` | `claude analyze [檔案/目錄]` | 分析程式碼 |
| `refactor` | `claude refactor [檔案] --style [風格]` | 重構程式碼 |
| `test` | `claude test --unit [檔案]` | 生成測試 |
| `docs` | `claude docs --api [目錄]` | 生成文檔 |
| `config` | `claude config set [key] [value]` | 設定配置 |

#### 常用選項

| 選項 | 說明 | 範例 |
|------|------|------|
| `--file` | 輸出檔案 | `--file output.js` |
| `--language` | 程式語言 | `--language typescript` |
| `--framework` | 框架 | `--framework react` |
| `--template` | 模板 | `--template component` |
| `--recursive` | 遞歸處理 | `--recursive src/` |
| `--output` | 輸出檔案 | `--output report.json` |
| `--format` | 輸出格式 | `--format json` |

### B. 常見問題 FAQ

#### 安裝相關

**Q: npm install 失敗怎麼辦？**

A: 
```bash
# 清除 npm 快取
npm cache clean --force

# 使用不同的登錄表
npm install -g @anthropic-ai/claude-cli --registry https://registry.npmjs.org/

# 使用 yarn 替代
yarn global add @anthropic-ai/claude-cli
```

**Q: 命令找不到怎麼辦？**

A:
```bash
# 檢查全域安裝路徑
npm config get prefix

# 將路徑加入 PATH
export PATH=$PATH:$(npm config get prefix)/bin

# 或使用 npx
npx @anthropic-ai/claude-cli --version
```

#### 使用相關

**Q: API 請求失敗怎麼辦？**

A:
```bash
# 檢查網路連線
curl -I https://api.anthropic.com

# 檢查 API 金鑰
claude config get api-key

# 測試連線
claude test-connection

# 檢查 API 使用量
claude usage --current-month
```

**Q: 生成的程式碼品質不佳？**

A:
- 改善提示的具體性和明確性
- 提供更多上下文資訊
- 使用自訂模板
- 調整 temperature 參數 (降低創意度)
- 使用更強大的模型 (claude-3-opus)

#### 效能相關

**Q: 處理速度太慢？**

A:
```bash
# 啟用快取
claude config set cache-enabled true

# 增加並行處理
claude config set parallel-jobs 4

# 使用增量處理
claude analyze --incremental src/

# 限制處理範圍
claude analyze src/ --include "*.js" --exclude "*test.js"
```

### C. 設定檔案範例

#### 完整專案配置

`.claude/config.json`:
```json
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4096,
  "temperature": 0.3,
  "system_prompt": "你是專業的 {{language}} 開發者，請遵循最佳實踐和團隊規範",
  "include_patterns": [
    "src/**/*.{js,ts,jsx,tsx,vue,py,java,go,rs}",
    "tests/**/*.{js,ts,py}",
    "docs/**/*.md",
    "*.{md,json,yaml,yml}"
  ],
  "exclude_patterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "target/**",
    "venv/**",
    "__pycache__/**",
    "*.log",
    "*.tmp",
    ".git/**",
    ".cache/**"
  ],
  "custom_commands": {
    "comp": "generate --template react-component",
    "api": "generate --template api-endpoint",
    "test": "test --unit --framework jest --coverage 85",
    "review": "analyze --quality --security --performance"
  },
  "quality_gates": {
    "test_coverage": 85,
    "complexity_threshold": 10,
    "security_level": "strict",
    "performance_budget": {
      "bundle_size": "500kb",
      "load_time": "3s"
    }
  },
  "team_settings": {
    "coding_standards": "airbnb",
    "naming_convention": "camelCase",
    "max_line_length": 100,
    "indent_size": 2,
    "quote_style": "single"
  }
}
```

#### 語言特定配置

**JavaScript/TypeScript 專案**:
```json
{
  "language": "typescript",
  "framework": "react",
  "build_tool": "vite",
  "test_framework": "vitest",
  "style_framework": "tailwind",
  "linting": {
    "eslint": true,
    "prettier": true,
    "rules": "strict"
  }
}
```

**Python 專案**:
```json
{
  "language": "python",
  "version": "3.9+",
  "framework": "fastapi",
  "orm": "sqlalchemy",
  "test_framework": "pytest",
  "code_style": "black",
  "linting": {
    "flake8": true,
    "mypy": true,
    "bandit": true
  }
}
```

### D. 延伸學習資源

#### 官方資源

- [Claude API 文檔](https://docs.anthropic.com/claude/reference)
- [Claude Code 官方文檔](https://docs.claude.com/en/docs/claude-code)
- [Anthropic 開發者社群](https://community.anthropic.com/)

#### 社群資源

- [Claude Code GitHub](https://github.com/anthropics/claude-cli)
- [範例專案庫](https://github.com/anthropics/claude-cli-examples)
- [最佳實踐指南](https://github.com/anthropics/claude-best-practices)

#### 相關工具

- [Visual Studio Code](https://code.visualstudio.com/)
- [Claude for VSCode](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-dev)
- [GitHub Copilot](https://github.com/features/copilot)

#### 程式設計學習

- [MDN Web Docs](https://developer.mozilla.org/)
- [Python 官方文檔](https://docs.python.org/)
- [Node.js 官方指南](https://nodejs.org/en/docs/)
- [React 官方教學](https://reactjs.org/tutorial/)

---

## 💡 學習建議

### 初學者路徑

1. **第一週：環境建置**
   - 完成第二章的安裝設定
   - 熟悉基本命令
   - 嘗試簡單的程式碼生成

2. **第二週：核心功能**
   - 學習第四章的各種功能
   - 練習不同類型的程式碼分析
   - 嘗試簡單的重構任務

3. **第三週：實戰練習**
   - 完成第五章的至少一個專案
   - 學習模板的使用
   - 練習批次處理

4. **第四週：進階應用**
   - 學習第六章的進階功能
   - 建立自己的工作流程
   - 整合到日常開發工作

### 快速上手路徑

如果你已有命令列經驗：

1. 快速完成安裝和設定（30分鐘）
2. 嘗試核心功能（1小時）
3. 完成一個實戰專案（2-3小時）
4. 學習進階功能（根據需要）

### 團隊導入建議

1. **準備階段**（1週）
   - 管理員完成環境測試
   - 制定團隊標準和模板
   - 建立共享配置

2. **試點階段**（2週）
   - 小團隊先行使用
   - 收集反饋和問題
   - 調整配置和流程

3. **全面導入**（4週）
   - 團隊培訓
   - 工作流程整合
   - 持續優化

---

**準備好開始了嗎？** 👉 從安裝開始：[第二章：安裝與設定](#第二章安裝與設定)

**想看實際應用？** 👉 直接跳到：[第五章：實戰專案](#第五章實戰專案)

**需要快速查找？** 👉 查看：[附錄 A：命令快速參考](#a-命令快速參考)

祝你使用愉快！🚀