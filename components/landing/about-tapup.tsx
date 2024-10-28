import Image from "next/image";
import cardImg from "@/public/assets/Cards.png";
import { Button } from "../ui/button";
import demoCard from "@/public/assets/tap-up-demo-card.png";

const AboutTapup = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center lg:py-[79px] py-[3rem] shadow-xl">
      <div className="xl:w-[50%] lg:h-[70vh]  md:h-[50vh] h-[20vh] w-[60%] relative lg:right-[15%]">
        <Image src={cardImg} alt="Tap up card Image" fill className="object-cover"/>
      </div>
      <div className="flex flex-col gap-3 lg:w-[40%] w-[60vw]">
        <h2 className="text-4xl lg:text-[3rem] font-semibold italic font-sans pb-3">
          Tap<span className="text-green-600"> Up</span>
        </h2>
        <p className="text-base text-justify text-[#524E4E] leading-[28px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </p>
        <p className="text-base text-justify text-[#524E4E] leading-[28px]">
          Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod it
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </p>
        <p className="text-base text-justify text-[#524E4E] leading-[28px]">
          Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        </p>
        <Button className="bg-green-500 hover:bg-green-700 w-[11rem] font-bold uppercase ">
          Learn More
        </Button>
        <div className="relative w-[60vw] aspect-video lg:w-[30vw] h-[14rem]">
        <Image src={demoCard} alt="Demo Card Image" fill className="object-contain" />
        </div>
      </div>
    </section>
  );
};

export default AboutTapup;
