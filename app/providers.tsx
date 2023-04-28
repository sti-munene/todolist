"use client";

import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: React.ReactNode;
  session?: any;
}

export default function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
