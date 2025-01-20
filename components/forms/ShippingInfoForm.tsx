"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useState } from "react";
import { PhoneInput } from "../ui/phone-input";
import { Button } from "../ui/button";
import { ShippingInfo } from "@/types/types";

const ShippingInfoForm: React.FC = () => {
  const methods = useForm<ShippingInfo>();
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ShippingInfo> = (data) => {
    console.log(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mx-4 mb-4">
        {/* Contact */}
        <div className="">
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
            Contact
          </h3>
          <div
            className=" max-w-screen-md w-full border border-muted flex flex-col
           p-3 rounded-md gap-2"
          >
            <FormField
              name="recipientName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Recipient&apos; Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2"
                      placeholder="Recipient Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
        </div>
        {/* Address */}
        <div className="">
          <h3 className="text-muted-foreground font-semibold md:text-lg text-sm py-3">
            Address
          </h3>
          <div
            className=" max-w-screen-md w-full border border-muted flex flex-col
           p-3 rounded-md gap-2"
          >
            <FormField
              name="region"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Region / City / District</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 "
                      placeholder="Enter your region / city / district"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="street"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Street/ Building Name</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 "
                      placeholder="Sesame Street"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="unit"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Unit Floor</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 "
                      placeholder="123"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Postal COde</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      className="border border-muted rounded-md p-2 "
                      placeholder="Enter Postal Code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" variant="default" className="w-full my-3">
          {" "}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ShippingInfoForm;
