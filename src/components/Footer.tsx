import { useState } from "react";
import {
  ChevronRight,
  Send,
  CheckCircle,
  Globe,
  MessageCircle,
  Briefcase,
  Play,
} from "lucide-react";

const footerLinks = [
  {
    title: "Properties",
    links: [
      { label: "Luxury Homes", href: "#" },
      { label: "Penthouses", href: "#" },
      { label: "Commercial", href: "#" },
      { label: "International", href: "#" },
      { label: "New Developments", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Buying", href: "#" },
      { label: "Selling", href: "#" },
      { label: "Renting", href: "#" },
      { label: "Investing", href: "#" },
      { label: "Property Management", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Our Team", href: "#agents" },
      { label: "Careers", href: "#" },
      { label: "Press Room", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const socialLinks = [
  { icon: Globe, label: "Instagram", href: "#" },
  { icon: MessageCircle, label: "Twitter", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: Play, label: "YouTube", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-navy-800/50 border-t border-navy-500/20">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gold-500/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative px-6 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#hero" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center font-display text-navy-900 text-xl font-bold">
                P
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-text-primary">Prestige</span>
                <span className="text-gold-500"> Estates</span>
              </span>
            </a>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Curating exceptional properties for discerning clients worldwide.
              Your gateway to luxury real estate since 1999.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-navy-700/50 border border-navy-400/30 flex items-center justify-center text-text-secondary hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-sm font-bold text-text-primary uppercase tracking-wider mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-secondary text-sm hover:text-gold-500 transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter + Bottom */}
        <div className="mt-12 pt-8 border-t border-navy-500/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Newsletter */}
            <div className="w-full md:max-w-sm">
              <h4 className="font-display text-lg font-bold text-text-primary mb-2">
                Stay Updated
              </h4>
              <p className="text-text-muted text-sm mb-4">
                Get exclusive listings and market insights delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2.5 bg-navy-700/50 border border-navy-400/30 rounded-xl text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gold-500 text-navy-900 rounded-xl font-medium text-sm hover:bg-gold-400 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  {subscribed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>

            {/* Copyright */}
            <div className="text-text-muted text-sm">
              <p>&copy; {new Date().getFullYear()} Prestige Estates.</p>
              <p>All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
