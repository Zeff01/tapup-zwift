import Image from "next/image";
import cardImg from "@/public/assets/Cards.png";
import { Button } from "../ui/button";
import demoCard from "@/public/assets/tap-up-demo-card.png";
import { tapupLearnMoreList } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";

const AboutTapup = () => {
  return (
    <section className="flex flex-col xl:flex-row py-8 items-center justify-center relative px-4 md:px-16 min-h-[calc(100vh-4.5rem)] overflow-hidden">
      {/* xl:-ml-16 */}
      <div className="relative w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] lg:w-[50rem] lg:h-[50rem]  flex-shrink-0">
        <Image
          src={demoCard}
          alt="Demo Card Image"
          width={519}
          height={436}
          priority
          // sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="absolute top-1/2 -translate-y-1/2 left-0 aspect-square w-full h-full"
        />
      </div>

      <div className="flex mt-8 lg:mt-0">
        <div className="flex flex-col items-center justify-center xl:items-start gap-8 w-full xl:ml-8">
          <span className="w-32 md:w-52">
            <TapupLogo className="aspect-[3.63] w-full h-full" />
          </span>
          <div className="flex xl:flex-col flex-row gap-4 flex-wrap justify-center">
            {tapupLearnMoreList.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`text-${index}`}
                  className="flex items-center bg-accent rounded-lg shadow-sm py-4 pl-4 pr-8 border w-full lg:max-w-[27rem] xl:max-w-xl"
                >
                  <Icon className="size-6 text-green-600 mr-4 flex-shrink-0" />
                  <p className="text-lg leading-snug md:leading-8 sm:text-xl text-justify">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
          <Button className="bg-green-600 hover:bg-green-700 w-36 mt-5  font-semibold uppercase ">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutTapup;
