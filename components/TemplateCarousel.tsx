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
import { ChosenTemplateType } from "@/components/forms/CardsAndUsersCreateFields";
import { EyeIcon } from "lucide-react";

interface Template {
  id: ChosenTemplateType;
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
  {
    id: "template6",
    name: "Simple White",
    imageUrl: "/assets/template6.png",
    route: "/create/template/6",
  },
  {
    id: "template7",
    name: "Simple White",
    imageUrl: "/assets/template6.png",
    route: "/create/template/7",
  },
  {
    id: "template8",
    name: "Simple White",
    imageUrl: "/assets/template6.png",
    route: "/create/template/8",
  },
  {
    id: "template9",
    name: "Simple White",
    imageUrl: "/assets/template9.png",
    route: "/create/template/6",
  },
  {
    id: "template10",
    name: "Simple White",
    imageUrl: "/assets/template10.png",
    route: "/create/template/6",
  },
];

interface TemplateCarouselProps {
  selectedTemplateId: ChosenTemplateType;
  setSelectedTemplateId: (id: ChosenTemplateType) => void;
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
                    <div className="flex items-center gap-4 mt-2">
                      <div
                        className="bg-green-600 text-white py-1 px-2 text-xs rounded hover:bg-green-700"
                        onClick={() => setSelectedTemplateId(template.id)}
                      >
                        Select
                      </div>
                      <Link
                        href={`/create/template/${template.id}`}
                        passHref
                        className="flex items-center hover:text-white/70 duration-300"
                        target="_blank"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                    </div>
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
