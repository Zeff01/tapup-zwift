"use client";
import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";

import profilePic from "@/public/assets/template4samplepic.png";
import Image from "next/image";
// import { CiSaveDown2, CiMail, CiPhone } from "react-icons/ci";
import profileBgImage from "@/public/assets/profileImage.png";
import { BsBoxArrowInDown } from "react-icons/bs";
import { LuPhoneCall } from "react-icons/lu";
import { TbMailPlus } from "react-icons/tb";

import Link from "next/link";

const ProfileInfo = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  firstName,
  lastName,
  email,
  number,
  websiteUrl,
  customUrl,
  chosenTemplate,
}: Partial<Card>) => {
  const userProfile = {
    id,
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
    customUrl,
  };

  return (
    <section className="flex flex-col items-center relative justify-center mx-auto shadow-xl">
      <div className="relative w-full h-48">
        <Image
          src={coverPhotoUrl || profileBgImage}
          alt="Profile image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <div className="w-[7rem] relative h-[7rem] bottom-[4rem] left-[2rem]">
            <Image
              src={profilePictureUrl || profilePic}
              alt="user image"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div className="px-5 relative bottom-16 text-black">
            <h3 className="font-bold text-2xl">
              {firstName ? firstName + " " + lastName : "Anonymous"}
            </h3>
            <p className="font-medium text-base">{position || "CEO"}</p>
            <p className="font-medium text-base">
              {company || "Stark Industries"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4rem] pt-3 pr-5">
          {/* <Button className="bg-transparent border-2 border-black rounded-full text-black px-[8px] py-[6px] hover:bg-green-600 text-base">
            Edit Profile
          </Button> */}
          <div className="flex gap-3 justify-center items-end">
            <Link href={`tel:${number}`}>
              <LuPhoneCall
                size={20}
                className="text-[#1A1919CC] cursor-pointer"
              />
            </Link>
            <Link href={`mailto:${email}`}>
              <TbMailPlus
                size={20}
                className="text-[#1A1919CC] cursor-pointer"
              />
            </Link>
            <div>
              <BsBoxArrowInDown
                size={20}
                className="text-[#1A1919CC] cursor-pointer font-bold"
                onClick={() => downloadVCard(userProfile)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
