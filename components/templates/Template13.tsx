import React from "react";
import { Card } from "@/types/types";
import { LuMail, LuHeart, LuGlobe, LuTwitter, LuFacebook, LuLinkedin, LuInstagram, LuYoutube } from "react-icons/lu";
import { FaWhatsapp, FaViber, FaTiktok, FaSkype } from "react-icons/fa6";

const Template13 = ({
  firstName,
  lastName,
  position,
  profilePictureUrl,
  email,
  number,
  company,
  companyBackground,
  serviceDescription,
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
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#2d2327] text-white flex flex-col items-center py-8 px-4 relative overflow-hidden">
      {/* Peach background light top right (background only) */}
      <div
        className="absolute -top-14 -right-8 w-52 h-52 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgb(95, 56, 59) 85%, transparent 100%)',
          borderRadius: '9999px',
          filter: 'blur(32px)',
          opacity: 0.85,
        }}
      ></div>
      {/* Content wrapper with higher z-index */}
      <div className="relative z-10 w-full flex flex-col items-start">
        {/* Top right icons */}
        <div className="absolute top-2 right-0 flex z-20">
          <button className="rounded-full transition">
            <img src="/assets/template13mailicon.svg" alt="Mail" className="w-8 h-8" />
          </button>
          <button className="rounded-full transition">
            <img src="/assets/template13hearticon.svg" alt="Heart" className="w-8 h-8" />
          </button>
        </div>
        {/* Profile section */}
        <div className="flex flex-col items-start mt-20">
          <div className="w-20 h-20 flex items-center justify-center mb-4 shadow-lg relative">
            <img
              src={profilePictureUrl || "/default-user.png"}
              alt="avatar"
              className="w-24 h-24 object-cover"
              style={{
                WebkitMaskImage: 'url(/assets/template13profileshape.svg)',
                maskImage: 'url(/assets/template13profileshape.svg)',
                WebkitMaskSize: 'cover',
                maskSize: 'cover',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                background: '#fff', // fallback
              }}
            />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white">{firstName} {lastName}</h1>
            <span
              className="text-black text-xs font-semibold px-2 py-0.5 rounded"
              style={{
                background: "linear-gradient(90deg, #d2ebb9 0%, #fce99c 100%)",
                display: "inline-block",
              }}
            >
              PRO
            </span>
          </div>
          <div className="text-base text-gray-300 mb-4">{position}</div>
          <div className="flex gap-2 mb-6">
            <button className="bg-[#eab8b9] text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-[#d99ca0] transition">
              <img src="/assets/template13rockhand.svg" alt="Rock hand" className="w-5 h-5" />
              Let’s Talk
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition">Save</button>
          </div>
          <p className="text-left text-gray-300 max-w-md mb-8">
            A passionate product designer with experience in building a scalable design system for a company from the ground up.
          </p>
        </div>
        {/* Contact Info */}
        <div className="w-full max-w-md mb-8">
          <h2 className="text-lg font-bold mb-4 text-white text-left">Contact Information</h2>
          <div className="grid grid-cols-2 gap-y-2 text-gray-300">
            <span className="text-left">Email</span>
            <span className="font-medium text-white text-left">{email}</span>
            <span className="text-left">Number</span>
            <span className="font-medium text-white text-left">{number}</span>
            <span className="text-left">Links</span>
            <span className="flex flex-wrap gap-3 text-xl text-left">
              {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer"><LuFacebook /></a>}
              {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"><LuLinkedin /></a>}
              {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer"><LuInstagram /></a>}
              {youtubeUrl && <a href={youtubeUrl} target="_blank" rel="noopener noreferrer"><LuYoutube /></a>}
              {twitterUrl && <a href={twitterUrl} target="_blank" rel="noopener noreferrer"><LuTwitter /></a>}
              {whatsappNumber && <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>}
              {skypeInviteUrl && <a href={skypeInviteUrl} target="_blank" rel="noopener noreferrer"><FaSkype /></a>}
              {websiteUrl && <a href={websiteUrl} target="_blank" rel="noopener noreferrer"><LuGlobe /></a>}
              {viberUrl && <a href={viberUrl} target="_blank" rel="noopener noreferrer"><FaViber /></a>}
              {tiktokUrl && <a href={tiktokUrl} target="_blank" rel="noopener noreferrer"><FaTiktok /></a>}
            </span>
          </div>
        </div>
        {/* Company Overview */}
        <div className="w-full max-w-md mb-8">
          <h2 className="text-lg font-bold mb-2 text-white text-left">Company Overview</h2>
          <p className="text-gray-300 text-base text-left">
            {companyBackground || "Codebility is a tech consulting firm that specializes in custom software development, including web and mobile apps. They deliver scalable, user-friendly solutions using agile methodologies."}
          </p>
        </div>
        {/* Our Services */}
        <div className="w-full max-w-md">
          <h2 className="text-lg font-bold mb-4 text-white text-left">Our Services</h2>
          <div className="flex flex-col gap-4">
            {/* Service 1 */}
            <div className="rounded-2xl bg-[#caeab8] text-black p-4 flex flex-col gap-2 relative overflow-hidden">
              {/* Background SVG */}
              <img
                src="/assets/template13bgicon1.svg"
                alt=""
                aria-hidden="true"
                className="absolute left-8 bottom-4 w-48 pointer-events-none select-none"
                style={{ zIndex: 0 }}
              />
              <div className="font-bold text-lg text-left relative z-10">Custom Software Development</div>
              <div className="text-sm text-left relative z-10">
                We deliver tailored solutions that enhance efficiency, drive growth, and foster innovation for businesses across industries.
              </div>
              <div className="flex justify-end relative z-10">
                <img
                  src="/assets/template13service1.svg"
                  alt="Custom Software Development"
                  className="w-24 h-24"
                  style={{ minWidth: 96, minHeight: 96 }}
                />
              </div>
            </div>
            {/* Service 2 */}
            <div className="rounded-2xl bg-[#ffea97] text-black p-4 flex flex-col gap-2 relative overflow-hidden">
              {/* Background SVG */}
              <img
                src="/assets/template13bgicon2.svg"
                alt=""
                aria-hidden="true"
                className="absolute left-8 bottom-4 w-48 pointer-events-none select-none"
                style={{ zIndex: 0 }}
              />
              <div className="font-bold text-lg text-left relative z-10">Web & Mobile App Development</div>
              <div className="text-sm text-left relative z-10">
                Building responsive, scalable, and secure applications.
              </div>
              <div className="flex justify-end relative z-10">
                <img
                  src="/assets/template13service2.svg"
                  alt="Web & Mobile App Development"
                  className="w-24 h-24"
                  style={{ minWidth: 96, minHeight: 96 }}
                />
              </div>
            </div>
            {/* Service 3 */}
            <div className="rounded-2xl bg-[#b6cce4] text-black p-4 flex flex-col gap-2 relative overflow-hidden">
              {/* Background SVG */}
              <img
                src="/assets/template13bgicon3.svg"
                alt=""
                aria-hidden="true"
                className="absolute left-8 bottom-4 w-48 pointer-events-none select-none"
                style={{ zIndex: 0 }}
              />
              <div className="font-bold text-lg text-left relative z-10">Enterprise Software Development</div>
              <div className="text-sm text-left relative z-10">
                We provide scalable, efficient solutions for large organizations, optimizing workflows and supporting growth.
              </div>
              <div className="flex justify-end relative z-10">
                <img
                  src="/assets/template13service3.svg"
                  alt="Enterprise Software Development"
                  className="w-24 h-24"
                  style={{ minWidth: 96, minHeight: 96 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template13;
