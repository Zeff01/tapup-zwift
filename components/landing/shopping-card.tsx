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
import { cardItems } from "@/constants";

const ShoppingCard = () => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString();
  };

  return (
    <section className="py-8 lg:py-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5vw] leading-tight md:leading-none text-center font-black">
        Shopping Card
      </h2>
      <div className="lg:mt-[6rem] mt-10 flex flex-wrap w-full max-w-7xl relative justify-center gap-8 mx-auto">
        {cardItems.map((item, index) => (
          <Card
            key={index}
            className="border overflow-hidden rounded-lg md:w-[24rem] w-[18rem] shadow-md justify-center"
          >
            <CardHeader className="relative w-full aspect-video p-0 mt-2">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="py-4">
              <CardTitle className="text-lg font-bold">{item.title}</CardTitle>
              <CardDescription className="mt-2 h-20 overflow-y-auto no-scrollbar">
                <ExpandableText descriptionLength={90}>
                  {item.description}
                </ExpandableText>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between py-4 items-center border-t">
              <span className="lg:text-3xl text-xl">
                &#x20B1;{formatPrice(item.price)}
              </span>
              <Button className="bg-green-600">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ShoppingCard;
