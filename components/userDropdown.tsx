import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import { signOut } from "next-auth/react";

export function UserDropdown({ toggler }: { toggler: () => void }) {
  const router = useRouter();
  const linkStyles = useMemo(
    () =>
      "text-sm flex items-center justify-between w-36 text-left space-nowrap py-2 px-3 block hover:bg-black hover:bg-opacity-10 active:bg-black active:bg-opacity-10 focus:bg-black focus:bg-opacity-10 focus:bg-gray-900 hover:text-primary-500 active:text-primary-500 focus:text-primary-500",
    []
  );

  return (
    <div className="z-[999] absolute py-2 -bottom-[85px] right-0 bg-gray-800 shadow-md">
      <ul>
        <li>
          <Link
            className={linkStyles}
            onClick={() => toggler()}
            href="/my-account"
          >
            <span>My Account</span>
            {/* {router.pathname === `/my-account` && <FiCheck />} */}
          </Link>
        </li>

        <li>
          <button className={linkStyles} onClick={() => signOut()}>
            Sing Out
          </button>
        </li>
      </ul>
    </div>
  );
}
