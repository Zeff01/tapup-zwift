import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getVCardData } from "@/lib/utils";
import { Card } from "@/types/types";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "../ui/button";
import html2canvas from "html2canvas";

export default function QRCodeModalV2({
  userProfile,
  open,
  onClose,
}: {
  userProfile?: Partial<Card>;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !userProfile) return null;

  const vCardData = getVCardData(userProfile, true);

  const handleDownloadQRCode = async () => {
    const qrSection = document.getElementById("qr-download-content");
    if (!qrSection) return;

    const canvas = await html2canvas(qrSection, {
      scale: 3,
    });

    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${userProfile.firstName}_${userProfile.lastName}_qr_code.png`;
    downloadLink.click();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="text-center mt-4 text-lg font-bold"></DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogContent className="flex flex-col items-center gap-4 p-6">
        <div
          id="qr-download-content"
          className="p-4 text-center font-semibold bg-background"
        >
          <h2 className="font-semibold text-xl">
            {userProfile.firstName} {userProfile.lastName}
          </h2>
          <h3 className="dark:text-slate-400 text-gray-500 text-lg">
            {userProfile.company}
          </h3>
          <h4 className="font-normal dark:text-slate-400 text-gray-500 text-lg">
            {userProfile.position}
          </h4>

          <div className="p-3 border dark:border-slate-800 inline-block border-gray-300 rounded-md mt-4">
            <QRCodeCanvas
              value={vCardData}
              size={200}
              level="H"
              includeMargin
              id="qrCodeCanvas"
            />
          </div>
        </div>

        <Button
          variant="green"
          onClick={handleDownloadQRCode}
          className="text-white"
        >
          Download QR Code
        </Button>
      </DialogContent>
    </Dialog>
  );
}
