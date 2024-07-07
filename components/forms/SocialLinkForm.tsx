import React from "react";
import CustomInput from "@/components/CustomInput";

interface SocialLinksFormProps {
  control: any;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ control }) => {
  return (
    <div className="border-2 border-red-500">
      <h1 className="text-lg font-semibold mb-6">Social Links</h1>
      <CustomInput
        control={control}
        name="facebookUrl"
        label="Facebook URL"
        placeholder="Enter your Facebook URL"
      />
      <CustomInput
        control={control}
        name="youtubeUrl"
        label="YouTube URL"
        placeholder="Enter your YouTube URL"
      />
      <CustomInput
        control={control}
        name="instagramUrl"
        label="Instagram URL"
        placeholder="Enter your Instagram URL"
      />
      <CustomInput
        control={control}
        name="twitterUrl"
        label="Twitter URL"
        placeholder="Enter your Twitter URL"
      />
      <CustomInput
        control={control}
        name="linkedinUrl"
        label="LinkedIn URL"
        placeholder="Enter your LinkedIn URL"
      />
      <CustomInput
        control={control}
        name="whatsappUrl"
        label="WhatsApp URL"
        placeholder="Enter your WhatsApp URL"
      />
      <CustomInput
        control={control}
        name="websiteUrl"
        label="Website URL"
        placeholder="Enter your website URL"
      />
    </div>
  );
};

export default SocialLinksForm;
