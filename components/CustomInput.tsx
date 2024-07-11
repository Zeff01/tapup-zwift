import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { createPortfolioSchema } from "@/lib/utils";

interface CustomInput {
  control: Control<z.infer<typeof createPortfolioSchema>>;
  name: FieldPath<z.infer<typeof createPortfolioSchema>>;
  label: string;
  placeholder: string;
  required?: boolean;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  required = false,
}: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          <FormLabel className="text-14 w-full max-w-[280px] font-medium ">
            {label}:{required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="mt-1 placeholder-placeholder-input block w-full px-4 py-2 bg-background-input border border-border-input rounded-md"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-12 text-red-500 mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
