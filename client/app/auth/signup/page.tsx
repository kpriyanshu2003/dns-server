"use client";
import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { Input } from "@nextui-org/input";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { signup } from "@/api/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signup(formData)
      .then((res) => {
        toast.success("Account created successfully");
        document.cookie = `token=${res.data.data}`;
      })
      .then(() => {
        setTimeout(() => toast.info("Redirecting to Dashboard"), 1000);
        setTimeout(() => router.push("/"), 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-[#dee1e6] h-screen grid place-items-center">
      <div className="rounded-lg shadow-lg p-4 px-8 bg-white text-center w-[450px]">
        <div>
          <div className="font-bold text-2xl my-3">Join Us Today</div>
          <div className="text-sm my-3 px-4">
            Sign up today and manage all your domains at a single place.
            <br />
            Your adventure begins here.
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          <Input
            type="text"
            label="Username"
            placeholder="John Doe"
            classNames={{
              base: "my-10",
              input: "text-sm",
              label: "text-xs font-medium",
            }}
            labelPlacement="outside"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            startContent={
              <LuUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
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
              base: "my-10",
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
          <Input
            type={showPassword.confirmPassword ? "text" : "password"}
            label="Confirm Password"
            placeholder="********"
            classNames={{
              base: "my-10",
              input: "text-sm",
              label: "text-xs font-medium",
            }}
            labelPlacement="outside"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
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
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
              >
                {showPassword.confirmPassword ? (
                  <FaRegEye className="text-default-400 pointer-events-none" />
                ) : (
                  <FaRegEyeSlash className="text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <Button
            isLoading={loading}
            type="submit"
            className="w-full bg-black text-white"
            spinner={<CgSpinner className="animate-spin w-5 h-5 text-white" />}
          >
            Sign Up
          </Button>
        </form>
        <div className="text-sm mt-4">
          <span>Already Have an Account ?</span>{" "}
          <Link href="/auth/login" className="text-black font-medium">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
