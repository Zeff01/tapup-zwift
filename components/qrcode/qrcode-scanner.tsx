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
import { Card, Users } from "@/types/types";
import Canvas2Card from "@/src/app/(secured)/(user)/(boarded)/cards/[cardId]/_components/canvas";

const QrCodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hudColor, setHudColor] = useState<string>("red");
  const [scannedCode, setScannedCode] = useState<QrScanner.ScanResult | null>(
    null
  );
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [invalidQRCode, setInvalidQRCode] = useState<boolean>(false);
  const [card, setCard] = useState<Card | null>(null);

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

  useEffect(() => {
    const video = videoRef.current;

    const invalidQRCode = () => {
      setHudColor("red");
      setInvalidQRCode(true);
      console.error("Invalid QR Code format");
    };

    const validQRCode = (result: QrScanner.ScanResult, card: Card) => {
      setHudColor("green");
      setScannedCode(result);
      setCard(card);
      setIsScanning(false);
      setInvalidQRCode(false);
    };

    if (video && selectedDeviceId && isScanning) {
      const qrScanner = new QrScanner(
        video,
        async (result) => {
          if (!isValidQRCode(result.data)) {
            invalidQRCode();
            return console.error("Invalid QR Code format");
          }

          const url = new URL(result.data);
          const cardId = url.pathname.split("/").pop();

          if (!cardId) {
            invalidQRCode();
            return console.error("Invalid QR Code format");
          }

          setInvalidQRCode(false);

          const [error, data] = await catchErrorTyped(getCardById(cardId));

          if (!data || error) {
            invalidQRCode();
            return console.error("Invalid QR Code format");
          }
          validQRCode(result, data);
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      const startScanner = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId } },
        });
        video.srcObject = stream;
        qrScanner.start();
      };

      startScanner();

      return () => {
        qrScanner.stop();
        qrScanner.destroy();
        if (video.srcObject) {
          (video.srcObject as MediaStream).getTracks().forEach((track) => {
            track.stop();
            track.enabled = false;
          });
          video.srcObject = null;
        }
      };
    }
  }, [selectedDeviceId, isScanning]);

  const handleRescan = () => {
    setScannedCode(null);
    setHudColor("red");
    setIsScanning(true);
    setInvalidQRCode(false);
    setCard(null);
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
          border: `4px solid ${hudColor}`,
          position: "relative",
        }}
      >
        {isScanning ? (
          <video
            ref={videoRef}
            className="object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Canvas2Card user={card as Users} isQrScanner />
          </div>
        )}
        {invalidQRCode && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 0, 0, 0.7)",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Invalid QR Code
          </div>
        )}
      </div>
      {!isScanning && (
        <button
          onClick={handleRescan}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Rescan
        </button>
      )}
    </div>
  );
};

export default QrCodeScanner;
