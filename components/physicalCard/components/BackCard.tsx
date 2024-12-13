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
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl text-white font-bold">
              {data.firstName || "First Name"} {data.lastName || "Last Name"}
            </h2>
            <p className="text-gray-300 font-medium">
              {data.position || "Position"}
            </p>
          </div>
          {data.profilePictureUrl ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500">
              <Image
                src={data.profilePictureUrl}
                alt="profile"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-yellow-500 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-medium">No Image</span>
            </div>
          )}
        </div>
        <div className="mt-6">
          <p className="text-gray-300 font-medium">
            {data.company || "Company"}
          </p>
          <p className="text-gray-300 font-medium">
            {data.websiteUrl || "Website"}
          </p>
          <p className="text-gray-300 font-medium">
            {data.number || "Phone Number"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BackCard;
