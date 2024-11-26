"use client";

import React from "react";
import CustomInput from "@/components/CustomInput";
import { FormControl, FormField, FormLabel, FormMessage } from "../ui/form";
import { PhoneInput } from "../ui/phone-input";
interface PersonalInfoFormProps {
  control: any;
  isCard?: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  control,
  isCard,
}) => {
  return (
    <div className="space-y-4">
      <CustomInput
        control={control}
        name="position"
        label="Position"
        placeholder="Enter your position in your company"
        required={true}
      />
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
      <CustomInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        required={true}
        disabled={!isCard}
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
