import { Button } from "@/components/ui/button";
import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaGlobe,
} from "react-icons/fa6";
import {
  Template7Container,
  Template7ProfileHeader,
  EmailButton,
  TemplateFooter,
} from "./templatesComponents";

const Template7 = ({
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
  tiktokUrl,
  whatsappNumber,
  skypeInviteUrl,
  websiteUrl,
  viberUrl,
  customUrl,
}: Card) => {
  const userProfile = {
    id,
    profilePictureUrl,
    coverPhotoUrl,
    servicePhotos,
    companyBackground,
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
    <Template7Container>
      <Template7ProfileHeader
        profilePictureUrl={profilePictureUrl}
        coverPhotoUrl={coverPhotoUrl}
        firstName={firstName}
        lastName={lastName}
      />
      <div className="flex flex-col px-5">
        {/* PERSONAL INFORMATION */}
        <div className="mt-20 space-y-1">
          <h1 className="text-xl font-bold mt-4 text-blue-600 ">
            {firstName ? `${firstName} ${lastName}` : "Janna Marie Smith"}
          </h1>
          <p className="font-semibold text-grayTemplate">
            {position ?? "ABC Company | UI/UX Designer"}
          </p>
          <p className=" text-grayTemplate text-xs">
            {email ?? "jannamariesmith@gmail.com"}
          </p>
          <p className=" text-grayTemplate text-xs">
            {number ?? "+639123456789"}
          </p>
        </div>

        {/* SOCIALS */}
        <div className="flex mt-3 gap-2">
          {facebookUrl && (
            <Link href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full">
                <FaFacebook />
              </Button>
            </Link>
          )}
          {instagramUrl && (
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full">
                <FaInstagram />
              </Button>
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full">
                <FaLinkedin />
              </Button>
            </Link>
          )}
          <Link href={`mailto:${email}`}>
            <Button className="rounded-full">
              <FaEnvelope className="cursor-pointer" />
            </Button>
          </Link>
          <Link href={`tel:${number}`}>
            <Button className="rounded-full">
              <FaPhone className="cursor-pointer" />
            </Button>
          </Link>
          {websiteUrl && (
            <Link href={websiteUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full">
                <FaGlobe />
              </Button>
            </Link>
          )}
        </div>

        {/* CTA BUTTONS */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <EmailButton
            email={email ?? "jannamariesmith@gmail.com"}
            className="col-span-2 hover:bg-blueTemplate bg-blue-700 text-white"
          >
            Email Me
          </EmailButton>
          <Button
            onClick={() => downloadVCard(userProfile)}
            className="bg-gray-800 text-white hover:bg-slate-900"
          >
            Save
          </Button>
        </div>

        {/*COMPANY DETAILS */}
        <div className="flex flex-col mt-5">
          <div className="text-xl text-blue-600 font-bold mb-5">
            {company ?? "ABC Company"}
          </div>
          {companyBackground && (
            <div className="flex flex-col gap-y-2 mb-3">
              <div className="text-gray-500 text-xs font-semibold">
                Company Overview
              </div>
              <div className="text-gray-500 text-2xs font-normal leading-4">
                {companyBackground}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-y-2 mb-3">
            <div className="text-gray-500 text-xs font-semibold">
              Our Services
            </div>
            <div className="text-gray-500 text-2xs font-normal leading-4">
              {serviceDescription ??
                "Lorem ipsum dolor sit amet consectetur. Commodo non imperdiet tempus orci non id nibh faucibus. Laoreet at hendrerit at viverra "}
            </div>
          </div>
        </div>

        {/*Photos */}
        {servicePhotos && servicePhotos.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-y-2">
              {servicePhotos[0] && (
                <div className="relative h-52 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-48">
                    <Image
                      src={servicePhotos[0]}
                      alt="Image"
                      className="rounded-lg object-cover"
                      fill
                    />
                  </div>
                </div>
              )}
              {servicePhotos[1] && (
                <div className="relative h-36 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-32">
                    <Image
                      src={servicePhotos[1]}
                      alt="Image"
                      className="rounded-lg object-cover"
                      fill
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              {servicePhotos[2] && (
                <div className="relative h-36 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-32">
                    <Image
                      src={servicePhotos[2]}
                      alt="Image"
                      className="rounded-lg object-cover"
                      fill
                    />
                  </div>
                </div>
              )}
              {servicePhotos[3] && (
                <div className="relative h-52 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-48">
                    <Image
                      src={servicePhotos[3]}
                      alt="Image"
                      className="rounded-lg shadow-lg object-cover"
                      fill
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/*Footer */}
        <TemplateFooter className="flex flex-col items-center my-3 gap-y-3">
          <div className="text-base text-footerBlueTemplate font-bold">
            {company ?? "ABC Company"}
          </div>
          <div className="flex justify-center gap-2.5">
            {facebookUrl && (
              <Link
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full h-2xs w-2xs">
                  <FaFacebook />
                </Button>
              </Link>
            )}
            {instagramUrl && (
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full h-2xs w-2xs">
                  <FaInstagram />
                </Button>
              </Link>
            )}
            {linkedinUrl && (
              <Link
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="rounded-full h-2xs w-2xs">
                  <FaLinkedin />
                </Button>
              </Link>
            )}
          </div>
          <div className="flex justify-center">
            <p className="text-3xs text-gray-500 font-light">
              Copyright 2025 {company ?? "ABC Company"}. All Right Reserved
            </p>
          </div>
        </TemplateFooter>
      </div>
    </Template7Container>
  );
};

export default Template7;
