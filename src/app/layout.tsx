import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contract Noggin – AI-Powered Contract Analysis for Small Businesses",
  description: "Contract Noggin helps small construction businesses analyze contracts, minimize risks, and secure payments—without legal expertise. Upload, analyze, and negotiate contracts smarter. Get started today!",
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
        <Header/>
        {children}
      <footer className="bg-white p-6 shadow-inner">
        <div className="text-center text-gray-600">&copy; 2025 Contract Noggin Assistant. All rights reserved.</div>
      </footer>
      </body>
    </html>
  );
}
