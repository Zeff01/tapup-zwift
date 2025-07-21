import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Link from "next/link";
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
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";
import { Button } from "../ui/button";

const Template15 = ({
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
  youtubeUrl,
  twitterUrl,
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
    <div className="min-h-screen bg-[#011923] flex flex-col items-center py-2 px-1 relative overflow-hidden">
      <div className="max-w-[480px] mx-auto flex flex-col w-full">
        {/* === Profile and Cover Section === */}
        <section
          aria-label="Profile Section"
          className="w-full max-w-md mb-8 relative flex flex-col items-center px-2 sm:px-6"
        >
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
            className="object-cover w-full h-32 md:h-36 rounded-t-2xl shadow-lg"
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
        </section>

        {/* === Card Section === */}
        <section
          aria-label="Card Section"
          className="w-full max-w-md mt-8 relative flex flex-col items-center px-2 sm:px-6"
        >
          {/* Blue circle - left side of Contacts */}
          <div
            className="hidden md:block absolute z-0"
            style={{ top: 240, left: -60 }}
          >
            <div className="w-28 h-28 rounded-full bg-blue-400 opacity-40 blur-2xl" />
          </div>

          {/* Light Blue circle - right side of Contacts */}
          <div
            className="hidden md:block absolute z-0"
            style={{ bottom: 0, left: "60%" }}
          >
            <div className="w-24 h-24 rounded-full bg-indigo-500 opacity-40 blur-2xl" />
          </div>

          <h1 className="text-2xl font-bold text-white text-center">
            {prefix && `${prefix}. `}
            {firstName}
            {middleName && ` ${middleName}`}
            {lastName}
            {suffix && `, ${suffix}`}
          </h1>

          <p className="text-base text-white font-medium mt-1 mb-4 text-center">
            {position} {company && `@ ${company}`}
          </p>

          <div className="flex gap-2 mb-2">
            <Link href={`mailto:${email}`}>
              <Button className="flex items-center gap-1 bg-transparent border border-[#7dd3fc] text-white px-6 py-2 rounded-full font-lg hover:bg-[#0e1a22] transition mb-4 relative">
                Let’s Work Together <LuArrowRight className="text-lg" />
              </Button>
            </Link>
            <Button
              onClick={() => downloadVCard(userProfile)}
              className="flex items-center gap-2 bg-transparent border border-[#7dd3fc] text-white px-6 py-2 rounded-full font-lg hover:bg-[#0e1a22] transition mb-4 relative"
            >
              <MdOutlineBookmarkBorder className="w-5 h-5 mt-0.5" />
              Save
            </Button>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-2 justify-center mb-6 max-w-xs">
            {[
              { url: facebookUrl, icon: LuFacebook, href: facebookUrl },
              { url: instagramUrl, icon: LuInstagram, href: instagramUrl },
              { url: linkedinUrl, icon: LuLinkedin, href: linkedinUrl },
              { url: websiteUrl, icon: LuGlobe, href: websiteUrl },
              { url: twitterUrl, icon: LuTwitter, href: twitterUrl },
              { url: youtubeUrl, icon: LuYoutube, href: youtubeUrl },
              {
                url: whatsappNumber,
                icon: FaWhatsapp,
                href: `https://wa.me/${whatsappNumber}`,
              },
              { url: skypeInviteUrl, icon: FaSkype, href: skypeInviteUrl },
              { url: viberUrl, icon: FaViber, href: viberUrl },
              { url: tiktokUrl, icon: FaTiktok, href: tiktokUrl },
            ]
              .filter((social) => social.url)
              .map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a425b] p-2 rounded-full transition"
                  >
                    <IconComponent
                      className="text-lg"
                      style={{ color: "#7eabc2" }}
                    />
                  </a>
                );
              })}
          </div>

          {/* === Contact Info Section === */}
          <section
            aria-label="Contact Information"
            className="w-full mb-6 relative px-2 sm:px-6"
          >
            <h2 className="text-lg font-bold text-white mb-2">
              Contact Information
            </h2>
            <div className="flex flex-col gap-2 text-gray-300">
              <div className="flex items-center gap-2">
                <a href={`mailto:${email}`}>
                  {" "}
                  <MdOutlineMailOutline className="text-[#7dd3fc]" />{" "}
                </a>{" "}
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <a href={`tel:${number}`}>
                  <MdOutlinePhone className="text-[#7dd3fc]" />{" "}
                </a>{" "}
                <span>{number}</span>
              </div>
            </div>
          </section>

          {/* === Company Overview Section === */}
          {companyBackground && (
            <section aria-label="Company Overview" className="w-full mb-6 px-2 sm:px-6">
              <h2 className="text-lg font-bold text-white mb-2">
                Company Overview
              </h2>
              <p className="text-gray-300 text-base">{companyBackground}</p>
            </section>
          )}

          {/* === Services Section === */}
          {(serviceDescription ||
            (servicePhotos && servicePhotos.length > 0)) && (
            <section aria-label="Our Services" className="w-full px-2 sm:px-6">
              <h2 className="text-lg font-bold text-white mb-4">
                Our Services
              </h2>
              {serviceDescription && (
                <p className="text-gray-300 mb-4">{serviceDescription}</p>
              )}
              {servicePhotos && servicePhotos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicePhotos.map((photo, idx) => (
                    <div key={idx} className="w-full flex justify-center">
                      <img
                        src={photo}
                        alt={`Service Photo ${idx + 1}`}
                        className="rounded-2xl object-cover w-full h-44 bg-white"
                        style={{
                          minWidth: 0,
                          minHeight: 176,
                          maxWidth: "100%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* === Footer Section === */}
          <footer className="w-full max-w-md mx-auto mt-14 py-4 text-center text-gray-400 text-sm relative px-2 sm:px-6">
            <div className="font-semibold text-base text-white mb-1 relative z-10">
              {company}
            </div>
            <div className="relative z-10">
              © 2024 Zwiftech. All Right Reserved.
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Template15;
