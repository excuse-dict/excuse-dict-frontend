import type {Metadata, Viewport} from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "@/global_components/header/Header";
import ScrollHandler from "@/global_components/ScrollHandler";
import ToastProvider from "@/app/toast/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#667eea",
};

export const metadata: Metadata = {
  title: "핑계사전",
  description: "세상의 모든 핑계",
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
        <meta name="mobile-web-app-capable" content="yes" />
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
      <body className={`${geistSans.variable} ${geistMono.variable} app_container`}>
        <ScrollHandler />

        {/* Toast 컨테이너 */}
        <ToastProvider></ToastProvider>
        
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