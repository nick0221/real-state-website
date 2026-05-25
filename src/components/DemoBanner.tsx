import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "demo-banner-dismissed";
export const BANNER_HEIGHT = 40;

export default function DemoBanner() {
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== "true";
  });

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
    window.dispatchEvent(new Event("demo-banner-change"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: BANNER_HEIGHT }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-60 overflow-hidden"
        >
          <div className="flex items-center justify-center h-10 px-4 bg-linear-to-r from-amber-500/10 via-gold-500/25 to-amber-500/10 border-b border-gold-500/30 backdrop-blur-sm">
            <span className="text-xs sm:text-sm font-medium text-gold-300 tracking-wide">
              📋 Demo Site &mdash; This website is for demonstration purposes only.
            </span>
            <button
              onClick={dismiss}
              className="ml-3 p-1 rounded-full hover:bg-gold-500/20 transition-colors text-gold-400 hover:text-gold-300 cursor-pointer shrink-0"
              aria-label="Dismiss demo notice"
            >
              <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
