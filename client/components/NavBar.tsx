import React from "react";
import Link from "next/link";
import { NavItems, NavSettings } from "@/constants/NavBar";

function NavBar() {
  return (
    <div className="h-screen fixed w-72 border-r">
      <Link
        href="/"
        className="block p-3 cursor-pointer py-5 font-semibold text-xl text-center"
      >
        Logo. DNS-Server
      </Link>
      <div className="mt-5">
        {NavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block hover:bg-slate-100 p-4 transition-all duration-500 text-sm font-medium"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        {NavSettings.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block hover:bg-slate-100 p-4 transition-all duration-500 text-sm font-medium"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
