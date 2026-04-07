# 認識 Google AI Studio

## Google AI Studio 是什麼？

**Google AI Studio**（[aistudio.google.com](https://aistudio.google.com/)）是 Google 提供的 **Gemini** 系列生成式模型之**網頁工作台**：在瀏覽器裡即可試 Prompt、對話、測試多模態輸入，並**建立／管理 Gemini API 金鑰**，把同一套模型接到自己的應用程式（Python、JavaScript、REST 等）。官方文件將其描述為以最快方式開始使用 **Gemini API**、建置多模態生成式 AI 應用的入口之一。詳見 [Google AI Studio | Gemini API 說明](https://ai.google.dev/aistudio)。

> **補充（Gemini AI Studio 實務）**  
> 使用 **Gemini API key** 時，常見做法包含 **Gemini API Proxy** 與 **Secrets 注入**。  
> 在 AI Studio 內直接分享（Share）可作為 prototype；此外也可用新提供的 Deploy 流程，直接部署到 **Google Cloud Run**。  

## 建立新 App 時可調的選項（Advanced settings）

建立／新建應用時，**Advanced settings**（進階設定）內常見項目如下（名稱與選項可能隨改版變動，以當前介面為準）：

| 項目 | 說明（約） |
| --- | --- |
| **Select model for chat** | 選擇此 App 在**對話／生成程式與內容**時使用的 **Gemini 模型**（下拉選單，例如預設或 Flash／Pro 等版本）。 |
| **System instructions** | **系統提示**：可寫專案層級指令，約束語氣、風格、預設行為或補充背景（與單次 Prompt 不同，屬「整個專案」的長期規則）。 |
| **Framework** | 僅能從介面提供的選項擇一（常見為 **React**、**Next.js**、**Angular**）；**無法**在此選到「任意技術棧」（例如 Vue、Svelte、純 HTML 等需另想辦法）。 |
| **Usage Tier** | 顯示目前請求所屬額度（例如是否為 **free tier** 等提示）。 |
| **Microphone source** | 若應用需要**語音輸入**，可指定麥克風來源（無需語音時可略過）。 |

初學者可先**保留預設**，熟悉 Preview／Code 後再改模型或 Framework。

### 技術棧：實務上「無法只靠 System instructions／介面」完全指定

依 [Gemini API 文件](https://ai.google.dev/gemini-api/docs/system-instructions)，**system instructions** 主要用來**引導模型行為**（角色、語氣、風格、規則），**不是**可靠的「技術棧設定檔」。實際操作時，**在 System instructions 裡寫死要用的框架或套件，往往無法穩定生效**；模型仍可能依預設或對話內容產出與預期不符的結構。

**Framework** 下拉選單也**只限**少數選項（如 React／Next.js／Angular），**不能**涵蓋所有堆疊；若目標不是其中一種，介面上**沒有**對應「指定技術棧」的萬用欄位。

**務實作法**：

1. **在對話／Prompt 裡明確寫**：要單一 HTML、或限定某框架、套件、建置工具，並**多輪修正**直到 Preview/Code 符合預期。  
2. **切換到 Code 模式手動改**檔案與依賴，最可控。  
3. **System instructions** 仍適合補充**風格與規範**（例如註解語言、錯誤處理原則），但**不要**假設只靠它就能鎖死技術棧。

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

**請注意**：並非每一則範例都能在 **Free Tier（免費額度）** 下完整執行。部分 Gallery 範例會依賴**僅開放給付費額度（Paid Tier）**的模型、較高速率上限或進階能力；若您的專案尚未**連結計費／升級為付費額度**，可能無法執行、會顯示需升級的提示，或需改選其他模型。授課或自學時，建議先挑**明確支援免費額度**的範例，或先閱讀該範例使用的模型在 [定價頁](https://ai.google.dev/gemini-api/docs/pricing)上的說明再決定是否啟用付費專案。

## 使用 Gemini API 時，用的是誰的金鑰？

在 **Google AI Studio** 裡建立、預覽或執行會呼叫 **Gemini API** 的應用時，請求會綁在您登入帳號底下的 **Google Cloud 專案**，並使用該專案所建立的 **API 金鑰**與**配額／計費**（簡單說：**在自己帳號裡操作，就是用自己的 Gemini API 額度**）。

因此請區分兩件事：

- **Share（分享）**：代表您把自己寫好的 App **分享出去**，讓別人透過連結**能夠 Remix**（在您作品上「分叉」成他們自己的副本再改）。收到連結的人在**自己的 Google 帳號**裡 **Remix** 之後，呼叫 Gemini 會使用**該使用者自己的** API 金鑰與 **Google Cloud 專案**額度，**不會**用到您（建立分享連結者）專案裡的金鑰。
- **請勿**把 API 金鑰寫進公開網頁、GitHub 或給學員複製到前端；否則任何人呼叫都會**消耗該金鑰所屬專案**的額度，且有外洩風險。

## Remix：想改內容時怎麼做？

**Remix** 會把 Gallery 或既有專案（含您自己的）**複製一份到您目前的工作區**，讓您在**不覆寫原版**的前提下修改 Prompt、參數、介面或流程。教學上可視為「以範例為底稿分叉」：**先 Remix → 再依課程需求改內容**，比從零撰寫快，也較容易對照差異。

**Share（分享）**與 **Publish（發布）**：

- **Share**：**您寫的 App** 完成後，可產生分享連結，讓**別人**能對您的作品按 **Remix**，在他們的帳號下複製一份再改（原版仍在您這裡）。若您是從 **Gallery** 起步，通常也要先 **Remix** 成「自己的 App」，之後才能 Share／Publish 您這一份。若僅停留在他人範例的唯讀預覽、未完成 Remix，往往**無法**以您要的方式操作。按鈕是否出現、名稱為何，以當前介面為準。
- **Publish**：見下表與「Publish 畫面」小節（公開網址、綁定 GCP 專案等）。

**Share 與 Publish 的差異（教學上請先記這個）**：**Share** 的目的是讓人 **Remix**；對方 **Remix** 後在自己環境裡執行時，用的是**對方自己的** API 金鑰與配額。**Publish** 則是把網站公開上線，訪客使用時通常仍由**您發布時選定的** Google Cloud 專案與金鑰承擔流量（可設 spend cap）。

### Share／Publish 之後，Gemini API 配額算誰的？

**Share** 與 **Publish** 的計費邏輯不同：**Share** 是讓人 **Remix** 您的 App；對方在自己帳號裡 **Remix** 並開發／執行時，使用**自己的**帳號與 API。**Publish** 則依發布時綁定的專案而定。其餘情境仍可能因實作方式不同（例如金鑰寫在前端）而有所不同。以下為教學上常用的區分方式：

| 情境 | 額度／計費大致歸屬（原則） |
| --- | --- |
| 您對自己寫的 App 按 **Share**，對方透過連結在**自己的 Google 帳號** **Remix** 並開發、執行 | 使用**Remix 的那一方（使用者）自己的** API 金鑰與 **Google Cloud 專案**配額；**不**扣您（分享者）專案的額度。 |
| 您 **Publish** 成**公開網址**，訪客使用該網站，而應用經您選定的 **Google Cloud 專案**呼叫 Gemini | **一般用戶的每次呼叫**多半計入**該專案／您帳號下**的用量與[計費／額度](https://ai.google.dev/gemini-api/docs/billing)；發布畫面可另設 **spend cap（支出上限）**，見下一段。 |
| 應用程式把 **API 金鑰寫在**前端網頁並公開 | 任何人造訪都可能觸發呼叫 → **該金鑰所屬專案**承擔用量；官方**不建議**在正式環境如此做（見 [Using Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key) 的安全說明）。 |
| 應用改為要求使用者**各自登入**、或使用 **ephemeral tokens** 等機制（依實作） | 可能改為由**使用者端**或**不同計費邏輯**承擔，**完全視您怎麼寫**；無單一預設答案。 |

#### Publish（發布）畫面上：專案、自己的 API，與「額度／上限」

在 **Publish your app** 步驟中（頂部可能有 **Share／Publish／Versions／Secrets** 等分頁，名稱以當前介面為準）：

- 必須先**選取一個 Google Cloud 專案**（例如下拉選單中的專案；旁邊可能連到 Google Cloud Console）。發布後的應用會使用**該專案**底下的 **Gemini API** 與金鑰／計費設定，也就是**使用您自己（該專案擁有者）的 API 資源**。
- **Protect your Gemini API usage** 區塊可設定 **Gemini API spend cap（支出上限）**（按鈕可能顯示為 *Set spend cap*）。介面會說明：**達到設定的 spend cap 後，Gemini API 用量會停止**（例如 *Gemini API usage will stop once spend cap is reached*），用來避免公開上線後費用或用量失控。
- 按下 **Publish** 前，畫面通常會提示您已閱讀並同意 **Google Cloud Platform Terms of Service**（以當時條款連結為準）。

**建議**：在 Google AI Studio 的 **Dashboard** 查看 **Usage**、**Projects／Billing**，並對照 [Gemini API Billing](https://ai.google.dev/gemini-api/docs/billing) 與 [Rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)；若仍不確定，可先用**測試專案**小規模 Publish，必要時先設 **spend cap** 再觀察用量。

## 刪除應用（App）

若要刪除已不再使用的應用，請至 Google AI Studio 的 **Your apps**（您的應用）頁面，在列表中找出該 App 並執行刪除。側邊選單或 **Dashboard** 的實際名稱、位置可能隨改版調整，請以當前介面為準。

## Code 模式與 Preview 模式

在 Google AI Studio 的應用／專案編輯介面中，常會區分：

- **Preview（預覽）模式**：用來**操作、查看**產出結果與互動效果，**僅能預覽功能**，**無法**由此下載整包專案或完整程式碼。
- **Code（程式碼）模式**：需**切換到 Code 模式**後，才會出現**內建程式碼編輯器**，可**手動修改** HTML／CSS／JavaScript（與完全依賴 AI 產生互補：小改、除錯、加註解都可直接編輯）。切換回 **Preview** 可驗證畫面與互動是否如預期。此模式下亦會出現**下載專案**（或匯出／打包下載等）相關操作；**要備份到本機或上傳到 GitHub，請先進入 Code 模式再下載**。

介面上的切換按鈕名稱、位置、編輯器版面與下載選項可能隨改版調整，以當前 AI Studio 為準。

---

## 課堂規劃（約）

- 建立／登入 **Google AI Studio**，瀏覽建立應用、模型選擇、系統提示（若有）等基本介面；可順便打開 **Gallery／Prompt Gallery** 看一則範例。
- 若範例要求**付費額度**或無法執行：改選其他範例，或（在允許且有必要時）於專案中**設定計費**；勿強制全班在第一天就開通付費。
- 任選一則**可於 Free Tier 跑完**（或已開通付費者任選）的範例試 **Remix**，在副本上小改 Prompt 或輸入；**Remix 之後**再練習 **Share／Publish**（未 Remix 前通常無法以可編輯專案方式分享／發布）。
- 釐清「輸入 → 模型 → 輸出」流程，並嘗試更換模型或參數，觀察差異。
- 練習用自然語言描述需求，再**小步修改 Prompt**，比對前後結果（迭代式調整）。
- 完成一個最小可行作品：**文字產生器**（例如依主題產生段落、改寫語氣、條列重點等）。
- 切換到 **Code 模式**：可於**編輯器手動改程式**，再回 **Preview** 驗證；並於 Code 模式下**下載專案**到本機（**Preview 僅供預覽**，無法下載整包）。
- 整理本次使用的 Prompt 要點與失敗／成功經驗，作為後續主題的基礎。

### Prompt 範例：雙班競賽計時器（選讀）

| 原始想法 | 潤飾後（貼給 AI 用） |
| --- | --- |
| 建立 2 個班級的計時器，為了比賽計時用 | 請用 HTML/CSS/JavaScript 做**單一網頁**：**兩個獨立計時器**，給兩班比賽同時計時；每組有**開始、暫停、重設**；時間用 MM:SS（或 HH:MM:SS）、**字大易讀**；兩組互不干擾；不需後端。請給完整程式碼與簡短操作說明。 |

若本堂規定作品為**文字產生器**，上表僅作**練習如何把需求說清楚**，不必改交計時器。

## 作品（產出）

第一個 AI 應用：**文字產生器**

## 實作請放此處

- 於本資料夾新增專案檔、匯出程式或 Google AI Studio 相關設定備註（**Code 模式**可手動編輯程式後再下載；勿只在 Preview 畫面找下載）。
- 可附簡短說明：使用的模型、Prompt 要點、操作截圖連結。
