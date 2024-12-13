import { Card } from "@/types/types";
import Image from "next/image";

// Back Card Component (Personal Details)
const BackCard = ({ data }: { data: Partial<Card> }) => (
  <div>
    <div className="p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl text-white">
            {data.firstName} {data.lastName}
          </h2>
          <p className="text-gray-300">{data.position}</p>
          <div className="mt-4">
            <p className="text-gray-300">{data.company}</p>
            <p className="text-gray-300">{data.websiteUrl}</p>
            <p className="text-gray-300">{data.number}</p>
          </div>
        </div>
        {data.profilePictureUrl && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-yellow-500">
            <Image
              src={data.profilePictureUrl}
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default BackCard;
