import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SunderGarments",
  description: "Developed by SG",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
