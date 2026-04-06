# Vibe Coding 學習指南

本指南旨在引導您掌握 **Vibe Coding**（AI 協作開發），帶您從基礎的「操作心法」進階到「架構思維」，最終落實為「品質保證」。這正是我們如何從「寫得快」進化到「寫得穩」的完整路徑。

---

## 👥 課程受眾

課程的深度將極大程度取決於學習者的背景，請依據您的**目標對象**調整學習側重點：

1. **產品經理 / 非技術人員 (PM / Non-tech)**：完全不懂程式，只想快速產出 MVP（最小可行產品）。
   - *學習挑戰*：重點應放在前期的「迭代思維」與「Prompt Engineering」。對這類對象而言，後期的 SDD 和 TDD 概念需要極度簡化。
2. **程式新手 (Beginners)**：懂一點基礎語法，想藉由 AI 輔助獨立完成產品。
   - *學習挑戰*：TDD 的門檻對於新手極高，可將其轉化、簡化為「如何讓 AI 幫我編寫測試與檢查錯誤」。

---

## [git和github先修](https://github.com/roberthsu2003/git)

Vibe Coding 高度依賴 AI 快速產生與修改程式碼；若沒有 **Git** 做版本紀錄，很難安全地嘗試不同方向、比對變更，或在結果不如預期時回到穩定版本。**GitHub** 則把這套流程放到雲端：備份專案、與他人協作（Pull Request、Code Review）、以及串接本指南後續提到的部署與現代開發工具（多數服務以儲存庫為起點）。先具備分支、提交、合併與遠端同步的基礎，您才能把「和 AI 一起迭代」落在可追蹤、可還原、可協作的實務工作流上，而不是只剩單機上的大量檔案改動。

---

## 🎯 AI 主導型（AI First / Full AI） 學習路徑

**人只負責描述需求，AI 負責產生程式**

| **特徵** | **適合情境** |
| --- | --- |
| - 幾乎不手寫程式<br>- 重點在 prompt 能力<br>- 強調 快速產出<br>- 常用於 MVP、原型、實驗 | - 想快速做 demo<br>- 不熟語言但要做工具<br>- 需要大量樣板程式 |

### 技巧

- **[自然語言+迭代的開發方法](./掌握迭代的力量/README.md)**
  - *探索開發思維的轉變：以小步迭代驅動專案成長。*

- **[Prompt Engineering](prompt/README.md)**
  - *學習如何下達精準指令，與 AI 高效溝通。*

## 🎯 AI 輔助型（AI Assisted）學習路徑

**人仍然是工程師，AI 是加速器**

| **特徵** | **適合情境** |
| --- | --- |
| 需要基本程式能力<br><br>AI 用來：<br>• 補 code<br>• 解釋 code<br>• 找 bug<br>• 重構<br>• 寫測試 | 正式專案<br>團隊開發<br>維護既有程式<br>學習新框架 |

### 技巧

- [**git和github先修**](https://github.com/roberthsu2003/git)
  - *熟悉 Git／GitHub：版本紀錄、分支與 PR，讓 AI 改動可追蹤、可還原並串接部署。*
- [**vibe_coding 先修**](https://github.com/roberthsu2003/react_typescript_vite)
  - *TypeScript、React、Vite 實作與架構補強，銜接進入 Vibe Coding 實戰。*
- [**AI Coding 基礎 (Basics)**](ai_coding_basics/README.md)
  - *建立基礎：Suggestion、Code Review 與 Refactoring 技巧。*
- [**專案說明與規格文件（README.md & spec.md）**](./輕量化規格紀錄手冊/README.md)
  - *README／spec 讓修改與協作有共識，並提供 AI 可讀的上下文。*
- [**從一個 Prompt 到 PRD 與 Todo List：自動化專案規劃流程**](PRD/README.md)
  - *以 Prompt 產生 PRD 與 Todo，並依文件推動開發循環。*
- [**工作清單todolist**](todolist/README.md)
  - *拆解任務與追蹤進度，讓迭代與分工有共同依據。*
- [**SDD (軟體設計說明書)**](sdd/README.md)
  - *軟體設計說明書：把架構與介面約定寫清楚，降低溝通成本。*
- [**TDD (測試驅動開發)**](03_tdd/README.md)
  - *測試驅動開發：行為可驗證，重構與改動有安全網。*

---

## 🛠️ 雲端 AI 編輯器與開發工具

目前市面上有許多優秀的 AI 輔助工具，幫助您加速開發流程：

- **[Google AI Studio](https://aistudio.google.com/)**：Google 官方提供的 Gemini 模型實驗與開發平台。可在瀏覽器中調校提示詞、比對不同模型版本、測試多模態與工具呼叫，並取得 Gemini API 金鑰以整合到自己的應用程式。（主要為網頁工具；依 Google 帳號享有免費額度，亦可透過 Google Cloud 擴充付費配額）
- **[Lovable](https://lovable.dev/)**：您的專屬 AI 前端工程師。能學習您現有的 UI 組件庫，自動建構新頁面與功能。（支援 GitHub 下載；採用點數機制，每日登入或邀請皆可增加點數）
- **[Bolt](https://www.bolt.dev/)**：AI 原生開發工作環境。透過深度整合 AI 功能，讓您以「思維的速度」進行編碼與建構。（支援 GitHub 下載；採訂閱制，每月提供 1M Token，邀請可增加額度）
- **[Replit](https://replit.com/)**：功能強大的線上 IDE。內建 AI 輔助功能 (Ghostwriter)，讓您在瀏覽器中直接編寫、測試、部署及協作。（提供應用程式下載；每日有免費次數，無邀請獎勵機制）
- **[Manus](https://manus.co/)**：專注於將設計稿轉化為程式碼的 AI 工具。能讀取 Figma 設計稿並自動生成高品質前端程式碼。（採訂閱制，提供免費應用程式下載；每日登入與邀請皆可獲得點數）
- **[v0.dev](https://v0.dev/)**：由 Vercel 團隊打造的生成式 UI 工具。只需輸入文字描述，即可快速產出基於 React、Shadcn UI 與 Tailwind CSS 的介面。（採訂閱制；每日提供免費額度，內建豐富樣板直接套用，亦可下載程式碼）

---

## 部署專案

可依專案類型（純靜態前端、全端應用、容器化服務等）選擇下列平台，將程式碼建置並對外提供服務。

1. **[GitHub Pages](./佈署/Github的部署/README.md)**：GitHub 內建免費靜態網站託管；與儲存庫連動即可發布，適合專案文件、單頁應用等不需要後端運算環境的內容。
2. **[Netlify](https://www.netlify.com/)**：常見的 JAMstack 託管服務，支援從 Git 自動建置與預覽網址，並提供表單、分流測試等周邊功能；免費方案適合學習與小型專案。
3. **[Railway](https://railway.app/)**：偏向全端與後端的 PaaS，可部署 API、背景任務與資料庫等，以專案用量計費，適合需要長連線或傳統伺服器形態的服務。
4. **[Render](https://render.com/)**：提供 Web Service、靜態網站、背景 Worker 與受管資料庫等選項，介面偏「一把部署」，可涵蓋前後端與排程類需求。
5. **[Vercel](https://vercel.com/)**：與前端框架（尤其 Next.js）整合緊密，具邊緣網路與 Serverless／Edge Functions；適合以 React / 現代前端為主的專案快速上線。
6. **[Google Cloud Run](https://cloud.google.com/run)**：在 Google Cloud 上以容器方式執行應用，依請求自動擴縮容；適合已容器化、或需要與 GCP 其他服務深度整合的部署情境。

---

## 📚 學習資源

### 工具與模板
- **[模板庫 (Templates)](templates/README.md)**：包含產品需求、計畫與任務清單等模板。
- **[AI Prompt 範本集](templates/prompt_templates/README.md)**：收錄 Code Review、重構、測試與除錯的專用提示詞（Prompt）範本。

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