import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../../../components/Toast";
import Loading from "../../../components/common/Loading";
import { ArrowRight } from "lucide-react";

interface BlogArticle {
  mal_id: number;
  title: string;
  image_url: string;
  synopsis: string;
  date: string;
}

// Komponen shimmer
function ShimmerCard() {
  return (
    <div className="animate-pulse bg-zinc-800/40 rounded-2xl border border-zinc-700 overflow-hidden">
      <div className="h-48 bg-zinc-700/50" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-zinc-700/60 rounded w-3/4"></div>
        <div className="h-3 bg-zinc-700/50 rounded w-1/2"></div>
        <div className="h-3 bg-zinc-700/50 rounded w-full"></div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopAnime = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=20");
        if (!res.ok) throw new Error("Gagal memuat data anime.");
        const data = await res.json();

        const mapped = data.data.map((item: any) => ({
          mal_id: item.mal_id,
          title: item.title,
          image_url: item.images.jpg.large_image_url,
          synopsis: item.synopsis || "No description available.",
          date: new Date().toLocaleDateString(),
        }));
        setArticles(mapped);
      } catch (err: any) {
        setToast(err.message);
      } finally {
        setTimeout(() => setLoading(false), 700);
      }
    };

    fetchTopAnime();
  }, []);

  const highlight = articles[0];
  const sideNews = articles.slice(1, 6);
  const rest = articles.slice(6, 15);

  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Full screen loading overlay */}
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
        className={`flex-1 px-6 md:px-16 pb-20 transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {toast && (
          <Toast message={toast} type="danger" onClose={() => setToast(null)} />
        )}

        {/* Header */}
        <div className="text-center pt-20 mb-14">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-green-300 to-emerald-700 bg-clip-text text-transparent py-1 mt-3 mb-2">
            Blog & News
          </h1>
          <div className="w-24 h-1 bg-yellow-400/80 mx-auto rounded-full shadow-lg shadow-green-500/40 mb-5"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            Baca berita serta update terbaru dari dunia anime favoritmu!
          </p>
        </div>

        {/* Highlight + Side News */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ShimmerCard />
            </div>
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <ShimmerCard key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Highlight utama */}
            {highlight && (
              <div className="group md:col-span-2 bg-zinc-800/40 rounded-2xl overflow-hidden border border-zinc-700 hover:border-green-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] transition duration-300 hover:-translate-y-1">
                <div className="overflow-hidden h-[430px]">
                  <img
                    src={highlight.image_url}
                    alt={highlight.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:blur-[1px] brightness-90"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition">
                    {highlight.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-3">{highlight.date}</p>
                  <p className="text-gray-400 line-clamp-4 mb-4">
                    {highlight.synopsis}
                  </p>
                  <Link
                    to={`/blog/${highlight.mal_id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-br from-green-400 to-emerald-700 hover:from-green-600 hover:to-emerald-800 px-4 py-2 rounded-lg text-sm font-semibold transition"
                  >
                    Baca Selengkapnya
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            )}

            {/* Side list */}
            <div className="flex flex-col gap-4 h-[650px] justify-between">
              {sideNews.map((item) => (
                <div
                  key={item.mal_id}
                  className="group flex gap-4 bg-zinc-800/40 hover:bg-zinc-700/40 rounded-xl border border-zinc-700 hover:border-green-500 transition p-3 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1 mt-2">
                    <div>
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-green-400 transition">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>

                    <Link
                      to={`/blog/${item.mal_id}`}
                      className="w-20 mb-2 text-center text-xs font-semibold border border-white group-hover:border-green-500 group-hover:text-green-500 hover:bg-gradient-to-br hover:from-green-400 to-emerald-700 hover:text-white hover:border-emerald-700 py-2 mt-2 rounded-lg transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Berita lainnya */}
        {!loading && (
          <div className="mt-14">
            <h3 className="text-2xl font-bold mb-6 border-l-4 border-green-500 pl-3">
              Berita Lainnya
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <div
                  key={article.mal_id}
                  className="group bg-zinc-800/40 rounded-xl overflow-hidden border border-zinc-700 hover:border-green-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-48 object-cover transition duration-500 group-hover:scale-110 group-hover:blur-[1px]"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-between h-56">
                    <div>
                      <h4
                        className="font-semibold text-lg mb-1 text-white group-hover:text-green-400 transition line-clamp-2"
                        title={article.title}
                      >
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        {article.date}
                      </p>
                      <p className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                        {article.synopsis}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${article.mal_id}`}
                      className="flex justify-center gap-2 mt-4 text-sm text-center font-semibold bg-gradient-to-br from-green-400 to-emerald-700 hover:from-green-500 hover:to-emerald-800 rounded-md py-2 transition"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
