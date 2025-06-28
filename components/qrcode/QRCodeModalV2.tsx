import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { downloadVCard, getVCardData } from "@/lib/utils";
import { Card } from "@/types/types";
import { QRCodeCanvas } from "qrcode.react";

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

  const vCardData = getVCardData(userProfile);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="text-center mt-4 text-lg font-bold"></DialogTitle>
      <DialogDescription></DialogDescription>
      <DialogContent className="flex flex-col items-center gap-4 p-6">
        <QRCodeCanvas
          value={vCardData}
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
