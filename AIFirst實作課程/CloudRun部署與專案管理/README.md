# 🚀 Google AI Studio 主動部署完全指南（發布、自訂網址、更新與一鍵下架）

> **30 秒核心導讀**：  
> 在 Google AI Studio 開發完網頁後，最令人興奮的時刻就是**「一鍵公開發布給主管或客戶看」**！  
> 本單元依據 Google AI Studio 最新真實介面，帶你徹底掌握：  
> 1. **主動部署 2 步流程**：從「隱私確認」到「自訂專屬 `.ai.studio` 網址」。  
> 2. **發布後的控制面板**：如何一鍵造訪（Visit）、更新程式碼後重新發布（Republish）。  
> 3. **一鍵下架釋放額度（Unpublish app）**：每個免費帳號最多同時保留 **2 個免費上線專案**，學會如何在面板上一秒取消發布，立即釋放配額！  
> 4. **進階維運與手動刪除**：認識 Google Cloud Run 背後機制，以及 GCP 控制台手動管理備援方案。

---

## 🗺️ 一、 主動部署 vs. 手動部署：有何不同？

| 比較維度 | 🚀 Google AI Studio 主動部署（推薦首選） | 🛠️ Google Cloud 手動部署（進階維運） |
| :--- | :--- | :--- |
| **操作介面** | 直接在 AI Studio 右側點擊 **Publish** 面板 | 前往 [Google Cloud Console](https://console.cloud.google.com/) 或透過 `gcloud` 指令 |
| **操作門檻** | **零門檻**，完全不需懂 Docker 或伺服器配置 | 需理解容器映像檔、環境變數、連接埠 (Port) 與 IAM 權限 |
| **網址格式** | 享專屬頂級網域：`https://[你自訂的名稱].ai.studio` | 預設為隨機 `*.run.app`，需手動設定 DNS 綁定自訂網域 |
| **金鑰安全** | 系統自動啟用 **Backend Proxy**，API Key 自動由伺服器隔離保護 | 開發者需自行在 GCP Secret Manager 或環境變數配置金鑰 |
| **下架刪除** | 面板內一鍵點擊 **`Unpublish app`**，立即釋出配額 | 需手動登入 GCP Console 勾選 Cloud Run 服務進行刪除 |
| **適合對象** | **辦公室同仁、課程學員、快速展示成果的 PM 與主管** | **企業正式營運系統、需自訂 VPC 私有網路的架構師** |

---

## ⚡ 二、 主動部署實戰 2 步驟（依據官方最新介面）

在 Google AI Studio 右側工具列點擊 **`Publish`** 按鈕，即可進入發布流程：

```
【步驟 1】啟動引導 (What does publishing look like?) ──► 點擊「Get started」
                                                           ▼
【步驟 2】最終設定 (Final touches) ──────────────────► 自訂 App URL ➜ 點擊「Publish your app」
                                                           ▼
【步驟 3】發布成功面板 (is published!) ──────────────► 點擊「Visit」立即造訪專屬網站！
```

---

### 步驟 1：啟動引導頁（What does publishing look like?）

點擊頂部的 `Publish` 後，首先會看見系統的安全與隱私說明：

- 🔒 **Chat history & code will stay private（對話紀錄與程式碼絕對私密）**：
  外部訪客只能操作編譯後的最終網頁，**完全看不到你在 AI Studio 中的提示詞（Prompts）、對話過程與原始程式碼**。
- 🔗 **Your app will be accessible via a public URL（產生正式公開網址）**：
  產生一個任何人用手機、平板或電腦皆可隨時造訪的獨立網址。
- 👉 **操作動作**：確認無誤後，點擊下方的 **`Get started`** 按鈕進入下一步。

---

### 步驟 2：最終設定頁（Step 2 Final touches）

在此頁面中，你可以預覽應用程式卡片，並自訂最重要的上線資訊：

1. **Description（專案描述）**：
   - 系統會根據專案自動產生摘要，你也可以手動修改，這段文字會作為該網頁的預設介紹。
2. **App URL（自訂專屬網址）**：
   - 預設網址後綴為 **`.ai.studio`**。
   - 你可以在輸入框自訂網址前綴，例如輸入 `universal-template-filler-excel`，最終網址即為：  
     👉 **`https://universal-template-filler-excel.ai.studio`**
   - ⚠️ **系統會即時檢核 5 大命名規則（全部呈現綠色打勾才可發布）**：
     - ✅ **6–63 characters**（長度需介於 6 到 63 個字元）
     - ✅ **Only uses lowercase letters, numbers or hyphens**（只能使用小寫英文字母、數字或破折號 `-`）
     - ✅ **Starts and ends with a letter or number**（必須以英文字母或數字開頭及結尾）
     - ✅ **No consecutive hyphens**（不可有連續的破折號如 `--`）
     - ✅ **No reserved or prohibited terms**（不可使用系統保留字或違規字詞）
3. 👉 **操作動作**：設定完成後，點擊底部的 **`Publish your app`** 按鈕！系統會在背景自動配置容器與安全憑證，約 30~60 秒內即可完成部署。

---

## 🎛️ 三、 發布成功控制台：如何管理、更新與一鍵下架？

發布成功後，右側的 Publish 面板會常駐顯示 **發布狀態控制台 (App is published!)**：

### 1. 核心操作按鈕
- 🌐 **`Visit`**：一鍵開啟新分頁，直接瀏覽正式上線的網頁成果，方便立刻複製網址分享到 LINE/Slack 群組給主管或同事。
- 🔄 **`Republish`**：當你在 AI Studio 裡微調了文字、修改了功能或更新了樣式，**只要點擊 Republish，系統就會一鍵將最新程式碼同步更新至雲端，網址完全不變**！

### 2. 狀態與安全資訊
- **Status**：顯示 🟢 **`Ready`**，代表雲端容器運作正常。
- **App URL**：顯示目前對外服務的專屬網址（點擊右側箭頭可展開或複製）。
- **Gemini API**：顯示遮罩後的 API Key（如 `API Key ...c8gA`），由 Backend Proxy 在伺服器端妥善保護，外部無法竊取。

---

## 🛑 四、 極重要！如何「一鍵下架」釋出 2 個免費額度？

> ⚠️ **新手最常碰到的卡關情境**：  
> Google AI Studio 的免費初學方案（Starter Tier）規定每個帳號最多**只能同時保持 2 個免費上線專案**！  
> 當你發布第 3 個作品時，系統會提示額度已滿。此時只要利用面板上的下架功能，就能一秒釋放名額！

### 方式 A：AI Studio 面板一鍵下架（最快！最推薦 ⭐）
1. 打開先前已發布的舊專案，點擊右側工具列的 **`Publish`**。
2. 看到控制面板後，直接點擊底部的 **`Unpublish app`** 按鈕！
3. 系統會彈出確認提示，點擊確認後：
   - 該應用程式立刻停止對外公開服務。
   - **免費 2 個專案的配額瞬間釋放出 1 個名額！**
   - 你可以立即回到新專案中進行發布！

---

### 方式 B：Google Cloud Console 後台手動刪除（備援方案）
如果舊專案在 AI Studio 裡已經被你不小心刪除，但雲端仍佔用名額，你可以到 GCP 後台手動移除：

1. 前往 [Google Cloud Console - Cloud Run 服務頁面](https://console.cloud.google.com/run)。
2. 在頂部專案選單中，切換到該 AI Studio 所關聯的 GCP 專案（通常名為 `gen-lang-client-xxxx`）。
3. 在服務清單中，找到對應的應用程式名稱，**在左側核取方塊打勾**。
4. 點擊頂部的 **「🗑️ 刪除 (Delete)」** 按鈕並輸入名稱確認。
5. 約 10 秒後服務徹底清除，配額同樣順利釋放！

---

## 💰 五、 費用安全與運作常識 (Cost & Safety)

### 1. 網頁沒人造訪時會扣錢嗎？
- **完全不會！** Google Cloud Run 原生支援 **「縮容至 0 (Scale to Zero)」** 技術。
- 當沒有人開啟網頁時，伺服器實例會自動進入休眠狀態，CPU 與記憶體佔用降為 0，完全不計運算費。

### 2. 每月免費額度有多少？
- Cloud Run 每月提供高達 **200 萬次請求（2 Million Requests）** 的永久免費層。
- 對於日常辦公室內部工具、課堂展示與求職作品集，幾乎不可能超出免費額度，請安心使用！
