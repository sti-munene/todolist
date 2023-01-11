/* eslint-disable @next/next/no-head-element */

import { Navbar } from "../components/navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
