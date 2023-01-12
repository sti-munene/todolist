"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "./utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { UserDropdown } from "./userDropdown";
import { listenForOutsideClicks } from "../lib/click-outside";

export function Navbar() {
  const router = useRouter();
  const { data, status } = useSession();

  const userDropdownTogglerRef = useRef(null);
  const [showUserDropdownList, setShowUserDropdownList] = useState(false);
  const [userDropDownlistening, setUserDropDownListening] = useState(false);
  const toggleUserDropdown = () =>
    setShowUserDropdownList(!showUserDropdownList);

  useEffect(() =>
    listenForOutsideClicks(
      userDropDownlistening,
      setUserDropDownListening,
      userDropdownTogglerRef,
      setShowUserDropdownList
    )
  );

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
              <div className="relative">
                <button
                  ref={userDropdownTogglerRef}
                  className={`cursor-pointer px-2 h-16`}
                  onClick={() => toggleUserDropdown()}
                >
                  <Image
                    src={data?.user?.image ? data?.user?.image : "/user/01.jpg"}
                    height={45}
                    width={45}
                    alt="User profile photo."
                    className="rounded-full"
                  />
                </button>

                {showUserDropdownList && (
                  <UserDropdown toggler={toggleUserDropdown} />
                )}
              </div>
            )}
          </div>
        </div>
        {/* <nav>{renderThemeChanger()}</nav> */}
      </Container>
    </header>
  );
}
