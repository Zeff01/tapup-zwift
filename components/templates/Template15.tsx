import { Card } from "@/types/types";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSkype, FaTiktok, FaViber, FaWhatsapp } from "react-icons/fa6";
import {
  LuArrowRight,
  LuFacebook,
  LuGlobe,
  LuInstagram,
  LuLinkedin,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { Button } from "../ui/button";

const Template15 = ({
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
  youtubeUrl,
  twitterUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
  tiktokUrl,
}: Card) => {
  return (
    <div className="min-h-screen bg-[#011923] flex flex-col items-center py-8 px-4 relative overflow-hidden">
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Profile Section */}
        <div className="w-full max-w-md mb-8 relative flex flex-col items-center">
          {/* Orange circle - right side of 'Let's Work Together' */}
          <div
            className="hidden md:block absolute z-0"
            style={{ top: 190, right: -60 }}
          >
            <div className="w-32 h-32 rounded-full bg-[#9A3A1975] opacity-80 blur-2xl" />
          </div>
          <img
            src={coverPhotoUrl}
            alt="Cover"
            className="object-cover w-full h-28 md:h-32 rounded-t-2xl shadow-lg"
          />
          {/* Fade effect at the bottom of the cover */}
          <div
            className="absolute left-0 bottom-0 w-full h-10 rounded-t-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(1,25,35,0) 0%, #011923 100%)",
            }}
          />
          {/* Profile Image - centered and overlapping */}
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2 z-20">
            <div className="w-28 h-28 rounded-full border-4 border-[#7dd3fc] overflow-hidden bg-[#222]">
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        {/* Card Section */}
        <div className="w-full max-w-md mt-8 relative flex flex-col items-center">
          {/* Blue circle - left side of Contacts */}
          <div
            className="hidden md:block absolute z-0"
            style={{ top: 240, left: -60 }}
          >
            <div className="w-28 h-28 rounded-full bg-blue-400 opacity-40 blur-2xl" />
          </div>
          {/* Indigo circle - slightly right side, center of footer */}
          <div
            className="hidden md:block absolute z-0"
            style={{ bottom: 0, left: "60%" }}
          >
            <div className="w-24 h-24 rounded-full bg-indigo-500 opacity-40 blur-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">
            {prefix && `${prefix} `}
            {firstName} {middleName && `${middleName} `}
            {lastName}
            {suffix && `, ${suffix}`}
          </h1>
          <p className="text-base text-white font-medium mt-1 mb-4 text-center">
            {position}
          </p>
          <Link href={`mailto:${email}`}>
            <Button className="flex items-center gap-2 bg-transparent border border-[#7dd3fc] text-white px-6 py-2 rounded-full font-lg hover:bg-[#0e1a22] transition mb-4 relative">
              Let’s Work Together <LuArrowRight className="text-lg" />
            </Button>
          </Link>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center mb-6">
            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <LuFacebook className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <LuInstagram className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <LuLinkedin className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <LuGlobe className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <LuTwitter className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <LuYoutube className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <FaWhatsapp className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {skypeInviteUrl && (
              <a
                href={skypeInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <FaSkype className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {viberUrl && (
              <a
                href={viberUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <FaViber className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
            {tiktokUrl && (
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1a425b] p-3 rounded-full transition"
              >
                <FaTiktok className="text-xl" style={{ color: "#7eabc2" }} />
              </a>
            )}
          </div>
          {/* Contact Info */}
          <div className="w-full mb-6 relative">
            <h2 className="text-lg font-bold text-white mb-2">
              Contact Information
            </h2>
            <div className="flex flex-col gap-2 text-gray-300">
              <div className="flex items-center gap-2">
                <MdEmail className="text-[#7dd3fc]" /> <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-[#7dd3fc]" /> <span>{number}</span>
              </div>
            </div>
          </div>
          {/* Company Overview */}
          <div className="w-full mb-6">
            <h2 className="text-lg font-bold text-white mb-2">
              Company Overview
            </h2>
            <p className="text-gray-300 text-base">{companyBackground}</p>
          </div>
          {/* Our Services */}
          <div className="w-full">
            <h2 className="text-lg font-bold text-white mb-4">Our Services</h2>
            {serviceDescription && (
              <p className="text-gray-300 mb-4">{serviceDescription}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(servicePhotos && servicePhotos.length > 0
                ? servicePhotos
                : Array.from({ length: 5 }).map(
                    (_, i) => `/assets/sampleService.png`
                  )
              ).map((photo, idx) => (
                <div key={idx} className="w-full flex justify-center">
                  <img
                    src={photo}
                    alt={`Service Photo ${idx + 1}`}
                    className="rounded-2xl object-cover w-full h-44 bg-white"
                    style={{ minWidth: 0, minHeight: 176, maxWidth: "100%" }}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Footer */}
          <footer className="w-full max-w-md mx-auto mt-14 py-4 text-center text-gray-400 text-sm relative">
            <div className="font-semibold text-base text-white mb-1 relative z-10">
              {company}
            </div>
            <div className="relative z-10">
              © 2024 Zwiftech. All Right Reserved.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Template15;
