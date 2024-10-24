"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2 ">
          <div className="flex gap-x-[20px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-black text-xs">
                      First Name
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="First Name"
                      className="text-xs h-8"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-black text-xs">
                      Last Name
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Last Name"
                      className="text-xs h-8"
                    />
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
                <div className="flex items-center justify-between">
                  <FormLabel className="text-black text-xs">
                    Email Address
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="text-xs h-8"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-black text-xs">Password</FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Password"
                    className="text-xs h-8"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-black text-xs">
                    Confirm Password
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm Password"
                    className="text-xs h-8"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-full h-8 bg-[#21C15C] hover:bg-[#1eb746] font-light mt-[20px] transform transition-colors duration-300"
          variant={"default"}
          size={"lg"}
        >
          Sign Up
        </Button>
        <p className="flex gap-x-1 items-center justify-center text-xs text-muted-foreground w-full pt-2">
          <span>Already Have an Account?</span>
          <Link className="text-[#21C15C]" href={"/log-in-page"}>
            Sign In
          </Link>
        </p>
      </form>
    </Form>
  );
}
