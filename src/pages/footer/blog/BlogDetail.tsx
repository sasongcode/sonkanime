import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import { ArrowLeft } from "lucide-react";

interface NewsItem {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  forum_url: string;
  images: { jpg: { image_url: string } };
  comments: number;
  excerpt: string;
}

interface AnimeDetail {
  images: { jpg: { large_image_url: string } };
  title: string;
  synopsis: string;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [anime, setAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resNews = await fetch(`https://api.jikan.moe/v4/anime/${id}/news`);
        const dataNews = await resNews.json();
        if (dataNews.data && dataNews.data.length > 0) {
          setNews(dataNews.data[0]);
        }

        const resAnime = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const dataAnime = await resAnime.json();
        if (dataAnime.data) {
          setAnime(dataAnime.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  if (!news || !anime) {
    return (
      <div className="bg-zinc-900 h-screen flex items-center justify-center text-white text-lg">
        <p>Berita untuk anime ini tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 min-h-screen mt-12 text-white px-6 md:px-16 py-20">
      <div className="max-w-5xl mx-auto bg-zinc-800/40 border border-zinc-700/50 p-6 md:p-10 rounded-2xl shadow-lg shadow-black/40 backdrop-blur-sm">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-green-400 border border-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg font-semibold mb-6 transition-all duration-300 hover:scale-95"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 py-1 mb-4 drop-shadow-md">
          {news.title}
        </h1>

        {/* Info Bar */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
          <span>
            ✍️{" "}
            <a
              href={news.author_url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline hover:text-green-400 transition"
            >
              {news.author_username}
            </a>
          </span>
          <span>📅 {new Date(news.date).toLocaleDateString()}</span>
          <span>💬 {news.comments} Comments</span>
        </div>

        {/* Anime Poster */}
        {anime.images?.jpg?.large_image_url && (
          <div className="flex justify-center mb-8">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-72 sm:w-80 md:w-96 h-auto rounded-xl shadow-lg border border-zinc-700 object-cover hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        {/* Anime Title */}
        <h2 className="text-2xl font-bold text-green-500 text-center mb-2">
          {anime.title}
        </h2>
        <p className="text-gray-400 mb-8 max-w-5xl mx-auto leading-relaxed text-left">
          {anime.synopsis || "Tidak ada deskripsi untuk anime ini."}
        </p>

        {/* Article Content */}
        <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-6 md:p-8 leading-relaxed text-gray-300 shadow-inner mb-10">
          <p className="text-base md:text-lg">{news.excerpt}</p>
        </div>

        {/* Buttons */}
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

    </div>
  );
}