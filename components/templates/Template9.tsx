import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  Template9Container,
  Template9CTA,
  Template9ProfileHeader,
  Template9Socials,
  TemplateFooter,
} from "./templatesComponents";

const Template9 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  companyBackground,
  serviceDescription,
  servicePhotos,
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
  skypeInviteUrl,
  websiteUrl,
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
    <Template9Container>
      <div className="flex flex-col min-h-full">
        <div className="relative  ">
          <div className="absolute flex m-1 top-0 right-0 z-20">
            <Template9CTA
              number={number}
              email={email}
              userProfile={userProfile}
              icons="outline"
            />
          </div>

          <Template9ProfileHeader
            profilePictureUrl={profilePictureUrl}
            coverPhotoUrl={coverPhotoUrl}
            firstName={firstName}
            lastName={lastName}
          />
        </div>

        <div className="text-center pt-4 pb-4 -mt-16 relative z-10 bg-white rounded-t-3xl space-y-1 flex-shrink-0">
          {firstName ? (
            <h1 className="font-semibold text-2xl text-neutral-900 tracking-wider  capitalize">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold  ">Hussain Watkins</h1>
          )}

          <p className="text-lg  font-normal text-neutral-700">
            {position ?? "Chief Technology Officer"}
          </p>

          <div className="flex items-center font-light text-sm text-neutral-600 justify-center gap-x-2">
            <p>{email ?? "H.Watkins@gmail.com"}</p>
            <span> |</span>
            <p>{number ?? +639123456789}</p>
          </div>
          <div className="flex items-center gap-x-4 py-4 text-2xl text-neutral-700 h-16 justify-center">
            <Template9Socials
              facebookUrl={facebookUrl}
              instagramUrl={instagramUrl}
              linkedinUrl={linkedinUrl}
              twitterUrl={twitterUrl}
              youtubeUrl={youtubeUrl}
              whatsappNumber={whatsappNumber}
              skypeInviteUrl={skypeInviteUrl}
              websiteUrl={websiteUrl}
              size="lg"
              iconSet="outline"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-6 pt-6 bg-white px-5 border-t border-t-neutral-300 text-neutral-900 flex-grow">
          <h2 className="font-semibold text-3xl mx-auto w-full  tracking-wider  text-center">
            {company ?? "COMPANY"}
          </h2>
          {companyBackground && (
            <div>
              <h1 className="font-semibold tracking-wider">Company Overview</h1>
              <p className="font-light text-sm text-neutral-500 pt-2">
                {companyBackground}
              </p>
            </div>
          )}
          {(serviceDescription ||
            (servicePhotos && servicePhotos.length > 0)) && (
            <div>
              <h1 className="font-semibold tracking-wider">Our Services</h1>
              {serviceDescription && (
                <p className="font-light text-sm text-neutral-500 pt-2">
                  {serviceDescription}
                </p>
              )}
            </div>
          )}
          {servicePhotos && servicePhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-6  ">
              {servicePhotos.map((photo, index) => (
                <div key={index} className="col-span-1">
                  <Image
                    src={photo}
                    alt={`Service Photo ${index + 1}`}
                    width={300}
                    height={300}
                    layout="responsive"
                    className="rounded-2xl object-contain w-full  "
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <TemplateFooter className="mt-auto bg-white px-5 pb-4">
          <h2 className="font-semibold text-xl mx-auto w-full tracking-wider text-center">
            {company ?? "COMPANY"}
          </h2>
          <div className="flex flex-col mt-3 mb-1 items-center gap-1 text-center text-xs">
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

            <span className="tracking-wide text-gray-800 text-[10px] ">
              © {getCopyrightYear()} Zwiftech. All Rights Reserved.
            </span>
          </div>
        </TemplateFooter>
      </div>
    </Template9Container>
  );
};

export default Template9;
