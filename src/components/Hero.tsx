import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home, TrendingUp } from "lucide-react";

const stats = [
  { label: "Properties Listed", value: "1,200+" },
  { label: "Happy Clients", value: "850+" },
  { label: "Years Experience", value: "25+" },
  { label: "Awards Won", value: "40+" },
];

const propertyTypes = ["All", "Villa", "Penthouse", "Estate", "Loft", "Condo"];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt="Luxury estate"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/70 via-navy-900/50 to-navy-900/90" />
        <div className="absolute inset-0 bg-linear-to-r from-navy-900/40 to-transparent" />
        {/* Decorative gradient orb */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container-main px-6 pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-medium mb-6">
                  <TrendingUp className="w-4 h-4" />
                  Premium Real Estate Services
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              >
                Discover Your
                <br />
                <span className="gradient-text">Dream Estate</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-text-secondary text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              >
                Curating exceptional properties for discerning clients worldwide.
                Experience real estate reimagined with precision, passion, and
                unparalleled expertise.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                className="bg-navy-800/80 backdrop-blur-xl border border-navy-500/30 rounded-2xl p-4 gold-glow"
              >
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by city, address, or ZIP..."
                      className="w-full pl-12 pr-4 py-3.5 bg-navy-700/50 border border-navy-400/30 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-500/50 transition-colors"
                    />
                  </div>
                  <button className="btn-primary">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>

                {/* Property Type Filters */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedType === type
                          ? "bg-gold-500 text-navy-900"
                          : "bg-navy-700/50 text-text-secondary hover:bg-navy-600/50 hover:text-text-primary"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <div className="font-display text-2xl md:text-3xl font-bold text-gold-500">
                      {stat.value}
                    </div>
                    <div className="text-text-muted text-xs md:text-sm mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Decorative (hidden on mobile) */}
            <div className="hidden lg:block relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="relative"
              >
                <div className="aspect-3/4 rounded-2xl overflow-hidden gold-glow">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85"
                    alt="Luxury home"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-900/60 via-transparent to-transparent" />
                </div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute -bottom-4 -left-8 bg-navy-800/90 backdrop-blur-xl border border-navy-500/30 rounded-xl p-4 gold-glow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold-500 to-gold-700 flex items-center justify-center">
                      <Home className="w-6 h-6 text-navy-900" />
                    </div>
                    <div>
                      <div className="text-sm text-text-muted">Featured</div>
                      <div className="font-display text-lg font-bold text-gold-500">
                        $12.8M
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-text-muted text-xs tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-navy-300/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-gold-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
