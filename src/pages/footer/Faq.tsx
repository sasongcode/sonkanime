import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { faqData } from "../../data/Faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Grid: kiri (judul) dan kanan (gambar) */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* === Kiri === */}
          <div className="text-center md:text-left">
            <span className="inline-block bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-br from-green-400 to-emerald-700 bg-clip-text text-transparent drop-shadow-lg">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-yellow-400/80 rounded-full shadow-lg shadow-green-500/40 mx-auto md:mx-0 mb-6"></div>

            <p className="text-gray-300 mb-6 font-medium max-w-md mx-auto md:mx-0">
              Belum menemukan jawaban? Kamu bisa tanyakan langsung kepada kami
              dengan klik tombol di bawah ini 👇
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow hover:scale-[0.97] transition mx-auto md:mx-0"
            >
              <MessageCircle size={20} />
              Hubungi Kami
            </Link>
          </div>

          {/* Gambar */}
          <div className="flex justify-center md:justify-end mt-8 md:mt-0">
            <img
              src="/public/fak.png"
              alt="FAQ Illustration"
              className="w-64 sm:w-80 md:w-96 lg:w-[350px] h-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* === List Pertanyaan === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-2">
          {faqData.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl backdrop-blur-lg bg-zinc-800/80 border border-zinc-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="flex justify-between items-center w-full px-5 md:px-6 py-3 md:py-4 text-left"
              >
                <h4
                  className={`text-base md:text-lg font-semibold transition-colors group-hover:underline ${
                    openIndex === i ? "text-green-400" : "text-gray-200"
                  }`}
                >
                  {faq.question}
                </h4>
                {openIndex === i ? (
                  <ChevronUp className="text-green-400 flex-shrink-0 hover:scale-125" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 hover:scale-125 hover:text-green-600 transition" />
                )}
              </button>

              {/* Jawaban */}
              <div
                className={`px-5 md:px-6 pb-5 transition-all duration-500 ease-in-out ${
                  openIndex === i
                    ? "max-h-40 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
                }`}
              >
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
