# 認識 Google AI Studio

## Google AI Studio 是什麼？

**Google AI Studio**（[aistudio.google.com](https://aistudio.google.com/)）是 Google 提供的 **Gemini** 系列生成式模型之**網頁工作台**：在瀏覽器裡即可試 Prompt、對話、測試多模態輸入，並**建立／管理 Gemini API 金鑰**，把同一套模型接到自己的應用程式（Python、JavaScript、REST 等）。官方文件將其描述為以最快方式開始使用 **Gemini API**、建置多模態生成式 AI 應用的入口之一。詳見 [Google AI Studio | Gemini API 說明](https://ai.google.dev/aistudio)。

## 關於 Gemini API 金鑰：免費與付費

**重點**：通常**不是**「兩種不同金鑰」，而是同一套 **API 金鑰**機制；差別在於金鑰所屬 **Google Cloud 專案**是否**啟用計費**、以及帳戶落在 **免費額度（Free Tier）** 還是 **付費額度（Paid Tier）**，因而影響**可用模型、請求頻率上限、計費方式**與**資料使用條款**等。

- **免費額度（Free Tier）**  
  - 新帳戶通常從 **Free Tier** 開始；在專案有效的前提下，可依[定價頁](https://ai.google.dev/gemini-api/docs/pricing)使用**部分模型**，並受 **Free Tier 的速率限制**（rate limits，可在 [AI Studio 速率限制說明](https://aistudio.google.com/rate-limit)或官方文件查看）。  
  - 若需升級到付費額度，可在 Google AI Studio 的 **Projects** 等頁面找到 **Set up billing** 等流程。  
  - 付費與否也涉及**資料是否用於改進 Google 產品**等條款差異；付費服務的資料使用請以 [Terms of Service](https://ai.google.dev/gemini-api/terms) 為準。

- **付費額度（Paid Tier）**  
  - 若要**較高請求上限**、使用**進階模型**或符合**企業級資料使用**等需求，需**連結計費帳戶**；依 [Billing 說明](https://ai.google.dev/gemini-api/docs/billing)，升級時通常需 **prepay（預付）至少 $10** 等額度（金額與方案以官方當前文件為準；另有 **Prepay／Postpay** 等計費型態，細節可能更新）。  
  - 付費與否會影響**可用額度、速率上限與計費方式**；實際 **每百万 token 價格**請以 [Gemini API 定價](https://ai.google.dev/gemini-api/docs/pricing)為準。

**金鑰從哪裡來？**  
在 [Google AI Studio 的 API Keys 頁面](https://aistudio.google.com/app/apikey)建立與管理；每把金鑰會綁定 **Google Cloud 專案**。請勿將金鑰寫進公開程式碼或前端；建議用環境變數（如 `GEMINI_API_KEY` or `GOOGLE_API_KEY`）。詳見 [Using Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key)。

> **教學提醒**：免費／付費門檻、模型名稱、價格與速率**會隨官方更新而變動**，授課時請以 **Google AI for Developers** 當前頁面為準。

## Prompt Gallery（範例庫）是什麼？

**Gallery**（常與 **Prompt Gallery** 並提）是 AI Studio 裡的**範例展示區**：集結多個**現成 Prompt 與小型應用概念**，示範 Gemini 能做的事（例如多模態輸入、長上下文、結構化輸出、簡單工具流程等）。用途是**參考、複製思路**，再改成自己的需求，而不必從白紙開始。官方也提供對外的範例索引，例如 [Gemini API 的 Prompt 範例（Prompt Gallery）](https://ai.google.dev/gemini-api/prompts)；AI Studio 介面內的入口名稱與位置可能隨改版調整。

## 使用 Gemini API 時，用的是誰的金鑰？

在 **Google AI Studio** 裡建立、預覽或執行會呼叫 **Gemini API** 的應用時，請求會綁在您登入帳號底下的 **Google Cloud 專案**，並使用該專案所建立的 **API 金鑰**與**配額／計費**（簡單說：**在自己帳號裡操作，就是用自己的 Gemini API 額度**）。

因此請區分兩件事：

- **分享連結或範例給別人**：對方若在自己的 Google 帳號開啟 AI Studio、並使用 **Remix**（見下一段）把專案收到自己的工作區，之後執行時會改為**對方專案的金鑰與額度**。
- **請勿**把 API 金鑰寫進公開網頁、GitHub 或給學員複製到前端；否則任何人呼叫都會**消耗該金鑰所屬專案**的額度，且有外洩風險。

## Remix：想改內容時怎麼做？

**Remix** 會把 Gallery 或既有專案（含您自己的）**複製一份到您目前的工作區**，讓您在**不覆寫原版**的前提下修改 Prompt、參數、介面或流程。教學上可視為「以範例為底稿分叉」：**先 Remix → 再依課程需求改內容**，比從零撰寫快，也較容易對照差異。

---

## 課堂規劃（約）

- 建立／登入 **Google AI Studio**，瀏覽建立應用、模型選擇、系統提示（若有）等基本介面；可順便打開 **Gallery／Prompt Gallery** 看一則範例。
- 任選一則範例試 **Remix**，在副本上小改 Prompt 或輸入，體會「範本分叉」流程。
- 釐清「輸入 → 模型 → 輸出」流程，並嘗試更換模型或參數，觀察差異。
- 練習用自然語言描述需求，再**小步修改 Prompt**，比對前後結果（迭代式調整）。
- 完成一個最小可行作品：**文字產生器**（例如依主題產生段落、改寫語氣、條列重點等）。
- 整理本次使用的 Prompt 要點與失敗／成功經驗，作為後續主題的基礎。

## 作品（產出）

第一個 AI 應用：**文字產生器**

## 實作請放此處

- 於本資料夾新增專案檔、匯出程式或 Google AI Studio 相關設定備註。
- 可附簡短說明：使用的模型、Prompt 要點、操作截圖連結。
