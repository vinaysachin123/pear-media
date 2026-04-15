import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pear Media | AI-Powered Content Studio",
  description: "Next-generation Image and Text generation platform for creative professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid" />
        <div className="gradient-blob" style={{ top: '-100px', right: '-100px' }} />
        <div className="gradient-blob" style={{ bottom: '-100px', left: '-100px', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }} />
        {children}
      </body>
    </html>
  );
}
