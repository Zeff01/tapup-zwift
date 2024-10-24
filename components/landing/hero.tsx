import Image from "next/image";
import { Button } from "../ui/button";
import tapupImg from "@/public/assets/Cards.png";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row w-full lg:w-full justify-between gap-8 mb-5 xl:ml-[7rem] lg:ml-[5rem]">
      <div className="lg:w-1/2 my-[8rem] w-[80%] m-auto">
        <h2 className="font-bold text-[1.5rem] xl:text-[3.5rem] leading-[2rem] xl:leading-[4rem]">
          The <span className="text-green-500">Ultimate Tool</span> to Boost
          Your Productivity Connect with Tap{" "}
          <span className="text-green-500">Up</span>
        </h2>
        <p className="font-semibold text-[#524E4E] text-sm leading-6 mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
          voluptatem temporibus, animi laborum ratione soluta quo quod iure
          optio sapiente quibusdam molestias minus impedit repellat voluptas
          quam aspernatur dolores autem!
        </p>
        <Button className="uppercase w-[193px] bg-green-500 mt-[27px] font-semibold flex items-center hover:bg-green-700">
          Get a card <HiArrowRightEndOnRectangle className="ml-3 w-4 h-7" />
        </Button>
      </div>
      <div className="lg:w-1/2 w-[70%] m-auto ">
        <Image
          width={630}
          height={550}
          src={tapupImg}
          alt="tap up image"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Hero;
