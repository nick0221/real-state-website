import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Home,
  Calendar,
  Ruler,
  Building2,
  Phone,
  Mail,
  Share2,
  Heart,
} from "lucide-react";
import { properties, agents } from "../data/properties";
import { formatPrice } from "../utils/format";
import MortgageCalculator from "./MortgageCalculator";
import PropertyContactForm from "./PropertyContactForm";

function generateFloorPlanSVG(beds: number, baths: number, sqft: number): string {
  const colors = {
    bg: "#1a1a35",
    wall: "#2a2a4a",
    wallLight: "#3a3a5c",
    room: "#0f0f1a",
    label: "#b0b0c8",
    accent: "#d4a853",
    window: "#d4a85333",
    door: "#d4a85366",
  };

  const isStudio = beds === 0;

  const rooms = [
    { label: "Living Room", x: 5, y: 5, w: 40, h: 35, color: "#14142a" },
    { label: isStudio ? "Kitchenette" : "Kitchen", x: 5, y: 42, w: 25, h: 25, color: "#14142a" },
    { label: isStudio ? "" : "Dining", x: 32, y: 42, w: 13, h: 25, color: "#14142a" },
    { label: isStudio ? "Studio" : `Bedroom${beds >= 2 ? " 1" : ""}`, x: 47, y: 5, w: 22, h: 30, color: "#14142a" },
    { label: beds >= 2 ? `Bedroom${beds >= 3 ? " 2" : ""}` : "", x: 47, y: 37, w: 22, h: 30, color: "#14142a" },
    { label: beds >= 3 ? "Bedroom 3" : "", x: 71, y: 5, w: 24, h: 28, color: "#14142a" },
    { label: baths > 1 ? "Bath 1" : "Bath", x: 71, y: 35, w: 12, h: 16, color: "#12122a" },
    { label: baths > 1 ? "Bath 2" : "", x: 71, y: 53, w: 12, h: 14, color: "#12122a" },
  ];

  const visibleRooms = rooms.filter((r) => r.label);

  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 70" style="background:${colors.bg}">
    <defs>
      <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
        <path d="M 5 0 L 0 0 0 5" fill="none" stroke="${colors.wall}" stroke-width="0.2" opacity="0.3"/>
      </pattern>
    </defs>
    <rect width="100" height="70" fill="url(#grid)"/>
    <!-- Outer walls -->
    <rect x="2" y="2" width="96" height="66" fill="none" stroke="${colors.wallLight}" stroke-width="1.5" rx="2"/>
    <!-- Rooms -->
    ${visibleRooms.map((r) => `
    <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.color}" stroke="${colors.wall}" stroke-width="0.8" rx="1"/>
    <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 1}" text-anchor="middle" fill="${colors.label}" font-size="2.5" font-family="sans-serif">${r.label}</text>
    `).join("")}
    <!-- Windows -->
    <rect x="48" y="2" width="10" height="1.2" fill="${colors.window}" rx="0.3"/>
    <rect x="72" y="2" width="10" height="1.2" fill="${colors.window}" rx="0.3"/>
    <rect x="72" y="35" width="1.2" height="8" fill="${colors.window}" rx="0.3"/>
    <rect x="48" y="68.8" width="10" height="1.2" fill="${colors.window}" rx="0.3"/>
    <!-- Doors -->
    <rect x="30" y="42" width="0.8" height="6" fill="${colors.door}" rx="0.2"/>
    <rect x="47" y="20" width="0.8" height="6" fill="${colors.door}" rx="0.2"/>
    <rect x="47" y="52" width="0.8" height="6" fill="${colors.door}" rx="0.2"/>
    <!-- Title -->
    <text x="50" y="67" text-anchor="middle" fill="${colors.accent}" font-size="2.8" font-family="sans-serif" font-weight="bold">Floor Plan — ${sqft.toLocaleString()} sqft</text>
  </svg>`)}`;
}

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const property = useMemo(
    () => properties.find((p) => p.id === Number(id)),
    [id]
  );

  const similarProperties = useMemo(
    () =>
      property
        ? properties
            .filter((p) => p.id !== property.id && p.type === property.type)
            .slice(0, 3)
        : [],
    [property]
  );

  const agent = agents[property!.id % agents.length];

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-navy-800/50 border border-navy-500/20 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-navy-300" />
          </div>
          <h2 className="font-display text-2xl text-text-primary mb-2">Property Not Found</h2>
          <button onClick={() => navigate("/")} className="btn-primary mt-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }



  const floorPlanSvg = generateFloorPlanSVG(property.beds, property.baths, property.sqft);

  const gallery = property.gallery.length > 0 ? property.gallery : [property.image];

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Back Button Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-navy-900/80 backdrop-blur-xl border-b border-navy-500/20">
        <div className="container-main flex items-center justify-between px-6 h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-text-secondary hover:text-gold-500 transition-colors text-sm font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFavorited(!favorited)}
              className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer ${
                favorited
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-navy-700/50 border-navy-400/30 text-text-secondary hover:border-navy-300"
              }`}
              aria-label="Save property"
            >
              <Heart className={`w-4 h-4 ${favorited ? "fill-red-400" : ""}`} />
            </button>
            <button className="p-2 rounded-lg bg-navy-700/50 border border-navy-400/30 text-text-secondary hover:border-navy-300 transition-all duration-300 cursor-pointer" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <main className="pt-16">
        {/* ─── Gallery Section ─── */}
        <section className="relative">
          <div className="container-main px-6 pt-6 pb-0">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[21/10] max-h-[70vh] gold-glow">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={gallery[activeImage]}
                  alt={`${property.title} — photo ${activeImage + 1}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-navy-900/10" />

              {/* Image count badge */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-navy-900/70 backdrop-blur-sm text-text-secondary text-xs font-medium">
                {activeImage + 1} / {gallery.length}
              </div>

              {/* Navigation arrows */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? gallery.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-900/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === gallery.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy-900/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                      i === activeImage
                        ? "border-gold-500 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ─── Content Grid ─── */}
        <section className="section-padding">
          <div className="container-main px-6">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Left: Main Details */}
              <div className="lg:col-span-2 space-y-10">
                {/* Title & Price */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            property.status === "available"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : property.status === "pending"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                          For {property.type === "sale" ? "Sale" : "Rent"}
                        </span>
                      </div>
                      <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
                        {property.title}
                      </h1>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display text-3xl md:text-4xl font-bold gradient-text">
                        {formatPrice(property.price, property.type)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-text-secondary">
                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-gold-500/70" />
                    <span>{property.address}</span>
                  </div>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid grid-cols-3 sm:grid-cols-5 gap-4 p-6 bg-navy-800/50 border border-navy-500/20 rounded-2xl gold-glow"
                >
                  <div className="text-center">
                    <Bed className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                    <div className="font-display text-xl font-bold text-text-primary">
                      {property.beds}
                    </div>
                    <div className="text-text-muted text-xs">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                    <div className="font-display text-xl font-bold text-text-primary">
                      {property.baths}
                    </div>
                    <div className="text-text-muted text-xs">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                    <div className="font-display text-xl font-bold text-text-primary">
                      {property.sqft.toLocaleString()}
                    </div>
                    <div className="text-text-muted text-xs">Sq Ft</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                    <div className="font-display text-xl font-bold text-text-primary">
                      {property.yearBuilt}
                    </div>
                    <div className="text-text-muted text-xs">Year Built</div>
                  </div>
                  <div className="text-center">
                    <Ruler className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                    <div className="font-display text-xl font-bold text-text-primary">
                      {property.lotSize}
                    </div>
                    <div className="text-text-muted text-xs">Acres</div>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                    About This Property
                  </h2>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {property.description}
                  </p>
                </motion.div>

                {/* Features / Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="font-display text-2xl font-bold text-text-primary mb-4">
                    Features & Amenities
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {property.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 rounded-xl bg-navy-800/30 border border-navy-500/10"
                      >
                        <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-gold-500" />
                        </div>
                        <span className="text-text-secondary text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floor Plan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  id="floor-plan"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-2xl font-bold text-text-primary">
                      Floor Plan
                    </h2>
                    <button
                      onClick={() => setShowFloorPlan(!showFloorPlan)}
                      className="btn-outline text-xs px-4 py-2"
                    >
                      {showFloorPlan ? "Collapse" : "Expand"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showFloorPlan && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden rounded-2xl border border-navy-500/20 gold-glow"
                      >
                        <img
                          src={floorPlanSvg}
                          alt={`Floor plan for ${property.title}`}
                          className="w-full h-auto"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!showFloorPlan && (
                    <button
                      onClick={() => setShowFloorPlan(true)}
                      className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden border border-navy-500/20 gold-glow group cursor-pointer"
                    >
                      <img
                        src={floorPlanSvg}
                        alt="Floor plan preview"
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Home className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                          <span className="text-text-primary font-medium">
                            Click to view floor plan
                          </span>
                        </div>
                      </div>
                    </button>
                  )}
                </motion.div>
              </div>

              {/* Right: Agent Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Agent Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-navy-800/50 border border-navy-500/20 rounded-2xl p-6 gold-glow"
                  >
                    <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                      Listed by
                    </h3>

                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gold-500/30"
                      />
                      <div>
                        <div className="font-semibold text-text-primary">
                          {agent.name}
                        </div>
                        <div className="text-text-muted text-sm">
                          {agent.title}
                        </div>
                        <div className="text-gold-500 text-xs mt-1 font-medium">
                          {agent.propertiesSold}+ properties sold
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <a
                        href={`tel:${agent.phone}`}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold-500 text-navy-900 font-semibold text-sm hover:bg-gold-400 transition-all duration-300"
                      >
                        <Phone className="w-4 h-4" />
                        Call {agent.name.split(" ")[0]}
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-navy-700/50 border border-navy-400/30 text-text-secondary text-sm font-medium hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300"
                      >
                        <Mail className="w-4 h-4" />
                        Send Email
                      </a>
                    </div>

                    <div className="mt-4 pt-4 border-t border-navy-500/20 text-center">
                      <button className="btn-primary text-xs px-6 py-2.5 w-full">
                        Schedule a Tour
                      </button>
                    </div>
                  </motion.div>

                  {/* Property Contact Form */}
                  <PropertyContactForm property={property} agent={agent} />

                  {/* Mortgage Calculator */}
                  {property.type === "sale" && (
                    <MortgageCalculator price={property.price} />
                  )}

                  {/* Similar Properties */}
                  {similarProperties.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-navy-800/50 border border-navy-500/20 rounded-2xl p-6"
                    >
                      <h3 className="font-display text-lg font-bold text-text-primary mb-4">
                        Similar Properties
                      </h3>
                      <div className="space-y-3">
                        {similarProperties.map((sp) => (
                          <button
                            key={sp.id}
                            onClick={() => navigate(`/property/${sp.id}`)}
                            className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-navy-700/50 transition-colors text-left cursor-pointer"
                          >
                            <img
                              src={sp.image}
                              alt={sp.title}
                              className="w-16 h-12 rounded-lg object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-sm font-medium text-text-primary truncate">
                                {sp.title}
                              </div>
                              <div className="text-gold-500 text-sm font-semibold">
                                {formatPrice(sp.price, sp.type)}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
