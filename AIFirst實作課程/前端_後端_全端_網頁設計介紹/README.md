# 前端_後端_全端_網頁設計介紹


![前端_後端_全端_資訊圖表](./images/前端_後端_全端.png)

## 前端 (Frontend)
前端是網頁的「面子」，也就是使用者直接在瀏覽器中看到並互動的部分。
- **負責內容**：介面設計、排版、按鈕點擊反應、動畫效果等。
- **核心技術**：HTML (結構)、CSS (樣式)、JavaScript (互動)。
- **AI 時代的角色**：我們可以透過自然語言描述理想的畫面，讓 AI 快速生成基礎代碼，開發者則專注於調整美感與使用者體驗。
- **部署建議 (Where to Deploy)**：前端程式碼通常是靜態檔案（HTML/CSS/JS），適合部署在「靜態網站代管平台」。
    - **推薦工具**：Vercel、GitHub Pages、Netlify、**Firebase Hosting (Google 生態系最佳首選)**。

![](./images/html_css_javascript.png)

## 後端 (Backend)
後端是網頁的「大腦」與「倉庫」，處理使用者看不見的邏輯運算與資料儲存。
- **負責內容**：會員登入驗證、資料庫管理、伺服器通訊、複雜的運算邏輯。
- **核心技術**：Node.js、Python、資料庫 (如 Cloud Firestore, Supabase, PostgreSQL)。
- **AI 時代的角色**：AI 可以協助設計資料庫結構 (Schema) 與撰寫 API 介面，縮短從想法到功能的開發週期。
- **部署建議 (Where to Deploy)**：後端需要運行程式邏輯與儲存資料，通常部署在「雲端應用程式平台 (PaaS)」、「容器代管服務」或「後端即服務 (BaaS)」。
    - **推薦工具**：**Google Cloud Run (Google AI Studio 預設一鍵部署)**、**Firebase (Firestore 資料庫與 Auth 驗證)**、Supabase、Railway。

![後端](./images/後端.png)

## 全端 (Fullstack)
全端開發者具備同時處理前端與後端的能力，能夠獨立完成一個完整的網頁應用程式。
- **核心優勢**：能夠理解整個系統的運作流程，從介面設計到資料傳輸都能一手包辦。
- **AI First 的意義**：在 AI 的輔助下，開發者不再需要精通每一行程式碼的語法，而是更專注於「產品邏輯」與「架構設計」，使得開發完整應用的門檻大幅降低。
- **部署建議 (Where to Deploy)**：全端應用通常結合了前端框架與後端服務，常見推薦以下兩種現代化組合：
    - **推薦組合一：Google 生態系首選（Google AI Studio 最佳整合）⭐️**：
      - **Google Cloud Run**：負責後端容器化運算與 API 服務（Google AI Studio 預設原生支援一鍵部署，無請求時自動縮容至 0 節省費用）。
      - **Firebase**：負責前端託管（Firebase Hosting / App Hosting）、會員身分驗證（Firebase Auth）與即時雲端資料庫（Cloud Firestore）。
      - 💡 **優勢**：同一 Google 帳號與 Google Cloud 專案無縫打通，權限設定最順手，非常適合從 AI Studio 原型一路演進至正式上線。
    - **推薦組合二：獨立開發者常見組合**：
      - **Vercel** (負責前端與 Serverless Functions) + **Supabase** (負責 PostgreSQL 資料庫、驗證與後端邏輯)。
