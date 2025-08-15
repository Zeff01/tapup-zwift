import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  Template3Container,
  CTAButtons,
  SocialLinks,
  ProfileHeader,
  TemplateFooter,
} from "./templatesComponents";

const Template3 = ({
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
  viberUrl,
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
    <Template3Container>
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
            <h1 className="text-xl font-bold mt-2 text-greenTitle">
              Hussain Watkins
            </h1>
          )}

          <p className="font-semibold text-white text-xl">
            {position ?? "Chief Technology Officer"}
          </p>

          <p className=" text-grayDescription text-sm">
            {email ?? "H.Watkins@gmail.com"}
          </p>

          <p className=" text-grayDescription text-sm">
            {" "}
            {number ?? +639123456789}
          </p>
        </div>

        {/* CTA BUTTONS */}
        <CTAButtons
          number={number}
          email={email}
          userProfile={userProfile}
          variant="pills"
          size="lg"
          className="flex justify-center gap-6 mt-6 font-bold"
          buttonClassName="bg-white text-black hover:bg-gray-200"
        />

        {/* SOCIAL MEDIA ICONS */}
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
          size="md"
          className="flex items-center justify-center gap-2 mt-6 my-4 w-40 mx-auto"
          iconClassName="text-white hover:text-gray-300"
        />

        {/* COMPANY INFORMATION */}

        <h2 className="text-4xl font-extrabold mx-auto w-full text-center mt-6 text-greenTitle px-4">
          {company ?? "COMPANY"}
        </h2>
        <div className="mt-6 px-4">
          {companyBackground && (
            <>
              <h2 className="text-md font-bold text-greenTitle">
                Company Background
              </h2>
              <p className="text-xs text-grayDescription mt-4">
                {companyBackground}
              </p>
            </>
          )}

          {/* SERVICE INFORMATION */}
          {(serviceDescription || (servicePhotos && servicePhotos.length > 0)) && (
            <>
              <h3 className="text-md font-bold mt-6 text-greenTitle">
                Our Services
              </h3>
              {serviceDescription && (
                <p className="text-xs text-grayDescription mt-4">
                  {serviceDescription}
                </p>
              )}
            </>
          )}
        </div>

        {servicePhotos && servicePhotos.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-6  p-2">
            {servicePhotos.map((photo, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={photo}
                  alt={`Service Photo ${index + 1}`}
                  width={300}
                  height={300}
                  layout="responsive"
                  className="rounded-md object-cover w-full"
                />
              </div>
            ))}
          </div>
        )}
        
        {/* FOOTER */}
        <TemplateFooter className="flex flex-col items-center gap-1 text-center mt-8">
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
