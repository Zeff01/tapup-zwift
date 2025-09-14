"use client";

import { cn, downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import { Advent_Pro, Akatab } from "next/font/google";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { CiMail, CiSaveDown2 } from "react-icons/ci";

// Components
import {
  CTAButtons,
  SocialLinks,
  TemplateContainer,
  TemplateFooter,
  ClickableImage,
} from "./templatesComponents";
import { ImageViewer, useImageViewer } from "@/components/ImageViewer";

const poppins = Advent_Pro({
  weight: "400",
  subsets: ["latin"],
});

const michroma = Akatab({
  weight: ["700", "600"],
  subsets: ["latin"],
});

// Company Showcase Component for Template12 - Dark Green Theme
const CompanyShowcase = ({
  companies,
  profilePictureUrl,
  firstName,
  lastName,
  imageViewer,
  startingIndex,
}: {
  companies?: Card["companies"];
  profilePictureUrl?: string;
  firstName?: string;
  lastName?: string;
  imageViewer?: ReturnType<typeof useImageViewer>;
  startingIndex?: number;
}) => {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {companies.map((company, index) => (
        <div key={index} className="relative group">
          {/* Main Container */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#D3F1DF]/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Header Section */}
            <div className="relative p-4 bg-gradient-to-r from-[#34463b] via-[#466b55] to-[#34463b]">
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-2 right-2 w-12 h-12 border-2 border-[#D3F1DF] rounded-full"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border border-[#D3F1DF] rounded-full"></div>
              </div>

              <div className="relative z-10 flex justify-between">
                <div className="text-start">
                  <h3
                    className={cn(
                      "text-lg font-bold text-white capitalize",
                      michroma.className
                    )}
                  >
                    {company.company}
                  </h3>
                  <p className="text-white/90 text-sm font-medium">
                    {company.position}
                  </p>
                  <p className="text-white/70 text-xs">
                    {firstName} {lastName}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex flex-col items-end space-y-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
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
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-4">
              {/* Company Background */}
              {company.companyBackground && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4
                      className={cn(
                        "font-semibold text-[#34463b] text-base",
                        michroma.className
                      )}
                    >
                      Company Overview
                    </h4>
                    <div className="w-6 h-6 bg-[#D3F1DF] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#34463b]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4
                      className={cn(
                        "font-semibold text-[#34463b] text-base",
                        michroma.className
                      )}
                    >
                      Services & Expertise
                    </h4>
                    <div className="w-6 h-6 bg-[#D3F1DF] rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-[#34463b]"
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
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4
                        className={cn(
                          "font-semibold text-[#34463b] text-base",
                          michroma.className
                        )}
                      >
                        Portfolio Gallery
                      </h4>
                      <div className="w-6 h-6 bg-[#D3F1DF] rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-[#34463b]"
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
                          <div className="rounded-xl overflow-hidden border border-gray-300 shadow-md">
                            <ClickableImage
                              src={company.servicePhotos[0]}
                              alt={`${company.company} portfolio`}
                              width={600}
                              height={400}
                              className="w-full h-auto object-cover transition-transform duration-300 group-hover/photo:scale-105"
                              onClick={() => {
                                if (imageViewer && startingIndex !== undefined) {
                                  let photoIndex = startingIndex;
                                  // Find the index of this specific photo
                                  companies.forEach((comp, compIdx) => {
                                    if (compIdx < index && comp.servicePhotos) {
                                      photoIndex += comp.servicePhotos.length;
                                    }
                                  });
                                  imageViewer.openViewer(photoIndex);
                                }
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#34463b]/30 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                          <div className="absolute bottom-3 left-3 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-sm font-medium bg-[#34463b]/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                              View Portfolio
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {company.servicePhotos.map((photo, photoIndex) => (
                            <div
                              key={photoIndex}
                              className="relative group/photo rounded-xl overflow-hidden border border-gray-300 shadow-md"
                            >
                              <ClickableImage
                                src={photo}
                                alt={`${company.company} portfolio ${photoIndex + 1}`}
                                width={300}
                                height={200}
                                className="w-full h-auto object-cover transition-all duration-300 group-hover/photo:scale-110"
                                onClick={() => {
                                  if (imageViewer && startingIndex !== undefined) {
                                    let photoIdx = startingIndex;
                                    // Calculate the correct index
                                    companies.forEach((comp, compIdx) => {
                                      if (compIdx < index && comp.servicePhotos) {
                                        photoIdx += comp.servicePhotos.length;
                                      }
                                    });
                                    photoIdx += photoIndex;
                                    imageViewer.openViewer(photoIdx);
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#34463b]/40 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute bottom-2 left-2 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                <span className="text-white text-xs font-medium bg-[#34463b]/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-md">
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

const Template12 = ({
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
  whatsappNumber,
  viberUrl,
  websiteUrl,
  customUrl,
  owner,
}: Card) => {
  const imageViewer = useImageViewer();
  
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

  imageViewer.setImages(allImages);

  return (
    <TemplateContainer
      backgroundColor="bg-[#34463b]"
      padding="none"
      maxWidth="none"
      flex
      flexDirection="col"
    >
      <div className="flex-grow">
        <div className="max-w-[480px] mx-auto min-h-screen relative  flex flex-col">
          <div className="absolute flex gap-x-2 m-4 top-0 right-0">
            <span className=" bg-white text-2xl p-2 text-neutral-800 rounded-full">
              <a href={`mailto:${email}`}>
                <CiMail className="cursor-pointer" />
              </a>
            </span>
            <span className=" bg-white text-2xl p-2 text-neutral-800 rounded-full">
              <CiSaveDown2
                className="cursor-pointer"
                onClick={() => downloadVCard(userProfile)}
              />
            </span>
          </div>
          <div className="relative -z-1 h-[240px]">
            <div className="absolute w-full  flex flex-col items-center justify-center z-20 top-0 left-1/2 transform -translate-x-1/2  ">
              <div className="flex flex-col w-full items-center justify-center pt-2 ">
                {firstName ? (
                  <h1
                    className={cn(
                      "text-xl   text-[#D3F1DF] capitalize",


                    michroma.className
                  )}
                >
                  {company || "COMPANY"}
                </h2>
                <Separator
                  orientation="vertical"
                  className="h-4 bg-[#D3F1DF] mx-2"
                />
                <h2
                  className={cn(
                    "text-xs font-semibold   text-[#D3F1DF] capitalize",

                    michroma.className
                  )}
                >
                  {position || "Chief Technology Officer"}
                </h2>
              </div>
              {profilePictureUrl ? (
                <div className=" rounded-full mx-auto overflow-hidden my-2">
                  <ClickableImage
                    src={profilePictureUrl}
                    alt="Profile Image"
                    width={80}
                    height={80}
                    className="rounded-full w-24 h-24"
                    onClick={() => imageViewer.openViewer(0)}
                  />
                </div>
              ) : (
                <div className=" w-28 h-28 rounded-full mx-auto flex items-center justify-center">
                  <Image
                    src={"/assets/template10samplepic.png"}
                    alt="Profile Image"
                    width={80}
                    height={80}
                    className="rounded-full w-24 h-24"

                  />
                  <h2
                    className={cn(
                      "text-xs font-semibold   text-[#D3F1DF] capitalize",

                      michroma.className
                    )}
                  >
                    {position ?? "Chief Technology Officer"}
                  </h2>
                </div>
                {profilePictureUrl ? (
                  <div className=" rounded-full mx-auto overflow-hidden my-2">
                    <Image
                      src={profilePictureUrl}
                      alt="Profile Image"
                      width={80}
                      height={80}
                      className="rounded-full w-24 h-24"
                    />
                  </div>
                ) : (
                  <div className=" w-28 h-28 rounded-full mx-auto flex items-center justify-center">
                    <Image
                      src={"/assets/template10samplepic.png"}
                      alt="Profile Image"
                      width={80}
                      height={80}
                      className="rounded-full w-24 h-24"
                    />
                  </div>
                )}
              </div>
              <div className="">
                <CTAButtons
                  number={number}
                  email={email}
                  userProfile={userProfile}
                  variant="floating"
                  size="sm"
                  icons="lucide"
                  buttonClassName="bg-[#D3F1DF] w-12 text-xs hover:bg-[#466b55] transition-colors duration-300 border-none rounded-full h-7 text-black shadow-md"
                  layout="horizontal"
                />
              </div>
            </div>


          </div>
          {coverPhotoUrl ? (
            <ClickableImage
              src={coverPhotoUrl}
              alt="Cover Image"
              width={400}
              height={200}
              className="size-full object-cover"
              onClick={() => imageViewer.openViewer(profilePictureUrl ? 1 : 0)}
            />
          ) : (
            <Image
              src="/assets/template9coverphoto.png"

              alt="Cover Image"
              width={400}
              height={200}
              className="size-full object-cover"

            />
          )}
        </div>
        <div className="text-center flex flex-col w-full pb-4 space-y-1 bg-[#D3F1DF] bg-gradient-to-t from-[#85A98F] overflow-hidden to-[#D3F1DF] rounded-t-3xl  z-20 relative -mt-8 flex-1">
          <div className=" flex  items-center w-full gap-3 py-4 text-2xl bg-gradient-to-t from-[#D3F1DF]  to-[#f4fcf7] text-neutral-700 h-16 justify-center">
            <SocialLinks
              facebookUrl={facebookUrl}
              twitterUrl={twitterUrl}
              tiktokUrl={tiktokUrl}
              youtubeUrl={youtubeUrl}
              instagramUrl={instagramUrl}
              linkedinUrl={linkedinUrl}
              viberUrl={viberUrl}
              whatsappNumber={whatsappNumber}
              websiteUrl={websiteUrl}
              cardId={id}
              ownerId={owner}
              size="md"
              iconClassName="text-neutral-700"

            />
          </div>
          <div className="text-center flex flex-col w-full pb-4 space-y-1 bg-[#D3F1DF] bg-gradient-to-t from-[#85A98F] overflow-hidden to-[#D3F1DF] rounded-t-3xl  z-20 relative -mt-8 flex-1">
            <div className=" flex  items-center w-full gap-3 py-4 text-2xl bg-gradient-to-t from-[#D3F1DF]  to-[#f4fcf7] text-neutral-700 h-16 justify-center">
              <SocialLinks
                facebookUrl={facebookUrl}
                twitterUrl={twitterUrl}
                tiktokUrl={tiktokUrl}
                youtubeUrl={youtubeUrl}
                instagramUrl={instagramUrl}
                linkedinUrl={linkedinUrl}
                viberUrl={viberUrl}
                whatsappNumber={whatsappNumber}
                websiteUrl={websiteUrl}
                cardId={id}
                ownerId={owner}
                size="md"
                iconClassName="text-neutral-700"
              />
            </div>
            <div className=" flex flex-col gap-y-2 flex-grow text-black mt-28 px-4">
              <h2 className="text-lg font-bold mt-3">Professional Portfolio</h2>
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
                  imageViewer={imageViewer}
                  startingIndex={
                    (profilePictureUrl ? 1 : 0) + (coverPhotoUrl ? 1 : 0)
                  }
                />
              )}

            </div>
          </div>
        </div>
      </div>

      <TemplateFooter className="flex flex-col items-center mb-1 gap-1 text-center text-xs py-4">
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
            className="opacity-90 text-white"
          />
        </a>
        <span className="tracking-wide text-white text-[10px]">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </TemplateFooter>
      
      <ImageViewer
        images={imageViewer.images}
        isOpen={imageViewer.isOpen}
        currentIndex={imageViewer.currentIndex}
        onClose={imageViewer.closeViewer}
        onNext={imageViewer.nextImage}
        onPrevious={imageViewer.previousImage}
      />
    </TemplateContainer>
  );
};

export default Template12;
