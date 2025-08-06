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
      <div className="max-w-[480px] mx-auto flex flex-col">
        {/* === Cover Section === */}
        <section
          aria-label="Cover Section"
          className="w-full max-w-md h-40 overflow-hidden relative"
        >
          <img
            src={coverPhotoUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </section>

        {/* === Profile Section === */}
        <section aria-label="Profile Section" className="w-full max-w-md px-6">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full border-[5px] border-white overflow-hidden shadow-md flex-shrink-0 -mt-12 relative z-20">
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
                {prefix && `${prefix}. `}
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
              <div className="flex items-center gap-3 mt-3 mb-5 flex-wrap">
                {[
                  { url: facebookUrl, icon: LuFacebook, href: facebookUrl },
                  { url: linkedinUrl, icon: LuLinkedin, href: linkedinUrl },
                  { url: instagramUrl, icon: LuInstagram, href: instagramUrl },
                  { url: twitterUrl, icon: LuTwitter, href: twitterUrl },
                  { url: youtubeUrl, icon: LuYoutube, href: youtubeUrl },
                  {
                    url: whatsappNumber,
                    icon: FaWhatsapp,
                    href: `https://wa.me/${whatsappNumber}`,
                  },
                  { url: skypeInviteUrl, icon: FaSkype, href: skypeInviteUrl },
                  { url: websiteUrl, icon: LuGlobe, href: websiteUrl },
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
                        className="bg-black p-1.5 rounded-full hover:bg-gray-800 transition"
                      >
                        <IconComponent className="text-white text-base" />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* === Buttons Section === */}
          <section
            aria-label="Action Buttons"
            className="flex items-center gap-3 mt-2 w-full mb-6 px-6"
          >
            <div className="flex gap-3 w-full justify-center">
              <Link
                href={`tel:${number}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition"
                title="Call"
              >
                <LuPhone size={20} className="text-white" />
              </Link>
              <Link
                href={`mailto:${email}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition"
                title="Email"
              >
                <LuMail size={20} className="text-white" />
              </Link>
              <button
                type="button"
                onClick={() => downloadVCard(userProfile)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition"
                title="Save Contact"
              >
                <LuBookmark size={20} className="text-white" />
              </button>
            </div>
          </section>
        </section>

        {/* === Company Overview Section === */}
        {companyBackground && (
          <section
            aria-label="Company Overview"
            className="w-full max-w-md px-6 mb-6"
          >
            <h2 className="text-base font-bold mb-2">Company Overview</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {companyBackground}
            </p>
          </section>
        )}

        {/* === Services Section === */}
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <section
            aria-label="Our Services"
            className="w-full max-w-md px-6 mb-8"
          >
            <h2 className="text-base font-bold mb-2">Our Services</h2>
            {serviceDescription && (
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {serviceDescription}
              </p>
            )}
            {servicePhotos && servicePhotos.length > 0 && (
              <div className="flex flex-col gap-4">
                {servicePhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="w-full overflow-hidden rounded-2xl"
                  >
                    <img
                      src={photo}
                      alt={`Service ${index + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* === Footer Section === */}
        <footer className="w-full max-w-md px-6 text-center text-gray-500 text-sm pb-8">
          <div className="font-semibold text-black mb-1">{company}</div>
          <div>© 2024 Zwiftech. All Rights Reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Template16;
