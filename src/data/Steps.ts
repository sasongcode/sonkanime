export interface Step {
  title: string;
  desc: string;
  iconKey: "book" | "search" | "info" | "heart" | "star" | "trash" | "faq" | "play" | "paginate";
}

export const steps: Step[] = [
  {
    iconKey: "book",
    title: "Jelajahi Anime",
    desc: "Buka halaman utama untuk melihat daftar anime trending, populer, dan terbaru.",
  },
  {
    iconKey: "search",
    title: "Gunakan Pencarian & Genre",
    desc: "Cari anime berdasarkan judul atau gunakan filter genre untuk mempersempit hasil pencarian.",
  },
  {
    iconKey: "info",
    title: "Lihat Detail Anime",
    desc: "Klik salah satu anime untuk melihat detail lengkap: poster, rating, genre, episode, dan sinopsis.",
  },
  {
    iconKey: "heart",
    title: "Simpan ke Favorit",
    desc: "Tekan ikon hati untuk menyimpan anime ke daftar favorit. Buka halaman Favorit untuk mengaksesnya kapan saja.",
  },
  {
    iconKey: "trash",
    title: "Hapus dari Favorit",
    desc: "Tekan ikon hati yang menyala berwarna pink di halaman AnimeList untuk menghapus anime dari daftar favorit. Buka halaman Favorit untuk mengaksesnya kapan saja.",
  },
  {
    iconKey: "star",
    title: "Navigasi Cepat",
    desc: "Gunakan menu genre, pagination, dan tombol scroll-to-top agar mudah menjelajahi daftar anime.",
  },
  {
    iconKey: "play",
    title: "Tonton Trailer Anime",
    desc: "Masuk ke halaman detail anime untuk menemukan tautan streaming resmi dari penyedia yang tersedia.",
  },
  {
    iconKey: "paginate",
    title: "Kelola Halaman",
    desc: "Gunakan pagination untuk berpindah antar halaman anime dengan lancar, dari awal hingga akhir daftar.",
  },
  {
    iconKey: "faq",
    title: "Punya Pertanyaan?",
    desc: "Jika ada pertanyaan, kunjungi halaman FAQ atau hubungi kami melalui halaman Contact.",
  },
];