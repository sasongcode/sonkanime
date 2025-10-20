import { useEffect, useState } from "react";

export default function Loading() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-white space-y-6 transition-all duration-700 ${
        fadeOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Loader Dots */}
      <div className="flex space-x-3">
        <span className="w-4 h-4 bg-green-400 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
        <span className="w-4 h-4 bg-green-400 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
      </div>

      {/* Text Loading */}
      <p className="text-gray-300 text-xl font-semibold tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
}
