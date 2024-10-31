"use client";

import Link from "next/link";
import { Separator } from "@radix-ui/react-dropdown-menu";

//shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//shadcn cards and fonts
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
const fonts = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["600"],
});

//zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signupSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Social from "./social-buttons";
import { SignupData } from "@/types/auth-types";
import { signUpHandler } from "@/src/lib/firebase/config/auth";

export function RegisterForm() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupData) => {
    await signUpHandler(data);
  };
  return (
    <Card className="w-full  p-5  md:p-10 shadow-md rounded-md">
      <CardHeader
        className={cn(fonts.className, "text-5xl font-black pb-4 pt-0 ")}
      >
        Create Account
      </CardHeader>
      <CardContent className="pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 ">
              <div className="flex gap-x-[20px]">
                <FormField
                  control={form.control}
                  name="firstName"
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
                      <FormLabel className="text-black text-xs">
                        Password
                      </FormLabel>
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
            <p className="flex gap-x-1 items-center justify-center text-xs text-muted-foreground w-full p-2">
              <span>Already Have an Account?</span>
              <Link className="text-[#21C15C]" href={"/login"}>
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col pb-0">
        <Separator />
      </CardFooter>
      <CardFooter className="flex flex-col gap-y-3">
        <Social label="Sign up" />
      </CardFooter>
    </Card>
  );
}