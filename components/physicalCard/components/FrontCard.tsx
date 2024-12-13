import Image from "next/image";
import { StaticImageData } from "next/image";

// Front Card Component (NFC/Tap Card)
const FrontCard = ({
  backgroundImage,
}: {
  backgroundImage?: string | StaticImageData;
}) => (
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
      <div className="text-right text-white">NFC</div>
      <div className="text-center">
        <div className="text-white text-2xl">Tap Up</div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-white text-sm">Powered By</div>
        <div className="w-16 h-16 bg-white rounded-lg border-2 border-orange-500">
          {/* QR Code placeholder */}
        </div>
      </div>
    </div>
  </div>
);

export default FrontCard;
