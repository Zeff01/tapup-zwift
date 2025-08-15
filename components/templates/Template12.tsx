import { cn, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import { Advent_Pro, Akatab } from "next/font/google";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";

// Components
import {
  TemplateContainer,
  CTAButtons,
  SocialLinks,
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
      flex={true}
      flexDirection="col"
    >
      <div className="min-h-[350px] relative">
        {/* Cover Photo */}
        {coverPhotoUrl && (
          <div className="w-full h-48 overflow-hidden">
            <Image
              src={coverPhotoUrl}
              alt="Cover Photo"
              width={480}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={cn("relative", coverPhotoUrl ? "" : "pt-8")}>
          <div className="absolute w-full  flex flex-col items-center justify-center z-20 top-0 left-1/2 transform -translate-x-1/2  ">
            <div className="flex flex-col w-full items-center justify-center pt-2 ">
              {firstName ? (
                <h1
                  className={cn(
                    "text-xl   text-[#D3F1DF] capitalize",

                    michroma.className
                  )}
                >
                  {firstName + " " + lastName}
                </h1>
              ) : (
                <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
              )}
              <div className="flex">
                <h2
                  className={cn(
                    "text-xs font-semibold   text-[#D3F1DF] capitalize",

                    michroma.className
                  )}
                >
                  {company ?? "COMPANY"}
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
            <div className="flex items-end justify-center w-full gap-2">
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
          {coverPhotoUrl ? (
            <Image
              src={coverPhotoUrl}
              alt="Cover Image"
              width={400}
              height={200}
              className="mx-auto w-full object-cover  overflow-hidden"
            />
          ) : (
            <Image
              src={"/assets/template9coverphoto.png"}
              alt="Cover Image"
              width={400}
              height={200}
              className="mx-auto"
            />
          )}
        </div>

        <div className="text-center flex flex-col absolute top-[205px] w-full space-y-1 bg-[#D3F1DF] bg-gradient-to-t from-[#85A98F] overflow-hidden to-[#D3F1DF] rounded-t-3xl">
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
          <div className=" flex flex-col gap-y-6 pt-4  px-5 flex-grow border-t border-t-neutral-300 text-[#5A6C57]">
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
            {(serviceDescription || (servicePhotos && servicePhotos.length > 0)) && (
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

            <div className="flex flex-col items-center  justify-center gap-x-2 text-sm text-neutral-600 pb-4">
              <h2
                className={cn(
                  "font-normal text-2xl tracking-wider text-start",

                  poppins.className
                )}
              >
                {company ?? "COMPANY"}
              </h2>
            </div>

            {/* footer */}
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

              <span className="tracking-wide text-gray-800 text-[10px] ">
                © {getCopyrightYear()} Zwiftech. All Rights Reserved.
              </span>
            </TemplateFooter>
          </div>
        </div>
      </div>
    </TemplateContainer>
  );
};

export default Template12;
