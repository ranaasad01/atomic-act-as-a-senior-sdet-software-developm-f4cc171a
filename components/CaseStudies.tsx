"use client";

import { ArrowRight, Shield, Gauge, Terminal, Clock, GitBranch, Activity } from 'lucide-react';

interface CaseStudy {
  id: string;
  tag: string;
  tagColor: "green" | "amber";
  metric: string;
  metricLabel: string;
  title: string;
  description: string;
  impact: string[];
  stack: string[];
  icon: React.ElementType;
}

const caseStudies: CaseStudy[] = [
  {
    id: "parallel",
    tag: "E2E Optimization",
    tagColor: "green",
    metric: "70%",
    metricLabel: "Regression Time Reduced",
    title: "Parallel Execution at Scale",
    description:
      "Inherited a 4-hour monolithic Selenium regression suite blocking nightly deployments. Migrated to Playwright with sharded parallel execution across 16 workers, distributed via GitHub Actions matrix strategy.",
    impact: [
      "Regression runtime: 4h 12m \u2192 1h 16m",
      "Flakiness rate dropped from 18% to 0.4%",
      "Enabled 3x daily deployment cadence",
      "Saved 14 engineer-hours per sprint",
    ],
    stack: ["Playwright", "GitHub Actions", "Docker", "Allure Reports"],
    icon: Clock,
  },
  {
    id: "security",
    tag: "Shift-Left Security",
    tagColor: "amber",
    metric: "Day 0",
    metricLabel: "Vulnerabilities Caught",
    title: "Security Scans in GitLab CI",
    description:
      "Embedded OWASP ZAP DAST scans and Snyk SCA checks directly into the merge-request pipeline. Security findings now block merges before code reaches staging, eliminating the traditional pen-test bottleneck.",
    impact: [
      "23 critical CVEs caught pre-production in Q1",
      "MTTR for security issues reduced by 85%",
      "Compliance audit prep time cut from 3 weeks to 2 days",
      "Zero security incidents in 18 months post-implementation",
    ],
    stack: ["OWASP ZAP", "Snyk", "GitLab CI", "SonarQube"],
    icon: Shield,
  },
  {
    id: "data-driven",
    tag: "Framework Architecture",
    tagColor: "green",
    metric: "10x",
    metricLabel: "Test Coverage Increase",
    title: "Data-Driven Framework for Legacy Systems",
    description:
      "Designed a custom data-driven test framework for a 15-year-old COBOL-backed insurance platform with no REST API. Used JDBC direct-DB assertions, XML payload templating, and Excel-driven test data management.",
    impact: [
      "Coverage grew from 8% to 83% in 6 months",
      "Non-technical QAs can author test cases via Excel",
      "Regression suite runs fully unattended overnight",
      "Defect escape rate reduced by 91%",
    ],
    stack: ["Java", "TestNG", "JDBC", "Jenkins", "RestAssured"],
    icon: Terminal,
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 relative">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#f59e0b]/30 bg-[#f59e0b]/5 mb-4">
            <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-wider">Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-3">Results That Ship</h2>
          <p className="text-[#8b949e] font-mono text-sm max-w-xl mx-auto">
            Engineering quality outcomes measured in deployment velocity, defect escape rates, and system reliability.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => {
            const Icon = study.icon;
            const isGreen = study.tagColor === "green";
            const accentColor = isGreen ? "#10b981" : "#f59e0b";
            const borderColor = isGreen ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)";
            const bgAccent = isGreen ? "rgba(16,185,129,0.08)" : "rgba(245,158,11,0.08)";

            return (
              <div
                key={study.id}
                className="rounded-2xl border bg-[#161b22] overflow-hidden card-hover group flex flex-col"
                style={{
                  borderColor: borderColor,
                  boxShadow: "0 0 30px " + (isGreen ? "rgba(16,185,129,0.04)" : "rgba(245,158,11,0.04)"),
                }}
              >
                {/* Card top accent bar */}
                <div className="h-1 w-full" style={{ background: accentColor }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Tag + icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2.5 py-1 rounded font-mono text-xs font-medium"
                      style={{ background: bgAccent, color: accentColor, border: "1px solid " + borderColor }}
                    >
                      {study.tag}
                    </span>
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: bgAccent, border: "1px solid " + borderColor }}
                    >
                      <Icon className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                  </div>

                  {/* Metric */}
                  <div className="mb-4">
                    <div
                      className="text-5xl font-bold font-mono leading-none mb-1"
                      style={{ color: accentColor }}
                    >
                      {study.metric}
                    </div>
                    <div className="font-mono text-xs text-[#8b949e] uppercase tracking-wider">
                      {study.metricLabel}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#e6edf3] mb-3">{study.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-[#8b949e] leading-relaxed mb-5">{study.description}</p>

                  {/* Impact list */}
                  <div className="mb-5 space-y-2 flex-1">
                    <div className="font-mono text-xs text-[#8b949e] uppercase tracking-wider mb-2">
                      Key Outcomes
                    </div>
                    {study.impact.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: accentColor }}
                        />
                        <span className="text-xs text-[#8b949e] leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {study.stack.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded font-mono text-xs text-[#8b949e] border border-[#30363d] bg-[#0d1117]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    className="flex items-center gap-2 text-sm font-mono transition-colors group-hover:gap-3 duration-200"
                    style={{ color: accentColor }}
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom metrics banner */}
        <div
          className="mt-12 rounded-2xl border border-[#30363d] bg-[#161b22] p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { value: "8+", label: "Years SDET Experience", icon: Activity },
              { value: "1,200+", label: "Automated Test Cases", icon: Terminal },
              { value: "99.8%", label: "Pipeline Reliability", icon: Gauge },
              { value: "0", label: "Production Incidents (YTD)", icon: Shield },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <ItemIcon className="w-5 h-5 text-[#10b981]" />
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#10b981]">{item.value}</div>
                  <div className="text-xs text-[#8b949e] font-mono text-center">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
