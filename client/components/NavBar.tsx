import React from "react";
import Link from "next/link";
import { NavItems } from "@/constants/NavBar";

function NavBar() {
  return (
    <div className="h-screen fixed w-72">
      <Link href="/" className="block p-3 border-b cursor-pointer py-5">
        Logo. DNS-Server
      </Link>
      <div className="">
        {NavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block hover:bg-slate-100 p-4 transition-all duration-500"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
