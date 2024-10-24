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
    <section className="py-[5rem] px-4 shadow-xl relative overflow-hidden">
      <div className="absolute lg:top-[-30%] lg:right-[-15%] md:top-[-15%] md:right-[-35%] top-[-18%] -z-10 w-[35rem]">
        <Image src={card} alt="card image" loading="lazy" className="z-1" />
      </div>
      <h2 className="text-4xl text-center uppercase italic font-racing mb-8 z-99">
        How It <span className="text-green-600">Works</span>
      </h2>
      <ul className=" grid lg:grid-rows-3 lg:grid-flow-col  gap-y-12 mx-auto w-full">
        {stepItem.map((item, index) => (
          <li
            key={index}
            className="xl:w-[34rem]  w-[15rem] md:w-[30rem] mx-auto p-2 shadow-xl"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="font-inter text-xl pt-3">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default HowItWorks;
