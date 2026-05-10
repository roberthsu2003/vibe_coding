# 將靜態網頁部署至 GitHub Pages 

> **注意：** 本篇教學適用於以 **Vite** 作為打包工具的 React 靜態專案。若您的專案並非透過 Vite 建立，請先考慮將專案遷移至 Vite 環境，再依照本篇進行部署。（另外，由於 GitHub Pages 僅支援純前端靜態內容，因此不適合部署需依賴 Express 或其他後端伺服器的 BFF 架構專案。）

---

## 1. 練習專案：雙班競賽計時器

為了進行部署練習，我們提供了一個基於 Vite + React + TypeScript 所寫的「雙班競賽計時器」網頁小工具。

### 🤖 原始生成 Prompt 參考
```text
請用 vite-react-typescript 做單一網頁：
1. 兩個獨立計時器，給兩班比賽同時計時；
2. 每組有開始、暫停、重設；
3. 時間用 MM:SS（或 HH:MM:SS）、字大易讀；
4. 兩組互不干擾；
5. 不需後端。
請給完整程式碼與簡短操作說明。
```

### 📁 專案檔案下載

- [📥 雙班競賽計時器專案 (ZIP 檔)](./ai_studio_專案來源/dual-competition-timers.zip)
- [💻 雙班競賽計時器原始碼](./ai_studio_專案來源/dual-competition-timers/)

### 📂 專案架構參考

```text
dual-competition-timers/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    └── components/
        └── Timer.tsx
```

---

## 2. 本機端開發與測試

開始修改設定前，請先透過 AI 編輯器將專案 Clone 下來或在終端機中開啟目標資料夾，並確保專案在本地端能正常運行：

```bash
# 安裝所有依賴套件
npm install

# 啟動開發用伺服器進行測試
npm run dev
```

確認網頁能順利呈現且功能正常後，我們再進行後續打包設定。

---

## 3.0 修改 Vite 配置 (GitHub Pages 必備設定)

在部署到 GitHub Pages 之前，我們需要修正 Vite 的基礎路徑 (`base`)，確保網頁資源（JS/CSS）在 GitHub 的網址下能被正確讀取。

### 修改 `vite.config.ts`

請開啟專案根目錄下的 `vite.config.ts`，並加入 `base` 欄位：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ⚠️ 重要設定：
  // 若您的 Repo 名稱為 "my-app"，請設為 "/my-app/"
  // 若是個人首頁 (username.github.io)，請設為 "/"
  base: '/<您的 GitHub 儲存庫名稱>/', 
  
  plugins: [react()],
});
```

> **💡 為什麼要設定 `base`？**
> GitHub Pages 的網址通常是 `https://<帳號>.github.io/<專案名>/`。如果不設定 `base`，網頁會去根目錄 `/` 找檔案，導致 404 錯誤。

---

## 4. 設定 GitHub Actions 自動部署 (推薦做法)

我們將使用 GitHub Actions 來達成「只要 Push 程式碼，GitHub 就自動幫我打包並上線」。這不需要手動執行 `npm run build`，也不需要在 Repo 中保留任何打包後的檔案（如 `dist` 或 `docs`）。

### 第一步：建立工作流程檔案

在您的專案根目錄下，建立資料夾 `.github/workflows/`，並在裡面新增一個檔案 `deploy.yml`。

請將以下內容完整複製到 `deploy.yml`：

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ['main'] # 如果您的主要分支叫 main，請確保這裡一致

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
          node-version: 20
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Vite 預設打包輸出的資料夾是 dist
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 第二步：推送程式碼

將修改好的 `vite.config.ts` 與 `.github/workflows/deploy.yml` 提交並推送至 GitHub：

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

### 第三步：更改 GitHub Pages 設定

這是最後一步，也是最關鍵的一步：

1. 到 GitHub 專案頁面，點選上方的 **Settings**。
2. 點擊左側邊欄的 **Pages**。
3. 在 **Build and deployment** > **Source** 下拉選單中，將 `Deploy from a branch` 改為 **GitHub Actions**。

---

## 5. 確認部署結果

1. 點擊 GitHub 頁面上方的 **Actions** 分頁，您會看到一個正在執行的任務。
2. 等待綠色勾勾出現後，回到 **Settings > Pages**，上方就會出現您的網頁網址。
3. 點開網址，恭喜您的 React 專案已成功透過 Actions 自動化部署！

---

## 常見問題 (FAQ)

**Q: 為什麼我的網頁是一片空白？**
A: 請檢查 `vite.config.ts` 中的 `base` 是否正確包含了儲存庫名稱，且前後都有斜線（例如 `/my-repo/`）。

**Q: 我需要把 dist 資料夾上傳到 GitHub 嗎？**
A: 不需要。GitHub Actions 會在雲端幫你打包，因此您的 `.gitignore` 應該保留 `dist`，讓儲存庫保持乾淨。

