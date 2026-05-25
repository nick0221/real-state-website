import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import type { Property, Agent } from "../data/properties";

interface PropertyContactFormProps {
  property: Property;
  agent: Agent;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function PropertyContactForm({
  property,
  agent,
}: PropertyContactFormProps) {
  const [expanded, setExpanded] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: `Hi ${agent.name}, I'm interested in ${property.title}. I'd love to schedule a viewing. Please let me know your availability.\n\nBest regards,`,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (form.phone.trim() && !/^[\d\s\-\(\)\+\.]{7,}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Please write at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    // Simulate sending — in production this would call an API
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm((prev) => ({
      ...prev,
      name: "",
      email: "",
      phone: "",
      message: "",
    }));
    setErrors({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-navy-800/50 border border-navy-500/20 rounded-2xl overflow-hidden gold-glow"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full p-5 cursor-pointer text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 text-gold-500" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-text-primary">
              Send an Inquiry
            </h3>
            <p className="text-text-muted text-xs mt-0.5">
              Message {agent.name.split(" ")[0]} about this property
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-text-muted"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Form Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ─── Success State ─── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                    </div>
                    <h4 className="font-display text-base font-semibold text-text-primary mb-1">
                      Inquiry Sent!
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed mb-4">
                      Your message about{" "}
                      <span className="text-gold-500">{property.title}</span>{" "}
                      has been sent to {agent.name}. They'll get back to you
                      shortly.
                    </p>
                    <div className="flex items-center justify-center gap-3 text-xs text-text-muted mb-4">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gold-500/70" />
                        {agent.email}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gold-500/70" />
                        {agent.phone}
                      </div>
                    </div>
                    <button
                      onClick={resetForm}
                      className="text-xs text-gold-500 hover:text-gold-400 underline underline-offset-2 transition-colors"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  /* ─── Form ─── */
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-3"
                  >
                    {/* Property preview chip */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-navy-700/40 border border-navy-500/15 mb-1">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-text-primary truncate">
                          {property.title}
                        </div>
                        <div className="text-gold-500 text-xs font-semibold">
                          {property.type === "sale"
                            ? "For Sale"
                            : "For Rent"}{" "}
                          — ${property.price.toLocaleString()}
                          {property.type === "rent" && "/mo"}
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-1.5">
                        <User className="w-3 h-3 text-gold-500/70" />
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Your full name"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-navy-700/40 border text-text-primary placeholder:text-navy-400 outline-none transition-all duration-300 ${
                          errors.name
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-navy-400/20 focus:border-gold-500/50"
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-[11px] mt-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-1.5">
                        <Mail className="w-3 h-3 text-gold-500/70" />
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-navy-700/40 border text-text-primary placeholder:text-navy-400 outline-none transition-all duration-300 ${
                          errors.email
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-navy-400/20 focus:border-gold-500/50"
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-[11px] mt-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-1.5">
                        <Phone className="w-3 h-3 text-gold-500/70" />
                        Phone{" "}
                        <span className="text-navy-400 font-normal">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-navy-700/40 border text-text-primary placeholder:text-navy-400 outline-none transition-all duration-300 ${
                          errors.phone
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-navy-400/20 focus:border-gold-500/50"
                        }`}
                      />
                      {errors.phone && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-[11px] mt-1"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-1.5">
                        <MessageSquare className="w-3 h-3 text-gold-500/70" />
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        placeholder="Tell us what you're looking for..."
                        className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-navy-700/40 border text-text-primary placeholder:text-navy-400 outline-none resize-none transition-all duration-300 ${
                          errors.message
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-navy-400/20 focus:border-gold-500/50"
                        }`}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-[11px] mt-1"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-3 rounded-xl bg-gold-500 text-navy-900 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gold-400 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {sending ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Send className="w-4 h-4" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Inquiry
                        </>
                      )}
                    </motion.button>

                    <p className="text-[10px] text-navy-400 text-center">
                      Your information will be shared with {agent.name} at
                      Prestige Estates.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
