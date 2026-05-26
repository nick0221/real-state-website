import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProperties from "./components/FeaturedProperties";
import Services from "./components/Services";
import Agents from "./components/Agents";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CompareBar from "./components/CompareBar";
import BackToTop from "./components/BackToTop";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import DemoBanner, { BANNER_HEIGHT } from "./components/DemoBanner";
import { CompareProvider } from "./context/CompareContext";

const PropertyDetail = lazy(() => import("./components/PropertyDetail"));
const ComparePage = lazy(() => import("./components/ComparePage"));

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
            const bannerOffset =
              localStorage.getItem("demo-banner-dismissed") !== "true"
                ? BANNER_HEIGHT
                : 0;
            const offset = 80 + bannerOffset;
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
      <main id="main-content">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <FeaturedProperties />
        </ErrorBoundary>
        <ErrorBoundary>
          <Services />
        </ErrorBoundary>
        <ErrorBoundary>
          <Agents />
        </ErrorBoundary>
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CompareProvider>
        <LazyMotion features={domAnimation}>
        <ScrollToTop />
        <div className="min-h-screen bg-navy-900 text-text-primary selection:bg-gold-500/30 selection:text-text-primary">
          <DemoBanner />
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePageWithCompare />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/compare" element={<ComparePage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <BackToTop />
        </div>
        </LazyMotion>
      </CompareProvider>
    </BrowserRouter>
  );
}

export default App;
