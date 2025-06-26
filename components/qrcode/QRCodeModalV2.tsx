import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { downloadVCard } from "@/lib/utils";
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
    let vCardString = "BEGIN:VCARD\n";
    vCardString += "VERSION:3.0\n";
    vCardString += `FN:${userProfile.firstName} ${userProfile.lastName}\n`;
    vCardString += `N:${userProfile.lastName};${userProfile.firstName};;;\n`;
    vCardString += `ORG:${userProfile.company}\n`;
    vCardString += `TITLE:${userProfile.position}\n`;
    vCardString += `TEL;TYPE=CELL:${userProfile.number}\n`;
    vCardString += `EMAIL;TYPE=INTERNET:${userProfile.email}\n`;

    const url = userProfile.customUrl || userProfile.websiteUrl;
    if (url) {
      vCardString += `URL:${url}\n`;
    }

    vCardString += "END:VCARD";

    return vCardString;
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
          className="w-full bg-blue-700 text-white hover:bg-blue-500 cursor-pointer "
          onClick={() => downloadVCard(userProfile)}
        >
          Download VCF
        </Button>
      </DialogContent>
    </Dialog>
  );
}
