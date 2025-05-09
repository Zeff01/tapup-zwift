"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertCircleIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { deliveryFormSchema } from "@/lib/zod-schema";
import { useCart } from "@/providers/cart-provider-v2";
import { CustomerType, SubscriptionPlan, TransactionType } from "@/types/types";
import {
  addCard,
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

async function getStatesData(countryCode: string): Promise<unknown> {
  const geonameUsername = process.env.NEXT_PUBLIC_GEONAME_USERNAME || "";
  const response = await fetch(
    `https://secure.geonames.org/searchJSON?featureCode=ADM2&maxRows=1000&country=${countryCode}&username=${geonameUsername}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch states data");
  }
  return response.json();
}

export default function DeliveryForm({
  fetchedCountries,
  subscriptionPlan,
}: {
  fetchedCountries: Countries;
  subscriptionPlan: SubscriptionPlan;
}) {
  const { items: cardItems, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(
    null
  );
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);

  const { data: fetchedStates, isLoading: isLoadingStates } = useQuery({
    enabled: !!selectedCountryCode,
    queryKey: ["states", selectedCountryCode],
    queryFn: () =>
      getStatesData(selectedCountryCode!) as Promise<StateProvince>,
  });

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
    if (!subscriptionPlan || !cardItems || cardItems.length === 0) {
      toast({
        title: "Error",
        description:
          "Please select a subscription plan and add at least one card to your cart.",
      });
      return;
    }

    setIsLoadingTransaction(true);

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

    await createTransaction(transactionData);

    clearCart();
    // setIsLoadingTransaction(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {cardItems.length === 0 && (
          <Alert variant={"destructive"}>
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Your cart is empty. It should have atleast 1 item.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            disabled={isLoadingTransaction || cardItems.length === 0}
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
            disabled={isLoadingTransaction || cardItems.length === 0}
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
          disabled={isLoadingTransaction || cardItems.length === 0}
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
          disabled={isLoadingTransaction || cardItems.length === 0}
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
                          disabled={
                            isLoadingTransaction || cardItems.length === 0
                          }
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={
                            isLoadingTransaction || cardItems.length === 0
                          }
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Select or type state/province"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search or enter state/province..."
                          onValueChange={(value) => {
                            if (value) field.onChange(value);
                          }}
                        />
                        <CommandList>
                          {!isLoadingStates && (
                            <CommandEmpty>
                              <div className="py-3 px-4 text-sm">
                                No match found. Use the text you typed as your
                                state/province.
                              </div>
                            </CommandEmpty>
                          )}

                          {isLoadingStates && (
                            <Loader2 className="animate-spin self-center shrink-0 size-6 mx-auto" />
                          )}
                          <CommandGroup>
                            {fetchedStates &&
                              fetchedStates?.geonames?.map((state: any) => (
                                <CommandItem
                                  value={state.toponymName}
                                  key={state.geonameId}
                                  onSelect={() => {
                                    field.onChange(state.toponymName);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      state.toponymName === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {state.toponymName}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select from the list or type your own state/province
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <FormField
            disabled={isLoadingTransaction || cardItems.length === 0}
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
            disabled={isLoadingTransaction || cardItems.length === 0}
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
            disabled={isLoadingTransaction || cardItems.length === 0}
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
        <Button
          disabled={isLoadingTransaction || cardItems.length === 0}
          type="submit"
          className="w-full bg-greenColor text-white hover:bg-greenColor/80"
        >
          Submit Delivery Information
          {isLoadingTransaction && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      </form>
    </Form>
  );
}
