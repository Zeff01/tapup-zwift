"use client";

import Link from "next/link";
import { Separator } from "@/src/app/(public)/(authpages)/_components/auth-separator";

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
import { signupSchema } from "@/lib/zod-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Social from "./social-buttons";
import { SignupData } from "@/types/types";
import { signUpHandler } from "@/lib/firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
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

  const {
    mutate: registerHandlerMutation,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: signUpHandler,
    onSuccess: () => {
      router.push("/dashboard");
    },
  });

  const isLoading = isPending || isSuccess;

  const onSubmit = async (data: SignupData) => {
    await registerHandlerMutation(data);
  };
  return (
    <Card className="w-full py-8 px-6 md:p-16 shadow-md rounded-md">
      <CardHeader
        className={cn(fonts.className, "text-3xl md:text-5xl font-black p-0")}
      >
        Create Account
      </CardHeader>
      <CardContent className="p-0 mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 ">
              <div className="flex gap-x-2">
                <FormField
                  control={form.control}
                  disabled={isLoading}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs">First Name</FormLabel>
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
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs">Last Name</FormLabel>
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
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className=" text-xs">Email Address</FormLabel>
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
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className=" text-xs">Password</FormLabel>
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
                disabled={isLoading}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className=" text-xs">
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
              disabled={isLoading}
            >
              Sign Up
              {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
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
      <Separator />
      <CardFooter className="flex flex-col gap-y-3 p-0">
        <Social label="Sign up" />
      </CardFooter>
    </Card>
  );
}
