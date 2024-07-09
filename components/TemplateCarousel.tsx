import React, { useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  route: string;
}

const templates: Template[] = [
  {
    id: "template1",
    name: "Plain White",
    imageUrl: "/assets/template1.png",
    route: "/create/template/1",
  },
  {
    id: "template2",
    name: "Plain Black",
    imageUrl: "/assets/template2.png",
    route: "/create/template/2",
  },
  {
    id: "template3",
    name: "Viper",
    imageUrl: "/assets/template3.png",
    route: "/create/template/3",
  },
  {
    id: "template4",
    name: "Minimalist",
    imageUrl: "/assets/template4.png",
    route: "/create/template/4",
  },
  {
    id: "template5",
    name: "Floral",
    imageUrl: "/assets/template5.png",
    route: "/create/template/5",
  },
];

interface TemplateCarouselProps {
  selectedTemplateId: number;
  setSelectedTemplateId: (id: number) => void;
}

export function TemplateCarousel({
  selectedTemplateId,
  setSelectedTemplateId,
}: TemplateCarouselProps) {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Choose Templates</h1>

      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-screen-lg mx-auto overflow-hidden "
      >
        <CarouselContent className="flex justify-start items-center  px-4">
          {templates.map((template) => (
            <CarouselItem key={template.id} className="flex-none w-1/2 p-2">
              <div
                className={`block transform hover:scale-105 transition-transform duration-300 cursor-pointer  ${
                  selectedTemplateId === template.id
                    ? "border-2 rounded-lg border-green-500"
                    : ""
                }`}
                onClick={() => setSelectedTemplateId(template.id)}
              >
                <Card className="bg-black rounded-lg overflow-hidden border-none">
                  <CardContent className="flex flex-col items-center justify-center p-2 text-white">
                    <Image
                      src={template.imageUrl}
                      alt={template.name}
                      width={200}
                      height={200}
                      className="rounded-md h-full w-full object-cover"
                      layout="responsive"
                    />
                    <h3 className="text-sm font-semibold mt-2">
                      {template.name}
                    </h3>
                    <Link href={`create/template/${template.id}`} passHref>
                      <button className="mt-2 bg-green-500 text-white py-1 px-2 text-xs rounded hover:bg-green-600">
                        Preview
                      </button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
