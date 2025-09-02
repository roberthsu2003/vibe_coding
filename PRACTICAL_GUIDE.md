# 🛠️ vibe_coding 實用指南

## 📖 Repository 介紹

這個 **vibe_coding** repository 是一個專門教授 AI 輔助程式設計的綜合性教育平台。由 Robert Hsu 維護，涵蓋了從基礎概念到實際應用的完整學習路徑。

## 🎯 主要學習目標

學完這個 repository，你將能夠：
- 理解 Vibe Coding 的核心概念和應用場景
- 熟練使用各種 AI 程式設計工具
- 掌握 GitHub Copilot 的進階功能
- 建立 AI 輔助的開發工作流程

## 🗂️ 重點目錄導覽

### 🏠 入門必讀
- `README.md` - 主要介紹和工具概覽
- `AI輔助程式設計的優點/` - 了解 AI 編程的優勢
- `3種類型的AI助手/` - 認識不同類型的 AI 工具

### 🔧 工具專區
- `github_copilot/` - GitHub Copilot 完整教學
- `gemini_cli/` - Google Gemini CLI 使用指南
- `claude_code_cli/` - Anthropic Claude 命令列工具
- `cursor/` - Cursor 編輯器教學

### 🎓 實戰練習
- `vibe_coding範例樣版/專案範例1/` - FastAPI 範例專案
- `演示目錄/` - 練習和演示專用區域

## 📈 建議學習順序

### 第一階段：概念理解（1-2天）
1. 閱讀主 README 了解 Vibe Coding 概念
2. 學習 [AI輔助程式設計的優點](./AI輔助程式設計的優點/README.md)
3. 觀看 [VibeCoding原理影片](https://youtu.be/ZXzYZ2fk-vk?si=pqpf7jbQPACJmrN6)
4. 閱讀 [GitHub CEO 建議](./vibe_coding時代_github_ceo_建議/README.md)

### 第二階段：工具選擇（2-3天）
1. 了解 [3種類型的AI助手](./3種類型的AI助手/README.md)
2. 根據需求選擇適合的工具：
   - **初學者**：建議從 GitHub Copilot 開始
   - **進階用戶**：可嘗試 Cursor 或 CLI 工具
   - **團隊協作**：重點學習 GitHub Copilot Coding Agent

### 第三階段：實際操作（1週）
1. 設定選定的 AI 工具
2. 使用範例專案練習：
   ```bash
   # 複製範例到演示目錄
   cp -r vibe_coding範例樣版/專案範例1 演示目錄/練習專案
   cd 演示目錄/練習專案
   ```
3. 嘗試基本 prompt：
   - "請增加一個講師所有CRUD的功能"
   - "請增加一個學生所有CRUD的功能"

### 第四階段：深度學習（持續）
1. 深入學習選定工具的進階功能
2. 探索 MCP、Prompts、Instructions 等進階概念
3. 參與社群討論和貢獻

## 🎯 實用技巧

### 💡 有效的 Prompt 策略
使用 **ROSES 架構**：
- **Role**（角色）：定義 AI 的角色
- **Objective**（目標）：明確說明要達成的目標
- **Scenario**（情境）：描述具體使用情境
- **Expected Solution**（預期結果）：說明期望的輸出
- **Steps**（步驟）：提供具體的執行步驟

### 🔄 最佳實踐流程
1. **需求分析**：用自然語言描述功能需求
2. **AI 生成**：使用適當的 prompt 讓 AI 生成程式碼
3. **驗證測試**：檢查生成的程式碼是否符合需求
4. **迭代優化**：根據結果調整 prompt 並重新生成

### 🛡️ 注意事項
- 理解生成的程式碼邏輯，避免盲目使用
- 適合快速原型和個人專案，謹慎用於關鍵系統
- 保持學習底層知識，AI 是工具而非替代

## 🔗 相關資源

### 📹 影片資源
- [VibeCoding原理解說](https://youtu.be/ZXzYZ2fk-vk?si=pqpf7jbQPACJmrN6)
- [GitHub CEO: 開發者黃金時刻](https://youtu.be/PR__eFQsnhg?si=hkpKphGD6qJI9k0p)

### 🌐 官方文檔
- [GitHub Copilot 官方文檔](https://docs.github.com/en/copilot)
- [GitHub Spark 教學](https://docs.github.com/en/copilot/tutorials/easy-apps-with-spark)
- [Gemini CLI GitHub](https://github.com/google-gemini/gemini-cli/tree/main)

### 📚 延伸學習
- Prompt Engineering 最佳實踐
- AI 輔助軟體開發流程
- 現代開發工具整合

---

**🚀 開始你的 AI 輔助程式設計之旅，體驗 Vibe Coding 的魅力！**