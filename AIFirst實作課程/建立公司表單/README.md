# 建立公司表單：辦公室飲料訂購系統

本單元將帶領學生完成一個完整的全端應用。我們將手動設定 Google Sheets 作為資料庫，並使用 Google Apps Script (GAS) 作為 API 後端。接著，我們將學習如何使用 **Google AI Studio**，透過精確的 Prompt 讓 AI 自動生成前端網頁代碼 (React + Vite + TypeScript)。

---

## 第一階段：後端資料庫設定 (詳細圖文步驟)

因為這部分需要正確的權限設定，請初學者務必一步步跟著做！

### 步驟 1：建立 Google 試算表 (Google Sheets)
1. 前往 Google 雲端硬碟，新增一個「Google 試算表」，命名為「辦公室飲料訂購系統」。
2. **建立菜單分頁 (`Menu`)**：
   - 將下方第一個工作表重新命名為 `Menu` (注意大小寫)。
   - 點擊儲存格 **A1**，直接**複製並貼上**下方這個區塊的內容（貼上後會自動分為三欄）：
     ```text
     品項名稱	類別	價格
     珍珠奶茶	奶茶	60
     錫蘭紅茶	純茶	35
     冰淇淋紅茶	特調	50
     ```
3. **建立訂單分頁 (`Orders`)**：
   - 點擊左下角「+」新增一個工作表，命名為 `Orders` (注意大小寫)。
   - 點擊儲存格 **A1**，直接**複製並貼上**下方這個區塊的內容作為標題：
     ```text
     時間戳記	訂購人	飲料名稱	甜度	冰塊	數量	總金額
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

// 1. 處理 GET 請求：回傳菜單
function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Menu");
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);

  const menu = rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify(menu))
    .setMimeType(ContentService.MimeType.JSON);
}

// 2. 處理 POST 請求：寫入訂單
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Orders");
    const params = JSON.parse(e.postData.contents);

    // 依照欄位順序排列
    const newRow = [
      new Date(),
      params.name,
      params.drink,
      params.sugar,
      params.ice,
      params.quantity,
      params.totalPrice
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "訂單送出成功" }))
      .setMimeType(ContentService.MimeType.JSON);
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

---

## 第二階段：使用 Google AI Studio 生成前端網頁

現在我們有了後端 API，接著我們要請 AI 幫我們寫 React 前端程式碼。

### 步驟 1：開啟 Google AI Studio
前往 [Google AI Studio](https://aistudio.google.com/)，準備開始對話。

### 步驟 2：貼上 Prompt 讓 AI 寫程式
請將以下提示詞 (Prompt) 完整複製。**請記得把 `[請填入你的 GAS 網址]` 替換成你剛剛在步驟 3 複製的網址**，然後發送給 AI：

> **請完整複製以下內容貼給 AI：**
> 
> 「我需要建立一個辦公室飲料訂購系統的前端網頁。請使用 Vite + React + TypeScript + Tailwind CSS 的技術棧。
> 
> 我已經有一個 Google Apps Script 的 API 端點：
> `[請填入你的 GAS 網址]`
> 
> 這個 API 的規格如下：
> 1. 發送 GET 請求時，會回傳 JSON 陣列，格式為：`[{"品項名稱": "珍珠奶茶", "類別": "奶茶", "價格": 60}]`
> 2. 發送 POST 請求時，需要傳送 JSON 物件，格式為：`{"name": "王小明", "drink": "珍珠奶茶", "sugar": "半糖", "ice": "少冰", "quantity": 1, "totalPrice": 60}`
> 
> 請幫我產生完整的專案代碼，包含以下三個檔案：
> 1. `src/types.ts`：定義 `Drink` 和 `Order` 的 TypeScript 型別介面。
> 2. `src/components/OrderForm.tsx`：一個美觀的訂購表單元件，包含姓名(文字輸入)、飲料(下拉選單)、甜度(單選鈕)、冰塊(單選鈕)、數量(數字輸入)。請在元件載入時自動使用 fetch GET 取得菜單，並在選取飲料和數量時自動計算總價。提交表單時將資料 POST 到 API。
> 3. `src/App.tsx`：引入並在畫面中央顯示該表單元件。
> 
> 請直接給我這三個檔案的完整程式碼，並請直接將上述的 API 網址寫進 fetch 的 URL 中。」

### 步驟 3：整合程式碼
當 AI 給你程式碼後，你只需要：
1. 在你的電腦上初始化 Vite 專案。
2. 將 AI 提供的 `types.ts`, `OrderForm.tsx`, `App.tsx` 代碼貼入對應的檔案中。
3. 啟動測試伺服器，你的全端飲料訂購系統就大功告成了！
