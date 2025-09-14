"use client";

import { Button } from "@/components/ui/button";
import { downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import {
  Template7ProfileHeader,
  Template7Container,
  CTAButtons,
  Template1CTA,
  SocialLinks,
  TemplateFooter,
} from "./templatesComponents";
import Link from "next/link";
import { ImageViewer, useImageViewer } from "@/components/ImageViewer";
import { ClickableImage } from "./templatesComponents/ClickableImage";

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
                <div>
                  <h3 className="text-2xl font-extrabold text-blue-500 mb-1">
                    {company.company}
                  </h3>
                  <p className="text-gray-900 font-semibold">
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
                  <h4 className="text-lg font-semibold text-gray-900">
                    Company Overview
                  </h4>
                </div>
                <div className="pl-4">
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
                  <h4 className="text-lg font-semibold text-gray-900">
                    Services & Expertise
                  </h4>
                </div>
                <div className="pl-4 ">
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
                    <h4 className="text-lg font-semibold text-gray-900">
                      Portfolio Gallery
                    </h4>
                  </div>
                  <div>
                    {company.servicePhotos.length === 1 ? (
                      <div className="rounded-xl overflow-hidden shadow-lg">
                        <ClickableImage
                          src={company.servicePhotos[0]}
                          alt={`${company.company} portfolio`}
                          width={600}
                          height={400}
                          className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                          onClick={() => onImageClick(company.servicePhotos[0])}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {company.servicePhotos.map((photo, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="rounded-xl overflow-hidden shadow-lg group relative p-2 bg-gray-100"
                          >
                            <ClickableImage
                              src={photo}
                              alt={`${company.company} portfolio ${photoIndex + 1}`}
                              width={300}
                              height={photoIndex % 3 === 0 ? 230 : 200}
                              className="w-full h-auto object-cover transition-all duration-300 group-hover:scale-110 rounded-xl"
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
  companies,
  facebookUrl,
  youtubeUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  tiktokUrl,
  whatsappNumber,
  websiteUrl,
  viberUrl,
  customUrl,
  owner,
}: Card) => {
  const { viewerState, openViewer, closeViewer } = useImageViewer();
  
  const userProfile = {
    id,
    owner,
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

  const allImages = [
    profilePictureUrl || "/assets/template-7-image1.jpeg",
    coverPhotoUrl || "/assets/template-7-cover-photo.jpeg",
    ...(companies?.flatMap(c => c.servicePhotos || []) || [])
  ].filter(Boolean);

  const handleImageClick = (src: string) => {
    const index = allImages.findIndex(img => img === src);
    if (index !== -1) {
      openViewer(allImages, index);
    }
  };

  return (
    <Template7Container>
      <div className="flex-grow">
        <Template7ProfileHeader
          profilePictureUrl={profilePictureUrl}
          coverPhotoUrl={coverPhotoUrl}
          firstName={firstName}
          lastName={lastName}
          profileSize="lg"
          coverHeight="md"
          profilePosition="left"
          defaultProfileImage="/assets/template-7-image1.jpeg"
          defaultCoverImage="/assets/template-7-cover-photo.jpeg"
          profileClassName="border-2 border-white"
        />

        {/* CTA BUTTONS */}
        <Template1CTA
          number={number}
          email={email}
          userProfile={userProfile}
          size="md"
          icons="lucide"
          buttonClassName="text-gray-100 bg-blue-500 border-blue-500 hover:bg-blue-600"
          className="flex justify-end gap-1 pr-4 pt-4"
        />

        {/* PERSONAL INFORMATION */}
        <div className="px-4 mb-4">
          {firstName ? (
            <h1 className="text-xl sm:text-2xl font-extrabold mt-2 text-blue-600">
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl sm:text-2xl font-extrabold mt-4 text-blue-600">
              Hussain Watkins
            </h1>
          )}
          <p className="font-semibold text-black text-sm sm:text-lg">
            {position ?? "Chief Technology Officer"}
          </p>
          <p className=" text-gray-500 text-xs sm:text-sm">{email}</p>
          <p className=" text-gray-500 text-xs sm:text-sm"> {number}</p>
        </div>

        <div className="flex justify-start px-4 mt-3 sm:mt-5">
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

        <div className="flex items-center gap-4 mt-4 px-4">
          {number && (
            <Link
              href={`tel:${number}`}
              className="flex-1 bg-blue-500 rounded-md flex justify-center text-center py-3"
            >
              <span className="text-white font-medium">Email Me!</span>
            </Link>
          )}
          {(userProfile.company ||
            userProfile.position ||
            userProfile.email) && (
            <button
              onClick={() => downloadVCard(userProfile as any)}
              className="w-[104px] bg-gray-100 rounded-md text-center py-3"
            >
              <span className="text-blue-500 font-semibold">Save</span>
            </button>
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

        <div className=" flex flex-col gap-y-6 pt-6 bg-white px-3 flex-grow  text-neutral-900 mt-4">
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
      
      {viewerState.isOpen && (
        <ImageViewer
          images={viewerState.images}
          initialIndex={viewerState.initialIndex}
          onClose={closeViewer}
        />
      )}
    </Template7Container>
  );
};

export default Template7;
