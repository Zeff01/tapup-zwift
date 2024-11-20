"use client";

import { Users } from "@/src/lib/firebase/store/users.type";

// Assume that you have different components for each template:
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Template6 from "@/components/templates/Template6";
import { UserProfile } from "@/types/types";

const UserPage = ({ userData }: { userData: Users }) => {
  const renderTemplate = {
    template1: <Template1 {...(userData as UserProfile)} />,
    template2: <Template2 {...(userData as UserProfile)} />,
    template3: <Template3 {...(userData as UserProfile)} />,
    template4: <Template4 {...(userData as UserProfile)} />,
    template5: <Template5 {...(userData as UserProfile)} />,
    template6: <Template6 userData={userData as UserProfile} />,
  };

  interface ChosenTemplateType {
    chosenTemplate: keyof typeof renderTemplate;
  }
  return (
    <main className="flex-1">
      {(userData as ChosenTemplateType).chosenTemplate in renderTemplate ? (
        renderTemplate[(userData as ChosenTemplateType).chosenTemplate]
      ) : (
        <div>Invalid template</div>
      )}
    </main>
  );
};

export default UserPage;
