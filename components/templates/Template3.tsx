import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  ProfileHeader,
  SocialLinks,
  Template1CTA,
  Template3Container,
  TemplateFooter,
} from "./templatesComponents";

const Template3 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  firstName,
  lastName,
  email,
  number,
  facebookUrl,
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  whatsappNumber,
  tiktokUrl,
  viberUrl,
  websiteUrl,
  customUrl,
  companies,
  owner,
}: Card) => {
  const userProfile = {
    id,
    owner,
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
    <Template3Container>
      <div className="flex-grow">
        {/* COVERPHOTO AND PROFILE PIC */}
        <ProfileHeader
          profilePictureUrl={profilePictureUrl}
          coverPhotoUrl={coverPhotoUrl}
          firstName={firstName}
          lastName={lastName}
          variant="overlay"
          profileSize="xl"
          coverHeight="md"
          profilePosition="center"
          defaultProfileImage="/assets/template4samplepic.png"
          defaultCoverImage="/assets/template2coverphoto.png"
        />

        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-20 space-y-1 ">
          {firstName ? (
            <h1 className="text-xl font-bold mt-4 text-greenTitle">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 text-greenTitle">Jane Doe</h1>
          )}

          <p className="font-semibold text-white text-xl">{position}</p>

          <p className=" text-grayDescription text-sm">{email}</p>

          <p className=" text-grayDescription text-sm"> {number}</p>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex justify-center mt-5">
          <Template1CTA
            number={number}
            email={email}
            userProfile={userProfile}
            size="md"
            icons="lucide"
            buttonClassName="text-black"
          />
        </div>

        <div className="flex justify-center mt-5 mb-6">
          <SocialLinks
            facebookUrl={facebookUrl}
            instagramUrl={instagramUrl}
            linkedinUrl={linkedinUrl}
            twitterUrl={twitterUrl}
            youtubeUrl={youtubeUrl}
            whatsappNumber={whatsappNumber}
            viberUrl={viberUrl}
            tiktokUrl={tiktokUrl}
            websiteUrl={websiteUrl}
            cardId={id}
            ownerId={owner}
            size="md"
            className="flex items-center justify-center gap-2 mt-6 my-4 mx-auto w-full"
            iconClassName="text-white hover:text-gray-300"
          />
        </div>

        {/* COMPANY INTRODUCTION */}
        <div className="mt-8 mb-6 px-4">
          <h2 className="text-lg font-bold text-white mb-1">
            Professional Portfolio
          </h2>
          <p className="text-sm text-gray-300">
            Below you&#39;ll find details about my professional experience and
            the companies I&#39;ve worked with. Each entry highlights my role,
            responsibilities, and the services offered.
          </p>
        </div>
        <div className="px-4">
          <div className="relative mb-6">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-green-500 via-yellow-500 to-transparent" />
            <div className="flex items-center justify-center">
              <div className="px-4 py-1">
                <span className="text-xs uppercase tracking-wider text-greenTitle font-medium">
                  Company Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* COMPANY INFORMATION */}
        <div className="px-4">
          {companies?.map((c, i) => (
            <div
              key={i}
              className="mb-4 relative bg-neutral-900 rounded-xl shadow-xl overflow-hidden border border-neutral-700"
            >
              {/* Company Post Header - Facebook Style */}
              <div className="flex items-center px-4 py-2 border-b border-neutral-700">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-700 flex-shrink-0 border border-neutral-600">
                  {profilePictureUrl ? (
                    <Image
                      src={profilePictureUrl}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-600">
                      <span className="text-white font-bold text-xs">
                        {firstName?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-2 flex-1">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-white">
                      {firstName} {lastName}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400">
                        {c.position} at{" "}
                      </span>
                      <span className="text-xs font-medium text-blue-400 ml-1">
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
                      <h2 className="text-sm font-bold text-green-300 mb-1">
                        About
                      </h2>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {c.companyBackground}
                      </p>
                    </div>
                  )}

                  {c.serviceDescription?.trim() && (
                    <div className="mt-3">
                      <h3 className="text-sm font-bold text-green-300 mb-1">
                        Services
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-300">
                        {c.serviceDescription}
                      </p>
                    </div>
                  )}
                </div>

                {/* Service Photos - Below About & Services */}
                {Array.isArray(c.servicePhotos) &&
                  c.servicePhotos.length > 0 && (
                    <div className="mt-2 mb-3">
                      {c.servicePhotos.length === 1 ? (
                        <div className="relative overflow-hidden rounded-lg border border-neutral-700">
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
                              className="relative overflow-hidden rounded-md border border-neutral-700"
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
      </div>

      {/* FOOTER */}
      <TemplateFooter className="flex flex-col items-center gap-1 text-center mt-4">
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
    </Template3Container>
  );
};

export default Template3;
