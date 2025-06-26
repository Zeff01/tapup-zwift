import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/types/types";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeModal({
  userProfile,
  open,
  onClose,
}: {
  userProfile: Partial<Card>;
  open: boolean;
  onClose: () => void;
}) {
  const getVCardData = (profile: Partial<Card>) => {
    return `BEGIN:VCARD
VERSION:3.0
N:${profile.lastName};${profile.firstName}
FN:${profile.firstName} ${profile.lastName}
EMAIL:${profile.email}
TEL:${profile.number}
COMPANY:${profile.company}
POSITION:${profile.position}
URL:${profile.customUrl ?? profile.websiteUrl}
END:VCARD`;
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qrCodeCanvas") as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="text-center mt-4 text-lg font-bold"></DialogTitle>
      <DialogContent className="flex flex-col items-center gap-4 p-6">
        <QRCodeCanvas
          value={getVCardData(userProfile)}
          size={200}
          level="H"
          includeMargin
          id="qrCodeCanvas"
        />

        <Button
          className="w-full bg-blue-600 text-white hover:bg-blue-500 cursor-pointer "
          onClick={handleDownload}
        >
          Download QR Code
        </Button>
      </DialogContent>
    </Dialog>
  );
}
