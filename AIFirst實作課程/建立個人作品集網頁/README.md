# 建立個人作品集網頁

> 建立個人作品集網頁主要目的是讓學生學習如何使用 Vite + React + TypeScript 結合現代化前端技術，打造出個人專屬的網站。同時學習如何將資料結構與 UI 元件進行抽離與綁定。

## Prompt

請複製以下 Prompt 貼給 AI (如 ChatGPT, Claude)，讓 AI 幫你建立完整的專案架構，同時為你生成專屬的個人假資料：

```text
角色：你是一位資深的前端工程師，擅長使用 Vite, React 和 TypeScript 進行現代化網頁開發。

任務：請幫我建立一個「個人作品集網頁」的單頁應用程式 (SPA)。
技術棧：Vite + React + TypeScript + Tailwind CSS (或一般 CSS 模組)

需求步驟：

1. 建立假資料 (Mock Data) 與型別定義
   - 請幫我建立一個 `src/data/portfolioData.ts` 檔案，裡面包含豐富的假資料。
   - 必須清楚定義好 TypeScript 的介面 (Interface)，例如：`PersonalInfo` (基本資料), `Skill` (技能), `Experience` (工作經歷), `Project` (專案作品)。
   - 請隨意幫我捏造一個「前端工程師」的詳細資料，包含：中英文姓名、職稱、自傳、大頭貼圖片網址 (可使用 placeholder API)、GitHub/LinkedIn 連結。
   - 請產生 2~3 項生動的工作經歷 (包含時間、公司、職稱與工作內容描述)。
   - 請產生 2 個專案作品 (包含專案截圖網址、使用的技術標籤陣列、簡短描述)。
   - 請產生前端與後端相關的技能清單。

2. 建立主要 UI 元件
   - 請根據上述的資料結構，建立 4 個主要區塊的元件：
     - Hero (個人簡介與大頭貼)
     - Skills (技能清單列表)
     - Experience (工作經歷時間軸)
     - Projects (作品集卡片列表)
   - 資料來源必須從 `portfolioData.ts` 引入並透過 props 或直接引入來渲染，資料與 UI 必須抽離，不要將文字寫死在元件中。

3. 設計與排版
   - 網頁必須是響應式設計 (RWD)，在手機版與桌面版都能良好閱讀。
   - UI 設計風格希望是乾淨、現代化，並具備良好的留白與排版。
   - 請在按鈕或卡片上加入微小的 hover 動畫或陰影過渡效果增加互動感。

請直接提供完整的 `portfolioData.ts` 程式碼，以及各個元件的完整程式碼與 `App.tsx` 的最終組合方式。
```
