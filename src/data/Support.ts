export interface SupportItem {
  type: string;
  icon: string;
  detail: string;
}

export const supportData: SupportItem[] = [
  {
    type: "Email",
    icon: "Mail",
    detail: "support@nekosonk.com",
  },
  {
    type: "Telepon",
    icon: "Phone",
    detail: "+62 831 2522 1273",
  },
  {
    type: "Live Chat",
    icon: "MessageCircle",
    detail: "Segera hadir 🚀",
  },
];