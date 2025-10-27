import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import FetchError from "../components/common/ErrorFetch";
import type { Anime as HomeAnime } from "../components/home/HomeCard";
import HomeCard from "../components/home/HomeCard";
import ShimmerCard from "../components/common/ShimmerCard";

type SeasonType = "now" | "upcoming" | "custom";
type SeasonName = "winter" | "spring" | "summer" | "fall";

export default function SeasonPage() {
  const [season, setSeason] = useState<SeasonType>("now");
  const [anime, setAnime] = useState<HomeAnime[]>([]);
  const [filteredAnime, setFilteredAnime] = useState<HomeAnime[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [year, setYear] = useState<number>(2025);
  const [seasonName, setSeasonName] = useState<SeasonName>("fall");

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setLoading(true);
    setError(null);

    let url = "https://api.jikan.moe/v4/seasons/now";
    if (season === "upcoming") url = "https://api.jikan.moe/v4/seasons/upcoming";
    if (season === "custom") url = `https://api.jikan.moe/v4/seasons/${year}/${seasonName}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data season!");
        return res.json();
      })
      .then((data) => {
        const formatted: HomeAnime[] = data.data.map((item: any) => ({
          mal_id: item.mal_id,
          title: item.title,
          images: {
            jpg: {
              image_url:
                item.images.webp?.image_url || item.images.jpg.image_url,
            },
          },
          score: item.score,
          episodes: item.episodes,
          type: item.type,
          genres: item.genres,
        }));
        setAnime(formatted);
        setFilteredAnime(formatted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setTimeout(() => setLoading(false), 700));
  }, [season, year, seasonName]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredAnime(anime);
    } else {
      const q = search.toLowerCase();
      setFilteredAnime(
        anime.filter((a) => a.title.toLowerCase().includes(q))
      );
    }
  }, [search, anime]);

  if (error)
    return <FetchError message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 md:px-16 py-9 mt-14">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-green-300 to-emerald-700 bg-clip-text text-transparent py-1">
          Musim Anime
        </h1>
        <div className="w-22 h-1 bg-yellow-400/80 mx-auto rounded-full mt-1 mb-4"></div>
        <p className="text-zinc-400 text-sm">{today}</p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-7">
        <div className="relative w-50 sm:w-76">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input
            type="text"
            placeholder="Cari anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-full pl-10 pr-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-zinc-400"
          />
        </div>
      </div>

      {/* Tombol Season Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-5 sm:mb-8">
        {(["now", "upcoming", "custom"] as SeasonType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSeason(type)}
            className={`px-5 py-2.5 rounded-lg font-medium text-sm sm:text-base border transition-all duration-200
              ${
                season === type
                  ? "bg-gradient-to-br from-green-400 to-emerald-600 border-emerald-600 text-white scale-[1.05]"
                  : "bg-zinc-800/70 border-zinc-700 text-zinc-300 hover:text-green-400 hover:border-green-500"
              }`}
          >
            {type === "now" && "Sedang Tayang"}
            {type === "upcoming" && "Akan Datang"}
            {type === "custom" && "Musim Tertentu"}
          </button>
        ))}
      </div>

      {/* Filter Musim */}
      {season === "custom" && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Array.from({ length: 10 }, (_, i) => 2025 - i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={seasonName}
            onChange={(e) => setSeasonName(e.target.value as SeasonName)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
          </select>
        </div>
      )}

      {/* Shimmer Loading */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      )}

      {/* Anime List */}
      {!loading && !error && (
        <>
          {filteredAnime.length === 0 ? (
            <p className="text-center text-zinc-400 mt-20">Anime tidak ditemukan.</p>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {filteredAnime.map((item) => (
                <HomeCard key={item.mal_id} item={item} />
              ))}
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
