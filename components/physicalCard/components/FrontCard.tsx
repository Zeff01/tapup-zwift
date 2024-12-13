import Image from "next/image";
import { StaticImageData } from "next/image";
import zwiftLogo from "@/public/assets/zwift-logo.png";
import tapUpLogoWhite from "@/public/assets/tap-up-logo-white.png";
import letterTWhite from "@/public/assets/letter-t-white.png";
import nfcWhite from "@/public/assets/nfc-symbol-white.png";
// Front Card Component (NFC/Tap Card)
const FrontCard = ({
  backgroundImage,
}: {
  backgroundImage?: string | StaticImageData;
}) => (
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
    <div className="relative z-10 p-6 flex flex-col justify-between h-full">
      <div className="flex justify-end text-white">
        <Image
          src={nfcWhite}
          alt="NFC/Tap Card"
          width={66}
          height={25}
          className=" aspect-[66/25] object-contain object-center"
        />
      </div>
      <div className="text-center">
        <div className="text-white text-2xl font-bold flex flex-col items-center">
          <Image
            src={tapUpLogoWhite}
            alt="Tap up"
            width={66}
            height={25}
            className=" aspect-[66/25] object-contain object-center"
          />
          <Image
            src={letterTWhite}
            alt="T logo"
            width={35}
            height={37}
            className=" aspect-[35/37] object-contain object-center"
          />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-white text-sm font-medium">
          Powered By
          <Image
            src={zwiftLogo}
            alt="Zwift Logo"
            width={67}
            height={19}
            className="w-full aspect-[67/19] object-contain object-center"
          />
        </div>
        <div className="w-16 h-16 bg-white rounded-lg border-2 border-orange-500 flex items-center justify-center">
          {/* QR Code placeholder */}
          <Image
            src="/qr-code-placeholder.svg"
            alt="QR Code"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  </div>
);

export default FrontCard;
