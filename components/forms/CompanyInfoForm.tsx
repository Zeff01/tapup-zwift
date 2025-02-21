import React from "react";
import CustomInput from "@/components/CustomInput";
import CustomTextArea from "../CustomTextArea";

interface CompanyInfoFormProps {
  control: any;
  isAllFieldsRequired?: boolean | null;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({
  control,
  isAllFieldsRequired,
}) => {
  const required = isAllFieldsRequired ?? true;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold mb-6">Company Information</h1>
      <CustomInput
        control={control}
        name="company"
        label="Company"
        placeholder="Enter your company name"
        required={required}
      />
      <CustomTextArea
        control={control}
        name="companyBackground"
        label="Company Background"
        placeholder="Describe your company background"
        required={required}
      />
      <CustomTextArea
        control={control}
        name="serviceDescription"
        label="Service Description"
        placeholder="Describe the services you offer"
        required={required}
      />
    </div>
  );
};

export default CompanyInfoForm;
