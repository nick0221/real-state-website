import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { submitContactForm } from "../utils/api";

// Fix Leaflet default marker icon issue with bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(L.Icon.Default as any).mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const OFFICE_COORDS: [number, number] = [34.0679, -118.4051]; // Beverly Hills

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (310) 555-0142",
      href: "tel:+13105550142",
    },
    {
      icon: Mail,
      label: "Email",
      value: "hello@prestigeestates.com",
      href: "mailto:hello@prestigeestates.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "9420 Wilshire Blvd, Beverly Hills, CA 90212",
      href: "https://maps.google.com",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon–Sat: 9AM – 7PM",
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden scroll-mt-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/3 w-140 h-140 bg-gold-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-navy-600/20 rounded-full blur-[100px] pointer-events-none" />

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
            Get In Touch
          </span>
          <h2 className="section-title mt-3">
            Let's Find Your{" "}
            <span className="gradient-text">Perfect Property</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Ready to start your real estate journey? Reach out and let our
            experts guide you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="block group bg-navy-800/50 border border-navy-500/20 rounded-xl p-5 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon className="w-6 h-6 text-gold-500 mb-3" />
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                        {info.label}
                      </div>
                      <div className="text-sm text-text-primary group-hover:text-gold-500 transition-colors">
                        {info.value}
                      </div>
                    </a>
                  ) : (
                    <div className="bg-navy-800/50 border border-navy-500/20 rounded-xl p-5">
                      <Icon className="w-6 h-6 text-gold-500 mb-3" />
                      <div className="text-xs text-text-muted uppercase tracking-wider mb-1">
                        {info.label}
                      </div>
                      <div className="text-sm text-text-primary">{info.value}</div>
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="sm:col-span-2 bg-navy-800/50 border border-navy-500/20 rounded-xl overflow-hidden h-64 hover:border-gold-500/30 transition-all duration-300 gold-glow"
            >
              <MapContainer
                center={OFFICE_COORDS}
                zoom={15}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}{r}.png"
                />
                <Marker position={OFFICE_COORDS}>
                  <Popup>
                    <div className="font-semibold">Prestige Estates</div>
                    <div className="text-sm">9420 Wilshire Blvd<br />Beverly Hills, CA 90212</div>
                  </Popup>
                </Marker>
              </MapContainer>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-navy-800/50 border border-navy-500/20 rounded-2xl p-8 gold-glow"
            >
              <h3 className="font-display text-2xl font-semibold text-text-primary mb-6">
                Send Us a Message
              </h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-navy-700/50 border border-navy-400/30 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-500/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-navy-700/50 border border-navy-400/30 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-500/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-navy-700/50 border border-navy-400/30 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-500/50 transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-navy-700/50 border border-navy-400/30 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                    placeholder="Tell us about your ideal property..."
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
