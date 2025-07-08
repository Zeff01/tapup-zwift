import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaRegBookmark,
  FaSkype,
  FaTiktok,
  FaTwitter,
  FaViber,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { Button } from "../ui/button";

const Template17 = ({
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
  id,
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
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl w-full max-w-full sm:max-w-md mx-auto overflow-hidden font-sans text-black py-2 px-1">
      {/* Cover Photo */}
      <div className="relative h-36 sm:h-44 w-full">
        <div className="relative w-full h-48 sm:h-60 overflow-hidden">
          {/* Shadow layer */}
          <div
            className="absolute inset-0 z-0"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 75% 83%, 50% 70%, 25% 83%, 0 100%)",
              background:
                "linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.15))",
              filter: "blur(10px)",
              transform: "translateY(4px)", // pushes shadow down slightly
              zIndex: 0,
            }}
          />

          {/* Image layer */}
          <div
            className="relative w-full h-full z-10"
            style={{
              clipPath:
                "polygon(0 0, 100% 0, 100% 100%, 75% 83%, 50% 70%, 25% 83%, 0 100%)",
            }}
          >
            <img
              src={coverPhotoUrl || "/assets/sampleCoverPhoto.png"}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-xl sm:rounded-t-[2rem]"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute left-1/2 -bottom-10 sm:-bottom-12 transform -translate-x-1/2 z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 sm:border-4 border-white bg-white overflow-hidden shadow-lg">
            <img
              src={profilePictureUrl || "/default-user.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-12 sm:pt-16 pb-4 sm:pb-6 px-4 sm:px-6 flex flex-col items-center">
        {/* Name & Position */}
        <h2 className="text-lg sm:text-xl font-bold text-center leading-tight">
          {prefix && `${prefix} `}
          {firstName} {middleName && `${middleName} `}
          {lastName}
          {suffix && `, ${suffix}`}
        </h2>
        <div className="text-xs sm:text-sm text-gray-700 text-center mt-1">
          {company} {position && `| ${position}`}
        </div>
        {/* Contact Info */}
        <div className="text-xs text-gray-500 text-center mt-1 break-all">
          {email && (
            <>
              {email}
              {number && <> | {number}</>}
            </>
          )}
          {!email && number && <>{number}</>}
        </div>
        {/* Social Icons */}
        <div className="flex gap-2 sm:gap-3 justify-center mt-3 sm:mt-4 flex-wrap">
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaFacebookF className="text-[#1877F3] text-sm sm:text-lg" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaLinkedinIn className="text-[#0A66C2] text-sm sm:text-lg" />
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaInstagram className="text-[#E4405F] text-sm sm:text-lg" />
            </a>
          )}
          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaGlobe className="text-gray-700 text-sm sm:text-lg" />
            </a>
          )}
          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaTwitter className="text-[#1DA1F2] text-sm sm:text-lg" />
            </a>
          )}
          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaYoutube className="text-[#FF0000] text-sm sm:text-lg" />
            </a>
          )}
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaWhatsapp className="text-[#25D366] text-sm sm:text-lg" />
            </a>
          )}
          {skypeInviteUrl && (
            <a
              href={skypeInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaSkype className="text-[#00AFF0] text-sm sm:text-lg" />
            </a>
          )}
          {viberUrl && (
            <a
              href={viberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaViber className="text-[#665CAC] text-sm sm:text-lg" />
            </a>
          )}
          {tiktokUrl && (
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
            >
              <FaTiktok className="text-[#69C9D0] text-sm sm:text-lg" />
            </a>
          )}
        </div>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full mt-4 sm:mt-6">
          <Link href={`mailto:${email}`}>
            <Button className="flex-1 bg-[#FF4B5C] hover:bg-[#e43c4a] text-white py-2.5 sm:py-2 rounded-full font-semibold flex items-center justify-center gap-2 text-sm">
              <FaEnvelope className="text-white text-base align-middle" />
              <span className="leading-none">Email Me!</span>
            </Button>
          </Link>

          <Button
            onClick={() => downloadVCard(userProfile)}
            className="flex-1 border border-[#FF4B5C] text-[#FF4B5C] py-2.5 sm:py-2 rounded-full font-semibold flex items-center justify-center gap-2 text-sm hover:bg-[#FFF0F1]"
          >
            <FaRegBookmark className="text-[#FF4B5C] text-base align-middle" />
            <span className="leading-none">Save</span>
          </Button>
        </div>
      </div>

      {/* Company Overview */}
      <div className="px-4 sm:px-6 pb-2">
        <h3 className="font-bold text-sm sm:text-base mb-1">
          Company Overview
        </h3>
        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
          {companyBackground}
        </p>
        <h3 className="font-bold text-sm sm:text-base mb-1">Our Services</h3>
        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
          {serviceDescription}
        </p>
        <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
          {(servicePhotos && servicePhotos.length > 0
            ? servicePhotos.slice(0, 3)
            : [
                "/assets/sampleService1.jpg",
                "/assets/sampleService2.jpg",
                "/assets/sampleService3.jpg",
              ]
          ).map((photo, idx) => (
            <div
              key={idx}
              className="w-full overflow-hidden rounded-xl sm:rounded-2xl"
            >
              <img
                src={photo}
                alt={`Service ${idx + 1}`}
                className="w-full h-32 sm:h-40 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#FF4B5C] text-white text-center py-3 sm:py-4 rounded-b-2xl sm:rounded-b-3xl">
        <div className="font-semibold text-sm sm:text-base">{company}</div>
        <div className="text-xs mt-1">
          © 2024 Zwiftech. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default Template17;
