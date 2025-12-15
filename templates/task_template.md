# 任務清單 (Task List)

> **使用說明**: 這是詳細的執行步驟清單，將 plan.md 中的模組拆解成可執行的小任務。每個任務應該是「可在 30 分鐘到 2 小時內完成」的獨立單元。

---

## 專案資訊

**專案名稱**: [專案名稱]
**當前 Phase**: [Phase 1 / Phase 2 / ...]
**最後更新**: [日期]

---

## 任務狀態說明

- ⬜ 待辦 (Todo)
- 🔄 進行中 (In Progress)
- ✅ 已完成 (Done)
- ⏸️ 暫停 (Blocked)
- ❌ 取消 (Cancelled)

---

## Phase 1: 基礎架構建置

### 任務組 1.1: 前端專案初始化

#### 任務 1.1.1: 建立 React 專案 ⬜
**目標**: 使用 Vite 建立 React 專案骨架

**執行步驟**:
1. 執行 `npm create vite@latest frontend -- --template react`
2. 進入專案目錄 `cd frontend`
3. 安裝依賴 `npm install`
4. 啟動開發伺服器 `npm run dev`
5. 確認瀏覽器可以看到預設頁面

**驗收標準**:
- [ ] 可以在 `http://localhost:5173` 看到 Vite + React 預設頁面
- [ ] 無任何控制台錯誤

**預估時間**: 15 分鐘

**相關檔案**:
- `frontend/package.json`
- `frontend/vite.config.js`
- `frontend/src/main.jsx`

---

#### 任務 1.1.2: 設定 React Router ⬜
**目標**: 設定前端路由系統

**執行步驟**:
1. 安裝 React Router: `npm install react-router-dom`
2. 建立 `src/pages/` 資料夾
3. 建立首頁元件 `src/pages/Home.jsx`
4. 建立登入頁 `src/pages/Login.jsx`
5. 在 `App.jsx` 設定路由

**驗收標準**:
- [ ] `/` 顯示首頁
- [ ] `/login` 顯示登入頁
- [ ] 路由切換正常運作

**預估時間**: 30 分鐘

**相關檔案**:
- `frontend/src/App.jsx`
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Login.jsx`

**參考 Prompt**:
```
請幫我設定 React Router v6，需要有兩個路由:
- / (首頁)
- /login (登入頁)

請提供完整的 App.jsx 程式碼。
```

---

#### 任務 1.1.3: 建立通用元件庫 ⬜
**目標**: 建立可重用的 UI 元件

**執行步驟**:
1. 建立 `src/components/Common/` 資料夾
2. 建立 `Button.jsx` 元件
3. 建立 `Input.jsx` 元件
4. 建立 `Card.jsx` 元件
5. 撰寫基本樣式

**驗收標準**:
- [ ] 元件可以正常匯入使用
- [ ] 元件接受 props 並正確渲染
- [ ] 有基本的樣式

**預估時間**: 1 小時

**相關檔案**:
- `frontend/src/components/Common/Button.jsx`
- `frontend/src/components/Common/Input.jsx`
- `frontend/src/components/Common/Card.jsx`

---

### 任務組 1.2: 後端專案初始化

#### 任務 1.2.1: 建立 Express 專案 ⬜
**目標**: 建立 Node.js + Express 後端專案

**執行步驟**:
1. 建立 `backend/` 資料夾
2. 執行 `npm init -y`
3. 安裝依賴: `npm install express cors dotenv`
4. 建立 `src/server.js`
5. 建立基本的 Express 伺服器
6. 測試執行 `node src/server.js`

**驗收標準**:
- [ ] 伺服器可以在 port 3000 啟動
- [ ] 訪問 `http://localhost:3000` 有回應

**預估時間**: 20 分鐘

**相關檔案**:
- `backend/package.json`
- `backend/src/server.js`

**參考程式碼**:
```javascript
// backend/src/server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

#### 任務 1.2.2: 設定資料庫連線 ⬜
**目標**: 建立與資料庫的連線

**執行步驟**:
1. 安裝資料庫套件: `npm install [mongodb/mysql2/pg]`
2. 建立 `src/config/database.js`
3. 設定連線參數
4. 撰寫測試連線的函式
5. 在 `server.js` 中初始化資料庫連線

**驗收標準**:
- [ ] 資料庫連線成功
- [ ] 控制台顯示連線成功訊息
- [ ] 無連線錯誤

**預估時間**: 40 分鐘

**相關檔案**:
- `backend/src/config/database.js`
- `backend/.env`

**注意事項**:
- 敏感資訊(密碼、連線字串)必須放在 `.env` 檔案
- `.env` 不可以 commit 到 git

---

### 任務組 1.3: 前後端整合測試

#### 任務 1.3.1: 前端呼叫後端 API ⬜
**目標**: 確認前端可以成功呼叫後端

**執行步驟**:
1. 建立 `frontend/src/services/api.js`
2. 撰寫呼叫 `/api/health` 的函式
3. 在首頁顯示 API 回應結果
4. 測試執行

**驗收標準**:
- [ ] 前端成功呼叫後端
- [ ] 頁面正確顯示 API 回應
- [ ] 無 CORS 錯誤

**預估時間**: 30 分鐘

---

## Phase 2: 核心功能實作

### 任務組 2.1: 使用者註冊功能

#### 任務 2.1.1: 建立註冊表單 UI ⬜
**目標**: 建立使用者註冊介面

**執行步驟**:
1. 建立 `src/pages/Register.jsx`
2. 設計表單欄位(使用者名稱、Email、密碼)
3. 加入表單驗證
4. 加入錯誤提示
5. 加入 React Router 路由

**驗收標準**:
- [ ] 表單正確渲染
- [ ] 前端驗證正常運作
- [ ] 錯誤訊息正確顯示

**預估時間**: 1.5 小時

**相關檔案**:
- `frontend/src/pages/Register.jsx`

---

#### 任務 2.1.2: 後端註冊 API ⬜
**目標**: 實作使用者註冊的後端邏輯

**執行步驟**:
1. 建立 `src/routes/auth.js`
2. 建立 `src/controllers/authController.js`
3. 建立 `src/models/User.js`
4. 實作 POST `/api/auth/register` 端點
5. 加入密碼加密(bcrypt)
6. 加入輸入驗證
7. 測試 API (使用 Postman 或 curl)

**驗收標準**:
- [ ] API 可以接收註冊請求
- [ ] 密碼正確加密儲存
- [ ] 重複 email 會被拒絕
- [ ] 回傳正確的成功/失敗訊息

**預估時間**: 2 小時

**相關檔案**:
- `backend/src/routes/auth.js`
- `backend/src/controllers/authController.js`
- `backend/src/models/User.js`

**參考 Prompt**:
```
請幫我實作使用者註冊 API:

需求:
- POST /api/auth/register
- 接收 username, email, password
- 使用 bcrypt 加密密碼
- 檢查 email 是否已存在
- 儲存到 MongoDB
- 返回成功或錯誤訊息

請使用 MVC 架構，分別提供 route, controller, model 的程式碼。
```

---

#### 任務 2.1.3: 整合前後端註冊功能 ⬜
**目標**: 將前端表單與後端 API 串接

**執行步驟**:
1. 在 `frontend/src/services/api.js` 加入 `register` 函式
2. 在 `Register.jsx` 呼叫註冊 API
3. 處理成功/失敗情況
4. 成功後導向登入頁
5. 完整測試流程

**驗收標準**:
- [ ] 表單提交後成功呼叫後端
- [ ] 註冊成功後導向登入頁
- [ ] 註冊失敗顯示錯誤訊息
- [ ] 使用者資料正確儲存到資料庫

**預估時間**: 1 小時

---

### 任務組 2.2: 使用者登入功能

[複製任務組 2.1 的結構，修改為登入功能]

---

## Phase 3: 測試

### 任務組 3.1: 單元測試

#### 任務 3.1.1: 設定測試環境 ⬜
**目標**: 配置 Jest 測試框架

**執行步驟**:
1. 安裝 Jest: `npm install --save-dev jest`
2. 建立 `jest.config.js`
3. 在 `package.json` 加入測試腳本
4. 撰寫第一個測試確認環境正常

**驗收標準**:
- [ ] `npm test` 可以執行
- [ ] 測試報告正確產生

**預估時間**: 30 分鐘

---

#### 任務 3.1.2: 撰寫認證功能測試 ⬜
**目標**: 為 authController 撰寫測試

**執行步驟**:
1. 建立 `tests/auth.test.js`
2. 測試註冊功能
3. 測試登入功能
4. 測試錯誤處理
5. 執行測試並確認通過

**驗收標準**:
- [ ] 所有測試通過
- [ ] 測試覆蓋率 > 80%

**預估時間**: 2 小時

**參考 Prompt**:
```
請幫我撰寫 authController 的 Jest 測試，需要測試:
1. 成功註冊
2. Email 重複的錯誤處理
3. 成功登入
4. 密碼錯誤的處理

請提供完整的測試程式碼。
```

---

## 任務執行建議

### 如何使用這份任務清單？

1. **從上到下依序執行**: 任務已按依賴關係排序
2. **更新狀態**: 開始任務時標記為 🔄，完成後標記為 ✅
3. **記錄問題**: 遇到問題時在任務下方加註
4. **彈性調整**: 如果發現任務太大，可以拆分成更小的子任務

### 每日工作流程範例

**每天開始前**:
1. 檢視任務清單，選擇今天要完成的任務
2. 將選定的任務標記為 🔄

**執行任務時**:
1. 閱讀任務說明與執行步驟
2. 如果需要 AI 協助，使用提供的「參考 Prompt」
3. 完成後確認「驗收標準」
4. 標記為 ✅

**每天結束前**:
1. 更新任務狀態
2. 記錄遇到的問題與解決方案
3. 規劃明天的任務

---

## 問題追蹤

### 任務 [編號]: [問題簡述]
**發生時間**: [日期]
**問題詳情**: [詳細描述]
**解決方案**: [如何解決的]
**學到的教訓**: [避免再次發生]

---

**提示**:
- 好的任務應該是「獨立」且「可測試」的
- 如果任務超過 2 小時還沒完成，考慮拆分成更小的任務
- 定期回顧並更新任務清單，反映實際狀況
