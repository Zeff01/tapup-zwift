import amazon from "@/public/assets/amazon-gray.png";
import pay from "@/public/assets/pay-gray.png";
import paypal from "@/public/assets/paypal-gray.png";
import Image from "next/image";

const businessList = [amazon, pay, paypal, amazon, pay, paypal];

const FeaturedBusiness = () => {
  return (
    <section className="bg-[#1FAE3A33] py-11">
      <div className="h-[155px]">
        <h4 className="text-center uppercase font-inter text-2xl tracking-widest">
          trusted by 30+ businesses
        </h4>

        <div className="flex justify-evenly items-center">
          {businessList.map((item, index) => (
            <Image
              src={item}
              key={index}
              alt={`image ${index}`}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusiness;
