import React from "react";
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

const templates = [
  {
    id: 1,
    name: "Plain White",
    description: "Basic Style",
    imageUrl: "/path/to/default.jpg",
    route: "/create/template/1",
  },
  {
    id: 2,
    name: "Plain Black",
    description: "Minimalist Style",
    imageUrl: "/path/to/minimalist.jpg",
    route: "/create/template/2",
  },
  {
    id: 3,
    name: "Viper",
    description: "Modern Style",
    imageUrl: "/path/to/modern.jpg",
    route: "/create/template/3",
  },
  {
    id: 4,
    name: "Minimalist",
    description: "Modern Style",
    imageUrl: "/path/to/modern.jpg",
    route: "/create/template/4",
  },
  {
    id: 5,
    name: "Floral",
    description: "Modern Style",
    imageUrl: "/path/to/modern.jpg",
    route: "/create/template/5",
  },
];

export function TemplateCarousel() {
  return (
    <div className="border-2 border-green-500">
      <h1 className="text-lg font-semibold mb-6">Choose Templates</h1>

      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-screen-lg mx-auto overflow-hidden"
      >
        <CarouselContent className="flex justify-start items-center">
          {templates.map((template) => (
            <CarouselItem key={template.id} className="flex-none w-1/2 p-2">
              <Link href={template.route} passHref>
                <div className="block transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Card className="h-full w-full bg-gray-800 rounded-lg overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center p-4 text-white">
                      <Image
                        src={template.imageUrl}
                        alt={template.name}
                        width={200}
                        height={120}
                        className="rounded-md"
                        layout="responsive"
                      />
                      <h3 className="text-xl font-semibold mt-2">
                        {template.name}
                      </h3>
                      <p>{template.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
