"use client";
import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";

import profilePic from "@/public/assets/template4samplepic.png";
import Image from "next/image";
import profileBgImage from "@/public/assets/profileImage.png";
import {
  MdOutlinePhone,
  MdOutlineMailOutline,
  MdOutlineDownload,
} from "react-icons/md";

import Link from "next/link";
import { LuDownload } from "react-icons/lu";

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
    <section className="flex flex-col items-center relative justify-center mx-auto shadow-xl pb-12">
      <div className="relative w-full h-48">
        <Image
          src={coverPhotoUrl || profileBgImage}
          alt="Profile image"
          fill
          className="object-cover"
        />

        <div className="w-[7rem] absolute h-[7rem] -bottom-[3.5rem] left-6">
          <Image
            src={profilePictureUrl || profilePic}
            alt="user image"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>

      <div className="flex w-full justify-between">
        {/* PERSONAL INFORMATION */}
        <div className="px-4 mt-16">
          {firstName ? (
            <h1 className="text-xl font-bold">{firstName + " " + lastName}</h1>
          ) : (
            <h1 className="text-xl">Hussain Watkins</h1>
          )}

          <p className="font-semibold text-gray-900 text-xs">
            {position ?? "Chief Technology Officer"}
          </p>
        </div>

        <div className="flex flex-col gap-[4rem] pt-3 pr-5">
          <div className="flex gap-1 justify-center items-end">
            <Link
              href={`tel:${number}`}
              className="p-2 bg-neutral-800 rounded-full"
            >
              <MdOutlinePhone size={20} className="text-white cursor-pointer" />
            </Link>
            <Link
              href={`mailto:${email}`}
              className="p-2 bg-neutral-800 rounded-full"
            >
              <MdOutlineMailOutline
                size={20}
                className="text-white cursor-pointer"
              />
            </Link>
            <div className="p-2 bg-neutral-800 rounded-full">
              <LuDownload
                size={20}
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
