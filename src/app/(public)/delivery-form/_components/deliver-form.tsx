"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getStatesData } from "../page";
import { deliveryFormSchema } from "@/lib/zod-schema";
import { useCart } from "@/providers/cart-provider-v2";
import { CustomerType, SubscriptionPlan, TransactionType } from "@/types/types";
import {
  addCard,
  createCustomerAndRecurringPlan,
  createCustomerAndRecurringPlanBundle,
  createTransaction,
} from "@/lib/firebase/actions/user.action";

type Geonames = {
  countryName: string;
  countryCode: string;
};

export type Countries = {
  geonames: Geonames[];
};

type StateProvince = {
  geonames: {
    toponymName: string;
    geonameId: string;
  }[];
};

export default function DeliveryForm({
  fetchedCountries,
  subscriptionPlan,
}: {
  fetchedCountries: Countries;
  subscriptionPlan: SubscriptionPlan;
}) {
  const { items: cardItems } = useCart();
  // console.log(subscriptionPlan);
  const [open, setOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );

  const { data: fetchedStates, isLoading: isLoadingStates } = useQuery({
    enabled: !!selectedCountryCode,
    queryKey: ["states", selectedCountryCode],
    queryFn: () =>
      getStatesData(selectedCountryCode!) as Promise<StateProvince>,
  });

  // const referenceId = `customer-${user.id}-${new Date().toISOString()}`;
  //     console.log("Generated reference ID:", referenceId);

  //     const customerData: CustomerType = {
  //       reference_id: referenceId,
  //       type: "INDIVIDUAL",
  //       email: user.email,
  //       individual_detail: {
  //         given_names: user.firstName ?? "",
  //         surname: user.lastName ?? "",
  //       },
  //     };

  //     const cartItem = cartState.items[0];
  //     console.log("Current cart item:", cartItem);

  //     if (!cartItem.subscriptionPlan) {
  //       throw new Error(
  //         "Subscription plan is required to create a recurring plan."
  //       );
  //     }

  //     console.log(
  //       "Physical card ID before adding card:",
  //       cartItem.physicalCardId
  //     );

  // const cardId = await addCardForUser(
  //   userLoggedIn?.uid,
  //   cartItem.physicalCardId
  // );

  //     console.log("Newly added card ID:", cardId);

  //     // Create customer and recurring plan in Xendit
  //     const { customer, recurringPlan } = await createCustomerAndRecurringPlan(
  //       customerData,
  //       cartItem.subscriptionPlan,
  //       cardId,
  //       calculateTotal()
  //     );

  const form = useForm<z.infer<typeof deliveryFormSchema>>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      country: "",
      stateProvince: "",
      postalCode: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof deliveryFormSchema>) {
    if (!subscriptionPlan) {
      toast({
        title: "Error",
        description:
          "Subscription plan is required to create a recurring plan.",
      });
      return;
    }

    const referenceId = `customer-${values.email}-${new Date().toISOString()}`;

    const customerData: CustomerType = {
      reference_id: referenceId,
      type: "INDIVIDUAL",
      email: values.email,
      mobile_number: values.phoneNumber ?? "",
      individual_detail: {
        given_names: values.firstName ?? "",
        surname: values.lastName ?? "",
      },
    };

    const cardTotal = () =>
      cardItems.reduce((acc, item) => acc + item.quantity, 0) *
      subscriptionPlan.price;
    const addCardPromises = cardItems.flatMap((item) => {
      return Array.from({ length: item.quantity }, () =>
        addCard({ id: item.id, name: item.name })
      );
    });

    const cardResults = await Promise.all(addCardPromises);

    const recurringPlan = await createCustomerAndRecurringPlanBundle(
      customerData,
      subscriptionPlan,
      cardResults,
      cardTotal()
    );

    const transactionData: TransactionType = {
      amount: cardTotal(),
      cards: cardResults.map((cardIds, i) => ({
        id: cardIds,
        name: cardItems[i].name,
        quantity: cardItems[i].quantity,
      })),
      receiver: {
        customerId: recurringPlan.customer.id,
        customerName: values.firstName + " " + values.lastName,
        customerEmail: values.email ?? "",
        customerPhone: values.phoneNumber ?? "",
        customerAddress:
          values.streetAddress +
          ", " +
          values.city +
          ", " +
          values.stateProvince +
          ", " +
          values.postalCode +
          ", " +
          values.country,
      },
      status: "pending",
    };

    const transactionId = await createTransaction(transactionData);

    console.log(transactionId);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                {/*  */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.doe@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please make sure that you enter a valid email address. We will
                contact you via this email address if we need to.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormDescription>
                Please include country code and make sure that the number is
                valid. The delivery team will contact you via this number if
                they need to.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="border p-6 rounded-lg space-y-6">
          <h3 className="font-medium text-lg">Delivery Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Select country"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {fetchedCountries?.geonames?.map((country: any) => (
                              <CommandItem
                                value={country.countryName}
                                key={country.countryName}
                                onSelect={() => {
                                  form.setValue("country", country.countryName);
                                  setSelectedCountryCode(country.countryCode);
                                  form.setValue("stateProvince", "");
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country.countryName === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {country.countryName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stateProvince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <Select
                    disabled={!selectedCountryCode}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state/province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingStates && (
                        <Loader2 className="animate-spin self-center shrink-0 size-6 mx-auto" />
                      )}
                      {fetchedStates &&
                        fetchedStates?.geonames?.map((state: any) => (
                          <SelectItem
                            key={state.geonameId}
                            value={state.toponymName}
                          >
                            {state.toponymName}
                          </SelectItem>
                        ))}
                      {fetchedStates &&
                        fetchedStates?.geonames.length === 0 &&
                        "No states found"}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal/ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="94103" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit Delivery Information
        </Button>
      </form>
    </Form>
  );
}
