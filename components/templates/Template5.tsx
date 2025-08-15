import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";
import SocialIconsPopup from "../SocialIconsPopup";

const Template5 = ({
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
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  tiktokUrl,
  youtubeUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
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
    <div className="relative bg-white text-black flex flex-col items-center justify-between  min-h-screen">
      <div
        className="relative w-full mx-auto  max-w-[480px]"
        style={{
          backgroundImage: 'url("/assets/template5bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className="flex flex-col relative   ">
          <div className="w-full h-48">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                fill
                className="mx-auto w-full h-48 object-cover overflow-hidden"
              />
            ) : (
              <Image
                src={"/assets/template1coverphoto.png"}
                alt="Cover Image"
                fill
                className="mx-auto"
              />
            )}
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {profilePictureUrl ? (
              <div className="w-28 h-28 rounded-full mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-28 h-28"
                />
              </div>
            ) : (
              <div className="bg-purple-500 w-28 h-28 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white font-bold text-xl">HW</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex justify-end gap-1 pt-3 text-pink-400 ">
          <Link
            href={`tel:${number}`}
            className="p-1.5 grid place-content-center rounded-full border border-pink-400 "
          >
            <MdOutlinePhone className="cursor-pointer" size={18} />
          </Link>
          <Link
            href={`mailto:${email}`}
            className="p-1.5 grid place-content-center rounded-full border border-pink-400 "
          >
            <MdOutlineMailOutline className="cursor-pointer" size={18} />
          </Link>
          <div className="p-1.5 grid place-content-center rounded-full border border-pink-400 ">
            <MdOutlineBookmarkBorder
              className="cursor-pointer font-bold"
              onClick={() => downloadVCard(userProfile)}
              size={18}
            />
          </div>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <SocialIconsPopup
          facebookUrl={facebookUrl}
          twitterUrl={twitterUrl}
          tiktokUrl={tiktokUrl}
          youtubeUrl={youtubeUrl}
          instagramUrl={instagramUrl}
          linkedinUrl={linkedinUrl}
          viberUrl={viberUrl}
          whatsappNumber={whatsappNumber}
          skypeInviteUrl={skypeInviteUrl}
          websiteUrl={websiteUrl}
        />

        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-4 space-y-1 ">
          {firstName ? (
            <h1 className="text-xl font-bold mt-4 ">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
          )}

          <p className="font-semibold text-gray-900 text-xs">
            {position ?? "Chief Technology Officer"}
          </p>

          <p className=" text-gray-500 text-xs">
            {email ?? "H.Watkins@gmail.com"}
          </p>

          <p className=" text-gray-500 text-xs"> {number ?? +639123456789}</p>
        </div>

        {/* COMPANY INFORMATION */}
        <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6 px-4">
          {company ?? "COMPANY"}
        </h2>

        <div className="mt-6 px-4">
          {companyBackground && (
            <>
              <h2 className="text-md font-bold">Company Background</h2>
              <p className="text-xs mt-4">{companyBackground}</p>
            </>
          )}

          {/* SERVICE INFORMATION */}
          {(serviceDescription ||
            (servicePhotos && servicePhotos.length > 0)) && (
            <>
              <h3 className="text-md font-bold mt-6">Our Services</h3>
              {serviceDescription && (
                <p className="text-xs mt-4">{serviceDescription}</p>
              )}
            </>
          )}
        </div>

        {servicePhotos && servicePhotos.length > 0 && (
          <div className="grid grid-cols-2 gap-2 p-2 mt-6">
            {servicePhotos.map((photo, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={photo}
                  alt={`Service Photo ${index + 1}`}
                  width={300}
                  height={300}
                  layout="responsive"
                  className="rounded-md object-cover w-full  "
                />
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <h2 className="text-xs font-extrabold mx-auto w-full text-center mt-3 mb-2">
          {company ?? "COMPANY"}
        </h2>

        <div className="flex flex-col mt-8 mb-1 items-center gap-1 text-center text-xs">
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

export default Template5;
