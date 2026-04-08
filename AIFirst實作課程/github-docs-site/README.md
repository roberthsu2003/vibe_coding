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

## 3. 修改 Vite 建置配置 (適用於 GitHub Pages)

由於 GitHub Pages 免費版支援直接讀取儲存庫 (Repository) 下的 `docs/` 資料夾作為網站根目錄，因此我們要把 Vite 原本預設的輸出目錄 (`dist/`) 改為 `docs/`，並修正基礎路徑 (`base`) 使資源能順利載入。

### 3-1 修改 `vite.config.ts`

請開啟專案根目錄下的 `vite.config.ts`，並在設定中加入 `base` 與 `build.outDir` 欄位：

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ⚠️ base 設定：若您的專案名稱是 "my-repo"，請設為 "/my-repo/"
  // 若是要作為使用者首頁 (username.github.io)，則設為 "/" 即可。
  base: '/<您的 GitHub 儲存庫名稱>/', 
  
  plugins: [react()],
  
  build: {
    // ⚠️ 更改輸出目錄為 docs
    outDir: 'docs', 
  },
});
```

> **💡 關於 `base` 的重要說明：**
> GitHub Pages 首頁網址通常形如 `https://<帳號>.github.io/<儲存庫名稱>/`。
> 若您的 Repo 命名為 `__test__`，則這裡請填入 `base: '/__test__/'`（前後均需保留斜線）。這樣打包出的 HTML 才會找對相對路徑讀取 JS/CSS 檔案。

### 3-2 新增自動清理指令（可選）

開啟 `package.json`，您可以在 `scripts` 中新增一筆 `clean` 指令，方便未來重新打包前能先清空舊的 `docs` 資料夾：

```json
"scripts": {
  "clean": "rm -rf docs",
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

### 3-3 檢查 `.gitignore`

如果您的專案原本設定有將 `dist` 或 `docs` 加進忽略清單中，請開啟 `.gitignore` 檔案檢查：
- **請確保 `.gitignore` 中沒有包含 `docs`**，否則我們辛苦打包出來的成品將無法推送到 GitHub。

---

## 4. 執行建置並匯出靜態檔案

確認上述設定都已完成後，就可以在終端機執行建置打包：

```bash
# 產出靜態網頁檔案，並存放至專案的 docs 資料夾
npm run build
```

建置完成後，您會在專案根目錄中看到一個新增的 `docs` 資料夾，裡面就是編譯好的靜態網頁內容！

**提供變更後的專案資料夾**

- [專案完成zip檔](./專案完成/dual-competition-timers完成.zip)
- [專案完成資料夾](./專案完成/dual-competition-timers完成)

---

## 5. 推送程式碼並發佈至 GitHub Pages

最後，將成果上傳到 GitHub 並啟動 GitHub Pages 服務：

1. **提交並推送所有修改**：將程式碼（包含剛生成的 `docs` 資料夾）使用 Git `commit` 以及 `push` 到您的 GitHub 儲存庫。
2. **前往 GitHub 倉庫設定**：
   - 點擊您的 Repo 上方選單的 **`Settings`**
   - 從左側邊欄找到 **`Pages`** 選項
3. **設定 Build and deployment**：
   - **Source**: 選擇 `Deploy from a branch`
   - **Branch**: 第一格選擇您要部署的主分支 (例如 `main` 或 `master`)，第二個資料夾下拉選單**請選擇 `/docs`** (這代表 GitHub Pages 要讀取根目錄下的 `docs` 資料夾作為網站)。
   - 點選 **Save** 儲存。
4. **大功告成 🎉**：
   等待約 1~2 分鐘，重新整理頁面，就會看到上方出現部署成功的網址（例如 `https://<您的帳號>.github.io/<專案名稱>/`）。點選該網址即可看到您的網頁成品了！

--- 

## 使用githbu action自動部署


使用 GitHub Actions 來自動執行 `npm install` 和 `npm run build`，並且自動將建置好的檔案部署到 GitHub Pages。這是目前非常主流且推薦的做法！

專案是使用 **Vite** 建置的（根據您的 `package.json` 內容可以看出有 `vite build` 指令），設定起來非常簡單。以下是您可以如何完成設定的步驟：

### 第一步：設定 Vite 的 Base URL (在 `vite.config.ts` 中)

如果您將要把專案部署到一個名為 `vibe_coding` (或其他名稱) 的 GitHub 儲存庫（其網址會像是 `https://<你的帳號>.github.io/<儲存庫名稱>/`），您需要在您的 `vite.config.ts` 裡面設定 `base` 屬性，這樣打包出來的資源路徑才會正確：

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 將這裡替換成您未來在 GitHub 上的 repository 名稱
  // 例如：您未來的 repo 叫做 "my-timer-app"，這裡就填 '/my-timer-app/'
  base: '/<你的 repository 名稱>/', 
  plugins: [react()],
})
```
*(注意：如果您的 repository 名稱就是 `<你的帳號>.github.io`，則不需要設定 `base` 或將其設定為 `'/'`)*

### 第二步：建立 GitHub Actions 工作流程檔案

在您的專案根目錄下，建立資料夾 `.github/workflows/`，並在裡面新增一個檔案，例如叫做 `deploy.yml`。這個檔案會告訴 GitHub 什麼時候要執行什麼指令。

檔案內容請貼上以下程式碼：

```yaml
# .github/workflows/deploy.yml
name: Deploy static content to Pages

on:
  # 當有程式碼 push 到 main 分支時觸發
  push:
    branches: ['main'] # 如果您的主要分支叫 master，請改為 'master'

# 設定權限以允許部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允許一個 concurrent 部署，避免衝突
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  # 第一個工作：建置專案 (npm install & build)
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20 # 使用 Node.js 20 
          cache: 'npm'     # 快取 npm 套件加速之後的建置
          
      - name: Install dependencies
        run: npm ci # 使用 ci 可以確保根據 package-lock.json 完全復原依賴，比 install 更穩定
        
      - name: Build project
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # 將您的建置資料夾(通常 Vite 的預設資料夾是 dist) 打包上傳
          path: './dist'

  # 第二個工作：將剛剛建置好的檔案佈署至 GitHub Pages
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 📋 deploy.yml 設定檔詳細說明

以下表格詳細說明了上方 YAML 檔案中的每一個重要設定區塊。**請特別注意標示為「必填」與包含「重點」的項目，必須符合您的專案現況。**

| YAML 設定階層 / 名稱 | 描述說明 | 是否必填 | 重點註記 ⚠️ |
| :--- | :--- | :---: | :--- |
| `name` | 工作流程名稱（顯示於 GitHub Actions 頁面上） | 否 | 建議保留，方便在後台上辨識用途。 |
| `on` > `push.branches` | 觸發自動部署的條件與監聽的分支 | **是** | **⭐ 重要：** 預設監聽 `['main']`。如果您的主要分支名稱是 `master`，請務必將其改為 `['master']`！ |
| `permissions` | 賦予 Action 腳本讀寫 GitHub Pages 的系統權限 | **是** | 絕對必要設定。若缺少 `contents`, `pages`, `id-token` 等權限將會部署失敗。 |
| `concurrency` | 併發控制。防止在短時間內連續 Push 造成多個部署任務打結。 | 否 | 建議保留。若有新推送會自動取消舊部署，確保最後能上線最新版。 |
| `jobs` | 宣告各個工作階段。目前分為 `build` 與 `deploy` 兩階段。 | **是** | |
| └ `build` | **工作階段一：專案建置** (專案打包出靜態網頁) | **是** | |
| 　└ `runs-on` | 指定執行這項工作的雲端虛擬作業系統環境 | **是** | 使用官方預設的 `ubuntu-latest` 即可。 |
| 　└ `steps` > `setup-node` | 建立專案需要的 Node.js 環境 | **是** | 預設指定 `node-version: 20`，可根據開發環境做對應更改。 |
| 　└ `steps` > `npm ci` | 安裝相依套件 (功能類似 `npm install`) | **是** | 持續整合環境下建議使用 `npm ci` 來保證依賴版本的絕對一致。 |
| 　└ `steps` > `npm run build` | 執行 Vite (或專案設定) 的建置指令 | **是** | 會根據專案 `package.json` 中的 `build` 腳本，編譯為靜態檔案。 |
| 　└ `steps` > `upload-pages-artifact`| **⭐ 核心步驟：** 找到打包完成的靜態檔並上傳至快取 | **是** | **⭐ 最重點：`path: './dist'` 必須和您設定的打包目錄一致！** 如果改成了 `./docs`，請務必在這裡修改！(Vite 預設為 `./dist`) |
| └ `deploy` | **工作階段二：發行部署** (將打包好的網頁發布) | **是** | |
| 　└ `needs: build` | 指定這一步驟必須「依賴」並等待 `build` 成功。| **是** | 沒加的話兩個階段會同時跑，導致找不到靜態資源而中途出錯。 |
| 　└ `uses: deploy-pages` | 呼叫官方所撰寫的「發布至 GitHub Pages 工具」腳本 | **是** | 實際將網頁放置並發布的官方必備流程。 |

<br>

### 第三步：在 GitHub 上的 Pages 設定

當您將這些程式碼與設定檔一起 Push 到 GitHub 之後，您還需要調整 Repository 的設定：
1. 到您 GitHub 專案網頁，點選上方的 **Settings**。
2. 點擊左側邊欄的 **Pages**。
3. 在 **Build and deployment** > **Source** 的下拉式選單中，選擇 **GitHub Actions**。

一旦這個設定完成，而且這個 `.yml` 檔案被上傳到 `main` 分支，GitHub 就會自動幫你執行 `npm install` 與 `build`，並把 `dist` 資料夾發布成網頁了！

