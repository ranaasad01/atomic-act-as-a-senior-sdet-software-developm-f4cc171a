"use client";

import { useEffect, useState } from "react";
import { Check, Loader, AlertCircle, GitBranch, Shield, FileCode, Activity, Gauge } from 'lucide-react';

type StepStatus = "pending" | "running" | "passed" | "failed";

interface PipelineStep {
  id: number;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  duration: number;
  tests: string;
}

const steps: PipelineStep[] = [
  { id: 0, label: "Build", sublabel: "Compile & Lint", icon: GitBranch, duration: 2000, tests: "TypeScript · ESLint" },
  { id: 1, label: "Unit Tests", sublabel: "Jest / Vitest", icon: FileCode, duration: 2500, tests: "847 tests" },
  { id: 2, label: "Contract Tests", sublabel: "Pact / OpenAPI", icon: Shield, duration: 2000, tests: "32 contracts" },
  { id: 3, label: "E2E Suite", sublabel: "Playwright", icon: Activity, duration: 3000, tests: "142 scenarios" },
  { id: 4, label: "Performance Gate", sublabel: "k6 / Artillery", icon: Gauge, duration: 2500, tests: "p95 < 200ms" },
];

function getStepColors(status: StepStatus) {
  if (status === "passed") return { border: "#10b981", bg: "rgba(16,185,129,0.12)", text: "#10b981" };
  if (status === "running") return { border: "#f59e0b", bg: "rgba(245,158,11,0.12)", text: "#f59e0b" };
  if (status === "failed") return { border: "#ef4444", bg: "rgba(239,68,68,0.12)", text: "#ef4444" };
  return { border: "#30363d", bg: "rgba(48,54,61,0.2)", text: "#8b949e" };
}

export default function PipelineStepper() {
  const [statuses, setStatuses] = useState<StepStatus[]>(steps.map(() => "pending"));
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const runPipeline = () => {
    setStatuses(steps.map(() => "pending"));
    setCompleted(false);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;

    let cancelled = false;

    const runStep = (index: number) => {
      if (cancelled) return;
      if (index >= steps.length) {
        setRunning(false);
        setCompleted(true);
        return;
      }
      setStatuses((prev) => {
        const next = [...prev];
        next[index] = "running";
        return next;
      });
      const timer = setTimeout(() => {
        if (cancelled) return;
        setStatuses((prev) => {
          const next = [...prev];
          next[index] = "passed";
          return next;
        });
        runStep(index + 1);
      }, steps[index].duration);
      return timer;
    };

    runStep(0);
    return () => { cancelled = true; };
  }, [running]);

  useEffect(() => {
    const t = setTimeout(() => runPipeline(), 800);
    return () => clearTimeout(t);
  }, []);

  const totalTime = steps.reduce((acc, s) => acc + s.duration, 0) / 1000;

  return (
    <section id="pipeline" className="py-20 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245,158,11,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#f59e0b]/30 bg-[#f59e0b]/5 mb-4">
            <span className="font-mono text-xs text-[#f59e0b] uppercase tracking-wider">CI/CD Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-3">Automated Quality Gates</h2>
          <p className="text-[#8b949e] font-mono text-sm max-w-xl mx-auto">
            Every commit triggers a full reliability pipeline. Zero manual intervention.
          </p>
        </div>

        <div
          className="rounded-2xl border border-[#30363d] bg-[#161b22] p-6 sm:p-8"
          style={{ boxShadow: "0 0 40px rgba(245,158,11,0.05)" }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#30363d]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
              <span className="ml-3 font-mono text-xs text-[#8b949e]">github-actions / quality-pipeline.yml</span>
            </div>
            <div className="flex items-center gap-3">
              {completed && (
                <span className="font-mono text-xs text-[#10b981] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  All gates passed
                </span>
              )}
              <button
                onClick={runPipeline}
                disabled={running}
                className="px-3 py-1 text-xs font-mono rounded border transition-all duration-150"
                style={{
                  borderColor: running ? "#30363d" : "#f59e0b",
                  color: running ? "#8b949e" : "#f59e0b",
                  background: running ? "transparent" : "rgba(245,158,11,0.08)",
                  cursor: running ? "not-allowed" : "pointer",
                }}
              >
                {running ? "Running..." : "Re-run Pipeline"}
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col lg:flex-row items-stretch gap-2 lg:gap-0">
            {steps.map((step, index) => {
              const status = statuses[index];
              const colors = getStepColors(status);
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="flex flex-row lg:flex-col items-center lg:flex-1">
                  {/* Card */}
                  <div
                    className="flex-1 lg:flex-none flex flex-row lg:flex-col items-center gap-3 lg:gap-2 p-4 rounded-xl border transition-all duration-500 w-full"
                    style={{
                      borderColor: colors.border,
                      background: colors.bg,
                      boxShadow: status === "running"
                        ? "0 0 20px rgba(245,158,11,0.2)"
                        : status === "passed"
                        ? "0 0 15px rgba(16,185,129,0.08)"
                        : "none",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid " + colors.border }}
                    >
                      {status === "running" ? (
                        <Loader className="w-5 h-5 animate-spin" style={{ color: colors.text }} />
                      ) : status === "passed" ? (
                        <Check className="w-5 h-5" style={{ color: colors.text }} />
                      ) : status === "failed" ? (
                        <AlertCircle className="w-5 h-5" style={{ color: colors.text }} />
                      ) : (
                        <Icon className="w-5 h-5" style={{ color: colors.text }} />
                      )}
                    </div>

                    <div className="flex-1 lg:text-center">
                      <div className="font-mono text-sm font-semibold" style={{ color: colors.text }}>
                        {step.label}
                      </div>
                      <div className="font-mono text-xs text-[#8b949e]">{step.sublabel}</div>
                      <div
                        className="mt-1 inline-block px-2 py-0.5 rounded text-xs font-mono"
                        style={{
                          background: "rgba(0,0,0,0.3)",
                          color: status === "passed" ? "#10b981" : status === "running" ? "#f59e0b" : "#8b949e",
                          border: "1px solid " + colors.border,
                        }}
                      >
                        {step.tests}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="hidden lg:block w-full h-0.5 rounded-full bg-[#30363d] overflow-hidden mt-1">
                      {status === "passed" && <div className="h-full w-full bg-[#10b981] rounded-full" />}
                      {status === "running" && (
                        <div
                          className="h-full bg-[#f59e0b] rounded-full"
                          style={{ width: "60%", animation: "none" }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Connector */}
                  {!isLast && (
                    <>
                      <div
                        className="hidden lg:block h-px flex-shrink-0 w-4 transition-colors duration-500"
                        style={{ background: statuses[index] === "passed" ? "#10b981" : "#30363d" }}
                      />
                      <div
                        className="lg:hidden w-px h-4 flex-shrink-0 transition-colors duration-500"
                        style={{ background: statuses[index] === "passed" ? "#10b981" : "#30363d" }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary */}
          {completed && (
            <div className="mt-8 pt-6 border-t border-[#30363d] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-mono text-sm text-[#10b981]">Pipeline completed successfully</span>
              </div>
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Build Time", value: totalTime + "s" },
                  { label: "Tests Run", value: "1,021" },
                  { label: "Coverage", value: "94.2%" },
                  { label: "Status", value: "PASSED" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="font-mono text-xs text-[#8b949e]">{item.label}</div>
                    <div className="font-mono text-sm font-semibold text-[#10b981]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
