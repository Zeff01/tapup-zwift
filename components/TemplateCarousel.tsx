import { ChosenTemplateType } from "@/components/forms/CardsAndUsersCreateFields";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

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
  // {
  //   id: "template8",
  //   name: "wendel White",
  //   imageUrl: "/assets/template8.png",
  //   route: "/create/template/8",
  // },
  {
    id: "template9",
    name: "Business",
    imageUrl: "/assets/template9.png",
    route: "/create/template/9",
  },
  {
    id: "template10",
    name: "Purple Aura",
    imageUrl: "/assets/template10.png",
    route: "/create/template/10",
  },
  {
    id: "template11",
    name: "Sky",
    imageUrl: "/assets/template11.png",
    route: "/create/template/11",
  },
  {
    id: "template12",
    name: "Dairy Green",
    imageUrl: "/assets/template12.png",
    route: "/create/template/12",
  },
  {
    id: "template13",
    name: "Urban Professional",
    imageUrl: "/assets/template13.png",
    route: "/create/template/13",
  },
  {
    id: "template15",
    name: "Neon Network",
    imageUrl: "/assets/template15.png",
    route: "/create/template/15",
  },
  {
    id: "template16",
    name: "Obsidian",
    imageUrl: "/assets/template16.png",
    route: "/create/template/16",
  },
  {
    id: "template17",
    name: "Designer Brand",
    imageUrl: "/assets/template17.png",
    route: "/create/template/17",
  },
  {
    id: "template18",
    name: "Ocean Depth",
    imageUrl: "/assets/template18.png",
    route: "/create/template/18",
  },
  // {
  //   id: "template14",
  //   name: "template14",
  //   imageUrl: "/assets/template14.png",
  //   route: "/create/template/14",
  // },
  // {
  //   id: "template7",
  //   name: "Simple White",
  //   imageUrl: "/assets/template6.png",
  //   route: "/create/template/7",
  // },

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
        opts={{ align: "start", dragFree: true, containScroll: false }}
        className="w-full max-w-screen-lg mx-auto overflow-hidden "
      >
        <CarouselContent className="flex justify-start items-center  px-4">
          {templates.map((template) => (
            <CarouselItem key={template.id} className="flex-none w-1/2 p-2">
              <div
                className={`block transform hover:scale-105 transition-transform duration-300 cursor-pointer  ${selectedTemplateId === template.id
                  ? "outline outline-4 rounded-lg outline-green-500"
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
