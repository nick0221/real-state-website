import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { properties } from "../data/properties";

export default function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured || p.status === "available");

  return (
    <section id="featured" className="section-padding relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gold-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
              Featured Properties
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
          <motion.button
            whileHover={{ x: 4 }}
            className="btn-outline shrink-0 hidden md:inline-flex"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center md:hidden"
        >
          <button className="btn-outline">
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
