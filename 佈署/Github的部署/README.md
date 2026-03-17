# 將專案部署至 GitHub Pages

本頁說明三種常見情境下，如何把專案部署到 **GitHub Pages**，讓網站可透過 `https://<使用者名稱>.github.io/<倉庫名稱>/` 存取。

---

## 前置準備

1. **GitHub 帳號**：已註冊並登入。
2. **專案已在 GitHub 上**：程式碼已推送到 GitHub 倉庫（Repository）。
3. **開啟 GitHub Pages**：
   - 進入倉庫 → **Settings** → 左側 **Pages**
   - **Source** 選擇 **Deploy from a branch**
   - **Branch** 選擇要部署的分支（如 `main`）與資料夾（如 `/ (root)` 或 `/docs`）
   - 儲存後，GitHub 會自動部署，數分鐘後可從上方顯示的網址進入網站。

以下依三種專案類型分別說明。

---

## 1. 前端靜態網站（HTML、CSS、JavaScript）

純靜態檔案，沒有建置步驟，直接讓 GitHub Pages 提供這些檔案即可。

### 步驟

1. **專案結構**（範例）：
   ```
   你的倉庫/
   ├── index.html      # 首頁
   ├── css/
   │   └── style.css
   ├── js/
   │   └── main.js
   └── 其他資源（圖片等）
   ```

2. **推送到 GitHub**：  
   將上述檔案放在倉庫根目錄（或你要用來部署的資料夾），`git push` 到 GitHub。

3. **設定 GitHub Pages**：  
   - **Settings** → **Pages**  
   - **Source**：Deploy from a branch  
   - **Branch**：`main`（或你使用的分支）  
   - **Folder**：`/ (root)`（若檔案在根目錄）或 `/docs`（若你放在 `docs` 資料夾）

4. **網址**：  
   - 若選 root：`https://<使用者名稱>.github.io/<倉庫名稱>/`  
   - 若倉庫名為 `<使用者名稱>.github.io`（個人/組織站）：`https://<使用者名稱>.github.io/`

### 注意事項

- **連結與資源路徑**：若網站不是在根路徑（例如 `https://user.github.io/repo-name/`），HTML 內引用 CSS/JS 時建議使用**相對路徑**（如 `./css/style.css`、`./js/main.js`），或從根寫起（如 `/repo-name/css/style.css`），避免找不到檔案。
- **單頁多檔案**：多個 HTML 時，連結請用相對路徑（如 `./game.html`）。

---

## 2. 前端專案（HTML、CSS、TypeScript、React、Vite）

需要先建置（build）再部署建置後的檔案。使用 **GitHub Actions** 自動建置並部署到 GitHub Pages 是常見做法。

### 步驟一：設定 Vite 的 base（重要）

GitHub Pages 的網址為 `https://<使用者名稱>.github.io/<倉庫名稱>/`，因此建置出的資源路徑必須以 `/<倉庫名稱>/` 為前綴。

在 **vite.config.ts**（或 **vite.config.js**）中設定 `base`：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/你的倉庫名稱/',   // 例如 '/vibe_coding/'，結尾斜線保留
})
```

若倉庫名稱會變動，可用環境變數（見下方 Actions 範例）。

### 步驟二：建立 GitHub Actions 工作流程

在專案根目錄建立 `.github/workflows/deploy.yml`（或類似檔名）：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]   # 依你的預設分支名稱修改，例如 main 或 master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        # 若建置輸出目錄不是 dist，請改為你的輸出目錄

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist'   # Vite 預設輸出為 dist，依專案調整

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步驟三：設定 GitHub Pages 使用 Actions

- 倉庫 **Settings** → **Pages**
- **Source** 改為 **GitHub Actions**（不要選 Deploy from a branch）

之後每次推送到 `main`（或你設定的分支），會自動執行建置並部署，網址為：  
`https://<使用者名稱>.github.io/<倉庫名稱>/`

### 若建置時需要動態 base

可在 `vite.config.ts` 用環境變數：

```ts
base: process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/',
```

並在 Actions 的 Build 步驟傳入（若用 `actions/checkout`，`GITHUB_REPOSITORY` 通常已存在）。

---

## 3. 全端專案（前端 + 後端 API，利用 API Proxy）

GitHub Pages **只能放靜態檔案**，無法執行後端程式。因此「全端」在此表示：

- **前端**：部署在 GitHub Pages（同上述 1 或 2）。
- **後端 API**：部署在其他服務（如 Render、Railway、Vercel Serverless、Fly.io 等）。
- **API Proxy**：在**開發階段**用 Vite（或其它工具）的 proxy 把前端的 `/api` 請求轉發到本機後端，避免 CORS；**正式環境**則由前端直接呼叫已部署的 API 網址（或透過你部署的 serverless 當 proxy）。

### 開發階段：Vite 的 proxy

在 **vite.config.ts** 中設定 proxy，讓前端請求 `/api` 時轉到本機後端：

```ts
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/你的倉庫名稱/',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',   // 本機後端位址
        changeOrigin: true,
        // 若後端路徑不是 /api，可改寫：rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})
```

前端呼叫時使用相對路徑即可，例如：`fetch('/api/users')`。開發時會由 Vite 轉發到 `http://localhost:3000`。

### 正式環境：API 網址

正式環境沒有 Vite dev server，需讓前端知道「後端 API 的實際網址」。常見做法：

1. **環境變數**：  
   建置時注入後端 API 的 base URL，例如：
   - `.env.production`: `VITE_API_BASE=https://your-api.onrender.com`
   - 程式碼：`const apiBase = import.meta.env.VITE_API_BASE || ''`  
   請求時：`fetch(\`${apiBase}/api/users\`)`

2. **後端部署**：  
   將後端部署到任一支援 Node/Python 等之服務（Render、Railway、Vercel Functions、Fly.io 等），取得 HTTPS 網址後，填到上述 `VITE_API_BASE`。

3. **CORS**：  
   後端必須允許前端網域（如 `https://<使用者名稱>.github.io`）跨域請求，否則瀏覽器會擋下。

### 流程整理

| 環境     | 前端請求方式              | 實際打到哪裏                    |
|----------|---------------------------|---------------------------------|
| 開發     | `fetch('/api/...')`        | Vite proxy → 本機後端 (如 :3000) |
| 正式     | `fetch(\`${VITE_API_BASE}/api/...\`)` | 你部署的後端 API 網址           |

### 若正式環境也要「隱藏 API 網址」或統一入口

- GitHub Pages 本身無法跑 proxy。若需要，可：
  - 在 **Vercel / Netlify** 等部署前端，並在該平台設定 **Rewrite/Proxy** 把 `/api` 指到你的後端；或  
  - 使用該平台的 **Serverless Functions** 當一層 proxy，再轉發到後端。  
- 這種情況下，前端可繼續用相對路徑 `/api/...`，由 Vercel/Netlify 負責轉發，但部署主體就不是「純 GitHub Pages」，而是「GitHub Pages 只當程式庫／文件」，實際對外網站在 Vercel/Netlify。

---

## 常見問題

- **部署後一片空白（React/Vite）**  
  多數是 `base` 沒設或設錯。請設成 `'/你的倉庫名稱/'`（含前後斜線），並重新建置、部署。

- **重新整理 404**  
  若使用 SPA（如 React Router），GitHub Pages 不會自動 fallback 到 `index.html`。可考慮改用 **Hash Router**（路徑含 `#`），或改用支援 SPA 的托管（如 Vercel、Netlify）。

- **資源 404（CSS/JS 找不到）**  
  檢查 HTML 與程式中的路徑是否為相對路徑或已含正確的 `base`（Vite 建置後會自動帶上 base）。

---

## 小結

| 類型           | 作法概要 |
|----------------|----------|
| 靜態 HTML/CSS/JS | 檔案放倉庫，Settings → Pages → Deploy from a branch，選分支與資料夾。 |
| React + Vite   | 設定 `base: '/倉庫名稱/'`，用 GitHub Actions 建置並以 deploy-pages 部署。 |
| 全端（API）    | 前端同上；後端部署到其他服務；開發用 Vite proxy，正式環境用環境變數指向後端 API 網址。 |
