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

## 提示詞不知道怎麼寫？

面對空白輸入框，不知道該如何開口，或擔心寫得不夠準確？以下五種方式可以幫助你在 **Vibe Coding**（AI 協作開發）時快速上手。

---

### 方式一：請 AI 直接提供 Prompt 範本

把你的目標告訴 AI，請它幫你產出一個可用的 prompt 範本，再依需求微調即可。

#### 範例情境

你想請 AI 幫你寫一個解析 JSON 並驗證資料的 Python 函數，但不知道該怎麼下指令。

**你可以這樣問：**

> 我想請 AI 幫我寫一個 Python 函數，用來解析 JSON 並驗證必填欄位，錯誤時要回傳清楚的訊息。請給我一個完整的 prompt 範本，讓我可以直接複製使用。

<details>
<summary>💡 參考解答（點擊展開）</summary>

<br>

AI 可能會回覆類似這樣的範本：
```
# 角色
你是一位 Python 專家，擅長撰寫健壯的資料驗證與錯誤處理程式碼。

## 任務
請幫我撰寫一個解析 JSON 並驗證必填欄位的函數。

### 背景說明（請填入）
- 程式語言 / 版本：Python 3.12
- 必填欄位：id, name, email
- 錯誤處理：回傳明確的錯誤訊息（例如：缺少欄位名稱）
- 是否使用現有套件：是（如 pydantic） / 否（純標準庫）

## 輸出格式
- 函數簽名清楚，含型別標註
- 含 docstring 說明參數與回傳值
- 遵循 PEP8 風格
```

只要填入「背景說明」的欄位，再貼給 AI 即可使用。

</details>

---

### 方式二：請 AI 用一問一答的方式引導你

讓 AI 主動問你幾個問題，透過問答釐清需求，最後產出適合的 prompt。

#### 範例情境

你想用 AI 幫你重構一段程式碼，但不確定要怎麼描述需求。

**你可以這樣問：**

> 我想用 AI 幫我重構一段 Python 程式碼，但不太確定怎麼寫 prompt。請用一問一答的方式引導我，問我幾個關鍵問題（例如：程式類型、重構目標、技術限制等），再根據我的回答幫我產出完整的 prompt。

<details>
<summary>💡 參考解答（點擊展開）</summary>

<br>

AI 可能會先問你：

1. **程式類型**：是 API、CLI 工具、還是資料處理腳本？
2. **重構目標**：可讀性、效能、可測試性，還是模組化？
3. **技術限制**：必須維持的介面、不可更動的依賴、Python 版本？
4. **輸出格式**：只要程式碼、還是要附上重構說明與測試建議？

根據你的回答，AI 會組合出類似這樣的 prompt：
```
你是程式碼重構專家。請將以下程式碼重構，目標是提升可讀性與可維護性。

重構要求：
- 保持原有功能不變
- 拆解過長的函數，單一職責
- 加入型別標註與 docstring
- 遵循 PEP8

輸出格式：重構後的完整程式碼 + 簡短說明做了哪些改動
```

</details>

---

### 方式三：直接搜尋現成的 Prompt 庫

網路上有許多分類完整的 prompt 庫，可以直接搜尋、複製使用，省去從零開始的時間。

#### 常用 Prompt 庫資源

| 資源 | 說明 | 連結 |
|------|------|------|
| **第五 AI 提示詞** | 10 萬+ 提示詞，涵蓋寫作、商業、開發等分類，一鍵複製 | [prompt.diwuai.com](https://prompt.diwuai.com/prompts) |
| **Prompt Library** | 開源專案，支援中文，可依分類瀏覽與搜尋 | [mrxie23.github.io/PromptLibrary](https://mrxie23.github.io/PromptLibrary/) |
| **Studio Global** | 100+ 專家製作提示，支援繁體中文，可團隊共享 | [studioglobal.ai](https://www.studioglobal.ai/zh-hant/prompt-library/) |
| **PromptVault** | 500+ 模板，適合開發者、內容創作者、小型企業 | 直接搜尋「PromptVault」 |

#### 使用步驟

1. 打開任一 prompt 庫，在搜尋欄輸入關鍵字（如「程式」、「Python」、「API」、「重構」、「Code Review」）
2. 瀏覽結果，點選符合需求的 prompt
3. 一鍵複製，貼到 AI 對話框試用
4. 依實際需求微調（例如指定語言版本、框架、程式風格）

<details>
<summary>💡 從庫中找到的「Code Review」prompt 範例（點擊展開）</summary>

<br>

```
請幫我進行 Code Review，針對以下程式碼提供：

1. **潛在 Bug**：可能導致錯誤或異常的程式碼
2. **效能建議**：可優化的地方（時間/空間複雜度）
3. **可讀性**：命名、結構、註解是否清楚
4. **最佳實踐**：是否符合該語言/框架的慣例

程式碼：
（在此貼上你的程式碼）
```

把「程式碼」替換成你要檢查的程式即可使用。

</details>

---

### 方式四：從一句簡單需求開始，請 AI 幫你擴充

先寫出最簡單的一句需求，再請 AI 幫你補齊細節和結構，逐步完善。

#### 範例情境

你想請 AI 寫一個「讀取 CSV 並轉成 JSON 的腳本」，但腦中只有「幫我寫 CSV 轉 JSON」這幾個字。

**你可以這樣問：**

> 我想請 AI 幫我寫一個讀取 CSV 並轉成 JSON 的 Python 腳本，但我只想到「幫我寫 CSV 轉 JSON」。請幫我把這句話擴充成一個完整、結構清楚的 prompt，包含角色、任務、需要涵蓋的內容與輸出格式。

<details>
<summary>💡 參考解答（點擊展開）</summary>

<br>

AI 可能會產出：
```
# 角色
你是一位 Python 專家，擅長撰寫資料處理腳本。

## 任務
請幫我撰寫一個讀取 CSV 並轉成 JSON 的 Python 腳本。

### 需要涵蓋的內容
- 讀取 CSV 檔案（支援 UTF-8，處理標題列）
- 轉換為 JSON 格式（陣列或物件，依需求）
- 命令列參數：輸入檔路徑、輸出檔路徑（可選）
- 錯誤處理：檔案不存在、編碼錯誤時的提示

## 輸出格式
- 使用 Python 標準庫（csv、json），或註明若用 pandas 的寫法
- 含 docstring 與型別標註
- 可直接執行：python script.py input.csv
```

之後可以依實際需求，在「需要涵蓋的內容」中增減項目（例如：指定分隔符、跳過空行等）。

</details>

---

### 方式五：參考類似範例，套用結構改寫

找到「目標相近」的 prompt 範例，保留其結構框架，把內容替換成你需要的版本。

#### 範例情境

你想請 AI 寫一個「FastAPI 的 REST API」，手邊有「Flask API」的 prompt 可以參考。

**你可以這樣做：**

1. 打開 Flask API 的 prompt 範例（例如本文件上方的 ROSES 範本）
2. 保留原有的結構（角色、目標、步驟、範例、範圍與風格）
3. 把「Flask」相關的文字，替換成「FastAPI」的內容

<details>
<summary>💡 改寫後的 prompt 範例（點擊展開）</summary>

<br>

```markdown
# ROSES Prompt: FastAPI 建立

## R – Role (角色)
你是一位 Python FastAPI 專家。

## O – Objective (目標)
建立一個簡單的 RESTful API，提供 `GET /users` 回傳 JSON 格式的使用者資料。

## S – Steps (步驟)
1. 建立 FastAPI 專案檔案 `main.py`
2. 在 `main.py` 內建立 `/users` 路由
3. 回傳一個 JSON 陣列，包含 `id`, `name`, `email`
4. 確保程式可直接執行 `uvicorn main:app --reload` 啟動

## E – Examples (範例)
輸入：curl http://127.0.0.1:8000/users
輸出：JSON 陣列格式

## S – Scope & Style (範圍/風格)
- 使用 Python 3.12
- 僅用 FastAPI，不可使用 Flask
- 程式碼要有註解，遵循 PEP8
```

**改寫重點**：角色、目標、結構框架不變，只替換成「FastAPI」相關的具體內容（套件、啟動指令、port 等）。

</details>

---

## 快速選擇指南

| 你的狀況 | 建議方式 |
|----------|----------|
| 完全不知道從何開始 | ✅ 方式二：請 AI 一問一答引導 |
| 有目標但不會結構化 | ✅ 方式一：請 AI 給範本，或方式四：從簡單句擴充 |
| 想快速套用現成模板 | ✅ 方式三：搜尋 prompt 庫（關鍵字：程式、Python、API、重構） |
| 手邊有類似範例可參考 | ✅ 方式五：參考同類型改寫（如 Flask → FastAPI） |

> 💡 **小提醒**：無論使用哪種方式，產出的 prompt 都建議先試用一兩次，再根據實際效果微調。用得越多，就會越來越順手！




