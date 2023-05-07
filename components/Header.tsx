import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="w-full py-6 h-20 flex lg:px-12 px-6">
      <div className="flex h-full w-1/2 items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logos/markdx-black.svg"
            priority
            alt="logo"
            className="w-auto h-8"
            width={"0"}
            height={"0"}
          />
          <h4 className="font-bold font-heading text-xl ml-2">MarkDX</h4>
        </Link>
      </div>
      <div className="flex h-full w-1/2 items-center justify-end">
        <Button variant="secondary">Login</Button>
      </div>
    </header>
  );
}

export default Header;
