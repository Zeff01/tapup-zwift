import { Crop, PixelCrop } from "react-image-crop";

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

interface CropperMultiplePreviewsProps {
  images: CropItem[];
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
}

export default function CropperMultiplePreviews({
  images,
  activeIndex,
  setActiveIndex,
}: CropperMultiplePreviewsProps) {
  return (
    <div className="w-full grid grid-cols-5 justify-items-center mt-2 px-2">
      {images.map((img, idx) => {
        const crop = img.completedCrop;
        return (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-min rounded ${
              idx === activeIndex ? "ring-[3px] ring-green-500" : ""
            }`}
          >
            <div className="size-16 overflow-hidden rounded bg-gray-100">
              {crop ? (
                <canvas
                  ref={img.canvasRef}
                  style={{
                    width: "100%", // match parent container
                    height: "100%",
                    objectFit: "contain",
                    border: "1px solid black",
                  }}
                />
              ) : (
                <img
                  src={img.src}
                  alt={`Image ${idx}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
