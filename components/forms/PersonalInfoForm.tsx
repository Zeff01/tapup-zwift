import React from "react";
import CustomInput from "@/components/CustomInput";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { PhoneInput } from "../PhoneInput";
interface PersonalInfoFormProps {
  control: any;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold mb-6">Personal Information</h1>
      <CustomInput
        control={control}
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
        required={true}
      />
      <CustomInput
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="Enter your last name"
        required={true}
      />
      <FormField
        control={control}
        name="number"
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <FormLabel className="text-14 w-full max-w-[280px] font-medium ">
              {"Phone Number"}:
              {true && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <div className="flex w-full flex-col">
              <FormControl>
                <PhoneInput
                  defaultCountry="PH"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-12 text-red-500 mt-2" />
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PersonalInfoForm;
