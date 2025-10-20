import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

interface Manga {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score: number;
  type: string;
}

export default function MangaList() {
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga?q=${search}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        setManga(data.data);
        setLoading(false);
      });
  }, [search]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-24 px-6 md:px-20 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-green-400 drop-shadow-lg">
          📘 Manga List
        </h1>
        <div className="flex items-center bg-zinc-800 px-3 py-2 rounded-lg">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search manga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 mt-20 animate-pulse">
          Loading manga...
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {manga.map((item) => (
            <Link
              to={`/manga/${item.mal_id}`}
              key={item.mal_id}
              className="group bg-zinc-800/60 border border-zinc-700 rounded-2xl p-3 hover:-translate-y-1 hover:shadow-xl transition"
            >
              <img
                src={item.images.jpg.image_url}
                alt={item.title}
                className="w-full h-60 object-cover rounded-xl mb-3 group-hover:opacity-90 transition"
              />
              <h3 className="font-semibold text-sm text-gray-200 group-hover:text-green-400 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                ⭐ {item.score ?? "N/A"} | {item.type}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
