# AI 提示詞工程指南

## 提示詞工程基礎

### Prompt 工程是未來關鍵技能
與 AI 的溝通能力決定了其輔助的成效。善用「ROSES 架構」等提示技巧能讓 AI 更精準地理解需求。
### Prompt 文字格式:

[**內容格式**](./內容格式/README.md)

### ROSES Prompt Framework（建議定義）:
- **R – Role (角色)**：指定 AI 的角色（如：Python 專家、Code Reviewer）。
- **O – Objective (目標)**：清楚描述要完成的任務。
- **S – Steps (步驟)**：拆解任務的步驟，讓 AI 照順序處理。
- **E – Examples (範例)**：提供輸入/輸出的範例，避免模糊。
- **S – Scope & Style (範圍/風格)**：限制語言、框架、程式風格。

> [!IMPORTANT]
> 透過**描素**建立符合**ROSES的Prompt.md樣版**

#### 範本1: 建立 Python API

```
# ROSES Prompt: Python API 建立

## R – Role (角色)
你是一位 Python Flask 專家。

## O – Objective (目標)
建立一個簡單的 RESTful API，提供 `GET /users` 回傳 JSON 格式的使用者資料。

## S – Steps (步驟)
1. 建立 Flask 專案檔案 `app.py`
2. 在 `app.py` 內建立 `/users` 路由
3. 回傳一個 JSON 陣列，包含 `id`, `name`, `email`
4. 確保程式可直接執行 `python app.py` 啟動

## E – Examples (範例)

### 輸入：
bash:curl http://127.0.0.1:5000/users

### 輸出:

[
  {"id": 1, "name": "Alice", "email": "alice@example.com"},
  {"id": 2, "name": "Bob", "email": "bob@example.com"}
]

## **S – Scope & Style (範圍/風格)**

- 使用 Python 3.12
- 僅用 Flask，不可使用 FastAPI
- 程式碼要有註解，遵循 PEP8


```



### 補充:Google公布AI提示萬用公式
**掌握「21字黃金法則」: 先穩80分基本功再求好**

1. **角色設定**: 要LLM調度哪些領域知識
2. **任務**: 你想完成什麼目標
3. **背景**: 任務的起源/目標的限制/涉及的人士等
4. **格式**: 輸出類型, 編排格式




