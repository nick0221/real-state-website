import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "../utils/motion";
import {
  ArrowRight,
  SlidersHorizontal,
  X,
  Bed,
  Bath,
  DollarSign,
  Building2,
  SearchX,
} from "lucide-react";
import PropertyCard from "./PropertyCard";
import { properties } from "../data/properties";

const priceRanges = [
  { label: "Any", min: 0, max: Infinity },
  { label: "Under $2M", min: 0, max: 2000000 },
  { label: "$2M - $5M", min: 2000000, max: 5000000 },
  { label: "$5M - $10M", min: 5000000, max: 10000000 },
  { label: "$10M+", min: 10000000, max: Infinity },
];

const bedOptions = [
  { label: "Any", value: 0 },
  { label: "1+", value: 1 },
  { label: "2+", value: 2 },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "5+", value: 5 },
];

const bathOptions = [
  { label: "Any", value: 0 },
  { label: "1+", value: 1 },
  { label: "2+", value: 2 },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
];

const typeOptions = [
  { label: "All", value: "all" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

const typeToValue: Record<string, string> = {
  villa: "sale",
  penthouse: "sale",
  estate: "sale",
  loft: "rent",
  condo: "rent",
};

export default function FeaturedProperties() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [propertyType, setPropertyType] = useState("all");
  const [priceRangeIndex, setPriceRangeIndex] = useState(0);
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState("");

  // Sync URL search params into filter state on mount / param change
  useEffect(() => {
    const search = searchParams.get("search");
    const type = searchParams.get("type");

    if (search) setSearchText(search.toLowerCase());
    else setSearchText("");

    if (type && typeToValue[type.toLowerCase()]) {
      setPropertyType(typeToValue[type.toLowerCase()]);
      setShowFilters(true);
    } else {
      setPropertyType("all");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // Text search (title, address, description)
      if (
        searchText &&
        !p.title.toLowerCase().includes(searchText) &&
        !p.address.toLowerCase().includes(searchText) &&
        !p.description.toLowerCase().includes(searchText)
      ) {
        return false;
      }

      // Property type
      if (propertyType !== "all" && p.type !== propertyType) return false;

      // Price range
      const range = priceRanges[priceRangeIndex];
      if (p.price < range.min || p.price > range.max) return false;

      // Beds
      if (p.beds < minBeds) return false;

      // Baths
      if (p.baths < minBaths) return false;

      return true;
    });
  }, [propertyType, priceRangeIndex, minBeds, minBaths, searchText]);

  const hasActiveFilters =
    searchText !== "" ||
    propertyType !== "all" ||
    priceRangeIndex !== 0 ||
    minBeds !== 0 ||
    minBaths !== 0;

  const clearFilters = () => {
    setSearchText("");
    setPropertyType("all");
    setPriceRangeIndex(0);
    setMinBeds(0);
    setMinBaths(0);
    navigate("/", { replace: true });
  };

  return (
    <section id="featured" className="section-padding relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-160 h-160 bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-120 h-120 bg-gold-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
              Explore Properties
            </span>
            <h2 className="section-title mt-3">
              Exceptional Homes,
              <br />
              <span className="gradient-text">Extraordinary Lives</span>
            </h2>
            <p className="section-subtitle mt-4">
              From sprawling estates to modern penthouses — each property in our
              curated collection tells a unique story of luxury living.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Results count */}
            <span className="text-text-muted text-sm hidden sm:block">
              {filtered.length}{" "}
              {filtered.length === 1 ? "property" : "properties"}
            </span>

            {/* Filter toggle */}
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 cursor-pointer ${
                showFilters || hasActiveFilters
                  ? "bg-gold-500/10 border-gold-500/30 text-gold-500"
                  : "bg-navy-700/50 border-navy-400/30 text-text-secondary hover:border-navy-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-gold-500" />
              )}
            </m.button>
          </div>
        </m.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-navy-800/80 border border-navy-500/20 rounded-2xl p-5 md:p-6 gold-glow">
                {/* Active filter indicator + clear */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-text-muted uppercase tracking-wider font-medium">
                    Refine your search
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 text-xs text-gold-500 hover:text-gold-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                      Clear all
                    </button>
                  )}
                </div>

                {/* Filter rows */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Property Type */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-3">
                      <Building2 className="w-4 h-4 text-gold-500/70" />
                      Type
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {typeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setPropertyType(opt.value)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                            propertyType === opt.value
                              ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20"
                              : "bg-navy-700/50 text-text-secondary border border-navy-400/20 hover:bg-navy-600/50 hover:text-text-primary"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-3">
                      <DollarSign className="w-4 h-4 text-gold-500/70" />
                      Price Range
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {priceRanges.map((range, i) => (
                        <button
                          key={range.label}
                          onClick={() => setPriceRangeIndex(i)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                            priceRangeIndex === i
                              ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20"
                              : "bg-navy-700/50 text-text-secondary border border-navy-400/20 hover:bg-navy-600/50 hover:text-text-primary"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Beds */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-3">
                      <Bed className="w-4 h-4 text-gold-500/70" />
                      Bedrooms
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {bedOptions.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => setMinBeds(opt.value)}
                          className={`w-10 h-10 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                            minBeds === opt.value
                              ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20"
                              : "bg-navy-700/50 text-text-secondary border border-navy-400/20 hover:bg-navy-600/50 hover:text-text-primary"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Baths */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-text-secondary mb-3">
                      <Bath className="w-4 h-4 text-gold-500/70" />
                      Bathrooms
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {bathOptions.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => setMinBaths(opt.value)}
                          className={`w-10 h-10 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                            minBaths === opt.value
                              ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/20"
                              : "bg-navy-700/50 text-text-secondary border border-navy-400/20 hover:bg-navy-600/50 hover:text-text-primary"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Active filter summary chips (shown when filters are hidden but active) */}
        {!showFilters && hasActiveFilters && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {searchText && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs">
                "{searchText}"
                <button onClick={() => { setSearchText(""); navigate("/", { replace: true }); }} className="hover:text-gold-300 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {propertyType !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs">
                {propertyType === "sale" ? "For Sale" : "For Rent"}
                <button onClick={() => setPropertyType("all")} className="hover:text-gold-300 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {priceRangeIndex !== 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs">
                {priceRanges[priceRangeIndex].label}
                <button onClick={() => setPriceRangeIndex(0)} className="hover:text-gold-300 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minBeds > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs">
                {minBeds}+ Beds
                <button onClick={() => setMinBeds(0)} className="hover:text-gold-300 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {minBaths > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs">
                {minBaths}+ Baths
                <button onClick={() => setMinBaths(0)} className="hover:text-gold-300 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <span className="text-text-muted text-xs ml-1">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </m.div>
        )}

        {/* Properties Grid or Empty State */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <m.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filtered.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </m.div>
          ) : (
            <m.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-navy-800/50 border border-navy-500/20 flex items-center justify-center mb-6">
                <SearchX className="w-8 h-8 text-navy-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                No Properties Found
              </h3>
              <p className="text-text-muted text-sm max-w-md mb-6">
                We couldn't find any properties matching your current filters.
                Try adjusting your criteria or{" "}
                <button
                  onClick={clearFilters}
                  className="text-gold-500 hover:text-gold-400 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  clear all filters
                </button>
                .
              </p>
            </m.div>
          )}
        </AnimatePresence>

        {/* Mobile CTA */}
        {filtered.length > 0 && (
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center md:hidden"
          >
            <button className="btn-outline">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </button>
          </m.div>
        )}
      </div>
    </section>
  );
}
