import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Mail,
  Phone,
  HeartPulse,
  MapPinned,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-gray-200 pt-12 pb-8 mt-16 font-semibold">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Brand & Deskripsi */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Link to="/">
              <img
                src="/public/nekosonk.png"
                alt="Logo Brand"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
          <p className="text-sm leading-relaxed">
            Selamat datang di{" "}
            <span className="text-yellow-300">NekoSONK!!! Temukan </span>
            berbagai anime terbaru dan terpopuler{" "}
            <span className="text-yellow-300 uppercase">
              dalam satu website.
            </span>
          </p>
        </div>

        {/* Navigasi */}
        <div className="md:col-span-1 lg:ms-18">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Navigasi
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
                    after:content-[''] after:absolute after:left-2 after:-bottom-1 
                    after:h-[2px] after:w-0 after:bg-yellow-400 
                    after:transition-all after:duration-300 
                    hover:after:w-full"
              >
                • Home
              </Link>
            </li>
            <li>
              <Link
                to="/anime"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
                    after:content-[''] after:absolute after:left-2 after:-bottom-1 
                    after:h-[2px] after:w-0 after:bg-yellow-400 
                    after:transition-all after:duration-300 
                    hover:after:w-full"
              >
                • Anime
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
                    after:content-[''] after:absolute after:left-2 after:-bottom-1 
                    after:h-[2px] after:w-0 after:bg-yellow-400 
                    after:transition-all after:duration-300 
                    hover:after:w-full"
              >
                • Favorite
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
                    after:content-[''] after:absolute after:left-2 after:-bottom-1 
                    after:h-[2px] after:w-0 after:bg-yellow-400 
                    after:transition-all after:duration-300 
                    hover:after:w-full"
              >
                • Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources / Bantuan */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Bantuan & Dukungan
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/userguide"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
        after:content-[''] after:absolute after:left-2 after:-bottom-1 
        after:h-[2px] after:w-0 after:bg-yellow-400 
        after:transition-all after:duration-300 
        hover:after:w-full"
              >
                • User Guide
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
                    after:content-[''] after:absolute after:left-2 after:-bottom-1 
                    after:h-[2px] after:w-0 after:bg-yellow-400 
                    after:transition-all after:duration-300 
                    hover:after:w-full"
              >
                • Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
        after:content-[''] after:absolute after:left-2 after:-bottom-1 
        after:h-[2px] after:w-0 after:bg-yellow-400 
        after:transition-all after:duration-300 
        hover:after:w-full"
              >
                • Blog
              </Link>
            </li>

            <li>
              <Link
                to="/faq"
                className="relative text-gray-200 hover:text-yellow-400 transition-colors
                    after:content-[''] after:absolute after:left-2 after:-bottom-1 
                    after:h-[2px] after:w-0 after:bg-yellow-400 
                    after:transition-all after:duration-300 
                    hover:after:w-full"
              >
                • FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Ikuti Kami
          </h3>
          <div className="flex gap-3 mb-4">
            <a
              href="#"
              className="p-2 bg-green-700 rounded-full hover:bg-yellow-400 hover:text-green-700 transition hover:-translate-y-1"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-green-700 rounded-full hover:bg-yellow-400 hover:text-green-700 transition hover:-translate-y-1"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-green-700 rounded-full hover:bg-yellow-400 hover:text-green-700 transition hover:-translate-y-1"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-green-700 rounded-full hover:bg-yellow-400 hover:text-green-700 transition hover:-translate-y-1"
            >
              <Github size={18} />
            </a>
          </div>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3">
              <MapPinned size={16} /> Banyuwangi, Jawa Timur
            </li>
            <li className="flex items-center gap-3">
              <Mail size={17} /> sonknime@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} /> +62 831 2522 1273
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 mt-10 pt-4 text-center text-sm text-gray-300">
        <span>© {new Date().getFullYear()}</span>
        <span className="text-yellow-200">NekoSONK.</span>
        <span>Dibuat dengan</span>
        <HeartPulse size={18} className="text-red-400" />
        <span>oleh</span>
        <Link
          to="/profile"
          className="relative text-yellow-200 hover:text-yellow-400 transition-colors
              after:content-[''] after:absolute after:left-0 after:-bottom-1 
              after:h-[2px] after:w-0 after:bg-yellow-400 
              after:transition-all after:duration-300 
              hover:after:w-full"
        >
          Ahmad Damar Sasongko.
        </Link>
      </div>
    </footer>
  );
}
