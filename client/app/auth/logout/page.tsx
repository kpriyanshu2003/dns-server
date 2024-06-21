/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  useEffect(() => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setTimeout(() => router.push("/auth/login"), 1500);
  }, []);
  return (
    <div className="grid place-items-center h-screen text-2xl font-medium leading-relaxed font-mono">
      Logging you out...
      <br />
      and Redirecting to Login Page.
    </div>
  );
}

export default Page;
