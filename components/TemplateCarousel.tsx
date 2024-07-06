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
    name: "Default",
    description: "Basic Style",
    imageUrl: "/path/to/default.jpg",
    route: "/template1",
  },
  {
    id: 2,
    name: "Minimalist",
    description: "Minimalist Style",
    imageUrl: "/path/to/minimalist.jpg",
    route: "/template2",
  },
  {
    id: 3,
    name: "Modern",
    description: "Modern Style",
    imageUrl: "/path/to/modern.jpg",
    route: "/template3",
  },
];

export function TemplateCarousel() {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full max-w-screen-lg mx-auto overflow-hidden"
    >
      <CarouselContent className="flex justify-start items-center">
        {templates.map((template) => (
          <CarouselItem
            key={template.id}
            className="flex-none w-1/2 p-2" // Ensure this matches the expected width
          >
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
  );
}
