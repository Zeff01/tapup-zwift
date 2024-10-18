import Image from "next/image";

export const BackGround = () => {
  return (
    <Image
      src={"/images/FTapup.png"}
      alt="Tapup Hero"
      fill
      className="absolute "
    />
  );
};
