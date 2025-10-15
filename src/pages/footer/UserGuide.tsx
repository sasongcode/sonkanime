import type { ReactNode } from "react";
import {
  BookOpen,
  Search,
  Heart,
  Info,
  Star,
  Trash,
  MessageCircleQuestionMark,
  Play,
  ListOrdered,
} from "lucide-react";
import { steps } from "../../data/Steps";

const icons: Record<string, ReactNode> = {
  book: <BookOpen className="w-7 h-7 text-white" />,
  search: <Search className="w-7 h-7 text-white" />,
  info: <Info className="w-7 h-7 text-white" />,
  heart: <Heart className="w-7 h-7 text-white" />,
  trash: <Trash className="w-7 h-7 text-white" />,
  star: <Star className="w-7 h-7 text-white" />,
  play: <Play className="w-7 h-7 text-white" />,
  paginate: <ListOrdered className="w-7 h-7 text-white" />,
  faq: <MessageCircleQuestionMark className="w-7 h-7 text-white" />,
};

export default function UserGuide() {
  return (
    <div className="bg-zinc-900 mt-8 min-h-screen text-white px-6 md:px-20 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl mb-2 font-bold bg-gradient-to-br from-green-300 to-emerald-700 bg-clip-text text-transparent drop-shadow-lg">
          Panduan Pengguna
        </h1>
        <div className="w-36 h-1 bg-yellow-400 mx-auto rounded-full mb-5"></div>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          Ikuti langkah-langkah berikut untuk memaksimalkan pengalamanmu
          menjelajahi anime di website ini.
        </p>
      </div>

      {/* Steps */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
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
                {icons[step.iconKey]}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition">
              {step.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-200 transition">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
