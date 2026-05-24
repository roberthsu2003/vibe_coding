# 建立公司表單：辦公室飲料訂購系統 🥤

本單元將帶領學生完成一個完整的全端 Web 應用。我們將手動設定 Google Sheets（Google 試算表）作為資料庫，並使用 Google Apps Script (GAS) 部署一個具備**動態日期自動建表**與完整 **CRUD（新增、查詢、修改、刪除）** 功能的 API 後端。最後，我們將使用 **Google AI Studio**，透過精確的 Prompt 讓 AI 自動為我們生成極具設計感的前端網頁（React + Vite + TypeScript + Tailwind CSS）。

---

## 📅 課程架構
1. **第一階段**：後端資料庫與 API 設定（Google Sheets + Google Apps Script）
2. **第二階段**：使用 Google AI Studio 發送 Prompt 生成前端網頁並於本地運行

---

## 🛠️ 第一階段：後端資料庫與 API 設定

因為這部分需要正確的雲端權限設定，請務必按照步驟仔細操作！

### 步驟 1：建立 Google 試算表 (Google Sheets)
1. 前往 [Google 雲端硬碟](https://drive.google.com/)，建議先**建立一個專屬資料夾**（例如：`AIFirst_飲料實作`）並進入該資料夾。
2. 點擊左上角「**新增**」 > 「**Google 試算表**」，並將左上角的檔案名稱命名為「**辦公室飲料訂購系統**」。
3. **建立菜單分頁 (`Menu`)**：
   - 將第一個工作表（分頁）重新命名為 **`Menu`** (請注意大小寫與拼字)。
   - 點擊儲存格 **A1**，複製並貼上以下表格內容（貼上後會自動分為四欄）：
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

### 步驟 2：設定 Google Apps Script (GAS)
1. 在試算表上方選單中，點擊 **「擴充功能」 > 「Apps Script」**。
2. 這會開啟 Google Apps Script 瀏覽器編輯器。
3. 將編輯器中預設的 `function myFunction() {}` 全部刪除。
4. **完整複製**以下程式碼，貼入編輯器中：

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

## 🎨 第二階段：使用 Google AI Studio 生成前端網頁

現在我們有了運作中的後端 API，接著我們要使用 Google AI Studio 發送 Prompt 來生成漂亮的 React 前端系統。

### 步驟 1：開啟 Google AI Studio
前往 [Google AI Studio](https://aistudio.google.com/)，準備開始對話。

### 步驟 2：修改並送出 Prompt
請複製下方完整的提示詞 (Prompt)，**請務必把 `[請填入你的 GAS 網址]` 替換成您在第一階段步驟 3 所獲得的網頁應用程式網址**，然後發送給 AI：

**👉 請複製以下內容貼給 AI：**

```text
請幫我建立一個精美的「辦公室飲料訂購系統」前端網頁。
技術棧使用：Vite + React + TypeScript + Tailwind CSS。

我已經建立好 Google Apps Script 的 API 後端，網址如下：
[請填入你的 GAS 網址]

此 API 規格與運作邏輯如下：
1. 這個 API 支援每日分頁功能。當載入時發送 GET 請求，後端會自動定位今天日期（如 2026-05-24）的工作表，並回傳包含菜單 (menu) 與今天訂單 (orders) 的 JSON 資料：
   - menu 陣列中每個物件格式為：{ "name": "飲料名稱", "price": 35, "category": "原味茶類", "description": "選用新鮮茉莉花..." }
   - orders 陣列中每個物件格式為：{ "orderId": "uuid-string", "timestamp": "...", "name": "訂購人", "drink": "飲料名稱", "sugar": "半糖", "ice": "少冰", "quantity": 2, "totalPrice": 70 }
   - 如果今天是當天第一筆訂購（試算表中尚未有今日日期的分頁），API 會自動回傳 orders 為空陣列 []。

2. POST 請求：傳送 JSON 物件，且支援 3 種 action：
   - 新增：{"action": "create", "data": {"name": "王小明", "drink": "茉莉綠茶", "sugar": "半糖", "ice": "少冰", "quantity": 2, "totalPrice": 70}}
     (當天第一筆新增時，後端會自動動態建立以今日日期命名的工作表並寫入表頭)
   - 修改：{"action": "update", "data": {"orderId": "uuid-string", "name": "王小明", "drink": "珍珠奶茶", "sugar": "微糖", "ice": "去冰", "quantity": 1, "totalPrice": 55}}
   - 刪除：{"action": "delete", "data": {"orderId": "uuid-string"}}

請幫我產生完整的專案代碼，包含以下 4 個檔案：
1. src/types.ts：定義 Drink 和 Order 的 TypeScript 型別（請與上述規格一致）。
2. src/components/OrderForm.tsx：精美的飲料填單與修改表單。
   - 欄位包含：訂購人、選擇飲料（附帶單價與備註描述展示）、甜度（提供：正常糖、七分糖、半糖、微糖、無糖 的按鈕或下拉選單）、冰塊（提供：正常冰、少冰、微冰、去冰、溫熱 的按鈕或下拉選單）、數量（可增減按鈕）。
   - 送出時需自動計算總金額，並呼叫 POST API（新增 action: "create"；若在編輯狀態則為 action: "update"）。
3. src/components/OrderList.tsx：精美的現有訂單列表。
   - 顯示今天所有已訂購的項目、甜度冰塊、數量與總金額。
   - 提供「編輯訂單」與「刪除訂單」按鈕，點擊編輯時能將資料填回 OrderForm；點擊刪除時呼叫 POST API（action: "delete"）。
4. src/App.tsx：整合上述元件，有精緻的標題列（以大氣的漸層色與 icon 裝飾，並副標題說明「今日點單統計」），並在頁面載入時自動 GET 獲取最新資料。

請在設計上追求極簡優雅的現代風格（例如使用卡片式佈局、細緻的陰影、平滑的 transition 動畫、柔和的 HSL 漸層配色）。請直接給我這 4 個檔案的完整程式碼，並將 API 網址寫死在代碼中。
```

---

### 步驟 3：在本地運行與測試前端專案
當 AI 為您生成這 4 個檔案的程式碼後，請依照以下指令在您的電腦上啟動專案：

1. **初始化專案**：
   開啟您的終端機 (Terminal)，切換到您的工作資料夾，執行以下指令建立全新的 Vite 專案：
   ```bash
   # 1. 建立 Vite + React + TypeScript 專案
   npm create vite@latest drink-order-app -- --template react-ts
   
   # 2. 進入專案資料夾
   cd drink-order-app
   
   # 3. 安裝相依套件與 Tailwind CSS (用於快速美化 UI)
   npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **配置 Tailwind CSS**：
   - 開啟專案中的 `tailwind.config.js`，將內容修改為：
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
   - 開啟 `src/index.css`，將原本內容清空，並貼上：
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

3. **貼上代碼**：
   - 在 `src/` 目錄下新增 `types.ts`，並將 AI 生成的 `types.ts` 代碼貼入。
   - 在 `src/` 目錄下建立一個 `components` 資料夾，並在裡面分別新增 `OrderForm.tsx` 與 `OrderList.tsx`，將 AI 的元件代碼貼入。
   - 開啟 `src/App.tsx`，將其內容清空，並貼入 AI 的 `App.tsx` 代碼。

4. **啟動專案**：
   在終端機中執行：
   ```bash
   npm run dev
   ```
   打開瀏覽器存取終端機顯示的網址（通常是 `http://localhost:5173`），您的全端「辦公室飲料訂購系統」就完美誕生了！🎉
