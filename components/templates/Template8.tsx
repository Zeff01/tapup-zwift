import { Card } from "@/types/types";
import Image from "next/image";
import { CiMail, CiPhone, CiSaveDown2 } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import {
  FaXTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaGlobe,
  FaFacebookMessenger,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";
import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import {
  CTAButtons,
  SocialLinks,
  Template8Container,
  TemplateFooter,
} from "./templatesComponents";
import Link from "next/link";

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
  tiktokUrl,
  viberUrl,
  twitterUrl,
  linkedinUrl,
  whatsappNumber,
  websiteUrl,
  customUrl,
  companies,
  owner,
}: Card) => {
  const userProfile = {
    id,
    owner,
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
      <div className="flex-grow">
        <div className="w-full mx-auto  max-w-[480px]">
          <section
            aria-label="Cover Section"
            className="relative h-48 sm:h-60 w-full"
          >
            <div className="relative w-full h-48 sm:h-60 overflow-hidden">
              {/* Image with clip-path */}
              <div className="relative w-full h-48 sm:h-60 overflow-hidden">
                <svg className="w-full h-full">
                  <defs>
                    <clipPath id="curve" clipPathUnits="objectBoundingBox">
                      <path d="M0,0 H1 V0.85 Q0.5,0.5, 0,0.85 Z" />
                    </clipPath>
                  </defs>
                  <image
                    href={
                      coverPhotoUrl || "/assets/template-7-cover-photo.jpeg"
                    }
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#curve)"
                  />
                </svg>
              </div>
            </div>

            {/* Profile Image */}
            <div className="absolute left-1/2 bottom-4  transform -translate-x-1/2 z-10">
              <div className="w-20 h-20 sm:w-[120px] sm:h-[120px] rounded-full border-3 sm:border-4 border-white bg-white overflow-hidden shadow-lg">
                <Image
                  src={profilePictureUrl || "/assets/template4samplepic.png"}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          <div className="px-4">
            {firstName ? (
              <h1 className="text-xl sm:text-2xl font-extrabold text-footerBlueTemplate text-center">
                {firstName + " " + lastName}
              </h1>
            ) : (
              <h1 className="text-xl sm:text-2xl font-extrabold mt-4 text-footerBlueTemplate text-center">
                Hussain Watkins
              </h1>
            )}

            <div className="text-xs sm:text-sm text-gray-700 text-center mt-1">
              {company || "Zwiftech"}{" "}
              {`| ${position || "Chief Technology Officer"}`}
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-xs text-gray-500 text-center mt-1 break-all">
            {email && (
              <>
                {email}
                {number && <> | {number}</>}
              </>
            )}
            {!email && number && <>{number}</>}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full justify-center mt-3 sm:mt-4 px-4">
            <CTAButtons
              number={number}
              email={email}
              userProfile={userProfile}
              variant="pills"
              size="sm"
              icons="lucide"
              buttonClassName="bg-blue-500 text-white hover:bg-blue-600"
            />
          </div>

          <div className="flex justify-center px-4 mt-3 sm:mt-5">
            <SocialLinks
              facebookUrl={facebookUrl}
              instagramUrl={instagramUrl}
              linkedinUrl={linkedinUrl}
              twitterUrl={twitterUrl}
              youtubeUrl={youtubeUrl}
              tiktokUrl={tiktokUrl}
              whatsappNumber={whatsappNumber}
              viberUrl={viberUrl}
              websiteUrl={websiteUrl}
              cardId={id}
              ownerId={owner}
              variant="colorful"
              size="lg"
              iconSet="solid"
              iconClassName=" p-2 rounded-full  w-full h-full"
              colorfulColors={{
                facebook: {
                  icon: "#1877f3",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                instagram: {
                  icon: "#e4405f",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                linkedin: {
                  icon: "#0a66c2",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                twitter: {
                  icon: "#000000",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                youtube: {
                  icon: "#ff0000",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                tiktok: {
                  icon: "#000000",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                whatsapp: {
                  icon: "#25d366",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                viber: {
                  icon: "#665cac",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
                website: {
                  icon: "#6b7280",
                  background: "#f3f4f6",
                  hover: { background: "#e5e7eb" },
                },
              }}
            />
          </div>

          <div className="px-4 mt-4">
            {email && (
              <Link
                href={`mailto:${email}`}
                className="w-full flex justify-center items-center bg-footerBlueTemplate py-3 rounded-full"
              >
                <span className="text-white font-semibold text-sm">
                  Email Me!
                </span>
              </Link>
            )}
          </div>

          {/* COMPANY INTRODUCTION */}
          <div className="border-t border-t-neutral-300 mt-4 mb-6 px-4 pt-4">
            <h2 className="text-lg font-bold  mb-1">Professional Portfolio</h2>
            <p className="text-sm text-gray-600">
              Below you&#39;ll find details about my professional experience and
              the companies I&#39;ve worked with. Each entry highlights my role,
              responsibilities, and the services offered.
            </p>
          </div>
          <div className="px-4">
            <div className="relative mb-6">
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-transparent" />
              <div className="flex items-center justify-center">
                <div className="px-4 py-1">
                  <span className="text-xs uppercase tracking-wider text-blue-500 font-medium">
                    Company Experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4">
            {companies?.map((c, i) => (
              <div
                key={i}
                className="mb-4 relative bg-gray-100 rounded-xl shadow-xl overflow-hidden border border-gray-300 "
              >
                {/* Company Post Header - Facebook Style */}
                <div className="flex items-center px-4 py-2 border-b border-gray-300 ">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 flex-shrink-0 border border-blue-200">
                    {profilePictureUrl ? (
                      <Image
                        src={profilePictureUrl}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-500">
                        <span className="text-white font-bold text-xs">
                          {firstName?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-2 flex-1">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-800">
                        {firstName} {lastName}
                      </span>
                      <div className="flex items-center">
                        <span className="text-xs text-gray-600">
                          {c.position} at{" "}
                        </span>
                        <span className="text-xs font-medium text-blue-600 ml-1">
                          {c.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About & Services Content - Above Images */}
                <div className="px-4 pt-3">
                  {/* Background & Services */}
                  <div className="space-y-3 mb-3">
                    {c.companyBackground?.trim() && (
                      <div>
                        <h2 className="text-sm font-bold text-blue-600 mb-1">
                          About
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-700">
                          {c.companyBackground}
                        </p>
                      </div>
                    )}

                    {c.serviceDescription?.trim() && (
                      <div className="mt-3">
                        <h3 className="text-sm font-bold text-blue-600 mb-1">
                          Services
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-700">
                          {c.serviceDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Service Photos - Below About & Services */}
                  {Array.isArray(c.servicePhotos) &&
                    c.servicePhotos.length > 0 && (
                      <div className="mt-2 mb-3">
                        {c.servicePhotos.length === 1 ? (
                          <div className="relative overflow-hidden rounded-lg border border-neutral-300 shadow-md">
                            <Image
                              src={c.servicePhotos[0]}
                              alt={`${c.company} Featured Image`}
                              width={600}
                              height={400}
                              layout="responsive"
                              className="object-cover w-full"
                            />
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-1">
                            {c.servicePhotos.map((photo, index) => (
                              <div
                                key={index}
                                className="relative overflow-hidden rounded-md border border-neutral-300 shadow-md"
                              >
                                <Image
                                  src={photo}
                                  alt={`${c.company} Portfolio Image ${index + 1}`}
                                  width={300}
                                  height={300}
                                  layout="responsive"
                                  className="object-cover w-full"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* footer */}
      <TemplateFooter className="mt-auto bg-white px-5 pb-4">
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
    </Template8Container>
  );
};

export default Template8;
