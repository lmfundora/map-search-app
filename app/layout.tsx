import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./custom-ol-css.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
  },
  title: "BestPrice",
  description:
    "Aquí podrás encontrar los mejores precios de los productos que necesitas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster richColors expand={true} />
      </body>
    </html>
  );
}
