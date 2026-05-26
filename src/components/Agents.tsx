import { motion } from "framer-motion";
import { Phone, Mail, Award } from "lucide-react";
import { agents } from "../data/properties";
import OptimizedImage from "./OptimizedImage";

export default function Agents() {
  return (
    <section id="agents" className="section-padding relative overflow-hidden bg-navy-800/30 scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-1/4 right-1/3 w-120 h-120 bg-gold-500/3 rounded-full blur-[120px] pointer-events-none" />

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
            Our Team
          </span>
          <h2 className="section-title mt-3">
            Meet Our{" "}
            <span className="gradient-text">Expert Agents</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Seasoned professionals dedicated to delivering exceptional results
            through market expertise and personalized service.
          </p>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-navy-800/50 border border-navy-500/20 rounded-2xl p-6 text-center hover:border-gold-500/30 transition-all duration-500"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Avatar */}
              <div className="relative mx-auto mb-5 w-28 h-28">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-navy-400/30 group-hover:border-gold-500/50 transition-all duration-500">
                  <OptimizedImage
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-[-4px] rounded-full border border-gold-500/0 group-hover:border-gold-500/20 transition-all duration-500" />
              </div>

              {/* Info */}
              <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-gold-500 transition-colors">
                {agent.name}
              </h3>
              <p className="text-gold-500 text-sm font-medium mt-1">
                {agent.title}
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-4 mt-4 mb-5">
                <div className="flex items-center gap-1.5 text-text-muted text-xs">
                  <Award className="w-3.5 h-3.5 text-gold-500/70" />
                  <span>{agent.propertiesSold}+ sold</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-muted text-xs">
                  <Award className="w-3.5 h-3.5 text-gold-500/70" />
                  <span>{agent.experience} yrs</span>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-2">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-700/50 border border-navy-400/30 text-text-secondary text-sm hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-700/50 border border-navy-400/30 text-text-secondary text-sm hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
