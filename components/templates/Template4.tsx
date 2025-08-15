import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  CTAButtons,
  ProfileHeader,
  SocialLinks,
  Template4Container,
  TemplateFooter,
} from "./templatesComponents";

const Template4 = ({
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
    <Template4Container>
      {/* COVERPHOTO AND PROFILE PIC */}
      <ProfileHeader
        profilePictureUrl={profilePictureUrl}
        coverPhotoUrl={coverPhotoUrl}
        firstName={firstName}
        lastName={lastName}
        variant="overlay"
        profileSize="xl"
        coverHeight="md"
        profilePosition="left"
        defaultProfileImage="/assets/template4samplepic.png"
        defaultCoverImage="/assets/template1coverphoto.png"
        profileClassName="border-2 border-white"
      />

      {/* CTA BUTTONS */}
      <CTAButtons
        number={number}
        email={email}
        userProfile={userProfile}
        variant="rounded"
        size="sm"
        className="flex justify-end gap-2.5 pr-4 pt-4"
        buttonClassName="border-2 border-black bg-white hover:bg-gray-100"
      />

      {/* PERSONAL INFORMATION */}
      <div className="space-y-1 px-4 mb-4">
        {firstName ? (
          <h1 className="text-2xl font-bold mt-4 ">
            {firstName + " " + lastName}
          </h1>
        ) : (
          <h1 className="text-2xl font-bold mt-2 ">Hussain Watkins</h1>
        )}
        <p className="font-semibold text-gray-600 text-xl">
          {position ?? "Chief Technology Officer"}
        </p>
        <p className=" text-gray-600 text-md">
          {email ?? "H.Watkins@gmail.com"}
        </p>
        <p className=" text-gray-600 text-md"> {number ?? +639123456789}</p>
      </div>

      <hr />

      {/* COMPANY INFORMATION */}
      <h2 className="text-4xl font-extrabold mx-auto w-full mt-6 px-4">
        {company ?? "COMPANY"}
      </h2>
      <div className="mt-6 px-4">
        {companyBackground && (
          <>
            <h2 className="text-md font-bold">Company Background</h2>
            <p className="text-xs text-gray-600 mt-4">{companyBackground}</p>
          </>
        )}

        {/* SERVICE INFORMATION */}
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <>
            <h3 className="text-md font-bold mt-6">Our Services</h3>
            {serviceDescription && (
              <p className="text-xs text-gray-600 mt-4">{serviceDescription}</p>
            )}
          </>
        )}
      </div>

      {servicePhotos && servicePhotos.length > 0 && (
        <div className="flex flex-col gap-4 mt-6 px-4">
          {servicePhotos.map((photo, index) => (
            <div key={index} className="col-span-1">
              <Image
                src={photo}
                alt={`Service Photo ${index + 1}`}
                width={500}
                height={500}
                layout="responsive"
                className="rounded-md object-cover w-full"
              />
            </div>
          ))}
        </div>
      )}
      {/* SOCIAL MEDIA ICONS */}
      <div className="flex flex-col justify-center items-center mt-8 mb-4">
        <h1 className="font-bold mb-2">Socials</h1>
        <SocialLinks
          facebookUrl={facebookUrl}
          instagramUrl={instagramUrl}
          linkedinUrl={linkedinUrl}
          twitterUrl={twitterUrl}
          youtubeUrl={youtubeUrl}
          tiktokUrl={tiktokUrl}
          whatsappNumber={whatsappNumber}
          viberUrl={viberUrl}
          skypeInviteUrl={skypeInviteUrl}
          websiteUrl={websiteUrl}
          className="flex justify-center gap-4 mb-2"
        />
      </div>
      {/* FOOTER */}
      <h2 className="text-xs font-extrabold mx-auto w-full text-center mb-2">
        {company ?? "COMPANY"}
      </h2>

      <TemplateFooter className="flex flex-col mt-3 mb-1 items-center gap-1 text-center text-xs">
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

        <span className="tracking-wide text-gray-500 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </TemplateFooter>
    </Template4Container>
  );
};

export default Template4;
