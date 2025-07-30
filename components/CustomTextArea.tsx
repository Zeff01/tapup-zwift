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

function sanitizeTextAreaValue(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return value.toString();
  }

  if (Array.isArray(value)) {
    throw new Error("CustomTextArea error: received an array value, which is invalid for a textarea.");
  }

  if (value !== null && typeof value === "object") {
    throw new Error("CustomTextArea error: received an object value, which is invalid for a textarea.");
  }

  if (value === undefined || value === null) {
    return "";
  }

  throw new Error(`CustomTextArea error: received unsupported value type (${typeof value}).`);
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
                value={sanitizeTextAreaValue(field.value)}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                placeholder={placeholder}
                className="mt-1 placeholder-placeholder-input block w-full px-4 py-2 bg-secondary border border-border-input rounded-md"
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
