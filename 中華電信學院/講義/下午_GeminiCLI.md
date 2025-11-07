# 下午講義｜Gemini CLI Python 專案

## 課程目標
- 完成 Gemini CLI 的安裝與初始設定
- 使用 `uv` 建立隔離的 Python 開發環境
- 體驗以 PRD 駆動的兩種專案開發流程
- 練習讓 AI 回報任務進度並提交成果

## 課程結構
1. 開發環境建置（40 分）
2. 專案一：僅提供 `PRD.md`（60 分）
3. 專案二：PRD + AI 生成 `task.md`（60 分）
4. 總結與實務建議（20 分）

## 先備準備
- 安裝最新版 Python（建議 3.11 以上）
- 取得 Gemini API Key
- 安裝 `uv`（透過 pip 或官方安裝指令）

## 安裝與設定流程
```bash
# 安裝 Gemini CLI
pip install -U google-genai

# 設定環境變數
export GEMINI_API_KEY="你的 API Key"

# 驗證安裝
genai chat --model gemini-1.5-flash --text "Hello"
```

## 使用 `uv` 建立開發環境
```bash
# 初始化專案
uv init gemini_cli_projects
cd gemini_cli_projects

# 建立虛擬環境並安裝套件
uv sync

# 啟用虛擬環境 (macOS/Linux)
source .venv/bin/activate

# 安裝常用套件
uv add rich typer pytest
```

## 提供專案脈絡給 Gemini CLI
- 在專案根目錄建立 `PROJECT_CONTEXT.md`，說明環境與需求
- 透過指令：
  ```bash
  genai files upload PROJECT_CONTEXT.md --display-name "project_context"
  ```
- 下指令時引用該檔案：
  ```bash
  genai chat --model gemini-1.5-pro \
    --system "請閱讀 project_context 並依據其中的約束回覆" \
    --text "請協助初始專案架構"
  ```

## 專案一流程（僅提供 `PRD.md`）
1. 下載課程提供的 `PRD.md`（範例：命令列待辦工具）
2. 引導提示範例：
   - 「閱讀 `PRD.md`，回覆主要功能與範圍摘要。」
   - 「請提出開發計畫，列出模組與檔案結構。」
   - 「依計畫產出主程式與必要模組，附上使用說明。」
3. 驗證功能：執行程式確認輸入輸出符合需求
4. 要求自動化測試或簡單測試腳本

## 專案二流程（PRD + AI 生成 `task.md`）
1. 下載第二份 `PRD.md`（範例：資料分析腳本）
2. 引導提示範例：
   - 「閱讀 `PRD.md`，請協助拆解任務並產出 `task.md`，格式包含 task、owner、status。」
   - 「請依 `task.md` 一項一項完成，每完成一項更新檔案並報告狀態。」
   - 「若遇到不確定的需求，請先提問再執行。」
3. 驗收結果：
   - 確認所有任務皆標示為完成
   - 程式碼可執行，並附上輸出範例
   - `task.md` 內容清楚記錄進度

## 常見指令速查
- `genai chat --help`
- `genai models list`
- `genai files list`
- `uv add <package>`
- `uv run <script.py>`

## 實務小提醒
- 請定期將進度紀錄於 Git（可選）
- 需要 AI 釐清需求時，先提出假設並請 AI 回應確認
- 若發生錯誤，提供完整錯誤訊息與現況，AI 才能更精準協助

## 課後延伸
- 讓 AI 撰寫 README 與使用教學
- 嘗試加入 CI（如 GitHub Actions）自動化測試
- 研究如何將 Gemini CLI 與其他工具（如 Makefile、invoke）整合

