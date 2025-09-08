# Vibe Coding 專案大綱

本專案旨在探討與 "Vibe Coding" 相關的各種 AI 輔助程式設計工具與概念。透過範例專案、工具介紹和操作流程，協助開發者了解如何利用 AI 提升程式設計效率與品質。

## 專案結構

- **3種類型的AI助手/**：介紹三種不同類型的 AI 程式設計助手。
- **AI輔助程式設計的優點/**：探討使用 AI 輔助程式設計的各項優點。
- **claude_code_cli/**：Claude Code CLI 工具的相關說明。
- **cursor/**：Cursor 編輯器的介紹與使用。
- **gemini_cli/**：Gemini CLI 的相關文件，包含入門、指令說明、配置等。
- **github_copilot/**：GitHub Copilot 的詳細介紹，包含各種功能、提示建構與實用工具。
- **kiro/**：Kiro 工具的相關說明。
- **prompt/**：關於 Prompt Engineering 的基本概念與技巧。
- **revo_dev/** & **rovodev/**：RevoDev/Rovodev 工具的介紹與範例。
- **vibe_coding時代_github_ceo_建議/**：GitHub CEO 對於 "Vibe Coding" 時代的建議。
- **vibe_coding範例樣版/**：提供多個範例專案，展示如何應用 AI 工具進行開發。
- **vscode/**：Visual Studio Code 相關設定與擴充。
- **zed/**：Zed 編輯器的介紹與使用。
- **演示目錄/**：用於存放演示用的相關檔案。

## 主要目標

- 提供一個學習與實踐 "Vibe Coding" 的資源庫。
- 透過實際範例，讓開發者體驗 AI 輔助開發的流程。
- 比較不同 AI 工具的特點與適用場景。

## 如何使用

您可以根據自己的興趣，探索各個資料夾內的說明文件與範例程式碼。建議可以從 `vibe_coding範例樣版/` 開始，實際操作範例專案，感受 "Vibe Coding" 的魅力。

---

# 第一章：Vibe Coding 時代的來臨

## 1.1 GitHub CEO: Why Now Is the BEST Time to Be a Developer

[Youtube影片分享](https://youtu.be/PR__eFQsnhg?si=hkpKphGD6qJI9k0p)

### AI時代成為「開發者的黃金時刻」

AI 不會取代開發者，而是賦予開發者更強大的能力。真正能打造出差異化產品的，仍然是懂技術、有開發能力的專業人士。

### 什麼是「Vibe Coding」

這是一種與 AI (如 Copilot) 互動的撰寫程式方式。開發者下達指令，AI 負責編寫程式碼。然而，若不了解背後邏輯，功能的可調整性會大幅下降。

### Prompt 工程是未來關鍵技能

與 AI 的溝通能力決定了其輔助的成效。善用「ROSES 架構」等提示技巧，能讓 AI 更精準地理解需求。

**ROSES 架構:**
- **Role (角色)**
- **Objective (目標)**
- **Scenario (情境)**
- **Expected Solution (預期結果)**
- **Steps (步驟)**

### 未來趨勢
- **開發者數量增加**: AI 降低了程式設計的學習門檻。
- **職責轉變**: 開發者的職責將從純粹的編碼轉向更高層次的系統設計、架構與創意發想。
- **擁抱 AI**: 拒絕使用 AI 的公司將在競爭中處於劣勢。

---

# 第二章：AI 輔助程式設計的優點

## 2.1 提升開發效率
- **自動生成程式碼範例**：AI 能依照開發者輸入的自然語言需求或函式名稱，自動生成對應的程式碼範例，節省大量重複性編碼時間。
- **即時補全程式碼**：透過 AI 的智能預測，能快速完成程式碼補全，減少鍵入錯誤與重複輸入。
- **縮短開發週期**：程式設計師能專注於架構與邏輯規劃，而將重複與樣板式的程式碼交由 AI 生成，加速產品上市。

## 2.2 降低學習與上手門檻
- **協助初學者學習**：AI 能將複雜的語法轉換為簡單的範例，幫助初學者快速理解。
- **多語言轉換**：設計師可用熟悉的語言表達需求，AI 會自動生成指定語言的程式碼，縮短學習新語言的時間。
- **最佳實踐建議**：AI 在生成程式碼時，往往會參考社群常用的寫法與標準，使學習者能接觸到符合業界規範的程式風格。

## 2.3 提升程式品質與可靠性
- **自動除錯與偵錯提示**：AI 能分析程式碼並找出可能的語法錯誤或邏輯漏洞，避免低階錯誤影響系統。
- **測試程式生成**：AI 可自動生成單元測試（unit test），提升程式碼覆蓋率與穩定性。
- **程式碼優化**：透過 AI 的建議，程式設計師能獲得更佳的演算法或效能改善方案。

---

# 第三章：三種類型的 AI 助手

## 3.1 協作型 (Collaborative)
- **應用程式**:
  - vscode - github chat
  - cursor
  - vscode - gemini code assist
- **網站**:
  - Firebase Studio
  - GitHub Spark

## 3.2 監督型 (Supervised - CLI)
- claude code
- openAI codex
- gemini cli
- RovoDev

## 3.3 委派型 (Delegated - 網站)
- github copilot coding agent
- jules

---

# 第四章：主流 AI 開發工具介紹

## 4.1 GitHub Copilot

### 提示建構指南
- **@ 聊天參與者**: 不同領域的專家助手 (`@workspace`, `@vscode`)。
- **/ 斜線命令**: 快速執行常見操作 (`/new`, `/fix`)。
- **# 聊天變數**: 提供上下文資訊 (`#file`, `#selection`)。

### ASK, EDIT, AGENT 模式
- **Ask**: 提問、查詢知識。
- **Edit**: 直接修改、優化程式碼。
- **Agent**: 執行複雜、跨檔案的自動化任務。

### Coding Agent
讓 GitHub Copilot 在背景中獨立執行任務，如修復錯誤、實作新功能、提升測試覆蓋率等。所有操作都透過 GitHub 網站進行，開發歷程可追溯。

## 4.2 Cursor 編輯器

Cursor 是一款基於 VS Code 的 AI 驅動程式碼編輯器，提供智能程式碼補全、生成、重構等功能。

### 核心功能
- **Cursor Tab**: 智能補全。
- **Cursor Chat**: AI 對話 (`Cmd/Ctrl + L`)。
- **Cursor Composer**: 程式碼生成 (`Cmd/Ctrl + I`)。

## 4.3 Claude Code CLI

Anthropic 推出的命令列工具，讓開發者能直接在終端機中與 Claude AI 互動。

### 核心功能
- **程式碼生成**: `claude generate --file app.js --prompt "..."`
- **程式碼分析**: `claude analyze src/main.js`
- **程式碼重構**: `claude refactor src/legacy.js --style modern`
- **文檔生成**: `claude docs --readme`
- **測試生成**: `claude test --unit src/utils.js`

## 4.4 Kiro 編輯器

Kiro 是一款現代化的 AI 驅動程式碼編輯器，專為提升開發者生產力而設計。

### 主要特色
- 內建強大的 AI 程式碼助手
- 智能程式碼補全和生成
- 自動程式碼重構和優化
- 自然語言程式設計支援

---

# 第五章：Prompt Engineering 基礎

## 5.1 Google 公布的 AI 提示萬用公式

掌握「21字黃金法則」，先求穩定基本功再追求更好。
1. **角色設定**: 要 LLM 調度哪些領域知識。
2. **任務**: 你想完成什麼目標。
3. **背景**: 任務的起源、目標的限制、涉及的人士等。
4. **格式**: 輸出的類型、編排格式。

## 5.2 所需文件
- **PRD (產品需求文件)**
- **需求**: 開發、除錯、測試、更新等需求。
- **Codebase**: 專案的所有原始程式碼集合。
- **Acceptance Criteria (驗收標準)**: 使用 Gherkin 語法 (Given-When-Then)。

## 5.3 建立開發流程
可以建立一個 `TODO.md` 檔案，並讓 AI 按順序執行每一個任務，逐步完成開發。

**範例 `TODO.md`:**
```markdown
# 專案開發 To Do List

- [ ] 初始化 Node.js 專案
- [ ] 安裝 Express
- [ ] 建立基本伺服器（port 3000）
- [ ] 設計 GET /api/hello 回傳 JSON
- [ ] 將錯誤訊息統一處理
```

---

# 第六章：範例專案與實踐

## 6.1 專案範例 1: GitHub Copilot Coding Agent
此範例演示如何使用 GitHub Copilot Coding Agent 自動修復 Bug、撰寫測試並提交 Pull Request。

## 6.2 專案範例 2: Getting Started with GitHub Copilot
一個簡單的 FastAPI 應用程式，讓學生可以查看和報名課外活動，用於練習 Copilot 的基本操作。

## 6.3 專案範例 5: 自動生成程式碼
此範例展示如何使用不同工具（Chat View, Gemini CLI）來自動完成功能。

## 6.4 專案範例 6: Gemini CLI 建立貪食蛇遊戲
完全由 Gemini CLI 建立一個網頁版的貪食蛇遊戲，包含計分、開始按鈕和遊戲結束提示。

---
# 附錄：其他工具與設定

## A.1 VSCode 設定
**.vscode/settings.json**
```json
{
    "chat.mcp.discovery.enabled": true,
    "files.autoSave": "afterDelay",
    "editor.formatOnSave": true,
    "files.trimTrailingWhitespace": true
}
```

## A.2 Zed 編輯器
Zed 是一款由 Atom 和 Tree-sitter 的創建者打造的高效能、多人協作的程式碼編輯器。它專注於速度和響應能力，旨在提供流暢的開發體驗。

### 主要特色
- **高效能**: 使用 Rust 編寫，啟動速度快，操作流暢。
- **協作功能**: 內建即時協作功能，可與團隊成員共同編輯程式碼。
- **簡潔的 UI**: 介面設計簡潔，無干擾。
- **整合終端機**: 內建功能強大的終端機。

## A.3 RovoDev
Atlassian 推出的 AI 驅動的命令列工具，旨在協助開發者在終端機環境中完成各種開發任務。
```bash
# Mac 安裝
brew tap atlassian/homebrew-acli
brew install acli
```

---
*此文件由 AI 助手整理生成，旨在提供一個全面的 Vibe Coding 學習與參考資源。*