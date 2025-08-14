import { cn, downloadVCard, getCopyrightYear } from "@/lib/utils";
import { Card } from "@/types/types";
import { Advent_Pro, Akatab } from "next/font/google";
import Image from "next/image";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSkype,
  FaViber,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import {
  MdOutlineBookmarkBorder,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from "react-icons/md";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
    <div className="min-h-screen bg-[#34463b] flex flex-col ">
      <div className=" h-[350px] relative   ">
        {/* <div className="absolute flex gap-x-2 m-4 top-0 right-0">
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
        </div> */}

        <div className="relative">
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#D3F1DF] text-xs hover:bg-[#466b55] transition-colors duration-300 border-none rounded-full h-7 text-black shadow-md"
                    >
                      <a className="flex items-center" href={`tel:${number}`}>
                        <MdOutlinePhone />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs">
                      {number ?? "H.Watkins@gmail.com"}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* <Separator className="mx-8 h-6" orientation="vertical" /> */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#D3F1DF] text-xs hover:bg-[#466b55] transition-colors duration-300 border-none rounded-full h-7 text-black   shadow-md"
                    >
                      <a href={`mailto:${email}`}>
                        <MdOutlineMailOutline className="cursor-pointer" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs">
                      {email ?? "H.Watkins@gmail.com"}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => downloadVCard(userProfile)}
                      className="bg-[#D3F1DF] text-xs hover:bg-[#466b55] transition-colors duration-300 border-none rounded-full h-7 text-black   shadow-md"
                    >
                      <MdOutlineBookmarkBorder className="cursor-pointer" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs">Download VCF</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
          <div className=" flex  items-center w-full gap-3 py-4 text-2xl bg-gradient-to-t from-[#D3F1DF]  to-[#f4fcf7] text-neutral-700 h-16 justify-center">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <FaFacebook size={20} />
              </a>
            )}
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <FaXTwitter size={20} />
              </a>
            )}
            {youtubeUrl && (
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                <FaYoutube size={20} />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <FaInstagram size={20} />
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={20} />
              </a>
            )}
            {viberUrl && (
              <a href={viberUrl} target="_blank" rel="noopener noreferrer">
                <FaViber size={20} />
              </a>
            )}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={20} />
              </a>
            )}
            {skypeInviteUrl && (
              <a
                href={`skype:${skypeInviteUrl}?chat`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSkype size={20} />
              </a>
            )}
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                <FaGlobe size={20} />
              </a>
            )}
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
            <div className="flex flex-col items-center mb-1 gap-1 text-center text-xs">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template12;
