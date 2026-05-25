import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const NAVBAR_HEIGHT = 80;
const SCROLL_THRESHOLD = 50;

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Properties", href: "#featured" },
  { label: "Services", href: "#services" },
  { label: "Agents", href: "#agents" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > SCROLL_THRESHOLD);

      // Only start hiding after scrolling past a threshold (not at top of page)
      if (currentY > SCROLL_THRESHOLD) {
        const scrollingDown = currentY > lastScrollY.current;
        setHidden(scrollingDown);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via Intersection Observer
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        // Trigger zone: below navbar (-80px) to the middle of viewport
        rootMargin: "-80px 0px -55% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);

      // Small delay to let the mobile menu close animation start
      requestAnimationFrame(() => {
        scrollToSection(href);
      });
    },
    []
  );

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 max-lg:bg-navy-900/95 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-xl max-lg:backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center font-display text-navy-900 text-xl font-bold transition-transform duration-300 group-hover:scale-105">
            P
          </div>
          <span className="font-display text-xl md:text-2xl font-bold tracking-wide">
            <span className="text-text-primary">Prestige</span>
            <span className="text-gold-500"> Estates</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                  isActive
                    ? "text-gold-500"
                    : "text-text-secondary hover:text-gold-500"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gold-500 transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
          <div className="ml-4 pl-4 border-l border-navy-400">
            <a
              href="tel:+13105550142"
              className="flex items-center gap-2 text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>(310) 555-0142</span>
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative z-50 p-2 text-text-primary hover:text-gold-500 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-navy-900 border-l border-navy-500/20 z-50 lg:hidden shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center font-display text-navy-900 text-sm font-bold">
                    P
                  </div>
                  <span className="font-display text-base font-bold">
                    <span className="text-text-primary">Prestige</span>
                    <span className="text-gold-500"> Estates</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-text-secondary hover:text-gold-500 transition-colors rounded-lg hover:bg-navy-700/50 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col px-4 pt-6 pb-24 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "text-gold-500 bg-gold-500/10"
                          : "text-text-secondary hover:text-gold-500 hover:bg-navy-800/50"
                      }`}
                    >
                      {/* Active indicator bar */}
                      <span
                        className={`w-1 h-5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-gold-500"
                            : "bg-transparent group-hover:bg-gold-500/50"
                        }`}
                      />
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Bottom Section */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-navy-500/20 bg-navy-800/30">
                <div className="px-4 py-3 rounded-xl bg-navy-800/50 border border-navy-500/20">
                  <div className="text-xs text-text-muted mb-1">Contact</div>
                  <a
                    href="tel:+13105550142"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    (310) 555-0142
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
