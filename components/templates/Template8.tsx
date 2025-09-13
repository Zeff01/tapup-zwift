import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  CTAButtons,
  ProfileHeader,
  SocialLinks,
  Template8Container,
  TemplateFooter,
} from "./templatesComponents";

const Template8 = ({
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
  youtubeUrl,
  whatsappNumber,
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
    <Template8Container>
      <div className="flex-grow">
        {/* Cover and Profile */}
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

        {/* CTA Buttons */}
        <CTAButtons
          number={number}
          email={email}
          userProfile={userProfile}
          variant="rounded"
          size="sm"
          icons="lucide"
          className="flex justify-end gap-1 pt-3"
          buttonClassName="border border-pink-600 text-pink-400 bg-white hover:bg-pink-50"
        />

        {/* Social Links */}
        <div className="relative">
          <div className="absolute -top-8 left-4">
            <SocialLinks
              facebookUrl={facebookUrl}
              twitterUrl={twitterUrl}
              youtubeUrl={youtubeUrl}
              instagramUrl={instagramUrl}
              linkedinUrl={linkedinUrl}
              whatsappNumber={whatsappNumber}
              websiteUrl={websiteUrl}
              cardId={id}
              variant="minimal"
              size="sm"
              className="flex flex-col gap-[6px]"
              iconClassName="text-gray-900 hover:text-pink-500"
            />
          </div>
        </div>

        {/* Personal Info */}
        <div className="text-center mt-4 space-y-1">
          <h1 className="text-xl font-bold mt-4">
            {firstName + " " + lastName}
          </h1>
          <p className="font-semibold text-gray-900 text-xs">
            {position ?? "Position"}
          </p>
          <p className="text-gray-500 text-xs">{email}</p>
          <p className="text-gray-500 text-xs">{number}</p>
        </div>

        {/* Company Background and Services */}
        <div className="mt-8 px-4">
          <h2 className="text-lg font-bold mb-1">{company}</h2>
          {companyBackground && (
            <>
              <h3 className="text-sm font-bold text-pink-600 mb-1">About</h3>
              <p className="text-sm text-gray-700 mb-4">{companyBackground}</p>
            </>
          )}
          {serviceDescription && (
            <>
              <h3 className="text-sm font-bold text-pink-600 mb-1">Services</h3>
              <p className="text-sm text-gray-700">{serviceDescription}</p>
            </>
          )}
        </div>

        {/* Service Photos */}
        {Array.isArray(servicePhotos) && servicePhotos.length > 0 && (
          <div className="px-4 mt-4 grid grid-cols-2 gap-2">
            {servicePhotos.map((photo, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-md border border-pink-200 shadow-md"
              >
                <Image
                  src={photo}
                  alt={`${company} Service ${index + 1}`}
                  width={300}
                  height={300}
                  layout="responsive"
                  className="object-cover w-full"
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <h2 className="text-xs font-extrabold mx-auto w-full text-center mt-6 mb-2">
          {company ?? "COMPANY"}
        </h2>
        <TemplateFooter className="flex flex-col mt-4 mb-1 items-center gap-1 text-center text-xs">
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
          <span className="tracking-wide text-pink-800 text-[10px] font-medium">
            © {getCopyrightYear()} Zwiftech. All Rights Reserved.
          </span>
        </TemplateFooter>
      </div>
    </Template8Container>
  );
};

export default Template8;
