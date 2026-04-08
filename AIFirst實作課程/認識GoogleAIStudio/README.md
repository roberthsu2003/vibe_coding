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

## 實作流程

1. 建立 App，先用預設模型做第一版。
2. 用一句話需求開始，逐步調整 Prompt。
3. 切到 Code 模式做小修，再回 Preview 驗證。
4. 完成最小作品（文字產生器即可）。
5. 需要對外展示時，再做 Share 或 Deploy。

## Share、Remix、Deploy

- **Share**：分享你的 App 給別人使用，這代表對方執行時會**使用你的 API 金鑰與配額**；若你使用別人 Share 的 App，也是使用對方的金鑰。
- **Remix**：把別人的專案複製到自己的工作區再修改。當你執行 Remix 過來的專案時，就會**使用自己的 API 金鑰與配額**。
- **Deploy**：將應用部署成可對外使用的服務；部署到 Cloud Run 等環境時，金鑰通常由**服務端環境變數**與 **App Proxy** 機制處理，**不應**被打包進可公開下載的前端程式。

## 部署與費用注意事項（非常重要）

1. **Google Cloud Run 部署與收費**：Deploy 會將應用程式發布至 Google Cloud Run 服務。使用此服務必須先綁定信用卡以啟用帳單帳戶。為了避免產生預期外的費用，強烈建議設定預算警告通知，設定路徑為：「Google Cloud -> 帳單 -> 預算與警告」。設定後若費用超標，系統會發送 Email 通知，但**不會自動停止服務**。

2. **Gemini API 費用上限（Spend Cap）**：若使用付費版 Gemini API 金鑰，務必設定「支付上限」（Spend cap）。設定後，當月花費一旦達到上限，API 金鑰將會暫停服務，直到下個月重新計費才會恢復，能有效管控成本。設定路徑為：「Google AI Studio -> Dashboard -> Spend」，選擇付費專案並設定 `monthly spend cap`。

3. **API 金鑰轉換計費**：專案部署（Deploy）時，原本使用的免費版 Gemini API 金鑰會轉為由付費帳戶計費的 API 金鑰。

4. **雙重費用來源**：總結來說，專案部署上線後將產生兩種費用：**Google Cloud Run 伺服器運行費用**，以及 **Gemini API 呼叫費用**。

## 練習作品：Prompt（雙班競賽計時器）

請用 HTML/CSS/JavaScript 做單一網頁：兩個獨立計時器，給兩班比賽同時計時；每組有開始、暫停、重設；時間用 MM:SS（或 HH:MM:SS）、字大易讀；兩組互不干擾；不需後端。請給完整程式碼與簡短操作說明。

