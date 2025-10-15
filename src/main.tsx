import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AnimeList from "./pages/anime/AnimeList.tsx";
import AnimeDetail from "./pages/anime/AnimeDetail.tsx";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites.tsx";
import TermsOfService from "./pages/footer/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";
import Blog from "./pages/footer/Blog.tsx";
import FAQ from "./pages/footer/Faq.tsx";
import UserGuide from "./pages/footer/UserGuide.tsx";
import BlogDetail from "./pages/footer/BlogDetail.tsx";
import About from "./pages/footer/Profile.tsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "anime", element: <AnimeList /> },
      { path: "anime/:id", element: <AnimeDetail /> },
      { path: "favorites", element: <Favorites /> },
      { path: "contact", element: <Contact /> },
      { path: "faq", element: <FAQ /> },
      { path: "privacy", element: <TermsOfService /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "userguide", element: <UserGuide /> },
      { path: "profile", element: <About /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
