import { Link } from "react-router-dom";
import { Heart, Play, Star } from "lucide-react";

interface Genre {
  mal_id: number;
  name: string;
}

export interface Anime {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
  score?: number;
  episodes?: number;
  type?: string;
  genres: Genre[];
}

interface Props {
  item: Anime;
  page?: number;
  query?: string;
  isFavorite?: boolean;
  onToggleFavorite: (anime: Anime) => void;
}

export default function AnimeCard({ item, page, query, isFavorite = false, onToggleFavorite }: Props) {
  return (
    <div className="group flex flex-col bg-zinc-900 rounded-lg overflow-hidden shadow-sm hover:shadow-green-500/20 transition-transform duration-300 hover:-translate-y-1 w-full h-full">
      <div className="relative aspect-[2/3] bg-zinc-800 overflow-hidden">
        <Link to={`/anime/${item.mal_id}?page=${page || 1}&q=${query || ""}`} className="block w-full h-full">
          <img
            src={item.images.jpg.image_url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-30 transition"></div>
        </Link>

        <button
          onClick={() => onToggleFavorite(item)}
          className={`absolute top-2 right-2 p-2 rounded-full shadow transition ${
            isFavorite
              ? "bg-pink-500 hover:bg-pink-600 scale-110"
              : "bg-zinc-800/70 hover:bg-pink-500 hover:scale-110"
          }`}
        >
          <Heart size={16} className={isFavorite ? "text-white fill-white" : "text-white"} />
        </button>
      </div>

      <div className="flex flex-col flex-1 p-2">
        <Link to={`/anime/${item.mal_id}?page=${page || 1}&q=${query || ""}`}>
          <h2 className="text-sm font-medium mb-1 text-gray-200 line-clamp-2 group-hover:text-green-400 hover:underline transition-colors">
            {item.title}
          </h2>
        </Link>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-2">
          <div className="flex items-center gap-1 text-[10px]">
            <div className="bg-yellow-200/20 px-0.5 py-0.5 rounded-md flex items-center gap-1 border border-yellow-300">
              <Star size={13} className="text-yellow-300" />
              <span className="text-yellow-300 font-semibold">
                {item.score ? item.score.toFixed(1) : "-"}
              </span>
            </div>
            <span className="flex items-center gap-1 font-semibold text-green-300 bg-green-300/20 px-0.5 py-0.5 rounded-md border border-green-400">
              <Play size={12} />
              {item.episodes ? `${item.episodes} eps` : "?"}
            </span>
          </div>

          <span className="text-white font-semibold">{item.type || "-"}</span>
        </div>
      </div>
    </div>
  );
}
