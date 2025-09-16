"use client";

import { Card } from "@/types/types";
import Image from "next/image";

// fonts
import { cn, getCopyrightYear } from "@/lib/utils";
import { Mulish, Roboto_Condensed } from "next/font/google";

import {
  CTAButtons,
  SocialLinks,
  TemplateContainer,
  TemplateFooter,
  ClickableImage,
} from "./templatesComponents";
import { ImageViewer, useImageViewer } from "@/components/ImageViewer";

const roboto_c = Roboto_Condensed({
  weight: "500",
  subsets: ["latin"],
});

const mulish = Mulish({
  weight: ["300", "800"],
  subsets: ["latin"],
});

// Company Showcase Component for Template11 - Light Blue Theme
const CompanyShowcase = ({
  companies,
  profilePictureUrl,
  firstName,
  lastName,
  imageViewer,
  startingIndex,
  allImages,
}: {
  companies?: Card["companies"];
  profilePictureUrl?: string;
  firstName?: string;
  lastName?: string;
  imageViewer?: ReturnType<typeof useImageViewer>;
  startingIndex?: number;
  allImages?: string[];
}) => {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {companies.map((company, index) => (
        <div key={index} className="relative">
          {/* Main Container */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#A0E9FF]/50">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-[#A0E9FF] via-[#00A9FF] to-[#A0E9FF] p-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Company Badge */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xl font-bold text-[#00A9FF]">
                        {company.company?.charAt(0) || "C"}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00A9FF] rounded-full border-2 border-white"></div>
                  </div>

                  {/* Company Title */}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {company.company}
                    </h3>
                    <p className="text-white/90 text-sm">{company.position}</p>
                    <p className="text-white/80 text-xs">
                      {firstName} {lastName}
                    </p>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-6">
              {/* Company Background */}
              {company.companyBackground && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-[#A0E9FF]/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">
                      Company Overview
                    </h4>
                    <div className="w-6 h-6 bg-[#A0E9FF] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#00A9FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {company.companyBackground}
                  </p>
                </div>
              )}

              {/* Service Description */}
              {company.serviceDescription && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-[#A0E9FF]/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800">
                      Services & Expertise
                    </h4>
                    <div className="w-6 h-6 bg-[#A0E9FF] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#00A9FF]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {company.serviceDescription}
                  </p>
                </div>
              )}

              {/* Service Photos */}
              {Array.isArray(company.servicePhotos) &&
                company.servicePhotos.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-[#A0E9FF]/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Portfolio Gallery
                      </h4>
                      <div className="w-6 h-6 bg-[#A0E9FF] rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-[#00A9FF]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      {company.servicePhotos.length === 1 ? (
                        <div className="relative group/photo">
                          <div className="rounded-xl overflow-hidden border-2 border-[#A0E9FF] shadow-md">
                            <ClickableImage
                              src={company.servicePhotos?.[0]}
                              alt={`${company.company} portfolio`}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover transition-transform duration-300 group-hover/photo:scale-105"
                              onClick={() => {
                                if (
                                  imageViewer &&
                                  startingIndex !== undefined
                                ) {
                                  let photoIndex = startingIndex;
                                  // Find the index of this specific photo
                                  companies.forEach((comp, compIdx) => {
                                    if (compIdx < index && comp.servicePhotos) {
                                      photoIndex += comp.servicePhotos.length;
                                    }
                                  });
                                  if (allImages) {
                                    imageViewer.openViewer(
                                      allImages,
                                      photoIndex
                                    );
                                  }
                                }
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#00A9FF]/20 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-sm font-medium bg-[#00A9FF] px-3 py-1 rounded-full shadow-md">
                              View Portfolio
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {company.servicePhotos.map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="relative group/photo rounded-xl overflow-hidden border-2 border-[#A0E9FF] shadow-md"
                            >
                              <ClickableImage
                                src={photo}
                                alt={`${company.company} portfolio ${photoIndex + 1}`}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover transition-all duration-300 group-hover/photo:scale-110"
                                onClick={() => {
                                  if (
                                    imageViewer &&
                                    startingIndex !== undefined
                                  ) {
                                    let photoIdx = startingIndex;
                                    // Calculate the correct index
                                    companies.forEach((comp, compIdx) => {
                                      if (
                                        compIdx < index &&
                                        comp.servicePhotos
                                      ) {
                                        photoIdx += comp.servicePhotos.length;
                                      }
                                    });
                                    photoIdx += photoIndex;
                                    if (allImages) {
                                      imageViewer.openViewer(
                                        allImages,
                                        photoIdx
                                      );
                                    }
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#00A9FF]/30 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute bottom-2 left-2 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                <span className="text-white text-xs font-medium bg-[#00A9FF] px-2 py-1 rounded-full shadow-md">
                                  View {photoIndex + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Template11 = ({
  id,
  profilePictureUrl,
  coverPhotoUrl,
  position,
  company,
  companies,
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
  viberUrl,
  whatsappNumber,
  websiteUrl,
  customUrl,
  owner,
}: Card) => {
  const { viewerState, openViewer, closeViewer } = useImageViewer();

  const userProfile = {
    id,
    owner,
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
    customUrl,
  };

  // Collect all images for the viewer
  const allImages: string[] = [];

  // Add profile picture if exists
  if (profilePictureUrl) {
    allImages.push(profilePictureUrl);
  }

  // Add cover photo if exists
  if (coverPhotoUrl) {
    allImages.push(coverPhotoUrl);
  }

  // Add all service photos from companies
  if (companies) {
    companies.forEach((company) => {
      if (company.servicePhotos && Array.isArray(company.servicePhotos)) {
        allImages.push(...company.servicePhotos);
      }
    });
  }

  // Images will be passed when openViewer is called

  return (
    <TemplateContainer
      backgroundColor="bg-white"
      padding="none"
      maxWidth="none"
      flex={true}
      flexDirection="col"
      alignItems="center"
      justifyContent="between"
    >
      <div className="flex-grow">
        <div className="w-full mx-auto min-h-screen relative max-w-[480px]">
          <div className="flex gap-2 z-20 absolute right-0 top-0 p-1">
            <CTAButtons
              number={number}
              email={email}
              userProfile={userProfile}
              variant="floating"
              size="sm"
              icons="outline"
              buttonClassName="bg-[#A0E9FF] text-[#00A9FF] border-0 shadow hover:bg-[#00A9FF] hover:text-white transform hover:scale-110"
            />
          </div>

          {/* COVERPHOTO AND PROFILE PIC */}
          <div className="  flex flex-col relative ">
            {coverPhotoUrl ? (
              <ClickableImage
                src={coverPhotoUrl}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto w-full h-56 object-cover  overflow-hidden"
                onClick={() => openViewer(allImages, profilePictureUrl ? 1 : 0)}
              />
            ) : (
              <Image
                src={"/assets/template10coverphoto.png"}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto"
              />
            )}
          </div>

          {/* PERSONAL INFORMATION */}
          <div className="text-center mt-24 top-0 w-[calc(100%-32px)] rounded-3xl  space-y-1 absolute left-1/2 transform -translate-x-1/2 bg-[#A0E9FF] shadow-md">
            {profilePictureUrl ? (
              <div className="flex justify-center w-full -mt-14">
                <div className=" bg-[#A0E9FF] w-fit  rounded-full mx-auto overflow-hidden p-[5px]">
                  <ClickableImage
                    src={profilePictureUrl}
                    alt="Profile Image"
                    width={80}
                    height={80}
                    className="rounded-full w-24 h-24"
                    onClick={() => openViewer(allImages, 0)}
                  />
                </div>
              </div>
            ) : null}
            {firstName ? (
              <h1
                className={cn(
                  "text-xl font-extrabold tracking-wider text-[#00A9FF] capitalize",
                  firstName ? "mt-4" : "mt-2",
                  mulish.className
                )}
              >
                {firstName + " " + lastName}
              </h1>
            ) : (
              <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
            )}
            <div className="flex text-sm text-gray-600 items-center justify-center gap-x-1">
              <h2 className={cn("capitalize text-end", roboto_c.className)}>
                {company || "COMPANY"}
              </h2>
              <p>|</p>
              <h2 className={cn("capitalize text-start", roboto_c.className)}>
                {position || "Chief Technology Officer"}
              </h2>
            </div>

            <div className="gap-x-2 w-full text-xs font-thin gap-y-1  flex flex-col text-black opacity-50 justify-center items-center">
              <p>{email}</p>

              <p>{number}</p>
            </div>
            {/* SOCIAL MEDIA ICONS */}
            <div className="flex justify-start px-4 mt-3 sm:mt-5 pb-2">
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
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  instagram: {
                    icon: "#e4405f",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  linkedin: {
                    icon: "#0a66c2",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  twitter: {
                    icon: "#000000",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  youtube: {
                    icon: "#ff0000",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  tiktok: {
                    icon: "#000000",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  whatsapp: {
                    icon: "#25d366",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  viber: {
                    icon: "#665cac",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                  website: {
                    icon: "#6b7280",
                    background: "rgb(255 255 255 / 0.5)",
                    hover: { background: "#ffffff" },
                  },
                }}
              />
            </div>
          </div>

          <div className=" flex flex-col gap-y-3 flex-grow text-black mt-28 px-4">
            <h2 className="text-lg font-bold ">Professional Portfolio</h2>
            <p className="text-sm">
              Below you&#39;ll find details about my professional experience and
              the companies I&#39;ve worked with. Each entry highlights my role,
              responsibilities, and the services offered.
            </p>

            <div className="w-full mx-auto mt-4">
              {companies && companies.length > 0 && (
                <CompanyShowcase
                  companies={companies}
                  profilePictureUrl={profilePictureUrl}
                  firstName={firstName}
                  lastName={lastName}
                  imageViewer={{ viewerState, openViewer, closeViewer }}
                  startingIndex={
                    (profilePictureUrl ? 1 : 0) + (coverPhotoUrl ? 1 : 0)
                  }
                  allImages={allImages}
                />
              )}
            </div>
          </div>
        </div>
        <TemplateFooter className="flex flex-col items-center  justify-center gap-x-1 text-xs  pb-4 ">
          <div className="flex flex-col items-center mt-8 gap-1 text-center text-xs">
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

      {viewerState.isOpen && (
        <ImageViewer
          images={viewerState.images}
          initialIndex={viewerState.initialIndex}
          onClose={closeViewer}
        />
      )}
    </TemplateContainer>
  );
};

export default Template11;
