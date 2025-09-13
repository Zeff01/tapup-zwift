import { Button } from "@/components/ui/button";
import { downloadVCard } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  FaEnvelope,
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa6";

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
  whatsappNumber,
  websiteUrl,
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
    <div className="bg-white text-black p-4 flex flex-col justify-between min-h-screen">
      <div className="flex-grow">
      <div className="w-full mx-auto  max-w-[480px]">
        <div className="flex flex-col relative">
          <div className="w-full h-48">
            {coverPhotoUrl ? (
              <Image
                src={
                  userProfile.coverPhotoUrl ||
                  "/assets/template-7-cover-photo.jpeg"
                }
                alt="Cover Image"
                width={400}
                height={200}
                className="w-full h-52 object-cover overflow-hidden"
              />
            ) : (
              <Image
                src={"/assets/template-7-cover-photo.jpeg"}
                alt="Cover Image"
                width={400}
                height={200}
                priority={false}
                className="w-full h-52 object-cover overflow-hidden"
              />
            )}
          </div>
          <div className="absolute -bottom-16 rounded-xl left-1/4 transform -translate-x-24 bg-offWhiteTemplate border-8 border-offWhiteTemplate h-custom-29 w-custom-29">
            {profilePictureUrl ? (
              <Image
                src={
                  userProfile.profilePictureUrl ||
                  "/assets/template-7-cover-photo.jpeg"
                }
                alt="Profile Image"
                fill
                className="rounded-xl"
              />
            ) : (
              <div className="rounded-[20px]">
                <Image
                  src={"/assets/template-7-profile-picture.jpeg"}
                  alt="Profile Image"
                  fill
                  className="rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col px-5">
          {/* PERSONAL INFORMATION */}
          <div className="mt-20 space-y-1">
            {firstName ? (
              <h1 className="text-xl font-bold mt-4 text-blue-600 ">
                {firstName + " " + lastName}
              </h1>
            ) : (
              <h1 className="text-xl font-bold mt-2 text-blue-600 ">
                Janna Marie Smith
              </h1>
            )}
            <p className="font-semibold text-grayTemplate">
              {position ?? "ABC Company | UI/UX Designer"}
            </p>
            <p className=" text-grayTemplate text-xs">
              {email ?? "jannamariesmith@gmail.com"}
            </p>
            <p className=" text-grayTemplate text-xs">
              {" "}
              {number ?? "+639123456789"}
            </p>
          </div>
          {/* SOCIALS */}
          <div className="flex pl-5 mt-3 gap-2">
            {facebookUrl && (
              <Button className="rounded-full">
                <FaFacebook />
              </Button>
            )}
            {instagramUrl && (
              <Button className="rounded-full">
                <FaInstagram />
              </Button>
            )}
            {linkedinUrl && (
              <Button className="rounded-full">
                <FaLinkedin />
              </Button>
            )}
            <Button className="rounded-full">
              <a href={`mailto:${email}`}>
                <FaEnvelope className="cursor-pointer" />
              </a>
            </Button>
            <Button className="rounded-full">
              <a href={`tel:${number}`} className="text-decoration-none">
                <FaPhone className="cursor-pointer" />
              </a>
            </Button>
            {websiteUrl && (
              <Button className="rounded-full">
                <FaGlobe />
              </Button>
            )}
          </div>
          {/* CTA BUTTONS */}
          <div className="grid grid-cols-3 gap-4 mt-5">
            <Button className="col-span-2 hover:bg-blueTemplate bg-blue-700 text-white">
              <a href={`mailto:${email}`}>Email Me</a>
            </Button>
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
            <div className="flex flex-col gap-y-2 mb-3">
              <div className="text-gray-500 text-xs font-semibold">
                Company Overview
              </div>
              <div className="text-gray-500 text-2xs font-normal leading-4">
                {userProfile.companyBackground}
              </div>
            </div>
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
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-y-2">
              {userProfile.servicePhotos?.[0] && (
                <div className="relative h-52 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-48">
                    <Image
                      src={
                        userProfile.servicePhotos?.[0] ||
                        "/assets/template-7-image1.jpeg"
                      }
                      alt="Image"
                      className="rounded-lg"
                      fill
                    ></Image>
                  </div>
                </div>
              )}
              {userProfile.servicePhotos?.[1] && (
                <div className="relative h-36 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-32">
                    <Image
                      src={
                        userProfile.servicePhotos?.[1] ||
                        "/assets/template-7-image1.jpeg"
                      }
                      alt="Image"
                      className="rounded-lg"
                      fill
                    ></Image>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              {userProfile.servicePhotos?.[2] && (
                <div className="relative h-36 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-32">
                    <Image
                      src={
                        userProfile.servicePhotos?.[2] ||
                        "/assets/template-7-image1.jpeg"
                      }
                      alt="Image"
                      className="rounded-lg"
                      fill
                    ></Image>
                  </div>
                </div>
              )}
              {userProfile.servicePhotos?.[3] && (
                <div className="relative h-52 p-2 rounded-lg bg-offWhiteTemplate">
                  <div className="relative h-48">
                    <Image
                      src={
                        userProfile.servicePhotos?.[3] ||
                        "/assets/template-7-image1.jpeg"
                      }
                      alt="Image"
                      className="rounded-lg shadow-lg object-cover"
                      fill
                    ></Image>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
          {/*Footer */}
          <div className="flex flex-col items-center my-3 gap-y-3">
            <div className="text-base text-footerBlueTemplate font-bold">
              {company ?? "ABC Company"}
            </div>
            <div className="flex justify-center gap-2.5">
              {facebookUrl && (
                <Button className="rounded-full h-2xs w-2xs">
                  <FaFacebook />
                </Button>
              )}
              {instagramUrl && (
                <Button className="rounded-full h-2xs w-2xs">
                  <FaInstagram />
                </Button>
              )}
              {linkedinUrl && (
                <Button className="rounded-full h-2xs w-2xs">
                  <FaLinkedin />
                </Button>
              )}
            </div>
            <div className="flex justify-center">
              <p className="text-3xs text-gray-500 font-light">
                Copyright 2025 {userProfile.company}. All Right Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template7;
