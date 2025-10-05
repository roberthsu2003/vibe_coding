# A. 與其他 AI 編輯器比較

## 💡 概述

本附錄比較 Claude Code 與其他主流 AI 編輯器在 System Prompt 設定方面的差異。

---

## 📊 主要 AI 編輯器對照表

| 功能 | Claude Code | Cursor | GitHub Copilot | Gemini Code Assist |
|:-----|:-----------|:-------|:--------------|:------------------|
| **System Prompt 支援** | ✅ CLAUDE.md | ✅ .cursorrules | ⚠️ 有限支援 | ✅ .gemini/config |
| **專案層級設定** | ✅ 完整支援 | ✅ 完整支援 | ❌ 不支援 | ✅ 完整支援 |
| **資料夾層級設定** | ✅ 支援 | ❌ 不支援 | ❌ 不支援 | ✅ 支援 |
| **全域設定** | ✅ CLI 支援 | ✅ 設定檔 | ✅ 設定檔 | ✅ 設定檔 |
| **檔案格式** | Markdown | 純文字 | JSON | YAML/JSON |
| **版本控制友善** | ✅ 是 | ✅ 是 | ⚠️ 部分 | ✅ 是 |
| **動態調整** | ✅ CLI 參數 | ❌ 不支援 | ❌ 不支援 | ⚠️ 有限 |

---

## 🔍 詳細比較

### 1. Claude Code

**優勢:**
- ✅ 使用標準 Markdown 格式，易讀易寫
- ✅ 支援資料夾層級的細粒度控制
- ✅ CLI 工具提供強大的動態調整能力
- ✅ 官方文件完整

**劣勢:**
- ❌ 相對較新，社群資源較少
- ❌ 需要學習特定的 Markdown 結構

**檔案範例:**
```markdown
# 專案名稱

## 技術棧
- React + TypeScript

## 編碼規範
- 使用 Function Components
```

---

### 2. Cursor

**優勢:**
- ✅ 設定簡單直觀
- ✅ 大量社群範例
- ✅ 整合度高

**劣勢:**
- ❌ 不支援資料夾層級設定
- ❌ 純文字格式，缺少結構化

**檔案範例:** `.cursorrules`
```
Use React Function Components
Write in TypeScript
Use 2 spaces for indentation
```

---

### 3. GitHub Copilot

**優勢:**
- ✅ GitHub 生態系統整合
- ✅ 龐大的使用者基數

**劣勢:**
- ❌ System Prompt 支援有限
- ❌ 主要依賴程式碼上下文
- ❌ 客製化能力較弱

**設定方式:**
```json
{
  "github.copilot.advanced": {
    "authProvider": "github",
    "inlineSuggest.enable": true
  }
}
```

---

### 4. Gemini Code Assist

**優勢:**
- ✅ Google 雲端整合
- ✅ 支援多種配置格式

**劣勢:**
- ❌ 文件相對較少
- ❌ 設定較複雜

**檔案範例:** `.gemini/config.yaml`
```yaml
project:
  language: typescript
  framework: react
rules:
  - use_function_components
  - strict_typescript
```

---

## 🎯 選擇建議

### 選擇 Claude Code 的情境
- ✅ 需要精細的資料夾層級控制
- ✅ 喜歡 Markdown 格式
- ✅ 需要 CLI 工具支援
- ✅ 重視官方支援和文件

### 選擇 Cursor 的情境
- ✅ 需要簡單快速的設定
- ✅ 有豐富的社群資源
- ✅ 不需要複雜的層級設定

### 選擇 GitHub Copilot 的情境
- ✅ 深度使用 GitHub 生態系統
- ✅ 不需要複雜的 System Prompt
- ✅ 主要依賴程式碼建議

### 選擇 Gemini Code Assist 的情境
- ✅ 使用 Google Cloud Platform
- ✅ 需要企業級支援
- ✅ 偏好 YAML 配置

---

## 🔄 遷移指南

### 從 Cursor 遷移到 Claude Code

**步驟 1:** 轉換 `.cursorrules` 到 `CLAUDE.md`

**原始檔案 (`.cursorrules`):**
```
Use React Function Components
Write in TypeScript
Use 2 spaces for indentation
Comments in Traditional Chinese
```

**轉換後 (`CLAUDE.md`):**
```markdown
# 專案設定

## 技術棧
- React (Function Components)
- TypeScript

## 編碼規範
- 使用 2 空格縮排
- 註解使用繁體中文
```

---

## 📚 延伸閱讀

- [Cursor Rules 官方文件](https://cursor.sh/docs)
- [GitHub Copilot 文件](https://docs.github.com/copilot)
- [Gemini Code Assist 文件](https://cloud.google.com/gemini/docs)

## 導航

- **上一頁**: [附錄首頁](./README.md)
- **下一頁**: [B. 常見問題與最佳實踐](./B-faq.md)
- **返回**: [教材首頁](../../README.md)
