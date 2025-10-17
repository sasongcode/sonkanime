import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md hover:text-amber-300 hover:underline transition ${
      isActive ? "text-amber-300 font-bold" : ""
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md ${
        isScrolled ? "bg-green-800/50 backdrop-blur-md" : "bg-green-800"
      } text-white`}
    >
      <div className="ms-6 flex justify-between items-center p-3">
        {/* Logo Brand */}
        <Link to="/">
          <img
            src="../public/nekosonk.png"
            alt="Brand"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex me-6 font-semibold text-sm md:text-base">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/anime" className={linkClass}>
            Anime
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favorite
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          className="md:hidden font-semibold backdrop-blur-md shadow-lg px-4 pb-4 space-y-2 transition-all duration-300 bg-green-800"
        >
          <NavLink
            to="/"
            className={linkClass}
            end
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/anime"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Anime
          </NavLink>
          <NavLink
            to="/favorites"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Favorite
          </NavLink>
          <NavLink
            to="/contact"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};
