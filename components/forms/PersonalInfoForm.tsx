"use client";

import React from "react";
import CustomInput from "@/components/CustomInput";
import { FormControl, FormField, FormLabel } from "../ui/form";
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
        required={false}
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
        name="middleName"
        label="Middlename (optional)"
        placeholder="Enter your middle name"
      />
      <CustomInput
        control={control}
        name="lastName"
        label="Surname (optional)"
        placeholder="Enter your last name"
      />
      <CustomInput
        control={control}
        name="prefix"
        label="Prefix (optional)"
        placeholder="Mr, Ms, Mrs, Dr, Atty, Engr"
      />
      <CustomInput
        control={control}
        name="suffix"
        label="Suffix (optional)"
        placeholder="Jr, III, IV"
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
              {/* <FormMessage className="text-12 text-red-500 mt-2" /> */}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default PersonalInfoForm;
