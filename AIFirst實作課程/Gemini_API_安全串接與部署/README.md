# Gemini API 安全串接與部署

## 本單元學習重點

我們以 **Google AI Studio／Gemini API** 為例，學會一種**可部署、可維護**的整合方式：把 **API 金鑰留在伺服器端**，瀏覽器裡的前端**只呼叫你自己提供的 HTTP API**，而不直接向 Google 帶金鑰。這樣做，才能把作品安全地放上 **GitHub** 與各種託管環境，而不怕金鑰外洩。

---

## 一、常見架構與實務對照

下列做法與業界常見實務一致，也是我們在課堂上會實際演練的方向：

| 要點 | 說明 |
|------|------|
| **三層：介面 → 後端 → Gemini** | 公開網站不應在瀏覽器端持有 Gemini API key；由後端集中保管金鑰，並一併處理用量、商業邏輯與日後擴充。 |
| **GitHub Pages + 獨立 Serverless** | GitHub Pages **只提供靜態網頁**，因此呼叫 Gemini 的 API 須部署在 **Vercel、Cloudflare Workers、Netlify Functions、Cloud Functions** 等可執行程式碼的環境。前後端網域不同時，後端需設定 **CORS**，允許你的前端網域存取。 |
| **Next.js 全端專案** | 頁面與 **API Route／Route Handler** 可放在**同一個儲存庫**，部署到 **Vercel**（或其他支援 Node 的平台）時，前後端整合較單純。 |
| **獨立後端（FastAPI／Express 等）** | 適合產品級需求（登入、資料庫、權限）；維運成本較高，本系列可列為進階延伸。 |
| **以 Service 層封裝 Gemini** | 建議將「如何呼叫模型、如何組 prompt、重試與紀錄」集中在 `services/` 等模組；路由層只處理 HTTP。日後更換模型或供應商時，改動範圍較小。 |

**請特別留意**：Gemini 的 **REST 路徑與模型名稱**會隨版本更新。實作時請以 [Google AI Studio](https://aistudio.google.com/) 產生的範例與**官方文件**為準，避免沿用過時的範例（例如舊版模型名稱）。

當我們說「在 GitHub 上部署」時，通常是指：**程式碼託管在 GitHub**，再透過 **GitHub Actions** 或各平台「連線 GitHub 儲存庫」自動建置與部署。靜態網頁可用 **GitHub Pages**；需要運算能力的 API，則多半部署在**其他平台**，或由 **Next.js 全端**在同一平台一併處理。

---

## 二、為什麼需要後端這一層？

若在瀏覽器直接呼叫 Gemini，**API key 會暴露給任何人**，也難以做好**限流、計費、商業邏輯、紀錄與快取**。因此本單元採用的基本架構是：

**前端 → 你撰寫的 HTTP API → Gemini**

金鑰只出現在**執行後端程式**的環境（例如 Serverless 的環境變數），而不是出現在前端程式或公開儲存庫裡。

---

## 三、部署模式概覽（由簡到繁）

可依班級進度選擇主軸，其餘作為對照。下表幫助你快速比對三種常見形態：

| 模式 | 適合什麼情境 | 架構概念（一句話） |
|------|----------------|-------------------|
| **A. 靜態前端 + Serverless API** | 入門、原型、與 GitHub Pages 搭配 | 靜態託管 → Serverless 函式 → Gemini |
| **B. Next.js 全端** | 需要較完整路由、SEO、前後端同倉庫 | Next.js（頁面 + `app/api` 或 `pages/api`）→ Gemini |
| **C. 獨立後端服務** | SaaS、多人使用、資料庫與權限 | 前端 → FastAPI／Node API → Service 層 → Gemini（必要時加資料庫） |

---

## 四、示範小專案（三個）

### 4.1 我們要達成什麼？

本單元透過**三個可實際部署的小專案**，讓你具體看到：**Gemini API key 只存在伺服器端的環境變數**，**不**寫進前端、**不**提交到公開 GitHub；並體驗 **「靜態站 + 獨立 Serverless」** 與 **「Next.js 全端、同倉庫」** 兩條常見路線。

**三個小專案連結（各資料夾內另有說明）：**

- [專案一：GitHub Pages + Vercel Serverless](./projects/01-github-pages-and-vercel-serverless/README.md)
- [專案二：GitHub Pages + Cloudflare Workers](./projects/02-github-pages-and-cloudflare-workers/README.md)
- [專案三：Next.js on Vercel](./projects/03-nextjs-vercel/README.md)

（[`projects/` 目錄總覽](./projects/README.md)）

| 編號 | 架構 | 建議託管（可替換為同類服務） | 你將練習驗證的重點 |
|------|------|---------------------------|-------------------|
| [**專案一**](./projects/01-github-pages-and-vercel-serverless/README.md) | **GitHub Pages**（靜態前端）+ **Serverless API** | 例如 **Vercel**（Serverless Functions／Edge API） | 前端只呼叫你的 `https://…` API；在 **Vercel 專案環境變數** 設定 `GEMINI_API_KEY`；設定 **CORS** 以允許 Pages 網域。 |
| [**專案二**](./projects/02-github-pages-and-cloudflare-workers/README.md) | **GitHub Pages** + **另一套 Serverless**（與專案一**不同平台**） | 例如 **Cloudflare Workers**（或 **Netlify Functions**） | 再次實作「金鑰只在該平台後台」：靜態站與程式碼中仍不出現真鑰；並對照 **Wrangler／儀表板** 與專案一的設定差異。 |
| [**專案三**](./projects/03-nextjs-vercel/README.md) | **Next.js**（頁面 + API Route／Route Handler） | **Vercel**（與 Next 整合） | 在**同一份 repo** 中區分：瀏覽器載入的是頁面；**`app/api`／`pages/api` 僅在伺服器執行**，於該處讀取環境變數並呼叫 Gemini。 |

### 4.2 三個專案共同的實作規範

- 儲存庫內只放 **`.env.example`**（列出變數名稱，例如 `GEMINI_API_KEY`），**不要**放入真實金鑰。
- 功能可以極簡（例如一個輸入框與按鈕，經後端回傳一句 Gemini 文字）；重點在於 **部署流程** 與 **金鑰如何流動**。
- 部署完成後，請開啟瀏覽器 **開發者工具 → Network**，自行確認：請求中**沒有**把 Gemini key 放在 query、可被前端讀取的檔案或公開 header；金鑰只應存在於**後端執行環境**（若使用 **GitHub Actions** 自動部署，則另需理解 **Secrets** 與平台環境變數的分工，見下文）。

### 4.3 與本資料夾 `projects/` 的對應

我們在課程資料夾內已預留三個子目錄，方便你各放一個**最小可部署範例**（名稱可依需要微調）：

```
Gemini_API_安全串接與部署/
├── projects/
│   ├── 01-github-pages-and-vercel-serverless/   # 靜態 + Vercel API
│   ├── 02-github-pages-and-cloudflare-workers/ # 靜態 + Cloudflare（與 01 不同平台）
│   └── 03-nextjs-vercel/                        # Next.js 全端 → Vercel
└── README.md
```

對應連結：[專案一](./projects/01-github-pages-and-vercel-serverless/README.md) · [專案二](./projects/02-github-pages-and-cloudflare-workers/README.md) · [專案三](./projects/03-nextjs-vercel/README.md) · [`projects/README.md`](./projects/README.md)

若你希望兩個「Pages + Serverless」都留在 **Vercel** 生態，也可以改為「一個用 Vercel Functions、一個用 **Cloudflare Workers**」；重點是**兩種後台的設定方式**都能親自操作過。

---

## 五、建議的專案結構（概念）

```
專案根目錄/
├── frontend/          # Next.js 時可與 app/ 合併
├── backend/ 或 api/   # Serverless 入口或獨立服務
│   └── services/
│       └── geminiService.*   # 集中呼叫 Gemini，日後較易抽換
├── .env.example       # 僅範例變數名，不含真實金鑰
└── README.md
```

- **Prompt 模板** 可放在 `prompts/` 或程式常數中，依團隊習慣即可。
- **`.env`**：本機與各部署平台分別設定；請**不要**將含真鑰的 `.env` 推送到公開 GitHub。

---

## 六、環境變數與 CI/CD

我們會使用像 `GEMINI_API_KEY`、`MODEL_NAME` 這類環境變數。**建置靜態前端時**，請勿將金鑰寫入或打包進 **JavaScript bundle**，否則等於公開金鑰。

### 6.1 GitHub Secrets 是什麼？

**Secrets** 是 GitHub 在儲存庫（或組織）內提供的**機密變數**存放處，用來保存 API 金鑰、token、密碼等，**不要**直接寫在程式碼或公開說明文件中。

- 常見路徑：**Settings → Secrets and variables → Actions**，新增名稱（例如 `GEMINI_API_KEY`）與內容。
- 儲存後，一般瀏覽儲存庫的人**無法看到**實際值；**GitHub Actions** 執行時可依名稱讀取，並**注入為環境變數**，供建置或部署步驟使用。
- 如此一來，金鑰留在 GitHub 的受控機制內，**不會進入 git 歷史或公開檔案**。

### 6.2 為什麼會用到 GitHub Actions？

**GitHub Actions** 是 GitHub 內建的 **CI/CD**：在 push、建立 PR、手動觸發等事件時，自動執行安裝依賴、建置、測試、**部署到 Vercel 或其他雲端** 等步驟。

部署過程常需要 `GEMINI_API_KEY`，但我們**不能**把它寫死在儲存庫裡；而本機的 `.env` 也**不會**自動出現在 GitHub 雲端的 runner 上。因此，若由 **GitHub 自動建置與部署**，當 Workflow 需要金鑰時，應透過 **Secrets** 注入（例如 `${{ secrets.GEMINI_API_KEY }}`），而不是把金鑰提交進程式碼。

### 6.3 Serverless 後台已經設了 API key，還需要 GitHub Secrets 嗎？

這裡要分開兩件事：**「線上服務執行時，金鑰放在哪裡」**，以及 **「GitHub 上的自動化流程是否也需要那份金鑰」**。

- **讓已部署的服務正確讀到金鑰**：重點是放在**執行後端的那個平台**（Vercel、Cloudflare Workers、Netlify 等）的**環境變數**。瀏覽器與 GitHub 上的公開程式碼都不應內含金鑰。
- **若你完全不使用 GitHub Actions 來部署**，只在各平台後台手動或以圖形介面設定變數，則**可以只在該 Serverless／PaaS 後台設定金鑰**，不一定需要為「執行」另外建立 GitHub Secrets（但**仍請勿**將真鑰 commit 進儲存庫）。
- **需要 GitHub Secrets 的情況**：當你使用 **在 GitHub 上執行的**部署流程，且該流程**必須帶著金鑰**才能完成（例如 CLI 部署、建置步驟必須讀取環境變數）。此時雲端 runner 預設看不到你在 Vercel 後台設的變數，除非透過 Secrets 傳入，或改用平台提供的 OAuth／Deploy Hook 等進階整合。

**與 GitHub Pages 的關係**：Pages **只提供靜態檔**，無法在該處安全地存放會被前端讀出的金鑰。因此金鑰應放在 **Serverless／後端**，或由 **CI 在後端建置流程中**注入；這也是本單元會同時談到 **Pages + Serverless** 與 **Secrets + Actions** 的原因。

| 情境 | 金鑰主要放在哪裡 |
|------|----------------|
| 以 **Vercel／Cloudflare 等後台** 連線儲存庫部署，金鑰只在該平台設定 | **不一定**需要為「執行」再建立 GitHub Secrets；但**儲存庫內仍不要**提交真鑰 |
| **GitHub Actions** 自動部署，且步驟中必須讀取金鑰 | 使用 **GitHub Secrets** 注入；**不要**寫進程式碼 |

---

## 七、建議的課堂節奏（約）

1. 在 **Google AI Studio** 建立 **Gemini API** 金鑰，並牢記：**不要**將金鑰寫入公開儲存庫。
2. 認識 **Serverless**：由託管方依請求執行程式碼，無需自行維護主機。
3. 依序或分組完成**三個示範小專案**：兩個 **GitHub Pages + 不同 Serverless**，一個 **Next.js on Vercel**；每一案都實作**後端代理 Gemini** 與**環境變數**設定。
4. 練習在本機、各平台後台、以及必要時在 **GitHub Secrets** 中設定變數；部署後以瀏覽器或 curl 測試，並用 **Network** 確認金鑰未外洩。
5. 整理**部署步驟**與**錯誤排查**心得（常見議題包括：CORS、金鑰權限、模型名稱、區域與配額）。

### 與本系列其他單元的銜接

若課程中已涵蓋 **GitHub Pages、workflow、Vibe coding**，建議學習順序為：先透過**兩種「靜態前端 + Serverless API」**對照不同平台，再以 **Next.js 全端 on Vercel** 體驗「同倉庫前後端」；貫穿其中的主軸始終是 **如何保護 API key**。

---

## 八、學習成果（產出）

請完成**三個示範小專案**所要求的**最小可部署版本**（若課程另有規定，亦可改為必交其中兩案），並簡要說明：

- **金鑰實際放在哪個環境**（平台環境變數、Secrets，或兩者如何搭配）；
- **你如何確認前端沒有持有金鑰**；
- 若使用 **GitHub Actions**，**Secrets** 與**平台環境變數**各自負責什麼。

---

## 九、實作檔案放置說明

- 建議在下列三個資料夾各放置一個子專案（見第四節）：[專案一](./projects/01-github-pages-and-vercel-serverless/README.md)、[專案二](./projects/02-github-pages-and-cloudflare-workers/README.md)、[專案三](./projects/03-nextjs-vercel/README.md)；每個子資料夾內可另有 **README**（部署步驟、環境變數名稱）。
- 請附上雲端／託管平台的設定備註，以及環境變數範例（**勿提交金鑰**）。
- 請包含 API 路由與 **Service 層** 程式，以及根目錄或子專案內的 **`.env.example`**。

---

## 十、可延伸主題（選讀）

- **Function calling**：在 service 層定義工具與 Gemini 的往返格式。
- **快取**：降低重複 prompt 的 token 消耗（須注意資料隱私與時效）。
- **LangChain／其他框架**：與 Gemini 整合時，仍建議將金鑰與重試邏輯保留在後端。
