"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "./utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./buttons";

export function Navbar() {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <header className="">
      <Container>
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="logo px-2 py-1 rounded-md">
            Todo List
          </Link>

          <div>
            {status === "loading" && (
              <>
                <span className="block animate-pulse h-[45px] bg-gray-800 rounded"></span>
              </>
            )}

            {data?.user && (
              <div className="flex items-center gap-4">
                <Button size="small" onClick={() => signOut()}>
                  Sign Out
                </Button>

                <Image
                  src={data?.user?.image ? data?.user?.image : "/user/01.jpg"}
                  height={45}
                  width={45}
                  alt="User profile photo."
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
