import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import { ArrowLeft } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<any | null>(null);
  const [anime, setAnime] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resNews = await fetch(
          `https://api.jikan.moe/v4/anime/${id}/news`
        );
        const dataNews = await resNews.json();
        setNews(dataNews.data[0] || null);

        const resAnime = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const dataAnime = await resAnime.json();
        setAnime(dataAnime.data || null);
      } catch {
        setNews(null);
      } finally {
        setTimeout(() => setLoading(false), 700);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 text-white overflow-hidden">
      {/* Full screen overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-zinc-900 z-50 transition-opacity duration-700 ${
          loading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Loading />
      </div>

      {/* Konten utama */}
      <div
        className={`flex-1 px-6 md:px-16 py-20 mt-12 transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {news && anime ? (
          <div className="max-w-5xl mx-auto bg-zinc-800/40 border border-zinc-700/50 p-6 md:p-10 rounded-2xl shadow-lg shadow-black/40 backdrop-blur-sm">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-green-400 border border-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg font-semibold mb-6 transition-all duration-300 hover:scale-95"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 py-1 mb-4 drop-shadow-md">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
              <span>📅 {new Date(news.date).toLocaleDateString()}</span>
              <span>💬 {news.comments} Comments</span>
            </div>

            {anime.images?.jpg?.large_image_url && (
              <div className="flex justify-center mb-8">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-72 sm:w-80 md:w-96 h-auto rounded-xl shadow-lg border border-zinc-700 object-cover hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            )}

            <h2 className="text-2xl font-bold text-green-500 text-center mb-2">
              {anime.title}
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-left">
              {anime.synopsis || "Tidak ada deskripsi untuk anime ini."}
            </p>

            <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-6 md:p-8 leading-relaxed text-gray-300 shadow-inner mb-10">
              <p className="text-base md:text-lg">{news.excerpt}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={news.url}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-gradient-to-br from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.03] shadow-md"
              >
                🔗 Baca Artikel Lengkap
              </a>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Berita tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
