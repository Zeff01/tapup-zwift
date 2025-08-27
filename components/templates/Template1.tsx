import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  Template1Container,
  Template1Socials,
  TemplateFooter,
  Template1CTA,
  sampleCompanies,
  getSampleSocialUrls,
  samplePersonalInfo,
} from "./templatesComponents";

const Template1 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  firstName,
  lastName,
  email,
  number,
  position,
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  twitterUrl,
  tiktokUrl,
  youtubeUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
  customUrl,
  companies,
}: Card) => {
  const userProfile = {
    id,
    firstName,
    lastName,
    email,
    number,
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
    skypeInviteUrl,
    websiteUrl,
    viberUrl,
  });

  const displayCompanies =
    companies && companies.length > 0 ? companies : sampleCompanies;

  return (
    <Template1Container>
      {/* COVER PHOTO + PROFILE */}
      <div className="mt-2 flex flex-col relative rounded-4xl mx-4">
        <div className="w-full h-48">
          <Image
            src={coverPhotoUrl || "/assets/template1coverphoto.png"}
            alt="Cover"
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-[2rem] overflow-hidden"
          />
        </div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <Image
            src={profilePictureUrl || "/assets/template4samplepic.png"}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full w-24 h-24"
          />
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="text-center mt-14 space-y-1">
        <h1 className="text-xl font-bold">
          {firstName ? `${firstName} ${lastName}` : samplePersonalInfo.fullname}
        </h1>
        <p className="font-semibold text-gray-500 text-xs">
          {position || "Chief Technology Officer"}
        </p>
        <p className="text-gray-500 text-xs">
          {email || samplePersonalInfo.email}
        </p>
        <p className="text-gray-500 text-xs">
          {number || samplePersonalInfo.number}
        </p>
      </div>

      {/* CTA */}
      <div className="flex  justify-center mt-5">
        <Template1CTA
          number={number || samplePersonalInfo.number}
          email={email || samplePersonalInfo.email}
          userProfile={userProfile}
          size="md"
          icons="lucide"
        />
      </div>

      {/* SOCIAL LINKS */}
      <div className="flex justify-center mt-5 mb-6">
        <Template1Socials
          facebookUrl={facebookUrl || sampleSocials.facebookUrl}
          twitterUrl={twitterUrl || sampleSocials.twitterUrl}
          tiktokUrl={tiktokUrl || sampleSocials.tiktokUrl}
          youtubeUrl={youtubeUrl || sampleSocials.youtubeUrl}
          instagramUrl={instagramUrl || sampleSocials.instagramUrl}
          linkedinUrl={linkedinUrl || sampleSocials.linkedinUrl}
          viberUrl={viberUrl || sampleSocials.viberUrl}
          whatsappNumber={whatsappNumber || sampleSocials.whatsappNumber}
          skypeInviteUrl={skypeInviteUrl || sampleSocials.skypeInviteUrl}
          websiteUrl={websiteUrl || sampleSocials.websiteUrl}
          size="lg"
          className="gap-1 md:gap-2 xl:gap-4"
        />
      </div>

      <hr />

      {displayCompanies.map((c, idx) => (
        <div
          key={idx}
          className="mt-6 p-3 rounded-xl border border-gray-200 shadow-sm bg-white"
        >
          <div className="flex flex-col items-center text-center space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">{c.company}</h2>
            <h3 className="text-sm font-medium text-gray-600">{c.position}</h3>
          </div>

          {c.companyBackground && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700">
                Company Background
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed break-words whitespace-pre-line max-w-full">
                {c.companyBackground}
              </p>
            </div>
          )}

          {c.serviceDescription && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700">
                Our Services
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed break-words whitespace-pre-line max-w-full">
                {c.serviceDescription}
              </p>
            </div>
          )}

          {/* Service Photos - Below About & Services */}
          {Array.isArray(c.servicePhotos) && c.servicePhotos.length > 0 && (
            <div className="mt-2 mb-3">
              {c.servicePhotos.length === 1 ? (
                <div className="relative overflow-hidden rounded-lg border border-gray-200">
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
                      className="relative overflow-hidden rounded-md border border-gray-200"
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
      ))}

      <TemplateFooter className="flex flex-col mt-8 items-center gap-1 text-center pb-4">
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

        <span className="tracking-wide text-gray-600 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </TemplateFooter>
    </Template1Container>
  );
};

export default Template1;
