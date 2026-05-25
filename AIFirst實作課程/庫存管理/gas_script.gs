/**
 * 庫存管理系統 - Google Apps Script 後端 API
 *
 * 支援「Inventory list」工作表的完整 CRUD 庫存管理。
 * 1. GET 請求：撈取「Inventory list」工作表中的所有庫存商品，並以 JSON 格式回傳。（可用於瀏覽器網頁直接驗證）
 * 2. POST 請求：支援新增 (create)、修改 (update)、刪除 (delete) 庫存商品。（可用於 curl 指令直接驗證）
 */

const SHEET_NAME = "Inventory list";

// 1. 處理 GET 請求：回傳所有庫存資料 (可直接在瀏覽器貼上網址驗證)
function doGet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // 如果工作表不存在，自動初始化一個並建立標題
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        "需要再訂購", "庫存 ID", "名稱", "描述", "單價", 
        "庫存數量", "庫存價值", "再訂貨點", "再訂貨時間 (天)", "再訂貨數量", "是否停產"
      ];
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight("bold")
           .setBackground("#f0f5ff") // 淺藍底色
           .setHorizontalAlignment("center");
    }

    const data = sheet.getDataRange().getValues();
    let inventory = [];

    if (data.length > 1) {
      // 排除第一列標題
      inventory = data.slice(1).filter(row => {
        // 過濾掉完全空白的列（以 庫存 ID 或 名稱 是否存在為準）
        return row[1] && row[1].toString().trim() !== "";
      }).map(row => {
        const price = parseFloat(row[4]) || 0;
        const quantity = parseFloat(row[5]) || 0;
        const reorderPoint = parseFloat(row[7]) || 0;
        
        // 安全轉換布林值
        const discontinued = row[10] === true || row[10] === "TRUE" || row[10] === "true" || row[10] === "是";
        
        return {
          needReorder: quantity <= reorderPoint, // 動態計算
          id: row[1] ? row[1].toString().trim() : "",
          name: row[2] ? row[2].toString().trim() : "",
          description: row[3] ? row[3].toString().trim() : "",
          price: price,
          quantity: quantity,
          value: price * quantity, // 動態計算
          reorderPoint: reorderPoint,
          reorderTime: parseFloat(row[8]) || 0,
          reorderQty: parseFloat(row[9]) || 0,
          discontinued: discontinued
        };
      });
    }

    return createJsonResponse({ status: "success", data: inventory });
  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

// 2. 處理 POST 請求：處理新增、修改與刪除庫存商品 (可用於 curl 測試)
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`找不到名稱為 "${SHEET_NAME}" 的工作表，請先執行一次 GET 請求初始化。`);
    }

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("無效的請求資料");
    }

    const payload = JSON.parse(e.postData.contents);
    const action = payload.action; // "create", "update", "delete"
    const data = payload.data;

    const orderData = sheet.getDataRange().getValues();

    // ─── [新增庫存 (Create)] ───
    if (action === "create") {
      const nextId = getNextInventoryId(sheet);
      
      const price = parseFloat(data.price) || 0;
      const quantity = parseFloat(data.quantity) || 0;
      const reorderPoint = parseFloat(data.reorderPoint) || 0;
      const value = price * quantity;
      const needReorder = quantity <= reorderPoint;
      
      // 是否停產
      const discontinued = data.discontinued === true || data.discontinued === "true" || data.discontinued === "是";

      // 欄位順序：
      // 1.需要再訂購, 2.庫存 ID, 3.名稱, 4.描述, 5.單價, 6.庫存數量, 7.庫存價值, 8.再訂貨點, 9.再訂貨時間 (天), 10.再訂貨數量, 11.是否停產
      const newRow = [
        needReorder,
        nextId,
        data.name || "新商品",
        data.description || "",
        price,
        quantity,
        value,
        reorderPoint,
        parseFloat(data.reorderTime) || 0,
        parseFloat(data.reorderQty) || 0,
        discontinued
      ];

      sheet.appendRow(newRow);
      return createJsonResponse({ status: "success", message: `庫存商品 ${nextId} 已成功新增！`, id: nextId });
    }

    // ─── [修改庫存 (Update)] ───
    if (action === "update") {
      if (!data.id) {
        throw new Error("修改庫存商品時缺少 'id' 參數");
      }

      const itemId = data.id.toString().trim();
      for (let i = 1; i < orderData.length; i++) {
        if (orderData[i][1] && orderData[i][1].toString().trim() === itemId) {
          const price = parseFloat(data.price) || 0;
          const quantity = parseFloat(data.quantity) || 0;
          const reorderPoint = parseFloat(data.reorderPoint) || 0;
          const value = price * quantity;
          const needReorder = quantity <= reorderPoint;
          const discontinued = data.discontinued === true || data.discontinued === "true" || data.discontinued === "是";

          // 更新對應行 (i + 1 代表 Sheet 中的 1-indexed 行數)
          sheet.getRange(i + 1, 1, 1, 11).setValues([[
            needReorder,
            itemId,
            data.name || "",
            data.description || "",
            price,
            quantity,
            value,
            reorderPoint,
            parseFloat(data.reorderTime) || 0,
            parseFloat(data.reorderQty) || 0,
            discontinued
          ]]);

          return createJsonResponse({ status: "success", message: `商品 ${itemId} 更新成功！` });
        }
      }
      throw new Error(`找不到庫存 ID 為 "${itemId}" 的商品`);
    }

    // ─── [刪除庫存 (Delete)] ───
    if (action === "delete") {
      if (!data.id) {
        throw new Error("刪除庫存商品時缺少 'id' 參數");
      }

      const itemId = data.id.toString().trim();
      for (let i = 1; i < orderData.length; i++) {
        if (orderData[i][1] && orderData[i][1].toString().trim() === itemId) {
          sheet.deleteRow(i + 1); // 刪除對應的列
          return createJsonResponse({ status: "success", message: `商品 ${itemId} 刪除成功！` });
        }
      }
      throw new Error(`找不到庫存 ID 為 "${itemId}" 的商品`);
    }

    throw new Error("未知的操作 (action 必須為 create, update 或 delete)");

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

/**
 * 輔助函式：自動獲取下一個遞增的庫存 ID (例如 IN0004)
 */
function getNextInventoryId(sheet) {
  const data = sheet.getDataRange().getValues();
  let maxIdNum = 0;

  for (let i = 1; i < data.length; i++) {
    const idCell = data[i][1];
    if (idCell) {
      const match = idCell.toString().match(/^IN(\d+)$/i);
      if (match) {
        const idNum = parseInt(match[1]);
        if (idNum > maxIdNum) {
          maxIdNum = idNum;
        }
      }
    }
  }

  const nextIdNum = maxIdNum + 1;
  return "IN" + nextIdNum.toString().padStart(4, "0");
}

/**
 * 輔助函式：建立 JSON 回傳格式
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
                       .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 測試用函式 (可以直接在 GAS 編輯器中執行，以驗證下一筆 ID 計算)
 */
function testGetNextId() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (sheet) {
    const nextId = getNextInventoryId(sheet);
    Logger.log("下一筆產生的庫存 ID 為: " + nextId);
  } else {
    Logger.log("找不到庫存工作表，請先建立或上傳試算表。");
  }
}
