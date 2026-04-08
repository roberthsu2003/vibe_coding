/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Timer from './components/Timer';
import { Trophy } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-blue-100">
      <header className="py-12 px-6 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-6 border border-gray-100">
          <Trophy className="text-yellow-500 mr-2" size={24} />
          <span className="font-bold tracking-tight text-gray-600 uppercase text-sm">比賽計時系統</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 mb-4">
          班際競賽計時器
        </h1>
        <p className="text-gray-500 max-w-md mx-auto">
          獨立控制兩組計時器，精確紀錄每一秒的精彩瞬間。
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-center">
          <Timer title="甲班 (Class A)" color="text-blue-600" />
          <Timer title="乙班 (Class B)" color="text-rose-600" />
        </div>
      </main>

      <footer className="fixed bottom-8 left-0 right-0 text-center pointer-events-none">
        <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-gray-200 shadow-sm text-xs text-gray-400 font-medium">
          Vite + React + TypeScript
        </div>
      </footer>
    </div>
  );
}
