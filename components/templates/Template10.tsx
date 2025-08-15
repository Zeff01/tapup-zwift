import { getCopyrightYear, cn } from "@/lib/utils";
import wavy from "@/public/assets/wavy.png";
import { Card } from "@/types/types";
import Image from "next/image";

// fonts
import { Michroma, Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
});

// Components
import {
  TemplateContainer,
  CTAButtons,
  SocialLinks,
  ProfileHeader,
  TemplateFooter,
} from "./templatesComponents";

const Template10 = ({
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

  return (
    <TemplateContainer
      backgroundColor="bg-black"
      padding="md"
      maxWidth="480px"
      flex={true}
      flexDirection="col"
      alignItems="center"
      justifyContent="between"
    >
      <div className="w-full mx-auto max-w-[480px]">
        {/* COVERPHOTO AND PROFILE PIC */}
        <div className="mt-2  flex flex-col relative rounded-4xl mx-4  ">
          <div className="w-full h-48">
            {coverPhotoUrl ? (
              <Image
                src={coverPhotoUrl}
                alt="Cover Image"
                width={400}
                height={200}
                className="mx-auto w-full h-48 object-cover rounded-[2rem] overflow-hidden"
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
            <Image
              className=" absolute right-0 top-0"
              src={wavy}
              alt="wavy"
              width={100}
              height={100}
            />
            <div className="flex gap-x-2 absolute right-0 top-0 text-[#FFFBD8] bg-black pl-4 pb-2 rounded-bl-3xl">
              <CTAButtons
                number={number}
                email={email}
                userProfile={userProfile}
                variant="floating"
                size="sm"
                buttonClassName="border-[#FFFBD8] text-[#FFFBD8] hover:bg-[#FFFBD8] hover:text-black bg-transparent"
              />
            </div>
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {profilePictureUrl ? (
              <div className="border-[8px] border-black rounded-full mx-auto overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile Image"
                  width={80}
                  height={80}
                  className="rounded-full w-24 h-24"
                />
              </div>
            ) : (
              <div className="bg-black w-28 h-28 rounded-full mx-auto flex items-center justify-center">
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
        </div>

        {/* PERSONAL INFORMATION */}
        <div className="text-center mt-14 space-y-1 ">
          {firstName ? (
            <h1
              className={cn(
                "text-xl font-normal tracking-wider text-[#FFFBD8] capitalize",
                firstName ? "mt-4" : "mt-2",
                michroma.className
              )}
            >
              {firstName + " " + lastName}
            </h1>
          ) : (
            <h1 className="text-xl font-bold mt-2 ">Hussain Watkins</h1>
          )}

          <p
            className={cn(
              "text-base tracking-wider text-[#9C9EFFE5] font-bold pt-1",
              firstName ? "mt-5" : "mt-3",
              poppins.className
            )}
          >
            {position ?? "Chief Technology Officer"}
          </p>

          <div className="gap-x-2 w-full text-[#B6BCD2] flex justify-center items-center">
            <p className="  text-xs">{email ?? "H.Watkins@gmail.com"}</p>
            <span className=""> |</span>
            <a className="text-decoration-none   py-1 font-semibold text-xs rounded-full">
              {number}
            </a>
          </div>
        </div>

        {/* SOCIAL MEDIA ICONS */}
        <div className="flex items-center gap-x-4 py-10 text-2xl text-[#B6BCD2] h-16 justify-center">
          <SocialLinks
            facebookUrl={facebookUrl}
            instagramUrl={instagramUrl}
            linkedinUrl={linkedinUrl}
            twitterUrl={twitterUrl}
            youtubeUrl={youtubeUrl}
            whatsappNumber={whatsappNumber}
            skypeInviteUrl={skypeInviteUrl}
            websiteUrl={websiteUrl}
            size="lg"
            iconClassName="text-[#B6BCD2]"
            iconSet="outline"
          />
        </div>

        <hr className="border-[#B6BCD2]" />

        {/* COMPANY INFORMATION */}
        <h2
          className={cn(
            "text-xl font-normal tracking-wider text-[#FFFBD8] capitalize text-center",
            firstName ? "mt-4" : "mt-2",
            michroma.className
          )}
        >
          {company ?? "COMPANY"}
        </h2>

        <div className="mt-6">
          {companyBackground && (
            <>
              <h2
                className={cn(
                  "text-base tracking-wider text-[#9C9EFFE5] font-bold pt-1",
                  firstName ? "mt-5" : "mt-3",
                  poppins.className
                )}
              >
                Company Overview
              </h2>
              <p className="text-xs mt-1 text-[#B6BCD2]">{companyBackground}</p>
            </>
          )}

          {/* SERVICE INFORMATION */}
          {(serviceDescription ||
            (servicePhotos && servicePhotos.length > 0)) && (
            <>
              <h3
                className={cn(
                  "text-base tracking-wider text-[#9C9EFFE5] font-bold pt-1",
                  firstName ? "mt-5" : "mt-3",
                  poppins.className
                )}
              >
                Our Services
              </h3>
              {serviceDescription && (
                <p className="text-xs mt-1 text-[#B6BCD2]">
                  {serviceDescription}
                </p>
              )}
            </>
          )}
        </div>

        {servicePhotos && servicePhotos.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-6 ">
            {servicePhotos.map((photo, index) => (
              <div key={index} className="col-span-1">
                <Image
                  src={photo}
                  alt={`Service Photo ${index + 1}`}
                  width={300}
                  height={300}
                  layout="responsive"
                  className="rounded-md object-cover w-full  "
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* FOOTER */}
      <h2
        className={cn(
          "text-md font-normal tracking-wider text-[#B6BCD2] capitalize text-center pt-2",
          firstName ? "mt-4" : "mt-2",
          michroma.className
        )}
      >
        {company?.split(" ").map((word, index) => (
          <span key={index} className="block">
            {word}
          </span>
        )) ?? "Company"}
      </h2>
      <TemplateFooter className="flex flex-col items-center mt-8 gap-1 text-center text-xs">
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

        <span className="tracking-wide text-gray-400 text-[10px] ">
          © {getCopyrightYear()} Zwiftech. All Rights Reserved.
        </span>
      </TemplateFooter>
    </TemplateContainer>
  );
};

export default Template10;
