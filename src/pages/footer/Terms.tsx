import { Contact } from "lucide-react";
import { Link } from "react-router-dom";
import { ToSData } from "../../data/ToS";

export default function TermsOfService() {
  return (
    <div className="bg-zinc-900 mt-8 min-h-screen text-white px-6 md:px-20 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl mb-2 font-bold bg-gradient-to-br from-green-300 to-emerald-700 bg-clip-text text-transparent drop-shadow-lg">
          Terms of Service
        </h2>
        <div className="w-40 h-1 bg-yellow-400/80 mx-auto rounded-full shadow-lg shadow-green-500/40 mb-5"></div>

        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          Dengan menggunakan layanan
          <span className="bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent font-bold">
            {" "}NekoSONK
          </span>
          , anda menyetujui aturan berikut yang dirancang untuk melindungi
          pengguna dan menjaga pengalaman terbaik di website ini.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {ToSData.map((item, idx) => (
          <div
            key={idx}
            className="group flex items-start gap-4 bg-zinc-800/40 border border-zinc-700/40 
                       rounded-xl p-5 shadow-md hover:shadow-lg hover:shadow-green-400/20
                       transition-all duration-300 ease-out hover:-translate-y-1"
          >
            {/* Nomor */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg 
                            bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold shadow-md group-hover:bg-green-500 transition">
              {idx + 1}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="flex flex-col mt-16 items-center text-center">
        <p className="text-gray-300 font-medium max-w-xl leading-relaxed">
          Jika Anda memiliki pertanyaan terkait Terms of Service ini, silakan
          hubungi kami di bawah ini 👇
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 mt-6 rounded-xl font-semibold
                     bg-gradient-to-br from-green-400 to-emerald-600 hover:bg-green-500 hover:to-emerald-700 text-white shadow-md
                     hover:shadow-lg hover:scale-[0.98]
                     transition-all duration-300"
        >
          <Contact size={20} />
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
