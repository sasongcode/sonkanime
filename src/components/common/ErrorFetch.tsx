import { AlertTriangle, RefreshCw } from "lucide-react";

interface FetchErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function FetchError({ message, onRetry }: FetchErrorProps) {
  return (
    <div className="flex justify-center items-center min-h-screen px-6 mt-7 bg-zinc-900">
      <div className="flex flex-col items-center gap-4 max-w-xl w-full bg-gradient-to-r from-red-500/20 to-red-700/10 border border-red-500/40 text-red-300 px-6 py-8 rounded-2xl shadow-xl backdrop-blur-sm animate-fadeIn">
        {/* Icon */}
        <AlertTriangle size={48} className="text-red-500" />

        {/* Title */}
        <h2 className="text-lg md:text-xl font-bold text-red-500">
          Terjadi Kesalahan
        </h2>

        {/* Message */}
        <p className="text-center text-sm md:text-base text-red-300/90">
          {message}
        </p>

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 flex font-semibold items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 px-4 py-2 rounded-lg transition"
          >
            <RefreshCw size={18} /> Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}