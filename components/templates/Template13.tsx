import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  TemplateContainer,
  Template13Socials,
  TemplateFooter,
  CTAButtons,
} from "./templatesComponents";

// Company Showcase Component for Template13 - Modern Card Design
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
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {companies.map((company, index) => (
        <div key={index} className="relative group">
          {/* Main Container - Modern Card Design */}
          <div className="relative bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#553838]/20 transition-all duration-500">
            {/* Top Accent Bar */}
            <div className="h-1 bg-gradient-to-r from-[#553838] via-[#6b4a4a] to-[#553838]"></div>

            {/* Company Header */}
            <div className="p-5 border-b border-neutral-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Company Icon */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#553838] to-[#6b4a4a] rounded-xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
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
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#553838] rounded-full border-2 border-[#1a1a1a]"></div>
                  </div>

                  {/* Company Info */}
                  <div>
                    <h3 className="text-lg font-bold text-white capitalize mb-1">
                      {company.company}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-[#553838] font-medium">
                        {company.position}
                      </span>
                      <div className="w-1 h-1 bg-neutral-600 rounded-full"></div>
                      <span className="text-gray-400">
                        {firstName} {lastName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="p-5 space-y-5">
              {/* Company Background */}
              {company.companyBackground && (
                <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-4 border border-neutral-800">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-[#553838] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-white text-base">
                      Company Overview
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm pl-11">
                    {company.companyBackground}
                  </p>
                </div>
              )}

              {/* Service Description */}
              {company.serviceDescription && (
                <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-4 border border-neutral-800">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-[#553838] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
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
                    <h4 className="font-semibold text-white text-base">
                      Services & Expertise
                    </h4>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm pl-11">
                    {company.serviceDescription}
                  </p>
                </div>
              )}

              {/* Portfolio Gallery */}
              {Array.isArray(company.servicePhotos) &&
                company.servicePhotos.length > 0 && (
                  <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl p-4 border border-neutral-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-[#553838] rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
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
                      <h4 className="font-semibold text-white text-base">
                        Portfolio Gallery
                      </h4>
                    </div>

                    <div className="pl-11">
                      {company.servicePhotos.length === 1 ? (
                        <div className="relative group/photo">
                          <div className="rounded-xl overflow-hidden border border-neutral-700 shadow-lg">
                            <Image
                              src={company.servicePhotos[0]}
                              alt={`${company.company} portfolio`}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover/photo:scale-110"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#553838]/60 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          <div className="absolute bottom-4 left-4 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-sm font-medium bg-[#553838] px-4 py-2 rounded-full shadow-lg">
                              View Portfolio
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {company.servicePhotos.map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="relative group/photo rounded-xl overflow-hidden border border-neutral-700 shadow-lg"
                            >
                              <Image
                                src={photo}
                                alt={`${company.company} portfolio ${photoIndex + 1}`}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover transition-all duration-500 group-hover/photo:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#553838]/60 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute bottom-3 left-3 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                <span className="text-white text-xs font-medium bg-[#553838] px-3 py-1 rounded-full shadow-lg">
                                  View {photoIndex + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

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
  companies,
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  youtubeUrl,
  twitterUrl,
  whatsappNumber,
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
    <TemplateContainer
      backgroundColor="bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#553838]"
      padding="xs"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      className="text-white py-2"
    >
      <div className="max-w-[480px] mx-auto flex flex-col">
        {/* === Profile and Cover Section === */}
        <section
          aria-label="Profile Section"
          className="w-full mb-8 relative flex flex-col items-center"
        >
          <div className="w-full h-40 rounded-2xl overflow-hidden bg-neutral-800 relative">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Photo"
                width={480}
                height={160}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = "/assets/sampleCoverPhoto.png";
                }}
              />
            ) : (
              <Image
                src="/assets/template9coverphoto.png"
                alt="Default Cover Photo"
                width={480}
                height={160}
                className="object-cover w-full h-full"
              />
            )}
          </div>

          <div className="flex flex-col items-start w-full px-4 -mt-12 z-10">
            <div className="w-24 h-24 flex items-center justify-center mb-4 shadow-lg relative">
              <Image
                src={profilePictureUrl || "/assets/template4samplepic.png"}
                alt="avatar"
                width={96}
                height={96}
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
              {firstName ? (
                <h1 className="font-semibold tracking-tight text-white leading-snug">
                  {prefix && <span>{prefix}. </span>}
                  {firstName}
                  {middleName && <span> {middleName}</span>}
                  {lastName && <span> {lastName}</span>}
                  {suffix && <span>, {suffix}</span>}
                </h1>
              ) : (
                <h1 className="font-semibold tracking-tight text-white leading-snug">
                  Hussain Watkins
                </h1>
              )}
            </div>
            <div className="text-sm text-gray-300 mb-4 font-medium">
              {position || "Chief Technology Officer"}{" "}
              {`@ ${company || "Zwiftech"}`}
            </div>
            <div className="flex gap-2 mb-2">
              <CTAButtons
                number={number}
                email={email}
                userProfile={userProfile}
                variant="floating"
                size="md"
                icons="lucide"
                buttonClassName="bg-white text-black "
              />
            </div>
          </div>
        </section>

        {/* === Contact Info Section === */}
        <section aria-label="Contact Information" className="w-full mb-8 px-4">
          <h2 className="font-bold mb-4 text-white text-left">
            Contact Information
          </h2>
          <div className="grid grid-cols-2 gap-y-2 text-gray-300">
            <span className="text-left font-medium text-sm">Email</span>
            <span className="font-medium text-[12px] text-white text-left break-all">
              {email}
            </span>
            <span className="text-left font-medium text-sm">Number</span>
            <span className="font-medium text-white text-left text-[12px]">
              {number}
            </span>
            <span className="text-left font-medium text-sm">Links</span>
            <span className="flex flex-wrap gap-3 text-xl text-left">
              <Template13Socials
                facebookUrl={facebookUrl}
                twitterUrl={twitterUrl}
                tiktokUrl={tiktokUrl}
                youtubeUrl={youtubeUrl}
                instagramUrl={instagramUrl}
                linkedinUrl={linkedinUrl}
                viberUrl={viberUrl}
                whatsappNumber={whatsappNumber}
                websiteUrl={websiteUrl}
                size="md"
              />
            </span>
          </div>
        </section>
      </div>
      <div className="flex-1 w-full max-w-[480px] mx-auto pb-4">
        <div className=" flex flex-col gap-y-2 flex-grow text-white px-3 border-t border-neutral-500">
          <h2 className="text-lg font-bold mt-3 text-white">
            Professional Portfolio
          </h2>
          <p className="text-sm text-gray-300">
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

      {/* === Footer Section === */}
      <TemplateFooter className="w-full mx-auto mt-2  text-center text-gray-400 text-sm border-t border-neutral-500">
        <div className="flex flex-col items-center py-4 gap-1 text-center text-xs">
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
        </div>
      </TemplateFooter>
    </TemplateContainer>
  );
};

export default Template13;
