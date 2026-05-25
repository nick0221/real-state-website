import { motion } from "framer-motion";
import { Building, Handshake, ShieldCheck, PieChart, Key, Home } from "lucide-react";

const services = [
  {
    icon: Building,
    title: "Property Sales",
    description:
      "Strategic marketing and expert negotiation to sell your property at the best value in the shortest time.",
    color: "from-gold-500 to-amber-600",
  },
  {
    icon: Home,
    title: "Luxury Rentals",
    description:
      "An exclusive portfolio of premium rental properties, from urban penthouses to coastal villas.",
    color: "from-gold-400 to-gold-600",
  },
  {
    icon: Handshake,
    title: "Buyer Representation",
    description:
      "Dedicated advisors who guide you through every step, from property search to closing the deal.",
    color: "from-amber-400 to-gold-500",
  },
  {
    icon: PieChart,
    title: "Investment Advisory",
    description:
      "Data-driven insights and market intelligence to maximize your real estate investment returns.",
    color: "from-gold-500 to-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "Property Management",
    description:
      "Comprehensive management services ensuring your property is maintained and tenants are satisfied.",
    color: "from-amber-500 to-gold-400",
  },
  {
    icon: Key,
    title: "Concierge Services",
    description:
      "White-glove service including interior design, renovation, and lifestyle management for homeowners.",
    color: "from-gold-600 to-amber-600",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding relative overflow-hidden bg-navy-800/30 scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/4 w-[25rem] h-[25rem] bg-gold-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase">
            Our Services
          </span>
          <h2 className="section-title mt-3">
            Comprehensive Real Estate
            <br />
            <span className="gradient-text">Solutions</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            From first consultation to final handshake, we provide end-to-end
            services tailored to your unique real estate goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-navy-800/50 border border-navy-500/20 rounded-2xl p-8 hover:border-gold-500/30 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-3.5 mb-5 relative`}>
                  <Icon className="w-full h-full text-navy-900" />
                </div>

                <h3 className="font-display text-xl font-bold text-text-primary mb-3 group-hover:text-gold-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500/50 to-gold-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
