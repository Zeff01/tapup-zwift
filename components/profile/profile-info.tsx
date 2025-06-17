"use client";
import { Card } from "@/types/types";
import { downloadVCard } from "@/lib/utils";

import Image from "next/image";
import profilePic from "@/public/assets/template4samplepic.png";
import { CiSaveDown2, CiMail, CiPhone } from "react-icons/ci";
import profileBgImage from "@/public/assets/profileImage.png";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProfileInfo = ({
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  firstName,
  lastName,
  email,
  number,
  websiteUrl,
  chosenTemplate,
}: Partial<Card>) => {
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
          <div className="px-5 relative bottom-8 text-black">
            <h3 className="font-bold text-2xl">
              {firstName ? firstName + " " + lastName : "Anonymous"}
            </h3>
            <p className="font-medium text-base">{position || "CEO"}</p>
            <p className="font-medium text-base">
              {company || "Stark Industries"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[4rem] pt-5 pr-5">
          <Button className="bg-transparent border-2 border-black rounded-full text-black px-[8px] py-[6px] hover:bg-green-600 text-base">
            Edit Profile
          </Button>
          <div className="flex gap-2 justify-center items-center">
            <Link href={`tel:${number}`}>
              <CiPhone className="w-7 h-7 text-[#1A1919CC] cursor-pointer" />
            </Link>
            <Link href={`emailto:${email}`}>
              <CiMail className="w-7 h-7 text-[#1A1919CC] cursor-pointer" />
            </Link>
            <div>
              <CiSaveDown2
                className="w-7 h-7 text-[#1A1919CC] cursor-pointer"
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
