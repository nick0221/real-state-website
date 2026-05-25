import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Calendar,
  Ruler,
  Home,
  Check,
  X as XIcon,
  BarChart3,
  Building2,
} from "lucide-react";
import { useCompare } from "../context/CompareContext";
import { formatPrice } from "../utils/format";

type RowDef = {
  label: string;
  icon: React.ReactNode;
  getValue: (p: (typeof import("../data/properties").properties)[0]) => string | ReactNode;
  highlight?: "higher" | "lower";
};

export default function ComparePage() {
  const { selected, toggleProperty, clearAll } = useCompare();
  const navigate = useNavigate();

  if (selected.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-2xl bg-navy-800/50 border border-navy-500/20 flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-8 h-8 text-navy-300" />
          </div>
          <h2 className="font-display text-2xl text-text-primary mb-2">
            No Properties to Compare
          </h2>
          <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
            Select at least 2 properties by clicking the compare checkbox on
            property cards, then come back here.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const rows: RowDef[] = [
    {
      label: "Price",
      icon: <Building2 className="w-3.5 h-3.5" />,
      getValue: (p) => (
        <span className="text-gold-500 font-bold text-lg font-display">
          {formatPrice(p.price, p.type)}
        </span>
      ),
    },
    {
      label: "Bedrooms",
      icon: <Bed className="w-3.5 h-3.5" />,
      getValue: (p) => `${p.beds}`,
      highlight: "higher",
    },
    {
      label: "Bathrooms",
      icon: <Bath className="w-3.5 h-3.5" />,
      getValue: (p) => `${p.baths}`,
      highlight: "higher",
    },
    {
      label: "Square Feet",
      icon: <Maximize className="w-3.5 h-3.5" />,
      getValue: (p) => `${p.sqft.toLocaleString()}`,
      highlight: "higher",
    },
    {
      label: "Property Type",
      icon: <Home className="w-3.5 h-3.5" />,
      getValue: (p) => (p.type === "sale" ? "For Sale" : "For Rent"),
    },
    {
      label: "Status",
      icon: <Building2 className="w-3.5 h-3.5" />,
      getValue: (p) => (
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            p.status === "available"
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
              : p.status === "pending"
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                : "bg-red-500/15 text-red-400 border border-red-500/25"
          }`}
        >
          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
        </span>
      ),
    },
    {
      label: "Year Built",
      icon: <Calendar className="w-3.5 h-3.5" />,
      getValue: (p) => `${p.yearBuilt}`,
      highlight: "higher",
    },
    {
      label: "Lot Size",
      icon: <Ruler className="w-3.5 h-3.5" />,
      getValue: (p) => `${p.lotSize} acres`,
      highlight: "higher",
    },
    {
      label: "Address",
      icon: <MapPin className="w-3.5 h-3.5" />,
      getValue: (p) => (
        <span className="text-text-secondary text-xs leading-snug block max-w-[200px]">
          {p.address}
        </span>
      ),
    },
  ];

  // Find max values for highlighting
  const maxBeds = Math.max(...selected.map((p) => p.beds));
  const maxBaths = Math.max(...selected.map((p) => p.baths));
  const maxSqft = Math.max(...selected.map((p) => p.sqft));
  const maxYear = Math.max(...selected.map((p) => p.yearBuilt));
  const maxLot = Math.max(...selected.map((p) => p.lotSize));

  const isHighlighted = (p: (typeof selected)[0], row: RowDef): boolean => {
    if (!row.highlight) return false;
    switch (row.label) {
      case "Bedrooms":
        return p.beds === maxBeds && maxBeds > 0;
      case "Bathrooms":
        return p.baths === maxBaths && maxBaths > 0;
      case "Square Feet":
        return p.sqft === maxSqft;
      case "Year Built":
        return p.yearBuilt === maxYear;
      case "Lot Size":
        return p.lotSize === maxLot;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Back bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-navy-900/80 backdrop-blur-xl border-b border-navy-500/20">
        <div className="container-main flex items-center justify-between px-6 h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-text-secondary hover:text-gold-500 transition-colors text-sm font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-sm text-text-muted hover:text-red-400 transition-colors cursor-pointer"
          >
            <XIcon className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>
      </div>

      <main className="pt-20 pb-12 px-6">
        <div className="container-main">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
              Comparison
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-text-primary mt-2">
              Side-by-Side{" "}
              <span className="gradient-text">Property Analysis</span>
            </h1>
            <p className="text-text-muted text-sm mt-2">
              Comparing {selected.length} properties
            </p>
          </motion.div>

          {/* ─── Desktop Table ─── */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-36 p-4 text-left" />
                  {selected.map((p) => (
                    <th
                      key={p.id}
                      className="p-4 min-w-[240px] align-top"
                    >
                      <div className="bg-navy-800/50 border border-navy-500/20 rounded-2xl overflow-hidden gold-glow">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="font-display text-lg font-bold text-white drop-shadow-lg">
                              {formatPrice(p.price, p.type)}
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-display text-base font-bold text-text-primary mb-0.5">
                            {p.title}
                          </h3>
                          <p className="text-text-muted text-xs truncate">
                            {p.address}
                          </p>
                          <div className="flex gap-1.5 mt-2">
                            <button
                              onClick={() => navigate(`/property/${p.id}`)}
                              className="flex-1 py-1.5 rounded-lg bg-navy-700/50 border border-navy-400/20 text-text-secondary text-xs font-medium hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 cursor-pointer"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => toggleProperty(p)}
                              className="p-1.5 rounded-lg bg-navy-700/50 border border-navy-400/20 text-text-muted hover:text-red-400 hover:border-red-400/30 transition-all duration-300 cursor-pointer"
                              aria-label={`Remove ${p.title}`}
                            >
                              <XIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    className="group"
                  >
                    <td className="p-3 border-b border-navy-500/10">
                      <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
                        <span className="text-gold-500/70">{row.icon}</span>
                        {row.label}
                      </div>
                    </td>
                    {selected.map((p) => (
                      <td
                        key={p.id}
                        className={`p-3 border-b border-navy-500/10 text-center ${
                          isHighlighted(p, row)
                            ? "bg-gold-500/5"
                            : ""
                        }`}
                      >
                        <div
                          className={`text-text-primary text-sm ${
                            isHighlighted(p, row)
                              ? "text-gold-400 font-semibold"
                              : ""
                          }`}
                        >
                          {row.getValue(p)}
                        </div>
                        {isHighlighted(p, row) && (
                          <div className="text-[10px] text-gold-500/60 font-medium mt-0.5">
                            Best
                          </div>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ─── Mobile Cards ─── */}
          <div className="lg:hidden space-y-6">
            {selected.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-navy-800/50 border border-navy-500/20 rounded-2xl overflow-hidden gold-glow"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {p.title}
                      </h3>
                      <p className="text-text-muted text-xs">{p.address}</p>
                    </div>
                    <div className="font-display text-xl font-bold gradient-text">
                      {formatPrice(p.price, p.type)}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleProperty(p)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-navy-900/70 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <Bed className="w-4 h-4 text-gold-500 mx-auto mb-1" />
                      <div className="text-text-primary font-semibold text-sm">
                        {p.beds}
                      </div>
                      <div className="text-text-muted text-[10px]">Beds</div>
                    </div>
                    <div>
                      <Bath className="w-4 h-4 text-gold-500 mx-auto mb-1" />
                      <div className="text-text-primary font-semibold text-sm">
                        {p.baths}
                      </div>
                      <div className="text-text-muted text-[10px]">Baths</div>
                    </div>
                    <div>
                      <Maximize className="w-4 h-4 text-gold-500 mx-auto mb-1" />
                      <div className="text-text-primary font-semibold text-sm">
                        {p.sqft.toLocaleString()}
                      </div>
                      <div className="text-text-muted text-[10px]">Sq Ft</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-secondary pt-2 border-t border-navy-500/10">
                    <span>Year: {p.yearBuilt}</span>
                    <span>Lot: {p.lotSize} acres</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        p.status === "available"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : p.status === "pending"
                            ? "bg-amber-500/15 text-amber-400"
                            : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/property/${p.id}`)}
                    className="w-full py-2 rounded-xl bg-navy-700/50 border border-navy-400/20 text-text-secondary text-sm font-medium hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─── Features Comparison (Desktop) ─── */}
          {selected.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 hidden lg:block"
            >
              <h2 className="font-display text-2xl font-bold text-text-primary mb-6">
                Features & Amenities
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-36 p-4 text-left" />
                      {selected.map((p) => (
                        <th
                          key={p.id}
                          className="p-4 text-center font-display text-sm font-bold text-text-primary"
                        >
                          {p.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Collect all unique features
                      const allFeatures = Array.from(
                        new Set(selected.flatMap((p) => p.features))
                      );
                      return allFeatures.map((feature, i) => (
                        <motion.tr
                          key={feature}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2, delay: i * 0.02 }}
                          className="group"
                        >
                          <td className="p-3 border-b border-navy-500/10">
                            <span className="text-text-secondary text-sm">
                              {feature}
                            </span>
                          </td>
                          {selected.map((p) => {
                            const has = p.features.includes(feature);
                            return (
                              <td
                                key={p.id}
                                className="p-3 border-b border-navy-500/10 text-center"
                              >
                                {has ? (
                                  <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                                ) : (
                                  <XIcon className="w-4 h-4 text-navy-500 mx-auto" />
                                )}
                              </td>
                            );
                          })}
                        </motion.tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ─── Features Comparison (Mobile) ─── */}
          {selected.length >= 2 && (
            <div className="mt-10 lg:hidden">
              <h2 className="font-display text-xl font-bold text-text-primary mb-4">
                Features & Amenities
              </h2>
              <div className="space-y-6">
                {selected.map((p) => (
                  <div
                    key={p.id}
                    className="bg-navy-800/30 border border-navy-500/10 rounded-xl p-4"
                  >
                    <h3 className="font-display text-base font-bold text-text-primary mb-3">
                      {p.title}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {p.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-2 text-sm text-text-secondary"
                        >
                          <Check className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => navigate("/")}
              className="btn-outline"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse More Properties
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
