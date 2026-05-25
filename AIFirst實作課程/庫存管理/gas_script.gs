/**
 * 庫存管理系統 - Google Apps Script 後端 API (密碼驗證升級版)
 *
 * 支援「Inventory list」工作表的完整 CRUD 庫存管理與安全密碼驗證。
 * 1. GET 請求：校驗密碼後，撈取「Inventory list」中的所有庫存商品並以 JSON 格式回傳。
 * 2. POST 請求：校驗密碼後，支援新增 (create)、修改 (update)、刪除 (delete) 庫存商品。
 */

// ==========================================
// 核心設定：API 安全驗證密碼（可自由修改此值）
// ==========================================
const ADMIN_PASSWORD = "admin"; 

const SHEET_NAME = "Inventory list";

// 1. 處理 GET 請求：校驗密碼並撈取所有庫存資料
function doGet(e) {
  try {
    // 🔐 密碼驗證邏輯
    const inputPassword = e && e.parameter && e.parameter.password;
    if (inputPassword !== ADMIN_PASSWORD) {
      return createJsonResponse({ status: "error", message: "密碼驗證失敗！無權讀取庫存資料。請在前端設定中輸入正確密碼。" });
    }

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

// 2. 處理 POST 請求：校驗密碼並處理新增、修改與刪除庫存商品
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("無效的請求資料");
    }

    const payload = JSON.parse(e.postData.contents);
    const inputPassword = payload.password;

    // 🔐 密碼驗證邏輯
    if (inputPassword !== ADMIN_PASSWORD) {
      return createJsonResponse({ status: "error", message: "密碼驗證失敗！無權修改資料庫，請檢查您的密碼設定。" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error(`找不到名稱為 "${SHEET_NAME}" 的工作表，請先執行一次 GET 請求初始化。`);
    }

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
 * 輔助函式：建立 JSON 回傳格式並設定 CORS 標頭
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
                       .setMimeType(ContentService.MimeType.JSON);
}
