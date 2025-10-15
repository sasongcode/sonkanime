import { Code2, Rocket, Briefcase, Github, Instagram, Youtube } from "lucide-react";
import { skills } from "../../data/Skills";

export default function Profile() {

  return (
    <section className="min-h-screen bg-zinc-900 text-white px-6 md:px-20 py-28">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* === Foto Profil === */}
        <div className="flex justify-center">
          <div className="relative group">
            <img
              src="/public/saya.jpg"
              alt="Profile"
              className="w-60 h-60 md:w-90 md:h-90 rounded-full object-cover border-4 border-sky-500 shadow-lg shadow-sky-500/60 group-hover:scale-105 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-3xl group-hover:blur-2xl transition-all" />
          </div>
        </div>

        {/* === Deskripsi Diri === */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-sky-400 mb-3">
            👋 Hi, I'm Sasongko
          </h2> 
          <p className="text-gray-300 mb-6 leading-relaxed">
            Saya seorang <span className="text-red-400 font-semibold">Web Developer</span> yang berfokus pada bagian{" "}
            <span className="text-yellow-400 font-semibold">Front End</span>, seperti membangun tampilan (User Interface)
            untuk halaman web. Saya senang mengubah ide menjadi produk nyata menggunakan teknologi seperti{" "}
            <span className="text-sky-400 font-semibold">React</span>,{" "}
            <span className="text-yellow-400 font-semibold">Javascript</span>, dan{" "}
            <span className="text-indigo-400 font-semibold">Tailwind</span>.
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-3">
              <Code2 className="text-red-400" />
              <p>Kemampuan: Frontend Web Development</p>
            </div>
            <div className="flex items-center gap-3">
              <Rocket className="text-yellow-400" />
              <p>Passion: Membuat imajinasi menjadi sebuah projek nyata</p>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="text-sky-400" />
              <p>Pengalaman: Magang selama 6 bulan di PT Hummatech</p>
            </div>
          </div>

          {/* Sosial Media */}
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.instagram.com/abcdmrzo"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-pink-400 via-fuchsia-600 to-fuchsia-800 hover:from-pink-500 hover:via-fuchsia-700 hover:to-fuchsia-900 hover:scale-95 transition"
            >
              <Instagram size={18} />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@abcdmrzo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-red-400 via-rose-600 to-rose-800 hover:from-red-500 hover:via-rose-700 hover:to-rose-900 hover:scale-95 transition"
            >
              <Youtube size={18} />
              <span>Youtube</span>
            </a>
            <a
              href="https://github.com/Marzoo21"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-zinc-500 via-zinc-700 to-zinc-800 hover:from-zinc-600 hover:via-zinc-800 hover:to-zinc-900 hover:scale-95 transition"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bagian Keahlian */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-sky-400 mb-10">
          🧠 Frontend Skill Overview
        </h3>

        <div className="flex flex-col gap-6">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-200">{skill.name}</span>
                <span className="text-sm font-semibold text-zinc-200">{skill.level}%</span>
              </div>
              <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-700`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}