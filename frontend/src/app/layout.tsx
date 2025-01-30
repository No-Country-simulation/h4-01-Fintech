import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/fother";
import HelpButton from "@/components/common/helpButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IUpi",
  description: "IUpi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <SessionProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Theme grayColor="olive" panelBackground="solid" radius="large">
            <Navbar />
            
            {children}
            <HelpButton />
            <Footer />
          </Theme>
        </body>
      </SessionProvider>
    </html>
  );
}

