import { Card } from "@/types/types";
import Image from "next/image";

const PhysicalCard1 = (data: Partial<Card>) => {
  return (
    <div className="relative aspect-[1.586/1] [perspective:1000px] group">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front of card */}
        <div className="absolute inset-0 rounded-lg [backface-visibility:hidden] bg-gradient-to-br from-foreground/90 via-green-900 to-foreground/90">
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
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
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

        {/* Back of card */}
        <div className="absolute inset-0 rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-foreground/90 via-green-900 to-foreground/90">
          <div className="p-6 flex flex-col justify-between h-full">
            <div className="text-right text-white">NFC</div>
            <div className="text-center">
              <div className="text-white text-2xl">Tap Up</div>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-white text-sm">Powered By</div>
              <div className="w-16 h-16 bg-white rounded-lg">
                {/* QR Code placeholder */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalCard1;
