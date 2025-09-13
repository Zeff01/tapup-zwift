import { ChosenTemplateType } from "@/components/forms/CardsAndUsersCreateFields";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Template {
  id: ChosenTemplateType;
  name: string;
  imageUrl: string;
  category: string;
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
  // {
  //   id: "template8",
  //   name: "Simple White",
  //   imageUrl: "/assets/template6.png",
  //   category: "Minimal",
  // },
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

interface TemplateTabsProps {
  selectedTemplateId: ChosenTemplateType;
  setSelectedTemplateId: (id: ChosenTemplateType) => void;
}

export function TemplateTabs({
  selectedTemplateId,
  setSelectedTemplateId,
}: TemplateTabsProps) {
  // Group templates by category
  const categories = Array.from(new Set(templates.map(t => t.category)));
  const templatesByCategory = categories.reduce((acc, category) => {
    acc[category] = templates.filter(t => t.category === category);
    return acc;
  }, {} as Record<string, Template[]>);

  // Find the current template's category
  const currentTemplate = templates.find(t => t.id === selectedTemplateId);
  const currentCategory = currentTemplate?.category || categories[0];

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Choose a Template</h1>

      <Tabs defaultValue={currentCategory} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4 h-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category}
              <span className="ml-1 text-xs">
                ({templatesByCategory[category].length})
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {templatesByCategory[category].map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplateId === template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <p className="text-xs text-gray-500 mt-4 text-center">
        💡 Tip: Templates are organized by style. Click any template to preview your card
      </p>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onClick: () => void;
}

function TemplateCard({ template, isSelected, onClick }: TemplateCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer group transition-all duration-200",
        "hover:scale-105 hover:shadow-lg",
        isSelected && "scale-105"
      )}
    >
      <Card
        className={cn(
          "overflow-hidden border-2 transition-all",
          isSelected
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
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />

            {/* Selected Indicator */}
            {isSelected && (
              <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className={cn(
              "absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity",
              isSelected ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            )}>
              <p className="text-white font-medium text-sm">Click to Select</p>
            </div>
          </div>

          {/* Template Name */}
          <div className="p-2 bg-white">
            <h3 className="text-sm font-medium text-center">
              {template.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}