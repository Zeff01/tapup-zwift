import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";
import Template5 from "@/components/templates/Template5";
import Template6 from "@/components/templates/Template6";
import { UserProfile } from "@/types/types";


const SelectedTemplate = ({
  templateId,
  formData,
}: {
  templateId: keyof typeof renderTemplate; // Restrict templateId to valid keys
  formData: UserProfile;
}) => {
  const renderTemplate = {
    template1: <Template1 {...formData} />,
    template2: <Template2 {...formData} />,
    template3: <Template3 {...formData} />,
    template4: <Template4 {...formData} />,
    template5: <Template5 {...formData} />,
    template6: <Template6 userData={formData} />,
  };

  return templateId in renderTemplate ? (
    renderTemplate[templateId]
  ) : (
    <div>Invalid template</div>
  );
};


export default SelectedTemplate;