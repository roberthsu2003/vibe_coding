# Vibe Coding 初體驗

## 課程定位
- 對象：無程式基礎、具基本電腦操作能力的學員
- 目標：以體驗式教學建立對 Vibe Coding 的理解與信心
- 工具：Cursor、Gemini CLI、`uv`

## 上午課程｜Cursor 小遊戲專案
**學習重點**
- 認識 Vibe Coding 流程與 Cursor 介面
- 設定 `CURSOR.md`，理解配置檔對 AI 協作的影響
- 以自然語言迭代指令，完成網頁版小遊戲專案
- 比較 Cursor AI 與 ChatGPT Desktop 的開發差異

**授課節奏（180 分鐘）**
1. Vibe Coding 與 Cursor 導覽（30 分）
   - Vibe Coding 核心理念、優勢、適用情境
   - Cursor 介面快速導覽與 `CURSOR.md` 設定示範
2. Cursor vs ChatGPT Desktop 案例比較（15 分）
   - 使用相同 Prompt，觀察程式碼整合、檔案生成差異
3. 小遊戲主題選擇（10 分）
   - 5 個主題範例：記憶翻牌、打磚塊、反應力測試、猜數字、貪食蛇
   - 建立專案結構與 `CURSOR.md`
4. Vibe Coding 實作（80 分）
   - 撰寫首輪需求 Prompt，觀察初版成果
   - 運用自然語言補足缺漏（資源檔案、音效、RWD 等）
   - 示範錯誤排除與需求迭代技巧
5. 成果分享與回饋（25 分）
   - 小組展示專案與迭代策略
   - 老師整理常見問題與最佳實務

### 授課資源
- [上午課程講義](講義/上午_Cursor小遊戲.md)
- [小遊戲 Prompt 指南（資料夾）](課程資料/小遊戲主題)
- [示範專案骨架（講師預備）](小遊戲專案)



## 下午課程｜Gemini CLI Python 專案
**學習重點**
- 安裝與設定 Gemini CLI
- 以 `uv` 建立 Python 隔離開發環境
- 引導 AI 理解現有環境並協助完成任務
- 體驗 PRD 駆動與任務拆解的開發流程

**授課節奏（180 分鐘）**
1. 開發環境建置（40 分）
   - 安裝 Gemini CLI、設定 API Key
   - 初始化課程專案、使用 `uv init`、`uv sync`
   - 提供環境資訊給 Gemini CLI（依賴、目錄結構）
2. 專案一：僅提供 `PRD.md`（60 分）
   - 例題：命令列待辦工具
   - 撰寫 Prompt，讓 Gemini 釐清需求並產出程式碼
   - 驗收：程式可執行、符合 PRD 功能
3. 專案二：PRD + AI 產生 `task.md`（60 分）
   - 例題：資料分析腳本
   - 指導 AI 拆解任務、更新任務狀態並提交成果
   - 示範如何要求進度回報（完成、進行中、待確認）
4. 總結與實務建議（20 分）
   - 對照 Cursor 與 Gemini CLI 的優缺點
   - 討論版本控制、測試與需求追蹤的重要性

### 授課資源
- [下午課程講義](講義/下午_GeminiCLI.md)
- [專案一 PRD（命令列待辦）](課程資料/GeminiCLI專案/專案一_PRD.md)
- [專案二 PRD（銷售資料分析）](課程資料/GeminiCLI專案/專案二_PRD.md)
- [任務拆解模板](課程資料/GeminiCLI專案/task_template.md)
- [環境設定指引](課程資料/GeminiCLI專案/環境設定指引.md)
