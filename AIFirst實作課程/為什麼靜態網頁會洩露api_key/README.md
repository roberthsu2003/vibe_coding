# 為什麼靜態網頁會洩露 API Key？

## 問題的根源

當你在前端 JavaScript 中直接寫入 API Key，這份程式碼會**原封不動地傳送到使用者的瀏覽器**。  
無論你的程式碼寫得多複雜，任何人只要打開瀏覽器的開發者工具，都能輕易找到你的 Key。

---

## ❌ 不安全的做法：API Key 直接寫在前端

```javascript
// 這段程式碼會出現在任何人的瀏覽器裡！
const API_KEY = "AIzaSy...你的金鑰...";

fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
  method: "POST",
  body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
});
```

### 如何被發現？只需要 3 個步驟：

1. 按 **F12** 打開開發者工具
2. 點選 **「Network（網路）」** 分頁，重新送出一次請求
3. 點開 API 請求 → 在 **Request URL** 中，你的 Key 就完整出現了

或者更簡單：右鍵 → **「檢視頁面原始碼」**，搜尋 `AIzaSy`，Key 就在那裡。

### 洩露後的代價

| 風險 | 說明 |
|------|------|
| 💸 費用爆炸 | 別人用你的 Key 大量呼叫 API，帳單由你承擔 |
| 🚫 帳號被停用 | Google 偵測到濫用行為，可能直接停用你的帳號 |
| 🕵️ 永久外洩 | Key 一旦出現在公開網頁，爬蟲可能早已收走，刪掉也來不及 |
| 🔓 資料外洩 | 若 Key 有存取資料庫或其他服務的權限，資料也跟著暴露 |

---

## ✅ 安全的做法：用 Vercel Serverless Functions 保護 API Key

![靜態伺服器 vs Vercel Serverless：API Key 安全性的差異](./images/vercel如何保護api_key.png)

核心概念：**前端永遠不碰 API Key**。

```
使用者的瀏覽器
      ↓  只傳送「問題內容」
  你的 Vercel Function（後端）
      ↓  帶著藏好的 API Key
    Gemini API
      ↓  回傳結果
  你的 Vercel Function
      ↓  只傳送「回答內容」
使用者的瀏覽器
```

API Key 存放在 **Vercel 環境變數**中，只有你的伺服器程式碼讀得到，永遠不會出現在前端。

### 前端程式碼（不含 Key）

```javascript
// 前端只呼叫「自己的」後端，不直接呼叫 Gemini
const response = await fetch("/api/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ question: "台灣的首都是哪裡？" })
});
const data = await response.json();
console.log(data.answer);
```

### 後端 Vercel Function（Key 安全藏在這裡）

```javascript
// api/ask.js — 這段程式碼只在伺服器上執行，使用者看不到
export default async function handler(req, res) {
  const { question } = req.body;

  // API Key 從環境變數讀取，不會出現在前端
  const API_KEY = process.env.GEMINI_API_KEY;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: question }] }] })
    }
  );

  const data = await response.json();
  const answer = data.candidates[0].content.parts[0].text;
  res.json({ answer });
}
```

---

## 🧪 實際體驗洩露的感覺

打開下方的示範頁面，輸入一個（測試用）API Key 並送出問題，  
然後打開 DevTools → Network，親眼看看 Key 如何出現在請求裡。

👉 [index.html — API Key 洩露示範](./index.html)

---

## 重點整理

| | 靜態網頁（前端直接呼叫） | Vercel Serverless Function |
|---|---|---|
| API Key 位置 | ❌ 寫在前端 JS，人人看得到 | ✅ 存在伺服器環境變數 |
| 使用者能看到 Key 嗎？ | ❌ 可以（DevTools / 原始碼） | ✅ 不行 |
| 費用風險 | ❌ 高（Key 被盜用） | ✅ 低 |
| 部署難度 | 簡單 | 稍複雜，但值得 |

> **結論：只要涉及 API Key，就必須使用後端來保護它。**
