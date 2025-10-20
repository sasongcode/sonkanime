import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "danger" | "error";
  onClose: () => void;
}

export default function Toast ({ message, type = "success", onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);

    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // tunggu animasi fade-out
    }, 2500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [onClose]);

  // Pilih warna berdasarkan type
  let bgColor = "bg-green-600 text-white";
  if (type === "danger") bgColor = "bg-red-500 text-white";

  return (
    <div
      className={`fixed right-5 top-20 z-[9999] px-4 py-2 rounded-lg shadow-lg text-sm font-medium transform transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
        ${bgColor}`}
    >
      {message}
    </div>
  );
};
