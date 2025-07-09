import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Link from "next/link";
import { FaSkype, FaTiktok, FaViber, FaWhatsapp } from "react-icons/fa6";
import {
  LuBookmark,
  LuFacebook,
  LuGlobe,
  LuInstagram,
  LuLinkedin,
  LuMail,
  LuPhone,
  LuTwitter,
  LuUserCircle,
  LuYoutube,
} from "react-icons/lu";
import { Button } from "../ui/button";

const Template16 = ({
  id,
  firstName,
  lastName,
  middleName,
  suffix,
  prefix,
  position,
  coverPhotoUrl,
  profilePictureUrl,
  email,
  number,
  company,
  companyBackground,
  serviceDescription,
  servicePhotos,
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  youtubeUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
  tiktokUrl,
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
    <div className="bg-white min-h-screen w-full flex flex-col items-center font-sans text-black">
      {/* Cover Image */}
      <div className="w-full max-w-md h-40 overflow-hidden">
        <img
          src={coverPhotoUrl}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="w-full max-w-md px-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-[5px] border-white overflow-hidden shadow-md flex-shrink-0  -mt-12">
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info to the right of avatar */}
          <div className="flex-1 mt-3">
            {/* Name & Title */}
            <h1 className="text-xl font-semibold">
              {prefix && `${prefix} `}
              {firstName} {middleName && `${middleName} `}
              {lastName}
              {suffix && `, ${suffix}`}
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              {position} {company && `@ ${company}`}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-700">
              {email && (
                <div className="flex items-center gap-2">
                  <LuMail />
                  <a href={`mailto:${email}`} className="hover:underline">
                    {email}
                  </a>
                </div>
              )}
              {number && (
                <div className="flex items-center gap-2">
                  <LuPhone />
                  <a href={`tel:${number}`} className="hover:underline">
                    {number}
                  </a>
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <LuFacebook className="text-white text-base" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <LuLinkedin className="text-white text-base" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <LuInstagram className="text-white text-base" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <LuTwitter className="text-white text-base" />
                </a>
              )}
              {youtubeUrl && (
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <LuYoutube className="text-white text-base" />
                </a>
              )}
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <FaWhatsapp className="text-white text-base" />
                </a>
              )}
              {skypeInviteUrl && (
                <a
                  href={skypeInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <FaSkype className="text-white text-base" />
                </a>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <LuGlobe className="text-white text-base" />
                </a>
              )}
              {viberUrl && (
                <a
                  href={viberUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <FaViber className="text-white text-base" />
                </a>
              )}
              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                >
                  <FaTiktok className="text-white text-base" />
                </a>
              )}
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-5 mt-4 w-full mb-6">
          <Link href={`mailto:${email}`}>
            <Button className="flex-[1.2] flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition">
              <LuUserCircle className="text-white text-lg" />
              Contact Me
            </Button>
          </Link>
          <Button
            onClick={() => downloadVCard(userProfile)}
            className="flex-[1.2] flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
          >
            <LuBookmark className="text-white text-lg" />
            Save
          </Button>
        </div>
      </div>

      {/* Company Overview */}
      <div className="w-full max-w-md px-6 mb-6">
        <h2 className="text-base font-bold mb-2">Company Overview</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {serviceDescription ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </p>
      </div>

      {/* Our Services */}
      <div className="w-full max-w-md px-6 mb-8">
        <h2 className="text-base font-bold mb-2">Our Services</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="flex flex-col gap-4">
          {(servicePhotos && servicePhotos.length > 0
            ? servicePhotos.slice(0, 3)
            : [
                "/assets/sampleService1.jpg",
                "/assets/sampleService2.jpg",
                "/assets/sampleService3.jpg",
              ]
          ).map((photo, index) => (
            <div key={index} className="w-full overflow-hidden rounded-2xl">
              <img
                src={photo}
                alt={`Service ${index + 1}`}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md px-6 text-center text-gray-500 text-sm pb-8">
        <div className="font-semibold text-black mb-1">
          {company || "ABC Company"}
        </div>
        <div>© 2024 Zwiftech. All Rights Reserved.</div>
      </footer>
    </div>
  );
};

export default Template16;
