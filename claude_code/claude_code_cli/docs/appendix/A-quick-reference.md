# A. 命令快速參考

## 常用命令速查表

### 基本操作

```bash
# 查看版本
claude --version

# 查看幫助
claude --help

# 查看特定命令幫助
claude generate --help

# 測試 API 連線
claude test-connection
```

### 程式碼生成

```bash
# 生成程式碼（輸出到終端）
claude generate --prompt "建立一個計算器類別"

# 生成程式碼並儲存到檔案
claude generate --file app.js --prompt "建立 Express 伺服器"

# 使用模板生成
claude generate --template component --name Button
```

### 程式碼分析

```bash
# 分析單一檔案
claude analyze src/main.js

# 分析整個目錄
claude analyze --recursive src/

# 分析並自動修正
claude analyze --fix src/

# 指定格式輸出
claude analyze --format json src/main.js
```

### 程式碼重構

```bash
# 重構檔案
claude refactor src/legacy.js

# 指定重構風格
claude refactor --style modern src/

# 優化效能
claude optimize --file src/utils.js

# 現代化語法
claude modernize --target es2022 src/
```

### 測試生成

```bash
# 生成單元測試
claude test --unit src/utils.js

# 生成整合測試
claude test --integration src/api/

# 生成測試覆蓋率報告
claude test --coverage src/

# 生成 Mock 資料
claude mock --schema user.json
```

### 文檔生成

```bash
# 生成 README
claude docs --readme

# 生成 API 文檔
claude docs --api src/

# 為函數加註解
claude comment --file src/main.js

# 更新現有文檔
claude docs --update
```

### 批次處理

```bash
# 批次分析
find src/ -name "*.js" | xargs claude analyze

# 批次重構
claude refactor src/**/*.js

# 批次測試
claude test --batch src/**/*.js
```

## 常用參數

| 參數 | 說明 | 範例 |
|------|------|------|
| `--prompt` | 指定提示內容 | `--prompt "建立 API"` |
| `--file` | 指定檔案 | `--file app.js` |
| `--output` | 指定輸出檔案 | `--output result.js` |
| `--format` | 指定輸出格式 | `--format json` |
| `--recursive` | 遞迴處理目錄 | `--recursive src/` |
| `--fix` | 自動修正問題 | `--fix` |
| `--strict` | 嚴格模式 | `--strict` |

## 配置命令

```bash
# 設定 API 金鑰
claude config set api-key YOUR_KEY

# 查看設定
claude config get api-key

# 設定模型
claude config set model claude-3-sonnet-20240229

# 設定最大 tokens
claude config set max-tokens 4096

# 重置配置
claude config reset
```

## 環境變數

```bash
# API 金鑰
export ANTHROPIC_API_KEY="your-api-key"

# 設定模型
export CLAUDE_MODEL="claude-3-sonnet-20240229"

# 設定輸出格式
export CLAUDE_OUTPUT_FORMAT="json"
```

## 快捷腳本範例

### 每日程式碼檢查
```bash
#!/bin/bash
# daily-check.sh
claude analyze --strict src/
claude test --coverage
claude docs --update
```

### Git Pre-commit Hook
```bash
#!/bin/bash
# .git/hooks/pre-commit
FILES=$(git diff --cached --name-only --diff-filter=ACM | grep "\.js$")
echo "$FILES" | xargs claude analyze --strict
```

### 自動化部署前檢查
```bash
#!/bin/bash
# pre-deploy.sh
claude analyze --strict src/ &&
claude test --coverage &&
claude docs --api src/ &&
echo "✅ 部署前檢查通過"
```

---

## 導航

- **返回**: [附錄目錄](./README.md)
- **下一節**: [B. 常見問題 FAQ](./B-faq.md)
