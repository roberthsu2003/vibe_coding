# DEBUG 建議


可以考慮幾種方式來檢查每個步驟的資料是否正確：

---

## 1. 開發模式 Debug 面板（推薦）

在開發環境加一個可收合的 Debug 面板，顯示目前所有狀態：

- 顯示 `setupData`、`userInputs`、`userOutputs`、`stakeholders`、`outcomes` 等
- 用 `JSON.stringify(data, null, 2)` 格式化輸出
- 用環境變數 `VITE_DEBUG_PANEL=true` 控制顯示（見下方說明）

**啟用方式**：在 `.env.local` 加入 `VITE_DEBUG_PANEL=true` 即顯示 Debug 面板；移除或設為 `false` 則為正常模式。

這樣可以：
- 切換分頁時立刻看到對應資料
- 檢查 API 回傳後資料有沒有正確寫入 state
- 檢查上一步的結果是否正確傳到下一步

---

## 2. 在關鍵流程加 `console.log`

在這些地方加 log，方便追蹤流程與資料：

| 位置 | 建議 log 內容 |
|------|----------------|
| `handleFileChange` 解析完成後 | `parsedSetupData`, `parsedInputs`, `parsedOutputs` |
| `runAllAnalysis` 每個 API 回傳後 | 原始 CSV 字串、解析後的陣列 |
| `handleStakeholderDecision` / `handleOutcomeDecision` | 更新後的列表 |
| 各 `trigger*Analysis` 函式 | 傳給 API 的 `data`、回傳的 `result` |

---

## 3. 用 React DevTools 檢查

- 在 React DevTools 選 `App` 元件
- 在右側看 `hooks` 裡的 state
- 切換分頁時觀察 state 變化

適合快速檢查，但無法看到 API 原始回傳。

---

## 4. 匯出 / 匯入狀態（重現問題）

- 加一個「匯出目前狀態」按鈕，把 `setupData`、`userInputs`、`stakeholders` 等存成 JSON 檔
- 加一個「匯入狀態」功能，從 JSON 還原 state

用途：
- 重現特定情境
- 把有問題的資料分享給別人
- 跨步驟比對資料變化

---

## 5. 在每個 Tab 顯示「本步驟輸入資料」

在每個 Tab 元件裡加一個可收合的區塊，顯示「這個步驟收到的 props」：

- 例如 `StakeholdersTab` 顯示 `stakeholders` 的內容
- `OutcomesTab` 顯示 `outcomes` 和 `stakeholders`（因為成果依賴利害關係人）

這樣可以確認：
- 上一步的結果有沒有正確傳到這一步
- 傳進來的資料結構是否符合預期

---

## 建議實作順序

1. **先做 Debug 面板**：一次看到所有 state，最直接。
2. **在 API 呼叫前後加 log**：確認 request / response 與解析結果。
3. **有需要再做匯出 / 匯入**：方便重現與分享問題。

如果你願意，我可以幫你設計一個具體的 Debug 面板結構（例如放在 Header 旁邊、用按鈕開關、顯示哪些欄位等），並給出對應的程式碼範例。