import Image, { StaticImageData } from "next/image";
import tapUpCard from "@/public/assets/tapUp-card1.png";
import tapUpCard2 from "@/public/assets/tapUp-card2.png";
import tapUpCard3 from "@/public/assets/tapUp-card3.png";
import tapUpCard4 from "@/public/assets/tapUp-card4.png";
import tapUpCard5 from "@/public/assets/tapUp-card5.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import ExpandableText from "../ExpandableText";

interface CardItem {
  image: StaticImageData;
  title: string;
  description: string;
  price: number;
}

const cardItems: CardItem[] = [
  {
    image: tapUpCard,
    title: "Standard Black Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    image: tapUpCard2,
    title: "Standard Yellow Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    image: tapUpCard3,
    title: "Standard Light Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 4000,
  },
  {
    image: tapUpCard4,
    title: "Standard Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 2500,
  },
  {
    image: tapUpCard5,
    title: "Standard White Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3600,
  },
  {
    image: tapUpCard2,
    title: "Standard Yellow Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
];

const ShoppingCard = () => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString();
  };

  return (
    <section className="py-[4rem] shadow-xl">
      <h2 className="text-center italic font-medium font-inter text-[2.5rem]">
        Shopping Card
      </h2>
      <div className="mt-[6rem] flex flex-wrap justify-center gap-7">
        {cardItems.map((item, index) => (
          <Card
            key={index}
            className="border rounded-lg shadow-md lg:w-[384px] w-[250px] justify-center"
          >
            <CardHeader className="p-0">
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={300}
                loading="lazy"
                className="w-[70rem] h-[15rem] p-0"
              />
              <CardTitle className="text-lg font-bold mt-2 ml-4">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4">
              <CardDescription className="text-xs">
                <ExpandableText descriptionLength={100}>
                  {item.description}
                </ExpandableText>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between pt-5">
              <span className="lg:text-3xl text-xl font-semibold">
                &#x20B1;{formatPrice(item.price)}
              </span>
              <Button className="bg-[#575E59]">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ShoppingCard;
