# VibeCoding Repository 介紹

歡迎來到 **VibeCoding (氛圍編程)** 知識庫！這是一個全面的 AI 輔助程式設計學習指南，幫助開發者掌握現代 AI 工具來提升編程效率和體驗。

## 📚 什麼是 VibeCoding？

**VibeCoding (氛圍編程)** 是一種革命性的程式設計方式，利用大型語言模型 (LLM) 和自然語言處理，讓開發者能夠：

- 🗣️ **自然語言編程**：用日常語言描述需求，AI 自動生成程式碼
- 🚀 **快速原型開發**：無需深入理解底層邏輯即可建立功能完整的應用程式
- 🎯 **專注於功能實現**：強調程式的實用性和符合預期的「氛圍」(vibe)
- 💡 **降低編程門檻**：讓非專業程式設計者也能快速開發軟體

## 🎯 本知識庫的目標

這個知識庫旨在提供：

1. **完整的工具介紹**：涵蓋所有主流 AI 編程工具
2. **實作演練**：提供實際操作範例和專案模板
3. **最佳實踐**：分享 AI 輔助編程的技巧和注意事項
4. **循序漸進的學習路徑**：從基礎概念到進階應用

## 🛠️ 涵蓋的主要工具

### 🖥️ 整合開發環境 (IDE)
- **GitHub Copilot** - 微軟的 AI 程式設計助手 ([各項功能詳見下方](#github-copilot-完整指南))
- **[Cursor](./cursor/README.md)** - 整合 AI 功能的 VSCode 分支
- **[Kiro](./kiro/README.md)** - 開源的 AI 程式碼編輯器
- **[Zed](./zed/README.md)** - 高效能的程式碼編輯器

### 🖲️ 命令列工具 (CLI)
- **[Gemini CLI](./gemini_cli/gemini_簡介_安裝.md)** - Google 的命令列 AI 工具
- **[Claude Code CLI](./claude_code_cli/README.md)** - Anthropic 的命令列 AI 工具
- **[RovoDev](./revo_dev/README.md)** - 開發流程自動化工具

### 🌐 網頁介面工具
- **GitHub Spark** - 快速應用程式建構平台
- **Google Jules** - Google 的 AI 開發助手
- **Firebase Studio** - Firebase 整合開發環境

## 📖 學習路徑建議

### 🌟 初學者路徑
1. **了解基本概念**
   - 閱讀 [VibeCoding 原理介紹](https://youtu.be/ZXzYZ2fk-vk?si=pqpf7jbQPACJmrN6)
   - 理解 [AI輔助程式設計的優點](./AI輔助程式設計的優點)
   - 認識 [3種類型的AI助手](./3種類型的AI助手)

2. **選擇適合的工具**
   - 如果您使用 VSCode：建議從 **GitHub Copilot** 開始
   - 如果您想嘗試新工具：推薦 **Cursor** 編輯器
   - 如果您偏好命令列：從 **Gemini CLI** 開始

3. **實作練習**
   - 嘗試 [專案範例1](./vibe_coding範例樣版/專案範例1) (FastAPI 專案)
   - 練習 [程式碼自動完成功能](./github_copilot/程式碼自動完成和下一個編輯建議)

### 🚀 進階使用者路徑
1. **深入 GitHub Copilot**
   - 學習 [提示建構技巧](./github_copilot/github_copilot_提示建構)
   - 掌握 [程式碼審核和重構](./github_copilot/GitHub_Code_Review)
   - 使用 [Coding Agent 功能](./github_copilot/GitHub_Copilot_coding_Agent)

2. **探索多種工具**
   - 比較不同 AI 編輯器的特色
   - 學習 CLI 工具的進階功能
   - 整合多種工具到開發流程中

3. **專案實戰**
   - 完成 [專案範例2](./vibe_coding範例樣版/專案範例2) (高中管理系統 API)
   - 嘗試 [專案範例4](./vibe_coding範例樣版/專案範例4) (Code Review 和 Refactoring)

## 🎯 重點功能亮點

### GitHub Copilot 完整指南
- **基礎功能**：程式碼自動完成、智慧建議
- **進階功能**：程式碼審核、重構建議、測試生成
- **Coding Agent**：自動建立分支、提交程式碼、建立 Pull Request
- **自訂設定**：MCP、Prompts、Instructions 個人化設定

### 實務範例專案
- **FastAPI 網路應用程式**：學習 API 開發
- **高中管理系統**：練習功能擴充
- **Python 檔案處理**：掌握基礎程式設計
- **程式碼品質改善**：學習 Code Review 和 Refactoring

### 多元化工具選擇
- **適合不同使用情境**：從個人開發到團隊協作
- **跨平台支援**：Windows、macOS、Linux
- **各種編程語言**：Python、JavaScript、TypeScript、Java 等

## 🚦 快速開始

### 第一步：選擇工具
根據您的需求選擇合適的 AI 編程工具：

| 使用情境 | 推薦工具 | 理由 |
|---------|---------|------|
| VSCode 使用者 | GitHub Copilot | 無縫整合，功能完整 |
| 嘗試新體驗 | Cursor | 專為 AI 編程設計 |
| 命令列愛好者 | Gemini CLI | 輕量級，整合度高 |
| 團隊協作 | GitHub Copilot + Coding Agent | 完整的協作流程 |

### 第二步：安裝設定
1. 按照對應工具的安裝指南進行設定
2. 完成必要的 API 金鑰配置
3. 測試基本功能是否正常運作

### 第三步：開始實作
1. 選擇一個 [範例專案](./vibe_coding範例樣版) 開始練習
2. 跟隨操作流程文件進行實作
3. 逐步嘗試更進階的功能

## 🎓 學習資源

### 📺 影片教學
- [VibeCoding 原理介紹](https://youtu.be/ZXzYZ2fk-vk?si=pqpf7jbQPACJmrN6)
- [GitHub CEO 給開發者的建議](./vibe_coding時代_github_ceo_建議)

### 📄 文檔資料
- 各工具的詳細使用說明
- 操作流程逐步指南
- 最佳實踐分享
- 常見問題解答

### 🛠️ 實作範例
- 完整的專案範例
- 程式碼片段示範
- 設定檔案模板
- 測試案例參考

## 💡 為什麼要學習 VibeCoding？

根據 GitHub CEO 的觀察，我們正處於 **「開發者的黃金時刻」**：

- 🔥 **生產力大幅提升**：AI 工具能顯著加速開發流程
- 🎯 **專注核心價值**：從重複性工作中解放，專注於創新和解決問題
- 🌍 **降低進入門檻**：讓更多人能參與軟體開發
- 🚀 **未來趨勢**：掌握 AI 輔助編程是未來競爭力的關鍵

## 🤝 如何使用本知識庫

1. **瀏覽概覽**：先閱讀主要的 [README.md](./README.md) 了解整體架構
2. **選擇學習路徑**：根據您的經驗程度選擇適合的學習順序
3. **實際操作**：不要只是閱讀，動手實作每個範例
4. **循序漸進**：從基礎功能開始，逐步嘗試進階特性
5. **持續練習**：AI 工具的掌握需要不斷練習和探索

## 📞 支援與回饋

如果您在學習過程中遇到問題或有任何建議，歡迎：
- 查閱相關文檔的 FAQ 部分
- 參考範例專案的操作流程
- 透過 GitHub Issues 提出問題
- 分享您的使用經驗和心得

---

🎉 **開始您的 VibeCoding 旅程吧！** 

讓 AI 成為您編程路上的最佳夥伴，一起探索程式設計的無限可能！