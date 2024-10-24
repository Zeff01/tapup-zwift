import Image from "next/image";
import cardImg from "@/public/assets/Cards.png";
import { Button } from "../ui/button";
import demoCard from "@/public/assets/tap-up-demo-card.png";

const AboutTapup = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:justify-center items-center py-[79px] shadow-xl">
      <div className="w-[50%] lg:relative right-[15%] top-[-10rem]">
        <Image src={cardImg} alt="Tap up card Image" loading="lazy" />
      </div>
      <div className="flex flex-col gap-3 w-[40%]">
        <h2 className="text-4xl lg:text-[3rem] font-semibold italic font-sans">
          Tap<span className="text-green-600"> Up</span>
        </h2>
        <p className="text-xs lg:text-base text-[#524E4E] leading-[28px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </p>
        <p className="text-xs lg:text-base text-[#524E4E] leading-[28px]">
          Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod it
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </p>
        <p className="text-xs lg:text-base text-[#524E4E] leading-[28px]">
          Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </p>
        <Button className="bg-green-500 hover:bg-green-700 w-[11rem] font-bold uppercase ">
          Learn More
        </Button>
        <Image src={demoCard} alt="Demo Card Image" loading="lazy" />
      </div>
    </section>
  );
};

export default AboutTapup;
