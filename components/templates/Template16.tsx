import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import { LuMail, LuPhone } from "react-icons/lu";
import {
  CTAButtons,
  SocialLinks,
  TemplateContainer,
  TemplateFooter,
} from "./templatesComponents";

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
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  youtubeUrl,
  whatsappNumber,
  websiteUrl,
  viberUrl,
  tiktokUrl,
  customUrl,
  companies,
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
      backgroundColor="bg-white"
      padding="none"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      alignItems="center"
      className="font-sans"
    >
      <div className="flex-grow">
      <div className="max-w-[480px] mx-auto flex flex-col">
        {/* === Cover Section === */}
        <section
          aria-label="Cover Section"
          className="w-full max-w-md h-40 relative"
        >
          <Image
            src={coverPhotoUrl || "/assets/template2coverphoto.png"}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="w-20 h-20 rounded-full border-[5px] border-white overflow-hidden shadow-md flex-shrink-0 absolute z-20 -bottom-10 left-4">
            <Image
              src={profilePictureUrl || "/assets/template4samplepic.png"}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* === Profile Section === */}
        <section
          aria-label="Profile Section"
          className="w-full max-w-md px-6 mt-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
            {/* Info below/right of avatar */}
            <div className="flex-1 mt-2 sm:mt-3 text-center sm:text-left">
              {/* Name & Title */}
              <h1 className="text-base sm:text-lg font-semibold">
                {prefix && `${prefix}. `}
                {firstName} {middleName && `${middleName} `}
                {lastName}
                {suffix && `, ${suffix}`}
              </h1>
              <p className="text-sm text-gray-600 font-medium mt-1">
                {position} {company && `@ ${company}`}
              </p>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-2 text-xs text-gray-700">
                {email && (
                  <div className="flex items-center gap-1">
                    <LuMail className="text-gray-500" />
                    <a
                      href={`mailto:${email}`}
                      className="hover:underline truncate max-w-[200px]"
                    >
                      {email}
                    </a>
                  </div>
                )}
                {number && (
                  <div className="flex items-center gap-1">
                    <LuPhone className="text-gray-500" />
                    <a href={`tel:${number}`} className="hover:underline">
                      {number}
                    </a>
                  </div>
                )}
              </div>

              {/* Social Icons */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <SocialLinks
                  facebookUrl={facebookUrl}
                  instagramUrl={instagramUrl}
                  linkedinUrl={linkedinUrl}
                  twitterUrl={twitterUrl}
                  youtubeUrl={youtubeUrl}
                  tiktokUrl={tiktokUrl}
                  whatsappNumber={whatsappNumber}
                  viberUrl={viberUrl}
                  websiteUrl={websiteUrl}
                  cardId={id}
                  ownerId={owner}
                  size="sm"
                  iconClassName="rounded-full p-2 bg-black text-white hover:bg-gray-800 size-full "
                  iconSet="outline"
                  className="justify-start"
                />
              </div>
            </div>
          </div>

          {/* === Buttons Section === */}
          <section
            aria-label="Action Buttons"
            className="flex items-center gap-3 mt-6 w-full mb-6 px-6"
          >
            <div className="flex gap-3 w-full justify-center">
              <CTAButtons
                number={number}
                email={email}
                userProfile={userProfile}
                variant="pills"
                size="md"
                icons="lucide"
                buttonClassName="bg-black text-white hover:bg-gray-800"
              />
            </div>
          </section>
        </section>

        {/* === Companies Section === */}
        {companies?.length > 0 && (
          <div className="w-full px-6 mb-6">
            <h2 className="text-base font-bold text-black mb-4 text-center">
              Professional Portfolio
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Below you'll find details about my professional experience and the
              companies I've worked with.
            </p>

            <div className="space-y-5">
              {companies.map((company, idx) => (
                <div key={idx} className="relative group">
                  {/* Modern Company Card - Minimalist Design */}
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Header with Gradient Background */}
                    <div className="relative p-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-4">
                          {/* Company Logo */}
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                              <span className="text-white font-bold text-lg">
                                {company.company?.charAt(0) || "C"}
                              </span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>

                          {/* Company Info */}
                          <div>
                            <h3 className="text-base font-bold text-gray-900 capitalize">
                              {company.company}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-purple-600 text-sm font-medium">
                                {company.position}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Sections */}
                    <div className="p-5 space-y-4">
                      {/* Company Background */}
                      {company.companyBackground && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-purple-600"
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
                            <h4 className="font-semibold text-gray-900 text-sm">
                              Company Overview
                            </h4>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {company.companyBackground}
                          </p>
                        </div>
                      )}

                      {/* Service Description */}
                      {company.serviceDescription && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-purple-600"
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
                            <h4 className="font-semibold text-gray-900 text-sm">
                              Services & Expertise
                            </h4>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {company.serviceDescription}
                          </p>
                        </div>
                      )}

                      {/* Portfolio Gallery */}
                      {company.servicePhotos &&
                        company.servicePhotos.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-4">
                              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 text-purple-600"
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
                              <h4 className="font-semibold text-gray-900 text-sm">
                                Portfolio Gallery
                              </h4>
                            </div>

                            <div>
                              {company.servicePhotos.length === 1 ? (
                                <div className="relative group/photo">
                                  <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                    <img
                                      src={company.servicePhotos[0]}
                                      alt={`${company.company} portfolio`}
                                      className="w-full h-auto object-cover transition-transform duration-300 group-hover/photo:scale-105"
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                  <div className="absolute bottom-3 left-3 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                    <span className="text-white text-sm font-medium bg-purple-600 px-3 py-1 rounded-full shadow-md">
                                      View Portfolio
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-2 gap-3">
                                  {company.servicePhotos.map(
                                    (photo, photoIdx) => (
                                      <div
                                        key={photoIdx}
                                        className="relative group/photo rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                                      >
                                        <img
                                          src={photo}
                                          alt={`${company.company} portfolio ${photoIdx + 1}`}
                                          className="w-full h-auto object-cover transition-all duration-300 group-hover/photo:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-2 left-2 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                          <span className="text-white text-xs font-medium bg-purple-600 px-2 py-1 rounded-full shadow-md">
                                            View {photoIdx + 1}
                                          </span>
                                        </div>
                                      </div>
                                    )
                                  )}
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
          </div>
        )}
      </div>
      </div>

      {/* === Footer Section === */}
      <TemplateFooter className="w-full max-w-md px-6 text-center text-gray-500 text-sm mt-2">
        <div className="flex flex-col pb-4 items-center gap-1 text-center text-xs">
          <a
            href={userProfile?.customUrl ?? userProfile?.websiteUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/dark-ZwiftechLogo.png"
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

export default Template16;
