import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";

// Components
import {
  TemplateContainer,
  Template13CTA,
  Template13Socials,
  TemplateFooter,
} from "./templatesComponents";

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
                src="/assets/sampleCoverPhoto.png"
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
                src={profilePictureUrl || "/assets/sampleProfilePhoto.png"}
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
              <Template13CTA
                number={number}
                email={email}
                userProfile={userProfile}
                size="md"
                icons="outline"
              />
            </div>
          </div>
        </section>

        {/* === Contact Info Section === */}
        <section aria-label="Contact Information" className="w-full mb-8 px-4">
          <h2 className="text-lg font-bold mb-4 text-white text-left">
            Contact Information
          </h2>
          <div className="grid grid-cols-2 gap-y-2 text-gray-300">
            <span className="text-left">Email</span>
            <span className="font-medium text-[12px] text-white text-left break-all">
              {email}
            </span>
            <span className="text-left">Number</span>
            <span className="font-medium text-white text-left text-[12px]">
              {number}
            </span>
            <span className="text-left">Links</span>
            <span className="flex flex-wrap gap-3 text-xl text-left">
              <Template13Socials
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
                size="md"
              />
            </span>
          </div>
        </section>

        {/* === Company Overview Section === */}
        {companyBackground && (
          <section aria-label="Company Overview" className="w-full mb-8 px-4">
            <h2 className="text-lg font-bold mb-2 text-white text-left">
              Company Overview
            </h2>
            <p className="text-gray-300 text-base text-left">
              {companyBackground}
            </p>
          </section>
        )}

        {/* === Services Section === */}
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <section aria-label="Our Services" className="w-full px-4">
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
          </section>
        )}

        {/* === Footer Section === */}
        <TemplateFooter className="w-full mx-auto mt-8  text-center text-gray-400 text-sm border-t border-neutral-800">
          <div className="font-semibold text-base text-white mb-1">
            {company}
          </div>
          <div className="flex flex-col items-center mt-8 gap-1 text-center text-xs">
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
      </div>
    </TemplateContainer>
  );
};

export default Template13;
