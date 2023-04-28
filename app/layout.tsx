/* eslint-disable @next/next/no-head-element */

"use client";

import { Navbar } from "../components/navbar";
import { Container } from "../components/utils";
import "react-datepicker/dist/react-datepicker.css";
import "react-tooltip/dist/react-tooltip.css";
import "../styles/globals.css";
import Providers from "./providers";

import { Covered_By_Your_Grace } from "next/font/google";
import { Tooltip } from "react-tooltip";

const cbyg = Covered_By_Your_Grace({
  variable: "--stylistic-font",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>

      <style jsx global>{`
        .stylistic-font {
          font-family: ${cbyg.style.fontFamily};
        }

        .logo {
          font-family: ${cbyg.style.fontFamily}, ui-sans-serif;
          font-size: 20px;
        }

        .logo:hover,
        .logo:active {
          color: rgb(0, 146, 210);
        }
      `}</style>

      <Providers>
        <body className={`${cbyg.variable} bg-gray-900 text-gray-100`}>
          <Navbar />
          <Container>{children}</Container>
          <Tooltip id="todos" />
        </body>
      </Providers>
    </html>
  );
}
