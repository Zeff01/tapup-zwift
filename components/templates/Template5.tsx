import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  CTAButtons,
  ProfileHeader,
  SocialLinks,
  Template5Container,
  TemplateFooter,
} from "./templatesComponents";

const Template5 = ({
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
        number={number}
        email={email}
        userProfile={userProfile}
        variant="rounded"
        size="sm"
        className="flex justify-end gap-1 pt-3 "
        buttonClassName="border border-pink-600 text-pink-400 bg-white hover:bg-pink-50"
      />

      {/* SOCIAL MEDIA ICONS */}
      <div className="relative ">
        <div className="absolute top-0  left-4  ">
          <SocialLinks
            facebookUrl={facebookUrl}
            twitterUrl={twitterUrl}
            tiktokUrl={tiktokUrl}
            youtubeUrl={youtubeUrl}
            instagramUrl={instagramUrl}
            linkedinUrl={linkedinUrl}
            viberUrl={viberUrl}
            whatsappNumber={whatsappNumber}
            skypeInviteUrl={skypeInviteUrl}
            websiteUrl={websiteUrl}
            variant="minimal"
            size="sm"
            className="flex flex-col gap-[6px]"
            iconClassName="text-gray-600 hover:text-pink-500"
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
          <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
        )}

        <p className="font-semibold text-gray-900 text-xs">
          {position ?? "Chief Technology Officer"}
        </p>

        <p className=" text-gray-500 text-xs">
          {email ?? "H.Watkins@gmail.com"}
        </p>

        <p className=" text-gray-500 text-xs"> {number ?? +639123456789}</p>
      </div>

      {/* COMPANY INFORMATION */}
      <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6 px-4">
        {company ?? "COMPANY"}
      </h2>

      <div className="mt-12 px-4">
        {companyBackground && (
          <>
            <h2 className="text-md font-bold">Company Background</h2>
            <p className="text-xs mt-4">{companyBackground}</p>
          </>
        )}

        {/* SERVICE INFORMATION */}
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <>
            <h3 className="text-md font-bold mt-6">Our Services</h3>
            {serviceDescription && (
              <p className="text-xs mt-4">{serviceDescription}</p>
            )}
          </>
        )}
      </div>

      {servicePhotos && servicePhotos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 p-2 mt-6">
          {servicePhotos.map((photo, index) => (
            <div key={index} className="col-span-1">
              <Image
                src={photo}
                alt={`Service Photo ${index + 1}`}
                width={300}
                height={300}
                layout="responsive"
                className="rounded-md object-cover w-full  "
              />
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <h2 className="text-xs font-extrabold mx-auto w-full text-center mt-3 mb-2">
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

        <span className="tracking-wide text-gray-800 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </TemplateFooter>
    </Template5Container>
  );
};

export default Template5;
