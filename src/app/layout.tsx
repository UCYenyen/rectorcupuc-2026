import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "@/components/Provider";
import NavigationBar from "@/components/NavigationBar";
import { auth } from "@/lib/auth";
import PixelTrail from "@/components/PixelTrail";

export const metadata: Metadata = {
  title: "Rector Cup 2026",
  description: "The Official Website of Rector Cup 2026",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body id="root-layout" className="bg-gradient-to-b from-[#390D62] to-[#6226A4]">
        <Provider session={session}>
          <NavigationBar />
          {children}
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            <PixelTrail
              gridSize={50}
              trailSize={0.05}
              maxAge={150}
              interpolate={1}
              color="#AAF3D5"
              className="pointer-events-none"
            />
          </div>
        </Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}