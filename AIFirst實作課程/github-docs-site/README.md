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
