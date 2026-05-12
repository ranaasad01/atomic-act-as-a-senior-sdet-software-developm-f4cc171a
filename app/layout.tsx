import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Chen | Lead Automation & Quality Engineer",
  description:
    "Senior SDET specializing in high-scale E2E frameworks, CI/CD reliability, and performance gatekeeping. Expert in Playwright, Cypress, k6, and modern test automation.",
  keywords: [
    "SDET",
    "Test Automation",
    "QA Engineer",
    "Playwright",
    "Cypress",
    "CI/CD",
    "Performance Testing",
    "k6",
    "JMeter",
  ],
  openGraph: {
    title: "Alex Chen | Lead Automation & Quality Engineer",
    description:
      "Senior SDET specializing in high-scale E2E frameworks, CI/CD reliability, and performance gatekeeping.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-[#e6edf3] antialiased">{children}</body>
    </html>
  );
}
