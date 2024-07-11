import Image from "next/image";
import React from "react";

const ImageLoaded = ({ url }: { url: string }) => {
  const [loading, setLoading] = React.useState(true);
  return (
    <Image
      key={url}
      src={url}
      width={77}
      height={77}
      alt={`service-${url}`}
      onLoad={() => setLoading(false)}
      className="rounded-md absolute top-0 left-0"
      style={{
        backgroundColor: !loading ? "white" : "",
      }}
    />
  );
};

export default ImageLoaded;
