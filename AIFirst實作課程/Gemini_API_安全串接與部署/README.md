# Gemini API 安全串接與部署

本單元以 **Google AI Studio／Gemini API** 為例，練習「可部署、可維護」的呼叫方式：**金鑰留在伺服器端**，前端只打你自己的 API。

---

## 架構可行性（驗證摘要）

以下與常見實務一致，**可行**：

| 要點 | 說明 |
|------|------|
| **三層：UI → 後端 → Gemini** | 正確。公開網頁不應直接帶 Gemini API key；後端可集中控管金鑰、用量與商業邏輯。 |
| **GitHub Pages + 獨立 Serverless** | 可行。GitHub Pages **只提供靜態檔**，API 須放在 **Vercel／Cloudflare Workers／Netlify Functions／Cloud Functions** 等；部署後需處理 **CORS**（後端允許你的前端網域）。 |
| **Next.js 全端一專案** | 可行且常見：API Route／Route Handler 與前端同倉庫，部署 **Vercel**（或其他支援 Node 的平台）一鍵較單純。 |
| **獨立 Backend（FastAPI／Express 等）** | 適合產品級、登入、資料庫、權限；部署成本與維運較高，可放在進階單元。 |
| **Service 層封裝 Gemini** | 建議。路由只負責 HTTP，模型與 prompt、retry、logging 集中在 `services/`，日後換模型或換 provider 較容易。 |

**需補充的細節（教學時請一併說明）：**

- **Gemini 的 REST 路徑與模型名稱** 會隨版本更新；請以 [Google AI Studio](https://aistudio.google.com/) 產生的範例與官方文件為準，不要硬抄舊版 `gemini-pro` 範例。
- **「GitHub 上部署」** 通常指：**程式碼在 GitHub**，透過 **GitHub Actions** 或平台連線倉庫自動建置／部署；靜態頁可 Pages，API 多半在別的平台（或同一平台若用 Next.js 全端）。

---

## 為什麼要有後端（簡述）

在瀏覽器直接呼叫 Gemini 會讓 **API key 暴露**、難以 **限流與計費**、也難以加入 **商業邏輯、logging、快取**。因此教學與實務都建議：**前端 → 你的 HTTP API → Gemini**。

---

## 部署模式對照（由簡到繁）

依課程深度擇一主軸即可，其餘當選修對照。

| 模式 | 適合 | 架構概念 |
|------|------|----------|
| **A. 靜態前端 + Serverless API** | 入門、prototype、與 GitHub Pages 搭配 | GitHub Pages（或任一靜態託管）→ Serverless 函式 → Gemini |
| **B. Next.js 全端** | 需要較完整 routing、SEO、前後端同倉庫 | Next.js（頁面 + `app/api` 或 `pages/api`）→ Gemini |
| **C. 獨立後端服務** | SaaS、多人、資料庫、權限 | Frontend → FastAPI／Node API → Service 層 → Gemini（+ DB） |

---

## 建議專案結構（概念）

```
專案根目錄/
├── frontend/          # 或 Next.js 時與 app/ 合併
├── backend/ 或 api/   # Serverless 入口或獨立服務
│   └── services/
│       └── geminiService.*   # 集中呼叫 Gemini、日後可抽換
├── .env.example       # 僅範例變數名，不含真實金鑰
└── README.md
```

- **Prompt 模板** 可放 `prompts/` 或程式內常數，依團隊習慣。
- **`.env`**：本機與各部署平台分別設定；**永遠不要**把含真鑰的 `.env` 推上公開 GitHub。

---

## 環境變數與 CI/CD（原則）

- 變數例：`GEMINI_API_KEY`（或平台慣用命名）、`MODEL_NAME` 等。
- **GitHub**：用 **Secrets** 存金鑰；Actions 內注入為環境變數再部署。
- **靜態網站**：建置時 **不要** 把金鑰打進 JS bundle。

---

## 課堂規劃（約）

1. 在 **Google AI Studio** 建立 **Gemini API** 金鑰；**絕不**將金鑰寫入公開儲存庫。
2. 簡介 **Serverless**：託管方依請求執行程式碼，無需自管主機。
3. 在選定託管環境建立 **HTTP 端點**，由後端呼叫 Gemini；前端只呼叫你的端點。
4. 練習 **環境變數**（本機／雲端）、部署後以瀏覽器或 curl 測試。
5. 整理 **部署步驟** 與 **錯誤排查**（常見：CORS、金鑰權限、模型名稱、區域與配額）。

### 建議主軸（與本系列課程銜接）

若課程含 **GitHub Pages、workflow、Vibe coding**：以 **「靜態前端 + Serverless API + Gemini」** 為主軸最直觀；進階再加 **function calling** 或 **Next.js 全端**。

---

## 作品（產出）

以託管環境串接 **Gemini API**，完成可重複部署的 **無伺服器 API** 練習（含環境變數與基本排查紀錄）。

---

## 實作請放此處

- 雲端／託管平台設定備註、環境變數範例（**勿提交金鑰**）。
- API 路由程式、部署說明或本資料夾內之 `README` 連結。

---

## 可延伸單元（選）

- **Function calling**：在 service 層定義工具與 Gemini 往返格式。
- **快取**：降低重複 prompt 的 token 消耗（需注意資料隱私與時效）。
- **LangChain／其他框架**：與 Gemini 整合時仍建議金鑰與重請求邏輯留在後端。
