"use client";

import React, { useState, useRef } from "react";
import { Photo } from "@/types/types";
import { toast } from "react-toastify";
import { X, Edit2, Plus } from "lucide-react";
import Image from "next/image";
import ImageCropperEasy from "./ImageCropperEasy";
import { cn } from "@/lib/utils";

interface CropperMultipleNewProps {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  photosUrl: (string | null)[];
  setPhotosUrl: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  aspect: number;
  maxPhotos?: number;
  className?: string;
  fallback: React.ReactNode;
}

export default function CropperMultipleNew({
  photos,
  setPhotos,
  photosUrl,
  setPhotosUrl,
  aspect,
  maxPhotos = 5,
  className,
  fallback,
}: CropperMultipleNewProps) {
  const [showCropper, setShowCropper] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if max photos reached
      if (photos.length >= maxPhotos && editIndex === null) {
        toast.error(`Maximum of ${maxPhotos} photos can be uploaded`);
        return;
      }
      
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
      
      // Reset input
      e.target.value = "";
    }
  };

  const handleCropComplete = (croppedPhoto: Photo, downloadUrl?: string) => {
    if (editIndex !== null) {
      // Edit existing photo
      const newPhotos = [...photos];
      const newPhotosUrl = [...photosUrl];
      
      newPhotos[editIndex] = croppedPhoto;
      if (downloadUrl) {
        newPhotosUrl[editIndex] = downloadUrl;
      }
      
      setPhotos(newPhotos);
      setPhotosUrl(newPhotosUrl);
      setEditIndex(null);
    } else {
      // Add new photo
      setPhotos([...photos, croppedPhoto]);
      setPhotosUrl([...photosUrl, downloadUrl || null]);
    }
    
    setShowCropper(false);
    setTempImageSrc("");
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPhotosUrl = photosUrl.filter((_, i) => i !== index);
    
    setPhotos(newPhotos);
    setPhotosUrl(newPhotosUrl);
  };

  const handleEditPhoto = (index: number) => {
    const photo = photos[index];
    const url = photosUrl[index];
    
    if (photo?.preview || url) {
      setTempImageSrc(photo.preview || url || "");
      setEditIndex(index);
      setShowCropper(true);
    }
  };

  const handleAddNew = () => {
    if (photos.length >= maxPhotos) {
      toast.error(`Maximum of ${maxPhotos} photos can be uploaded`);
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-4", className)}>
        {/* Display existing photos */}
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => handleEditPhoto(index)}
          >
            <Image
              src={photo.preview || photosUrl[index] || ""}
              alt={`Service photo ${index + 1}`}
              fill
              className="object-cover"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1 text-white">
                <Edit2 className="w-5 h-5" />
                <span className="text-xs font-medium">Edit</span>
              </div>
            </div>
            
            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemovePhoto(index);
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {/* Add new photo button */}
        {photos.length < maxPhotos && (
          <div
            onClick={handleAddNew}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all group"
          >
            <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-gray-700">
              <Plus className="w-8 h-8" />
              <span className="text-sm font-medium">Add Photo</span>
            </div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Cropper Modal */}
      <ImageCropperEasy
        open={showCropper}
        onClose={() => {
          setShowCropper(false);
          setTempImageSrc("");
          setEditIndex(null);
        }}
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
        aspectRatio={aspect}
        cropShape="rect"
        title={editIndex !== null ? "Edit Service Photo" : "Add Service Photo"}
        showRotation={true}
      />
    </>
  );
}