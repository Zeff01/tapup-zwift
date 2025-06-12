"use client";

// Assume that you have different components for each template:
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Template6 from "@/components/templates/Template6";
import Template7 from "@/components/templates/Template7";
import Template8 from "@/components/templates/Template8";
import Template9 from "@/components/templates/Template9";
import Template10 from "@/components/templates/Template10";
import Template11 from "@/components/templates/Template11";
import Template12 from "@/components/templates/Template12";
import { Card as cardType } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const UserPage = ({ userData }: { userData: cardType }) => {
  const renderTemplate = {
    template1: <Template1 {...userData} />,
    template2: <Template2 {...userData} />,
    template3: <Template3 {...userData} />,
    template4: <Template4 {...userData} />,
    template5: <Template5 {...userData} />,
    template6: <Template6 userData={userData} />,
    template7: <Template7 {...userData} />,
    template8: <Template8 {...userData} />,
    template9: <Template9 {...userData} />,
    template10: <Template10 {...userData} />,
    template11: <Template11 {...userData} />,
    template12: <Template12 {...userData} />,
  };

  interface ChosenTemplateType {
    chosenTemplate: keyof typeof renderTemplate;
  }
  return (
    <main className="flex-1">
      {(userData as ChosenTemplateType).chosenTemplate in renderTemplate ? (
        renderTemplate[(userData as ChosenTemplateType).chosenTemplate]
      ) : (
        <div className="flex flex-col justify-center min-h-screen p-4 md:p-8 lg:p-16 d">
          {/* Main Content Container */}
          <div className="container">
            <div className="pl-0 md:pl-8 lg:pl-16">
              {/* Title */}
              <h1 className="text-[40px] md:text-[60px] lg:text-[96px] text-[#1FAE3A] font-medium italic leading-[1.5] mb-4">
                Oops,
              </h1>

              {/* Description */}
              <p className="text-[20px] md:text-[28px] lg:text-[36px] text-foreground font-bold leading-[1.5] max-w-[700px]">
               Page template is not available.
              </p>

              {/* Button */}
              <Link
                href="/dashboard"
                className="inline-block mt-8 bg-[#22A348] hover:bg-[#1B8A3A] text-white px-6 py-2.5 rounded-md transition-colors duration-200"
              >
                Back To Main
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserPage;
