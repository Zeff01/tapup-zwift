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
      backgroundColor="bg-[#001e36]"
      padding="xs"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      alignItems="center"
      justifyContent="center"
      className="relative overflow-hidden py-2 text-white"
    >
      <div className="max-w-[480px] mx-auto flex flex-col  ">
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
          <div className="relative w-full h-64 rounded-t-[30px] overflow-hidden">
            <img
              src={coverPhotoUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Card */}
          <div className="relative px-4 sm:px-6 -mt-14">
            <div className="bg-[#123B57] rounded-xl px-4 sm:px-5 pt-14 pb-6 shadow-lg text-center">
              {/* Profile Picture */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                  <img
                    src={profilePictureUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name & Info */}
              <h2 className="text-lg font-bold mt-2">
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full mt-4">
                <div className="flex gap-3 w-full justify-center">
                  <CTAButtons
                    number={number}
                    email={email}
                    userProfile={userProfile}
                    variant="floating"
                    size="md"
                    icons="outline"
                    buttonClassName="border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white bg-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center  mt-5 text-white max-w-xs mx-auto">
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
                  iconClassName="p-2 rounded-full w-full h-full text-white text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        </section>

        {/* === Company Overview Section === */}
        {companyBackground && (
          <section
            aria-label="Company Overview"
            className="text-white px-3 sm:px-4 pb-2 text-xs sm:text-sm"
          >
            <h3 className="text-[#00d4ff] font-semibold text-sm sm:text-base mb-1">
              Company Overview
            </h3>
            <p className="text-gray-300 mb-3 sm:mb-4">{companyBackground}</p>
          </section>
        )}

        {/* === Services Section === */}
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <section
            aria-label="Our Services"
            className="text-white px-3 sm:px-4 pb-2 text-xs sm:text-sm"
          >
            {serviceDescription && (
              <>
                <h3 className="text-[#00d4ff] font-semibold text-sm sm:text-base mb-1">
                  Our Services
                </h3>
                <p className="text-gray-300 mb-3 sm:mb-4">
                  {serviceDescription}
                </p>
              </>
            )}

            {servicePhotos && servicePhotos.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 auto-rows-auto mb-3 sm:mb-4">
                {servicePhotos.map((photo, idx) => {
                  const isLarge = idx % 2 === 0; // alternate tall and short

                  return (
                    <div
                      key={idx}
                      className={`overflow-hidden rounded-xl sm:rounded-2xl ${
                        isLarge
                          ? "row-span-2 h-32 sm:h-40"
                          : "row-span-1 h-32 sm:h-40"
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Service ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* === Footer Section === */}
        <TemplateFooter className="bg-[#001d34] text-white text-center  text-xs rounded-b-[30px] px-2 sm:px-3">
          <div className="font-semibold text-sm sm:text-base">{company}</div>
          <div className="flex flex-col mt-8 items-center  gap-1 text-center text-xs">
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
        </TemplateFooter>
      </div>
    </TemplateContainer>
  );
};

export default Template18;
