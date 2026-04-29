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
