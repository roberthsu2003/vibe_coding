# GitHub Copilot Instructions for Mergington High School Activities API

## 專案架構與主要元件
- 本專案為 FastAPI 應用，提供高中課外活動 API，所有資料皆儲存在記憶體（重啟即清空）。
- 主要程式在 `src/app.py`，API 路徑設計簡單：
  - `/activities` 取得所有活動
  - `/activities/{activity_name}/signup?email=...` 報名活動
  - `/` 會導向 `static/index.html` 前端頁面
- 靜態資源（前端）放在 `src/static/`，包含 `index.html`、`app.js`、`styles.css`。

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
- 活動資料結構為 dict，key 為活動名稱，value 包含描述、時間、最大人數、已報名 email。
- 報名流程不檢查重複 email 或人數上限，僅追加 email 至 participants。
- 所有 API 回應皆為 JSON 格式。
- 前端直接存取 `/static/` 目錄。

## 常見開發工作
- 新增活動：直接在 `activities` dict 增加新項目。
- 修改 API 路徑或資料結構，請同步更新前端 JS 取用邏輯。
- 若需持久化資料，請自行擴充資料儲存層（目前僅記憶體）。

## 其他注意事項
- 本專案無測試檔案，請以手動 API 測試為主。
- 若需擴充 API，建議遵循現有路徑與資料結構設計。
- 主要參考檔案：
  - `src/app.py`（API 實作）
  - `src/static/index.html`（前端入口）
  - `requirements.txt`（依賴管理）

---
如有不清楚或遺漏之處，請回饋以便補充！
