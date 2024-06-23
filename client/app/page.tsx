import { Button } from "@nextui-org/button";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {
  return (
    <div className="grid place-items-center gap-44 my-32">
      <div>
        <Link href="/" className="text-5xl font-extrabold">
          The DNS Server
        </Link>
      </div>
      <div className="leading-loose grid gap-8">
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

        <div className="flex gap-4 items-center justify-center">
          <Link href="/dashboard">
            <Button variant="solid" className="bg-black text-white py-6 w-40">
              Get Started
            </Button>
          </Link>
          <Link href="https://kpriyanshu.hashnode.dev">
            <Button color="default" variant="bordered" className="py-6 w-40">
              Upcoming Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
