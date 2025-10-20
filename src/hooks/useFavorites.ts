import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (anime: any) => {
    const exists = favorites.find((f) => f.mal_id === anime.mal_id);
    if (!exists) {
      const updated = [...favorites, anime];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((f) => f.mal_id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return { favorites, addFavorite, removeFavorite };
}