import amazon from "@/public/assets/amazon-gray.png";
import pay from "@/public/assets/pay-gray.png";
import paypal from "@/public/assets/paypal-gray.png";
import Image from "next/image";

const businessList = [
  {
    title: "Amazon",
    image: "/assets/amazon-gray.png",
  },
  {
    title: "Pay",
    image: "/assets/pay-gray.png",
  },
  {
    title: "Paypal",
    image: "/assets/paypal-gray.png",
  },
];

const FeaturedBusiness = () => {
  return (
    <section className="bg-gradient-to-tr  from-[#1AA845] to-white py-8">
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
