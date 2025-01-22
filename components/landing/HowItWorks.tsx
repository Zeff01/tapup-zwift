import Image from "next/image";
import card from "@/public/assets/Cards.png";
import { stepItem } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";

const HowItWorks = () => {
  return (
    <section
      className="py-8 px-4 gap-2 relative overflow-hidden "
      id="quickguide"
    >
      <div className="absolute md:top-[-10rem] top-[-17em] md:left-[65%] -z-5 ">
        <div className="relative w-[30rem] h-[20rem]">
          <Image src={card} alt="card image" fill className="object-contain" />
        </div>
      </div>
      <div className="w-full pt-[-4rem]">
        <div className="flex items-center justify-center gap-3 font-inter mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4vw] leading-tight md:leading-none text-center font-bold  z-20">
            How
          </h2>
          <TapupLogo className="xl:w-[13rem] xl:h-[5rem] md:w-[9rem] md:h-[4rem] w-[6rem] h-[3rem] md:mx-2 2xl:w-[17rem] 2xl:h-[10rem]" />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[4vw] leading-tight md:leading-none text-center font-bold">
            works
          </span>
        </div>
        <ul className="grid lg:grid-rows-3 mt-6 md:mt-16 md:grid-cols-2 gap-x-4 gap-y-12 mx-auto w-full">
          {stepItem.map((item, index) => (
            <li
              key={index}
              className="mx-auto p-4 flex items-center gap-4 border w-full max-w-xl"
            >
              <h3 className="text-xl md:text-6xl font-bold">
                <span className="text-checkColor font-bold">{index + 1}</span>
              </h3>
              <div>
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="text-lg w-full max-w-lg leading-snug md:leading-8 sm:text-xl mt-2 text-justify text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HowItWorks;
