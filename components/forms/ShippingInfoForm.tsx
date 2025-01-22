"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { PhoneInput } from "../ui/phone-input";
import { Button } from "../ui/button";
import { ShippingInfo } from "@/types/types";
import { useShippingInfo } from "@/providers/shipping-info-provider";
import { toast } from "react-toastify";

const ShippingInfoForm: React.FC = () => {
  const { state, setState } = useShippingInfo();

  const methods = useForm({
    defaultValues: state.shippingInfo || {
      recipientName: "",
      contactNumber: "",
      address: {
        city: "",
        street: "",
        unit: "",
        postalCode: "",
      },
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<any> = (data) => {
    toast.success("Address saved successfully");
    setState({ ...state, shippingInfo: data });
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mx-4 mb-4">
        {/* Contact */}
        <div>
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
            Contact
          </h3>
          <div className="max-w-screen-md w-full border border-muted p-4 rounded-md gap-4">
            <FormField
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient&apos;s Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 w-full focus:bg-inputOnChangeBg focus:outline-none"
                      placeholder="Enter recipient's name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contactNumber"
              render={() => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Controller
                      name="contactNumber"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          defaultCountry="PH"
                          placeholder="Enter your phone number"
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
            Address
          </h3>
          <div className="max-w-screen-md w-full border border-muted p-4 rounded-md gap-4">
            <FormField
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region / City / District</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 w-full focus:bg-inputOnChangeBg focus:outline-none"
                      placeholder="Enter your region / city / district"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street / Building Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 w-full focus:bg-inputOnChangeBg focus:outline-none"
                      placeholder="Enter your street or building name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Floor</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 w-full focus:bg-inputOnChangeBg focus:outline-none"
                      placeholder="Enter your unit or floor number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address.postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 w-full focus:bg-inputOnChangeBg focus:outline-none"
                      placeholder="Enter your postal code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" variant="default" className="w-full my-3">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ShippingInfoForm;
