import React from "react";
import { Input } from "@nextui-org/input";

function Page() {
  return (
    <div className="bg-[#dee1e6] h-screen grid place-items-center">
      <div className="rounded-lg shadow-lg p-4 bg-white text-center">
        <div>
          <div className="font-bold text-2xl">Join Us Today</div>
          <div className="text-sm">
            Sign up today and manage all your domains at a single place.
            <br />
            Your adventure begins here.
          </div>
        </div>
        <div>
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            // startContent={
            //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            // }
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
