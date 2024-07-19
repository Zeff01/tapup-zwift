import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ImageLoaded = ({
  url,
  className,
  width,
  height,
}: {
  url: string;
  className?: string;
  width?: number;
  height?: number;
}) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <Image
      key={url}
      src={url}
      width={width || 77}
      height={height || 77}
      alt={`service-${url}`}
      onLoad={() => setLoading(false)}
      className={cn(className)}
      style={{
        backgroundColor: !loading ? "white" : "",
      }}
    />
  );
};

export default ImageLoaded;
