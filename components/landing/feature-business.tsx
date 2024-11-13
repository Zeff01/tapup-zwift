import { businessList } from "@/constants";
import Image from "next/image";

const FeaturedBusiness = () => {
  return (
    <section className="bg-gradient-to-tr from-[#a0ffbd] to-white py-8">
      <div className="">
        <h4 className="text-center uppercase font-inter text-2xl tracking-widest text-custom-black">
          trusted by 30+ businesses
        </h4>

        <div className="flex justify-evenly items-center">
          {businessList.map((item, index) => (
            <div
              key={index}
              className="relative md:w-[10rem] md:h-[6rem] h-[4rem] w-[8rem]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusiness;
