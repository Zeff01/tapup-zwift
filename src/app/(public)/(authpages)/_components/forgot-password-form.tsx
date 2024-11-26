"use client";

import Link from "next/link";
//shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//shadcn cards and fonts
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { forgotPasswordSchema } from "@/lib/zod-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordHandler } from "@/lib/firebase/auth";
import { ForgotPasswordData } from "@/types/types";
import fingerprint from "@/public/assets/fingerprint.png";
import Image from "next/image";

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    await forgotPasswordHandler(data.email);
  };

  return (
    <Card className="w-full shadow-md p-5  md:p-10 h-full flex flex-col justify-center rounded-md">
      <CardHeader
        className={cn(
          fonts.className,
          "  pb-3 pt-0 space-y-10 items-center w-full"
        )}
      >
        <Image src={fingerprint} alt="finger print" width={70} height={70} />
        <div className="text-center">
          <h1 className="text-4xl font-black">Forgot Password</h1>
          <p className="text-xs text-muted-foreground">
            No worries, we&apos;ll send you reset instruction
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            </div>
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full rounded-full h-8 bg-[#21C15C] hover:bg-[#1eb746] font-light mt-[20px] transform transition-colors duration-300"
                variant={"default"}
                size={"lg"}
              >
                Reset Password
              </Button>

              <Button
                asChild
                className="w-full rounded-full h-8 border-black border bg-white text-black hover:bg-black hover:text-white font-light mt-[20px] transform transition-colors duration-300"
                variant="default"
                size="lg"
              >
                <Link href="/login">Back to Log In</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
