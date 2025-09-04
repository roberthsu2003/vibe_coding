# GitHub Copilot Instructions for Mergington High School Activities API

## 專案架構與主要元件
- 本專案為 FastAPI 應用，提供高中課外活動 API，所有資料皆儲存在記憶體（重啟即清空）。
- 主要程式在 `src/app.py`，API 路徑設計簡單：
  - `GET /activities` - 取得所有活動的完整資訊
  - `POST /activities/{activity_name}/signup?email=...` - 處理活動報名
  - `GET /` - 重導向至前端頁面
- 前端架構（`src/static/`）：
  - `index.html` - 包含活動列表和報名表單的主頁面
  - `app.js` - 處理前端邏輯，包括活動載入和報名處理
  - `styles.css` - 頁面樣式

## 開發與執行流程
- 啟動前請先執行 `conda activate vibe_coding` 以啟用正確環境
- 安裝依賴：
  ```
  pip install -r requirements.txt
  ```
- 啟動 API 伺服器：
  ```
 uvicorn src.app:app
  ```
- API 文件自動產生於 http://localhost:8000/docs

## 重要慣例與模式
- 活動資料結構：
  ```python
  activities = {
    "活動名稱": {
      "description": str,      # 活動描述
      "schedule": str,         # 活動時間
      "max_participants": int, # 最大人數
      "participants": list     # 已報名的 email 列表
    }
  }
  ```
- 活動報名驗證：
  - 檢查活動是否存在（404 錯誤）
  - 檢查重複報名（400 錯誤）
  - 不檢查人數上限
- API 慣例：
  - 所有回應使用 JSON 格式
  - 錯誤回應包含 `detail` 欄位說明原因
  - GET 請求參數使用查詢字串，POST 請求使用路徑參數

## 常見開發工作與擴充建議
- 新增活動：
  1. 在 `app.py` 的 `activities` 字典中新增活動資料
  2. 確保包含所有必要欄位（description、schedule、max_participants、participants）
  3. 測試 API 響應是否正確
- 前後端同步：
  - API 變更時需更新 `app.js` 中的 `fetchActivities()` 和表單提交邏輯
  - 活動卡片渲染邏輯在 `app.js` 中的 HTML 模板
- 未來擴充方向：
  - 資料持久化：建議使用 SQLAlchemy 或 SQLite
  - 使用者認證：考慮加入 FastAPI 的 OAuth2 支援
  - 活動管理功能：新增刪除/修改 API 端點

## 測試與維護注意事項
- API 測試：使用 FastAPI 的 Swagger UI（/docs）進行手動測試
- 除錯技巧：
  - 後端：檢查 uvicorn 伺服器日誌
  - 前端：使用瀏覽器開發者工具監控網路請求
- 主要參考檔案：
  - `src/app.py`：FastAPI 路由和資料模型
  - `src/static/app.js`：前端 AJAX 和 DOM 操作
  - `src/static/index.html`：頁面結構與表單設計
  - `requirements.txt`：Python 套件相依性

---
如有不清楚或遺漏之處，請回饋以便補充！
