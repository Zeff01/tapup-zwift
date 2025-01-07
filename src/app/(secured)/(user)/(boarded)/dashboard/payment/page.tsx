"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { paymentCards } from "@/constants";
import { paymentSchema } from "@/lib/zod-schema";

// Infer the schema type
type PaymentMethodData = z.infer<typeof paymentSchema>;

const PaymentMethod: React.FC = () => {
  const form = useForm<PaymentMethodData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      zipCode: "",
      agree: false,
    },
  });

  const onSubmit = (data: PaymentMethodData) => {
    console.log("Payment Method Data:", data);
  };

  return (
    <div className="px-4 py-6">
      <Link href="/dashboard" className="text-greenTitle mb-6 block">
        Back
      </Link>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-screen-md w-full mx-auto"
        >
          <h2 className="text-xl font-semibold">Payment Details</h2>

          <div className="flex items-center gap-2 justify-center bg-green-300 rounded-md p-1">
            {paymentCards.map((item) => (
              <div key={item.title} className="relative w-[4rem] mt-1 h-[4rem]">
                <Image
                  src={item.image}
                  alt="credit card"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Card Number */}
          <FormField
            name="cardNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234 5678 9876 5432" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Expiry Date & CVV */}
          <div className="flex items-center  gap-4">
            <FormField
              name="expiryDate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date (MM/YY)</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="cvv"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Billing Information */}
          <h2 className="text-xl font-semibold mt-8">Billing Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Iloilo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Philippines" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="zipCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="90001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Agree to Payment Policy */}
          <FormField
            name="agree"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>I agree with the payment policy</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-buttonColor text-white hover:bg-green-600"
          >
            Submit Payment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PaymentMethod;
