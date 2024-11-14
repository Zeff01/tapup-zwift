import { businessList } from "@/constants";
import Image from "next/image";

const FeaturedBusiness = () => {
  return (
    <section className="bg-gradient-to-tr from-[#a0ffbd] to-white py-8">
      <div className="">
        <h4 className="text-center uppercase font-inter text-lg md:text-2xl tracking-widest text-custom-black">
          trusted by <br /> 30+ businesses
        </h4>

        <div className="flex justify-evenly items-center mt-6">
          {businessList.map((item, index) => (
            <div
              key={index}
              className="relative md:w-[10rem] md:h-[6rem] h-[2rem] w-[6rem]"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={175}
                height={100}
                priority
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusiness;
