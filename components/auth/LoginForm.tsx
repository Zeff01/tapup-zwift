"use client";

import CardWrapper from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/schemas";
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
import { RememberButton } from "./RememberButton";

export function LogInForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };
  return (
    <CardWrapper
      headerLabel="Login"
      backButtonHref="/auth/register"
      backButtonMessage="Don't Have an Account?"
      backButtonLabel="Sign Up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-[20px] ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-[2px]">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className="h-[47px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-[2px] ">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className="h-[47px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <RememberButton />
          <Button
            type="submit"
            className="w-full rounded-full bg-[#21C15C] hover:bg-[#1eb746] font-light"
            variant={"default"}
            size={"lg"}
          >
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
