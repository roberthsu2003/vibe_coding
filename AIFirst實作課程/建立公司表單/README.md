# 建立公司表單：辦公室飲料訂購系統 🥤

本單元將帶領學生完成一個完整的全端 Web 應用。我們將手動設定 Google Sheets（Google 試算表）作為資料庫，並使用 Google Apps Script (GAS) 部署一個具備**動態日期自動建表**與完整 **CRUD（新增、查詢、修改、刪除）** 功能的 API 後端。最後，我們將學習如何使用 **Google AI Studio**，透過老師分享的 Prompt 連結讓 AI 直接為我們生成一個**雙擊即用的單一網頁檔案 (`index.html`)**，讓前端網頁不需要任何安裝與部署即可直接運行！

---

## 📅 課程架構
1. **第一階段**：後端資料庫與 API 設定（Google Sheets + Google Apps Script）
2. **第二階段**：使用 Google AI Studio 的 Share（分享）功能直接獲取並運行前端網頁

---

## 🛠️ 第一階段：後端資料庫與 API 設定

因為這部分需要正確的雲端權限設定，請務必按照步驟仔細操作！

### 步驟 1：建立 Google 試算表 (Google Sheets)
1. 前往 [Google 雲端硬碟](https://drive.google.com/)，建議先**建立一個專屬資料夾**（例如：`AIFirst_飲料實作`）並進入該資料夾。
2. 點擊左上角「**新增**」 > 「**Google 試算表**」，並將左上角的檔案名稱命名為「**辦公室飲料訂購系統**」。
3. **建立菜單分頁 (`Menu`)**：
   - 將第一個工作表（分頁）重新命名為 **`Menu`** (請注意大小寫與拼字)。
   - 點擊儲格 **A1**，複製並貼上以下表格內容（貼上後會自動分為四欄）：
     ```text
     飲料名稱	單價	類別分類	備註描述
     茉莉綠茶	35	原味茶類	選用新鮮茉莉花薰製而成，清香解膩。
     珍珠奶茶	55	經典奶茶類	Q彈珍珠搭配濃郁奶茶，店內人氣冠軍。
     燕麥拿鐵	65	鮮奶茶類	使用職人鮮奶與澳洲燕麥，口感豐富有層次。
     翡翠檸檬	60	特調果茶類	新鮮現榨檸檬汁搭配清爽綠茶，夏季首選。
     烏龍拿鐵	60	鮮奶茶類	重烘焙烏龍茶香與鮮奶的完美融合。
     葡萄柚綠茶	70	特調果茶類	內含豐富果粒，建議微糖微冰最能襯托果香。
     仙草凍奶茶	50	經典奶茶類	滑嫩手作仙草凍，香甜不膩口。
     炭焙鐵觀音	40	原味茶類	茶韻濃厚回甘，適合喜愛重茶感的顧客。
     百香雙響炮	65	特調果茶類	加入珍珠與椰果，口感豐富多變。
     紅豆抹茶拿鐵	75	季節限定類	慢火熬煮紅豆搭配日本靜岡抹茶，風味優雅。
     ```

> [!NOTE]
> **✨ 試算表自動化設計**：
> 這次的教學非常精簡！您**不需要**手動建立訂單分頁（如 `Orders`）。我們的 Apps Script API 會在每天第一筆訂單進來時，自動以當天日期（例如：`2026-05-24`）建立一個全新的工作表，並自動生成表頭及美化排版。這樣既方便每日對帳，又免去了手動設定的繁瑣步驟！

---

### 步驟 2：複製貼上後端程式碼 (GAS)
1. 在試算表上方選單中，點擊 **「擴充功能」 > 「Apps Script」**。
2. 這會開啟 Google Apps Script 瀏覽器編輯器。
3. 將編輯器中預設的 `function myFunction() {}` 全部刪除。
4. **複製貼上後端程式碼**：
   後端 API 程式碼需要處理較為複雜的試算表讀寫與日期分頁邏輯。**為了讓學生將學習精力專注在 AI 前端開發與 API 對接，後端 API 的部分我們不需要用 AI 來從頭生成！**
   您可以直接複製下方老師已經為大家編寫並優化好的完整 **JavaScript (Google Apps Script)** 程式碼，並完全覆蓋（貼上）到您的編輯器中即可：

```javascript
/**
 * 辦公室飲料訂購系統 - Google Apps Script 後端 API
 *
 * 支援「每日日期分頁」的動態資料庫設計。
 * 1. GET 請求：撈取「Menu」菜單與「當天日期（yyyy-MM-dd）工作表」中的訂單
 * 2. POST 請求：自動在當天第一筆訂單進來時建立日期分頁，並支援新增 (create)、修改 (update)、刪除 (delete) 訂單
 */

// 1. 處理 GET 請求：回傳菜單與「當天」的訂單
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // (1) 取得 Menu 工作表資料
  const menuSheet = ss.getSheetByName("Menu");
  let menu = [];
  if (menuSheet) {
    const menuData = menuSheet.getDataRange().getValues();
    if (menuData.length > 1) {
      // 排除第一列標題，並對應到最新 Excel 欄位：
      // row[0] (飲料名稱), row[1] (單價), row[2] (類別分類), row[3] (備註描述)
      menu = menuData.slice(1).map(row => ({
        name: row[0] ? row[0].toString().trim() : "",
        price: parseFloat(row[1]) || 0,
        category: row[2] ? row[2].toString().trim() : "",
        description: row[3] ? row[3].toString().trim() : ""
      }));
    }
  }

  // (2) 取得「當天日期命名」的訂單工作表資料
  const timezone = Session.getScriptTimeZone();
  const today = Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd");
  const orderSheet = ss.getSheetByName(today);
  
  let orders = [];
  if (orderSheet) {
    const orderData = orderSheet.getDataRange().getValues();
    if (orderData.length > 1) {
      // 排除第一列標題，並對應到 Orders 欄位：
      // row[0] (訂單編號), row[1] (時間戳記), row[2] (訂購人), row[3] (飲料名稱)
      // row[4] (甜度), row[5] (冰塊), row[6] (數量), row[7] (總金額)
      orders = orderData.slice(1).map(row => ({
        orderId: row[0] ? row[0].toString().trim() : "",
        timestamp: row[1],
        name: row[2] ? row[2].toString().trim() : "",
        drink: row[3] ? row[3].toString().trim() : "",
        sugar: row[4] ? row[4].toString().trim() : "",
        ice: row[5] ? row[5].toString().trim() : "",
        quantity: parseInt(row[6]) || 0,
        totalPrice: parseFloat(row[7]) || 0
      }));
    }
  }

  // 包裝成 JSON 格式回傳
  return createJsonResponse({ menu: menu, orders: orders });
}

// 2. 處理 POST 請求：支援當日訂單之新增、修改、刪除
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timezone = Session.getScriptTimeZone();
    const today = Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd");
    
    let sheet = ss.getSheetByName(today);

    const payload = JSON.parse(e.postData.contents);
    const action = payload.action; // "create", "update", "delete"
    const data = payload.data;

    // ─── [新增訂單 (Create)] ───
    if (action === "create") {
      // 如果今天的工作表不存在，則在此時自動初始化建立！
      if (!sheet) {
        sheet = ss.insertSheet(today, 1); // 參數 1 代表將新工作表移到第一個分頁，方便每天打開第一眼看到
        const headers = ["訂單編號", "時間戳記", "訂購人", "飲料名稱", "甜度", "冰塊", "數量", "總金額"];
        sheet.appendRow(headers);
        
        // 美化工作表：凍結首列並加粗底色
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, headers.length)
             .setFontWeight("bold")
             .setBackground("#e6f7ff") // 淺藍色背景
             .setHorizontalAlignment("center");
      }

      const orderId = Utilities.getUuid(); // 產生唯一的 UUID 作為訂單編號
      
      // 依照欄位順序寫入：
      // 1.訂單編號, 2.時間戳記, 3.訂購人, 4.飲料名稱, 5.甜度, 6.冰塊, 7.數量, 8.總金額
      const newRow = [
        orderId,
        new Date(),
        data.name || "無名氏",
        data.drink || "",
        data.sugar || "正常糖",
        data.ice || "正常冰",
        parseInt(data.quantity) || 1,
        parseFloat(data.totalPrice) || 0
      ];
      
      sheet.appendRow(newRow);
      return createJsonResponse({ status: "success", message: "訂單已成功記錄至工作表 " + today, orderId: orderId });
    }

    // ─── 對於 [修改 (Update)] 與 [刪除 (Delete)] ───
    // 因為這兩者必須建立在「今天已有工作表」的前提下，否則無從修改/刪除
    if (!sheet) {
      throw new Error("今天 (" + today + ") 尚未有任何訂單，無法進行此操作。");
    }
    
    const orderData = sheet.getDataRange().getValues();

    // ─── [修改訂單 (Update)] ───
    if (action === "update") {
      if (!data.orderId) {
        throw new Error("修改訂單時缺少 'orderId' 參數");
      }

      for (let i = 1; i < orderData.length; i++) {
        if (orderData[i][0].toString().trim() === data.orderId.toString().trim()) {
          // 找到對應的訂單編號，更新第 3 欄到第 8 欄 (訂購人 到 總金額)
          sheet.getRange(i + 1, 3, 1, 6).setValues([[
            data.name,
            data.drink,
            data.sugar,
            data.ice,
            parseInt(data.quantity) || 1,
            parseFloat(data.totalPrice) || 0
          ]]);
          return createJsonResponse({ status: "success", message: "訂單更新成功！" });
        }
      }
      throw new Error("在今日 (" + today + ") 工作表中找不到該筆訂單編號：" + data.orderId);
    }

    // ─── [刪除訂單 (Delete)] ───
    if (action === "delete") {
      if (!data.orderId) {
        throw new Error("刪除訂單時缺少 'orderId' 參數");
      }

      for (let i = 1; i < orderData.length; i++) {
        if (orderData[i][0].toString().trim() === data.orderId.toString().trim()) {
          sheet.deleteRow(i + 1); // 刪除對應的列
          return createJsonResponse({ status: "success", message: "訂單已從 " + today + " 刪除成功！" });
        }
      }
      throw new Error("在今日 (" + today + ") 工作表中找不到該筆訂單編號：" + data.orderId);
    }

    throw new Error("未知的操作 (action 必須為 create, update 或 delete)");

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

/**
 * 輔助函式：建立 JSON 回傳格式
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
                       .setMimeType(ContentService.MimeType.JSON);
}
```

5. 點擊編輯器上方工具列的「**儲存**」💾 圖示（或按快捷鍵 Ctrl+S / Cmd+S），並將專案名稱命名為「**DrinkOrderAPI**」。

---

### 步驟 3：部署並取得 API 網址 (非常重要！)
這是讓前端網頁能夠透過網路存取 Google 試算表資料庫的關鍵步驟：
1. 點擊右上角的藍色按鈕 **「部署」 > 「新增部署作業」**。
2. 點擊「選取類型」旁邊的齒輪圖示 ⚙️，勾選 **「網頁應用程式」**。
3. 填入以下欄位設定：
   - **說明**：`V1.0.0`
   - **執行身分**：選擇 **「我」** (您的 Google 帳號)。
   - **誰可以存取**：**務必選擇「所有人」** (這樣前端網頁才能跨網域存取 API)。
4. 點擊 **「部署」** 按鈕。
5. **授權存取**（初次部署會要求帳號權限）：
   - 點擊「**授權存取**」，選擇您的 Google 帳號。
   - 若出現安全警告「Google 尚未驗證此應用程式」，請點擊左下角的「**進階**」 > 「**前往 DrinkOrderAPI（不安全）**」。
   - 點擊「**允許**」。
6. 部署成功後，會看到 **「網頁應用程式網址」 (Web App URL)**。
7. **📋 請將這串網址完整複製並妥善保存**，我們在下一階段馬上會用到！

> [!WARNING]
> **修改 GAS 程式碼的注意事項**：
> 如果你未來修改了 GAS 中的任何程式碼，直接按「儲存」是不會生效的，**必須重新部署**：
> 1. 點擊「部署」 > 「**管理部署作業**」。
> 2. 點擊右上角的「編輯」（鉛筆圖示）。
> 3. 將「版本」下拉選單改為 **「新版本」**。
> 4. 點擊「部署」。
> 
> ⚠️ **千萬不要**每次都點選「新增部署作業」，否則會產生一個全新的網址，你原本放在網頁裡的網址就會失效！

---

### 步驟 4：測試你的 API (排錯指南)
在請 AI 寫前端網頁之前，先確保後端 API 是正常通訊的！

1. **如何測試？**
   開啟瀏覽器新分頁，將剛剛複製的 **網頁應用程式網址** 貼上並按下 Enter。
2. **正確的結果**：
   您應該會看到瀏覽器輸出類似下方的純 JSON 資料（包含您在 `Menu` 建立的 10 個商品項目，且 `orders` 預設為空）：
   ```json
   {"menu":[{"name":"茉莉綠茶","price":35,"category":"原味茶類","description":"選用新鮮茉莉花薰製而成，清香解膩。"},...],"orders":[]}
   ```
3. **常見問題與解決方案**：
   - ❌ **出現 Google 登入畫面或「需要授權」**：代表您在部署時，「誰可以存取」沒有設為「所有人」。請依照步驟 3 重新部署。
   - ❌ **畫面顯示 Script 錯誤 (例如 Sheet 不存在)**：請檢查您的 Google 試算表左下角的分頁名稱，是否精確為 **`Menu`** (首字母大寫，結尾不可以有空格)。

---

## 🎨 第二階段：使用 Google AI Studio 免安裝快速生成前端

在這個階段，我們將直接使用 Google AI Studio 的 **Share (分享)** 功能，不需要在您的電腦上下載 Node.js，也不需要執行複雜的 `npm` 指令，只需一鍵建立副本，就能獲得一個雙擊即用的 `index.html` 網頁！

### 步驟 1：開啟老師分享的 AI Studio Prompt 連結
1. **點選連結**：請直接點擊老師在課堂上分享的 **Google AI Studio 分享連結**（連結將會直接載入設定好的 Prompt 範本）。
2. **複製副本**：在開啟的 AI Studio 頁面右上角，點擊 **「Create Copy」**（建立副本），將該對話複製到您的個人工作區。

---

### 步驟 2：替換 API 網址並 Run 生成
1. 在複製好的對話框中，找到 Prompt 裡面的：
   `[請填入你的 GAS 網址]`
2. **將其替換**為您在 **第一階段步驟 3** 所獲得的**網頁應用程式網址**。
3. 點擊頁面下方的 **「Run」** 按鈕。
4. AI 將會立刻為您生成一個**完整的單一 `index.html` 網頁程式碼**！

> [!TIP]
> **💡 老師為您準備的 AI Prompt 內容備份**：
> 如果您想自行調整 Prompt，或者分享連結因故無法存取，可以點開下方展開查看我們完整的 Prompt 內容：
> <details>
> <summary>點擊展開：老師設定好的 AI Studio 完整 Prompt 內容</summary>
> 
> ```text
> 請幫我建立一個精美的「辦公室飲料訂購系統」前端網頁。
> 為了讓使用者雙擊檔案即可立即運行，請將所有的邏輯都集中在一個「單一的 index.html 檔案」中！
> 
> 【技術要求】
> 1. 請在 HTML 內使用 CDN 載入 React 18、ReactDOM 18、Babel Standalone（用於在瀏覽器端解析 JSX 語法）以及 Tailwind CSS CDN。
> 2. 所有的 TypeScript/JavaScript 邏輯、型別定義、OrderForm 元件、OrderList 元件與 App 整合元件全部寫在同一個 <script type="text/babel"> 區塊中。
> 
> 【API 規格與連線邏輯】
> 我已經建立好 Google Apps Script 的 API 後端，網址如下：
> [請填入你的 GAS 網址]
> 
> 1. 當網頁加載時，發送 GET 請求，後端會自動定位今天日期（如 2026-05-24）的工作表，並回傳包含菜單 (menu) 與今天訂單 (orders) 的 JSON 資料：
>    - menu 格式為：{ "name": "飲料名稱", "price": 35, "category": "原味茶類", "description": "選用新鮮茉莉花..." }
>    - orders 格式為：{ "orderId": "uuid-string", "timestamp": "...", "name": "訂購人", "drink": "飲料名稱", "sugar": "半糖", "ice": "少冰", "quantity": 2, "totalPrice": 70 }
>    - 若今天是當天第一筆訂單，orders 會自動回傳 []。
> 
> 2. POST 請求：傳送 JSON 物件，且支援 3 種 action：
>    - 新增：{"action": "create", "data": {"name": "王小明", "drink": "茉莉綠茶", "sugar": "半糖", "ice": "少冰", "quantity": 2, "totalPrice": 70}}
>    - 修改：{"action": "update", "data": {"orderId": "uuid-string", "name": "王小明", "drink": "珍珠奶茶", "sugar": "微糖", "ice": "去冰", "quantity": 1, "totalPrice": 55}}
>    - 刪除：{"action": "delete", "data": {"orderId": "uuid-string"}}
> 
> 【UI 與元件設計要求】
> 1. OrderForm 元件：精美的填單與修改表單。欄位包含：訂購人、選擇飲料（附帶單價與備註描述展示）、甜度（提供：正常糖、七分糖、半糖、微糖、無糖 的按鈕）、冰塊（提供：正常冰、少冰、微冰、去冰、溫熱 的按鈕）、數量（加減按鈕）。送出時自動計算總金額並呼叫 POST API。
> 2. OrderList 元件：精美的當日訂單列表。顯示今天所有已訂購的項目、甜度冰塊、數量與總金額。並提供「編輯」與「刪除」按鈕，點擊編輯時能將資料填回 OrderForm；點擊刪除時呼叫 POST API。
> 3. App 元件：整合上述元件，有精緻的標題列（大氣的漸層色與 icon 裝飾，並副標題說明「今日點單統計」），並在頁面載入時自動 GET 獲取最新資料。
> 
> 請在設計上追求極簡優雅的現代風格（例如使用卡片式佈局、細緻的陰影、平滑的 transition 動畫、柔和的 HSL 漸層配色）。請直接給我這一個 index.html 檔案的完整程式碼，並將 API 網址寫死在代碼中。
> ```
> </details>

---

### 步驟 3：在本地雙擊即刻運行！ (僅需 3 步)
當 AI 為您生成了單一 HTML 的程式碼後，您只需要完成以下極簡步驟，就能直接運行：

1. **新建檔案**：
   在您的電腦桌面或資料夾中，點擊滑鼠右鍵「**新增**」 > 「**文字文件**」，並將該檔案重新命名為 **`index.html`** (請確保副檔名是 `.html` 而不是 `.txt`。Mac 用戶可直接在文字編輯器中建立並儲存為 html)。
2. **貼上並儲存**：
   用記事本或任何文字編輯器打開 `index.html`，將 AI 生成的**全部網頁程式碼複製並貼進去**，接著存檔儲存！
3. **滑鼠雙擊打開**：
   用滑鼠**雙擊打開 `index.html` 檔案**。瀏覽器會立刻載入一個精美的飲料訂購系統前端，並與您的 Google 試算表 API 即時通訊。您的全端專案宣告完美成功！🎉

---

### 💡 進階課後挑戰：使用 Vite + React + TypeScript 專案架構
<details>
<summary>點擊展開：適合有程式基礎學生在本地部署 React 的完整指令</summary>

如果您想學習如何在本地端以專業的前端工程師架構 (Vite 專案) 運行本系統，請依照以下指令在您的電腦上啟動專案：

1. **初始化專案**：
   開啟您的終端機 (Terminal)，切換到您的工作資料夾，執行以下指令建立全新的 Vite 專案：
   ```bash
   # 1. 建立 Vite + React + TypeScript 專案
   npm create vite@latest drink-order-app -- --template react-ts
   
   # 2. 進入專案資料夾
   cd drink-order-app
   
   # 3. 安裝相依套件與 Tailwind CSS
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **配置 Tailwind CSS**：
   * 開啟專案中的 `tailwind.config.js`，將內容修改為：
     ```javascript
     /** @type {import('tailwindcss').Config} */
     export default {
       content: [
         "./index.html",
         "./src/**/*.{js,ts,jsx,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     }
     ```
   * 開啟 `src/index.css`，將原本內容清空，並貼上：
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

3. **貼上代碼**：
   * 在 `src/` 目錄下新增 `types.ts`。
   * 在 `src/` 目錄下建立一個 `components` 資料夾，並在裡面分別新增 `OrderForm.tsx` 與 `OrderList.tsx`。
   * 將 AI Studio 為您產生的 React 分離檔案代碼貼入對應檔案。
   * 開啟 `src/App.tsx`，將其內容清空，並貼入 AI 的 `App.tsx` 代碼。

4. **啟動專案**：
   在終端機中執行 `npm run dev`，打開瀏覽器存取 `http://localhost:5173` 即可！
</details>
