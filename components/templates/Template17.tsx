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
import { LuBookmark, LuMail } from "react-icons/lu";

const Template17 = ({
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
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl w-full max-w-full sm:max-w-md mx-auto overflow-hidden font-sans text-black py-2 px-1">
      <div className="max-w-[480px] mx-auto flex flex-col">

        {/* === Profile and Cover Section === */}
        <section aria-label="Cover Section" className="relative h-36 sm:h-44 w-full px-2 sm:px-3">
          <div className="relative w-full h-48 sm:h-60 overflow-hidden">
            {/* Image with clip-path */}
            <img
              src={coverPhotoUrl}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-xl sm:rounded-t-[2rem]"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 100%, 75% 85%, 50% 70%, 25% 85%, 0 100%)",
              }}
            />
          </div>

          {/* Profile Image */}
          <div className="absolute left-1/2 -bottom-10 sm:-bottom-12 transform -translate-x-1/2 z-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 sm:border-4 border-white bg-white overflow-hidden shadow-lg">
              <img
                src={profilePictureUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* === Profile Info Section === */}
        <section aria-label="Profile Section" className="pt-12 sm:pt-16 pb-4 sm:pb-6 px-3 sm:px-4 flex flex-col items-center">
          {/* Name & Position */}
          <h2 className="text-lg sm:text-xl font-bold text-center leading-tight">
            {prefix && `${prefix}. `}
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
            {[
              { url: facebookUrl, icon: FaFacebookF, href: facebookUrl, color: "#1877F3" },
              { url: linkedinUrl, icon: FaLinkedinIn, href: linkedinUrl, color: "#0A66C2" },
              { url: instagramUrl, icon: FaInstagram, href: instagramUrl, color: "#E4405F" },
              { url: websiteUrl, icon: FaGlobe, href: websiteUrl, color: "#6B7280" },
              { url: twitterUrl, icon: FaTwitter, href: twitterUrl, color: "#1DA1F2" },
              { url: youtubeUrl, icon: FaYoutube, href: youtubeUrl, color: "#FF0000" },
              { url: whatsappNumber, icon: FaWhatsapp, href: `https://wa.me/${whatsappNumber}`, color: "#25D366" },
              { url: skypeInviteUrl, icon: FaSkype, href: skypeInviteUrl, color: "#00AFF0" },
              { url: viberUrl, icon: FaViber, href: viberUrl, color: "#665CAC" },
              { url: tiktokUrl, icon: FaTiktok, href: tiktokUrl, color: "#000000" },
            ]
              .filter(social => social.url)
              .map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                  >
                    <IconComponent
                      className="text-sm sm:text-lg"
                      style={{ color: social.color }}
                    />
                  </a>
                );
              })
            }
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full mt-4 sm:mt-6">
            {/* Email Me - Bigger and colored */}
            <div className="sm:basis-[65%]">
              <Link href={`mailto:${email}`}>
                <Button className="w-full bg-[#FF4B5C] hover:bg-[#e43c4a] text-white py-2.5 sm:py-2 rounded-full font-semibold flex items-center justify-center gap-2 text-sm">
                  <FaEnvelope className="text-white text-base align-middle" />
                  <span className="leading-none">Email Me!</span>
                </Button>
              </Link>
            </div>

            {/* Save - Smaller and white */}
            <div className="sm:basis-[35%]">
              <Button
                onClick={() => downloadVCard(userProfile)}
                className="w-full border border-[#FF4B5C] text-[#FF4B5C] py-2.5 sm:py-2 rounded-full font-semibold flex items-center justify-center gap-2 text-sm hover:bg-[#FFF0F1] bg-white"
              >
                <FaRegBookmark className="text-[#FF4B5C] text-base align-middle" />
                <span className="leading-none">Save</span>
              </Button>
            </div>
          </div>
        </section>

        {/* === Company Overview Section === */}
        {companyBackground && (
          <section aria-label="Company Overview" className="px-3 sm:px-4 pb-2">
            <h3 className="font-bold text-sm sm:text-base mb-1">
              Company Overview
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
              {companyBackground}
            </p>
          </section>
        )}

        {/* === Services Section === */}
        {(serviceDescription || (servicePhotos && servicePhotos.length > 0)) && (
          <section aria-label="Our Services" className="px-3 sm:px-4 pb-2">
            <h3 className="font-bold text-sm sm:text-base mb-1">Our Services</h3>
            {serviceDescription && (
              <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                {serviceDescription}
              </p>
            )}
            {servicePhotos && servicePhotos.length > 0 && (
              <div className="flex flex-col gap-3 sm:gap-4 mb-3 sm:mb-4">
                {servicePhotos.map((photo, idx) => (
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
            )}
          </section>
        )}

        {/* === Footer Section === */}
        <footer className="bg-[#FF4B5C] text-white text-center py-3 sm:py-4 rounded-b-2xl sm:rounded-b-3xl px-2 sm:px-3">
          <div className="font-semibold text-sm sm:text-base">{company}</div>
          <div className="text-xs mt-1">
            © 2024 Zwiftech. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Template17;
