import Image from "next/image";
import demoCard from "@/public/assets/tap-up-demo-card.png";
import { tapupLearnMoreList } from "@/constants";
import TapupLogo from "../svgs/TapupLogo";
import Check from "../svgs/Check";

const AboutTapup = () => {
  return (
    <section className="pb-8" id="features">
      <div className="flex justify-center items-center">
        <h2 className="text-center md:text-5xl font-bold font-inter text-3xl">
          Power up with{" "}
        </h2>
        <TapupLogo className="md:w-[10rem] md:h-[6rem] w-[6rem] h-[3.5rem] ml-3" />
      </div>
      <div className="flex flex-col xl:flex-row py-8 items-center justify-center relative px-4 md:px-16 min-h-[calc(100vh-4.5rem)] overflow-hidden">
        {/* xl:-ml-16 */}
        <div className="relative w-[28rem] h-[28rem] md:w-[40rem] md:h-[40rem] lg:w-[45rem] lg:h-[45rem]  flex-shrink-0">
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
            <div className="flex xl:flex-col flex-row gap-4 flex-wrap justify-center">
              {tapupLearnMoreList.map((item, index) => {
                return (
                  <div
                    key={`text-${index}`}
                    className="flex items-center gap-4  rounded-lg  py-4 pl-4 pr-8  w-full lg:max-w-[27rem] xl:max-w-2xl"
                  >
                    {/* <Icon className="size-12 text-green-600 mr-4 flex-shrink-0" /> */}
                    <Check className="w-[6rem]" />
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">
                        {item.title}
                      </h2>
                      <p className="text-lg leading-snug md:leading-8 sm:text-xl text-justify text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTapup;
