import Image from "next/image";
import { Button } from "../ui/button";
import tapupImg from "@/public/assets/Cards.png";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-between gap-8 mb-5 lg:pl-[5rem]">
      <div className="xl:w-1/2 lg:w-[40rem] lg:pt-[5rem] lg:px-0 px-10 pt-10 w-full">
        <h2 className="font-bold md:text-[2rem] text-xl xl:text-[3.5rem] leading-[2rem] xl:leading-[4rem]">
          The <span className="text-green-500">Ultimate Tool</span> to Boost
          Your Productivity Connect with Tap{" "}
          <span className="text-green-500">Up</span>
        </h2>
        <p className="text-base 2xl:text-xl  leading-6 mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
          voluptatem temporibus, animi laborum ratione soluta quo quod iure
          optio sapiente quibusdam molestias minus impedit repellat voluptas
          quam aspernatur dolores autem!
        </p>
        <Button className="uppercase w-[193px] bg-green-500 mt-[27px] font-semibold flex items-center hover:bg-green-700">
          Get a card <HiArrowRightEndOnRectangle className="ml-3 w-4 h-7" />
        </Button>
      </div>
      <div className="md:w-[34rem] 2xl:h-[40rem] md:h-[30rem] w-[18rem] h-[20rem] aspect-square relative m-auto ">
        <Image
          src={tapupImg}
          alt="tap up image"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
