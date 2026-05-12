import { Shield, Code2 as Github, Briefcase as Linkedin, Mail, Terminal } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-[#30363d] bg-[#161b22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded border border-[#10b981]/40 bg-[#10b981]/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#10b981]" />
              </div>
              <span className="font-mono text-sm font-semibold text-[#e6edf3]">
                Alex Chen <span className="text-[#10b981]">/ SDET</span>
              </span>
            </div>
            <p className="text-sm text-[#8b949e] leading-relaxed max-w-xs">
              Lead Automation &amp; Quality Engineer. Building test infrastructure that scales with your ambitions.
            </p>
            <div className="mt-4 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-xs text-[#10b981]">Open to senior SDET opportunities</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs text-[#8b949e] uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: "Pipeline", href: "#pipeline" },
                { label: "Frameworks", href: "#frameworks" },
                { label: "Terminal", href: "#terminal" },
                { label: "Case Studies", href: "#case-studies" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-sm text-[#8b949e] hover:text-[#10b981] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs text-[#8b949e] uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:alex@sdet.dev"
                className="flex items-center gap-2 font-mono text-sm text-[#8b949e] hover:text-[#10b981] transition-colors"
              >
                <Mail className="w-4 h-4" />
                alex@sdet.dev
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-[#8b949e] hover:text-[#10b981] transition-colors"
              >
                <Github className="w-4 h-4" />
                github.com/alexchen-sdet
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-[#8b949e] hover:text-[#10b981] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                linkedin.com/in/alexchen
              </a>
            </div>

            <div className="mt-6">
              <a
                href="mailto:alex@sdet.dev"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981]/10 border border-[#10b981]/40 text-[#10b981] font-mono text-sm rounded-lg hover:bg-[#10b981]/20 hover:border-[#10b981] transition-all duration-150"
              >
                <Terminal className="w-4 h-4" />
                Start a Conversation
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-xs text-[#8b949e]">
            &copy; {year} Alex Chen. Built for Reliability.
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#8b949e]">
            <span className="text-[#10b981]">$</span>
            <span>quality --mode=production --coverage=94 --flakiness=0.4%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
