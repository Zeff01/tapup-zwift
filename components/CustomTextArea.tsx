import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { createPortfolioSchema } from "@/lib/zod-schema";

interface CustomTextAreaProps {
  control: Control<z.infer<typeof createPortfolioSchema>>;
  name: FieldPath<z.infer<typeof createPortfolioSchema>>;
  label: string;
  placeholder: string;
  required?: boolean;
}

const CustomTextArea = ({
  control,
  name,
  label,
  placeholder,
  required = false,
}: CustomTextAreaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <FormLabel className="text-14 w-full max-w-[280px] font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className="mt-1 placeholder-placeholder-input block w-full px-4 py-2 bg-secondary border border-border-input rounded-md"
                {...field}
              />
            </FormControl>
            {/* <FormMessage className="text-12 text-red-500 mt-2" /> */}
          </div>
        </div>
      )}
    />
  );
};

export default CustomTextArea;
