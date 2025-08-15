import { cn, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import { Advent_Pro, Akatab } from "next/font/google";
import Image from "next/image";
import { Separator } from "../ui/separator";

// Components
import {
  CTAButtons,
  SocialLinks,
  TemplateContainer,
  TemplateFooter,
} from "./templatesComponents";

const poppins = Advent_Pro({
  weight: "400",
  subsets: ["latin"],
});

const michroma = Akatab({
  weight: ["700", "600"],
  subsets: ["latin"],
});

const Template12 = ({
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
  viberUrl,
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

  console.log(websiteUrl);

  return (
    <TemplateContainer
      backgroundColor="bg-[#34463b]"
      padding="none"
      maxWidth="none"
      flex
      flexDirection="col"
    >
      <div className="relative min-h-[350px]">
        {/* Cover Photo Background */}
        <div className="absolute inset-0">
          {coverPhotoUrl ? (
            <Image
              src={coverPhotoUrl}
              alt="Cover Photo"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={100} // keeps it sharp
            />
          ) : (
            <div className="w-full h-full bg-gray-400" />
          )}
          {/* Optional overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Profile Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-6">
          {/* Top: Name & Position */}
          <div className="flex flex-col gap-2 items-center">
            {/* Name */}
            <h1
              className={cn(
                "mt-3 text-2xl text-white capitalize",
                michroma.className
              )}
            >
              {firstName ? `${firstName} ${lastName}` : "Hussain Watkins"}
            </h1>

            {/* Position */}
            <div className="flex items-center text-sm text-white mt-1">
              <span>{company ?? "COMPANY"}</span>
              <Separator orientation="vertical" className="h-4 bg-white mx-2" />
              <span>{position ?? "Chief Technology Officer"}</span>
            </div>
            {/* Profile Picture */}
            <div className="rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={profilePictureUrl ?? "/assets/template10samplepic.png"}
                alt="Profile Image"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* Bottom: CTA Buttons */}
          <div className="mt-4">
            <CTAButtons
              number={number}
              email={email}
              userProfile={userProfile}
              variant="floating"
              size="sm"
              buttonClassName="bg-[#D3F1DF] text-xs hover:bg-[#466b55] transition-colors duration-300 border-none rounded-full h-7 text-black shadow-md"
              layout="horizontal"
            />
          </div>
        </div>
      </div>

      {/* Company Section */}
      <div className="text-center flex flex-col w-full space-y-1 bg-[#D3F1DF] bg-gradient-to-t from-[#85A98F] to-[#D3F1DF] rounded-t-3xl">
        {/* Social Links */}
        <div className="flex items-center w-full gap-3 py-4 text-2xl bg-gradient-to-t from-[#D3F1DF] to-[#f4fcf7] text-neutral-700 h-16 justify-center">
          <SocialLinks
            facebookUrl={facebookUrl}
            instagramUrl={instagramUrl}
            linkedinUrl={linkedinUrl}
            twitterUrl={twitterUrl}
            youtubeUrl={youtubeUrl}
            whatsappNumber={whatsappNumber}
            skypeInviteUrl={skypeInviteUrl}
            viberUrl={viberUrl}
            websiteUrl={websiteUrl}
            size="md"
            iconClassName="text-neutral-700"
          />
        </div>

        {/* Company Overview */}
        <div className="flex flex-col gap-y-6 pt-4 px-5 flex-grow border-t border-t-neutral-300 text-[#5A6C57]">
          {companyBackground && (
            <div>
              <h1
                className={cn(
                  "font-normal text-xl tracking-wider text-start",
                  poppins.className
                )}
              >
                Company Overview
              </h1>
              <p className="font-light text-sm text-start text-black pt-2">
                {companyBackground}
              </p>
            </div>
          )}

          {(serviceDescription ||
            (servicePhotos && servicePhotos.length > 0)) && (
            <div>
              <h1
                className={cn(
                  "font-normal text-xl tracking-wider text-start",
                  poppins.className
                )}
              >
                Our Services
              </h1>
              {serviceDescription && (
                <p className="font-light text-sm text-start text-black pt-2">
                  {serviceDescription}
                </p>
              )}
            </div>
          )}

          {servicePhotos && servicePhotos.length > 0 && (
            <div className="flex gap-4 mt-6 overflow-x-auto scrollbar-hide pb-4">
              {servicePhotos.map((photo, index) => (
                <div key={index} className="shrink-0">
                  <Image
                    src={photo}
                    alt={`Service Photo ${index + 1}`}
                    width={150}
                    height={150}
                    className="rounded-2xl object-contain"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Company Name */}
          <div className="flex flex-col items-center justify-center gap-x-2 text-sm text-neutral-600 pb-4">
            <h2
              className={cn(
                "font-normal text-2xl tracking-wider text-start",
                poppins.className
              )}
            >
              {company ?? "COMPANY"}
            </h2>
          </div>

          {/* Footer */}
          <TemplateFooter className="flex flex-col items-center mb-1 gap-1 text-center text-xs">
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
            <span className="tracking-wide text-gray-800 text-[10px]">
              © {getCopyrightYear()} Zwiftech. All Rights Reserved.
            </span>
          </TemplateFooter>
        </div>
      </div>
    </TemplateContainer>
  );
};

export default Template12;
