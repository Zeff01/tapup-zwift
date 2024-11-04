import { Button } from "../ui/button";
import { HiArrowRightEndOnRectangle } from "react-icons/hi2";

interface CardDetailsProps {
  title: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({ title }) => {
  return (
    <section className="mt-[2rem]  mx-auto w-[80vw]">
      <h2 className="text-center text-3xl font-inter uppercase text-[#3B3636]">
        {title}
      </h2>
      <p className="pt-[3rem] text-xl text-justify md:text-2xl text-[#524E4E] items-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        consectetur adipiscing elit, sed do tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim incididunt ut labore et dolore
        magna adipiscing elit, sed do eiusmod consectetur adipiscing elit, sed
        do dolore magna aliqua. Ut enim ad minim et dolore magna aliqua. Ut enim
        ad minim incididunt ut labore et dolore magna consectetur adipiscing
        elit
      </p>
      <p className="pt-[3rem] text-xl text-justify md:text-2xl text-[#524E4E] items-center">
        ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        consectetur adipiscing elit, sed do sed adipiscing elit, sed do eiusmod
        consectetur adipiscing elit, sed do dolore magna aliqua. Ut enim ad
        minim labore et dolore magna consectetur adipiscing elit Ut enim ad
        minim incididunt ut labore et dolore magna
      </p>
      <Button className="uppercase w-[193px] bg-green-500 mt-[4rem] font-semibold flex items-center hover:bg-green-700">
        Get a card <HiArrowRightEndOnRectangle className="ml-3 w-4 h-7" />
      </Button>
    </section>
  );
};

export default CardDetails;
