export function handleFetchError(status: number) {
  switch (status) {
    case 429:
      return "⚠️ Terlalu banyak request! Mohon coba lagi...";
    case 404:
      return "❌ Data tidak ditemukan.";
    case 500:
      return "🚨 Server sedang bermasalah. Coba lagi nanti.";
    default:
      return "⚠️ Terlalu banyak request! Mohon coba lagi....";
  }
}
