# 認識 Google AI Studio

## 學習重點

- Google AI Studio 是 Gemini 的網頁工作台，可快速做出 AI prototype。
- 可用 Prompt 反覆迭代，並在 Code/Preview 間調整成果。
- 可以 Share（給他人 Remix）或 Deploy（對外發布）。


> **補充（Gemini AI Studio 實務）**  
> 使用 **Gemini API key** 時，常見做法是透過 **Google AI Studio Gemini App Proxy Server**，並以 **環境變數（或 Cloud Run secrets）** 注入金鑰。  
> 在 Google AI Studio 的預設流程下，**Share** 與 **Deploy** 都是相對安全的做法：前者讓他人在自己的環境 Remix 與執行，後者由伺服器端機制處理金鑰，重點都是**不把 API key 暴露在瀏覽器端**。  

**專案完成後可直接提問的安全檢查 Prompt（貼給 Google AI Studio）：**

```
請幫我做 **Gemini API key 洩露風險檢查**。請逐項檢查這個專案是否有以下問題：

1. 前端程式碼或打包檔是否包含 API key
2. 是否有直接從瀏覽器呼叫 `generativelanguage.googleapis.com` 並夾帶金鑰
3. 是否改用伺服器端 Proxy（例如 App Proxy／Express API）轉發
4. 金鑰是否只存在環境變數或 secrets
5. Share／Deploy 後一般使用者是否能從 DevTools、原始碼或網路請求取得金鑰

最後請用 **「安全」** 或 **「需修正」** 給結論，並列出具體修正步驟。
```


## 建立 App 前先設定（Advanced settings）

開始建立 App 前，先確認這 4 個欄位：

1. **Select model for chat**：先用預設模型（如 Gemini Flash）即可。  
2. **System instructions**：先寫專案目標與回覆風格，避免產出太發散。  
3. **Framework**：先選課程指定框架（React / Next.js / Angular）。  
4. **Microphone source**：只有做語音互動才需要設定，否則可略過。  

## 實作流程（課堂版）

1. 建立 App，先用預設模型做第一版。
2. 用一句話需求開始，逐步調整 Prompt。
3. 切到 Code 模式做小修，再回 Preview 驗證。
4. 完成最小作品（文字產生器即可）。
5. 需要對外展示時，再做 Share 或 Deploy。

## Share、Remix、Deploy（簡版）

- **Remix**：把範例複製到自己的工作區再修改。  
- **Share**：分享你的 App，讓別人可以 Remix；對方在自己環境執行時，**使用對方自己的 API 與配額**，不會取得你的金鑰。  
- **Deploy**：將應用部署成可對外使用的服務；部署到 Cloud Run 等環境時，金鑰通常由**服務端環境變數**與 **App Proxy** 機制處理，**不應**被打包進可公開下載的前端程式。

## 練習作品：Prompt（雙班競賽計時器）

請用 HTML/CSS/JavaScript 做單一網頁：兩個獨立計時器，給兩班比賽同時計時；每組有開始、暫停、重設；時間用 MM:SS（或 HH:MM:SS）、字大易讀；兩組互不干擾；不需後端。請給完整程式碼與簡短操作說明。

## 作品（產出）

第一個 AI 應用：**文字產生器**

## 實作請放此處

- 放置匯出專案或程式碼。
- 簡記使用模型、主要 Prompt、操作方式。
