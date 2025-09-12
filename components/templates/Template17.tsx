import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  CTAButtons,
  SocialLinks,
  TemplateContainer,
  TemplateFooter,
} from "./templatesComponents";

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
      padding="xs"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      className="shadow-xl p-0 overflow-hidden font-sans pt-2"
    >
      <div className="max-w-[480px] mx-auto flex flex-col">
        {/* === Profile and Cover Section === */}
        <section
          aria-label="Cover Section"
          className="relative h-36 sm:h-44 w-full px-2 sm:px-3"
        >
          <div className="relative w-full h-48 sm:h-60 overflow-hidden">
            {/* Image with clip-path */}
            <Image
              src={coverPhotoUrl || "/assets/template-7-cover-photo.jpeg"}
              alt="Cover"
              width={480}
              height={240}
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
              <Image
                src={profilePictureUrl || "/assets/template4samplepic.png"}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        {/* === Profile Info Section === */}
        <section
          aria-label="Profile Section"
          className="pt-12 sm:pt-16 pb-4 sm:pb-6 px-3 sm:px-4 flex flex-col items-center"
        >
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

          {/* Buttons */}
          <div className="flex gap-3 w-full justify-center mt-3 sm:mt-4">
            <CTAButtons
              number={number}
              email={email}
              userProfile={userProfile}
              variant="pills"
              size="md"
              icons="lucide"
              buttonClassName="bg-[#FF4B5C] text-white hover:bg-[#e43c4a]"
            />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center mt-3 sm:mt-5">
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
              variant="colorful"
              size="lg"
              iconSet="solid"
              iconClassName=" p-2 rounded-full  w-full h-full"
              colorfulColors={{
                facebook: {
                  icon: "#1877f3",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                instagram: {
                  icon: "#e4405f",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                linkedin: {
                  icon: "#0a66c2",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                twitter: {
                  icon: "#000000",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                youtube: {
                  icon: "#ff0000",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                tiktok: {
                  icon: "#000000",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                whatsapp: {
                  icon: "#25d366",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                viber: {
                  icon: "#665cac",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                website: {
                  icon: "#6b7280",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
              }}
            />
          </div>
        </section>
        {/* === Companies Section === */}
        {companies?.length > 0 && (
          <section aria-label="Companies" className="px-3 sm:px-4 pb-3">
            <h3 className="font-bold text-sm sm:text-base mb-2 text-center">
              Professional Portfolio
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center mb-3 sm:mb-4">
              A snapshot of my experience and the companies I’ve worked with.
            </p>

            <div className="space-y-4">
              {companies.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4B5C] to-[#ff7a85] text-white flex items-center justify-center font-bold">
                          <span className="text-sm">
                            {c.company?.charAt(0) || "C"}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-900 capitalize">
                            {c.company}
                          </h4>
                          <div className="text-[11px] sm:text-xs text-[#FF4B5C] font-medium">
                            {c.position}
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-[#FF4B5C]/10 text-[#FF4B5C] border border-[#FF4B5C]/20">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    {c.companyBackground && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">
                          Company Overview
                        </h5>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                          {c.companyBackground}
                        </p>
                      </div>
                    )}

                    {c.serviceDescription && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">
                          Services & Expertise
                        </h5>
                        <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                          {c.serviceDescription}
                        </p>
                      </div>
                    )}

                    {c.servicePhotos && c.servicePhotos.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-semibold text-gray-900 text-xs sm:text-sm mb-2">
                          Portfolio Gallery
                        </h5>
                        {c.servicePhotos.length === 1 ? (
                          <div className="rounded-lg overflow-hidden border border-gray-200">
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
                                className="rounded-lg overflow-hidden border border-gray-200"
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
      </div>

      {/* === Footer Section === */}
      <TemplateFooter className="bg-[#FF4B5C] text-white text-center  ">
        <div className="flex flex-col py-4 items-center gap-1 text-center text-xs">
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

          <span className="tracking-wide text-white text-[10px] ">
            © {getCopyrightYear()} Zwiftech. All Rights Reserved.
          </span>
        </div>
      </TemplateFooter>
    </TemplateContainer>
  );
};

export default Template17;
