import React from "react";
import CustomInput from "@/components/CustomInput";

interface PersonalInfoFormProps {
  control: any;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ control }) => {
  return (
    <div className="border-2 border-blue-500">
      <h1 className="text-lg font-semibold mt-2 mb-6">Personal Information</h1>
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
        label="Email Address"
        placeholder="Enter your email address"
        required={true}
      />
      <CustomInput
        control={control}
        name="number"
        label="Phone Number"
        placeholder="Enter your phone number"
        required={true}
      />
    </div>
  );
};

export default PersonalInfoForm;
