import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface MangaDetail {
  title: string;
  synopsis: string;
  images: { jpg: { large_image_url: string } };
  score: number;
  chapters: number;
  volumes: number;
  authors: { name: string }[];
  genres: { name: string }[];
  status: string;
}

export default function MangaDetail() {
  const { id } = useParams();
  const [manga, setManga] = useState<MangaDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/manga/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setManga(data.data);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-400 mt-32 animate-pulse">
        Loading manga detail...
      </p>
    );

  if (!manga) return <p className="text-center mt-32 text-red-400">Manga not found</p>;

  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-24 px-6 md:px-20 pb-16">
      <Link
        to="/manga"
        className="text-green-400 underline hover:text-green-300 transition"
      >
        ← Back to Manga List
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <img
          src={manga.images.jpg.large_image_url}
          alt={manga.title}
          className="w-full md:w-72 h-auto rounded-xl shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            {manga.title}
          </h1>
          <p className="text-gray-300 mb-3">{manga.synopsis || "No synopsis available."}</p>
          <p className="text-gray-400 mb-2">⭐ Score: {manga.score ?? "N/A"}</p>
          <p className="text-gray-400 mb-2">
            📖 Chapters: {manga.chapters ?? "?"} | Volumes: {manga.volumes ?? "?"}
          </p>
          <p className="text-gray-400 mb-2">
            🧑‍🎨 Author: {manga.authors?.map((a) => a.name).join(", ") || "-"}
          </p>
          <p className="text-gray-400 mb-2">
            🏷️ Genres: {manga.genres?.map((g) => g.name).join(", ") || "-"}
          </p>
          <p className="text-gray-400">📌 Status: {manga.status}</p>
        </div>
      </div>
    </div>
  );
}
