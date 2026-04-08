# Render 部署完整教學 (Web Service)

這份文件將帶您了解如何使用 **Render** 最新的上傳介面，將本專案 (SROI Remix App) 部署為 Web Service，使其能順利在網際網路上對外開放並正常執行 AI 分析。

## 準備工作
1. 確保您已經將最新的程式碼推送到您的 GitHub 存放庫 (Repository)。
2. 準備好您的 Gemini API Key（也就是您在 `.env.local` 中使用的那組密碼，因為稍後在 Render 網站上需要設定）。

---

## 🚀 部署步驟圖文拆解

當您登入 [Render Dashboard (儀表板)](https://dashboard.render.com/)，點擊 **New > Web Service** 並關聯了這個 GitHub 專案後，您會看到如下圖所示的新版設定介面。請依照以下欄位說明進行填寫：

### 1. 基本設定 (Basic Settings)
*   **Name (服務名稱)**
    您希望這個 Web Service 叫什麼名字。例如：`sori-remix-app`。（注意：這會影響到您後續拿到的網址前綴）。
*   **Project (專案群組 - 非必填)**
    如果您想把好幾個服務群聚為一個專案，可以在此新增；若無需求，直接跳過留白即可。

### 2. 環境與程式庫設定 (Environment & Repository)
*   **Language (執行環境語言)**
    點開下拉式選單，請選擇 **`Node`**。本專案是基於 Node.js 運作的全端 React 專案。
*   **Branch (分支)**
    系統預設會帶出您的專案主分支（例如 `main`）。如果您的程式碼放在其他分支，請點開選單切換。
*   **Region (伺服器位址)**
    請選擇離您最近的機房區域。例如選擇：`Singapore (Southeast Asia)` 可以獲得較低延遲的使用體驗。
*   **Root Directory (根目錄 - 非必填)**
    這個欄位請**保持留白**（不要填寫任何文字），因為我們專案的所有設定檔都在最外層。

### 3. 編譯與啟動指令 (Build & Start Commands)
這是確保程式能在 Render 主機上被正確打包和執行的關鍵設定：

*   **Build Command (應用程式建置指令)**
    在欄位中填入：
    ```bash
    npm install && npm run build
    ```
    *(說明：這個指令會請 Render 先為專案安裝所有的 npm 套件，接著執行 React Router 專案的生產打包作業。)*

*   **Start Command (網站啟動指令)**
    在欄位中填入：
    ```bash
    npm run start
    ```
    *(說明：專案建置完成後，Render 會使用此指令在機房內正式啟動您的伺服器。)*

---

## 🔐 步驟 2：加入環境變數 (Environment Variables)

（這一步非常重要，否則網站上線後會無法產出 AI 報告！）

填寫完上面步驟後向下捲動，或在進階設定 (Advanced) 中找到 **「Environment Variables」** 設定區塊。

請點擊 **Add Environment Variable**，新增以下兩個環境參數：

| Key (變數名稱) | Value (變數值對應內容) | 說明 |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | `AIzaSyXXXXXXXXXXXX....` | 貼上您原本開發時存在於 `.env.local` 中的那一段金鑰 |
| `NODE_VERSION` | `22` | *(建議加入)* 明確告知 Render 使用 Node 22 版本，避免它使用太底層舊版本引發錯誤 |

---

## 🎉 步驟 3：建立部屬 (Create Web Service)

當所有欄位確認無誤後：
1. 請點擊畫面最下方或右下角的 **「Create Web Service」** (或 Deploy 服務) 按鈕。
2. 此時頁面會跳轉並顯示一個 Terminal 終端機的對話框，這裡會呈現 Render 為您開始下載套件與自動打包的工作進度（約等待 2~3 分鐘）。
3. 當畫面左方的狀態列顯示綠色的 **Live** 時，恭喜！這代表您的網站已經成功上線營運了！
4. 您可以點擊畫面上方配發的那一段專屬網址（例如：`https://sori-remix-app-xxxx.onrender.com`）來查看您的上線網站囉。

> 💡 **關於自動化部署 (Auto-Deploy)**：
> 預設情況下，Render 會開啟自動部署。這代表往後只要您透過 `git push` 把電腦裡的新程式碼推送到 GitHub `main` 分支時，Render 主機偵測到後就會自動幫您立刻「重新打包上線」，完全不需手動介入。
