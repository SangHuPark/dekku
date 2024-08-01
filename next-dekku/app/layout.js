// app/layout.js
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/globals.css";

export const metadata = {
  title: "Next Dekku",
  description: "A Next.js project",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="mt-16 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
