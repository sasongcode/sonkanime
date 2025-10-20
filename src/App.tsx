import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollTop";
import ScrollToTopButton from "./components/common/ScrollToTop";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* auto scroll top */}
      <ScrollToTop />

      {/* button scroll to top */}
      <ScrollToTopButton />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}