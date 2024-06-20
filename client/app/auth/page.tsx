import { redirect } from "next/navigation";

function Page() {
  return redirect("/auth/login");
}

export default Page;
