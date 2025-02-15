import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QrCodeScanner from "./qrcode-scanner";

const QrCodeModal = ({ icon }: { icon: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="rounded-lg border border-gray-300 p-2 place-content-center">
          {icon}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-base md:text-xl">Card Retrieval QR Code Scanner</DialogTitle>
        </DialogHeader>
        <QrCodeScanner />
      </DialogContent>
    </Dialog>
  );
};

export default QrCodeModal;
