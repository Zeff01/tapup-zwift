"use client";

import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  Template9Container,
  Template9CTA,
  Template9Socials,
  TemplateFooter,
} from "./templatesComponents";
import { ImageViewer, useImageViewer } from "@/components/ImageViewer";
import { ClickableImage } from "./templatesComponents/ClickableImage";

// Company Showcase Component for Template9
const CompanyShowcase = ({
  companies,
  profilePictureUrl,
  firstName,
  lastName,
  onImageClick,
}: {
  companies?: Card["companies"];
  profilePictureUrl?: string;
  firstName?: string;
  lastName?: string;
  onImageClick: (src: string) => void;
}) => {
  if (!companies || companies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {companies.map((company, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Company Header */}
          <div className="p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {company.company?.charAt(0) || "C"}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {company.company}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    {company.position}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Company Background */}
            {company.companyBackground && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Company Overview
                  </h4>
                </div>
                <div className="pl-4 border-l-2 border-blue-100">
                  <p className="text-gray-700 leading-relaxed">
                    {company.companyBackground}
                  </p>
                </div>
              </div>
            )}

            {/* Service Description */}
            {company.serviceDescription && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Services & Expertise
                  </h4>
                </div>
                <div className="pl-4 border-l-2 border-indigo-100">
                  <p className="text-gray-700 leading-relaxed">
                    {company.serviceDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Service Photos */}
            {Array.isArray(company.servicePhotos) &&
              company.servicePhotos.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      Portfolio Gallery
                    </h4>
                  </div>
                  <div className="pl-4">
                    {company.servicePhotos.length === 1 ? (
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        <ClickableImage
                          src={company.servicePhotos?.[0]}
                          alt={`${company.company} portfolio`}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          onClick={() => onImageClick(company.servicePhotos?.[0] || '')}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {company.servicePhotos.map((photo, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="rounded-xl overflow-hidden shadow-lg group relative"
                          >
                            <ClickableImage
                              src={photo}
                              alt={`${company.company} portfolio ${photoIndex + 1}`}
                              width={300}
                              height={200}
                              className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-110"
                              onClick={() => onImageClick(photo)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-full">
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

            {/* Contact Info */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>
                    {firstName} {lastName}
                  </span>
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-indigo-500"
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
                  <span>{company.position}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Template9 = ({
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

  const allImages = [
    profilePictureUrl || "/assets/template10samplepic.png",
    coverPhotoUrl || "/assets/template9coverphoto.png",
    ...(companies?.flatMap(c => c.servicePhotos || []) || [])
  ].filter(Boolean);

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex(img => img === src);
    if (index !== -1) {
      openViewer(allImages, index);
    }
  };

  return (
    <Template9Container>
      <div className="flex-grow">
      <div className="flex flex-col min-h-full max-w-[480px] mx-auto">
        <div className="h-96 relative">
          <div className="absolute flex m-1 top-1 right-1 ">
            <Template9CTA
              number={number}
              email={email}
              userProfile={userProfile}
              icons="lucide"
            />
          </div>

          <div className="">
            {coverPhotoUrl ? (
              <ClickableImage
                src={coverPhotoUrl}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto w-full object-cover overflow-hidden"
                onClick={() => openViewer(allImages, 1)}
              />
            ) : (
              <ClickableImage
                src={"/assets/template9coverphoto.png"}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto"
                onClick={() => openViewer(allImages, 1)}
              />
            )}
          </div>

          <div className="absolute  z-20 top-[118px] left-1/2 transform -translate-x-1/2 ">
            {profilePictureUrl ? (
              <div className=" rounded-full mx-auto overflow-hidden">
                <ClickableImage
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-24 h-24"
                  onClick={() => openViewer(allImages, 0)}
                />
              </div>
            ) : (
              <div className=" w-28 h-28 rounded-full mx-auto flex items-center justify-center">
                <ClickableImage
                  src={"/assets/template10samplepic.png"}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-24 h-24"
                  onClick={() => openViewer(allImages, 0)}
                />
              </div>
            )}
          </div>

          <div className="text-center pt-16  absolute bottom-0 w-full space-y-1 bg-white rounded-t-3xl">
            {firstName ? (
              <h1 className="font-semibold text-2xl text-neutral-900 tracking-wider  capitalize">
                {firstName + " " + lastName}
              </h1>
            ) : (
              <h1 className="text-xl font-bold  ">Hussain Watkins</h1>
            )}

            <p className="text-lg  font-normal text-neutral-700">
              {position || "Chief Technology Officer"}
            </p>

            <div className="flex items-center font-light text-sm text-neutral-600 justify-center gap-x-2">
              <input
                type="text"
                value={email}
                readOnly
                className="max-w-[120px] truncate bg-transparent border-none outline-none cursor-pointer text-center font-light text-sm text-neutral-600"
                onClick={(e) => {
                  e.currentTarget.select();
                  navigator.clipboard.writeText(e.currentTarget.value);
                }}
              />
              <span>|</span>
              <input
                type="text"
                value={String(number)}
                readOnly
                className="max-w-[120px] truncate bg-transparent border-none outline-none cursor-pointer text-center font-light text-sm text-neutral-600"
                onClick={(e) => {
                  e.currentTarget.select();
                  navigator.clipboard.writeText(e.currentTarget.value);
                }}
              />
            </div>
            <div className="flex items-center gap-x-4 py-4 text-2xl text-neutral-700 h-16 justify-center">
              <Template9Socials
                facebookUrl={facebookUrl}
                twitterUrl={twitterUrl}
                tiktokUrl={tiktokUrl}
                youtubeUrl={youtubeUrl}
                instagramUrl={instagramUrl}
                linkedinUrl={linkedinUrl}
                viberUrl={viberUrl}
                whatsappNumber={whatsappNumber}
                websiteUrl={websiteUrl}
                size="lg"
                iconSet="outline"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-y-6 pt-6 bg-white px-3 flex-grow border-t border-t-neutral-300 text-neutral-900">
          <h2 className="text-lg font-bold mb-1">Professional Portfolio</h2>
          <p className="text-sm">
            Below you&#39;ll find details about my professional experience and
            the companies I&#39;ve worked with. Each entry highlights my role,
            responsibilities, and the services offered.
          </p>

          <div className="w-full mx-auto">
            {/* Company Experience Section */}
            {companies && companies.length > 0 && (
              <CompanyShowcase
                companies={companies}
                profilePictureUrl={profilePictureUrl}
                firstName={firstName}
                lastName={lastName}
                onImageClick={handleImageClick}
              />
            )}
          </div>
        </div>
        </div>

        {/* footer */}
        <TemplateFooter className="mt-auto bg-white px-5 pb-4">
          <h2 className="font-semibold text-xl mx-auto w-full tracking-wider text-center">
            {company ?? "COMPANY"}
          </h2>
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
      </div>
      
      {viewerState.isOpen && (
        <ImageViewer
          images={viewerState.images}
          initialIndex={viewerState.initialIndex}
          onClose={closeViewer}
        />
      )}
    </Template9Container>
  );
};

export default Template9;
