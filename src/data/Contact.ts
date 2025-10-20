import { Mail, Phone, MapPin, Github, Instagram, Youtube } from "lucide-react";

export const contactCards = [
  { icon: Mail, title: "Email", value: "support@nekosonk.com" },
  { icon: Phone, title: "Telepon", value: "+62 831-2522-1273" },
  { icon: MapPin, title: "Lokasi", value: "Gambiran, Banyuwangi, Jawa Timur" },
];

export const socialMediaLinks = [
  {
    name: "GitHub",
    link: "#",
    icon: Github,
    hover: "group-hover:bg-zinc-600/60 px-2 rounded-full hover:border-white hover:shadow-white/30",
  },
  {
    name: "Instagram",
    link: "#",
    icon: Instagram,
    hover: "group-hover:bg-pink-500 px-2 rounded-full hover:border-pink-500 hover:shadow-pink-500/30",
  },
  {
    name: "YouTube",
    link: "#",
    icon: Youtube,
    hover: "group-hover:bg-red-500 px-2 rounded-full hover:border-red-500 hover:shadow-red-500/30",
  },
];