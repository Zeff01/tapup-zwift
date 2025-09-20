"use client";

import React, { useState, useRef, HTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Photo } from "@/types/types";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import ImageCropperEasy from "./ImageCropperEasy";
import ImageLoaded from "./ImageLoaded";
import { Camera, Edit2 } from "lucide-react";

interface CropperNewProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl?: string | null;
  photo: null | Photo;
  setImageUrl:
    | React.Dispatch<React.SetStateAction<string | null>>
    | ((imageUrl: string) => void);
  setPhoto: React.Dispatch<React.SetStateAction<Photo | null>> | ((photo: Photo) => void);
  aspect: number;
  circularCrop?: boolean;
  fallback: React.ReactNode;
  disablePreview?: boolean;
  disableUpload?: boolean;
  imageClassName?: string;
  maxHeight?: number;
  changeImage?: (img: string) => void;
}

export default function CropperNew({
  imageUrl,
  setImageUrl,
  photo,
  setPhoto,
  aspect,
  circularCrop = false,
  fallback,
  className,
  disablePreview = false,
  disableUpload,
  imageClassName,
  ...rest
}: CropperNewProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>("");
  const [showEditButton, setShowEditButton] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      
      if (file.size > 25 * 1024 * 1024) {
        toast.error("Image must be smaller than 25MB");
        return;
      }

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageSrc = reader.result?.toString() || "";
        setTempImageSrc(imageSrc);
        setShowCropper(true);
      });
      reader.readAsDataURL(file);
      
      // Reset input to allow selecting the same file again
      e.target.value = "";
    }
  };

  const handleCropComplete = (croppedPhoto: Photo, downloadUrl?: string) => {
    setPhoto(croppedPhoto);
    if (downloadUrl) {
      setImageUrl(downloadUrl);
    }
    setShowCropper(false);
    setTempImageSrc("");
  };

  const handleClick = () => {
    if (disableUpload) {
      toast.error("Maximum of 5 photos can be uploaded");
      return;
    }
    
    // Always open file picker when clicking
    fileInputRef.current?.click();
  };
  
  const handleEditClick = () => {
    // Open cropper to edit existing image
    if (imageUrl || photo?.preview) {
      setTempImageSrc(photo?.preview || imageUrl || "");
      setShowCropper(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "relative w-full h-full border border-[#2c2c2c]",
          className,
          (imageUrl || photo?.preview) && "overflow-hidden",
          !(imageUrl || photo?.preview) && "cursor-pointer"
        )}
        onClick={!(imageUrl || photo?.preview) ? handleClick : undefined}
        {...rest}
      >
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disableUpload}
        />
        
        {(photo?.preview ?? imageUrl) && !disablePreview ? (
          <div className="flex items-center justify-center overflow-hidden relative bg-[#222224] h-full group">
            <ImageLoaded
              className={cn(
                `w-full h-full pointer-events-none absolute top-0 left-0 object-cover ${
                  circularCrop ? "rounded-full" : ""
                }`,
                imageClassName
              )}
              width={500}
              height={500}
              url={photo?.preview ?? imageUrl ?? ""}
            />
            
            {/* Edit overlay for desktop */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick();
              }}
              className={cn(
                "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer",
                circularCrop && "rounded-full",
                "hidden sm:flex" // Hide on mobile
              )}
            >
              <div className="flex flex-col items-center gap-2 text-white pointer-events-none">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Edit2 className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Click to edit</span>
              </div>
            </div>
            
            {/* Action buttons for mobile and desktop */}
            <div className="absolute bottom-2 right-2 flex gap-2">
              {/* Edit button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick();
                }}
                className={cn(
                  "p-2 bg-black/70 text-white rounded-full",
                  "hover:bg-black/80 transition-colors"
                )}
                title="Edit image"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              
              {/* Change image button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className={cn(
                  "p-2 bg-black/70 text-white rounded-full",
                  "hover:bg-black/80 transition-colors"
                )}
                title="Change image"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          fallback
        )}
      </div>

      {/* Image Cropper Modal */}
      <ImageCropperEasy
        open={showCropper}
        onClose={() => {
          setShowCropper(false);
          setTempImageSrc("");
        }}
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
        aspectRatio={aspect}
        cropShape={circularCrop ? "round" : "rect"}
        title={circularCrop ? "Crop Profile Photo" : aspect === 16/9 ? "Crop Cover Photo" : "Crop Image"}
        showRotation={!circularCrop}
      />
    </>
  );
}