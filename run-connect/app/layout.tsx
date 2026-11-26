import type { Metadata } from "next";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

// Judul tab browser selalu "Run Connect" (aturan AGENTS.md)
export const metadata: Metadata = {
  title: "Run Connect",
  description: "Event, komunitas, dan tempat lari di Surabaya dalam satu tempat.",
};

// RootLayout membungkus semua halaman dengan Navbar dan Footer global
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Favicon dari file SVG di public/brand/ */}
        <link rel="icon" type="image/svg+xml" href="/brand/run-connect-logo.svg" />
        {/* Font dimuat via globals.css */}
      </head>
      <body>
        <AuthProvider>
          {/* Splash screen: tampil 5 detik, sekali per sesi browser */}
          <SplashScreen />
          {/* Navbar global */}
          <Navbar />
          {/* Konten halaman */}
          {children}
          {/* Footer global */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
