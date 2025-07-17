import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaSkype,
  FaGlobe,
  FaViber,
  FaTiktok,
} from "react-icons/fa6";
import {
  MdOutlinePhone,
  MdOutlineMailOutline,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
// import { LuBookmark, LuMail } from "react-icons/lu";
import { Button } from "../ui/button";

const Template13 = ({
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#553838] text-white flex flex-col items-center justify-center py-8 px-4 relative overflow-hidden">
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Peach background light top right (background only) */}
        {/*
        <div
          className="absolute -top-14 ml-52 w-52 h-52 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 80% 20%, rgb(95, 56, 59) 85%, transparent 100%)',
            borderRadius: '9999px',
            filter: 'blur(32px)',
            opacity: 0.85,
          }}
        ></div>
        */}
        {/* Cover Photo with Top Right Icons Overlay, now as background for profile */}
        <div className="w-full max-w-md mb-8 relative flex flex-col items-center">
          <div className="w-full h-40 rounded-2xl overflow-hidden bg-neutral-800 relative">
            <img
              src={coverPhotoUrl || "/assets/sampleCoverPhoto.png"}
              alt="Cover Photo"
              className="object-cover w-full h-full"
            />
            {/* Top right icons overlay */}
            {/* <div className="flex gap-x-2 absolute right-2 top-2 text-white ">
              <span className=" text-lg font-semibold  border border-[#FFFBD8] rounded-full p-1 ">
                <a href={`mailto:${email}`}>
                  <MdOutlineMailOutline className="cursor-pointer" />
                </a>
              </span>
              <span className=" text-lg font-semibold  border border-[#FFFBD8] rounded-full p-1 ">
                <MdOutlineBookmarkBorder
                  className="cursor-pointer"
                  onClick={() => downloadVCard(userProfile)}
                />
              </span>
            </div> */}
          </div>
          {/* Profile section, now overlapping the cover photo and aligned left */}
          <div className="flex flex-col items-start w-full px-4 -mt-12 z-10">
            <div className="w-24 h-24 flex items-center justify-center mb-4 shadow-lg relative">
              <img
                src={profilePictureUrl}
                alt="avatar"
                className="w-24 h-24 object-cover"
                style={{
                  WebkitMaskImage: "url(/assets/template13profileshape.svg)",
                  maskImage: "url(/assets/template13profileshape.svg)",
                  WebkitMaskSize: "cover",
                  maskSize: "cover",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  background: "#fff", // fallback
                }}
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-semibold tracking-tight text-white leading-snug">
                {prefix && <span>{prefix}. </span>}
                {firstName}
                {middleName && <span> {middleName}</span>}
                {lastName && <span> {lastName}</span>}
                {suffix && <span>, {suffix}</span>}
              </h1>
            </div>
            <div className="text-base text-gray-300 mb-4">
              {position} {company && <>· {company}</>}
            </div>
            <div className="flex gap-2 mb-2">
              <Link
                href={`tel:${number}`}
                className="bg-white text-black px-3 py-3 rounded-full font-medium hover:bg-gray-200 transition"
              >
                <MdOutlinePhone size={20} className="cursor-pointer" />
              </Link>
              <Link
                href={`mailto:${email}`}
                className="bg-white text-black px-3 py-3 rounded-full font-medium hover:bg-gray-200 transition"
              >
                {/* <Button className="bg-[#eab8b9] text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#d99ca0] transition">
                  <img
                    src="/assets/template13rockhand.svg"
                    alt="Rock hand"
                    className="w-5 h-5"
                  />
                  Let’s Talk
                </Button> */}
                <MdOutlineMailOutline size={20} className="cursor-pointer" />
              </Link>
              <div className="bg-white text-black px-3 py-3 rounded-full font-medium hover:bg-gray-200 transition">
                <MdOutlineBookmarkBorder
                  size={20}
                  className="cursor-pointer"
                  onClick={() => downloadVCard(userProfile)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Contact Info */}
        <div className="w-full max-w-md mb-8 px-4">
          <h2 className="text-lg font-bold mb-4 text-white text-left">
            Contact Information
          </h2>
          <div className="grid grid-cols-2 gap-y-2 text-gray-300">
            <span className="text-left">Email</span>
            <span className="font-medium text-white text-left">{email}</span>
            <span className="text-left">Number</span>
            <span className="font-medium text-white text-left">{number}</span>
            <span className="text-left">Links</span>
            <span className="flex flex-wrap gap-3 text-xl text-left">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              )}
              {youtubeUrl && (
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              )}
              {twitterUrl && (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                  <FaXTwitter />
                </a>
              )}
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              )}
              {skypeInviteUrl && (
                <a
                  href={skypeInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaSkype />
                </a>
              )}
              {websiteUrl && (
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  <FaGlobe />
                </a>
              )}
              {viberUrl && (
                <a href={viberUrl} target="_blank" rel="noopener noreferrer">
                  <FaViber />
                </a>
              )}
              {tiktokUrl && (
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer">
                  <FaTiktok />
                </a>
              )}
            </span>
          </div>
        </div>
        {/* Company Overview */}
        <div className="w-full max-w-md mb-8 px-4">
          <h2 className="text-lg font-bold mb-2 text-white text-left">
            Company Overview
          </h2>
          <p className="text-gray-300 text-base text-left">
            {companyBackground}
          </p>
        </div>
        {/* Our Services */}
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <div className="w-full max-w-md px-4">
            <h2 className="text-lg font-bold mb-4 text-white text-left">
              Our Services
            </h2>
            {serviceDescription && (
              <p className="text-gray-300 text-base text-left mb-4">
                {serviceDescription}
              </p>
            )}
            {servicePhotos && servicePhotos.length > 0 && (
              <div className="flex flex-col gap-4 pb-2">
                {servicePhotos.map((photo, idx) => (
                  <div key={idx} className="w-full flex justify-center">
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-white">
                      <Image
                        src={photo}
                        alt={`Service Photo ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <footer className="w-full max-w-md mx-auto mt-8 py-4 text-center text-gray-400 text-sm border-t border-neutral-800">
          <div className="font-semibold text-base text-white mb-1">
            {company}
          </div>
          <div>© 2024 Zwiftech. All Right Reserved.</div>
        </footer>
      </div>
    </div>
  );
};

export default Template13;
