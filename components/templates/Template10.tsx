import { getCopyrightYear } from "@/lib/utils";
import wavy from "@/public/assets/wavy.png";
import { Card } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import {
  TemplateContainer,
  CTAButtons,
  SocialLinks,
  TemplateFooter,
} from "./templatesComponents";

// fonts
import { cn } from "@/lib/utils";
import { Michroma, Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});

// Company Showcase Component for Template10 - Dark Mode Optimized
const CompanyShowcase = ({
  companies,
  profilePictureUrl,
  firstName,
  lastName,
}: {
  companies?: Card["companies"];
  profilePictureUrl?: string;
  firstName?: string;
  lastName?: string;
}) => {
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null);

  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {companies.map((company, index) => (
        <div
          key={index}
          className="relative group"
          onMouseEnter={() => setHoveredCompany(index)}
          onMouseLeave={() => setHoveredCompany(null)}
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
            {/* Header Section */}
            <div className="relative p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
              <div className="flex items-center space-x-6">
                {/* Company Logo */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 p-0.5">
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        {company.company?.charAt(0) || "C"}
                      </span>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Company Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">
                    {company.company}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">
                      {company.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-8">
              {/* Company Background */}
              {company.companyBackground && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-white">
                      Company Overview
                    </h4>
                  </div>

                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                    <p className="text-slate-200 leading-relaxed text-sm">
                      {company.companyBackground}
                    </p>
                  </div>
                </div>
              )}

              {/* Service Description */}
              {company.serviceDescription && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className=" font-semibold text-white">
                      Services & Expertise
                    </h4>
                  </div>

                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                    <p className="text-slate-200 leading-relaxed text-sm">
                      {company.serviceDescription}
                    </p>
                  </div>
                </div>
              )}

              {/* Service Photos */}
              {Array.isArray(company.servicePhotos) &&
                company.servicePhotos.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h4 className=" font-semibold text-white">
                        Portfolio Gallery
                      </h4>
                    </div>
                    {company.servicePhotos.length === 1 ? (
                      <div className="relative group/photo">
                        <div className="rounded-2xl overflow-hidden border border-slate-700/50">
                          <Image
                            src={company.servicePhotos[0]}
                            alt={`${company.company} portfolio`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover/photo:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                            View Portfolio
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {company.servicePhotos.map((photo, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="relative group/photo rounded-2xl overflow-hidden border border-slate-700/50"
                          >
                            <Image
                              src={photo}
                              alt={`${company.company} portfolio ${photoIndex + 1}`}
                              width={300}
                              height={200}
                              className="w-full h-auto object-cover transition-all duration-500 group-hover/photo:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-3 left-3 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                              <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                                View {photoIndex + 1}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              {/* Contact Info */}
              <div className="pt-6 border-t border-slate-700/50">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-200 text-xs">
                      {firstName} {lastName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-slate-200 text-xs">
                      {company.position}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Template10 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  companies,
  firstName,
  lastName,
  email,
  number,
  facebookUrl,
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  tiktokUrl,
  viberUrl,
  whatsappNumber,
  websiteUrl,
  customUrl,
  owner,
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
    <TemplateContainer
      backgroundColor="bg-black"
      padding="md"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      alignItems="center"
      justifyContent="between"
    >
      <div className="flex-grow">
        <div className="w-full min-h-screen mx-auto max-w-[480px]">
          <div className="flex flex-col relative rounded-4xl ">
            <div className="w-full h-48">
              {coverPhotoUrl ? (
                <Image
                  src={coverPhotoUrl}
                  alt="Cover Image"
                  width={400}
                  height={200}
                  className="mx-auto w-full h-48 object-cover rounded-[2rem] overflow-hidden"
                />
              ) : (
                <Image
                  src={"/assets/template10coverphoto.png"}
                  alt="Cover Image"
                  width={400}
                  height={200}
                  className="mx-auto"
                />
              )}
              <Image
                className=" absolute right-0 top-0"
                src={wavy}
                alt="wavy"
                width={100}
                height={100}
              />
              <div className="flex gap-x-2 absolute right-0 top-0 text-[#FFFBD8] bg-black pl-4 pb-2 rounded-bl-3xl">
                <CTAButtons
                  number={number}
                  email={email}
                  userProfile={userProfile}
                  variant="floating"
                  size="sm"
                  icons="lucide"
                  buttonClassName="border-[#FFFBD8] text-[#FFFBD8] hover:bg-[#FFFBD8] hover:text-black bg-transparent"
                />
              </div>
            </div>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              {profilePictureUrl ? (
                <div className="border-[8px] border-black rounded-full mx-auto overflow-hidden">
                  <Image
                    src={profilePictureUrl}
                    alt="Profile Image"
                    width={80}
                    height={80}
                    className="rounded-full w-24 h-24"
                  />
                </div>
              ) : (
                <div className="bg-black w-28 h-28 rounded-full mx-auto flex items-center justify-center">
                  <Image
                    src={"/assets/template10samplepic.png"}
                    alt="Profile Image"
                    width={80}
                    height={80}
                    className="rounded-full w-24 h-24"
                  />
                </div>
              )}
            </div>
          </div>

          {/* PERSONAL INFORMATION */}
          <div className="text-center mt-14 space-y-1 ">
            {firstName ? (
              <h1
                className={cn(
                  "text-lg font-normal tracking-wider text-[#FFFBD8] capitalize",
                  firstName ? "mt-4" : "mt-2",
                  michroma.className
                )}
              >
                {firstName + " " + lastName}
              </h1>
            ) : (
              <h1 className="text-lg font-bold mt-2 ">Hussain Watkins</h1>
            )}

            <p
              className={cn(
                "text-sm tracking-wider text-[#9C9EFFE5] font-bold pt-1",
                firstName ? "mt-5" : "mt-3",
                poppins.className
              )}
            >
              {position ?? "Chief Technology Officer"}
            </p>

            <div className="gap-x-2 w-full text-[#B6BCD2] flex justify-center items-center">
              <input
                type="text"
                value={email ?? "H.Watkins@gmail.com"}
                readOnly
                className="max-w-[120px] truncate bg-transparent border-none outline-none cursor-pointer text-center font-light text-sm text-[#B6BCD2]"
                onClick={(e) => {
                  e.currentTarget.select();
                  navigator.clipboard.writeText(e.currentTarget.value);
                }}
              />
              <span>|</span>
              <input
                type="text"
                value={String(number ?? +639123456789)}
                readOnly
                className="max-w-[120px] truncate bg-transparent border-none outline-none cursor-pointer text-center font-light text-sm text-[#B6BCD2]"
                onClick={(e) => {
                  e.currentTarget.select();
                  navigator.clipboard.writeText(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          {/* SOCIAL MEDIA ICONS */}
          <div className="flex items-center gap-x-4 py-10 text-2xl text-[#B6BCD2] h-16 justify-center">
            <SocialLinks
              facebookUrl={facebookUrl}
              twitterUrl={twitterUrl}
              tiktokUrl={tiktokUrl}
              youtubeUrl={youtubeUrl}
              instagramUrl={instagramUrl}
              linkedinUrl={linkedinUrl}
              viberUrl={viberUrl}
              whatsappNumber={whatsappNumber}
              websiteUrl={websiteUrl}
              cardId={id}
              ownerId={owner}
              size="md"
              iconClassName="text-[#B6BCD2]"
              iconSet="outline"
            />
          </div>

          <hr className="border-[#B6BCD2]" />
          <div className=" flex flex-col gap-y-3 flex-grow border-t text-white mt-2">
            <h2 className="text-lg font-bold">Professional Portfolio</h2>
            <p className="text-sm">
              Below you&#39;ll find details about my professional experience and
              the companies I&#39;ve worked with. Each entry highlights my role,
              responsibilities, and the services offered.
            </p>

            <div className="w-full mx-auto mt-4">
              {companies && companies.length > 0 && (
                <CompanyShowcase
                  companies={companies}
                  profilePictureUrl={profilePictureUrl}
                  firstName={firstName}
                  lastName={lastName}
                />
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <TemplateFooter className="flex flex-col items-center mt-8 gap-1 text-center text-xs">
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
        </TemplateFooter>
      </div>
    </TemplateContainer>
  );
};

export default Template10;
