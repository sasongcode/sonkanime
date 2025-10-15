import { useState } from "react";
import Toast from "../components/Toast";
import ScrollToTopButton from "../components/common/ScrollToTop";
import { contactCards, socialMediaLinks } from "../data/Contact";
import { Send, Share2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative px-6 md:px-20 py-24 bg-zinc-900 min-h-screen text-white overflow-hidden">
      {/* Dekorasi */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl -z-10"></div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-green-300 to-emerald-700 bg-clip-text text-transparent text-center mb-2">
          Contact Kami
        </h1>
        <div className="w-28 h-1 bg-yellow-400/80 mx-auto rounded-full shadow-lg shadow-green-500/40 mb-3"></div>

        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Jika anda memiliki pertanyaan, Silakan kirim pesan, pertanyaan, atau
          saran melalui form di bawah atau hubungi kami melalui kontak dan
          sosial media.
        </p>
      </div>

      {/* Card Kontak */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contactCards.map((info, i) => (
          <div
            key={i}
            className="group relative rounded-2xl p-6 
                       bg-gradient-to-br from-zinc-800 to-zinc-900
                       shadow-md hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
                       transition-all duration-300 ease-out
                       hover:-translate-y-2 hover:scale-[1.02]"
          >
            <div
              className="w-12 h-12 flex items-center justify-center 
                            rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 
                            shadow-lg mb-4 group-hover:scale-110 transition-transform"
            >
              <div className="transform group-hover:scale-110 group-hover:rotate-12 transition duration-500">
                <info.icon size={24} />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
              {info.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200 transition">
              {info.value}
            </p>
          </div>
        ))}
      </div>

      {/* Dua Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Kiri - Sosial Media */}
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
            <Share2
              size={35}
              className="text-white bg-green-400/30 px-1.5 rounded-full"
            />
            Sosial Media Kami
          </h2>

          {/* Card Sosial Media mirip Home */}
          <div className="flex flex-col gap-4 w-full">
            {socialMediaLinks.map((s, index) => (
              <a
                key={index}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-between gap-4 bg-zinc-800/70 rounded-xl overflow-hidden group hover:shadow-2xl hover:scale-[1.01] transition border border-transparent ${s.hover}`}
              >
                {/* Nomor urut */}
                <div className="ms-5 w-7 h-7 flex-shrink-0 flex justify-center font-semibold text-white rounded-full border group-hover:bg-white group-hover:border-white group-hover:text-black transition">
                  {index + 1}
                </div>

                {/* Info sosial media */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-sm md:text-base font-semibold text-white">
                    {s.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Kunjungi kami di {s.name}
                  </p>
                </div>

                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 relative overflow-hidden flex items-center justify-center rounded-xl">
                  <div className="absolute inset-0 rounded-xl"></div>
                  <s.icon
                    size={50}
                    className={`text-white opacity-90 transition-transform duration-300 group-hover:scale-110 ${s.hover}`}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Kanan - Form Kirim Pesan */}
        <div className="bg-zinc-800/20 border border-zinc-700 p-8 rounded-2xl shadow-xl hover:shadow-green-500/20 transition w-full">
          <h2 className="text-2xl font-bold bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent mb-5 flex items-center gap-2">
            <Send
              size={36}
              className="text-white bg-green-400/30 px-1.5 rounded-full"
            />
            Kirim Pesan
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Nama</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Masukkan nama kamu"
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500 text-white placeholder-gray-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email aktif"
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500 text-white placeholder-gray-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Pesan</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tulis pesan kamu..."
                className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-green-500 text-white placeholder-gray-500 transition"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 rounded-lg font-semibold text-white hover:opacity-90 transition transform hover:scale-[0.98] shadow-lg"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
