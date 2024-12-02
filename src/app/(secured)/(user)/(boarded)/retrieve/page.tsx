"use client";
import React, { useState } from "react";
import QRCode from "qrcode.react";

const Page = () => {
  const [newOwner, setNewOwner] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [cardId] = useState("12345"); // Example card ID
  const [qrValue, setQrValue] = useState<string>("");
  const [scanResult, setScanResult] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransfer = () => {
    // Create a string to encode in the QR code
    const transferData = JSON.stringify({
      cardId,
      newOwner: newOwner,
    });
    setQrValue(transferData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setScanResult(result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Transfer Card Ownership</h1>
      <input
        type="text"
        name="name"
        value={newOwner.name}
        onChange={handleInputChange}
        placeholder="New Owner Name"
        className="mb-2 p-2 border border-gray-300"
      />
      <input
        type="email"
        name="email"
        value={newOwner.email}
        onChange={handleInputChange}
        placeholder="New Owner Email"
        className="mb-2 p-2 border border-gray-300"
      />
      <button
        onClick={handleTransfer}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Generate QR Code
      </button>
      {qrValue && <QRCode value={qrValue} />}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Scan QR Code</h2>
        <input type="file" accept=".txt" onChange={handleFileChange} />
        {scanResult && (
          <div className="mt-4 p-2 border border-gray-300">
            <h3 className="text-lg font-bold">Scan Result:</h3>
            <p>{scanResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
