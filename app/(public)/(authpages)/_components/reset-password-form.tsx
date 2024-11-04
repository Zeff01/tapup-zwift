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
import { resetPasswordSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordHandler } from "@/src/lib/firebase/config/auth";
import { ResetPasswordData } from "@/types/auth-types";
import { useSearchParams, useRouter } from "next/navigation";
import passwordDots from "@/public/assets/password-dots.png";
import Image from "next/image";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const oobCode = searchParams.get("oobCode");
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    await resetPasswordHandler(oobCode as string, data.password);
    const autogeneratedKey =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("passwordResetExpiration", autogeneratedKey);

    router.push(`/passwordResetComplete?key=${autogeneratedKey}`);
  };

  return (
    <Card className="w-full shadow-md p-5  md:p-10 h-full flex flex-col justify-center rounded-md">
      <CardHeader
        className={cn(
          fonts.className,
          "  pb-3 pt-0 space-y-10 items-center w-full"
        )}
      >
        <Image src={passwordDots} alt="finger print" width={70} height={70} />
        <div className="text-center">
          <h1 className="text-4xl font-black">Set New Password</h1>
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters
          </p>
        </div>
      </CardHeader>

      <CardContent className="pb-0 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2 ">
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
            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full rounded-full h-8 bg-[#21C15C] hover:bg-[#1eb746] font-light mt-[20px] transform transition-colors duration-300"
                variant={"default"}
                size={"lg"}
              >
                Continue
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
