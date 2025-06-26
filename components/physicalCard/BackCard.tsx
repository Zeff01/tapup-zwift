import letterTBlack from "@/public/assets/letter-t-black.png";
import letterTWhite from "@/public/assets/letter-t-white.png";
import nfcBlack from "@/public/assets/nfc-symbol-black.png";
import nfcWhite from "@/public/assets/nfc-symbol-white.png";
import qrBlack from "@/public/assets/qr-black.png";
import qrWhite from "@/public/assets/qr-white.png";
import tapUpLogoBlack from "@/public/assets/tap-up-logo-black.png";
import tapUpLogoWhite from "@/public/assets/tap-up-logo-white.png";
import Image, { StaticImageData } from "next/image";
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
    </div>
  );
};

export default FrontCard;
