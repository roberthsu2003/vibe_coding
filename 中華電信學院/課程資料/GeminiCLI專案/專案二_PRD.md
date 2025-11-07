# PRD｜銷售資料分析腳本

## 目標
開發一支命令列工具，讀取 CSV 銷售資料，輸出彙總統計與圖表檔案，協助營運人員快速了解營收狀況。

## 資料來源
- 輸入檔案格式：CSV
- 欄位範例：`order_id, date, region, product, quantity, unit_price`
- 範例檔案：`data/sales_sample.csv`

## 功能需求
1. **資料讀取與驗證**
   - 指令：`python main.py --input data/sales_sample.csv`
   - 若檔案不存在或欄位缺失，需回報錯誤
2. **統計彙整**
   - 計算總營收、總銷量
   - 依 `region` 與 `product` 產生營收排名前 3 名
3. **輸出報告**
   - 在終端顯示摘要報表（表格格式）
   - 產生 `reports/summary.json`：儲存統計結果
   - 產生 `reports/revenue_by_region.png`：長條圖
4. **參數設定**
   - 可選參數 `--top N`，決定輸出前幾名（預設 3）
   - 可選參數 `--start-date`、`--end-date`，篩選日期區間

## 非功能需求
- 使用 `pandas`、`matplotlib` 或等效工具
- 提供 logging，記錄檔案讀取與報表輸出路徑
- 程式需具備模組化結構，易於擴充

## 驗收標準
- `README` 提供環境安裝、指令範例、輸出說明
- 執行 `python main.py --input ...` 能成功產生報告檔案
- 至少撰寫 2 項測試（可使用 pytest 或內建 unittest）
- 若輸入參數有誤，程式需顯示清楚的錯誤提示

