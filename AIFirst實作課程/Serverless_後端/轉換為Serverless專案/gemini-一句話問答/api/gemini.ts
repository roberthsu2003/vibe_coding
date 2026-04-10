import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Vercel Serverless Function - Gemini API Proxy
 *
 * 這個函式扮演「代理伺服器」的角色：
 * - 前端只需呼叫 /api/gemini，完全不需要知道 GEMINI_API_KEY
 * - API Key 儲存在 Vercel 的環境變數中，只有這個伺服器端函式可以讀取
 * - 函式接收前端傳來的 prompt，轉發給 Gemini API，再將結果回傳給前端
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允許 POST 方法
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // 讀取伺服器端環境變數（前端無法存取）
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "伺服器未設定 GEMINI_API_KEY" });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "缺少 prompt 參數" });
  }

  try {
    // 在伺服器端安全地呼叫 Gemini API
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!geminiRes.ok) {
      const errData = await geminiRes.json();
      return res.status(geminiRes.status).json({ error: errData });
    }

    const data = await geminiRes.json();

    // 取出 Gemini 回覆的文字內容
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "AI 沒有回傳內容。";

    return res.status(200).json({ text });
  } catch (err) {
    console.error("[Gemini API Error]", err);
    return res.status(500).json({ error: "呼叫 Gemini API 時發生錯誤" });
  }
}
