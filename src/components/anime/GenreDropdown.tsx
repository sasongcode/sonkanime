// src/components/anime/GenreDropdown.tsx
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Genre {
  mal_id: number;
  name: string;
}

interface GenreDropdownProps {
  genres: Genre[];
  selectedGenre: number | null;
  onSelect: (id: number | null) => void;
}

export default function GenreDropdown({
  genres,
  selectedGenre,
  onSelect,
}: GenreDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Tombol utama */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between gap-2 bg-zinc-800 hover:bg-zinc-700 
                   px-5 py-2.5 rounded-full shadow-md transition-all duration-200 
                   text-gray-200 text-sm font-medium min-w-[140px] border border-zinc-700"
      >
        {selectedGenre
          ? genres.find((g) => g.mal_id === selectedGenre)?.name || "Genre"
          : "Genre"}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            dropdownOpen ? "rotate-180 text-green-400" : "text-gray-400"
          }`}
        />
      </button>

      {/* Dropdown list dengan animasi */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 
                       bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/40 
                       rounded-2xl shadow-2xl p-5 z-50
                       w-[95vw] max-w-3xl max-h-[350px] overflow-y-auto 
                       scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {/* Opsi All */}
              <button
                onClick={() => {
                  onSelect(null);
                  setDropdownOpen(false);
                }}
                className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200
                ${
                  !selectedGenre
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-zinc-800/60 text-gray-300 hover:bg-green-600 hover:text-white"
                }`}
              >
                All
              </button>

              {/* Genre options */}
              {genres.map((genre) => {
                const isActive = selectedGenre === genre.mal_id;
                return (
                  <button
                    key={genre.mal_id}
                    onClick={() => {
                      onSelect(genre.mal_id);
                      setDropdownOpen(false);
                    }}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-zinc-800/60 text-gray-300 hover:bg-green-500 hover:text-white"
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
