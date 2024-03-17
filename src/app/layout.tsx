import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Turfify",
  description: "Turfify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiKey = process.env.PLACE_API;

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {apiKey && (
          <Script
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places`}
            strategy="beforeInteractive"
          />
        )}
        <Toaster />
      </body>
    </html>
  );
}
