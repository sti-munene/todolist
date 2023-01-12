"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export interface ProvidersProps {
  children: React.ReactNode;
  session?: any;
}

export default function Providers({ children, session }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
