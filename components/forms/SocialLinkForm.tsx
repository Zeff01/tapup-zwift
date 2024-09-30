import React from "react";
import CustomInput from "@/components/CustomInput";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { PhoneInput } from "../PhoneInput";

interface SocialLinksFormProps {
  control: any;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ control }) => {
  return (
    <div className="space-y-4">
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
      <FormField
        control={control}
        name="whatsappNumber"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <FormLabel className="text-14 w-full max-w-[280px] font-medium ">
              {"WhatsApp Number"}:
            </FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <PhoneInput
                  defaultCountry="PH"
                  placeholder="Enter your WhatsApp Number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500 mt-2" />
            </div>
          </div>
        )}
      />
      <CustomInput
        control={control}
        name="skypeInviteUrl"
        label="Skype Invite Url"
        placeholder="Enter your Skype Invite Url"
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
