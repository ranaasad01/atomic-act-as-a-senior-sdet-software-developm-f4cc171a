"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, Play, RotateCcw } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: "command" | "info" | "pass" | "fail" | "warn" | "summary" | "blank";
  delay: number;
}

const terminalScript: TerminalLine[] = [
  { text: "$ npx playwright test smoke-test-suite.spec.ts --reporter=list", type: "command", delay: 0 },
  { text: "", type: "blank", delay: 300 },
  { text: "Running 12 tests using 4 workers", type: "info", delay: 600 },
  { text: "", type: "blank", delay: 800 },
  { text: "  Running: smoke-test-suite.spec.ts...", type: "info", delay: 1000 },
  { text: "", type: "blank", delay: 1200 },
  { text: "  \u2713  Authentication Flow \u203a Login with valid credentials (452ms)", type: "pass", delay: 1600 },
  { text: "  \u2713  Authentication Flow \u203a Session persistence across tabs (318ms)", type: "pass", delay: 2100 },
  { text: "  \u2713  Authentication Flow \u203a Logout clears all tokens (201ms)", type: "pass", delay: 2500 },
  { text: "  \u2713  Payment Gateway Mock \u203a Successful card charge (890ms)", type: "pass", delay: 3100 },
  { text: "  \u2713  Payment Gateway Mock \u203a Declined card returns 402 (445ms)", type: "pass", delay: 3600 },
  { text: "  \u2713  Payment Gateway Mock \u203a Idempotency key prevents duplicate charge (612ms)", type: "pass", delay: 4200 },
  { text: "  \u2713  User Profile \u203a Update email triggers verification (334ms)", type: "pass", delay: 4700 },
  { text: "  \u2713  User Profile \u203a Avatar upload validates file type (289ms)", type: "pass", delay: 5100 },
  { text: "  \u2713  Search \u203a Full-text search returns ranked results (178ms)", type: "pass", delay: 5500 },
  { text: "  \u2713  Search \u203a Filters persist across pagination (223ms)", type: "pass", delay: 5900 },
  { text: "  \u2713  Notifications \u203a Real-time push via WebSocket (567ms)", type: "pass", delay: 6400 },
  { text: "  \u2713  Notifications \u203a Email fallback on socket timeout (412ms)", type: "pass", delay: 6900 },
  { text: "", type: "blank", delay: 7200 },
  { text: "  Running: api-contract-suite.spec.ts...", type: "info", delay: 7400 },
  { text: "", type: "blank", delay: 7600 },
  { text: "  \u2713  GET /api/users \u203a Response matches OpenAPI schema (89ms)", type: "pass", delay: 7900 },
  { text: "  \u2713  POST /api/orders \u203a 201 with valid payload (134ms)", type: "pass", delay: 8300 },
  { text: "  \u2713  DELETE /api/sessions \u203a 204 on valid token (67ms)", type: "pass", delay: 8700 },
  { text: "", type: "blank", delay: 9000 },
  { text: "  Running: performance-gate.spec.ts...", type: "info", delay: 9200 },
  { text: "", type: "blank", delay: 9400 },
  { text: "  \u2713  Homepage p95 latency: 142ms (threshold: 200ms)", type: "pass", delay: 9800 },
  { text: "  \u2713  API p99 latency: 187ms (threshold: 500ms)", type: "pass", delay: 10300 },
  { text: "  \u2713  Throughput: 1,240 req/s (threshold: 1,000 req/s)", type: "pass", delay: 10800 },
  { text: "", type: "blank", delay: 11100 },
  { text: "  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", type: "info", delay: 11300 },
  { text: "  Summary: 142 passed, 0 failed, 0 skipped", type: "summary", delay: 11600 },
  { text: "  Duration: 11.8s  \u00b7  Workers: 4  \u00b7  Retries: 0", type: "summary", delay: 11900 },
  { text: "  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500", type: "info", delay: 12100 },
  { text: "", type: "blank", delay: 12300 },
  { text: "\u2714  All quality gates passed. Deployment approved.", type: "pass", delay: 12600 },
];

function getLineClass(type: TerminalLine["type"]): string {
  if (type === "command") return "text-[#e6edf3] font-semibold";
  if (type === "pass") return "text-[#10b981]";
  if (type === "fail") return "text-[#ef4444]";
  if (type === "warn") return "text-[#f59e0b]";
  if (type === "summary") return "text-[#f59e0b] font-semibold";
  if (type === "info") return "text-[#8b949e]";
  return "text-transparent select-none";
}

export default function LiveTerminal() {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const startTerminal = () => {
    clearTimers();
    setVisibleLines([]);
    setDone(false);
    setRunning(true);

    terminalScript.forEach((line, index) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (index === terminalScript.length - 1) {
          setRunning(false);
          setDone(true);
        }
      }, line.delay);
      timersRef.current.push(t);
    });
  };

  useEffect(() => {
    const t = setTimeout(() => startTerminal(), 600);
    return () => {
      clearTimeout(t);
      clearTimers();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines]);

  useEffect(() => {
    const interval = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="terminal" className="py-20 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#10b981]/30 bg-[#10b981]/5 mb-4">
            <span className="font-mono text-xs text-[#10b981] uppercase tracking-wider">Live Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-3">Test Suite Runner</h2>
          <p className="text-[#8b949e] font-mono text-sm max-w-xl mx-auto">
            Real-time output from a Playwright smoke suite. Every line is a reliability checkpoint.
          </p>
        </div>

        <div
          className="rounded-2xl border border-[#30363d] overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(16,185,129,0.08), 0 0 120px rgba(16,185,129,0.03)" }}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
              <div className="ml-3 flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="font-mono text-xs text-[#8b949e]">bash — playwright-runner — 120x40</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {running && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-mono text-xs text-[#10b981]">RUNNING</span>
                </div>
              )}
              {done && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span className="font-mono text-xs text-[#10b981]">PASSED</span>
                </div>
              )}
              <button
                onClick={startTerminal}
                className="flex items-center gap-1.5 px-3 py-1 rounded border border-[#30363d] font-mono text-xs text-[#8b949e] hover:border-[#10b981]/50 hover:text-[#10b981] transition-colors"
              >
                {running ? (
                  <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Restart</span>
                ) : (
                  <span className="flex items-center gap-1"><Play className="w-3 h-3" /> Run Again</span>
                )}
              </button>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="bg-[#0d1117] p-5 h-80 sm:h-96 overflow-y-auto terminal-scroll"
          >
            <div className="space-y-0.5">
              {visibleLines.map((line, i) => (
                <div
                  key={i}
                  className={"font-mono text-xs sm:text-sm leading-relaxed " + getLineClass(line.type)}
                >
                  {line.text || "\u00A0"}
                </div>
              ))}
              <div className="font-mono text-xs sm:text-sm leading-relaxed text-[#10b981]">
                <span
                  className="inline-block w-2 h-4 bg-[#10b981] align-middle"
                  style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}
                />
              </div>
            </div>
          </div>

          {/* Footer stats */}
          {done && (
            <div className="px-5 py-3 bg-[#161b22] border-t border-[#30363d] flex flex-wrap items-center gap-4">
              {[
                { label: "Passed", value: "142", color: "#10b981" },
                { label: "Failed", value: "0", color: "#10b981" },
                { label: "Duration", value: "11.8s", color: "#f59e0b" },
                { label: "Workers", value: "4", color: "#8b949e" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-1.5">
                  <span className="font-mono text-xs text-[#8b949e]">{stat.label}:</span>
                  <span className="font-mono text-xs font-semibold" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
