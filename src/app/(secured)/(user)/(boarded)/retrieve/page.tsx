"use client";

import React, { useState } from "react";
import { Camera, X } from "lucide-react";
import { QrReader } from "react-qr-reader";

const Page: React.FC = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleScan = (result: string | null) => {
    if (result) {
      setScannedResult(result);
      setIsCameraOpen(false);
    }
  };

  const handleError = (error: Error) => {
    console.error(error);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full relative">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 dark:text-green-400">
        Scan your card
      </h2>

      {/* Camera Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md aspect-square bg-white rounded-xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseCamera}
              className="absolute top-4 right-4 z-50 bg-red-500 text-white p-2 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* QR Code Scanner */}
            <div className="w-full h-full p-4">
              <QrReader
                onResult={(result, error) => {
                  if (result) handleScan(result.getText());
                  if (error) handleError(error);
                }}
                constraints={{ facingMode: "environment" }} // Use the rear camera
                containerStyle={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Scanned Result */}
      {scannedResult && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg">
          <p>Scanned Result: {scannedResult}</p>
        </div>
      )}

      {/* Camera Button */}
      <button
        onClick={handleCameraClick}
        className="focus:outline-none absolute bottom-12 sm:bottom-10 md:bottom-8"
      >
        <Camera className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-green-500" />
      </button>
    </div>
  );
};

export default Page;
