"use client";
import { UserProfile } from "@/types/types";
import { downloadVCard } from "@/lib/vCardUtils";

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
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: <RxDashboard />, title: "Dashboard", href: "/dashboard" },
  { icon: <CgProfile />, title: "Profile", href: "/profile" },
  { icon: <TbCards />, title: "Cards", href: "/cards" },
];



const ProfileInfo = ({ profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  firstName,
  lastName,
  email,
  number,
  websiteUrl }: UserProfile) => {
  
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

   const userProfile = {
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
  };


  return (
    <section className="flex flex-col items-center relative justify-center max-w-[320px] mx-auto shadow-xl">
      <div className="relative w-full h-[13rem] p-0 m-0">
        <Image
          src={coverPhotoUrl || profileBgImage}
          alt="Profile image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex max-w-[440px] w-full justify-between">
        <div className="flex flex-col">
          <div className="w-[7rem] relative h-[7rem] bottom-[4rem] left-[2rem]">
            <Image
              src={profilePictureUrl ||  profilePic}
              alt="user image"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="px-5 relative bottom-8">
            <h3 className="font-bold text-2xl">{firstName ? firstName + " " + lastName : "Anonymous"}</h3>
            <p className="font-medium text-base">{position || "CEO" }</p>
            <p className="font-medium text-base">{company || "Stark Industries" }</p>
          </div>
        </div>
        <div className="flex flex-col gap-[4rem] pt-5 pr-5">
        <Button className="bg-transparent border-2 border-black rounded-full text-black px-[8px] py-[6px] hover:bg-green-500 text-base">Edit Profile</Button>
          <div className="flex gap-4 justify-center items-center">
            <Link href={`tel:${number}`}>
          <FiPhoneCall className="w-7 h-7 text-[#1A1919CC] cursor-pointer" />
            </Link>
            <Link href={`emailto:${email}`}>
          <MdOutlineEmail className="w-7 h-7 text-[#1A1919CC] cursor-pointer" />
            </Link>
            <div>
          <BsBoxArrowInDown className="w-7 h-7 text-[#1A1919CC] cursor-pointer" onClick={()=>downloadVCard(userProfile)}  />
            </div>
        </div>
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <div
            className="cursor-pointer z-10 absolute top-[2rem] left-[2rem] w-6 h-6 "
            onClick={handleOpenMenu}
          >
            <HiMenuAlt3
              size={20}
              className="bg-[#D9D9D985] rounded-sm p-1 w-10 h-10"
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
              className="cursor-pointer w-12 h-12"
              onClick={handleOpenMenu}
            >
              <HiMenuAlt3
                size={20}
                className="bg-[#69676766] rounded-sm p-2 w-12 h-12"
                style={{ color: "white" }}
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
              <h3 className="font-bold text-white text-xl">{firstName ? firstName + " " + lastName : "Anonymous"}</h3>
              <p className="text-[#FFFFFF80] text-sm pt-2 pb-5">
                {email || "anonymous@mail.com"}
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
              Sign out
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default ProfileInfo;
