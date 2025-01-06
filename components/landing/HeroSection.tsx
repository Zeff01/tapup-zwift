import Image from "next/image";
import { Button } from "../ui/button";
import tapupImg from "@/public/assets/Cards.png";
import { LogIn } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="flex flex-col overflow-hidden lg:flex-row items-center justify-between gap-8 px-4 md:px-16 py-8"
      id="about"
    >
      <div className="xl:w-1/2 lg:ml-[5rem] lg:w-[40rem] lg:px-0 w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] leading-tight md:leading-none text-center font-black sm:text-left">
          The <span className="text-green-500">Ultimate Tool</span> to Boost
          Your Productivity
        </h2>
        <p className="text-lg w-full max-w-lg leading-snug md:leading-8 sm:text-xl mt-4 text-muted-foreground text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores cum
          pariatur, laborum tenetur atque aliquid!
        </p>
        <Button className="uppercase max-w-[15rem] py-6 w-full bg-green-600 mt-[27px] font-bold flex text-background items-center mx-auto sm:mx-0 hover:bg-green-700">
          Get a card <LogIn size={32} />
        </Button>
      </div>
      <div className="md:w-[45rem] flex-shrink-0 lg:flex-shrink sm:w-[35rem] w-[22rem] aspect-square relative m-auto">
        <Image
          src={tapupImg}
          alt="tap up image"
          priority
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
