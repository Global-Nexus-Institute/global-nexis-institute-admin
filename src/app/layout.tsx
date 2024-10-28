import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/lib/store/storeProvider";
import { AntdStyledComponentsProvider } from "@/providers/AntStyledComponentProvieder/AntStyledComponentProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin | Global Nexus Institute",
  description:
    "Global Nexus Institute. Your online learning platform for Data Science, AI, and Cybersecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ height: "100%" }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <StoreProvider>
          <AntdStyledComponentsProvider>
            {children}
          </AntdStyledComponentsProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
