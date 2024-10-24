"use client";

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
import Link from "next/link";

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2 ">
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
        </div>
        <div className="flex justify-between pt-2">
          <div className="flex gap-x-2 text-xs items-center">
            <input type="checkbox" />
            <span>Remember Password</span>
          </div>
          <p className="text-xs text-[#21C15C]">Forgot your password?</p>
        </div>
        <Button
          type="submit"
          className="w-full rounded-full h-8 bg-[#21C15C] hover:bg-[#1eb746] font-light mt-[20px] transform transition-colors duration-300"
          variant={"default"}
          size={"lg"}
        >
          Sign In
        </Button>
        <p className="flex gap-x-1 items-center justify-center text-xs text-muted-foreground w-full pt-2">
          <span>Don&#39;t Have an Account?</span>
          <Link className="text-[#21C15C]" href={"/sign-up-page"}>
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
