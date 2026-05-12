"use client";

import { useState, useEffect } from "react";
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "Frameworks", href: "#frameworks" },
  { label: "Terminal", href: "#terminal" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      className={
        scrolled
          ? "bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d] transition-all duration-300"
          : "bg-transparent transition-all duration-300"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded border border-[#10b981]/40 bg-[#10b981]/10 flex items-center justify-center group-hover:border-[#10b981] transition-all duration-200">
              <Shield className="w-4 h-4 text-[#10b981]" />
            </div>
            <span className="font-mono text-sm font-semibold">
              <span className="text-[#10b981]">alex</span>
              <span className="text-[#8b949e]">@sdet</span>
              <span className="text-[#10b981]">:~$</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-mono text-[#8b949e] hover:text-[#10b981] rounded transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-3 px-4 py-1.5 text-sm font-mono font-medium bg-[#10b981]/10 border border-[#10b981]/40 text-[#10b981] rounded hover:bg-[#10b981]/20 transition-all duration-150"
            >
              Hire Me
            </a>
          </div>

          <button
            className="md:hidden p-2 text-[#8b949e] hover:text-[#10b981] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#161b22] border-b border-[#30363d]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 text-sm font-mono text-[#8b949e] hover:text-[#10b981] rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
