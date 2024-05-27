import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Into the Inferno",
  description: "Consult the void",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Provider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            inter.className
          )}>
          <Navbar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
