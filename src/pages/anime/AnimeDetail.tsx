import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import Loading from "../../components/common/Loading";
import Toast from "../../components/Toast"; // 🔹 tambahkan ini

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "danger" } | null>(null); // ✅ untuk notifikasi

  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as { from?: string })?.from;

  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data favorit dari localStorage saat awal
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  // 🔹 Cek apakah anime ini sudah difavoritkan
  useEffect(() => {
    if (anime) {
      setIsFavorite(favorites.some((a) => a.mal_id === anime.mal_id));
    }
  }, [anime, favorites]);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    Promise.all([
      fetch(`https://api.jikan.moe/v4/anime/${id}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setAnime(data.data))
        .catch(() => setAnime(null)),

      fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => setCharacters(data.data || []))
        .catch(() => setCharacters([])),
    ]).finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  // 🔹 Fungsi toggle favorit dengan notifikasi
  const toggleFavorite = () => {
    if (!anime) return;

    let updated: any[];
    if (isFavorite) {
      updated = favorites.filter((a) => a.mal_id !== anime.mal_id);
      setToast({
        message: `❌ ${anime.title} dihapus dari Favorit!`,
        type: "danger",
      });
    } else {
      updated = [...favorites, anime];
      setToast({
        message: `✅ ${anime.title} ditambahkan ke Favorit!`,
        type: "success",
      });
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);

    // 🔹 Hilangkan toast setelah 2 detik
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white overflow-hidden">
      {/* ✅ Fullscreen Loading Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-zinc-900 transition-opacity duration-700 z-50 ${
          loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Loading />
      </div>

      {/* ✅ Komponen Toast (Notifikasi) */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ✅ Konten utama */}
      <div
        className={`flex-1 transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {anime && (
          <div className="max-w-6xl mx-auto px-4 py-20">
            {/* Header Card */}
            <div className="flex flex-col md:flex-row gap-8 bg-zinc-800/80 backdrop-blur-md rounded-xl p-6 mt-4 shadow-lg relative">
              {/* Tombol Kembali */}
              <button
                onClick={() => (from ? navigate(from) : navigate(-1))}
                className="absolute top-4 left-6 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white text-sm rounded-lg font-semibold shadow hover:scale-[0.98] transition"
              >
                <ArrowLeft size={16} />
                Kembali
              </button>

              {/* 🔹 Tombol Favorit */}
              <button
                onClick={toggleFavorite}
                className={`absolute top-4 right-6 flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold shadow transition-all duration-300 hover:scale-105 ${
                  isFavorite
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : "bg-zinc-600 hover:bg-pink-500 text-white"
                }`}
              >
                <Heart
                  size={18}
                  className={`transition-transform duration-300 ${
                    isFavorite ? "fill-current scale-110" : "text-white"
                  }`}
                />
                {isFavorite ? "Hapus dari Favorit" : "Tambah Favorit"}
              </button>

              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="mt-10 w-full md:w-64 lg:w-72 rounded-xl shadow-lg transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between mt-2 md:mt-10">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                    {anime.title}
                  </h1>
                  {anime.title_japanese && (
                    <p className="text-gray-400 italic mb-4">{anime.title_japanese}</p>
                  )}

                  {/* Genre */}
                  <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    {anime.genres?.length ? (
                      anime.genres.map((genre: any) => (
                        <span
                          key={genre.mal_id}
                          className="px-3 py-1 bg-zinc-500 text-white rounded-full shadow"
                        >
                          {genre.name}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 bg-zinc-500 text-white rounded-full shadow">
                        —
                      </span>
                    )}
                  </div>

                  {/* Detail Info */}
                  <div className="grid grid-cols-2 gap-x-16 gap-y-2 mb-6 text-sm">
                    <Info label="Episodes" value={anime.episodes} />
                    <Info label="Duration" value={anime.duration} />
                    <Info label="Rating" value={anime.rating} />
                    <Info label="Members" value={anime.members} />
                    <Info label="Favorites" value={anime.favorites} />
                    <Info label="Popularity" value={anime.popularity} />
                  </div>

                  {/* Producers */}
                  {anime.producers?.length > 0 && (
                    <p className="text-sm mb-2">
                      <span className="font-semibold text-lg text-green-500">Producers: </span>
                      <span className="text-gray-300 font-semibold">
                        {anime.producers.map((prod: any) => prod.name).join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Synopsis */}
            <div className="mt-10 bg-zinc-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg relative">
              <h2 className="text-2xl font-semibold mb-3 text-green-500">Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">
                {anime.synopsis || "No synopsis available."}
              </p>
            </div>

            {/* Characters */}
            {characters.length > 0 && (
              <div className="mt-10 bg-zinc-700/10 backdrop-blur-md rounded-xl p-6 shadow-lg relative">
                <h2 className="text-2xl font-semibold text-green-500 mb-6">
                  Characters & Voice Actors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {characters.slice(0, 12).map((c) => (
                    <div
                      key={c.character.mal_id}
                      className="bg-zinc-700/20 rounded-xl p-4 flex items-center gap-4 shadow-md"
                    >
                      <img
                        src={c.character.images.jpg.image_url}
                        alt={c.character.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-yellow-300">{c.character.name}</p>
                        <p className="text-sm text-gray-300">{c.role}</p>
                        {c.voice_actors?.[0] && (
                          <p className="text-xs mt-1 text-green-400">
                            🎤 {c.voice_actors[0].person.name} ({c.voice_actors[0].language})
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer */}
            {anime.trailer?.embed_url && (
              <div className="mt-10 bg-zinc-800/90 backdrop-blur-md p-6 rounded-xl shadow">
                <h2 className="text-2xl font-semibold mb-5 text-green-500">Trailer</h2>
                <div className="relative w-full pb-[56.25%] h-0">
                  <iframe
                    src={anime.trailer.embed_url}
                    title={`${anime.title} Trailer`}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 🔹 Komponen Info kecil biar rapi
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <span className="font-semibold text-green-500">{label}: </span>
      <span className="text-zinc-300 font-semibold">{value ?? "—"}</span>
    </div>
  );
}
