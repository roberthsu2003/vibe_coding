# 🤖 AI First 實作課程

> 從零開始，用 AI 工具打造屬於你的網頁應用程式

---

## 📚 基本觀念

| 主題 | 說明 |
|------|------|
| [🔍 認識 Google AI Studio](./認識GoogleAIStudio/) | 了解 Google AI Studio 的功能與使用方式 |
| [🌐 前端 / 後端 / 全端 / 網頁設計介紹](./前端_後端_全端_網頁設計介紹/README.md) | 釐清各類開發角色的差異與職責 |

---

## 🖥️ 前端網頁範例

> 💡 **新手友善**：在 Google AI Studio 開發與一鍵部署至 Google Cloud Run **不需先申請 GitHub 帳號**！只有需要部署至 GitHub Pages 時才需申請。

| 專案 | 說明 | 備註 |
|------|------|------|
| [📊 建立線上簡報網頁](./建立線上簡報網頁/README.md) | 打造現代化線上互動簡報（從單頁簡報出發，逐步解鎖 SVG 動畫、Chart 動態圖表與 3D 視覺互動） | 上班族神器 ⭐ |
| [🖼️ 加入圖片和音樂](./加入圖片和音樂/README.md) | 豐富網頁的多媒體內容（學習靜態資源放置、圖片載入與音訊控制） | 多媒體核心 🎵 |
| [🎮 建立小遊戲](./建立小遊戲/) | 用 AI 協助設計互動小遊戲（整合狀態機、動畫與多輪迭代） | 綜合應用 🕹️ |

### 💼 辦公室自動化進階實戰（難度較高 ⭐⭐⭐）

| 專案 | 說明 | 備註 |
|------|------|------|
| [📑 Excel 佔位符單據產生器](./Excel佔位符單據產生器/README.md) | 通用型單據產生器：動態解析 `{{變數 \| 預設值}}` 佔位符、支援上傳自訂範本與純前端保留樣式下載 | 純前端 ExcelJS 模板引擎 |

### ☁️ 部署教學

> 💡 **教學順序與路徑說明**：Google AI Studio 現已支援直接一鍵部署至 **Google Cloud Run（每個免費帳號提供 2 個免費專案額度）**，因此課堂會優先教學 Google Cloud Run 發布，學生**完全不需先申請 GitHub 帳號**即可立刻擁有公開網址分享成果；後續若需要將專案託管於 GitHub，才需進一步申請 GitHub 帳號。

#### 1️⃣ 第一階段：Google Cloud Run 一鍵部署（首選推薦・免 GitHub 帳號）

- **適用情境**：在 Google AI Studio 完成專案後，一鍵生成對外公開網址分享給主管與同事。
- **免費額度**：每個帳號可同時擁有 **2 個免費版** 的 Cloud Run 部署。
- **教學連結**：[透過 Google AI Studio 一鍵部署至 Google Cloud Run](./認識GoogleAIStudio/README.md#-核心概念解析share-remix-publish-deploy)

#### 2️⃣ 第二階段：GitHub Pages 靜態網站部署（進階託管・需 GitHub 帳號）

- **適用情境**：僅適用於無 API Key 的純靜態網頁（如：簡報、多媒體、Excel 佔位符單據產生器）。
- **帳號需求**：⚠️ 此階段才需要申請 [GitHub 帳號](https://github.com)。
- **教學連結**：[將靜態網頁部署至 GitHub Pages](https://github.com/roberthsu2003/vibe-coding-to-pro-react/blob/main/github-docs-site/README.md)

---

### 🛡️ 資安關鍵防線：API Key 洩漏風險與安全邊界（必讀 ⚠️）

> 🚨 **極重要紅線警示：靜態網頁（GitHub Pages）絕對嚴禁存放 API Key！**  
> - **為什麼會洩漏？** 靜態網頁的所有 JavaScript 在瀏覽器中都是完全公開的，任何訪客按 `F12` 就能複製你的 API Key；若上傳至 GitHub 公開儲存庫，30 秒內就會被全球掃描爬蟲機器人盜用刷爆。  
> - **安全唯一解**：凡是涉及 Gemini API Key、Google 服務授權或資料庫的應用，**一律嚴禁部署至 GitHub Pages**，必須全面採用 **Google AI Studio 的 Backend Proxy（伺服器代理）技術**，一鍵部署至 **Google Cloud Run** 安全運行！  
> 
> 👉 深入閱讀：[為什麼靜態網頁會洩露 API Key 實例解析](./為什麼靜態網頁會洩露api_key/README.md)

---

## 🚀 全端網頁應用實戰（Google AI Studio Backend Proxy 安全架構）

> 🛡️ **安全無憂・全新全端架構**：本系列專案全面採用 **Google AI Studio 原生的 Backend Proxy（伺服器代理）技術**！
> - **零金鑰外洩風險**：所有 Gemini API Key、OAuth 授權碼與資料庫憑證均由伺服器端環境變數保護，**完全不會暴露給前端瀏覽器**，學員無須自行架設 Vercel Serverless 或外部伺服器。
> - **一鍵雲端部署**：完成專案後，直接透過頂部 **Publish 按鈕一鍵部署至 Google Cloud Run**，立即擁有專屬的正式上線網址！

### 🤖 Gemini AI 核心應用實戰（Backend Proxy 安全代理）

| 專案 | 說明 | 備註 |
|------|------|------|
| [✍️ 用 AI 寫總結和翻譯](./⽤AI寫總結和翻譯/README.md) | 讓 AI 自動摘要並翻譯文章 | 核心文字模型 ✍️ |
| [📊 AI 分析與洞察](./AI分析與洞察/README.md) | 利用 AI 解讀資料趨勢與圖表洞察 | 數據分析模組 📊 |
| [💬 Chatbot 建立](./Chatbot建立/) | 打造具備對話記憶的專屬客服機器人 | 對話狀態管理 💬 |

### ⚡ Google Workspace 原生整合（試算表與日曆自動化）

| 專案 | 說明 | 備註 |
|------|------|------|
| [⚡ Workspace 智慧單據報銷系統](./Workspace智慧單據報銷系統/README.md) | 發票收據照片辨識、動態解析明細，一鍵寫入雲端 Google Sheets 試算表並生成請款單 | Google Workspace 整合 ⚡ |
| [📅 AI 會議紀錄與行事曆整合](./AI會議紀錄與行事曆整合/README.md) | 貼上雜亂會議紀錄，AI 自動萃取待辦寫入試算表，並將關鍵 Deadline 同步排入 Google 日曆 | Sheets + Calendar 雙整合 🗓️ |

### 🔥 整合 Firebase — 即時雲端資料庫與使用者認證（免綁卡・免費首選）

> 💡 **初學者友善**：採用 Firebase Spark 免費方案，**完全不需要輸入信用卡**，即可享有每日 5 萬次免費資料庫讀寫配額，安全無扣款風險！

| 專案 | 說明 | 備註 |
|------|------|------|
| [🏢 辦公室設備借用系統](./辦公室設備借用系統/README.md) | 投影機、展示筆電等公用資產登記，支援即時借用狀態更新與借用人追蹤 | Firebase Auth + Firestore 🏢 |
| [📋 部門專案即時協作看板](./部門專案即時協作看板/README.md) | 跨部門任務看板（Kanban），支援多人即時同步拖曳狀態與逾期提醒 | Firebase Auth + Firestore 📋 |

---

## 🌐 傳統外部部署進階參考（Vercel Serverless 方案）

> 💡 **進階選讀**：若您未來在 Google AI Studio 之外手動建構獨立全端網站，並打算將後端託管於 Vercel，可參考以下外部部署架構：
> - [Vercel 簡介完整說明](https://github.com/roberthsu2003/vibe-coding-to-pro-react/tree/main/00-Vercel%E7%B0%A1%E4%BB%8B/README.md)
> - [透過 Vercel Serverless Functions 保護 API Key](https://github.com/roberthsu2003/vibe-coding-to-pro-react)

---

## 📊 整合 Google Sheets（傳統 GAS 方案）

| 專案 | 說明 | 備註 |
|------|------|------|
| [📋 線上訂飲料系統](./線上訂飲料系統/README.md) | 線上訂飲料系統 | 使用GAS |
| [⚙️ 庫存管理](./庫存管理/README.md) | 個人公司庫存管理| 使用GAS |

---

## 💬 整合通訊軟體

| 平台 | 狀態 |
|------|------|
| 🤖 Telegram Bot 的建立與應用 | 即將推出 |
| 🟢 Line Bot 的建立與應用 | 即將推出 |

## 🗄️ 整合 Supabase — 認證與資料庫

| 專案 | 說明 | 備註 |
|------|------|------|
| [🔐 管理者登入](./管理者登入/README.md) | 實作帳號驗證與權限控管 | |
| [💰 記帳網頁](./記帳網頁/README.md) | 個人收支管理系統 | |
| 🛒 POS 應用程式 | 銷售點管理系統 | 即將推出 |




