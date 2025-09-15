"use client";

import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Loader2, ZoomIn, ZoomOut, RotateCw, Upload, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";
import { uploadImage } from "@/lib/firebase/actions/user.action";
import { Photo } from "@/types/types";

interface ImageCropperEasyProps {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  onCropComplete: (croppedImage: Photo, downloadUrl?: string) => void;
  aspectRatio?: number;
  cropShape?: "rect" | "round";
  title?: string;
  showRotation?: boolean;
}

interface CroppedArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: CroppedArea,
  rotation = 0
): Promise<Blob | null> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg", 0.9);
  });
};

export const ImageCropperEasy: React.FC<ImageCropperEasyProps> = ({
  open,
  onClose,
  imageSrc,
  onCropComplete,
  aspectRatio = 1,
  cropShape = "rect",
  title = "Crop Image",
  showRotation = false,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update currentImageSrc when imageSrc prop changes
  React.useEffect(() => {
    setCurrentImageSrc(imageSrc);
  }, [imageSrc]);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onRotationChange = (rotation: number) => {
    setRotation(rotation);
  };

  const onCropAreaComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: CroppedArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleSave = async () => {
    if (!croppedAreaPixels) {
      toast.error("Please select a crop area");
      return;
    }

    setIsLoading(true);
    try {
      const croppedImageBlob = await getCroppedImg(
        currentImageSrc,
        croppedAreaPixels,
        rotation
      );

      if (!croppedImageBlob) {
        throw new Error("Failed to crop image");
      }

      const file = new File([croppedImageBlob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      const reader = new FileReader();
      reader.onload = async (e) => {
        const preview = e.target?.result as string;
        
        try {
          // Create object URL for the cropped image
          const objectUrl = URL.createObjectURL(file);
          
          // Upload the cropped image
          const downloadUrl = await uploadImage({
            preview: objectUrl,
            raw: file,
          });

          const croppedPhoto: Photo = {
            preview: preview, // Use the data URL for immediate preview
            raw: file,
          };
          
          // Clean up object URL
          URL.revokeObjectURL(objectUrl);

          onCropComplete(croppedPhoto, downloadUrl);
          toast.success("Image cropped successfully");
          handleClose();
        } catch (error) {
          console.error("Failed to upload cropped image:", error);
          toast.error("Failed to save cropped image");
        }
      };
      reader.readAsDataURL(croppedImageBlob);
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to crop image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCurrentImageSrc(imageSrc);
    onClose();
  };

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
        const newImageSrc = reader.result?.toString() || "";
        setCurrentImageSrc(newImageSrc);
        // Reset crop settings for new image
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
      });
      reader.readAsDataURL(file);
      
      // Reset input
      e.target.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-[60vh] bg-gray-900">
          <Cropper
            image={currentImageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspectRatio}
            cropShape={cropShape}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropAreaComplete}
            showGrid={true}
            objectFit="contain"
            classes={{
              containerClassName: "!bg-gray-900",
              cropAreaClassName: "!border-2 !border-white",
            }}
          />
          
          {/* Change Image Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="absolute top-4 right-4 gap-2"
            disabled={isLoading}
          >
            <Upload className="w-4 h-4" />
            Change Image
          </Button>
        </div>

        <div className="p-6 space-y-4 bg-background">
          {/* Zoom Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                Zoom
              </label>
              {zoom !== 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setZoom(1)}
                  className="h-7 px-2 text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <ZoomOut className="w-4 h-4 text-muted-foreground" />
              <Slider
                value={[zoom]}
                onValueChange={(value) => setZoom(value[0])}
                min={1}
                max={3}
                step={0.1}
                className="flex-1"
              />
              <ZoomIn className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground w-12">
                {Math.round(zoom * 100)}%
              </span>
            </div>
          </div>

          {/* Rotation Control */}
          {showRotation && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  Rotation
                </label>
                {rotation !== 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRotation(0)}
                    className="h-7 px-2 text-xs"
                  >
                    Reset
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation(rotation - 90)}
                  className="p-1 h-8 w-8"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Slider
                  value={[rotation]}
                  onValueChange={(value) => setRotation(value[0])}
                  min={-180}
                  max={180}
                  step={1}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation(rotation + 90)}
                  className="p-1 h-8 w-8"
                >
                  <RotateCw className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium w-12">{rotation}°</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperEasy;