import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  Template2Container,
  Template1CTA,
  ProfileHeader,
  TemplateFooter,
  SocialLinks,
} from "./templatesComponents";

const Template2 = ({
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
    <Template2Container>
      {/* COVERPHOTO AND PROFILE PIC */}
      <div className="mt-2 mx-4">
        <ProfileHeader
          profilePictureUrl={profilePictureUrl}
          coverPhotoUrl={coverPhotoUrl}
          firstName={firstName}
          lastName={lastName}
          variant="overlay"
          profileSize="lg"
          coverHeight="md"
          profilePosition="center"
          coverClassName="rounded-[2rem] overflow-hidden"
        />
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="text-center mt-14 space-y-1 ">
        {firstName ? (
          <h1 className="text-xl font-bold mt-4 ">
            {firstName + " " + lastName}
          </h1>
        ) : (
          <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
        )}

        <p className="font-semibold text-white text-xs">
          {position ?? "Chief Technology Officer"}
        </p>

        <p className=" text-gray-500 text-xs">
          {email ?? "H.Watkins@gmail.com"}
        </p>

        <p className=" text-gray-500 text-xs"> {number ?? +639123456789}</p>
      </div>

      {/* CTA BUTTONS */}
      <div className="flex justify-center mt-5">
        <Template1CTA
          number={number}
          email={email}
          userProfile={userProfile}
          size="md"
          buttonClassName="text-black"
        />
      </div>

      {/* SOCIAL MEDIA ICONS */}
      <div className="flex justify-center mt-5 mb-6">
        <SocialLinks
          facebookUrl={facebookUrl}
          instagramUrl={instagramUrl}
          linkedinUrl={linkedinUrl}
          twitterUrl={twitterUrl}
          youtubeUrl={youtubeUrl}
          whatsappNumber={whatsappNumber}
          viberUrl={viberUrl}
          skypeInviteUrl={skypeInviteUrl}
          websiteUrl={websiteUrl}
          size="lg"
          className="flex items-center justify-center gap-2 mt-6 my-4 mx-auto w-full"
          iconClassName="text-white hover:text-gray-300"
        />
      </div>
      <hr />

      {/* COMPANY INFORMATION */}
      <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6">
        {company ?? "COMPANY"}
      </h2>
      <div className="mt-6">
        {companyBackground && (
          <>
            <h2 className="text-md font-bold">Company Background</h2>
            <p className="text-xs mt-4 text-gray-300">{companyBackground}</p>
          </>
        )}

        {/* SERVICE INFORMATION */}
        {(serviceDescription ||
          (servicePhotos && servicePhotos.length > 0)) && (
          <>
            <h3 className="text-md font-bold mt-6">Our Services</h3>
            {serviceDescription && (
              <p className="text-xs mt-4 text-gray-300">{serviceDescription}</p>
            )}
          </>
        )}
      </div>

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
                className="rounded-md object-cover w-full shadow shadow-white overflow-hidden"
              />
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <h2 className="text-xs font-extrabold mx-auto w-full text-center mt-6 mb-8">
        {company ?? "COMPANY"}
      </h2>

      <TemplateFooter className="flex flex-col items-center gap-1 text-center text-xs">
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
    </Template2Container>
  );
};

export default Template2;
