# 建立公司表單：辦公室飲料訂購系統

本單元將帶領學生完成一個完整的全端應用。我們將手動設定 Google Sheets 作為資料庫，並使用 Google Apps Script (GAS) 作為 API 後端。接著，我們將學習如何使用 **Google AI Studio**，透過精確的 Prompt 讓 AI 自動生成前端網頁代碼 (React + Vite + TypeScript)。


## 完成網址

https://test1-nine-gray-14.vercel.app/

---

## 第一階段：後端資料庫設定 (詳細圖文步驟)

因為這部分需要正確的權限設定，請初學者務必一步步跟著做！

### 步驟 1：建立 Google 試算表 (Google Sheets)
1. 前往 Google 雲端硬碟，建議先**建立一個專屬的資料夾**（例如：`AIFirst_實作專案`）並點擊進入該資料夾。
2. 在該資料夾內，點擊左上角「新增」>「Google 試算表」，並將左上角的檔案名稱命名為「辦公室飲料訂購系統」。
3. **建立菜單分頁 (`Menu`)**：
   - 將下方第一個工作表重新命名為 `Menu` (注意大小寫)。
   - 點擊儲存格 **A1**，直接**複製並貼上**下方這個區塊的內容（貼上後會自動分為三欄）：
     ```text
     品項名稱	類別	價格
     珍珠奶茶	奶茶	60
     錫蘭紅茶	純茶	35
     冰淇淋紅茶	特調	50
     ```
4. **建立訂單分頁 (`Orders`)**：
   - 點擊左下角「+」新增一個工作表，命名為 `Orders` (注意大小寫)。
   - 點擊儲存格 **A1**，直接**複製並貼上**下方這個區塊的內容作為標題：
     ```text
     訂單編號	時間戳記	訂購人	飲料名稱	甜度	冰塊	數量	總金額
     ```

### 步驟 2：設定 Google Apps Script (GAS)
1. 在試算表上方選單，點擊 **「擴充功能」 > 「Apps Script」**。
2. 這會開啟一個新的腳本編輯器視窗。
3. 將編輯器中原本的 `function myFunction() {}` 刪除。
4. **完全複製**以下程式碼，並貼上到編輯器中：

```javascript
/**
 * 辦公室飲料訂購系統 - GAS 後端 API
 */

// 1. 處理 GET 請求：回傳菜單與現有訂單
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 取得菜單
  const menuSheet = ss.getSheetByName("Menu");
  const menuData = menuSheet.getDataRange().getValues();
  let menu = [];
  if (menuData.length > 1) {
    menu = menuData.slice(1).map(row => ({
      name: row[0],
      category: row[1],
      price: row[2]
    }));
  }

  // 取得訂單
  const orderSheet = ss.getSheetByName("Orders");
  const orderData = orderSheet.getDataRange().getValues();
  let orders = [];
  if (orderData.length > 1) {
    orders = orderData.slice(1).map(row => ({
      orderId: row[0],
      timestamp: row[1],
      name: row[2],
      drink: row[3],
      sugar: row[4],
      ice: row[5],
      quantity: row[6],
      totalPrice: row[7]
    }));
  }

  return ContentService.createTextOutput(JSON.stringify({ menu: menu, orders: orders }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 2. 處理 POST 請求：支援新增、修改、刪除
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Orders");
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action; // "create", "update", "delete"
    const data = payload.data;

    const orderData = sheet.getDataRange().getValues();

    if (action === "create") {
      const orderId = Utilities.getUuid(); // 產生唯一識別碼
      const newRow = [orderId, new Date(), data.name, data.drink, data.sugar, data.ice, data.quantity, data.totalPrice];
      sheet.appendRow(newRow);
      return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "訂單新增成功" })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === "update") {
      for (let i = 1; i < orderData.length; i++) {
        if (orderData[i][0] === data.orderId) { // 找到對應的訂單編號
          // 更新第 3 欄到第 8 欄 (訂購人到總金額)
          sheet.getRange(i + 1, 3, 1, 6).setValues([[data.name, data.drink, data.sugar, data.ice, data.quantity, data.totalPrice]]);
          return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "訂單更新成功" })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      throw new Error("找不到該筆訂單");
    }

    if (action === "delete") {
      for (let i = 1; i < orderData.length; i++) {
        if (orderData[i][0] === data.orderId) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "訂單刪除成功" })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      throw new Error("找不到該筆訂單");
    }

    throw new Error("未知的操作 (action 必須為 create, update 或 delete)");

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. 點擊上方工具列的 **「儲存」** 圖示 (或按 Ctrl+S / Cmd+S)，專案名稱可改為「DrinkOrderAPI」。

### 步驟 3：部署並取得 API 網址 (非常重要！)
這是讓前端網頁能連線到試算表的關鍵步驟。
1. 點擊右上角的藍色按鈕 **「部署」 > 「新增部署作業」**。
2. 點擊左側「選取類型」旁邊的齒輪圖示 ⚙️，勾選 **「網頁應用程式」**。
3. 在右側設定欄位：
   - **說明**：填入 `初次部署`。
   - **執行身分**：選擇 **「我」** (你的 Google 帳號)。
   - **誰可以存取**：**務必選擇「所有人」** (這樣網頁才能跨網域存取)。
4. 點擊 **「部署」**。
5. **授權存取** (初次執行會要求權限)：
   - 點擊「授權存取」並選擇你的帳號。
   - 若出現安全警告，點擊左下角的「進階」>「前往 DrinkOrderAPI (不安全)」。
   - 點擊「允許」。
6. 部署完成後，會出現一串 **「網頁應用程式網址」 (Web App URL)**。
7. **📋 請將這串網址複製並保存下來**，我們馬上就會用到！

> [!WARNING]
> **修改 GAS 程式碼的注意事項**：
> 如果你未來修改了 GAS 的程式碼（例如增加新功能），直接按「儲存」是不會生效的，**必須重新部署**：
> 1. 點擊「部署」>「**管理部署作業**」。
> 2. 點擊右上角的「編輯」（鉛筆圖示）。
> 3. 將「版本」下拉選單改為 **「新版本」**。
> 4. 點擊「部署」。
> 
> ⚠️ **千萬不要**再次點選「新增部署作業」，否則會產生一個全新的網址，你原本放在 React 裡的網址就會失效！

### 步驟 4：測試你的 API (排錯指南)
在請 AI 寫前端程式碼之前，我們必須確保後端 API 是正常運作的！

1. **如何測試？**
   打開一個新的瀏覽器分頁，直接將剛剛複製的 **網頁應用程式網址 (Web App URL)** 貼上並按下 Enter。
2. **正確的結果**：
   你應該會看到畫面上出現類似下方這樣的純文字 JSON 資料：
   `{"menu":[{"品項名稱":"珍珠奶茶","類別":"奶茶","價格":60}...],"orders":[]}`
3. **常見錯誤與解決方式**：
   - ❌ **前端回報「缺少 menu 屬性」或「資料格式不正確」**：
     代表你修改了程式碼或建立表單後**沒有重新部署新版本**。API 還是舊的空殼。請依照上方的警告指示，發佈一個「新版本」。
   - ❌ **畫面上顯示「需要授權」或出現 Google 登入畫面**：
     代表你在部署時，「誰可以存取」沒有設定為「所有人」。請重新部署並更改權限。
   - ❌ **畫面上顯示 Script 錯誤 (例如 TypeError: Cannot read properties of null)**：
     通常是因為你的試算表分頁名稱打錯了。請檢查左下方工作表名稱是否精準為大寫開頭的 `Menu` 和 `Orders`，結尾不能有多餘的空白。

---

## 第二階段：使用 Google AI Studio 生成前端網頁

現在我們有了後端 API，接著我們要請 AI 幫我們寫 React 前端程式碼。

### 步驟 1：開啟 Google AI Studio
前往 [Google AI Studio](https://aistudio.google.com/)，準備開始對話。

### 步驟 2：貼上 Prompt 讓 AI 寫程式
請將以下提示詞 (Prompt) 完整複製。**請記得把 `[請填入你的 GAS 網址]` 替換成你剛剛在步驟 3 複製的網址**，然後發送給 AI：

**請完整複製以下內容貼給 AI：**

```text
我需要建立一個辦公室飲料訂購系統的前端網頁。請使用 Vite + React + TypeScript + Tailwind CSS 的技術棧。

我已經有一個 Google Apps Script 的 API 端點：
[請填入你的 GAS 網址]

這個 API 的規格如下：
1. 發送 GET 請求時，會回傳 JSON 物件，包含菜單與目前訂單，格式為：
   {"menu": [{"name": "珍珠奶茶", "category": "奶茶", "price": 60}], "orders": [{"orderId": "xyz-123", "timestamp": "...", "name": "王小明", "drink": "珍珠奶茶", "sugar": "半糖", "ice": "少冰", "quantity": 1, "totalPrice": 60}]}
2. 發送 POST 請求時，需要傳送 JSON 物件，支援三種 action：
   - 新增：{"action": "create", "data": {"name": "王小明", "drink": "珍珠奶茶", "sugar": "半糖", "ice": "少冰", "quantity": 1, "totalPrice": 60}}
   - 修改：{"action": "update", "data": {"orderId": "xyz-123", "name": "王小明", "drink": "錫蘭紅茶", "sugar": "全糖", "ice": "正常", "quantity": 2, "totalPrice": 70}}
   - 刪除：{"action": "delete", "data": {"orderId": "xyz-123"}}

請幫我產生完整的專案代碼，包含以下四個檔案：
1. src/types.ts：定義 Drink 和 Order 等 TypeScript 型別。
2. src/components/OrderForm.tsx：填寫與提交訂單的表單。送出時自動呼叫 POST API (action: create 或 update)。
3. src/components/OrderList.tsx：顯示目前的訂單列表。每筆訂單旁需有「編輯」和「刪除」按鈕。點擊編輯時可以將資料帶入表單修改；點擊刪除時呼叫 POST API (action: delete)。
4. src/App.tsx：整合上述元件，在載入時 GET 取得資料。

請直接給我這四個檔案的完整程式碼，並把 fetch 的 URL 直接寫死為上述的 API 網址。
```

### 步驟 3：整合程式碼
當 AI 給你程式碼後，你只需要：
1. 在你的電腦上初始化 Vite 專案。
2. 將 AI 提供的 `types.ts`, `OrderForm.tsx`, `App.tsx` 代碼貼入對應的檔案中。
3. 啟動測試伺服器，你的全端飲料訂購系統就大功告成了！
