"use client";

import React from "react";
import { signIn } from "next-auth/react";

export const Button = ({
  provider,
  children,
}: {
  provider: any;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="h-8 w-fit flex items-center gap-2 px-4 py-1 rounded-md text-sm bg-blue-500 hover:bg-blue-400 active:bg-blue-600  focus:bg-blue-600"
      onClick={() => signIn(provider.id)}
    >
      {children}
    </button>
  );
};
