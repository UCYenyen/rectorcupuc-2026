import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "@/components/Provider";
import NavigationBar from "@/components/NavigationBar";

export const metadata: Metadata = {
  title: "Rector Cup 2026",
  description: "The Official Website of Rector Cup 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NavigationBar />
          {children}
        </Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
