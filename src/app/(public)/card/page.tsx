"use client";
//import TapUpCarousel from "@/components/landing/carouselCard";
import { Button } from "@/components/ui/button";
import { carouselCards } from "@/constants";
import { useCart } from "@/hooks/use-cart-v2";
import { cn, formatCurrency } from "@/lib/utils";
import { useUserContext } from "@/providers/user-provider";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";

//prevent mismatch during the first render
const TapUpCarousel = dynamic(
  () => import("../../../../components/landing/carouselCard"),
  {
    ssr: false,
  }
);

const CardPurchasePreviewPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParamsTitle = searchParams.get("title");
  const { addItem } = useCart();

  const { user } = useUserContext();

  const [title, setTitle] = useState(queryParamsTitle);

  const handleSetTitle = (title: string) => {
    setTitle(title);
    window.history.pushState({}, "", `/card?title=${title}`);
  };

  const card =
    Object.values(carouselCards).find((card) => card.title === title) || null;

  return (
    <React.Fragment>
      <section className="w-full max-w-[calc(80rem+6rem)] px-4 md:px-10 mx-auto py-8">
        <article key={title} className="flex flex-col md:flex-row gap-x-8">
          <figure className="relative aspect-[1.601] w-full md:w-[28rem] lg:w-[40rem] shrink-0">
            <Image
              src={card?.image as string}
              alt={`${card?.title}-image`}
              fill
              className="object-contain size-full"
            />
          </figure>
          <div className="flex-1 flex flex-col mt-8 md:mt-0">
            <h1 className="text-xl lg:text-4xl font-bold w-full">
              {card?.title}
            </h1>
            <p className="text-sm lg:text-xl mt-2 md:mt-4">
              {card?.description}
            </p>
            <div className="flex flex-col mt-auto">
              <h1 className="mt-2 lg:text-3xl italic">
                {formatCurrency(card?.price as number)}
              </h1>
              <div className="flex gap-4 mt-4 w-full max-w-64 flex-wrap">
                {Object.values(carouselCards).map((cardItem, i) => (
                  <div
                    key={`card-${i}`}
                    className={cn(
                      "size-4 relative cursor-pointer  rounded-full",
                      {
                        "outline-offset-1 outline outline-2":
                          title === cardItem.title,
                      }
                    )}
                    onClick={() => handleSetTitle(cardItem.title)}
                  >
                    <Image
                      src={cardItem.image as string}
                      alt={`card-thumbnail-${i}`}
                      fill
                      className="object-fill size-full rounded-full"
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-x-2 mt-4">
                <Button
                  variant={"green"}
                  className="min-w-fit text-xs lg:text-base lg:w-36 text-white"
                  onClick={() => {
                    addItem({
                      id: card?.id.replace(/-/g, "") || "",
                      name: card?.title || "",
                      price: card?.price || 0,
                      image: card?.image || "",
                    });
                    router.push(user ? "/cards/checkout" : "/delivery-form");
                  }}
                >
                  Buy Now
                  <BiSolidPurchaseTag />
                </Button>
                <Button
                  className="bg-grayTemplate min-w-fit text-xs lg:text-base lg:w-36 hover:bg-gray-400"
                  onClick={() =>
                    addItem({
                      id: card?.id.replace(/-/g, "") || "",
                      name: card?.title || "",
                      price: card?.price || 0,
                      image: card?.image || "",
                    })
                  }
                >
                  Add to Cart <Plus />
                </Button>
              </div>
            </div>
          </div>
        </article>
      </section>
      <div className="md:block hidden">
        <TapUpCarousel viewCard onChange={handleSetTitle} />
      </div>
    </React.Fragment>
  );
};

export default CardPurchasePreviewPage;
