import { Card } from "@/types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { downloadVCard } from "@/lib/utils";
import {
  Template8Container,
  CTAButtons,
  SocialLinks,
  EmailButton,
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
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
  tiktokUrl,
  customUrl,
}: Card) => {
  const userProfile = {
    id,
    companyBackground,
    serviceDescription,
    servicePhotos,
    profilePictureUrl,
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
      <div className="flex flex-col relative">
        {/*Cover Color Gradient */}
        <div className="w-full h-[244px] bg-[radial-gradient(circle_at_top_left,_#ffffff_1%,_#1d4ed8_90%)]">
          <svg
            className="absolute bottom-0 left-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              d="M0,200 C480,96 960,96 1440,200 L1440,320 L0,320 Z"
            ></path>
          </svg>
        </div>
        {/* Profile picture and bookmark icon */}
        <div className="absolute rounded-full bg-offWhiteTemplate transform left-40 -bottom-1 w-custom-29 h-custom-29 border-offWhiteTemplate border-2xs">
          <Image
            src={
              profilePictureUrl ||
              "/assets/template-8-profile-picture.jpeg"
            }
            fill
            alt="profile picture"
            className="rounded-full"
          />
        </div>
        <Button
          onClick={() => downloadVCard(userProfile)}
          className="absolute rounded-xl transform left-[19rem] top-40 w-10 h-10 bg-offWhiteTemplate hover:bg-offWhiteTemplate"
        >
          <Bookmark className="w-6 h-6" />
        </Button>
      </div>
      {/* Profile details */}
      <div className="flex flex-col items-center mt-6 gap-2 mb-5">
        <h1 className="text-xl font-extrabold text-footerBlueTemplate leading-[25.1px]">
          {firstName ?? "First Name"}
        </h1>
        <p className="text-xs font-semibold leading-4 text-grayTemplate">
          {company ?? "Company"}
        </p>
        <p className="font-normal text-grayTemplate text-xs leading-3">
          {email ?? "email@example.com"}
        </p>
      </div>
      
      {/* SOCIAL MEDIA ICONS */}
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
        variant="buttons"
        size="md"
        className="flex justify-center gap-2 mb-5"
        iconClassName="text-white"
      />

      {/* CTA BUTTON */}
      <div className="mb-5">
        <EmailButton
          email={email ?? "email@example.com"}
          className="rounded-xl bg-footerBlueTemplate text-white w-full hover:bg-footerBlueTemplate"
        >
          Email me!
        </EmailButton>
      </div>

      {/*COMPANY DETAILS */}
      <div className="flex flex-col justify-start gap-3">
        <h1 className="text-base font-extrabold leading-8 text-footerBlueTemplate">
          {company ?? "Company"}
        </h1>
        {companyBackground && (
          <>
            <h5 className="text-xs font-extrabold leading-4 text-grayTemplate">
              Company Overview
            </h5>
            <p className="text-2xs leading-4 font-light text-grayTemplate">
              {companyBackground}
            </p>
          </>
        )}
        {serviceDescription && (
          <>
            <h5 className="text-xs font-extrabold leading-4 text-grayTemplate">
              Our Services
            </h5>
            <p className="text-2xs leading-4 font-light text-grayTemplate">
              {serviceDescription}
            </p>
          </>
        )}
        {/*Photos */}
        {servicePhotos && servicePhotos.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-y-2">
              {servicePhotos[0] && (
                <div className="relative h-36 p-2 rounded-2xl bg-offWhiteTemplate">
                  <div className="relative h-32">
                    <Image
                      src={servicePhotos[0]}
                      fill
                      alt="photo"
                      className="rounded-2xs"
                    />
                  </div>
                </div>
              )}
              {servicePhotos[1] && (
                <div className="relative h-36 p-2 rounded-2xl bg-offWhiteTemplate">
                  <div className="relative h-32">
                    <Image
                      src={servicePhotos[1]}
                      fill
                      alt="photo"
                      className="rounded-2xs"
                    />
                  </div>
                </div>
              )}
            </div>
            {servicePhotos[2] && (
              <div className="relative h-full p-2 rounded-2xl bg-[#F2F2F2]">
                <div className="relative h-custom-278">
                  <Image
                    src={servicePhotos[2]}
                    fill
                    alt="photo"
                    className="rounded-2xs"
                  />
                </div>
              </div>
            )}
          </div>
        )}
        {/*Footer */}
        <TemplateFooter className="flex flex-col items-center my-3 gap-y-3">
          <div className="text-base text-footerBlueTemplate font-bold">
            {company ?? "ABC Company"}
          </div>
          <SocialLinks
            facebookUrl={facebookUrl}
            instagramUrl={instagramUrl}
            linkedinUrl={linkedinUrl}
            variant="buttons"
            size="sm"
            className="flex justify-center gap-2.5"
            buttonClassName="rounded-full h-2xs w-2xs"
          />
          <div className="flex justify-center">
            <p className="text-2xs text-gray-500 font-light">
              Copyright 2025 {company ?? "Company"}. All Right Reserved
            </p>
          </div>
        </TemplateFooter>
      </div>
    </Template8Container>
  );
};

export default Template8;