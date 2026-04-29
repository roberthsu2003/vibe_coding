/**
 * 辦公室飲料訂購系統 - GAS 後端範例
 * 功能：
 * 1. doGet: 回傳 Menu 分頁的菜單資料 (JSON)
 * 2. doPost: 接收前端傳來的 Order 並寫入 Orders 分頁
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

    // 依照欄位順序排列：時間戳記, 訂購人, 飲料名稱, 甜度, 冰塊, 數量, 總金額
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

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "訂單已成功送出！" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
