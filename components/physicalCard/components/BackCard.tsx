import { Card } from "@/types/types";
import Image from "next/image";
import { StaticImageData } from "next/image";
import tapUpLogoWhite from "@/public/assets/tap-up-logo-white.png";
import extension from "@/public/assets/extension-logo.png";
import searchSite from "@/public/assets/search-site-logo.png";
import phone from "@/public/assets/phone-logo.png";
// Back Card Component (Personal Details)
const BackCard = ({
  data,
  backgroundImage,
}: {
  data: Partial<Card>;
  backgroundImage?: string | StaticImageData;
}) => {
  console.log("BackCard", data);

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
      <div className="relative z-10 p-6 flex flex-col h-full justify-between">
        {/* Tap up title */}
        <div className="flex justify-end">
          <Image
            src={tapUpLogoWhite}
            alt="Tap up"
            width={105}
            height={40}
            className=" aspect-[105/40] object-contain object-center"
          />
        </div>
        {/* Personal Details */}
        <div className="flex justify-between items-start ">
          {/* Name and Position */}
          <div>
            <div className="">
              <h2 className="text-2xl text-white font-bold">
                {data.firstName || "First "} {data.lastName || "Last "}
              </h2>
              <p className="text-sm text-gray-300 font-medium">
                {data.position || "Position"}
              </p>
            </div>
            {/* other Details */}
            <div className="mt-6 flex flex-col gap-3">
              <p className="text-gray-300 text-xs font-medium flex gap-2">
                <Image
                  src={extension}
                  alt="username"
                  width={12}
                  height={12}
                  className=" aspect-[12/12] object-contain object-center"
                />
                {data.company || "username"}
              </p>
              <p className="text-gray-300 text-xs font-medium flex gap-2">
                <Image
                  src={searchSite}
                  alt="website"
                  width={12}
                  height={12}
                  className=" aspect-[12/12] object-contain object-center"
                />
                {data.websiteUrl || "Website"}
              </p>
              <p className="text-gray-300 text-xs font-medium flex gap-2">
                <Image
                  src={phone}
                  alt="phone"
                  width={12}
                  height={12}
                  className=" aspect-[12/12] object-contain object-center"
                />
                {data.number || "Phone Number"}
              </p>
            </div>
          </div>
          {/* Profile */}
          <div className=" flex flex-col justify-center h-full">
            {data.profilePictureUrl ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden ">
                <Image
                  src={data.profilePictureUrl}
                  alt="Profile"
                  width={127}
                  height={124}
                  className=" aspect-[127/124] rounded-full object-contain object-center"
                />
              </div>
            ) : (
              <div className="relative aspect-[127/124] w-[127px] h-[124px] rounded-full overflow-hidden  bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-medium">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackCard;
