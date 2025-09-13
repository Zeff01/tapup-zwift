import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  Template2Container,
  SocialLinks,
  TemplateFooter,
  Template1CTA,
} from "./templatesComponents";

const Template2 = ({
  id,
  owner,
  profilePictureUrl,
  coverPhotoUrl,
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

  return (
    <Template2Container>
      <div className="flex-grow">
        {/* COVER PHOTO + PROFILE */}
        <div className="mt-2 flex flex-col relative rounded-4xl">
          <div className="w-full h-48 px-2">
            <Image
              src={coverPhotoUrl || "/assets/template1coverphoto.png"}
              alt="Cover"
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-[2rem] overflow-hidden"
            />
          </div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <Image
              src={profilePictureUrl || "/assets/template4samplepic.png"}
              alt="Profile"
              width={112}
              height={112}
              className="rounded-full w-32 h-32 border border-white/30"
            />
          </div>
        </div>

        {/* PERSONAL INFO */}
        <div className="text-center mt-20 space-y-1">
          <h1 className="text-xl font-bold text-white">
            {firstName ? `${firstName} ${lastName}` : "Hussain Watkins"}
          </h1>

          <p className="text-gray-100 text-xs">{email}</p>
          <p className="text-gray-100 text-xs">{number}</p>
        </div>

        {/* CTA */}
        <div className="flex  justify-center mt-5">
          <Template1CTA
            number={number}
            email={email}
            userProfile={userProfile}
            size="md"
            icons="lucide"
            buttonClassName="text-black bg-white hover:bg-gray-100 border-white"
          />
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center mt-5 mb-6">
          <SocialLinks
            cardId={id}
            ownerId={owner}
            facebookUrl={facebookUrl}
            twitterUrl={twitterUrl}
            tiktokUrl={tiktokUrl}
            youtubeUrl={youtubeUrl}
            instagramUrl={instagramUrl}
            linkedinUrl={linkedinUrl}
            viberUrl={viberUrl}
            whatsappNumber={whatsappNumber}
            websiteUrl={websiteUrl}
            size="lg"
            className="gap-1 md:gap-2 xl:gap-4"
            iconClassName="text-white hover:text-gray-100"
          />
        </div>

        <hr className="border-gray-800" />

        {companies?.length > 0 &&
          companies.map((c, idx) => (
            <div key={idx}>
              {/* Add horizontal line between companies if there are 2 or more */}
              {companies.length >= 2 && idx > 0 && (
                <hr className="my-8 border-gray-800" />
              )}
              <div className="mt-6">
                <div className="flex flex-col items-center text-center space-y-1">
                  <h2 className="text-2xl font-bold text-white">{c.company}</h2>
                  <h3 className="text-sm font-medium text-gray-100">
                    {c.position}
                  </h3>
                </div>

                {c.companyBackground && (
                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-white">
                      Company Background
                    </h3>
                    <p className="text-xs text-gray-100 mt-2 leading-relaxed break-words whitespace-pre-line max-w-full">
                      {c.companyBackground}
                    </p>
                  </div>
                )}

                {(c.serviceDescription ||
                  (Array.isArray(c.servicePhotos) &&
                    c.servicePhotos.length > 0)) && (
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-white">
                      Our Services
                    </h3>
                    {c.serviceDescription && (
                      <p className="text-xs text-gray-100 mt-2 leading-relaxed break-words whitespace-pre-line max-w-full">
                        {c.serviceDescription}
                      </p>
                    )}
                    {Array.isArray(c.servicePhotos) &&
                      c.servicePhotos.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {c.servicePhotos.map((photo, i) => (
                            <Image
                              key={i}
                              src={photo}
                              alt={`Service Photo ${i + 1}`}
                              width={300}
                              height={300}
                              layout="responsive"
                              className="rounded-md object-cover w-full "
                            />
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <TemplateFooter className="flex flex-col mt-8 items-center gap-1 text-center pb-4">
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

        <span className="tracking-wide text-gray-200 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </TemplateFooter>
    </Template2Container>
  );
};

export default Template2;
