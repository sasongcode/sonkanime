import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Rocket,
  Briefcase,
  Github,
  Instagram,
  Youtube,
} from "lucide-react";
import { skills } from "../../data/Skills";

export default function Profile() {
  return (
    <section className="min-h-screen bg-zinc-900 text-white px-6 md:px-20 py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        {/* Foto Profil */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Efek di belakang foto */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-sky-500/10 blur-3xl group-hover:blur-2xl transition-all" />
          </div>

          {/* Gambar profil */}
          <img
            src="/saya.jpg"
            alt="Profile"
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-sky-500 shadow-lg shadow-sky-500/40 transition-transform duration-300 hover:scale-105"
          />
        </motion.div>

        {/* Deskripsi */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sky-400 mb-4">
            👋 Hi, I’m <span className="text-white">Sasongko</span>
          </h2>

          <p className="text-gray-300 mb-7 leading-relaxed text-justify">
            Saya seorang{" "}
            <span className="text-red-400 font-semibold">Web Developer</span>{" "}
            dengan fokus pada{" "}
            <span className="text-yellow-400 font-semibold">Front-End</span>.
            Saya suka mengubah ide menjadi produk nyata dengan teknologi seperti{" "}
            <span className="text-sky-400 font-semibold">React</span>,{" "}
            <span className="text-yellow-400 font-semibold">JavaScript</span>,{" "}
            dan{" "}
            <span className="text-indigo-400 font-semibold">Tailwind CSS</span>.
          </p>

          {/* Info Pribadi */}
            <div className="mb-1 text-sky-700 font-semibold grid sm:grid-cols-2 gap-x-8 gap-y-2">
              <h1>Biodata Saya :</h1>
            </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-300 mb-10">
            <p>
              <span className="text-sky-400 font-semibold">Nama:</span> Ahmad
              Damar Sasongko
            </p>
            <p>
              <span className="text-sky-400 font-semibold">Asal:</span>{" "}
              Banyuwangi, Jawa Timur
            </p>
            <p>
              <span className="text-sky-400 font-semibold">Pendidikan:</span>{" "}
              SMK Muhammadiyah 1 Genteng - RPL
            </p>
            <p>
              <span className="text-sky-400 font-semibold">Bahasa:</span>{" "}
              Indonesia, English (Basic)
            </p>
          </div>

          {/* Info Tambahan */}
          <motion.div
            className="flex flex-col gap-3 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Info
              icon={<Code2 className="text-red-400" />}
              text="Kemampuan: Front-End Web Development"
            />
            <Info
              icon={<Rocket className="text-yellow-400" />}
              text="Passion: Mengubah ide & imajinasi jadi proyek nyata"
            />
            <Info
              icon={<Briefcase className="text-sky-400" />}
              text="Pengalaman: Magang 6 bulan di PT Hummatech"
            />
          </motion.div>

          {/* Sosial Media */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Social
              href="https://www.instagram.com/abcdmrzo"
              gradient="from-pink-400 via-fuchsia-600 to-fuchsia-800"
              icon={<Instagram size={18} />}
              label="Instagram"
            />
            <Social
              href="https://www.youtube.com/@abcdmrzo"
              gradient="from-red-400 via-rose-600 to-rose-800"
              icon={<Youtube size={18} />}
              label="YouTube"
            />
            <Social
              href="https://github.com/sasongcode"
              gradient="from-zinc-500 via-zinc-700 to-zinc-800"
              icon={<Github size={18} />}
              label="GitHub"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Skill */}
      <motion.div
        className="mt-28 max-w-5xl mx-auto rounded-2xl p-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-center text-sky-400 mb-10">
          🧠 Frontend Skill Overview
        </h3>

        <div className="flex flex-col gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-200">{skill.name}</span>
                <span className="text-sm font-semibold text-zinc-300">
                  {skill.level}%
                </span>
              </div>

              <div className="w-full h-3 bg-zinc-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  style={{ width: `${skill.level}%` }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* Komponen Kecil */
function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-300">
      {icon}
      <p>{text}</p>
    </div>
  );
}

function Social({
  href,
  gradient,
  icon,
  label,
}: {
  href: string;
  gradient: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br ${gradient} hover:scale-95 hover:brightness-110 transition-all duration-300`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
