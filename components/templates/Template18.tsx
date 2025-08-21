import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaSkype,
  FaTwitter,
  FaViber,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";
import { SiTiktok } from "react-icons/si";

const Template18 = ({
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
  companies,
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
    <div className="min-h-screen bg-[#001e36] flex items-center justify-center relative overflow-hidden text-white">
      <div className="max-w-[480px] mx-auto flex flex-col min-h-screen">
        {/* === Decorative Background === */}
        <div
          className="absolute top-10 left-10 w-48 h-48 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 30%, rgba(96, 165, 250, 0.15) 70%, rgba(37, 99, 235, 0.3) 100%)",
            filter: "blur(8px)",
          }}
        ></div>
        <div
          className="absolute top-1/2 right-8 w-36 h-36 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 30%, rgba(34, 211, 238, 0.12) 70%, rgba(59, 130, 246, 0.25) 100%)",
            filter: "blur(8px)",
          }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-56 h-56 rounded-full"
          style={{
            background:
              "radial-gradient(circle, transparent 35%, rgba(147, 197, 253, 0.1) 75%, rgba(99, 102, 241, 0.2) 100%)",
            filter: "blur(10px)",
          }}
        ></div>

        {/* === Cover and Profile Section === */}
        <section
          aria-label="Cover and Profile Section"
          className="relative px-2 sm:px-3 pb-6"
        >
          {/* Cover Image */}
          <div
            className="relative h-64 bg-cover bg-center rounded-t-[30px]"
            style={{
              backgroundImage: `url(${coverPhotoUrl})`,
            }}
          />

          {/* Profile Content */}
          <div className="-mt-20 px-4 sm:px-6">
            <div className="bg-[#123B57] rounded-xl px-4 sm:px-5 py-5 sm:py-6 shadow-lg relative text-center">
              {/* Profile Picture */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                  {profilePictureUrl ? (
                    <img
                      src={profilePictureUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-purple-500 w-full h-full rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">HW</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="mt-9">
                <h2 className="text-lg font-bold">
                  {prefix && `${prefix}. `}
                  {firstName} {middleName && `${middleName} `}
                  {lastName}
                  {suffix && `, ${suffix}`}
                </h2>
                <div className="text-sm mt-1">
                  {company} {position && `| ${position}`}
                </div>
                <div className="text-xs mt-1 break-words text-gray-300">
                  {email && (
                    <>
                      {email}
                      {number && ` | ${number}`}
                    </>
                  )}
                  {!email && number && number}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full mt-3 sm:mt-4">
                  <div className="flex gap-3 w-full justify-center">
                    <a
                      href={`tel:${number}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white transition-all duration-300"
                      title="Call"
                    >
                      <MdOutlinePhone size={20} />
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white transition-all duration-300"
                      title="Email"
                    >
                      <MdOutlineMailOutline size={20} />
                    </a>
                    <button
                      type="button"
                      onClick={() => downloadVCard(userProfile)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white transition-all duration-300"
                      title="Save Contact"
                    >
                      <MdOutlineBookmarkBorder size={20} />
                    </button>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3 sm:mt-5 text-white max-w-xs mx-auto">
                  {[
                    {
                      url: facebookUrl,
                      icon: FaFacebookF,
                      href: facebookUrl,
                      bgColor: "bg-blue-600 hover:bg-blue-700",
                    },
                    {
                      url: linkedinUrl,
                      icon: FaLinkedinIn,
                      href: linkedinUrl,
                      bgColor: "bg-blue-500 hover:bg-blue-600",
                    },
                    {
                      url: instagramUrl,
                      icon: FaInstagram,
                      href: instagramUrl,
                      bgColor: "bg-pink-500 hover:bg-pink-600",
                    },
                    {
                      url: twitterUrl,
                      icon: FaTwitter,
                      href: twitterUrl,
                      bgColor: "bg-sky-500 hover:bg-sky-600",
                    },
                    {
                      url: youtubeUrl,
                      icon: FaYoutube,
                      href: youtubeUrl,
                      bgColor: "bg-red-600 hover:bg-red-700",
                    },
                    {
                      url: whatsappNumber,
                      icon: FaWhatsapp,
                      href: `https://wa.me/${whatsappNumber}`,
                      bgColor: "bg-green-500 hover:bg-green-600",
                    },
                    {
                      url: skypeInviteUrl,
                      icon: FaSkype,
                      href: skypeInviteUrl,
                      bgColor: "bg-blue-400 hover:bg-blue-500",
                    },
                    {
                      url: viberUrl,
                      icon: FaViber,
                      href: viberUrl,
                      bgColor: "bg-purple-500 hover:bg-purple-600",
                    },
                    {
                      url: tiktokUrl,
                      icon: SiTiktok,
                      href: tiktokUrl,
                      bgColor: "bg-black hover:bg-gray-800",
                    },
                    {
                      url: websiteUrl,
                      icon: FaGlobe,
                      href: websiteUrl,
                      bgColor: "bg-gray-600 hover:bg-gray-700",
                    },
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
                          className={`p-2 ${social.bgColor} rounded-full transition`}
                        >
                          <IconComponent className="text-sm sm:text-base" />
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Companies Section === */}
        {companies?.length > 0 && (
          <section
            aria-label="Companies"
            className="px-3 sm:px-4 pb-3 text-xs sm:text-sm flex-1"
          >
            <h3 className="text-[#00d4ff] font-semibold text-sm sm:text-base text-center mb-2">
              Professional Portfolio
            </h3>
            <p className="text-gray-300 text-center mb-3 sm:mb-4">
              A snapshot of my experience and the companies I’ve worked with.
            </p>

            <div className="space-y-4">
              {companies.map((c, idx) => (
                <div
                  key={idx}
                  className="relative group bg-[#0b2b45] rounded-xl border border-[#00d4ff]/20 shadow-[0_0_0_1px_rgba(0,212,255,0.08)] hover:shadow-[0_0_0_1px_rgba(0,212,255,0.18),0_10px_30px_-10px_rgba(0,212,255,0.25)] transition-all duration-300 overflow-hidden"
                >
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-60" />

                  <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-r from-[#0b2b45] to-[#0f395a]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#4dd9ff] text-[#001e36] flex items-center justify-center font-bold shadow-sm">
                          <span className="text-sm">
                            {c.company?.charAt(0) || "C"}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white text-sm sm:text-base font-semibold capitalize">
                            {c.company}
                          </h4>
                          <div className="text-[11px] sm:text-xs text-[#7cecff] font-medium">
                            {c.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {c.companyBackground && (
                      <div className="rounded-lg p-3 border border-white/5 bg-white/5 backdrop-blur-[1px]">
                        <h5 className="font-semibold text-white text-xs sm:text-sm mb-1">
                          Company Overview
                        </h5>
                        <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                          {c.companyBackground}
                        </p>
                      </div>
                    )}

                    {c.serviceDescription && (
                      <div className="rounded-lg p-3 border border-white/5 bg-white/5 backdrop-blur-[1px]">
                        <h5 className="font-semibold text-white text-xs sm:text-sm mb-1">
                          Services & Expertise
                        </h5>
                        <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                          {c.serviceDescription}
                        </p>
                      </div>
                    )}

                    {c.servicePhotos && c.servicePhotos.length > 0 && (
                      <div className="rounded-lg p-3 border border-white/5 bg-white/5 backdrop-blur-[1px]">
                        <h5 className="font-semibold text-white text-xs sm:text-sm mb-2">
                          Portfolio Gallery
                        </h5>
                        {c.servicePhotos.length === 1 ? (
                          <div className="rounded-lg overflow-hidden border border-[#00d4ff]/20">
                            <img
                              src={c.servicePhotos[0]}
                              alt={`${c.company} portfolio`}
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {c.servicePhotos.map((photo, pIdx) => (
                              <div
                                key={pIdx}
                                className="rounded-lg overflow-hidden border border-[#00d4ff]/20"
                              >
                                <img
                                  src={photo}
                                  alt={`${c.company} portfolio ${pIdx + 1}`}
                                  className="w-full h-auto object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === Footer Section === */}
        <footer className="bg-[#001d34] text-white text-center text-xs py-4">
          <div className="flex flex-col items-center gap-1 text-center text-xs">
            <a
              href={userProfile?.customUrl ?? userProfile?.websiteUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/light-ZwiftechLogo.png"
                alt="Zwiftech Logo"
                width={40}
                height={15}
                priority
                className="opacity-90"
              />
            </a>

            <span className="tracking-wide text-gray-400 text-[10px] ">
              © {getCopyrightYear()} Zwiftech. All Rights Reserved.
            </span>
          </div>{" "}
        </footer>
      </div>
    </div>
  );
};

export default Template18;
