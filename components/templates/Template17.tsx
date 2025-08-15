import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";

// Components
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
    <TemplateContainer
      backgroundColor="bg-white"
      padding="xs"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      className="rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden font-sans py-2"
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
              src={coverPhotoUrl || "/assets/sampleCoverPhoto.png"}
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
                src={profilePictureUrl || "/assets/sampleProfilePhoto.png"}
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
          <div className="flex gap-3 w-full  justify-center mt-3 sm:mt-4">
            <CTAButtons
              number={number}
              email={email}
              userProfile={userProfile}
              variant="pills"
              size="md"
              icons="outline"
              buttonClassName="bg-[#FF4B5C] text-white hover:bg-[#e43c4a]"
            />
          </div>

          {/* Social Icons */}
          <div className="flex   justify-center mt-3 sm:mt-5 ">
            <SocialLinks
              facebookUrl={facebookUrl}
              instagramUrl={instagramUrl}
              linkedinUrl={linkedinUrl}
              twitterUrl={twitterUrl}
              youtubeUrl={youtubeUrl}
              tiktokUrl={tiktokUrl}
              whatsappNumber={whatsappNumber}
              skypeInviteUrl={skypeInviteUrl}
              viberUrl={viberUrl}
              websiteUrl={websiteUrl}
              variant="colorful"
              size="md"
              iconClassName=" p-2 rounded-full  w-full h-full"
            />
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
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <section aria-label="Our Services" className="px-3 sm:px-4 pb-2">
            <h3 className="font-bold text-sm sm:text-base mb-1">
              Our Services
            </h3>
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
                    <Image
                      src={photo}
                      alt={`Service ${idx + 1}`}
                      width={400}
                      height={160}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* === Footer Section === */}
        <TemplateFooter className="bg-[#FF4B5C] text-white text-center   rounded-b-2xl sm:rounded-b-3xl px-2 sm:px-3">
          <div className="font-semibold mt-3 text-sm sm:text-base">
            {company}
          </div>
          <div className="flex flex-col mt-8 items-center mb-2 gap-1 text-center text-xs">
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
      </div>
    </TemplateContainer>
  );
};

export default Template17;
