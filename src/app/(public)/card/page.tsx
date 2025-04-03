"use client";
import TapUpCarousel from "@/components/landing/carouselCard";
import { Button } from "@/components/ui/button";
import { carouselCards } from "@/constants";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSolidPurchaseTag } from "react-icons/bi";

const CardPurchasePreviewPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParamsTitle = searchParams.get("title");

  const [title, setTitle] = useState(queryParamsTitle);

  const handleSetTitle = (title: string) => {
    setTitle(title);
    router.push(`/card?title=${title}`);
  };

  const card =
    Object.values(carouselCards).find((card) => card.title === title) || null;

  return (
    <React.Fragment>
      <section className="w-full max-w-[calc(80rem+6rem)] px-10 mx-auto py-8">
        <article key={title} className="flex gap-x-8">
          <figure className="relative aspect-[1.601] w-[40rem] shrink-0">
            <Image
              src={card?.image as string}
              alt={`${card?.title}-image`}
              fill
              className="object-contain size-full"
            />
          </figure>
          <div className="flex-1 flex flex-col">
            <h1 className="text-4xl font-bold w-full">{card?.title}</h1>
            <p className="text-xl mt-4">{card?.description}</p>
            <div className="flex gap-x-2 mt-auto">
              <Button className="bg-greenColor text-white min-w-fit w-36 hover:bg-hoverColor">
                Buy Now
                <BiSolidPurchaseTag />
              </Button>
              <Button className="bg-grayTemplate min-w-fit w-36 hover:bg-gray-400">
                Add to Card <Plus />
              </Button>
            </div>
          </div>
        </article>
      </section>
      <TapUpCarousel viewCard onChange={handleSetTitle} />
    </React.Fragment>
  );
};

export default CardPurchasePreviewPage;
