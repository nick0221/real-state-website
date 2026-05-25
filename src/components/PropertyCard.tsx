import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bed, Bath, Maximize, MapPin, BarChart3, Check } from "lucide-react";
import type { Property } from "../data/properties";
import { formatPrice } from "../utils/format";
import { useCompare } from "../context/CompareContext";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  const navigate = useNavigate();
  const { toggleProperty, isSelected, isFull } = useCompare();
  const selected = isSelected(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => navigate(`/property/${property.id}`)}
      className="group relative bg-navy-800/50 border border-navy-500/20 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all duration-500 cursor-pointer"
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/property/${property.id}`)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              property.status === "available"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : property.status === "pending"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
            }`}
          >
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/20 text-gold-400 border border-gold-500/30 backdrop-blur-sm">
            For {property.type === "sale" ? "Sale" : "Rent"}
          </span>
        </div>

        {/* Compare Toggle */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Compare checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleProperty(property);
            }}
            className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 cursor-pointer ${
              selected
                ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30"
                : "bg-navy-900/60 text-text-primary hover:bg-gold-500/20 hover:text-gold-500 opacity-0 group-hover:opacity-100"
            }`}
            aria-label={selected ? `Remove ${property.title} from comparison` : `Add ${property.title} to comparison`}
            title={isFull && !selected ? "Max 3 properties to compare" : "Compare"}
          >
            {selected ? (
              <Check className="w-4 h-4" />
            ) : (
              <BarChart3 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Price on image */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-2xl font-bold text-white drop-shadow-lg">
            {formatPrice(property.price, property.type)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-text-primary mb-1 group-hover:text-gold-500 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-start gap-2 text-text-muted text-sm mb-4">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-500/70" />
          <span>{property.address}</span>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between py-3 border-t border-navy-500/20">
          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Bed className="w-4 h-4 text-gold-500/70" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Bath className="w-4 h-4 text-gold-500/70" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-secondary text-sm">
            <Maximize className="w-4 h-4 text-gold-500/70" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/property/${property.id}`);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-3 py-2.5 rounded-xl bg-navy-700/50 border border-navy-400/30 text-text-secondary text-sm font-medium hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300 cursor-pointer"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
