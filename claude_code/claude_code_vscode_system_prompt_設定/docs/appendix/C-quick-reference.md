# C. 快速參考

## 📋 快速查詢表

### CLAUDE.md 基本結構

```markdown
# 專案名稱:[您的專案名稱]

## 🎯 專案概觀
[簡短描述專案目標]

## ⚙️ 技術棧
- **語言**: [程式語言]
- **框架**: [使用的框架]
- **其他工具**: [相關工具]

## 📏 編碼規範
- [規範 1]
- [規範 2]
- [規範 3]

## 🚫 禁止事項
- ❌ [不要做的事 1]
- ❌ [不要做的事 2]

## 🏗️ 專案結構
\`\`\`
src/
├── components/
├── utils/
└── types/
\`\`\`
```

---

## 🎯 常用 Emoji 符號

| Emoji | 用途 | 範例 |
|:------|:-----|:-----|
| 🎯 | 目標、重點 | `## 🎯 專案目標` |
| ⚙️ | 技術、設定 | `## ⚙️ 技術棧` |
| 📏 | 規範、規則 | `## 📏 編碼規範` |
| 🚫 | 禁止事項 | `## 🚫 禁止事項` |
| 🏗️ | 架構、結構 | `## 🏗️ 專案結構` |
| ✅ | 正確做法 | `// ✅ 正確` |
| ❌ | 錯誤做法 | `// ❌ 錯誤` |
| 🔗 | 連結、整合 | `## 🔗 API 規則` |
| 🧪 | 測試 | `## 🧪 測試要求` |
| 📝 | 文件 | `## 📝 文件規範` |
| 🔒 | 安全 | `## 🔒 安全性` |
| ⚡ | 效能 | `## ⚡ 效能優化` |

---

## 🔧 設定層級速查

### VSCode 擴充套件

| 層級 | 檔案位置 | 優先級 | 用途 |
|:-----|:---------|:-------|:-----|
| 資料夾 | `src/*/CLAUDE.md` | 最高 | 特定模組規則 |
| 專案 | `CLAUDE.md` | 高 | 專案規範 |
| 工作區 | `.vscode/settings.json` | 中 | 工作區設定 |
| 使用者 | VS Code 設定 | 低 | 個人偏好 |

### CLI 工具（額外支援）

| 層級 | 檔案位置 | 用途 |
|:-----|:---------|:-----|
| 命令列 | `--append-system-prompt` | 單次執行 |
| 資料夾 | `src/*/CLAUDE.md` | 特定模組 |
| 專案 | `CLAUDE.md` | 專案規範 |
| 專案配置 | `.claude/settings.json` | CLI 專案設定 |
| 自訂指令 | `.claude/commands/*.md` | Slash Commands |
| Prompt 模板 | `.claude/prompts/*.md` | 可重用模板 |
| 全域文件 | `~/.claude/CLAUDE.md` | 所有專案預設 |
| 全域配置 | `~/.claude/settings.json` | CLI 全域設定 |

> **詳細說明:** [2.5 .claude/ 目錄設定完整指南](../chapter2/2.5-claude-directory.md)

---

## 💻 CLI 指令速查

### 基本指令

```bash
# 基本對話
claude -p "您的請求"

# 附加 System Prompt
claude -p "建立元件" --append-system-prompt "使用 TypeScript"

# 指定模型
claude -p "重構程式碼" --model claude-sonnet-4-5

# 批次處理
claude batch -f requests.txt
```

### 設定管理

```bash
# 初始化專案設定
claude init

# 查看目前設定
claude config list

# 設定全域值
claude config set system_prompt "使用繁體中文"

# 查看特定設定
claude config get system_prompt
```

### MCP 伺服器

```bash
# 新增 MCP 伺服器
claude mcp add my-server http://localhost:8080

# 列出 MCP 伺服器
claude mcp list

# 移除 MCP 伺服器
claude mcp remove my-server
```

### 自訂指令 (Slash Commands)

```bash
# 使用自訂指令
claude /review src/userService.ts

# 建立新指令檔案
mkdir -p .claude/commands
echo "指令內容" > .claude/commands/mycommand.md

# 列出可用指令
ls .claude/commands/
```

---

## 📝 常用範本片段

### 技術棧範本

#### React + TypeScript
```markdown
## ⚙️ 技術棧
- **語言**: TypeScript 5.0+
- **框架**: React 18
- **狀態管理**: Zustand
- **樣式**: Tailwind CSS
- **建置**: Vite
```

#### Node.js 後端
```markdown
## ⚙️ 技術棧
- **語言**: TypeScript 5.0+
- **框架**: Express.js
- **資料庫**: PostgreSQL
- **ORM**: Prisma
- **驗證**: JWT
```

#### Python 資料分析
```markdown
## ⚙️ 技術棧
- **語言**: Python 3.11+
- **資料處理**: pandas, numpy
- **視覺化**: matplotlib, seaborn
- **機器學習**: scikit-learn
- **Notebook**: Jupyter
```

---

### 編碼規範範本

#### TypeScript 規範
```markdown
## 📏 編碼規範
### TypeScript
- 啟用嚴格模式 (`strict: true`)
- 避免使用 `any`，優先 `unknown`
- 使用 `interface` 定義物件
- 使用 `type` 定義聯合型別

### 命名慣例
- 變數/函數: camelCase
- 元件: PascalCase
- 常數: UPPER_SNAKE_CASE
- 檔案: kebab-case
```

#### Python 規範
```markdown
## 📏 編碼規範
### Python
- 遵循 PEP 8 風格指南
- 使用 4 空格縮排
- 最大行寬 88 字元（Black 格式化器）
- 使用 type hints

### 命名慣例
- 變數/函數: snake_case
- 類別: PascalCase
- 常數: UPPER_SNAKE_CASE
- 私有成員: _leading_underscore
```

---

### 禁止事項範本

```markdown
## 🚫 禁止事項

### 不要使用的技術
- ❌ Class Components（使用 Function Components）
- ❌ `any` 型別（使用具體型別）
- ❌ CSS-in-JS（使用 Tailwind）

### 不要的做法
- ❌ 直接在元件內呼叫 API
  ✅ 使用 service 層

- ❌ 直接修改 state
  ✅ 使用 immutable 更新

- ❌ 深層巢狀邏輯
  ✅ 拆分成小函數
```

---

### 專案結構範本

#### React 專案
```markdown
## 🏗️ 專案結構
\`\`\`
src/
├── components/      # UI 元件
│   ├── common/     # 通用元件
│   └── features/   # 功能元件
├── pages/          # 頁面
├── hooks/          # 自訂 Hooks
├── stores/         # 狀態管理
├── services/       # API 服務
├── utils/          # 工具函數
└── types/          # 型別定義
\`\`\`
```

#### Node.js API
```markdown
## 🏗️ 專案結構
\`\`\`
src/
├── controllers/    # 控制器
├── services/       # 業務邏輯
├── models/         # 資料模型
├── middlewares/    # 中介軟體
├── routes/         # 路由定義
├── utils/          # 工具函數
└── config/         # 配置檔
\`\`\`
```

---

## 🔍 問題診斷檢查表

### AI 未遵循規範
- [ ] 檢查檔案名稱是否為 `CLAUDE.md`（大小寫正確）
- [ ] 確認檔案位於專案根目錄
- [ ] 規範描述是否清晰明確
- [ ] 是否有提供範例
- [ ] 檔案是否過長（建議 < 1000 行）

### 資料夾層級設定無效
- [ ] 確認子資料夾有 `CLAUDE.md`
- [ ] 檢查您正在編輯子資料夾下的檔案
- [ ] 驗證子資料夾設定內容正確

### CLI 和 VSCode 行為不同
- [ ] 檢查 CLI 全域設定 (`~/.claude/CLAUDE.md`)
- [ ] 確認是否使用命令列參數
- [ ] 查看 `.claude/settings.json`

---

## 📊 版本控制建議

### 應加入 Git 的檔案
```bash
# 加入版本控制
git add CLAUDE.md
git add src/*/CLAUDE.md
git add .claude/commands/
```

### 應忽略的檔案
```gitignore
# .gitignore
.claude/cache/
.claude/*.log
```

### 提交訊息範例
```bash
git commit -m "docs: 更新 CLAUDE.md 編碼規範"
git commit -m "feat: 新增 admin 模組的 CLAUDE.md 設定"
git commit -m "refactor: 簡化 CLAUDE.md 結構"
```

---

## 🔗 快速連結

### 核心章節
- [建立第一個 CLAUDE.md](../chapter2/2.2-create-first-claude-md.md)
- [完整範例解析](../chapter2/2.3-complete-example.md)
- [VSCode vs CLI 差異](../chapter2/2.4-vscode-vs-cli.md)

### 實用範例
- [React + TypeScript](../chapter4/4.1-react-typescript.md)
- [Node.js 後端](../chapter4/4.2-nodejs-backend.md)
- [Python 資料分析](../chapter4/4.3-python-data-analysis.md)
- [全端開發](../chapter4/4.4-fullstack.md)

### 進階技巧
- [動態調整 System Prompt](../chapter5/5.1-dynamic-adjustment.md)
- [團隊協作設定](../chapter5/5.3-team-collaboration.md)
- [多語言專案處理](../chapter5/5.4-multilingual-projects.md)

---

## 📱 行動裝置提示

在行動裝置上編輯 CLAUDE.md 時：
1. 使用支援 Markdown 的編輯器
2. 保持格式簡潔
3. 測試後再提交
4. 使用 Git 行動 App 管理

---

## 🎓 學習路徑

### 初學者
1. [什麼是 System Prompt](../chapter1/1.1-what-is-system-prompt.md)
2. [建立第一個 CLAUDE.md](../chapter2/2.2-create-first-claude-md.md)
3. [查看範例](../chapter4/README.md)

### 中級使用者
1. [資料夾層級設定](../chapter3/README.md)
2. [VSCode vs CLI](../chapter2/2.4-vscode-vs-cli.md)
3. [動態調整](../chapter5/5.1-dynamic-adjustment.md)

### 進階使用者
1. [團隊協作](../chapter5/5.3-team-collaboration.md)
2. [多語言專案](../chapter5/5.4-multilingual-projects.md)
3. [測試整合](../chapter5/5.5-testing-integration.md)

---

## 💡 實用技巧

### 快速測試設定
```bash
# VSCode
打開 Claude Code → 輸入測試請求 → 檢查回應

# CLI
claude -p "建立一個測試元件" --verbose
```

### 除錯 System Prompt
```bash
# 查看實際使用的 prompt
claude debug prompt

# 查看設定載入順序
claude debug config
```

### 效能優化
- 保持 CLAUDE.md 簡潔（< 1000 行）
- 使用清晰的標題結構
- 避免重複內容
- 定期清理過時規則

## 導航

- **上一頁**: [B. 常見問題與最佳實踐](./B-faq.md)
- **下一頁**: [D. 相關資源](./D-resources.md)
- **返回**: [教材首頁](../../README.md)
