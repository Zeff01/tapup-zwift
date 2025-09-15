import { ChosenTemplateType } from "@/components/forms/CardsAndUsersCreateFields";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Template {
  id: ChosenTemplateType;
  name: string;
  imageUrl: string;
  category?: string;
}

const templates: Template[] = [
  {
    id: "template1",
    name: "Plain White",
    imageUrl: "/assets/template1.png",
    category: "Minimal",
  },
  {
    id: "template2",
    name: "Plain Black",
    imageUrl: "/assets/template2.png",
    category: "Minimal",
  },
  {
    id: "template3",
    name: "Viper",
    imageUrl: "/assets/template3.png",
    category: "Modern",
  },
  {
    id: "template4",
    name: "Minimalist",
    imageUrl: "/assets/template4.png",
    category: "Minimal",
  },
  {
    id: "template5",
    name: "Floral",
    imageUrl: "/assets/template5.png",
    category: "Creative",
  },
  {
    id: "template6",
    name: "Simple White",
    imageUrl: "/assets/template6.png",
    category: "Minimal",
  },
  {
    id: "template7",
    name: "Social Blue",
    imageUrl: "/assets/template7.png",
    category: "Modern",
  },
  {
    id: "template8",
    name: "Connect",
    imageUrl: "/assets/template8.png",
    category: "Creative",
  },
  {
    id: "template9",
    name: "Business",
    imageUrl: "/assets/template9.png",
    category: "Professional",
  },
  {
    id: "template10",
    name: "Purple Aura",
    imageUrl: "/assets/template10.png",
    category: "Creative",
  },
  {
    id: "template11",
    name: "Sky",
    imageUrl: "/assets/template11.png",
    category: "Modern",
  },
  {
    id: "template12",
    name: "Dairy Green",
    imageUrl: "/assets/template12.png",
    category: "Nature",
  },
  {
    id: "template13",
    name: "Urban Professional",
    imageUrl: "/assets/template13.png",
    category: "Creative",
  },
  {
    id: "template15",
    name: "Neon Network",
    imageUrl: "/assets/template15.png",
    category: "Modern",
  },
  {
    id: "template16",
    name: "Obsidian",
    imageUrl: "/assets/template16.png",
    category: "Creative",
  },
  {
    id: "template17",
    name: "Designer Brand",
    imageUrl: "/assets/template17.png",
    category: "Professional",
  },
  {
    id: "template18",
    name: "Ocean Depth",
    imageUrl: "/assets/template18.png",
    category: "Nature",
  },
];

interface TemplateGridProps {
  selectedTemplateId: ChosenTemplateType;
  setSelectedTemplateId: (id: ChosenTemplateType) => void;
}

export function TemplateGrid({
  selectedTemplateId,
  setSelectedTemplateId,
}: TemplateGridProps) {
  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Choose a Template</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplateId(template.id)}
            className={cn(
              "relative cursor-pointer group transition-all duration-200",
              "hover:scale-105 hover:shadow-lg",
              selectedTemplateId === template.id && "scale-105"
            )}
          >
            <Card
              className={cn(
                "overflow-hidden border-2 transition-all",
                selectedTemplateId === template.id
                  ? "border-green-500 shadow-lg"
                  : "border-transparent hover:border-gray-300"
              )}
            >
              <CardContent className="p-0">
                {/* Template Image */}
                <div className="relative aspect-[9/16] bg-gray-100">
                  <Image
                    src={template.imageUrl}
                    alt={template.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />

                  {/* Selected Indicator */}
                  {selectedTemplateId === template.id && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity",
                      selectedTemplateId === template.id
                        ? "opacity-0"
                        : "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <p className="text-white font-medium">Click to Select</p>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-2 bg-white">
                  <h3 className="text-xs font-semibold text-center text-black">
                    {template.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        💡 Tip: Click on any template to see a live preview of your card
      </p>
    </div>
  );
}
