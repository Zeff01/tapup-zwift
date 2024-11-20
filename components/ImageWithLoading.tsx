import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, ReactElement, ComponentProps } from "react";

const ImageWithLoading = (
  props: ComponentProps<typeof Image>
): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <span className="flex h-full bg-accent/30 items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </span>
      )}
      <Image {...props} onLoad={handleImageLoad} />
    </>
  );
};

export default ImageWithLoading;
