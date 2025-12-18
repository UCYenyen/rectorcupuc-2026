import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "@/components/Provider";
import NavigationBar from "@/components/NavigationBar";
import { auth } from "@/lib/auth";

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
      <body className="bg-gradient-to-b from-[#390D62] to-[#6226A4]">
        <Provider session={session}>
          <NavigationBar />
          {children}
        </Provider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}