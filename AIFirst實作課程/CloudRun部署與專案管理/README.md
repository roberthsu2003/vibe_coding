# 🚀 Google Cloud Run 部署與專案管理完全指南

> **30 秒核心導讀**：  
> 在 Google AI Studio 開發完網頁後，最令人興奮的時刻就是**「一鍵公開發布給主管或客戶看」**！  
> 本單元將帶你徹底搞懂：  
> 1. **主動部署（一鍵自動發布）**：Google AI Studio 如何在背景為你自動打包全端容器。  
> 2. **什麼是手動部署？**：進階開發者如何透過 GCP 控制台精細調整伺服器效能與自訂網域。  
> 3. **如何手動刪除專案內容？**：每個免費帳號最多同時保留 **2 個免費應用程式**，學會如何至 Google Cloud Console 刪除舊專案、釋放寶貴額度！

---

## 🗺️ 一、 主動部署 vs. 手動部署：有何不同？

許多初學者常困惑：「為什麼我在 AI Studio 按一個按鈕就能上線？背後到底發生了什麼事？」

| 比較維度 | 🚀 Google AI Studio 主動部署（自動） | 🛠️ Google Cloud 手動部署（進階控制） |
| :--- | :--- | :--- |
| **操作方式** | 在 AI Studio 頂部點擊 **Publish（火箭圖示）** | 透過 [Google Cloud Console](https://console.cloud.google.com/) 或 `gcloud` 指令列操作 |
| **技術門檻** | 零門檻，完全不需懂 Docker 或伺服器配置 | 需理解容器映像檔、環境變數、連接埠 (Port) 與 IAM 權限 |
| **底層原理** | Google 在雲端自動將 React + Node.js 程式碼打包為 Docker 映像檔，並自動派送至 Cloud Run | 開發者自行撰寫 `Dockerfile`，編譯映像檔後推送到 Artifact Registry，再發布至 Cloud Run |
| **自訂網域** | 預設提供 `*.run.app` 隨機公開網址 | 支援綁定個人或公司專屬網域（如 `app.mycompany.com`） |
| **資源配置** | 預設採用 Google 最佳化微型規格（省資源、低延遲） | 可自由調配 CPU（1~8 核）、記憶體（512MB~32GB）、自動縮放上限 |
| **適合對象** | **辦公室同仁、課程學員、快速驗證原型的 PM 與業務** | **資深全端工程師、企業正式營運系統、高並發大型產品** |

---

## ⚡ 二、 主動部署實戰步驟（Google AI Studio 30 秒上線）

當你在 Google AI Studio 完成專案（例如：簡報、單據產生器、報銷系統）：

```
【步驟 1】點擊右上角「Publish」火箭圖示
                  ▼
【步驟 2】確認專案名稱與公開發布資訊 ──► 點擊「Deploy to Cloud Run」
                  ▼
【步驟 3】等待 1~2 分鐘（背景編譯與配置 SSL 憑證）
                  ▼
【步驟 4】取得正式公開網址（https://xxxx-uc.a.run.app）！
```

> 💡 **安全提示**：若專案中使用了 Gemini API，主動部署會自動啟用 **Backend Proxy 技術**，你的 API Key 會被妥善存放在伺服器環境變數，外部訪客按 `F12` 絕對看不到金鑰！

---

## 🗄️ 三、 什麼是「手動部署」？進階維運核心

如果你未來任職的公司要求**「程式碼必須託管在公司自己的 GCP 帳號」**或**「必須綁定公司官方網址」**，這時就需要手動部署：

### 手動部署的核心三步驟：
1. **建立容器映像檔 (Docker Build)**：
   在本地或 GitHub Actions 透過 Dockerfile 將前端與後端打包為輕量映像檔。
2. **推送到雲端倉庫 (Push to Artifact Registry)**：
   將映像檔上傳到 Google Cloud 的私有倉庫儲存。
3. **手動配置 Cloud Run 服務**：
   - 前往 [Cloud Run 控制台](https://console.cloud.google.com/run)。
   - 點擊「建立服務」，選取剛剛上傳的映像檔。
   - 手動設定環境變數（如 `DATABASE_URL`、`API_KEY`）。
   - 設定允許外部非驗證存取（Public Ingress）。

---

## 🗑️ 四、 極重要！如何手動刪除舊專案（釋出 2 個免費額度）

> ⚠️ **新手最常碰到的卡關情境**：  
> Google AI Studio 的 **Starter Tier（初學者免信用卡方案）** 規定每個 Google 帳號最多**只能同時保持 2 個免費上線專案**！  
> 當你做到第 3 個專案按下 Publish 時，系統會跳出 `Quota Exceeded（配額已滿）`。此時你必須**手動刪除不再使用的舊專案**，才能將寶貴的免費名額釋放出來！

### 📋 手動刪除 Cloud Run 專案 SOP（圖解步驟）

#### 步驟 1：登入 Google Cloud 控制台
打開瀏覽器，前往 [Google Cloud Console - Cloud Run 服務頁面](https://console.cloud.google.com/run)。

#### 步驟 2：確認並切換至正確的 GCP 專案
- 點擊頁面頂部導航列的 **專案下拉選單**。
- 找到由 Google AI Studio 自動建立的專案（名稱通常類似 `gen-lang-client-xxxx` 或你自訂的專案名稱）。

#### 步驟 3：勾選想要下架的舊服務
- 在服務清單（Services）中，會看到你之前從 AI Studio 發布的應用程式名稱。
- 在該專案名稱的**左側核取方塊（Checkbox）打勾**。

#### 步驟 4：點擊「刪除 (Delete)」並確認
- 點擊清單上方工具列的 **「🗑️ 刪除 (Delete)」** 按鈕。
- 畫面會彈出確認視窗，要求輸入服務名稱以防誤刪。
- 輸入完成後點擊「確認刪除」。

```
[Cloud Run 服務清單]
 ☑️  my-old-deck-presentation   🟢 運作中   [🗑️ 刪除] ◄── 點擊此處
 ☐   smart-invoice-logger       🟢 運作中
```

#### 步驟 5：完成釋放！
- 約 10 秒後，該舊服務即徹底從雲端移除，舊網址立即失效。
- **免費 2 個專案的配額立即空出 1 個！**
- 現在你可以回到 Google AI Studio，開心地發布你的全新作品了！

---

## 💰 五、 費用與風險管理常識 (Cost & Safety)

### 1. 沒人訪問時會扣錢嗎？
- **完全不會！** Google Cloud Run 具備業界著名的 **「縮容至 0 (Scale to Zero)」** 特性。
- 當沒有訪客開啟你的網址時，伺服器實例會完全休眠、CPU 與記憶體佔用歸零，完全不會產生伺服器運算費用。

### 2. 免費額度有多少？
- Google Cloud Run 每個月提供 **200 萬次請求（2 Million Requests）** 的永久免費配額。
- 對於個人作業展示、求職作品集、公司內部小組使用，基本上極難超出免費上限。

### 3. 如果帳號有綁信用卡，如何做到「100% 絕對零扣款」？
- 專案展示完畢後，依照上述第四步的步驟**將 Cloud Run 服務刪除**。
- 或者直接在 GCP「IAM 與管理」->「管理資源」將整個練習用的 GCP 專案**關閉 (Shut down project)**，雲端將會在 30 天後徹底抹除該專案的所有資料與資源，確保帳單永遠為零！
