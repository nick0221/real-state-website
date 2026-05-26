import { m, AnimatePresence } from "../utils/motion";
import { useNavigate } from "react-router-dom";
import { X, BarChart3, ArrowRight } from "lucide-react";
import { useCompare } from "../context/CompareContext";
import { formatPrice } from "../utils/format";

export default function CompareBar() {
  const { selected, toggleProperty, clearAll } = useCompare();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {selected.length > 0 && (
        <m.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-xl border-t border-navy-500/30 shadow-[0_-8px_30px_rgba(0,0,0,0.4)]"
        >
          <div className="container-main px-4 md:px-6 py-3 flex items-center gap-3 md:gap-4">
            {/* Label */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <BarChart3 className="w-4 h-4 text-gold-500" />
              <span className="text-text-secondary text-sm font-medium whitespace-nowrap">
                Compare ({selected.length}/3)
              </span>
            </div>

            {/* Selected cards */}
            <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto">
              {Array.from({ length: 3 }).map((_, i) => {
                const p = selected[i];
                return (
                  <m.div
                    key={p?.id ?? `empty-${i}`}
                    initial={p ? { opacity: 0, x: -30, scale: 0.9 } : false}
                    animate={p ? { opacity: 1, x: 0, scale: 1 } : {}}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1], delay: i * 0.08 }}
                    className={`relative flex items-center gap-2 p-1.5 rounded-xl border shrink-0 min-w-0 ${
                      p
                        ? "bg-navy-800/80 border-gold-500/25"
                        : "bg-navy-800/30 border-navy-500/10"
                    }`}
                    style={{ width: 220 }}
                  >
                    {p ? (
                      <>
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium text-text-primary truncate">
                            {p.title}
                          </div>
                          <div className="text-gold-500 text-xs font-semibold">
                            {formatPrice(p.price, p.type)}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleProperty(p)}
                          className="shrink-0 w-5 h-5 rounded-full bg-navy-700/80 flex items-center justify-center text-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          aria-label={`Remove ${p.title} from comparison`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-10 h-10 rounded-lg bg-navy-700/30 flex items-center justify-center shrink-0">
                          <span className="text-navy-400 text-xs font-medium">
                            {i + 1}
                          </span>
                        </div>
                        <span className="text-navy-400 text-xs">
                          Add property
                        </span>
                      </div>
                    )}
                  </m.div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={clearAll}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-text-muted hover:text-text-secondary hover:bg-navy-700/50 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
              {selected.length >= 2 && (
                <m.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  onClick={() => navigate("/compare")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 text-navy-900 font-semibold text-sm hover:bg-gold-400 transition-all duration-300 cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Compare Now</span>
                  <ArrowRight className="w-4 h-4" />
                </m.button>
              )}
              {/* Mobile compare count badge */}
              <span className="md:hidden text-text-muted text-xs">
                {selected.length}/3
              </span>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
