import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  CTAButtons,
  ProfileHeader,
  SocialLinks,
  Template5Container,
  TemplateFooter,
  sampleCompanies,
  getSampleSocialUrls,
  samplePersonalInfo,
} from "./templatesComponents";

const Template5 = ({
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
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  tiktokUrl,
  youtubeUrl,
  whatsappNumber,
  websiteUrl,
  viberUrl,
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

  const sampleSocials = getSampleSocialUrls({
    facebookUrl,
    linkedinUrl,
    instagramUrl,
    twitterUrl,
    tiktokUrl,
    youtubeUrl,
    whatsappNumber,
    websiteUrl,
    viberUrl,
  });

  const displayCompanies =
    companies && companies.length > 0 ? companies : sampleCompanies;

  return (
    <Template5Container>
      {/* COVERPHOTO AND PROFILE PIC */}
      <ProfileHeader
        profilePictureUrl={profilePictureUrl}
        coverPhotoUrl={coverPhotoUrl}
        firstName={firstName}
        lastName={lastName}
        variant="overlay"
        profileSize="lg"
        coverHeight="md"
        profilePosition="center"
        defaultCoverImage="/assets/template1coverphoto.png"
      />

      {/* CTA BUTTONS */}
      <CTAButtons
        number={number || samplePersonalInfo.number}
        email={email || samplePersonalInfo.email}
        userProfile={userProfile}
        variant="rounded"
        size="sm"
        icons="lucide"
        className="flex justify-end gap-1 pt-3 "
        buttonClassName="border border-pink-600 text-pink-400 bg-white hover:bg-pink-50"
      />

      {/* SOCIAL MEDIA ICONS */}
      <div className="relative ">
        <div className="absolute -top-8  left-4  ">
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
            variant="minimal"
            size="sm"
            className="flex flex-col gap-[6px]"
            iconClassName="text-gray-900 hover:text-pink-500"
          />
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="text-center mt-4 space-y-1 ">
        {firstName ? (
          <h1 className="text-xl font-bold mt-4 ">
            {firstName + " " + lastName}
          </h1>
        ) : (
          <h1 className="text-xl font-bold mt-4 ">Hussain Watkins</h1>
        )}

        <p className="font-semibold text-gray-900 text-xs">
          {position || "Chief Technology Officer"}
        </p>

        <p className=" text-gray-500 text-xs">
          {email || samplePersonalInfo.email}
        </p>

        <p className=" text-gray-500 text-xs">
          {" "}
          {number || samplePersonalInfo.number}
        </p>
      </div>

      <div className="mt-[70px] mb-6 px-4">
        <h2 className="text-lg font-bold mb-1">Professional Portfolio</h2>
        <p className="text-sm">
          Below you&#39;ll find details about my professional experience and the
          companies I&#39;ve worked with. Each entry highlights my role,
          responsibilities, and the services offered.
        </p>
      </div>
      <div className="px-4">
        <div className="relative mb-6">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-pink-500 via-purple-400 to-transparent" />
          <div className="flex items-center justify-center">
            <div className="bg-transparent px-4 py-1">
              <span className="text-xs uppercase tracking-wider text-pink-600 font-medium">
                Company Experience
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* COMPANY INFORMATION */}
      <div className="px-4">
        {displayCompanies.map((c, i) => (
          <div
            key={i}
            className="mb-4 relative bg-white/70 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-pink-100"
          >
            {/* Company Post Header - Facebook Style */}
            <div className="flex items-center px-4 py-2 border-b border-pink-200">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-pink-50 flex-shrink-0 border border-pink-200">
                {profilePictureUrl ? (
                  <Image
                    src={profilePictureUrl}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-pink-400">
                    <span className="text-white font-bold text-xs">
                      {firstName?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </div>
              <div className="ml-2 flex-1">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-gray-800">
                    {firstName} {lastName}
                  </span>
                  <div className="flex items-center">
                    <span className="text-xs text-gray-600">
                      {c.position} at{" "}
                    </span>
                    <span className="text-xs font-medium text-pink-600 ml-1">
                      {c.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About & Services Content - Above Images */}
            <div className="px-4 pt-3">
              {/* Background & Services */}
              <div className="space-y-3 mb-3">
                {c.companyBackground?.trim() && (
                  <div>
                    <h2 className="text-sm font-bold text-pink-600 mb-1">
                      About
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {c.companyBackground}
                    </p>
                  </div>
                )}

                {c.serviceDescription?.trim() && (
                  <div className="mt-3">
                    <h3 className="text-sm font-bold text-pink-600 mb-1">
                      Services
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {c.serviceDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* Service Photos - Below About & Services */}
              {Array.isArray(c.servicePhotos) && c.servicePhotos.length > 0 && (
                <div className="mt-2 mb-3">
                  {c.servicePhotos.length === 1 ? (
                    <div className="relative overflow-hidden rounded-lg border border-pink-200 shadow-md">
                      <Image
                        src={c.servicePhotos[0]}
                        alt={`${c.company} Featured Image`}
                        width={600}
                        height={400}
                        layout="responsive"
                        className="object-cover w-full"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-1">
                      {c.servicePhotos.map((photo, index) => (
                        <div
                          key={index}
                          className="relative overflow-hidden rounded-md border border-pink-200 shadow-md"
                        >
                          <Image
                            src={photo}
                            alt={`${c.company} Portfolio Image ${index + 1}`}
                            width={300}
                            height={300}
                            layout="responsive"
                            className="object-cover w-full"
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

      {/* FOOTER */}
      <h2 className="text-xs font-extrabold mx-auto w-full text-center mb-2">
        {company ?? "COMPANY"}
      </h2>

      <TemplateFooter className="flex flex-col mt-8 mb-1 items-center gap-1 text-center text-xs">
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

        <span className="tracking-wide text-pink-800 text-[10px] font-medium ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </TemplateFooter>
    </Template5Container>
  );
};

export default Template5;
