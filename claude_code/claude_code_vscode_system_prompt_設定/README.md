# 🚀 Claude Code For VSCode 的 System Prompt 設定指南

> 本指南將詳細說明如何為 Claude Code VSCode 擴充套件設定系統提示(System Prompt),讓 AI 助手更了解您的專案需求並提供更精準的協助。

---

## 📚 教材結構

### 🎯 [第一章:System Prompt 基礎概念](./docs/chapter1/README.md)

了解 System Prompt 的基本概念、重要性以及設定方式概覽

- [1.1 什麼是 System Prompt](./docs/chapter1/1.1-what-is-system-prompt.md)
- [1.2 為什麼 System Prompt 很重要](./docs/chapter1/1.2-why-important.md)
- [1.3 Claude Code 的設定方式概覽](./docs/chapter1/1.3-setup-overview.md)

### 📁 [第二章:專案層級設定 (CLAUDE.md)](./docs/chapter2/README.md)

深入學習如何建立和使用專案層級的 `CLAUDE.md` 檔案

- [2.1 CLAUDE.md 核心概念](./docs/chapter2/2.1-claude-md-concept.md)
- [2.2 建立第一個 CLAUDE.md](./docs/chapter2/2.2-create-first-claude-md.md)
- [2.3 完整範例解析](./docs/chapter2/2.3-complete-example.md)

### 📂 [第三章:資料夾層級設定](./docs/chapter3/README.md)

學習如何為特定資料夾建立專屬的 System Prompt 設定

- 3.1 資料夾層級設定概念
- 3.2 實際應用場景
- 3.3 階層化設定實戰

### 📚 [第四章:實用 System Prompt 範例集](./docs/chapter4/README.md)

各種技術棧的完整範例,可直接使用或根據需求調整

- 4.1 React + TypeScript 前端開發
- 4.2 Node.js 後端開發
- 4.3 Python 資料分析
- 4.4 全端開發統一規範

### 🎯 [第五章:進階技巧](./docs/chapter5/README.md)

System Prompt 的進階應用技巧

- 5.1 動態調整 System Prompt
- 5.2 專案特定上下文
- 5.3 團隊協作設定
- 5.4 多語言專案處理
- 5.5 測試要求整合

### 📖 [附錄](./docs/appendix/README.md)

其他參考資料和常見問題

- A. 與其他 AI 編輯器比較
- B. 常見問題與最佳實踐
- C. 快速參考
- D. 相關資源

---

## 🚀 快速開始

### 5 分鐘快速設定

1. **建立檔案**
   ```bash
   # 在專案根目錄建立 CLAUDE.md
   touch CLAUDE.md
   ```

2. **基本模板**
   ```markdown
   # 專案名稱:[您的專案名稱]

   ## 🎯 專案概觀
   [簡短描述專案目標]

   ## ⚙️ 技術棧
   - 程式語言:[例如 TypeScript]
   - 框架:[例如 React]

   ## 📏 編碼規範
   - [規範 1]
   - [規範 2]

   ## 🚫 禁止事項
   - [禁止項目 1]
   - [禁止項目 2]
   ```

3. **測試設定**

   開啟 Claude Code,測試是否正確套用設定

---

## 📊 設定層級一覽

| 設定類型 | 檔案位置 | 影響範圍 | 優先級 |
|:---------|:---------|:---------|:-------|
| **專案層級** | `CLAUDE.md` | 整個專案 | 高 |
| **資料夾層級** | `src/*/CLAUDE.md` | 特定資料夾 | 最高 |
| **VS Code 設定** | `.vscode/settings.json` | 工作區 | 中 |

---

## 💡 為什麼使用 Claude Code System Prompt?

### ⚡ 提升開發效率
- 減少重複說明相同的需求
- AI 自動遵循編碼規範
- 快速產生符合專案風格的程式碼

### 🎯 保持一致性
- 整個專案維持統一風格
- 團隊成員使用相同標準
- 減少 Code Review 時間

### ✨ 提高程式碼品質
- 強制執行最佳實踐
- 自動包含錯誤處理
- 確保適當的文件和註解

---

## 🔗 官方文件參考

- [Claude Code 官方文件](https://docs.claude.com/en/docs/claude-code)
- [Claude Code VSCode 擴充套件](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
- [Claude Code IDE 整合說明](https://docs.claude.com/en/docs/claude-code/ide-integrations)

---

## 📋 學習路徑建議

### 初學者路徑 🌱
1. 閱讀 [第一章](./docs/chapter1/README.md) 了解基礎概念
2. 跟著 [2.2 建立第一個 CLAUDE.md](./docs/chapter2/2.2-create-first-claude-md.md) 動手實作
3. 參考 [第四章](./docs/chapter4/README.md) 的範例進行調整

### 進階使用者路徑 🚀
1. 直接查看 [2.3 完整範例解析](./docs/chapter2/2.3-complete-example.md)
2. 學習 [第三章](./docs/chapter3/README.md) 資料夾層級設定
3. 探索 [第五章](./docs/chapter5/README.md) 的進階技巧

### 團隊領導者路徑 👥
1. 了解 [1.2 為什麼 System Prompt 很重要](./docs/chapter1/1.2-why-important.md)
2. 規劃團隊的統一規範
3. 參考 [5.3 團隊協作設定](./docs/chapter5/README.md)
4. 查看 [附錄 B](./docs/appendix/README.md) 的最佳實踐

---

## 🎓 實戰演練

### 練習 1: 建立基本設定 (15 分鐘)
為您目前的專案建立一個基本的 `CLAUDE.md` 檔案

**目標:**
- 定義技術棧
- 設定 3-5 個編碼規範
- 列出 2-3 個禁止事項

### 練習 2: 資料夾層級設定 (30 分鐘)
為專案中的不同模組建立專屬規則

**目標:**
- 識別需要特殊規則的模組
- 建立資料夾層級的 `CLAUDE.md`
- 測試設定是否正確套用

### 練習 3: 團隊規範整合 (60 分鐘)
將現有團隊規範轉換為 System Prompt

**目標:**
- 收集現有規範文件
- 識別關鍵規則
- 建立完整的 `CLAUDE.md`
- 與團隊審查和調整

---

## 📦 範例檔案下載

在 `examples/` 目錄中提供了各種技術棧的範例檔案:

```
examples/
├── react-typescript/
│   └── CLAUDE.md
├── nodejs-backend/
│   └── CLAUDE.md
├── python-data-analysis/
│   └── CLAUDE.md
└── fullstack/
    └── CLAUDE.md
```

---

## 🤝 貢獻指南

歡迎提供建議和改進!

1. Fork 此儲存庫
2. 建立您的功能分支
3. 提交您的變更
4. 推送到分支
5. 建立 Pull Request

---

## 📝 更新紀錄

### v1.0.0 (2025-01-04)
- 初版發布
- 包含完整的教學內容
- 提供多種技術棧範例

---

## 💬 意見回饋

如果您有任何問題或建議,歡迎:
- 📧 透過 GitHub Issues 提出
- 💬 在團隊會議中討論
- 📝 分享您的最佳實踐

---

## ⭐ 相關專案

- [Cursor System Prompt 設定](../../cursor/system_prompt設定/README.md)
- [GitHub Copilot System Prompt 設定](../../github_copilot/github_system_prompt/README.md)
- [Gemini Code Assist System Prompt 設定](../../gemini_code_assist/system_prompt設定/README.md)

---

## 📜 授權

本教材採用 MIT 授權條款

---

<div align="center">

**持續改進,讓 AI 輔助開發更有效率!** 🎉

[開始學習](./docs/chapter1/README.md) | [快速開始](#-快速開始) | [範例集](./docs/chapter4/README.md)

</div>
