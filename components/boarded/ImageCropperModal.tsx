"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Cropper from "@/components/Cropper";
import { Photo } from "@/types/types";

interface ImageCropperModalProps {
  open: boolean;
  onClose: () => void;
  photo: Photo;
  onCrop: (croppedPhoto: Photo) => void;
  aspectRatio?: number;
}

const ImageCropperModal = ({
  open,
  onClose,
  photo,
  onCrop,
  aspectRatio = 1,
}: ImageCropperModalProps) => {
  const [croppedPhoto, setCroppedPhoto] = useState<Photo | null>(photo);
  const [imageUrl, setImageUrl] = useState<string | null>(photo.preview);

  const handleSave = () => {
    if (croppedPhoto) {
      onCrop(croppedPhoto);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Cropper
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            photo={croppedPhoto}
            setPhoto={setCroppedPhoto}
            aspect={aspectRatio}
            circularCrop={false}
            disableUpload={true}
            disablePreview={false}
            fallback={
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <p className="text-gray-500">No image selected</p>
              </div>
            }
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!croppedPhoto}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperModal;