import Image from "next/image";
import card from "@/public/assets/Cards.png";
import { stepItem } from "@/constants";

const HowItWorks = () => {
  return (
    <section className="py-8 px-4 gap-2 relative overflow-hidden ">
      <div className="absolute md:top-[-10rem] top-[-15rem] md:left-[60%] -z-10 ">
        <div className="relative w-[30rem] h-[20rem]">
          <Image src={card} alt="card image" fill className="object-contain" />
        </div>
      </div>
      <div className="w-full pt-[-4rem]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] leading-tight md:leading-none text-center font-black">
          How It <span className="text-green-600">Works</span>
        </h2>
        <ul className="grid lg:grid-rows-3 mt-6 md:mt-16 md:grid-cols-2 gap-y-12 mx-auto w-full">
          {stepItem.map((item, index) => (
            <li
              key={index}
              className="mx-auto p-4 flex flex-col gap-y-4 border-b w-full max-w-2xl"
            >
              <h3 className="text-xl md:text-2xl">
                <span className="text-green-600 font-bold">
                  Step {index + 1}:
                </span>{" "}
                {item.title}
              </h3>
              <p className="text-lg w-full max-w-lg leading-snug md:leading-8 sm:text-xl mt-2 text-justify">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HowItWorks;
