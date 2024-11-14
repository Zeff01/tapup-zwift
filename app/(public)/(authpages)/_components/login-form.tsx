"use client";

import Link from "next/link";
import { Separator } from "@/app/(public)/(authpages)/_components/auth-separator";

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
import { loginSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Social from "./social-buttons";
import { loginHandler } from "@/src/lib/firebase/config/auth";
import { LoginData } from "@/types/auth-types";
import { useRouter } from "next/navigation";

export function LogInForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    await loginHandler(data.email, data.password);
    router.push("/onboarding");
  };

  return (
    <Card className="w-full shadow-md md:p-10 h-full flex flex-col justify-center rounded-md py-8">
      <CardHeader
        className={cn(fonts.className, "text-2xl md:text-5xl font-black py-0")}
      >
        Sign In
      </CardHeader>
      <CardContent className="py-2 mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-xs">Email Address</FormLabel>
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
                      <FormLabel className="text-xs">Password</FormLabel>
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
              <Link href="/forgotPassword" className="text-xs text-[#21C15C]">
                Forgot your password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full rounded-full h-8 bg-[#21C15C] hover:bg-[#1eb746] font-light mt-[20px] transform transition-colors duration-300"
              variant={"default"}
              size={"lg"}
            >
              Sign In
            </Button>
            <p className="flex gap-x-1 items-center justify-center text-xs text-muted-foreground w-full mt-2">
              <span>Don&#39;t Have an Account?</span>
              <Link className="text-[#21C15C]" href={"/signup"}>
                Sign Up
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col gap-y-3 py-0">
        <Social label="Sign In" />
      </CardFooter>
    </Card>
  );
}
