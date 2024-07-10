import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomTextArea from "../CustomTextArea";

interface CompanyInfoFormProps {
  control: any;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({ control }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold mb-6">Company Information</h1>
      <CustomInput
        control={control}
        name="position"
        label="Position"
        placeholder="Enter your position"
        required={true}
      />
      <CustomInput
        control={control}
        name="company"
        label="Company"
        placeholder="Enter your company name"
        required={true}
      />
      <CustomTextArea
        control={control}
        name="companyBackground"
        label="Company Background"
        placeholder="Describe your company background"
        required={true}
      />
      <CustomTextArea
        control={control}
        name="serviceDescription"
        label="Service Description"
        placeholder="Describe the services you offer"
        required={true}
      />
    </div>
  );
};

export default CompanyInfoForm;
