import Image from "next/image";
import { LeftContentMsg } from "./LeftContentMsg";

export const LeftContent = () => {
  return (
    <div className="flex-1 z-10 min-h-screen p-[36px]">
      <Image
        src={"/images/logo.png"}
        alt="logo"
        height={200}
        width={200}
        className="absolute "
      />
      <LeftContentMsg />
    </div>
  );
};
