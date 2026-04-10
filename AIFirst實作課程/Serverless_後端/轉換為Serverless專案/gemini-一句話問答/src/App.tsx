import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API 金鑰未設定，請檢查 AI Studio 設定。");
      }

      const ai = new GoogleGenAI({ apiKey });
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setResponse(result.text || "AI 沒有回傳內容。");
    } catch (err: any) {
      console.error(err);
      setError("呼叫 Gemini 失敗，請確認網路連線或 API 設定。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">
            Gemini 一句話問答
          </h1>
          <p className="text-slate-500 text-lg">
            輸入任何問題，讓 AI 為你解答
          </p>
        </header>

        <main className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-8 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="在這裡輸入你的問題..."
                className="w-full min-h-[160px] p-5 text-lg text-slate-800 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 resize-none placeholder:text-slate-400"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-200 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>處理中...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>送出提問</span>
                </>
              )}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600"
              >
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-slate-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="font-semibold text-slate-900">Gemini 的回覆</h2>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-12 text-center text-slate-400 text-sm">
          使用 Google Gemini 3.0 Flash 模型驅動
        </footer>
      </motion.div>
    </div>
  );
}
