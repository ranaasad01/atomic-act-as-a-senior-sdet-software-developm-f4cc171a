"use client";

import { Shield, Gauge, Terminal, ArrowRight, Code2 as Github, Briefcase as Linkedin, Mail } from 'lucide-react';

const stats = [
  { icon: Shield, label: "Zero-Defect Releases", value: "99.8%", color: "green" },
  { icon: Gauge, label: "Test Coverage", value: "94%", color: "amber" },
  { icon: Terminal, label: "Automated Suites", value: "1,200+", color: "green" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 185, 129, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span className="font-mono text-xs text-[#10b981] tracking-wider uppercase">
              Available for Senior SDET Roles
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-[#e6edf3]">Alex Chen</span>
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-mono font-medium text-[#10b981]">
              Lead Automation &amp; Quality Engineer
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8b949e] leading-relaxed mb-4 font-mono">
            Specializing in high-scale E2E frameworks, CI/CD reliability,
            <br className="hidden sm:block" />
            and performance gatekeeping.
          </p>
          <p className="max-w-xl mx-auto text-sm text-[#8b949e]/70 mb-10">
            8+ years engineering test infrastructure that catches bugs before users do.
            Trusted by teams shipping millions of transactions daily.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#case-studies"
              className="group flex items-center gap-2 px-6 py-3 bg-[#10b981] text-[#0d1117] font-semibold rounded-lg hover:bg-[#34d399] transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              View Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#terminal"
              className="flex items-center gap-2 px-6 py-3 border border-[#30363d] text-[#8b949e] font-mono rounded-lg hover:border-[#10b981]/50 hover:text-[#10b981] transition-all duration-200"
            >
              <Terminal className="w-4 h-4" />
              Watch Tests Run
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const isGreen = stat.color === "green";
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 p-5 rounded-xl border bg-[#161b22]/80 backdrop-blur-sm card-hover"
                  style={{
                    borderColor: isGreen ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)",
                    boxShadow: isGreen
                      ? "0 0 20px rgba(16,185,129,0.06)"
                      : "0 0 20px rgba(245,158,11,0.06)",
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: isGreen ? "#10b981" : "#f59e0b" }}
                  />
                  <span
                    className="text-2xl font-bold font-mono"
                    style={{ color: isGreen ? "#10b981" : "#f59e0b" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#8b949e] text-center">{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-[#8b949e] hover:text-[#10b981] transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span className="text-[#30363d]">|</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-[#8b949e] hover:text-[#10b981] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <span className="text-[#30363d]">|</span>
            <a
              href="mailto:alex@sdet.dev"
              className="flex items-center gap-2 text-sm font-mono text-[#8b949e] hover:text-[#10b981] transition-colors"
            >
              <Mail className="w-4 h-4" />
              alex@sdet.dev
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0d1117)",
        }}
      />
    </section>
  );
}
