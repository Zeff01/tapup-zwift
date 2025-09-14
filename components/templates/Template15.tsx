"use client";

import { getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import Image from "next/image";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import {
  SocialLinks,
  Template15CTA,
  TemplateContainer,
  TemplateFooter,
  ClickableImage,
} from "./templatesComponents";
import { ImageViewer, useImageViewer } from "@/components/ImageViewer";

const Template15 = ({
  id,
  firstName,
  lastName,
  middleName,
  suffix,
  prefix,
  position,
  coverPhotoUrl,
  profilePictureUrl,
  email,
  number,
  company,
  companyBackground,
  serviceDescription,
  servicePhotos,
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  youtubeUrl,
  twitterUrl,
  whatsappNumber,
  websiteUrl,
  viberUrl,
  tiktokUrl,
  customUrl,
  companies,
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
      backgroundColor="bg-[#011923]"
      padding="xs"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      alignItems="center"
      className="py-2 relative overflow-hidden"
    >
      <div className="flex-grow">
      <div className="max-w-[480px] mx-auto flex flex-col w-full">
        {/* === Profile and Cover Section === */}
        <section
          aria-label="Profile Section"
          className="w-full max-w-md mb-8 relative flex flex-col items-center px-2 sm:px-6"
        >
          {/* Orange circle - right side of 'Let's Work Together' */}
          <div
            className="hidden md:block absolute z-0"
            style={{ top: 190, right: -60 }}
          >
            <div className="w-32 h-32 rounded-full bg-[#9A3A1975] opacity-80 blur-2xl" />
          </div>
          {coverPhotoUrl ? (
            <ClickableImage
              src={coverPhotoUrl}
              alt="Cover"
              width={480}
              height={144}
              className="object-cover w-full h-32 md:h-36 rounded-t-2xl shadow-lg"
              onClick={() => imageViewer.openViewer(profilePictureUrl ? 1 : 0)}
            />
          ) : (
            <Image
              src="/assets/template2coverphoto.png"
              alt="Cover"
              width={480}
              height={144}
              className="object-cover w-full h-32 md:h-36 rounded-t-2xl shadow-lg"
            />
          )}
          {/* Fade effect at the bottom of the cover */}
          <div
            className="absolute left-0 bottom-0 w-full h-10 rounded-t-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(1,25,35,0) 0%, #011923 100%)",
            }}
          />
          {/* Profile Image - centered and overlapping */}
          <div className="absolute left-1/2 -bottom-14 transform -translate-x-1/2 z-20">
            <div className="w-28 h-28 rounded-full border-4 border-[#7dd3fc] overflow-hidden bg-[#222]">
              {profilePictureUrl ? (
                <ClickableImage
                  src={profilePictureUrl}
                  alt="Profile"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                  onClick={() => imageViewer.openViewer(0)}
                />
              ) : (
                <Image
                  src="/assets/template4samplepic.png"
                  alt="Profile"
                  width={112}
                  height={112}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>
        </section>

        {/* === Card Section === */}
        <section
          aria-label="Card Section"
          className="w-full max-w-md mt-8 relative flex flex-col items-center "
        >
          {/* Blue circle - left side of Contacts */}
          <div
            className="hidden md:block absolute z-0"
            style={{ top: 240, left: -60 }}
          >
            <div className="w-28 h-28 rounded-full bg-blue-400 opacity-40 blur-2xl" />
          </div>

          {/* Light Blue circle - right side of Contacts */}
          <div
            className="hidden md:block absolute z-0"
            style={{ bottom: 0, left: "60%" }}
          >
            <div className="w-24 h-24 rounded-full bg-indigo-500 opacity-40 blur-2xl" />
          </div>

          <div className="w-full flex flex-col items-center px-2 sm:px-6">
            {firstName || lastName ? (
              <h1 className="text-xl font-bold text-white text-center">
                {prefix && `${prefix}. `}
                {firstName}
                {middleName && ` ${middleName}`}
                {lastName && ` ${lastName}`}
                {suffix && `, ${suffix}`}
              </h1>
            ) : (
              <h1 className="text-xl font-bold text-white text-center">
                {" "}
                Hussain Watkins
              </h1>
            )}

            <p className="text-sm text-gray-300 font-medium mt-1 mb-5 text-center">
              {position || "Chief Technology Officer"}{" "}
              {`@ ${company || "Zwiftech"}`}
            </p>

            <div className="flex gap-2 mb-5">
              <Template15CTA
                number={number}
                email={email}
                userProfile={userProfile}
                size="md"
                icons="lucide"
              />
            </div>

            {/* Social Icons */}
            <div className=" mb-6 ">
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
                size="md"
                iconClassName="rounded-full p-2 bg-[#1a425b] text-[#7eabc2] hover:bg-[#245573] size-full "
                iconSet="outline"
              />
            </div>
          </div>

          {/* === Contact Info Section === */}
          {(email || number) && (
            <section
              aria-label="Contact Information"
              className="w-full mb-6 relative px-2 sm:px-6"
            >
              <h2 className="text-base font-bold text-white mb-3">
                Contact Information
              </h2>
              <div className="flex flex-col gap-2 text-gray-300 text-sm">
                {email && (
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${email}`}>
                      {" "}
                      <MdOutlineMailOutline className="text-[#7dd3fc]" />{" "}
                    </a>{" "}
                    <span>{email}</span>
                  </div>
                )}
                {number && (
                  <div className="flex items-center gap-2">
                    <a href={`tel:${number}`}>
                      <MdOutlinePhone className="text-[#7dd3fc]" />{" "}
                    </a>{" "}
                    <span>{number}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* === Companies Section === */}
          {companies.length > 0 && (
            <div className="w-full px-3 mb-6">
              <h2 className="text-base font-bold text-white mb-4 text-center">
                Professional Portfolio
              </h2>
              <p className="text-sm text-gray-300 text-center mb-6">
                Below you'll find details about my professional experience and
                the companies I've worked with.
              </p>

              <div className="space-y-6">
                {companies.map((company, idx) => (
                  <div key={idx} className="relative group">
                    {/* Modern Company Card - Horizontal Layout */}
                    <div className="bg-[#0f1f2a] rounded-2xl border border-[#38bdf8]/30 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      {/* Header with Background Pattern */}
                      <div className="relative p-6 bg-gradient-to-br from-[#122b3a] via-[#1a425b] to-[#122b3a]">
                        {/* Decorative Background Elements */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-4 right-4 w-16 h-16 border border-[#7dd3fc] rounded-full"></div>
                          <div className="absolute bottom-4 left-4 w-8 h-8 border border-[#7dd3fc] rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-[#7dd3fc] rounded-full opacity-30"></div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {/* Company Info */}
                            <div>
                              <h3 className="text-lg font-bold text-white capitalize mb-1">
                                {company.company}
                              </h3>
                              <div className="flex items-center space-x-3">
                                <span className="text-[#7dd3fc] text-sm font-medium">
                                  {company.position}
                                </span>
                                <div className="w-1 h-1 bg-[#7dd3fc] rounded-full"></div>
                                <span className="text-gray-400 text-xs">
                                  Professional
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="p-4">
                        <div className="grid gap-4">
                          {/* Company Background */}
                          {company.companyBackground && (
                            <div className="bg-gradient-to-r from-[#122b3a]/50 to-[#1a425b]/50 rounded-xl p-4 border border-[#38bdf8]/20">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-white text-sm flex items-center">
                                  <svg
                                    className="w-4 h-4 text-[#7dd3fc] mr-2"
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
                                  Company Overview
                                </h4>
                                <div className="w-6 h-6 bg-[#38bdf8]/20 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-[#7dd3fc] rounded-full"></div>
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {company.companyBackground}
                              </p>
                            </div>
                          )}

                          {/* Service Description */}
                          {company.serviceDescription && (
                            <div className="bg-gradient-to-r from-[#122b3a]/50 to-[#1a425b]/50 rounded-xl p-4 border border-[#38bdf8]/20">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-white text-sm flex items-center">
                                  <svg
                                    className="w-4 h-4 text-[#7dd3fc] mr-2"
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
                                  Services & Expertise
                                </h4>
                                <div className="w-6 h-6 bg-[#38bdf8]/20 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-[#7dd3fc] rounded-full"></div>
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {company.serviceDescription}
                              </p>
                            </div>
                          )}

                          {/* Portfolio Gallery */}
                          {company.servicePhotos &&
                            company.servicePhotos.length > 0 && (
                              <div className="bg-gradient-to-r from-[#122b3a]/50 to-[#1a425b]/50 rounded-xl p-4 border border-[#38bdf8]/20">
                                <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-semibold text-white text-sm flex items-center">
                                    <svg
                                      className="w-4 h-4 text-[#7dd3fc] mr-2"
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
                                    Portfolio Gallery
                                  </h4>
                                  <div className="w-6 h-6 bg-[#38bdf8]/20 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-[#7dd3fc] rounded-full"></div>
                                  </div>
                                </div>

                                <div>
                                  {company.servicePhotos.length === 1 ? (
                                    <div className="relative group/photo">
                                      <div className="rounded-xl overflow-hidden border border-[#38bdf8]/40 shadow-lg">
                                        <ClickableImage
                                          src={company.servicePhotos[0]}
                                          alt={`${company.company} portfolio`}
                                          width={600}
                                          height={400}
                                          className="w-full h-auto object-cover transition-transform duration-500 group-hover/photo:scale-110"
                                          onClick={() => {
                                            let photoIndex = (profilePictureUrl ? 1 : 0) + (coverPhotoUrl ? 1 : 0);
                                            // Find the index of this specific photo
                                            companies.forEach((comp, compIdx) => {
                                              if (compIdx < idx && comp.servicePhotos) {
                                                photoIndex += comp.servicePhotos.length;
                                              }
                                            });
                                            imageViewer.openViewer(photoIndex);
                                          }}
                                        />
                                      </div>
                                      <div className="absolute inset-0 bg-gradient-to-t from-[#38bdf8]/50 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                      <div className="absolute bottom-3 left-3 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                        <span className="text-white text-sm font-medium bg-[#38bdf8] px-3 py-1 rounded-full shadow-lg">
                                          View Portfolio
                                        </span>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 gap-3">
                                      {company.servicePhotos.map(
                                        (photo, photoIdx) => (
                                          <div
                                            key={photoIdx}
                                            className="relative group/photo rounded-xl overflow-hidden border border-[#38bdf8]/40 shadow-lg"
                                          >
                                            <ClickableImage
                                              src={photo}
                                              alt={`${company.company} portfolio ${photoIdx + 1}`}
                                              width={300}
                                              height={200}
                                              className="w-full h-auto object-cover transition-all duration-500 group-hover/photo:scale-110"
                                              onClick={() => {
                                                let photoIndex = (profilePictureUrl ? 1 : 0) + (coverPhotoUrl ? 1 : 0);
                                                // Calculate the correct index
                                                companies.forEach((comp, compIdx) => {
                                                  if (compIdx < idx && comp.servicePhotos) {
                                                    photoIndex += comp.servicePhotos.length;
                                                  }
                                                });
                                                photoIndex += photoIdx;
                                                imageViewer.openViewer(photoIndex);
                                              }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#38bdf8]/60 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-2 left-2 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
                                              <span className="text-white text-xs font-medium bg-[#38bdf8] px-2 py-1 rounded-full shadow-lg">
                                                View {photoIdx + 1}
                                              </span>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
      </div>
      {/* === Footer Section === */}
      <TemplateFooter className="w-full max-w-md mx-auto text-center text-gray-400 text-sm relative px-2 sm:px-6">
        <div className="flex flex-col pb-4 items-center gap-1 text-center text-xs">
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

          <span className="tracking-wide text-gray-400 text-[10px]">
            © {getCopyrightYear()} Zwiftech. All Rights Reserved.
          </span>
        </div>
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

export default Template15;
