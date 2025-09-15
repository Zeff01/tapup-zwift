"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Photo } from "@/types/types";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "@/lib/utils/image";
import { uploadImage } from "@/lib/firebase/actions/user.action";
import { toast } from "react-toastify";
import { Loader2, Minus, Plus } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperModalProps {
  open: boolean;
  onClose: () => void;
  photo: Photo;
  onCrop: (croppedPhoto: Photo) => void;
  aspectRatio?: number;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageCropperModal = ({
  open,
  onClose,
  photo,
  onCrop,
  aspectRatio = 1,
}: ImageCropperModalProps) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setCrop(centerAspectCrop(naturalWidth, naturalHeight, aspectRatio));
  }

  const handleSave = async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      toast.error("Please select a crop area");
      return;
    }

    setLoading(true);
    try {
      // Generate canvas preview
      await canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale
      );

      // Convert canvas to blob
      previewCanvasRef.current.toBlob(async (blob) => {
        if (!blob) {
          throw new Error("Failed to create image blob");
        }

        const file = new File([blob], "cropped-image.jpg", {
          type: "image/jpeg",
        });

        const reader = new FileReader();
        reader.onload = async (e) => {
          const preview = e.target?.result as string;
          
          try {
            const downloadUrl = await uploadImage({
              preview: URL.createObjectURL(file),
              raw: file,
            });

            const croppedPhoto: Photo = {
              preview,
              raw: file
            };

            onCrop(croppedPhoto);
            toast.success("Image cropped successfully");
            onClose();
          } catch (error) {
            console.error("Failed to upload cropped image:", error);
            toast.error("Failed to save cropped image");
          }
        };
        reader.readAsDataURL(blob);
      }, "image/jpeg", 0.9);
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to crop image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-visible">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* Zoom controls */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Zoom:</span>
            <div className="flex items-center gap-2 flex-1">
              <Minus className="w-4 h-4" />
              <Slider
                value={[scale]}
                onValueChange={(v) => setScale(v[0])}
                min={0.8}
                max={2}
                step={0.05}
                className="flex-1"
              />
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-500 w-12">{(scale * 100).toFixed(0)}%</span>
          </div>

          {/* Crop area */}
          <div className="flex justify-center">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
              minHeight={100}
              className="max-w-full"
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={photo.preview}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  maxHeight: '60vh',
                  width: 'auto',
                  display: 'block'
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>

          {/* Hidden canvas for preview generation */}
          <canvas
            ref={previewCanvasRef}
            style={{ display: 'none' }}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading || !completedCrop}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperModal;