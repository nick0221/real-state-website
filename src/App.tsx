import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProperties from "./components/FeaturedProperties";
import Services from "./components/Services";
import Agents from "./components/Agents";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Smooth scroll handler for anchor links
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
            const top = element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 text-text-primary selection:bg-gold-500/30 selection:text-text-primary">
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
    </div>
  );
}

export default App;
