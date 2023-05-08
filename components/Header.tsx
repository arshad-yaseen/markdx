"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

function Header() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const isEditor =
    pathname.includes("/dashboard") || pathname.includes("/edit");

  return (
    <header
      className={`w-full ${
        isEditor ? "border-b h-14" : "h-20"
      } py-6  flex lg:px-12 px-6`}
    >
      <div className="flex h-full w-1/2 items-center">
        <Link href="/" className="flex items-center">
          <Image
            src={
              theme === "dark"
                ? "/logos/markdx-white.svg"
                : "/logos/markdx-black.svg"
            }
            priority
            alt="logo"
            className="w-auto h-8"
            width={"0"}
            height={"0"}
          />
          <h4 className="font-bold font-heading text-xl ml-2">
            {isEditor ? "Editor" : "MarkDX"}
          </h4>
        </Link>
      </div>
      <div className="flex h-full w-1/2 items-center justify-end">
        <Button variant="secondary">Login</Button>
      </div>
    </header>
  );
}

export default Header;
