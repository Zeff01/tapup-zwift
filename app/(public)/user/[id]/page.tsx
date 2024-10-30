"use client";
import { useEffect, useState } from "react";
import { Users } from "@/src/lib/firebase/store/users.type";

import { getUserBySubId } from "@/src/lib/firebase/store/users.action";

// Assume that you have different components for each template:
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import LoadingLogo from "@/components/LoadingLogo";
import { UserProfile } from "@/types/types";
import Error from "next/error";

const UserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const [userData, setUserData] = useState<Users | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserBySubId(id);
      if (data) {
        setUserData(data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return <LoadingLogo />;
  }

  if (!userData) {
    return <Error statusCode={404} />;
  }

  const renderTemplate = {
    template1: <Template1 {...(userData as UserProfile)} />,
    template2: <Template2 {...(userData as UserProfile)} />,
    template3: <Template3 {...(userData as UserProfile)} />,
    template4: <Template4 {...(userData as UserProfile)} />,
    template5: <Template5 {...(userData as UserProfile)} />,
  };

  interface ChosenTemplateType {
    chosenTemplate: keyof typeof renderTemplate;
  }
  return (
    <main className="h-full overflow-y-auto">
      {(userData as ChosenTemplateType).chosenTemplate in renderTemplate ? (
        renderTemplate[(userData as ChosenTemplateType).chosenTemplate]
      ) : (
        <div>Invalid template</div>
      )}
    </main>
  );
};

export default UserPage;
