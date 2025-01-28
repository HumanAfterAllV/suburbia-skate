import type { Metadata } from "next";
import { Bowlby_One_SC, DM_Mono } from "next/font/google";
import { createClient } from "@/prismicio";

import "./globals.css";

const bowlby = Bowlby_One_SC({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-bowlby-one-sc",
  weight: ["400"],
});

const dmMono = DM_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["500"],
});

export async function generateMetadata(): Promise<Metadata> {
  
  const client = createClient();
  const setting = await client.getSingle("settings");
  return {
    title: setting.data.site_title,
    description: setting.data.meta_description,
    openGraph: {
      images: setting.data.fallback_og_image.url ?? undefined
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bowlby.variable} ${dmMono.variable} antialiased font-mono`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
