import Image from "next/image";
import { StaticImageData } from "next/image";
import zwiftLogo from "@/public/assets/zwift-logo.png";
import tapUpLogoWhite from "@/public/assets/tap-up-logo-white.png";
import tapUpLogoBlack from "@/public/assets/tap-up-logo-black.png";
import letterTWhite from "@/public/assets/letter-t-white.png";
import letterTBlack from "@/public/assets/letter-t-black.png";
import nfcWhite from "@/public/assets/nfc-symbol-white.png";
import nfcBlack from "@/public/assets/nfc-symbol-black.png";
import qrWhite from "@/public/assets/qr-white.png";
import qrBlack from "@/public/assets/qr-black.png";
// Front Card Component (NFC/Tap Card)
const FrontCard = ({
  backgroundImage,
  color,
}: {
  backgroundImage?: string | StaticImageData;
  color: "white" | "black";
}) => {
  // Determine which logos to use based on the color parameter
  const tapUpLogo = color === "white" ? tapUpLogoWhite : tapUpLogoBlack;
  const letterT = color === "white" ? letterTWhite : letterTBlack;
  const nfcLogo = color === "white" ? nfcWhite : nfcBlack;

  // Determine text color based on the color parameter
  const textColor = color === "white" ? "text-white" : "text-black";
  const qr = color === "white" ? qrWhite : qrBlack;

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
      <div
        className={`relative z-10 p-6 flex flex-col justify-between h-full ${textColor}`}
      >
        <div className={`flex justify-end ${textColor}`}>
          <Image
            src={nfcLogo}
            alt="NFC/Tap Card"
            width={66}
            height={25}
            className="aspect-[66/25] object-contain object-center"
          />
        </div>
        <div className="text-center">
          <div
            className={`text-2xl font-bold flex flex-col items-center ${textColor}`}
          >
            <Image
              src={tapUpLogo}
              alt="Tap up"
              width={66}
              height={25}
              className="aspect-[66/25] object-contain object-center"
            />
            <Image
              src={letterT}
              alt="T logo"
              width={35}
              height={37}
              className="aspect-[35/37] object-contain object-center"
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className={`text-sm font-medium ${textColor}`}>
            Powered By
            <Image
              src={zwiftLogo}
              alt="Zwift Logo"
              width={67}
              height={19}
              className="w-full aspect-[67/19] object-contain object-center"
            />
          </div>
          <div className="w-16 h-16 rounded-lg bg-transparent flex items-center justify-center">
            {/* QR Code placeholder */}
            <Image
              src={qr}
              alt="QR Code"
              height={60}
              width={60}
              className="aspect-[60/60] object-contain object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontCard;
