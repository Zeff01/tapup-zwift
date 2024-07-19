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
import { Photo } from "@/src/lib/firebase/store/users.type";
import { uploadImage } from "@/src/lib/firebase/store/users.action";
import { LoaderCircle } from "lucide-react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  //   convertToPixelCrop,
} from "react-image-crop";
import { canvasPreview } from "@/lib/canvasPreview";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import ImageLoaded from "./ImageLoaded";

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

interface CropperProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl?: string | null;
  photo: null | Photo;
  setImageUrl:
    | Dispatch<SetStateAction<string | null>>
    | ((imageUrl: string) => void);
  setPhoto: Dispatch<SetStateAction<Photo | null>> | ((photo: Photo) => void);
  aspect: number;
  changeImage?: (img: string) => void;
  maxHeight?: number;
  circularCrop?: boolean;
  fallback: ReactNode;
  disablePreview?: boolean;
  imageClassName?: string;
}

export default function Cropper({
  imageUrl,
  setImageUrl,
  photo,
  setPhoto,
  aspect,
  maxHeight,
  circularCrop = false,
  fallback,
  className,
  disablePreview = false,
  imageClassName,
  ...rest
}: CropperProps) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  //   const [aspect, setAspect] = useState<number | undefined>(16 / 6)
  const [showModal, setShowModal] = useState(false);
  const [csr, SetCsr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function toggleModal() {
    setCrop(undefined);
    setImageLoaded(false);
    setImgSrc("");
    setShowModal((m) => !m);
  }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);
      setCrop(undefined); // Makes crop preview update between images.
      //   toggleModal()
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = "";
    }
  }

  // TODO: Loaded Bug
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    setImageLoaded(true);
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    setLoading(true);

    try {
      const image = imgRef.current;
      const previewCanvas = previewCanvasRef.current;
      if (!image || !previewCanvas || !completedCrop) {
        throw new Error("Crop canvas does not exist");
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const offscreen = new OffscreenCanvas(
        completedCrop.width * scaleX,
        completedCrop.height * scaleY
      );
      const ctx = offscreen.getContext("2d");
      if (!ctx) {
        throw new Error("No 2d context");
      }

      ctx.drawImage(
        previewCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height,
        0,
        0,
        offscreen.width,
        offscreen.height
      );

      const blob = await offscreen.convertToBlob({
        type: "image/png",
      });

      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileAsDataURL = event.target?.result;
        if (typeof fileAsDataURL === "string") {
          const file = new File([blob], "cropped-image.png", {
            type: "image/png",
          });
          try {
            const dl_url = await uploadImage({
              preview: URL.createObjectURL(file),
              raw: file,
            });
            setPhoto({ preview: fileAsDataURL, raw: file });
            if (dl_url) setImageUrl(dl_url);
            toast.success("Image cropped and uploaded.");
          } catch (error: any) {
            console.error(error, "failed to upload image");
            toast.error(JSON.stringify(error.message));
          } finally {
            setLoading(false);
            toggleModal();
          }
        }
      };
      reader.readAsDataURL(blob);

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
    } catch (err: any) {
      console.error(err.message, "Something Went Wrong");
      toast.error(JSON.stringify(err.message));
      setLoading(false);
      toggleModal();
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        );
      }
    },
    100,
    [completedCrop, scale]
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
          (imageUrl || photo?.preview) && "overflow-hidden"
        )}
        {...rest}
      >
        <Input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="w-full h-full absolute top-0 left-0 opacity-0 z-10"
          onClick={toggleModal}
          placeholder="cropper"
          // style={{ display: "none" }}
        />
        {(photo?.preview ?? imageUrl) && !disablePreview ? (
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
              url={photo?.preview ?? imageUrl ?? ""}
            />
          </div>
        ) : (
          fallback
        )}
      </div>

      {createPortal(
        <>
          {showModal && (
            <div className="z-10 fixed top-0 right-0 w-screen h-screen">
              <div className="z-20 w-full h-full bg-black opacity-80" />
              <div className=" z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-full bg-custom-light flex flex-col items-center gap-y-8 overflow-y-scroll  justify-between">
                <div className="pt-8 w-full flex flex-col items-center">
                  {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
                  <div className="w-[400px] flex flex-col items-center gap-y-2">
                    <p className="pb-4 font-bold text-2xl">Select the Image</p>
                    <label htmlFor="scale" className="text-xl font-semibold">
                      Zoom
                    </label>
                    <div className="flex flex-row items-center gap-2 w-full pb-4">
                      <Minus />
                      <Slider
                        defaultValue={[1]}
                        max={3}
                        step={0.05}
                        min={0.5}
                        onValueChange={(v) => {
                          setScale(v[0]);
                        }}
                      />
                      <Plus />
                    </div>
                  </div>
                  <div className="w-full flex flex-row gap-6 justify-center items-center">
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="w-20 text-white border disabled:cursor-not-allowed items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-input bg-transparent hover:bg-accent py-2 hover:text-accent-foreground"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    {!!imgSrc && imageLoaded && (
                      <button
                        type="button"
                        onClick={onDownloadCropClick}
                        className="w-20 z-[500] disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md"
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
                <div className="px-2">
                  {!!imgSrc && (
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      // minWidth={400}
                      minHeight={60}
                      maxHeight={maxHeight}
                      circularCrop={circularCrop}
                    >
                      <div className="relative flex items-center justify-center bg-black/30">
                        <Loader2 className="animate-spin size-20 absolute " />
                        <Image
                          ref={imgRef}
                          alt="Crop me"
                          src={imgSrc || "/assets/zwift-logo.png"}
                          style={{
                            transform: `scale(${scale})`,
                            opacity: imageLoaded ? "100" : "0",
                          }}
                          onLoad={onImageLoad}
                          width={400}
                          height={400}
                        />
                      </div>
                    </ReactCrop>
                  )}
                </div>
                {!!completedCrop && (
                  <>
                    <div>
                      <canvas
                        className="shadow-md hidden"
                        ref={previewCanvasRef}
                        style={{
                          border: "1px dashed black",
                          objectFit: "contain",
                          width: completedCrop.width,
                          height: completedCrop.height,
                        }}
                      />
                    </div>
                    <div>
                      <a
                        href="#hidden"
                        ref={hiddenAnchorRef}
                        download
                        style={{
                          position: "absolute",
                          top: "-200vh",
                          visibility: "hidden",
                        }}
                      >
                        Hidden download
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>,
        document.body
      )}
    </div>
  );
}
