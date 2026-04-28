import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickFeedback | Instant User Feedback for Startups",
  description: "Add a feedback widget to your website in seconds. Get actionable user insights without the bloat.",
  keywords: ["feedback widget", "customer feedback", "startup tools", "user insights", "SaaS"],
  openGraph: {
    title: "QuickFeedback | Instant User Feedback",
    description: "The simplest way to collect user feedback on your website.",
    type: "website",
    url: "https://quickfeedback.vercel.app",
    images: [
      {
        url: "https://quickfeedback.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "QuickFeedback Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Analytics Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('Analytics loaded: Mock Analytics ID');
            `,
          }}
        />
      </body>
    </html>
  );
}
