"use client";
import React, {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
  HTMLAttributes,
} from "react";
import { Slider } from "@/components/ui/slider";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import { Loader2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Photo } from "@/types/types";
import { uploadImage } from "@/lib/firebase/actions/user.action";
import { LoaderCircle } from "lucide-react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "@/lib/utils";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ImageLoaded from "./ImageLoaded";
import TapupLogo from "./svgs/TapupLogo";
import CropperMultiplePreviews from "./CropperMultiplePreviews";

type CropItem = {
  filename: string;
  src: string;
  crop: Crop | undefined;
  completedCrop: PixelCrop | undefined;
  scale: number;
  rotate: number;
  ref: React.RefObject<HTMLImageElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
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

interface CropperMultipleProps extends HTMLAttributes<HTMLDivElement> {
  previewImageUrl?: string | null;
  aspect: number;
  fallback: ReactNode;
  previewPhoto: null | Photo;
  changeImage?: (img: string) => void;
  maxHeight?: number;
  circularCrop?: boolean;
  disablePreview?: boolean;
  disableUpload?: boolean;
  imageClassName?: string;
  className?: string;
  imageUrls: string[];
  photos: Photo[];
  setImageUrls: Dispatch<SetStateAction<string[]>> | ((urls: string[]) => void);
  setPhotos: Dispatch<SetStateAction<Photo[]>> | ((photos: Photo[]) => void);
}

export default function CropperMultiple({
  previewImageUrl,
  imageUrls,
  setImageUrls,
  previewPhoto,
  photos,
  setPhotos,
  aspect,
  maxHeight,
  circularCrop = false,
  fallback,
  className,
  disablePreview = false,
  disableUpload,
  imageClassName,
  ...rest
}: CropperMultipleProps) {
  // const [imgSrc, setImgSrc] = useState("");
  // const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  // const imgRef = useRef<HTMLImageElement>(null);
  // const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  // const blobUrlRef = useRef("");
  // const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  // const [scale, setScale] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [csr, SetCsr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // New states for handling multiple uploads at once
  const [images, setImages] = useState<CropItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const body = document.body;
    if (showModal) {
      body.style.overflow = "hidden";
      return;
    }
    body.style.overflow = "auto";
  }, [showModal]);

  function toggleModal() {
    // setCrop(undefined);
    setImageLoaded(false);
    setImages([]);
    setShowModal((m) => !m);
  }

  function onSelectFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!showModal) setShowModal(true);

    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 5 - photos.length) {
        setShowModal(false);
        toast.error("Maximum of 5 photos can be uploaded");
        return;
      }

      const imageFiles = Array.from(e.target.files);
      const cropItems: CropItem[] = new Array(imageFiles.length);
      let loaded = 0;

      imageFiles.forEach((imageFile, index) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result?.toString() || "";

          cropItems[index] = {
            filename: imageFile.name,
            src: result,
            crop: undefined,
            completedCrop: undefined,
            scale: 1,
            rotate: 0,
            ref: React.createRef<HTMLImageElement>(),
            canvasRef: React.createRef<HTMLCanvasElement>(),
          };

          loaded++;
          if (loaded === imageFiles.length) {
            setImages(cropItems);
            setActiveIndex(0);
          }
        };
        reader.readAsDataURL(imageFile);
      });

      e.target.value = "";
    }
  }

  // TODO: Loaded Bug
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    setImageLoaded(true);

    const imgElement = e.currentTarget;
    const { width, height } = imgElement;

    setImages((prev) => {
      const current = prev[activeIndex];
      if (current.crop) return prev; // Don't overwrite existing crop

      const centeredCrop = centerAspectCrop(width, height, aspect);
      const updated = [...prev];
      updated[activeIndex] = {
        ...updated[activeIndex],
        crop: centeredCrop,
      };
      return updated;
    });
  }

  async function onDownloadCropClick() {
    setLoading(true);

    const newPhotos: Photo[] = [];
    const newUrls: string[] = [];

    try {
      for (const img of images) {
        if (!img || (!img.canvasRef?.current && !img.src)) {
          throw new Error("No image or crop available");
        }

        const crop = img.completedCrop;
        if (!crop && !img.src) {
          throw new Error("Neither crop nor original image available");
        }

        const canvas: HTMLCanvasElement = await (async () => {
          if (img.canvasRef?.current) {
            return img.canvasRef.current;
          } else {
            const imgElement = document.createElement("img");
            imgElement.src = img.src;

            return await new Promise<HTMLCanvasElement>((resolve, reject) => {
              imgElement.onload = () => {
                const { width, height } = imgElement;
                const size = Math.min(width, height); // square dimension

                // Center crop box
                const startX = (width - size) / 2;
                const startY = (height - size) / 2;

                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = size;
                tempCanvas.height = size;

                const ctx = tempCanvas.getContext("2d");
                if (!ctx) return reject("Context missing");

                // Draw only the center square region
                ctx.drawImage(
                  imgElement,
                  startX,
                  startY, // source x, y
                  size,
                  size, // source width, height
                  0,
                  0, // dest x, y
                  size,
                  size // dest width, height
                );

                resolve(tempCanvas);
              };

              imgElement.onerror = () => reject("Image load error");
            });
          }
        })();

        // Resize and compress
        const finalCanvas = document.createElement("canvas");
        const MAX_WIDTH = 400;
        const scale = MAX_WIDTH / canvas.width;
        finalCanvas.width = MAX_WIDTH;
        finalCanvas.height = canvas.height * scale;

        const ctx = finalCanvas.getContext("2d");
        if (!ctx) throw new Error("Final canvas context missing");

        ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height);

        const blob = await new Promise<Blob | null>((resolve) =>
          finalCanvas.toBlob((b) => resolve(b), "image/png")
        );
        if (!blob) throw new Error("Failed to compress image");

        const file = new File([blob], `cropped-${img.filename}.png`, {
          type: "image/png",
        });

        const fileAsDataURL = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result);
            else reject("Failed to read blob as data URL");
          };
        });

        const dl_url = await uploadImage({
          preview: URL.createObjectURL(file),
          raw: file,
        });

        newPhotos.push({ preview: fileAsDataURL, raw: file });
        if (dl_url) newUrls.push(dl_url);
      }

      setPhotos([...photos, ...newPhotos]);
      setImageUrls([...imageUrls, ...newUrls]);

      toast.success("Images cropped and uploaded.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      toggleModal();
    }
  }

  useDebounceEffect(
    async () => {
      const activeImage = images[activeIndex];
      const imageEl = activeImage?.ref?.current;
      const canvasEl = activeImage?.canvasRef?.current;

      if (
        activeImage?.completedCrop?.width &&
        activeImage?.completedCrop?.height &&
        imageEl &&
        canvasEl
      ) {
        canvasPreview(
          imageEl,
          canvasEl,
          activeImage.completedCrop,
          activeImage.scale
        );
      }
    },
    100,
    [images[activeIndex]?.completedCrop, images[activeIndex]?.scale]
  );

  useEffect(() => {
    SetCsr(true);
  }, []);

  if (!csr) {
    return null;
  }
  return (
    <div className="cropper">
      <div
        className={cn(
          "relative w-full h-full border border-[#2c2c2c]",
          className,
          (previewImageUrl || previewPhoto?.preview) && "overflow-hidden"
        )}
        {...rest}
      >
        <Input
          type="file"
          accept="image/*"
          multiple={true}
          onChange={onSelectFiles}
          className="w-full h-full absolute top-0 left-0 opacity-0 z-10"
          onClick={(e) => {
            if (disableUpload) {
              e.preventDefault();
              toast.error("Maximum of 5 photos can be uploaded");
            } else {
              toggleModal();
            }
          }}
          placeholder="cropper"
          // style={{ display: "none" }}
        />
        {(previewPhoto?.preview ?? previewImageUrl) && !disablePreview ? (
          <div className="flex items-center justify-center  overflow-hidden relative bg-[#222224] h-full">
            <Loader2 className="animate-spin" />
            <ImageLoaded
              className={cn(
                `w-full h-full pointer-events-none absolute top-0 left-0 ${
                  circularCrop ? "rounded-full" : ""
                }`,
                imageClassName
              )}
              width={500}
              height={500}
              url={previewPhoto?.preview ?? previewImageUrl ?? ""}
            />
          </div>
        ) : (
          fallback
        )}
      </div>

      {createPortal(
        <>
          {showModal && (
            <div className="z-50 fixed top-0 right-0 w-screen h-screen ">
              <div className="z-20 w-full h-full bg-black opacity-80" />
              <div className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary flex flex-col items-center gap-y-4 overflow-y-auto justify-between pb-6">
                <div className="pt-8 w-full flex flex-col items-center ">
                  {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
                  <div className="w-[350px] sm:w-[400px] flex flex-col items-center gap-y-2">
                    <TapupLogo className="w-[6rem] mb-3" />
                    <p className="pb-4 font-bold text-2xl">Select Images</p>
                  </div>
                </div>
                <div className="px-2">
                  {!!images && images.length > 0 && (
                    <>
                      <ReactCrop
                        crop={images[activeIndex]?.crop}
                        onChange={(_, percentCrop) => {
                          setImages((prevImages) => {
                            const updatedImages = [...prevImages];
                            updatedImages[activeIndex] = {
                              ...updatedImages[activeIndex],
                              crop: percentCrop,
                            };
                            return updatedImages;
                          });
                        }}
                        onComplete={(c) => {
                          setImages((prevImages) => {
                            const updatedImages = [...prevImages];
                            updatedImages[activeIndex] = {
                              ...updatedImages[activeIndex],
                              completedCrop: c,
                            };
                            return updatedImages;
                          });
                        }}
                        aspect={aspect}
                        // minWidth={400}
                        minHeight={60}
                        maxHeight={maxHeight}
                        circularCrop={circularCrop}
                        disabled={loading}
                      >
                        <div className="relative flex items-center justify-center bg-black/30">
                          {/* <Loader2 className="animate-spin size-20 absolute " /> */}
                          <Image
                            ref={images[activeIndex]?.ref}
                            alt="Crop me"
                            src={
                              images[activeIndex]?.src ||
                              "/assets/zwift-logo.png"
                            }
                            style={{
                              transform: `scale(${images[activeIndex]?.scale ?? 1})`,
                              opacity: imageLoaded ? "100" : "0",
                              objectFit: "contain",
                            }}
                            onLoad={onImageLoad}
                            width={400}
                            height={400}
                          />
                        </div>
                      </ReactCrop>
                      <div className="flex flex-row items-center gap-2 w-full pt-4 pb-2 px-8 md:px-5 ">
                        <Minus />
                        <Slider
                          value={[images[activeIndex]?.scale ?? 1]}
                          max={3}
                          step={0.05}
                          min={0.5}
                          onValueChange={(v) => {
                            const newScale = v[0];
                            setImages((prev) => {
                              const updated = [...prev];
                              if (updated[activeIndex]) {
                                updated[activeIndex] = {
                                  ...updated[activeIndex],
                                  scale: newScale,
                                };
                              }
                              return updated;
                            });
                          }}
                        />
                        <Plus />
                      </div>
                    </>
                  )}
                  <CropperMultiplePreviews
                    images={images}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                  />
                </div>
                <div className="w-full flex flex-row gap-6 justify-center items-center">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="w-20 text-white border disabled:cursor-not-allowed items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-gray-600 hover:bg-accent py-2 hover:bg-green-600"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  {!!images && imageLoaded && (
                    <button
                      type="button"
                      onClick={onDownloadCropClick}
                      className="w-20 z-[500] disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 text-black hover:bg-green-600 py-2 rounded-md "
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="w-full flex items-center justify-center">
                          <LoaderCircle className="animate-spin" />
                        </span>
                      ) : (
                        "Save"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
}
