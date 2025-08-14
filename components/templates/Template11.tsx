import { Card } from "@/types/types";
import Image from "next/image";

// fonts
import { cn, downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Mulish, Roboto_Condensed } from "next/font/google";

const roboto_c = Roboto_Condensed({
  weight: "500",
  subsets: ["latin"],
});

const mulish = Mulish({
  weight: ["300", "800"],
  subsets: ["latin"],
});

// icons
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { GoGlobe } from "react-icons/go";
import { HiOutlineBookmark } from "react-icons/hi2";
import { SiSkypeforbusiness } from "react-icons/si";
import { SlSocialFacebook } from "react-icons/sl";
import { Separator } from "../ui/separator";

import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";

const Template11 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  companyBackground,
  serviceDescription,
  servicePhotos,
  firstName,
  lastName,
  email,
  number,
  facebookUrl,
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  customUrl,
}: Card) => {
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
    <div className=" flex flex-col bg-white items-center justify-between  min-h-screen">
      <div className=" w-full mx-auto  relative">
        <div className="flex gap-2 z-20 absolute right-0 top-0 p-1">
          {/* Phone */}
          <a
            href={`tel:${number}`}
            className="flex items-center justify-center w-8 h-8 bg-[#A0E9FF] text-[#00A9FF] rounded-full shadow hover:bg-[#00A9FF] hover:text-white transform hover:scale-110 transition-all duration-200"
          >
            <MdOutlinePhone size={18} />
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex items-center justify-center w-8 h-8 bg-[#A0E9FF] text-[#00A9FF] rounded-full shadow hover:bg-[#00A9FF] hover:text-white transform hover:scale-110 transition-all duration-200"
          >
            <MdOutlineMailOutline size={18} />
          </a>

          {/* Bookmark / vCard */}
          <button
            onClick={() => downloadVCard(userProfile)}
            className="flex items-center justify-center w-8 h-8 bg-[#A0E9FF] text-[#00A9FF] rounded-full shadow hover:bg-[#00A9FF] hover:text-white transform hover:scale-110 transition-all duration-200"
          >
            <HiOutlineBookmark size={18} />
          </button>
        </div>

        {/* COVERPHOTO AND PROFILE PIC */}
        <div className="  flex flex-col relative    ">
          {coverPhotoUrl ? (
            <Image
              src={coverPhotoUrl}
              alt="Cover Image"
              width={400}
              height={200}
              className="mx-auto w-full h-56 object-cover  overflow-hidden"
            />
          ) : (
            <Image
              src={"/assets/template10coverphoto.png"}
              alt="Cover Image"
              width={400}
              height={200}
              className="mx-auto"
            />
          )}
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-24 top-0 w-5/6 rounded-3xl  space-y-1 absolute left-1/2 transform -translate-x-1/2 bg-[#A0E9FF] shadow-md">
          {profilePictureUrl ? (
            <div className="flex justify-center w-full -mt-14">
              <div className=" bg-[#A0E9FF] w-fit  rounded-full mx-auto overflow-hidden p-[5px]">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-24 h-24"
                />
              </div>
            </div>
          ) : (
            <div className="bg-black w-28 h-28 rounded-full mx-auto flex items-center justify-center">
              <Image
                src={"/assets/template10samplepic.png"}
                alt="Profile Image"
                width={80}
                height={80}
                className="rounded-full w-24 h-24"
              />
            </div>
          )}
          {firstName ? (
            <h1
              className={cn(
                "text-xl font-extrabold tracking-wider text-[#00A9FF] capitalize",
                firstName ? "mt-4" : "mt-2",
                mulish.className
              )}
            >
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
          )}
          <div className=" flex text-sm text-black opacity-50 items-center justify-center ">
            <h2
              className={cn(
                "   flex-1  capitalize text-end",
                roboto_c.className
              )}
            >
              {company ?? "COMPANY"}
            </h2>
            <Separator
              orientation="vertical"
              className="h-3 bg-black opacity-50 mx-2"
            />
            <h2
              className={cn(
                "  flex-1 capitalize text-start",
                roboto_c.className
              )}
            >
              {position ?? "Chief Technology Officer"}
            </h2>
          </div>

          <div className="gap-x-2 w-full text-xs font-thin gap-y-1  flex flex-col text-black opacity-50 justify-center items-center">
            <p>{email ?? "H.Watkins@gmail.com"}</p>

            <p>{number ?? +639123456789}</p>
          </div>
          {/* SOCIAL MEDIA ICONS */}
          <div className=" flex items-center gap-1 pb-10 pt-5 text-black text-2xl  h-16 justify-center">
            {facebookUrl && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlSocialFacebook size={13} />
              </a>
            )}
            {twitterUrl && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter size={13} />
              </a>
            )}
            {youtubeUrl && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiYoutube size={13} />
              </a>
            )}
            {instagramUrl && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={13} />
              </a>
            )}
            {linkedinUrl && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={13} />
              </a>
            )}
            {whatsappNumber && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={13} />
              </a>
            )}
            {skypeInviteUrl && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={`skype:${skypeInviteUrl}?chat`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiSkypeforbusiness size={13} />
              </a>
            )}
            {websiteUrl && (
              <a
                className="rounded-full p-2 bg-white  opacity-50"
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoGlobe size={13} />
              </a>
            )}
          </div>
        </div>

        {/* COMPANY INFORMATION */}

        <div className="mt-[110px] px-10 ">
          {companyBackground && (
            <>
              <h2
                className={cn(
                  "text-lg text-[#00A9FF] font-light pt-1",
                  firstName ? "mt-5" : "mt-3",
                  mulish.className
                )}
              >
                Company Overview
              </h2>
              <p className="text-xs mt-1 text-black opacity-50">
                {companyBackground}
              </p>
            </>
          )}

          {/* SERVICE INFORMATION */}
          {(serviceDescription || (servicePhotos && servicePhotos.length > 0)) && (
            <>
              <h3
                className={cn(
                  "text-lg text-[#00A9FF] font-light pt-1",
                  firstName ? "mt-5" : "mt-3",
                  mulish.className
                )}
              >
                Our Services
              </h3>
              {serviceDescription && (
                <p className="text-xs mt-1 text-black opacity-50">
                  {serviceDescription}
                </p>
              )}
            </>
          )}
        </div>

        {servicePhotos && servicePhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-6 mx-10  rounded-2xl overflow-hidden">
            {servicePhotos.map((photo, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={photo}
                  alt={`Service Photo ${index + 1}`}
                  width={500}
                  height={500}
                  layout="responsive"
                  className=" object-cover w-full  "
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* FOOTER */}

      <div className="flex flex-col items-center  justify-center gap-x-1 text-xs  pb-2 ">
        <h2
          className={cn(
            "text-md font-normal tracking-wider  capitalize text-center ",
            firstName ? "mt-4" : "mt-2",
            mulish.className
          )}
        >
          <span
            className={cn(
              "text-lg text-[#00A9FF] font-light pt-1",
              firstName ? "mt-5" : "mt-3",
              mulish.className
            )}
          >
            {company ?? "Company"}
          </span>
        </h2>
        <div className="flex flex-col items-center mt-8 gap-1 text-center text-xs">
          <a
            href={userProfile?.customUrl ?? userProfile?.websiteUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/dark-ZwiftechLogo.png"
              alt="Zwiftech Logo"
              width={40}
              height={15}
              priority
              className="opacity-90"
            />
          </a>

          <span className="tracking-wide text-gray-800 text-[10px] ">
            © {getCopyrightYear()} Zwiftech. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Template11;
