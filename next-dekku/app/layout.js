"use client";

import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/globals.css";
import localFont from "next/font/local";
import AuthProvider from "./components/AuthContext";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} min-h-screen flex flex-col font-pretendard`}
        style={{ transform: "scale(0.8)", transformOrigin: "top left", width: "125%", height: "100vh", overflow: "auto" }} // 화면을 80%로 축소 및 오버플로우 설정
      >
        <AuthProvider>
          <Header className="" />
          <main className="flex-grow"> {/* main에 flex-grow 추가 */}
            {children}
          </main>
          <Footer className="mt-auto" /> {/* Footer가 항상 하단에 위치하도록 설정 */}
        </AuthProvider>
      </body>
    </html>
  );
}
