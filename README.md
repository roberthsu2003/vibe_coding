# vibe_coding(氛圍編程)-AI輔助程式設計完整指南

> 📖 **新手入門？** 建議先閱讀 [📚 Repository Introduction (知識庫介紹)](./INTRODUCTION.md) 了解完整學習路徑和工具選擇指南

## 🎯 目錄 (Table of Contents)

- [什麼是 VibeCoding？](#什麼是-vibecoding)
- [快速開始](#快速開始)
- [重要資源](#重要資源)
- [AI 工具總覽](#vibe_coding常用工具)
- [GitHub Copilot 詳細說明](#github-copilot工具的說明)
- [其他 AI 工具](#其他-ai-工具)
- [範例專案](#範例專案)
- [常見問題](#常見問題)

## 什麼是 VibeCoding？

「Vibe coding」是一種新興的程式設計方式，特別指利用大型語言模型（LLM）等人機互動介面，透過自然語言描述需求來生成程式碼的過程。此方式允許非專業程式設計者（或對程式碼了解有限的使用者）快速生成軟體，而無需深入理解底層程式碼邏輯。這種方法強調直覺與功能性，接受程式碼可能存在錯誤或瑕疵。

## 🚀 快速開始

### 前置需求
- 安裝 [VSCode](https://code.visualstudio.com/) 或其他支援的編輯器
- 擁有相關 AI 工具的帳戶 (GitHub Copilot、Gemini、Claude 等)
- 基本的程式設計知識

### 三步驟快速上手
1. **選擇工具**：建議初學者從 [GitHub Copilot](https://github.com/features/copilot) 開始
2. **安裝設定**：按照對應工具的[安裝指南](#github-copilot工具的說明)進行設定
3. **開始實作**：選擇一個[範例專案](#範例專案)開始練習

## 📚 重要資源

### 💫 AI時代成為「開發者的黃金時刻!」 
[GitHub CEO給你最真實的建議](./vibe_coding時代_github_ceo_建議)

> [!IMPORTANT]
> 建議講解給學員了解,讓學員知道為什麼是`開發者的黃金時刻!`

### 📖 核心概念文檔
- [AI輔助程式設計的優點](./AI輔助程式設計的優點) - 了解 AI 如何提升開發效率
- [VibeCoding的原理介紹影片](https://youtu.be/ZXzYZ2fk-vk?si=pqpf7jbQPACJmrN6) - 觀看原理說明
- [3種類型的AI助手](./3種類型的AI助手) - 認識不同類型的 AI 工具

### 🎯 完整學習指南
> 📖 **建議閱讀**: [📚 Repository Introduction (知識庫介紹)](./INTRODUCTION.md) 包含完整的學習路徑、工具比較和進階使用指南

## Vibe Coding 的主要特徵：
- **自然語言輸入**：使用者以日常語言描述需求，例如「設計一個根據冰箱食材推薦午餐的應用程式」，AI 隨即生成相應程式碼。
- **有限的程式理解**：使用者可能不完全理解程式碼的運作原理，僅關注程式功能是否符合預期「氛圍」（vibe）。
- **應用場景**：適用於個人化或小規模的「即用即棄」專案，例如自製工具（如名為 LunchBox Buddy 的應用程式）。由於可能存在未察覺的錯誤，此方式不適合需要高可靠性或安全性的專業應用。
- **起源**：此術語由電腦科學家 Andrej Karpathy 於 2025 年 2 月提出，並於 2025 年 3 月被 Merriam-Webster 收錄為俚語。

## vibe_coding常用工具

| 類型 | 工具名稱 | 狀態 | 備註 |
| :--- | :--- | :--- | :--- |
| **整合開發環境** | [GitHub Copilot](./github_copilot) | ✅ 完整指南 | VSCode 擴充套件，功能最完整 |
| | [Cursor](./cursor/README.md) | ✅ 使用指南 | 整合 AI 功能的 VSCode 分支 |
| | [Kiro](./kiro/README.md) | ✅ 使用指南 | 開源的 AI 程式碼編輯器 |
| | [Zed](./zed/README.md) | ✅ 使用指南 | 高效能的程式碼編輯器 |
| **命令列工具** | [Gemini CLI](./gemini_cli/gemini_簡介_安裝.md) | ✅ 完整指南 | Google 的命令列 AI 工具 |
| | [Claude Code CLI](./claude_code_cli/README.md) | ✅ 使用指南 | Anthropic 的命令列 AI 工具 |
| | [RovoDev](./revo_dev/README.md) | ✅ 使用指南 | 開發流程自動化工具 |
| **網頁介面工具** | [GitHub Spark](https://docs.github.com/en/copilot/tutorials/easy-apps-with-spark) | 🔗 官方文檔 | 快速應用程式建構平台 |
| | Google Jules | 🚧 開發中 | Google 的 AI 開發助手 |
| | Firebase Studio | 🚧 開發中 | Firebase 整合開發環境 |

> 💡 **建議**: 初學者建議從 **GitHub Copilot** 開始，它提供最完整的功能和學習資源。

## GitHub Copilot工具的說明

**請先安裝 VSCode 的 GitHub Copilot extensions**

### 僅功能說明(無實作)

- [GitHub Copilot的chat view提示建構教學](./github_copilot/github_copilot_提示建構)

- [GitHub Copilot的MCP,Prompts,instruction設定](./github_copilot/mcp_prompts_instruction)


### 功能說明(有實作)

- github的-程式碼自動完成和下一個編輯建議

	- [官網說明](https://code.visualstudio.com/docs/copilot/ai-powered-suggestions#_next-edit-suggestions)

	- [功能說明](./github_copilot/程式碼自動完成和下一個編輯建議/README.md)

- [GitHub Copilot的程式碼審核和重構](./github_copilot/GitHub_Code_Review)

- [GitHub Copilot的ASK,EDIT,AGENT和自訂模式](./github_copilot/ask_edit_agent_自訂模式)


- [GitHub Copilot coding Agent「github網站執行-(並行執行,背景執行)」](./github_copilot/GitHub_Copilot_coding_Agent)

- [GitHub Copilot的小功能(MCP自動開啟,AI Stats,Todolist,UI Integration,agent_session)](./github_copilot/github_實用小工具)

- [GitHub spark](https://docs.github.com/en/copilot/tutorials/easy-apps-with-spark)

## 🛠️ 其他 AI 工具

## Gemini CLI
**官方網站**-[https://github.com/google-gemini/gemini-cli/tree/main](https://github.com/google-gemini/gemini-cli/tree/main)

- [Gemini CLI簡介_安裝](./gemini_cli/gemini_簡介_安裝.md)
- [Gemini CLI Getting Started](./gemini_cli/gemini_getting_started.md)
- [Gemini CLI的配置設定](./gemini_cli/gemini_配置設定.md)
- [Gemini CLI的快捷鍵](./gemini_cli/gemini_快捷鍵.md)
- [Gemini CLI的命令說明](./gemini_cli/gemini_命令說明.md)
- [操作範例](./gemini_cli/操作範例/README.md)

## Claude Code CLI

- [Claude Code CLI](./claude_code_cli/README.md)

## revo dev

- [revo dev](./revo_dev/README.md)

## Cursor 編輯器使用說明

- [Cursor 編輯器使用說明](./cursor/README.md)

## Kiro編輯器使用說明

- [Kiro編輯器使用說明](./kiro/README.md)

## Zed編輯器使用說明

- [Zed編輯器使用說明](./zed/README.md)

## 提示詞注意事項

- [提示詞](./prompt/README.md)

## 範例專案

- [vibe_coding範例樣版](./vibe_coding範例樣版)

## ❓ 常見問題 (FAQ)

### Q: 我是完全的程式設計新手，適合使用 VibeCoding 嗎？
A: 是的！VibeCoding 特別適合初學者。建議從 [INTRODUCTION.md](./INTRODUCTION.md) 的初學者路徑開始，搭配 GitHub Copilot 進行學習。

### Q: 哪個 AI 工具最適合我？
A: 這取決於您的使用情境：
- **VSCode 使用者**: GitHub Copilot
- **嘗試新體驗**: Cursor
- **命令列愛好者**: Gemini CLI
- **團隊協作**: GitHub Copilot + Coding Agent

### Q: 這些 AI 工具是免費的嗎？
A: 大部分工具提供免費版本或試用期：
- GitHub Copilot: 學生免費，個人版月費制
- Gemini CLI: Google 帳戶即可使用
- Cursor: 有免費額度
- 詳細pricing請查看各工具官網

### Q: AI 生成的程式碼可靠嗎？
A: AI 工具能大幅提升開發效率，但仍需要：
- 理解生成的程式碼邏輯
- 進行適當的測試和驗證
- 遵循程式碼審核最佳實踐

### Q: 如何提升與 AI 工具的互動效果？
A: 參考我們的提示建構指南：
- [GitHub Copilot 提示建構教學](./github_copilot/github_copilot_提示建構)
- [提示詞注意事項](./prompt/README.md)

## 🤝 貢獻指南

歡迎為本知識庫貢獻內容！您可以：

1. **回報問題**：透過 GitHub Issues 回報錯誤或建議
2. **改善文檔**：修正錯字、更新過時資訊、新增範例
3. **分享經驗**：提供使用心得和最佳實踐
4. **新增工具**：介紹新的 AI 程式設計工具

### 貢獻步驟
1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/新功能`)
3. 提交變更 (`git commit -am '新增某功能'`)
4. 推送到分支 (`git push origin feature/新功能`)
5. 開啟 Pull Request

## 📜 授權條款

本專案採用 MIT 授權條款。詳見 [LICENSE](LICENSE) 檔案。

## 🆘 技術支援

如果您遇到技術問題：

1. **查閱文檔**：先檢查相關工具的 README 和 FAQ
2. **範例參考**：查看 [vibe_coding範例樣版](./vibe_coding範例樣版) 中的操作流程
3. **社群支援**：透過 GitHub Issues 尋求協助
4. **官方文檔**：參考各 AI 工具的官方文檔

---

🎉 **開始您的 VibeCoding 之旅！**

讓 AI 成為您編程路上的最佳夥伴，一起探索程式設計的無限可能！

📝 **最後更新**: 2024年12月
🔗 **相關連結**: [GitHub](https://github.com) | [VSCode](https://code.visualstudio.com/) | [OpenAI](https://openai.com/)