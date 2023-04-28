"use client";

import clsx from "clsx";
import Link from "next/link";

type ColorOpts = "primary" | "warning" | "danger" | "success";

export interface ButtonProps {
  className?: string;
  color?: ColorOpts;
  width?: "auto" | "full";
  size?: "small" | "large" | "normal";
  [key: string]: any;
}

const widthOpts = {
  auto: "w-auto",
  full: "w-full",
};

const sizeOpts = {
  normal: "h-10",
  large: "h-12",
  small: "h-8",
};

const baseStyles = clsx(
  "px-3 flex items-center justify-center text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
);

const colorOptions = {
  primary: {
    solid:
      "px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary-600 rounded-md hover:bg-primary-500 focus:outline-none focus:ring focus:ring-primary-300 focus:ring-opacity-80",
  },
  danger: {
    solid:
      "px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80",
  },
  success: {
    solid:
      "px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-80",
  },
  waring: {
    solid:
      "px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-600 rounded-md hover:bg-amber-500 focus:outline-none focus:ring focus:ring-amber-300 focus:ring-opacity-80",
  },
};

export function Button({
  className = "",
  width = "auto",
  size = "normal",
  loadingText = "Processing...",
  children,
  to,
  ...props
}: ButtonProps) {
  const styles = clsx(baseStyles, widthOpts[width], sizeOpts[size], className);

  return (
    <>
      {to ? (
        <Link href={to} className={styles} {...props}>
          {children}
        </Link>
      ) : (
        <button className={styles} {...props}>
          {children}
        </button>
      )}
    </>
  );
}

// export const Button = ({
//   provider,
//   children,
// }: {
//   provider: any;
//   children: React.ReactNode;
// }) => {
//   return (
//     <button
//       className="h-8 w-fit flex items-center gap-2 px-4 py-1 rounded-md text-sm bg-blue-500 hover:bg-blue-400 active:bg-blue-600  focus:bg-blue-600"
//       onClick={() => signIn(provider.id)}
//     >
//       {children}
//     </button>
//   );
// };
