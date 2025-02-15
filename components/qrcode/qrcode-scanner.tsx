'use client'

import React, { useRef, useEffect, useState } from "react";
import QrScanner from "qr-scanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { catchErrorTyped, isValidQRCode } from "@/lib/utils";
import { getCardById } from "@/lib/firebase/actions/card.action";
import { SlCreditCard } from "react-icons/sl";
import { Card } from "@/types/types";
import Canvas2Card from "@/src/app/(secured)/(user)/(boarded)/cards/[cardId]/_components/canvas";
import { Button } from "../ui/button";
import { CameraOff, CircleAlert, CircleCheck } from "lucide-react";
import Modal from "../Modal";
import { DialogClose } from "../ui/dialog";
import Image from "next/image";


const QrCodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scannedCode, setScannedCode] = useState<QrScanner.ScanResult | null>(
    null
  );
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [invalidQRCode, setInvalidQRCode] = useState<boolean>(false);
  const [card, setCard] = useState<Card | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalType, setModalType] = useState<
    "valid" | "not_found" | "disabled" | "invalid"
  >("invalid");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);


  useEffect(() => {
    const getDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });

        const devices = await navigator.mediaDevices.enumerateDevices();

        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getDevices();
  }, []);

  const updateScanRegionColor = (color: string) => {
    setTimeout(() => {
      document.querySelectorAll(".scan-region-highlight-svg").forEach((svg) => {
        (svg as SVGElement).style.stroke = color;
      });
    }, 3000); 
  };

  useEffect(() => {
    if (isScanning) {
      updateScanRegionColor("orange"); 
    }

    if (card) {
      if (card.status === "disabled") {
        updateScanRegionColor("red"); 
      } else {
        updateScanRegionColor("green"); 
      }
    }
  }, [isScanning, card]);


  const invalidQRCodeHandler = () => {
    setInvalidQRCode(true);
    setModalType("invalid");
    setModalMessage("Cannot find QR Code");
    setIsModalOpen(true);
    updateScanRegionColor("red"); // 🔴 Set scan color to red
  };

  const validQRCodeHandler = (card: any) => {
    setIsScanning(false);
    setInvalidQRCode(false);

    if (card.status === "disabled") {
      setModalType("disabled");
      setModalMessage("Card is Disabled");
    } else {
      setModalType("valid");
      setModalMessage("Card is Valid");
      updateScanRegionColor("green"); // ✅ Set scan color to green
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedDeviceId || !isScanning || !uploadedImage) return;

    const qrScanner = new QrScanner(
      video,
      async (result) => {
        if (!isValidQRCode(result.data)) {
          invalidQRCodeHandler();
          return;
        }

        const url = new URL(result.data);
        const cardId = url.pathname.split("/").pop();

        if (!cardId) {
          invalidQRCodeHandler();
          return;
        }

        const [error, data] = await catchErrorTyped(getCardById(cardId));
        if (!data || error) {
          setInvalidQRCode(true);
        setModalType("not_found");
        setModalMessage("Card Not Found");
        return console.error("Card not found");
        }

        validQRCodeHandler(data);
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScannerRef.current = qrScanner;

    const startScanner = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: selectedDeviceId } },
      });
      video.srcObject = stream;
      qrScanner.start();
      updateScanRegionColor("red"); // Default to red
    };

    startScanner();

    return () => {
      qrScanner.stop();
      qrScanner.destroy();
      if (video.srcObject) {
        (video.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        video.srcObject = null;
      }
    };
  }, [selectedDeviceId, isScanning]);

  const handleRescan = () => {
    setScannedCode(null);
    setIsScanning(true);
    setInvalidQRCode(false);
    setCard(null);
    setUploadedImage(null);
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string); // Set uploaded image
      }
    };
    reader.readAsDataURL(file);

    try {
      const result = await QrScanner.scanImage(file);

      if (!isValidQRCode(result)) {
        setInvalidQRCode(true)
        throw new Error("Invalid Image Format");
      }

      const url = new URL(result);
      const cardId = url.pathname.split("/").pop();
      if (!cardId) {
        setInvalidQRCode(true);
        return console.error("Invalid QR Code format");
      }

      const [error, data] = await catchErrorTyped(getCardById(cardId));
      if (!data || error) {
        setInvalidQRCode(true);
        setModalType("not_found");
        setModalMessage("Card Not Found");
        return console.error("Card not found");
      }

      setScannedCode({ data: result });
      setCard(data);
      setModalType(data.status === "disabled" ? "disabled" : "valid");
      setModalMessage(
        data.status === "disabled" ? "Card is Disabled" : "Card Found"
      );
    } catch (error: any) {
      console.error("QR scan error:", error);

      setInvalidQRCode(true);
      setModalMessage("Invalid Image Format");
      console.error("QR scan error:", error);
    }
    setIsModalOpen(true);
    event.target.value = "";
  };

  return (
    <div
      className="space-y-4"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <Select onValueChange={setSelectedDeviceId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={devices[0]?.label} />
        </SelectTrigger>
        <SelectContent>
          {devices.map((device) => (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${device.deviceId}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div
        className="aspect-[4/3] w-full overflow-hidden rounded-lg"
        style={{
          position: "relative",
        }}
      >

      
        {devices.length === 0 ? (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <CameraOff size={100} color="white" />
          </div>
        ) : uploadedImage ? ( 
            <div className="relative w-full h-full">
            <Image
              fill
              src={uploadedImage}
              alt="Uploaded QR Code"
              className="object-cover"
              />
              </div>
        ) : isScanning ? (
          <video
            ref={videoRef}
            className="object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Canvas2Card user={card as Card} isQrScanner />
          </div>
        )}
      </div>

      {devices.length > 0 &&
        !uploadedImage &&
        (isScanning ? (
          <p className="text-center text-muted-foreground">Scanning...</p>
        ) : invalidQRCode ? (
          <p className="text-center text-destructive">Invalid QR Code</p>
        ) : modalType === "not_found" ? (
          "Cannot find QR Code"
        ) : (
          <p className="text-center text-greenColor">QR Code is valid</p>
        ))}
      

      {/* Show message if an image is uploaded */}
      {uploadedImage &&
        (invalidQRCode && !card ? (
          <p className="text-center text-destructive">Invalid QR Code</p>
        ) : (
          <p className="text-center text-greenColor">QR Code is valid</p>
        ))}

      {devices.length === 0 && (
        <div className="flex items-center justify-center flex-col text-destructive text-sm">
          <p className="">No camera available</p>
          <p className="text-center">
            Check if your camera is working and Tapup has permission to access
            it
          </p>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileUpload}
      />

      <Button
        className="bg-greenColor hover:bg-orderButton text-primaryBackground hover:text-primary mt-4 w-full"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload QR Code Instead
      </Button>
      {!isScanning && (
        <button
          onClick={handleRescan}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Rescan
        </button>
      )}

      
      {/* MODAL */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center">
          {/* Icon */}
          {modalType === "valid" ? (
            <CircleCheck className="text-green-500 w-16 h-16" />
          ) : (
            <CircleAlert className="text-red-500 w-16 h-16" />
          )}

          {/* Message */}
          <p className="text-lg font-semibold mt-4">{modalMessage}</p>

          {/* Buttons */}
          <div className="mt-4 flex gap-2 w-full">
              <DialogClose asChild>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
            {modalType === "valid" ? (
              <Button className="bg-greenColor hover:bg-orderButton  text-white w-full">
                Activate Card
              </Button>
            ) : (
              <Button
                className="bg-orderButton hover:bg-greenColor text-white w-full"
                onClick={handleRescan}
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QrCodeScanner;
