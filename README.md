# Vibe Coding 學習指南

本指南旨在引導您掌握 **Vibe Coding**（AI 協作開發），帶您從基礎的「操作心法」進階到「架構思維」，最終落實為「品質保證」。這正是我們如何從「寫得快」進化到「寫得穩」的完整路徑。

---

## 👥 課程受眾與挑戰考量

課程的深度將極大程度取決於學習者的背景，請依據您的**目標對象**調整學習側重點：

1. **產品經理 / 非技術人員 (PM / Non-tech)**：完全不懂程式，只想快速產出 MVP（最小可行產品）。
   - *學習挑戰*：重點應放在前期的「迭代思維」與「Prompt Engineering」。對這類對象而言，後期的 SDD 和 TDD 概念需要極度簡化。
2. **程式新手 (Beginners)**：懂一點基礎語法，想藉由 AI 輔助獨立完成產品。
   - *學習挑戰*：TDD 的門檻對於新手極高，可將其轉化、簡化為「如何讓 AI 幫我編寫測試與檢查錯誤」。

---

## 🎯 Vibe Coding 學習路徑

- **[自然語言+迭代的開發方法](./掌握迭代的力量/README.md)**
  - *探索開發思維的轉變：以小步迭代驅動專案成長。*

- **[Prompt Engineering](prompt/README.md)**
  - *學習如何下達精準指令，與 AI 高效溝通。*
- **[AI Coding 基礎 (Basics)](ai_coding_basics/README.md)**
  - *建立基礎：Suggestion、Code Review 與 Refactoring 技巧。*
- **[專案說明與規格文件（README.md & spec.md）](./輕量化規格紀錄手冊/README.md)**
  - *目的：方便日後修改、促進團隊協作，並建立讓 AI 易於閱讀的上下文。*

- **[PRD (產品需求文件)](PRD/README.md)**
- **[工作清單todolist](todolist/README.md)**
- **[SDD (軟體設計說明書)](sdd/README.md)**
- **[TDD (測試驅動開發)](03_tdd/README.md)**

---

## 🛠️ 雲端 AI 編輯器與開發工具

目前市面上有許多優秀的 AI 輔助工具，幫助您加速開發流程：

- **[Lovable](https://lovable.dev/)**：您的專屬 AI 前端工程師。能學習您現有的 UI 組件庫，自動建構新頁面與功能。（支援 GitHub 下載；採用點數機制，每日登入或邀請皆可增加點數）
- **[Bolt](https://www.bolt.dev/)**：AI 原生開發工作環境。透過深度整合 AI 功能，讓您以「思維的速度」進行編碼與建構。（支援 GitHub 下載；採訂閱制，每月提供 1M Token，邀請可增加額度）
- **[Replit](https://replit.com/)**：功能強大的線上 IDE。內建 AI 輔助功能 (Ghostwriter)，讓您在瀏覽器中直接編寫、測試、部署及協作。（提供應用程式下載；每日有免費次數，無邀請獎勵機制）
- **[Manus](https://manus.co/)**：專注於將設計稿轉化為程式碼的 AI 工具。能讀取 Figma 設計稿並自動生成高品質前端程式碼。（採訂閱制，提供免費應用程式下載；每日登入與邀請皆可獲得點數）
- **[v0.dev](https://v0.dev/)**：由 Vercel 團隊打造的生成式 UI 工具。只需輸入文字描述，即可快速產出基於 React、Shadcn UI 與 Tailwind CSS 的介面。（採訂閱制；每日提供免費額度，內建豐富樣板直接套用，亦可下載程式碼）

---

## 📚 學習資源

### 工具與模板
- **[模板庫 (Templates)](templates/README.md)**：包含產品需求、計畫與任務清單等模板。
- **[AI Prompt 範本集](templates/prompt_templates/)**：收錄 Code Review、重構、測試與除錯的專用提示詞（Prompt）範本。

### 找靈感與參考範例
設計專案時若缺乏靈感，以下資源能作為極佳的視覺與功能參考：

- **Mobbin**：依功能分類的 UI 介面範例（極度推薦給初學者）。
- **Dribbble**：全球設計師的作品集，擁有大量的 UI 設計圖與視覺靈感。
- **Figma Community**：社群驅動的開源設計檔案庫。
- **Google 搜尋**：直接參考線上實際運作的產品介面。

> 💡 *詳細的使用指引請參考 [SDD 章節](02_sdd/README.md#找參考範例的管道) 或 [需求模板](templates/requirement_template.md)*

---

## 📂 其它企業教學範例

- [中華電信](./其它/中華電信/README.md)  
- [新北市稅捐稽徵處](./其它/新北市稅捐稽徵處/README.md)