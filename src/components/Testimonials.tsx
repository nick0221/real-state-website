import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import { testimonials } from "../data/properties";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
  };

  const paginate = (newDir: number) => {
    setDirection(newDir);
    setCurrent((prev) => {
      const next = prev + newDir;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-1/3 w-140 h-140 bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[20rem] h-80 bg-navy-600/20 rounded-full blur-[100px] pointer-events-none" />

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
            Testimonials
          </span>
          <h2 className="section-title mt-3">
            What Our{" "}
            <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Hear from the homeowners, investors, and families who trusted us with
            their real estate journey.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="bg-navy-800/50 border border-navy-500/20 rounded-2xl p-8 md:p-12 gold-glow">
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 md:w-12 md:h-12 text-gold-500/30 mb-6" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-gold-500 text-gold-500"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="font-display text-lg md:text-2xl text-text-primary leading-relaxed mb-8 italic">
                    &ldquo;{t.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <OptimizedImage
                      src={t.image}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gold-500/30"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold text-text-primary">
                        {t.name}
                      </div>
                      <div className="text-text-muted text-sm">{t.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-navy-800/50 border border-navy-500/20 flex items-center justify-center text-text-secondary hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-8 bg-gold-500"
                      : "w-2 bg-navy-400 hover:bg-navy-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-navy-800/50 border border-navy-500/20 flex items-center justify-center text-text-secondary hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
