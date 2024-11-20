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
        <Loader2 className="animate-spin h-full w-full absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" />
      )}
      <Image {...props} onLoad={handleImageLoad} />
    </>
  );
};

export default ImageWithLoading;
