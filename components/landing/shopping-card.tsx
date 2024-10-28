import Image from "next/image";
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
  image: string;
  title: string;
  description: string;
  price: number;
}

const cardItems: CardItem[] = [
  {
    image: "/assets/tapUp-card1.png",
    title: "Standard Black Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    image: "/assets/tapUp-card2.png",
    title: "Standard Yellow Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj sed do eiusmod tempor incididunt elweofsaj ",
    price: 3000,
  },
  {
    image: "/assets/tapUp-card3.png",
    title: "Standard Light Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 4000,
  },
  {
    image: "/assets/tapUp-card4.png",
    title: "Standard Blue Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 2500,
  },
  {
    image: "/assets/tapUp-card5.png",
    title: "Standard White Card",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt elweofsaj ",
    price: 3600,
  },
  {
    image: "/assets/tapUp-card2.png",
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
      <div className="lg:mt-[6rem] mt-10 flex flex-wrap relative justify-center gap-7">
        {cardItems.map((item, index) => (
          <Card
            key={index}
            className="border rounded-lg md:w-[24rem] w-[18rem] shadow-md justify-center"
          >
            <CardHeader className="relative w-full aspect-video p-0 mt-2">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="p-0">
              <CardTitle className="text-lg font-bold mt-2 px-5">
                {item.title}
              </CardTitle>
              <CardDescription className="text-xs px-4">
                <ExpandableText descriptionLength={100}>
                  {item.description}
                </ExpandableText>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between pt-5 px-4">
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
