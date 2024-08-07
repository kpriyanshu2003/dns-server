"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "@nextui-org/input";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/actions/auth";

function Page() {
  const router = useRouter();
  const redirectParams = useSearchParams().get("redirect");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    login(formData.email, formData.password)
      .then((res) => {
        toast.success("Login successful");
        document.cookie = `token=${res.data}; path=/; expires=${new Date(
          Date.now() + 1000 * 60 * 60 * 24 * 7
        )}`;
      })
      .then(() =>
        setTimeout(() => router.push(redirectParams || "/dashboard"), 1500)
      )
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-[#dee1e6] h-screen grid place-items-center">
      <div className="rounded-lg shadow-lg p-4 px-8 bg-white text-center w-[450px]">
        <div>
          <div className="font-bold text-2xl my-3">Welcome Back</div>
          <div className="text-sm my-3 px-2">
            Dive back into a world with a simple sign-in.
            <br />
            Your next adventure awaits - let&apos;s get started.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={formData.email}
            classNames={{
              base: "my-10",
              input: "text-sm",
              label: "text-xs font-medium",
            }}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            labelPlacement="outside"
            startContent={
              <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <div className="my-6">
            <Input
              type={showPassword.password ? "text" : "password"}
              label="Password"
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              labelPlacement="outside"
              classNames={{
                input: "text-sm",
                label: "text-xs font-medium",
              }}
              startContent={
                <MdLockOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                >
                  {showPassword.password ? (
                    <FaRegEye className="text-default-400 pointer-events-none" />
                  ) : (
                    <FaRegEyeSlash className="text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <div className="text-right">
              <Link
                href="/auth/forgot"
                className="text-xs text-black font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <Button
            isLoading={loading}
            type="submit"
            className="w-full bg-black text-white"
            spinner={<CgSpinner className="animate-spin w-5 h-5 text-white" />}
          >
            Log In
          </Button>
        </form>
        <div className="text-sm mt-4">
          <span>Don&apos; have an account ?</span>{" "}
          <Link href="/auth/signup" className="text-black font-medium">
            Register Now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
