import React from "react";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface NavBarProps {
  title: string;
  href: string;
}

const NavBar: React.FC<NavBarProps> = ({ title, href }) => {
  return (
    <div className="flex items-center p-3 space-x-4 border-b-2">
      <Link href={href} className="border p-2 rounded-md">
        <IoArrowBack className="text-lg" />
      </Link>
      <h1 className="text-lg">{title}</h1>
    </div>
  );
};

export default NavBar;
