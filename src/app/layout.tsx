import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/global_components/header/Header";
import ScrollHandler from "@/global_components/ScrollHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Beautiful app with modern design",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#667eea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Progressive Web App 메타태그 */}
        <meta name="theme-color" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* 폰트 프리로드 */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} app-container`}>
        <ScrollHandler />
        
        {/* 헤더 */}
        <header className="app-header">
          <Header />
        </header>
        
        {/* 메인 콘텐츠 영역 */}
        <main className="app-background">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
        
        {/* 글로벌 스타일을 위한 포털 */}
        <div id="modal-root"></div>
        <div id="toast-root"></div>
      </body>
    </html>
  );
}