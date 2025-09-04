# Copilot 指示文件

## 專案概述
這是一個基於 FastAPI 的簡單 Web API 專案，主要用於示範和教學目的。專案採用現代 Python 非同步框架，實現了基本的 HTTP 端點。

## 技術堆疊
- **主要框架**: FastAPI
- **Python 版本**: 3.11+
- **虛擬環境**: Conda (vibe_coding)
- **API 文檔**: Swagger UI (自動生成)

## 專案結構
```
.
├── main.py          # 主應用程式檔案，包含所有 API 端點
└── requirements.txt # 專案依賴
```

## 開發工作流程

### 環境設定
1. 使用指定的 Conda 環境：
   ```bash
   conda activate vibe_coding
   ```

### 啟動服務
1. 在專案根目錄執行：
   ```bash
   conda activate vibe_coding && uvicorn main:app
   ```
2. 服務將在 http://127.0.0.1:8000 啟動
3. API 文檔可在 http://127.0.0.1:8000/docs 查看

## 程式碼慣例
1. **API 路由組織**
   - 所有路由都定義在 `main.py` 中
   - 每個路由函數都使用 async/await 模式
   - 所有端點都應包含文檔字串說明功能

2. **資料模型**
   - 使用 Pydantic BaseModel 進行資料驗證
   - 模型應定義在相關路由附近

3. **錯誤處理**
   - 使用 FastAPI 的 HTTPException 進行錯誤回應
   - 保持一致的錯誤回應格式

## 整合測試
使用以下端點驗證服務正常運作：
- GET / - 檢查歡迎訊息
- GET /health - 檢查服務健康狀態

## 注意事項
1. 確保在進行任何程式碼修改前已啟動正確的虛擬環境
2. 遵循 PEP 8 程式碼風格指南
3. 保持程式碼簡潔且有適當的註解
