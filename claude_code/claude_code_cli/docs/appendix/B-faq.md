# B. 常見問題 FAQ

## 安裝與設定

### Q: 如何確認 Claude CLI 已正確安裝？

**A**: 執行以下命令檢查：
```bash
claude --version
```
如果顯示版本號就代表安裝成功。

### Q: API 金鑰設定後仍然無法連線？

**A**: 檢查以下事項：
1. 確認金鑰格式正確（`sk-ant-api03-...`）
2. 檢查網路連線
3. 確認訂閱方案仍有效
4. 重新設定環境變數

```bash
# 重新設定金鑰
unset ANTHROPIC_API_KEY
export ANTHROPIC_API_KEY="your-correct-key"
claude test-connection
```

### Q: 安裝時出現權限錯誤怎麼辦？

**A**:
```bash
# macOS/Linux: 設定 npm 全域目錄
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Windows: 以系統管理員身分執行 PowerShell
```

## 使用問題

### Q: 生成的程式碼品質不佳？

**A**: 改善提示的具體性：

❌ **不好的提示**：
```bash
claude generate --prompt "寫個函數"
```

✅ **好的提示**：
```bash
claude generate --prompt "寫一個 JavaScript 函數，用於驗證 email 格式，使用正規表達式，包含錯誤處理和使用範例"
```

### Q: 如何處理大型專案？

**A**:
```bash
# 使用檔案過濾
claude config set include-patterns "src/**/*.js,src/**/*.ts"
claude config set exclude-patterns "node_modules/**,dist/**"

# 批次處理
claude analyze --batch-size 10 src/

# 使用增量分析
claude analyze --incremental
```

### Q: 命令執行很慢怎麼辦？

**A**:
```bash
# 啟用快取
claude config set cache-enabled true

# 調整 token 限制
claude config set max-tokens 2048

# 檢查網路連線速度
ping api.anthropic.com
```

### Q: 如何批次處理多個檔案？

**A**:
```bash
# 方法 1: 使用 xargs
find src/ -name "*.js" | xargs claude analyze

# 方法 2: 使用 for 迴圈
for file in src/*.js; do
  claude refactor "$file"
done

# 方法 3: 使用 glob pattern
claude analyze src/**/*.js
```

## 功能使用

### Q: 如何自訂輸出格式？

**A**:
```bash
# JSON 格式
claude analyze --format json src/main.js

# Markdown 格式
claude docs --format markdown

# 自訂模板
claude generate --template custom --output-format yaml
```

### Q: 如何整合到 Git workflow？

**A**: 建立 Git hooks：

`.git/hooks/pre-commit`:
```bash
#!/bin/bash
FILES=$(git diff --cached --name-only | grep "\.js$")
if [ -n "$FILES" ]; then
  echo "$FILES" | xargs claude analyze --strict
  if [ $? -ne 0 ]; then
    exit 1
  fi
fi
```

### Q: 如何產生自動化腳本？

**A**:
```bash
# 建立每日檢查腳本
cat > daily-check.sh << 'EOF'
#!/bin/bash
echo "🔍 開始程式碼檢查..."
claude analyze --strict src/
claude test --coverage
claude docs --update
echo "✅ 檢查完成！"
EOF

chmod +x daily-check.sh
```

## 錯誤處理

### Q: "API rate limit exceeded" 錯誤

**A**:
- 等待一段時間後重試
- 檢查 API 使用量配額
- 考慮升級訂閱方案

### Q: "Model not found" 錯誤

**A**:
```bash
# 檢查可用模型
claude models list

# 設定正確的模型
claude config set model claude-3-sonnet-20240229
```

### Q: 輸出亂碼問題

**A**:
```bash
# Windows: 設定編碼
chcp 65001

# macOS/Linux: 檢查 locale
export LANG=zh_TW.UTF-8
```

## 最佳實踐

### Q: 如何保護 API 金鑰安全？

**A**:
1. 使用環境變數
2. 將 `.env` 加入 `.gitignore`
3. 定期更換金鑰
4. 不要在程式碼中硬編碼

```bash
# .gitignore
.env
.claude/config.json
```

### Q: 團隊如何共享配置？

**A**:
```bash
# 匯出配置
claude config export team-config.json

# 團隊成員匯入
claude config import team-config.json
```

### Q: 如何優化執行效能？

**A**:
```bash
# 啟用快取
claude config set cache-enabled true

# 設定並行處理
claude config set parallel-jobs 4

# 使用增量處理
claude analyze --incremental
```

## 進階問題

### Q: 如何建立自訂模板？

**A**:
```bash
# 建立模板目錄
mkdir -p .claude/templates

# 建立模板檔案
cat > .claude/templates/api-route.md << 'EOF'
請建立 Express API 路由：
- 路徑：{{path}}
- 方法：{{method}}
- 功能：{{description}}
EOF

# 使用模板
claude generate --template api-route \
  --path "/users" \
  --method "GET" \
  --description "取得所有使用者"
```

### Q: 如何整合 CI/CD？

**A**: GitHub Actions 範例：
```yaml
name: Code Quality
on: [push]
jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
      - name: Install Claude CLI
        run: npm install -g @anthropic-ai/claude-cli
      - name: Run Analysis
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          claude analyze --strict src/
          claude test --coverage
```

---

## 導航

- **上一節**: [A. 命令快速參考](./A-quick-reference.md)
- **下一節**: [C. 延伸學習資源](./C-resources.md)
- **返回**: [附錄目錄](./README.md)
