# 認識 Google AI Studio

## 學習重點
- Playground 的用途：認識 Google 提供的各種模型（部分需要付費 API Key，部分可用免費 API Key）。
- Gallery 的用途：瀏覽各種模型應用範例 App，並可 Remix 快速改造（同樣可能使用付費或免費 API Key）。
- Google AI Studio 是 Gemini 的網頁工作台，可快速做出 AI prototype。
- 可用 Prompt 反覆迭代，並在 Code/Preview 間調整成果。
- 可以 Share（給他人 Remix）或 Deploy（對外發布）。


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

```
請用 HTML/CSS/JavaScript 做單一網頁：兩個獨立計時器，給兩班比賽同時計時；每組有開始、暫停、重設；時間用 MM:SS（或 HH:MM:SS）、字大易讀；兩組互不干擾；不需後端。請給完整程式碼與簡短操作說明。
```
