import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimerProps {
  title: string;
  color: string;
}

export default function Timer({ title, color }: TimerProps) {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    }
  };

  const pauseTimer = () => {
    if (isActive) {
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTime(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);

    const h = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
    const m = minutes.toString().padStart(2, '0');
    const s = seconds.toString().padStart(2, '0');
    const c = centiseconds.toString().padStart(2, '0');

    return { h, m, s, c };
  };

  const { h, m, s, c } = formatTime(time);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 w-full max-w-md"
    >
      <h2 className={`text-2xl font-bold mb-6 ${color}`}>{title}</h2>
      
      <div className="relative flex items-baseline font-mono font-bold text-7xl md:text-8xl tracking-tighter text-gray-900 mb-10 tabular-nums">
        {h && <span className="opacity-40">{h}</span>}
        <span>{m}</span>
        <span className="mx-1 opacity-20">:</span>
        <span>{s}</span>
        <span className="text-3xl ml-2 text-gray-400 w-[1.5ch]">{c}</span>
      </div>

      <div className="flex gap-4 w-full">
        {!isActive ? (
          <button
            onClick={startTimer}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
          >
            <Play size={20} fill="currentColor" />
            開始
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
          >
            <Pause size={20} fill="currentColor" />
            暫停
          </button>
        )}
        
        <button
          onClick={resetTimer}
          className="flex items-center justify-center p-4 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors"
          title="重設"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </motion.div>
  );
}
