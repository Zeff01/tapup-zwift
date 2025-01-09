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
  color,
}: {
  data: Partial<Card>;
  backgroundImage?: string | StaticImageData;
  color: "white" | "black";
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

  // Determine text color based on the color parameter
  const textColor = color === "white" ? "text-white" : "text-black";
  const textGrayColor = color === "white" ? "text-gray-300" : "text-gray-700";
  const tapUpLogo = color === "white" ? tapUpLogoWhite : tapUpLogoBlack;

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
        {/* Tap up title */}
        <div className="flex justify-end">
          <Image
            src={tapUpLogo} // You may want to conditionally set this based on color
            alt="Tap up"
            width={105}
            height={40}
            className="aspect-[105/40] object-contain object-center"
          />
        </div>
        {/* Personal Details */}
        <div className="flex justify-between items-start ">
          {/* Name and Position */}
          <div>
            <div>
              <h2 className={`text-md sm:text-2xl font-bold ${textColor}`}>
                {firstName || "First "} {lastName || "Last "}
              </h2>
              <p className={`text-sm ${textGrayColor} font-medium`}>
                {position || "Position"}
              </p>
            </div>
            {/* Other Details */}
            <div className="mt-6 flex flex-col gap-1 sm:gap-3">
              <p className={`flex gap-2 ${textGrayColor} text-xs font-medium`}>
                <Image
                  src={extension}
                  alt="username"
                  width={12}
                  height={12}
                  className="aspect-[12/12] object-contain object-center"
                />
                {company || "username"}
              </p>
              <p className={`flex gap-2 ${textGrayColor} text-xs font-medium`}>
                <Image
                  src={searchSite}
                  alt="website"
                  width={12}
                  height={12}
                  className="aspect-[12/12] object-contain object-center"
                />
                {websiteUrl || "Website"}
              </p>
              <p className={`flex gap-2 ${textGrayColor} text-xs font-medium`}>
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
                <span className={`${textGrayColor} font-medium`}>No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackCard;
