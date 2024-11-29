import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Template6 from "@/components/templates/Template6";
import Template9 from "@/components/templates/Template9";
import Template10 from "@/components/templates/Template10";
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
    template9: <Template9 {...(formData as Card)} />,
    template10: <Template10 {...(formData as Card)} />,
  };

  return templateId in renderTemplate ? (
    renderTemplate[templateId]
  ) : (
    <div>Invalid template</div>
  );
};

export default SelectedTemplate;
