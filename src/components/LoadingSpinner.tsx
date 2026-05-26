import { m } from "../utils/motion";
import { Building2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900">
      <div className="text-center">
        <m.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-linear-to-br from-gold-500 to-gold-700 flex items-center justify-center mx-auto mb-4"
        >
          <Building2 className="w-8 h-8 text-navy-900" />
        </m.div>
        <p className="text-text-muted text-sm">Loading...</p>
      </div>
    </div>
  );
}
