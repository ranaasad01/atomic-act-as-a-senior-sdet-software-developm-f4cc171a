"use client";

import { Globe, Zap, Gauge, Server } from 'lucide-react';

interface Tool {
  name: string;
  badge: string;
  level: number;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  accent: "green" | "amber";
  description: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    id: "web",
    label: "Web Automation",
    icon: Globe,
    accent: "green",
    description: "Browser-level E2E testing at scale",
    tools: [
      { name: "Playwright", badge: "Primary", level: 95 },
      { name: "Cypress", badge: "E2E", level: 88 },
      { name: "Selenium", badge: "Legacy", level: 80 },
    ],
  },
  {
    id: "api",
    label: "API Testing",
    icon: Zap,
    accent: "amber",
    description: "Contract & integration validation",
    tools: [
      { name: "RestAssured", badge: "Java", level: 90 },
      { name: "Supertest", badge: "Node", level: 85 },
      { name: "Postman/Newman", badge: "CI", level: 92 },
    ],
  },
  {
    id: "perf",
    label: "Performance",
    icon: Gauge,
    accent: "green",
    description: "Load, stress & soak testing",
    tools: [
      { name: "k6", badge: "Primary", level: 93 },
      { name: "JMeter", badge: "Load", level: 82 },
      { name: "Artillery", badge: "Cloud", level: 78 },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    icon: Server,
    accent: "amber",
    description: "Pipeline & containerization",
    tools: [
      { name: "Docker", badge: "Containers", level: 91 },
      { name: "GitHub Actions", badge: "CI/CD", level: 94 },
      { name: "Jenkins", badge: "Enterprise", level: 85 },
    ],
  },
];

function ToolBar({ level, accent }: { level: number; accent: "green" | "amber" }) {
  const color = accent === "green" ? "#10b981" : "#f59e0b";
  return (
    <div className="w-full h-1 rounded-full bg-[#30363d] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000"
        style={{ width: level + "%", background: color }}
      />
    </div>
  );
}

export default function FrameworksGrid() {
  return (
    <section id="frameworks" className="py-20 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16, 185, 129, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#10b981]/30 bg-[#10b981]/5 mb-4">
            <span className="font-mono text-xs text-[#10b981] uppercase tracking-wider">Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-3">Frameworks &amp; Tooling</h2>
          <p className="text-[#8b949e] font-mono text-sm max-w-xl mx-auto">
            Battle-tested tools deployed in production pipelines serving millions of users.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isGreen = cat.accent === "green";
            const accentColor = isGreen ? "#10b981" : "#f59e0b";
            const borderColor = isGreen ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)";
            const bgColor = isGreen ? "rgba(16,185,129,0.05)" : "rgba(245,158,11,0.05)";

            return (
              <div
                key={cat.id}
                className="rounded-xl border bg-[#161b22] p-5 card-hover group"
                style={{
                  borderColor: borderColor,
                  boxShadow: "0 0 20px " + (isGreen ? "rgba(16,185,129,0.04)" : "rgba(245,158,11,0.04)"),
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: bgColor, border: "1px solid " + borderColor }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <div className="font-mono text-sm font-semibold text-[#e6edf3]">{cat.label}</div>
                    <div className="font-mono text-xs text-[#8b949e]">{cat.description}</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#30363d] mb-4" />

                {/* Tools list */}
                <div className="space-y-3">
                  {cat.tools.map((tool) => (
                    <div key={tool.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-[#e6edf3]">{tool.name}</span>
                          <span
                            className="px-1.5 py-0.5 rounded text-xs font-mono"
                            style={{
                              background: bgColor,
                              color: accentColor,
                              border: "1px solid " + borderColor,
                            }}
                          >
                            {tool.badge}
                          </span>
                        </div>
                        <span className="font-mono text-xs" style={{ color: accentColor }}>
                          {tool.level}%
                        </span>
                      </div>
                      <ToolBar level={tool.level} accent={cat.accent} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional badges row */}
        <div className="mt-10 text-center">
          <p className="font-mono text-xs text-[#8b949e] mb-4 uppercase tracking-wider">Also proficient in</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Pact", "WireMock", "TestContainers", "Allure Reports",
              "SonarQube", "OWASP ZAP", "Grafana", "InfluxDB",
              "AWS CodePipeline", "GitLab CI", "Terraform", "Kubernetes",
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-full font-mono text-xs text-[#8b949e] border border-[#30363d] bg-[#161b22] hover:border-[#10b981]/40 hover:text-[#10b981] transition-colors duration-150"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
