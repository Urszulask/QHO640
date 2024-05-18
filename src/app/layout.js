'use client'
import Navbar from "./components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./auth/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <Navbar/>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
