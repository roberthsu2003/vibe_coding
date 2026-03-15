# vibe_coding

## 實作

## Vibe Coding 學習路徑

- [Prompt Engineering](prompt/README.md)
- [AI Coding 基礎 (Basics)](ai_coding_basics/README.md)
    - *建立基礎：Suggestion, Code Review, Refactoring*
- [輕量化規格紀錄手冊](./輕量化規格紀錄手冊/README.md)
    - 目的: 
        - 方便日後修改
        - 方便協作
        - 方便 AI 閱讀
- [迭代方式 (The Iterative Way)](iterative_method/README.md)
- [PRD (產品需求文件)](prd/README.md)
- [工作清單](todolist/README.md)
- [SDD (軟體設計說明書)](sdd/README.md)
- [TDD (測試驅動開發)](03_tdd/README.md)


這是一個從「操作心法」進階到「架構思維」，最後落實為「品質保證」的紮實路徑。這三個步驟正好對應了在 AI 協作開發（Vibe Coding）中，如何從「寫得快」進化到「寫得穩」。

---

### 為了讓這個課程規劃更完善，我們需要考量「受眾」

這個課程的深度會極大程度取決於學生的背景。為了給我更精確的建議，請問您設定的**目標對像**是哪一種類型？

1. **產品經理/非技術人員 (PM/Non-tech)**：完全不懂程式，只想做 MVP。
    - *挑戰*：重點會放在第一章的迭代與 Prompt Engineering，SDD 和 TDD 概念需要極度簡化。

2. **程式新手 (Beginners)**：懂一點語法，想靠 AI 做產品。
    - *挑戰*：TDD 對他們來說門檻極高，可能需要簡化為「如何讓 AI 幫我檢查錯誤」。

---

### 雲端 AI 編輯器與開發工具

-   **[Lovable](https://lovable.dev/)**：一個 AI 前端工程師，能學習您現有的 UI 組件庫，並自動為您建構新的頁面與功能。(可以透過github下載,點數機制,每日增加點數,邀請可增加點數)
-   **[Bolt](https://www.bolt.dev/)**：一個 AI 原生的開發工作環境，旨在透過深度整合的 AI 功能，讓開發者能以思維的速度進行編碼與建構。(可以透過github下載,訂閱機制,邀請可增加token,每月有1M_token)
-   **[Replit](https://replit.com/)**：一個功能強大的線上 IDE，其 AI 輔助編碼功能 (Ghostwriter) 能幫助使用者在瀏覽器中快速編寫、測試、部署及協作專案。(可以直接下載,每日有免費次數,無邀請點數)
-   **[Manus](https://manus.co/)**：專注於將設計轉為程式碼的 AI 開發者，能讀取您的 Figma 設計稿，並自動生成高品質的前端程式碼。(訂閱制,每日進入可以增加點數,邀請可增加點數,可直接下載)
-   **[v0.dev](https://v0.dev/)**：由 Vercel 團隊打造的生成式 UI 工具，可以根據您的文字描述，快速產生基於 React、Shadcn UI 和 Tailwind CSS 的使用者介面。(訂閱制,有邀請點數,每日有免費次數,有樣版可以直接使用,可以直接下載)

---

## 📚 學習資源

### 工具與模板
- **[模板庫 (Templates)](templates/README.md)** - 需求、計畫、任務清單模板
- **[AI Prompt 範本集](templates/prompt_templates/)** - Code Review、重構、測試、除錯 Prompts

### 找靈感與參考範例
在設計專案時不知道從何開始？以下資源可以幫助你找到靈感：

**UI/UX 設計參考**:
- **Mobbin** - 依功能分類的 UI 範例（最推薦初學者）
- **Dribbble** - 設計師作品集，大量 UI 設計圖
- **Figma Community** - 開源設計檔案
- **Google 搜尋** - 直接找實際運作的產品作為參考

> 詳細的使用指引請參考 [SDD 章節](02_sdd/README.md#找參考範例的管道) 或 [需求模板](templates/requirement_template.md)

## 其它

[中華電信](./中華電信/README.md)  
[新北市稅捐稽徵處](./新北市稅捐稽徵處/README.md)