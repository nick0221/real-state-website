import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProperties from "./components/FeaturedProperties";
import Services from "./components/Services";
import Agents from "./components/Agents";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PropertyDetail from "./components/PropertyDetail";
import ComparePage from "./components/ComparePage";
import CompareBar from "./components/CompareBar";
import BackToTop from "./components/BackToTop";
import { CompareProvider } from "./context/CompareContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePageWithCompare() {
  return (
    <>
      <HomePage />
      <CompareBar />
    </>
  );
}

function HomePage() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>("a[href^='#']");
      if (link) {
        const href = link.getAttribute("href");
        if (href && href.length > 1) {
          const id = href.slice(1);
          const element = document.getElementById(id);
          if (element) {
            e.preventDefault();
            const offset = 80;
            const top =
              element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        <Services />
        <Agents />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CompareProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-navy-900 text-text-primary selection:bg-gold-500/30 selection:text-text-primary">
          <Routes>
            <Route path="/" element={<HomePageWithCompare />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
          <BackToTop />
        </div>
      </CompareProvider>
    </BrowserRouter>
  );
}

export default App;
