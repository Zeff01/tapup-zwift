import Image from "next/image";
import card from "@/public/assets/Cards.png";

const stepItem = [
  {
    title: "Step 1: Sign Up",
    description:
      "Create an account in a few simple steps.Just enter your basic details and you're ready to go!",
  },
  {
    title: "Step 2: Choose Your Card Type",
    description:
      "Select from a variety of customizable card templates designed to fit your needs.",
  },
  {
    title: "Step 3: Customize Your Card Type",
    description:
      "Personalized your card by adding text, image and other design elements.",
  },
  {
    title: "Step 4: Preview & Save",
    description:
      "Once you're happy with the design, preview the card to make sure everything looks perfect.",
  },
  {
    title: "Step 5: Share or Print",
    description:
      "You can now share your card digitally or print it out for physical use",
  },
  {
    title: "Step 6: Share or Print",
    description:
      "You can now share your card digitally or print it out for physical use",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-[5rem] px-4 shadow-xl gap-2 relative overflow-hidden">
      <div className="absolute md:top-[-10rem] top-[-15rem] md:left-[60%] -z-10 ">
        <div className="relative w-[30rem] h-[20rem]">
          <Image src={card} alt="card image" fill className="object-contain" />
        </div>
      </div>
      <div className="w-full pt-[-4rem]">
        <h2 className="text-4xl text-center uppercase italic font-racing mb-8 z-99">
          How It <span className="text-green-600">Works</span>
        </h2>

        <ul className=" grid lg:grid-rows-3 lg:grid-flow-col  gap-y-12 mx-auto w-full">
          {stepItem.map((item, index) => (
            <li
              key={index}
              className="xl:w-[34rem]  w-[15rem] md:w-[30rem] mx-auto p-4 flex flex-col gap-y-4  shadow-xl"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="font-inter text-base 2xl:text-xl  leading-6">
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
