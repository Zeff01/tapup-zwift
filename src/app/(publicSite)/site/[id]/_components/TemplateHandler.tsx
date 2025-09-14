"use client";

import { useEffect } from "react";
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
import Template13 from "@/components/templates/Template13";
import Template14 from "@/components/templates/Template14";
import Template15 from "@/components/templates/Template15";
import Template16 from "@/components/templates/Template16";
import Template17 from "@/components/templates/Template17";
import Template18 from "@/components/templates/Template18";
import DraftTemplate1 from "@/components/templates/DraftTemplate1";
import { Card as cardType } from "@/types/types";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const UserPage = ({ userData }: { userData: cardType }) => {
  // Track card view
  useEffect(() => {
    const trackView = async () => {
      // Check if we've already tracked this view in this session
      const sessionKey = `viewed_${userData.id}_${Date.now()}`;
      const viewedKey = `viewed_${userData.id}`;
      
      // Check if viewed in the last 30 seconds (to prevent duplicate tracking on refresh)
      const lastViewed = sessionStorage.getItem(viewedKey);
      if (lastViewed) {
        const timeSinceLastView = Date.now() - parseInt(lastViewed);
        if (timeSinceLastView < 30000) { // 30 seconds
          return;
        }
      }
      
      try {
        const response = await fetch('/api/analytics/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cardId: userData.id,
            ownerId: userData.owner
          }),
        });
        
        if (!response.ok) {
          const error = await response.json();
          console.error('Track view API error:', error);
        } else {
          const result = await response.json();
          // Mark as viewed in session storage
          sessionStorage.setItem(viewedKey, Date.now().toString());
        }
      } catch (error) {
        console.error('Failed to track view:', error);
      }
    };

    if (userData.id && userData.owner) {
      trackView();
    }
  }, [userData.id, userData.owner]);

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
    template13: <Template13 {...userData} />,
    template14: <Template14 {...userData} />,
    template15: <Template15 {...userData} />,
    template16: <Template16 {...userData} />,
    template17: <Template17 {...userData} />,
    template18: <Template18 {...userData} />,
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
                href="/cards"
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
