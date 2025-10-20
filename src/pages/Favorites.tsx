import { useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { Search } from "lucide-react";
import Toast from "../components/Toast";
import AnimeCard from "../components/anime/AnimeCard";
import type { Anime } from "../components/anime/AnimeCard";
import ScrollToTopButton from "../components/common/ScrollToTop";
import Pagination from "../components/common/Pagination";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  
  // Scroll otomatis ke atas setiap kali ganti halaman
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const ITEMS_PER_PAGE = 24;

  const handleToggleFavorite = (anime: Anime) => {
    removeFavorite(anime.mal_id);
    setToast({
      message: `❌ ${anime.title} dihapus dari Favorit!!`,
      type: "danger",
    });
    setTimeout(() => setToast(null), 2000);
  };

  // Filter berdasarkan pencarian
  const filteredFavorites = favorites.filter((anime) =>
    anime.title.toLowerCase().includes(search.toLowerCase())
  );

  // Hitung total halaman
  const totalPages = Math.ceil(filteredFavorites.length / ITEMS_PER_PAGE);

  // Ambil anime sesuai halaman aktif
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentFavorites = filteredFavorites.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (page > totalPages && totalPages > 0) {
    setPage(1);
  }

  return (
    <div className="px-4 md:px-16 py-24 bg-zinc-900 min-h-screen text-white relative">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-green-300 to-emerald-700 bg-clip-text text-transparent text-center mb-2">
        Anime Favorit
      </h1>
      <div className="w-28 h-1 bg-yellow-400/80 mx-auto rounded-full shadow-lg shadow-green-500/40 mb-8"></div>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-60 md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Cari anime..."
            className="w-full pl-9 pr-3 py-2 text-xs md:text-sm font-medium border border-zinc-600 rounded-full shadow-sm bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Grid Anime Favorit */}
      {currentFavorites.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          {search
            ? "Anime favorit tidak ditemukan."
            : "Belum ada anime favorit."}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {currentFavorites.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              item={anime}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          hasNextPage={page < totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      <ScrollToTopButton />
    </div>
  );
}
