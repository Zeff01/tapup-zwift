import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import { LuMail, LuPhone } from "react-icons/lu";

// Components
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
      padding="none"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      alignItems="center"
      className="font-sans"
    >
      <div className="max-w-[480px] w-full mx-auto flex flex-col items-center">
        {/* === Cover Section === */}
        <section
          aria-label="Cover Section"
          className="w-full h-40 overflow-hidden relative"
        >
          <Image
            src={coverPhotoUrl || "/assets/sampleCoverPhoto.png"}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        </section>

        {/* === Profile Section === */}
        <section
          aria-label="Profile Section"
          className="w-full px-4 sm:px-6 -mt-12 flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-[5px] border-white overflow-hidden shadow-md relative z-20">
            <Image
              src={profilePictureUrl || "/assets/sampleProfilePhoto.png"}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Title */}
          <h1 className="mt-3 text-xl font-semibold break-words w-full">
            {prefix && `${prefix}. `}
            {firstName} {middleName && `${middleName} `}
            {lastName}
            {suffix && `, ${suffix}`}
          </h1>
          {position && (
            <p className="text-sm text-gray-600 font-medium break-words w-full">
              {position} {company && `@ ${company}`}
            </p>
          )}

          {/* Contact Info */}
          <div className="flex flex-col gap-1 mt-2 text-xs text-gray-700 items-center">
            {email && (
              <div className="flex items-center gap-2">
                <LuMail className="flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:underline break-all"
                >
                  {email}
                </a>
              </div>
            )}
            {number && (
              <div className="flex items-center gap-2">
                <LuPhone className="flex-shrink-0" />
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
              skypeInviteUrl={skypeInviteUrl}
              viberUrl={viberUrl}
              websiteUrl={websiteUrl}
              variant="colorful"
              size="sm"
              iconClassName="bg-black text-white hover:bg-gray-800 rounded-full p-1.5"
              iconSet="solid"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 w-full justify-center mt-5">
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

        {/* === Company Overview Section === */}
        {companyBackground && (
          <section
            aria-label="Company Overview"
            className="w-full max-w-md px-6 mt-6 mb-6"
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
                    <Image
                      src={photo}
                      alt={`Service ${index + 1}`}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* === Footer Section === */}
        <TemplateFooter className="w-full max-w-md px-6 text-center text-gray-500 text-sm ">
          <div className="font-semibold text-black mb-1">{company}</div>
          <div className="flex flex-col mt-8 mb-1 items-center gap-1 text-center text-xs">
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
      </div>
    </TemplateContainer>
  );
};

export default Template16;
