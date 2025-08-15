"use client";
import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";

import profileBgImage from "@/public/assets/profileImage.png";
import profilePic from "@/public/assets/template4samplepic.png";
import Image from "next/image";
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";

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
      <div className="relative w-full mt-6 h-48">
        <Image
          src={coverPhotoUrl || profileBgImage}
          alt="Profile image"
          fill
          className="object-cover w-full rounded-lg"
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
        <div className="flex flex-col gap-1 pt-3">
          {/* <Button className="bg-transparent border-2 border-black rounded-full text-black px-[8px] py-[6px] hover:bg-green-600 text-base">
            Edit Profile
          </Button> */}
          <div className="flex gap-3 justify-center items-end">
            <Link
              href={`tel:${number}`}
              className="p-1 bg-neutral-800 rounded-full"
            >
              <MdOutlinePhone size={24} className="text-white cursor-pointer" />
            </Link>
            <Link
              href={`mailto:${email}`}
              className="p-1 bg-neutral-800 rounded-full"
            >
              <MdOutlineMailOutline
                size={24}
                className="text-white cursor-pointer"
              />
            </Link>
            <div className="p-1 bg-neutral-800 rounded-full">
              <MdOutlineBookmarkBorder
                size={24}
                className="text-white cursor-pointer font-bold"
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
