# Vercel Serverless Functions 詳細說明

> 本文整理了 **Vite + React + TypeScript 靜態網站 + Vercel Serverless Functions + Gemini API** 這套架構的完整說明，包含成本分析、安全策略、與 BFF + Express 的比較，以及完整的部署流程。

---

## 一、整體架構概念

```
Browser
  ↓
Vite + React + TypeScript（靜態頁面，由 CDN 提供）
  ↓
Vercel Serverless Function（/api/gemini.ts）
  ↓
Gemini API（Google）
```

此架構的三大特點：

| 層級 | 型態 | 費用 |
|---|---|---|
| 前端（Vite + React） | 純靜態檔案 | 幾乎免費 |
| 後端（Vercel Serverless） | 按需執行，無需維護伺服器 | 很低／免費額度內 |
| AI（Gemini API） | 依 Token 計費 | 低（視使用量） |

> **整體總費用預估：每月 0 ~ 10 USD 以內，教學用途通常完全免費。**

---

## 二、各項成本分析

### 1. 靜態網站（Vite + React + TypeScript）

`npm run build` 後只會產生純靜態檔案：

```
index.html
assets/*.js
assets/*.css
```

可免費部署至：
- **GitHub Pages**
- **Vercel Static Hosting**
- **Cloudflare Pages**

以上平台均提供：全球 CDN 快取、HTTPS 憑證、自動部署，通常完全在免費額度內。

---

### 2. Vercel Serverless Function

Vercel **Hobby（免費方案）** 通常就足夠教學與個人專案使用：

- 每月提供一定的 Function 執行時數與呼叫次數
- 沒有 Request 時完全不計費（不像 Render Web Service 有 spin-down 問題）
- 自動 Scale，無需管理伺服器

**典型的 Gemini API Proxy Function 範例：**

```typescript
// /api/gemini.ts
export default async function handler(req: any, res: any) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY!,
      },
      body: JSON.stringify(req.body),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
```

---

### 3. Gemini API

- Google 提供免費額度，小型或教學用途幾乎不會超過
- 以 Token 計費，費用取決於 prompt 與 response 的長度

**費用範例估算：**

| 條件 | 數值 |
|---|---|
| 每次請求 | ~1,000 tokens |
| 每天請求次數 | 200 次 |
| 每月請求次數 | ~6,000 次 |
| 預計費用 | 低，通常在免費額度內 |

**建議使用模型：**
- `gemini-1.5-flash`：較便宜，速度快，適合大多數應用
- `gemini-1.5-pro`：品質較好，適合需要高準確度的場景

---

## 三、何時成本會上升？

若符合以下情況，費用才會明顯增加：

1. **使用者人數非常多**（公開服務、大量並發）
2. **Prompt 或 Response 非常長**（文件生成、長篇摘要）
3. **使用了 RAG 架構**（Embedding + Vector DB）

一般教學或個人作品集專案皆不會遇到以上情況。

---

## 四、API Key 安全策略

### ✅ 最推薦做法：將 Key 存放於 Vercel 環境變數

```
Vercel Dashboard → Project → Settings → Environment Variables
→ 新增 GEMINI_API_KEY = xxxxxxxxxxxxxxxx
```

Vercel 會在執行 Serverless Function 時自動注入此環境變數，**前端完全無法取得**。

**安全流程：**
```
browser → /api/gemini（Serverless Function）→ Gemini API
```

前端只呼叫 `/api/gemini`，API Key 始終安全地存放在伺服器端。

---

### ❌ 常見錯誤做法（請避免）

```typescript
// ❌ 錯誤：直接將 Key 寫在前端程式碼中
const API_KEY = "xxxxxxxx";
```

```
# ❌ 錯誤：將 .env 提交至 git
```

**請務必確認 `.gitignore` 已包含以下內容：**

```
.env
.env.local
```

---

### 補充：若 GitHub Actions 也需要使用 Key

```
GitHub repo → Settings → Secrets and variables → Actions
→ New repository secret → 新增 GEMINI_API_KEY
```

在 workflow 中使用：

```yaml
env:
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

> 通常呼叫 Gemini 的邏輯在 Vercel 端，GitHub Actions 不一定需要此 Key。

---

## 五、專案目錄結構建議

```
my-ai-app/
├── src/
│   ├── App.tsx
│   └── main.tsx
│
├── api/
│   └── gemini.ts      ← Vercel 會自動識別為 Serverless Function
│
├── package.json
├── vite.config.ts
└── .github/
    └── workflows/
        └── deploy.yml
```

> Vercel 會自動偵測 `/api/*.ts` 並將其部署為 Serverless Function。

---

## 六、前端呼叫 Serverless Function 的方式

```typescript
const response = await fetch("/api/gemini", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [{ text: "請解釋什麼是 closure" }],
      },
    ],
  }),
});

const data = await response.json();
```

前端只需知道 `/api/gemini` 這個路徑，完全不知道也不需要知道 API Key。

---

## 七、完整部署流程

```
1. 建立 GitHub repo 並推送專案
2. 至 Vercel 匯入（import）此 GitHub repo
3. 在 Vercel → Settings → Environment Variables 設定 GEMINI_API_KEY
4. 完成！每次 git push 後，Vercel 會自動重新部署
```

部署完成後即可透過：

```
https://your-app-name.vercel.app
```

正常使用，並呼叫 Gemini API。

---

## 八、GitHub Actions CI 範例（可選）

Vercel 本身已可自動部署，若想加入自動化測試，可使用以下設定：

```yaml
name: CI

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build
      - run: npm run test  # 若有撰寫測試
```

**用途：** 確保每次 push 都能成功 build，且沒有 TypeScript 型別錯誤。

---

## 九、Serverless vs. BFF + Express 比較

### 快速比較表

| 項目 | Vercel Serverless | BFF + Express |
|---|---|---|
| 上手難度 | ⭐ 最簡單 | 中等 |
| 需要維護 Server | ❌ 不需要 | ✅ 需要 |
| 部署流程 | 自動 | 需另行部署 Server |
| 維護成本 | 很低 | 較高 |
| API Key 保護 | 容易 | 容易 |
| 冷啟動 | 有，但通常很快 | 無（長期運行） |
| 彈性 | 普通 | 高 |
| 適合教學 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 適合複雜系統 | ⭐⭐ | ⭐⭐⭐⭐ |

### 何時建議使用 Serverless？

若專案符合以下條件，選 **Serverless**：

- 只是呼叫 AI API（Gemini、OpenAI 等）
- 不需要長時間運算（超過 10 秒）
- 不需要複雜的資料庫操作
- 不需要複雜的身份驗證（JWT、OAuth、Session）

### 何時建議使用 BFF + Express？

若專案需要以下功能，才考慮 **BFF + Express**：

- 多個 AI 模型串接、RAG Pipeline、背景任務（Job Queue）
- 大量文件 Embedding、長時間 Agent Workflow
- 複雜的 JWT / OAuth / Session 驗證
- 大量資料庫操作（PostgreSQL、MongoDB、Redis）

---

## 十、教學階段建議

| 階段 | 架構 | 目標 |
|---|---|---|
| **第一階段** | Vercel Serverless | 讓學生快速做出 AI 整合成果，降低學習門檻 |
| **第二階段** | BFF + Express | 說明為何需要獨立後端，介紹複雜場景的解決方案 |

學生在此架構中可學到：

✅ React + TypeScript 開發  
✅ Fetch API 呼叫  
✅ Serverless 概念與實作  
✅ 環境變數管理（安全性）  
✅ GitHub Actions CI/CD  
✅ AI API 整合  

而且**完全不需要**：架設 Server、管理 Docker、維護 VM。
