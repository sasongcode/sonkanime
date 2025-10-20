import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ScrollToTopButton from "../../components/common/ScrollToTop";
import AnimeCard from "../../components/anime/AnimeCard";
import GenreDropdown from "../../components/anime/GenreDropdown";
import Pagination from "../../components/common/Pagination";
import Loading from "../../components/common/Loading";
import FetchError from "../../components/common/ErrorFetch";
import Toast from "../../components/Toast";

interface Genre {
  mal_id: number;
  name: string;
}

interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  genres: Genre[];
}

export default function AnimeList() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<Anime[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "danger";
  } | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const query = searchParams.get("q") || "";
  const genreParam = searchParams.get("genre");
  const selectedGenre = genreParam ? Number(genreParam) : null;

  const [search, setSearch] = useState(query);

  // Helper untuk update params
  const updateParams = (newParams: Record<string, string>) => {
    setSearchParams({
      page: "1",
      q: newParams.q ?? query,
      genre: newParams.genre ?? (selectedGenre?.toString() || ""),
    });
  };

  // Fetch daftar anime
  useEffect(() => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const delayDebounce = setTimeout(() => {
      const genreQuery = selectedGenre ? `&genres=${selectedGenre}` : "";
      const url = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=24${genreQuery}`;

      fetch(url, { signal: controller.signal })
        .then((res) => {
          if (res.status === 429)
            throw new Error("⚠️ Terlalu banyak request! Mohon coba lagi...");
          if (!res.ok) throw new Error("⚠️ Gagal mengambil data dari server.");
          return res.json();
        })
        .then((data) => {
          setAnime(data?.data || []);
          setHasNextPage(data?.pagination?.has_next_page ?? false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setAnime([]);
            setError(err.message);
          }
        })
        .finally(() => setLoading(false));
    }, 600);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [page, query, selectedGenre]);

  // Fetch daftar genre
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/genres/anime")
      .then((res) => res.json())
      .then((data) => setGenres(data?.data || []))
      .catch(() => setGenres([]));
  }, []);

  // Ambil favorit dari localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  // Toggle favorit
  const toggleFavorite = (item: Anime) => {
    const exists = favorites.some((fav) => fav.mal_id === item.mal_id);
    let updated: Anime[];
    if (exists) {
      updated = favorites.filter((fav) => fav.mal_id !== item.mal_id);
      setToast({
        message: `❌ ${item.title} dihapus dari Favorit!`,
        type: "danger",
      });
    } else {
      updated = [...favorites, item];
      setToast({
        message: `✅ ${item.title} ditambahkan ke Favorit!`,
        type: "success",
      });
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    setTimeout(() => setToast(null), 2000);
  };

  // Jika error tampilkan full screen error
  if (error)
    return (
      <FetchError message={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Full screen loading overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-zinc-900 transition-opacity duration-700 z-50 ${
          loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Loading />
      </div>

      {/* Konten utama */}
      <div
        className={`flex-1 transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <div className="px-4 md:px-16 py-24">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-green-300 to-emerald-700 bg-clip-text text-transparent text-center mb-2">
            Daftar Anime
          </h1>
          <div className="w-24 h-1 bg-yellow-400/80 mx-auto rounded-full shadow-lg shadow-green-500/40 mb-6"></div>

          {/* Search + Genre Dropdown */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
            {/* Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateParams({ q: search, genre: "" });
              }}
            >
              <div className="relative w-40 md:w-56">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari anime..."
                  className="w-full pl-9 pr-3 py-2 text-xs md:text-sm font-medium border border-zinc-600 rounded-full shadow-sm bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </form>

            {/* Genre Dropdown */}
            <GenreDropdown
              genres={genres}
              selectedGenre={selectedGenre}
              onSelect={(id) => {
                setSearch("");
                updateParams({ q: "", genre: id ? id.toString() : "" });
              }}
            />
          </div>

          {/* Grid daftar anime */}
          {anime.length === 0 ? (
            <p className="text-center text-gray-400">Anime tidak ditemukan.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-5">
              {anime.map((item) => {
                const isFavorite = favorites.some(
                  (fav) => fav.mal_id === item.mal_id
                );
                return (
                  <AnimeCard
                    key={item.mal_id}
                    item={item}
                    page={page}
                    query={query}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                  />
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            page={page}
            hasNextPage={hasNextPage}
            onPageChange={(newPage) => {
              setSearchParams({
                page: String(newPage),
                q: query,
                genre: selectedGenre?.toString() || "",
              });
            }}
          />

          <ScrollToTopButton />
        </div>
      </div>
    </div>
  );
}
