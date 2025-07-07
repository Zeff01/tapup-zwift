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

import { Card } from "@/types/types";

const SelectedTemplate = ({
  templateId,
  formData,
}: {
  templateId: keyof typeof renderTemplate; // Restrict templateId to valid keys
  formData: Partial<Card>;
}) => {
  const renderTemplate = {
    template1: <Template1 {...(formData as Card)} />,
    template2: <Template2 {...(formData as Card)} />,
    template3: <Template3 {...(formData as Card)} />,
    template4: <Template4 {...(formData as Card)} />,
    template5: <Template5 {...(formData as Card)} />,
    template6: <Template6 userData={formData as Card} />,
    template7: <Template7 {...(formData as Card)} />,
    template8: <Template8 {...(formData as Card)} />,
    template9: <Template9 {...(formData as Card)} />,
    template10: <Template10 {...(formData as Card)} />,
    template11: <Template11 {...(formData as Card)} />,
    template12: <Template12 {...(formData as Card)} />,
    template13: <Template13 {...(formData as Card)} />,
    template14: <Template14 {...(formData as Card)} />,
    template15: <Template15 {...(formData as Card)} />,
    template16: <Template16 {...(formData as Card)} />,
    template17: <Template17 {...(formData as Card)} />,
  };

  return templateId in renderTemplate ? (
    renderTemplate[templateId]
  ) : (
    <div>Invalid template</div>
  );
};

export default SelectedTemplate;
