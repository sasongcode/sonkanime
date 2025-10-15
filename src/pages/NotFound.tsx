import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-gradient-to-br text-sm from-zinc-900 via-zinc-800 to-zinc-900 min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      {/* Icon */}
      <AlertCircle className="text-red-600 w-16 h-16 animate-bounce" />

      {/* 404 dengan efek glow */}
      <h1 className="text-8xl md:text-9xl font-extrabold text-red-600 mb-6 relative underline underline-offset-7 decoration-red-500/80 decoration-4">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Upss!! Halaman Tidak Ditemukan.
      </h2>

      <p className="text-gray-300 mb-8 max-w-md">
        Maaf, halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.  
        Gunakan tombol di bawah untuk kembali ke beranda.
      </p>

      <Link
        to="/"
        className="relative inline-block px-6 py-3 font-semibold text-white rounded-lg bg-red-600 hover:bg-red-700 overflow-hidden group shadow-lg hover:scale-105 transition-transform"
      >
        <span className="relative">Kembali ke Beranda</span>
      </Link>
    </div>
  );
}