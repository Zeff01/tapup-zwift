"use client";
import Image from "next/image";
import profilePic from "@/public/assets/template4samplepic.png";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { BsBoxArrowInDown } from "react-icons/bs";
import profileBgImage from "@/public/assets/profileImage.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import tapUpLogo from "@/public/assets/tap-up-logo-white.png";
import { RxDashboard } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { TbCards } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";

const menuItems = [
  { icon: <RxDashboard />, title: "Dashboard", href: "/dashboard" },
  { icon: <CgProfile />, title: "Profile", href: "/profile" },
  { icon: <TbCards />, title: "Cards", href: "/cards" },
];

const ProfileInfo = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <section className="flex flex-col items-center relative justify-center shadow-xl">
      <div className="relative w-full h-[10rem] md:h-[15rem] lg:h-[25rem] p-0 m-0">
        <Image
          src={profileBgImage}
          alt="Profile image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex md:w-full md:px-[5rem] justify-between gap-8">
        <div className="flex flex-col justify-center w-[11rem] md:w-[20rem]">
          <div className="w-[7rem] md:w-[10rem] md:h-[10rem] relative h-[7rem] bottom-[4rem] left-[1rem]">
            <Image
              src={profilePic}
              alt="user image"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-2 relative bottom-10">
            <h3 className="font-bold text-xl md:text-2xl">Paul Castellano</h3>
            <p className="font-medium text-base md:text-xl">CEO</p>
            <p className="font-medium text-base md:text-xl">Stark Industries</p>
          </div>
        </div>
        <div className="flex gap-4 justify-center pt-4">
          <FiPhoneCall className="w-6 h-5 md:w-8 md:h-8" />
          <MdOutlineEmail className="w-6 h-5 md:w-8 md:h-8" />
          <BsBoxArrowInDown className="w-6 h-5 md:w-8 md:h-8" />
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <div
            className="lg:hidden cursor-pointer z-10 absolute top-[1rem] left-[2rem] w-4 h-4 "
            onClick={handleOpenMenu}
          >
            <HiMenuAlt3
              size={20}
              className="bg-[#D9D9D985] rounded-sm p-1 w-8 h-8"
            />
          </div>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-black w-[300px] overflow-y-auto"
        >
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
              className="lg:hidden cursor-pointer w-12 h-12"
              onClick={handleOpenMenu}
            >
              <HiMenuAlt3
                size={20}
                className="bg-[#69676766] rounded-sm p-2 w-12 h-12"
                style={{ color: "white" }}
              />
            </SheetClose>
            <div className="relative w-[4rem] h-[4rem] rounded-full outline-white outline-2">
              <Image
                src={profilePic}
                alt="user image"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">Paul Castellano</h3>
              <p className="text-[#FFFFFF80] text-sm pt-2 pb-5">
                paulcastellano@gmail.com
              </p>
            </div>

            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white text-sm flex items-center gap-2 pl-4 w-[90%] bg-[#EDEDED1A] p-3 rounded-sm"
                onClick={handleOpenMenu}
              >
                <div>{item.icon}</div> {item.title}
              </Link>
            ))}
            <Link
              href="/"
              className="text-white text-sm flex items-center gap-2 pl-4 w-[90%] bg-[#EDEDED1A] p-3 rounded-sm mt-[4rem]"
            >
              <div>
                <BiLogOut />
              </div>
              Logout
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default ProfileInfo;
