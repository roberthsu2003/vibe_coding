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