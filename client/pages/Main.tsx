import Link from "next/link";
import React from "react";

function Main() {
  return (
    <div className="grid place-items-center gap-44 my-32">
      <div>
        <span className="text-3xl">Welcome to</span>{" "}
        <Link href="/" className="text-5xl font-bold">
          The DNS Server
        </Link>
      </div>
      <div className="leading-loose">
        <div>
          This is a proof-of-concept DNS Server created by{" "}
          <Link
            href="https://github.com/kpriyanshu2003"
            className="text-blue-600 font-medium"
          >
            ME
          </Link>{" "}
          to demonstrate the working of DNS Server.
        </div>
        <div>
          If you are new to this place, you can start by adding your own domain,
          in the{" "}
          <Link href="/domains" className="text-blue-600 font-medium">
            Domains
          </Link>{" "}
          Section.
        </div>
      </div>
    </div>
  );
}

export default Main;
