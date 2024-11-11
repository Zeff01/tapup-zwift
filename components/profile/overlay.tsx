"use client";
import { usePathname } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent,SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { UserProfile } from "@/types/types";
import { useState } from "react";

import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { TbCards } from "react-icons/tb";
import Image from "next/image";
import tapUpLogo from "@/public/assets/tap-up-logo-white.png";
import { HiMenuAlt3 } from "react-icons/hi";
import profilePic from "@/public/assets/template4samplepic.png";
import { BiLogOut } from "react-icons/bi";


const menuItems = [
  { icon: <RxDashboard />, title: "Dashboard", href: "/dashboard" },
  { icon: <CgProfile />, title: "Profile", href: "/profile" },
  { icon: <TbCards />, title: "Cards", href: "/cards" },
];

  const OverlayMenu = ({ profilePictureUrl,
  firstName,
  lastName,
  email,
  }: UserProfile) => {
   
    const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  

  return (
    <div className="">
           <Sheet>
      <SheetTrigger asChild>
        <div
          className="cursor-pointer z-10 absolute top-[2rem] left-[2rem] w-6 h-6"
          onClick={handleOpenMenu}
        >
          <HiMenuAlt3
            size={20}
            className="bg-[#D9D9D985] rounded-sm p-1 w-10 h-10"
          />
        </div>
      </SheetTrigger>

      <SheetContent side="left" className="bg-primaryBackground w-[300px] overflow-y-auto">
        <div className="flex flex-col gap-5 text-xl">
          <div className="w-full right-[20%] relative h-8">
            <Image
              src={tapUpLogo}
              alt="logo"
              className="object-contain"
              fill
            />
          </div>

          <SheetClose
            className="cursor-pointer w-12 h-12"
            onClick={handleOpenMenu}
          >
            <HiMenuAlt3
              size={20}
              className="bg-[#232222f4] rounded-sm p-2 w-12 h-12"
              style={{ color: 'white' }}
            />
          </SheetClose>

          <div className="relative w-[6rem] h-[6rem] rounded-full outline-white outline-2">
            <Image
              src={profilePictureUrl || profilePic}
              alt="user image"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <div>
            <h3 className="font-bold text-xl">
              {firstName ? `${firstName} ${lastName}` : 'Anonymous'}
            </h3>
            <p className="text-gray-500 text-sm pt-2 pb-5">
              {email || 'anonymous@mail.com'}
            </p>
          </div>

          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm flex items-center gap-2 pl-4 w-[90%] bg-[#1d1c1cac] text-white p-3 rounded-sm hover:bg-green-500"
              onClick={handleOpenMenu}
            >
              <div>{item.icon}</div>
              {item.title}
            </Link>
          ))}

          <Link
            href="/"
            className="text-sm flex items-center gap-2 pl-4 w-[90%] bg-[#1d1c1cac] text-white p-3 rounded-sm mt-[4rem] hover:bg-green-500"
          >
            <div>
              <BiLogOut />
            </div>
            Sign out
          </Link>
        </div>
      </SheetContent>
    </Sheet>
      
    </div>
  );
};

export default OverlayMenu;
