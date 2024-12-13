import { Card } from "@/types/types";
import Image from "next/image";
import { StaticImageData } from "next/image";

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
    <div className="w-full h-full rounded-lg overflow-hidden">
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
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl text-white">
              {data.firstName || "First Name"} {data.lastName || "Last Name"}
            </h2>
            <p className="text-gray-300">{data.position || "Position"}</p>
            <div className="mt-4">
              <p className="text-gray-300">{data.company || "Company"}</p>
              <p className="text-gray-300">{data.websiteUrl || "Website"}</p>
              <p className="text-gray-300">{data.number || "Phone Number"}</p>
            </div>
          </div>
          {data.profilePictureUrl ? (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-yellow-500">
              <Image
                src={data.profilePictureUrl}
                alt="profile"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-yellow-500 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BackCard;
