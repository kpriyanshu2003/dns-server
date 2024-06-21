import { TbLogout } from "react-icons/tb";
import { FaThList } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiCompasses2Fill } from "react-icons/ri";
import { MdOutlinePlaylistAdd } from "react-icons/md";

export const NavItems = [
  {
    logo: <MdOutlinePlaylistAdd className="h-8 w-8" />,
    name: "Register",
    href: "/register",
  },
  {
    logo: <FaThList className="h-4 w-4" />,
    name: "Domains",
    href: "/domains",
  },
  {
    logo: <RiCompasses2Fill className="h-6 w-6 border" />,
    name: "Resolve",
    href: "/resolve",
  },
];

export const NavSettings = [
  {
    logo: <IoMdSettings className="h-6 w-6" />,
    name: "Settings",
    href: "/settings",
  },
  {
    logo: <TbLogout className="h-6 w-6" />,
    name: "Logout",
    href: "/auth/logout",
  },
];
