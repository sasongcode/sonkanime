import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  Search,
  Star,
  Trophy,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import ScrollToTopButton from "../components/common/ScrollToTop";
import HomeCard from "../components/home/HomeCard";
import Loading from "../components/common/Loading";
import { handleFetchError } from "../utils/fetchError";
import FetchError from "../components/common/ErrorFetch";

interface Genre {
  mal_id: number;
  name: string;
}

interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  images: { jpg: { image_url: string } };
  score: number;
  rank: number;
  episodes: number;
  genres: Genre[];
  type: string;
}

export default function Home() {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch anime top
  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.jikan.moe/v4/top/anime?limit=24", {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 429)
          throw new Error("⚠️ Terlalu banyak request! Mohon coba lagi...");
        if (!res.ok) throw new Error("⚠️ Gagal mengambil data anime!");
        return res.json();
      })
      .then((data) => {
        setAnime(data?.data || []);
        setError(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(handleFetchError(err));
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 800);
      });

    return () => controller.abort();
  }, []);

  // Saat error
  if (error)
    return (
      <FetchError message={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="relative flex flex-col min-h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Full screen loading overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-zinc-900 transition-opacity duration-700 z-50 ${
          loading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Loading />
      </div>

      {/* main content */}
      <div
        className={`flex-1 transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Hero Section */}
        <div className="relative w-full h-screen mt-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={anime.length > 2}
            className="h-full"
          >
            {anime.slice(0, 5).map((item) => (
              <SwiperSlide key={item.mal_id}>
                <div className="relative w-full h-full">
                  <img
                    src={item.images.jpg.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                    <motion.h1
                      className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                      {item.title}
                    </motion.h1>

                    <motion.p
                      className="text-sm md:text-lg mb-6 text-gray-200 line-clamp-3 max-w-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.3 }}
                    >
                      {item.synopsis}
                    </motion.p>

                    <motion.div
                      className="flex gap-6 mb-6 text-sm md:text-base text-gray-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <span>⭐ {item.score || "N/A"}</span>
                      <span>🏆 {item.rank || "-"}</span>
                      <span>🎬 {item.episodes || "?"} eps</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.4 }}
                    >
                      <Link
                        to={`/anime/${item.mal_id}`}
                        className="px-6 py-3 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition rounded-lg font-semibold text-white shadow-md w-fit"
                      >
                        Lihat Detail
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* styling swiper */}
          <style>{`
            .swiper-button-next, .swiper-button-prev {
              color: #22c55e;
              transition: all 0.3s ease;
            }
            .swiper-button-next:hover, .swiper-button-prev:hover {
              scale: 1.2;
              color: #4ade80;
            }
            .swiper-pagination-bullet {
              background: #9ca3af;
              opacity: 0.6;
            }
            .swiper-pagination-bullet:hover {
              scale: 1.5;
            }
            .swiper-pagination-bullet-active {
              background: linear-gradient(to right, #22c55e, #059669);
              opacity: 1;
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(40px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fadeInUp {
              animation: fadeInUp 1s ease-out both;
            }
          `}</style>
        </div>

        {/* Trending Section */}
        <div className="px-6 md:px-16 py-16 mt-10 bg-zinc-900">
          <div className="bg-zinc-800/40 p-5 rounded-xl mb-5">
            <h2 className="ms-2 text-xl md:text-2xl font-semibold flex items-center gap-2 drop-shadow-lg mb-4">
              <Trophy
                size={34}
                className="bg-white text-black p-2 rounded-full mt-1"
              />
              Top Trending
            </h2>

            <div className="flex flex-col gap-4">
              {anime
                .filter((a) => a.score && a.score >= 8.5)
                .slice(0, 12)
                .map((item, index) => (
                  <Link
                    to={`/anime/${item.mal_id}`}
                    key={item.mal_id}
                    className="relative flex items-center justify-between gap-4 bg-zinc-800/70 hover:bg-zinc-700/40 rounded-xl overflow-hidden group hover:shadow-2xl hover:scale-[1.01] transition"
                  >
                    <div className="ms-5 w-7 h-7 flex-shrink-0 flex justify-center font-semibold text-white rounded-full border group-hover:bg-white group-hover:border-white group-hover:text-black transition">
                      {index + 1}
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm md:text-base font-semibold text-white line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                        <span className="flex gap-2 px-1.5 py-0.5 bg-green-500/40 border border-green-500 rounded text-white font-semibold text-[10px]">
                          <Star size={12} />
                          Score {item.score ? item.score.toFixed(1) : "-"}
                        </span>
                        <span className="flex items-center gap-2 px-1.5 py-0.5 bg-red-600/40 border border-amber-700 rounded text-white font-semibold text-[10px] me-3">
                          <Play size={12} />
                          {item.episodes || 0} EPS
                        </span>
                        <span className="font-bold">{item.type || "TV"}</span>
                      </div>
                    </div>

                    <div className="w-40 h-20 md:w-48 md:h-28 flex-shrink-0 relative overflow-hidden rounded-xl">
                      <img
                        src={item.images.jpg.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.15] opacity-90"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-xl"></div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Popular Section */}
        <div className="px-6 md:px-18 py-5 bg-zinc-900 mb-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold mb-2 border-l-4 border-green-500 pl-3">
          Anime Populer Lainnya
        </h3>
            <Link
              to="/anime"
              className="flex justify-center gap-2 relative text-white hover:text-zinc-300/80 transition-colors after:content-[''] after:absolute after:left-0.5 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full font-bold"
            >
              Lihat Semua
              <ArrowRight size={18} className="mt-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {anime.slice(5, 17).map((item) => (
              <HomeCard key={item.mal_id} item={item} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="relative bg-center bg-cover py-20"
          style={{
            backgroundImage:
              "url(https://th.bing.com/th/id/R.47930bcaffe2b7f9fa79c2f3bd9d7628?rik=qGMMepOCgLfIxw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fagHMSaj.jpg&ehk=LFn%2f453mdZDHC7Wvo4M7mxvoSfo5m52KoX9FsagmcBM%3d&risl=&pid=ImgRaw&r=0)",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 text-center px-6 md:px-20">
            <h2 className="text-3xl md:text-5xl font-extrabold font-serif mb-5 text-yellow-300 drop-shadow-lg">
              Temukan Anime Favoritmu🚀
            </h2>
            <p className="max-w-2xl mx-auto text-gray-200 mb-5 font-semibold">
              Ribuan anime menunggu untuk kamu jelajahi. Klik tombol di bawah
              dan mulai petualanganmu sekarang!
            </p>
            <Link
              to="/anime"
              className="inline-flex items-center gap-2 w-auto px-5 py-3 text-xs md:text-sm font-medium border border-white text-white rounded-full shadow hover:bg-white hover:text-black hover:scale-[0.98] transition"
            >
              <Search size={16} />
              Lihat Daftar Anime
            </Link>
          </div>
        </div>

        <ScrollToTopButton />
      </div>
    </div>
  );
}
