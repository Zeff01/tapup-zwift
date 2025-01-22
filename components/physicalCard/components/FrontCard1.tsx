import { Card } from "@/types/types";
import Image from "next/image";
import { StaticImageData } from "next/image";
import tapUpLogoWhite from "@/public/assets/tap-up-logo-white.png";
import tapUpLogoBlack from "@/public/assets/tap-up-logo-black.png";
import extension from "@/public/assets/extension-logo.png";
import searchSite from "@/public/assets/search-site-logo.png";
import phone from "@/public/assets/phone-logo.png";

const BackCard = ({
  data,
  backgroundImage,
  tapColor,
  upColor,
  nameColor,
  positionColor,
  detailsColor,
}: {
  data: Partial<Card>;
  backgroundImage?: string | StaticImageData;
  tapColor?: string;
  upColor?: string;
  nameColor?: string;
  positionColor?: string;
  iconColor?: string;
  detailsColor?: string;
}) => {
  const {
    firstName,
    lastName,
    email,
    number,
    company,
    position,
    websiteUrl,
    profilePictureUrl,
  } = data;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Card Background"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full justify-between">
        {/* TAP UP title */}
        <div className="flex justify-end aspect-21/8">
          <h1 className="text-4xl leading-10 font-righteous ">
            <span className={tapColor}>Tap</span>{" "}
            <span className={upColor}>Up</span>
          </h1>
        </div>
        {/* Personal Details */}
        <div className="flex justify-between items-start ">
          {/* Name and Position */}
          <div>
            <div>
              <h2 className={`text-md sm:text-2xl font-bold ${nameColor}`}>
                {firstName || "First "} {lastName || "Last "}
              </h2>
              <p className={`text-sm ${positionColor} font-medium`}>
                {position || "Position"}
              </p>
            </div>
            {/* Other Details */}
            <div className="mt-6 flex flex-col gap-1 sm:gap-3">
              <p className={`flex gap-2 ${detailsColor} text-xs font-medium`}>
                <Image
                  src={extension}
                  alt="username"
                  width={12}
                  height={12}
                  className="aspect-[12/12] object-contain object-center"
                />
                {company || "username"}
              </p>
              <p className={`flex gap-2 ${detailsColor} text-xs font-medium`}>
                <Image
                  src={searchSite}
                  alt="website"
                  width={12}
                  height={12}
                  className="aspect-[12/12] object-contain object-center"
                />
                {websiteUrl || "Website"}
              </p>
              <p className={`flex gap-2 ${detailsColor} text-xs font-medium`}>
                <Image
                  src={phone}
                  alt="phone"
                  width={12}
                  height={12}
                  className="aspect-[12/12] object-contain object-center"
                />
                {number || "Phone Number"}
              </p>
            </div>
          </div>
          {/* Profile */}
          <div className="flex flex-col justify-center h-full">
            {profilePictureUrl ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={profilePictureUrl}
                  alt="Profile"
                  width={127}
                  height={124}
                  className="aspect-[27/24] sm:aspect-[127/124] rounded-full object-contain object-center"
                />
              </div>
            ) : (
              <div className="relative aspect-[127/124] w-[127px] h-[124px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <span className={`${position} font-medium`}>No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackCard;
